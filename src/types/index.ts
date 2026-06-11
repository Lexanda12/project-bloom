export type JourneyStage =
  | 'REACHED'
  | 'EXPECTED'
  | 'REFERRED'
  | 'BOOKED'
  | 'ATTENDED'

export interface JourneyState {
  journeyId: string
  stage: JourneyStage
  stateCode?: string
  selectedFacilityId?: string
  referralId?: string
  expectStepIndex?: number
  lastSeenAt: string
}

export interface Facility {
  id: string
  name: string
  state: string
  address: string
  phone: string
  openingHours: string
  pathway: 'roche' | 'public'
}

export interface Referral {
  id: string
  journeyId: string
  facility: Facility
  generatedAt: string
}
