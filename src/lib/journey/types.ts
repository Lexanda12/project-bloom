import type { JourneyStage, JourneyState } from '@/types'
export type { JourneyStage, JourneyState }

export interface JourneyReentry {
  hasActiveJourney: boolean
  stepIndex?: number
  stage?: JourneyStage
}
