
import type { JourneyStage, JourneyState, JourneyReentry } from './types'

const STORAGE_KEY = 'bloom_journey_v1'
const REENTRY_THRESHOLD_MS = 5 * 60 * 1000 // 5 minutes

const STAGE_ORDER: JourneyStage[] = [
  'REACHED', 'EXPECTED', 'REFERRED', 'BOOKED', 'ATTENDED'
]

function generateId(): string {
  return crypto.randomUUID()
}

export function initJourney(): JourneyState {
  if (typeof window === 'undefined') {
    return { journeyId: '', stage: 'REACHED', lastSeenAt: new Date().toISOString() }
  }

  const existing = getJourneyState()
  if (existing) {
    updateJourneyState({ lastSeenAt: new Date().toISOString() })
    return existing
  }

  const fresh: JourneyState = {
    journeyId: generateId(),
    stage: 'REACHED',
    lastSeenAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  return fresh
}

export function getJourneyState(): JourneyState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as JourneyState) : null
  } catch {
    return null
  }
}

export function updateJourneyState(partial: Partial<JourneyState>): void {
  if (typeof window === 'undefined') return
  const current = getJourneyState()
  if (!current) return
  const updated = { ...current, ...partial, lastSeenAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function advanceStage(stage: JourneyStage): void {
  const current = getJourneyState()
  if (!current) return

  const currentIndex = STAGE_ORDER.indexOf(current.stage)
  const newIndex = STAGE_ORDER.indexOf(stage)

  if (newIndex <= currentIndex) return // Never go backwards

  updateJourneyState({ stage })
  syncStageToSupabase(stage)
}

export async function syncStageToSupabase(stage: JourneyStage): Promise<void> {
  const state = getJourneyState()
  if (!state?.journeyId) return

  try {
    await fetch('/api/journey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        journeyId: state.journeyId,
        stage,
        stateCode: state.stateCode ?? undefined,
      }),
    })
  } catch {
    // Fire-and-forget — never block the UI on sync failure
  }
}


export function checkReentry(): JourneyReentry {
  const state = getJourneyState()
  if (!state) return { hasActiveJourney: false }

  const lastSeen = new Date(state.lastSeenAt).getTime()
  const now = Date.now()
  const isReturning = now - lastSeen > REENTRY_THRESHOLD_MS

  if (isReturning && (state.expectStepIndex ?? 0) > 0) {
    return {
      hasActiveJourney: true,
      stepIndex: state.expectStepIndex,
      stage: state.stage,
    }
  }

  return { hasActiveJourney: false }
}
