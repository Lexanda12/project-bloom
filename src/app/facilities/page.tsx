'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileShell } from '@/components/layout/MobileShell'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressThread } from '@/components/ui/ProgressThread'
import {
  FACILITIES,
  NIGERIAN_STATES,
  getFacilitiesByState,
} from '@/content/facilities'
import {
  initJourney,
  advanceStage,
  updateJourneyState,
} from '@/lib/journey/tracker'
import type { Facility } from '@/types'

export default function FacilitiesPage() {
  const router = useRouter()
  const [selectedState, setSelectedState] = useState('')
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [hasSelected, setHasSelected] = useState(false)

  useEffect(() => {
    initJourney()
    advanceStage('REFERRED')
  }, [])

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const state = e.target.value
    setSelectedState(state)
    setHasSelected(true)
    setFacilities(getFacilitiesByState(state))
    updateJourneyState({ stateCode: state })
  }

  function handleSelectFacility(facility: Facility) {
    updateJourneyState({ selectedFacilityId: facility.id })
    router.push(`/referral/${facility.id}`)
  }

  return (
    <MobileShell>
      <ProgressThread currentStage="REFERRED" />

      {/* Top nav */}
      <div className="pt-10 pb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-bloom-muted text-sm underline"
        >
          ← Back
        </button>
      </div>

      {/* Page title */}
      <h1 className="font-display text-bloom-text text-[1.75rem] leading-tight mb-2">
        Find a clinic near you
      </h1>
      <p className="text-bloom-muted text-[17px] mb-8">
        These clinics are part of a supported screening pathway. Select your
        state to see what is available.
      </p>

      {/* State selector */}
      <div className="mb-8">
        <label
          htmlFor="state-select"
          className="block text-bloom-text text-[17px] font-medium mb-3"
        >
          Which state are you in?
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className="w-full min-h-[56px] rounded-2xl border border-bloom-border bg-bloom-surface text-bloom-text text-[17px] px-4 appearance-none"
        >
          <option value="">Select your state</option>
          {NIGERIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {hasSelected && (
        <div>
          {facilities.length > 0 ? (
            <div className="space-y-4">
              <p className="text-bloom-muted text-sm mb-2">
                {facilities.length} clinic{facilities.length !== 1 ? 's' : ''}{' '}
                found in {selectedState}
              </p>
              {facilities.map((facility) => (
                <Card key={facility.id}>
                  <div className="mb-1">
                    <span className="inline-block text-xs font-semibold text-bloom-primary bg-bloom-primary/10 rounded-full px-3 py-1 mb-3">
                      Supported pathway
                    </span>
                  </div>
                  <h2 className="font-display text-bloom-text text-[1.2rem] leading-snug mb-2">
                    {facility.name}
                  </h2>
                  <p className="text-bloom-muted text-sm mb-1">
                    📍 {facility.address}
                  </p>
                  <p className="text-bloom-muted text-sm mb-1">
                    🕐 {facility.openingHours}
                  </p>
                  <p className="text-bloom-muted text-sm mb-5">
                    📞 {facility.phone}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => handleSelectFacility(facility)}
                  >
                    Get my referral →
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="font-display text-bloom-text text-[1.2rem] mb-3">
                No clinics listed in {selectedState} yet
              </p>
              <p className="text-bloom-muted text-[17px] leading-relaxed mb-5">
                We are working to add more locations. In the meantime, the
                nearest supported clinic may be in a neighbouring state.
              </p>
              <p className="text-bloom-muted text-[17px] leading-relaxed">
                You can also call{' '}
                <span className="text-bloom-primary font-semibold">
                  0800-BLOOM-NG
                </span>{' '}
                and we will help you find the closest option.
              </p>
            </Card>
          )}
        </div>
      )}
    </MobileShell>
  )
}
