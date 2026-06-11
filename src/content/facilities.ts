import type { Facility } from '@/types'

export const FACILITIES: Facility[] = [
  {
    id: 'luth-lagos',
    name: 'LUTH Breast Clinic',
    state: 'Lagos',
    address: 'Idi-Araba, Surulere, Lagos',
    phone: '0800-BLOOM-NG',
    openingHours: 'Mon–Fri, 8am–4pm',
    pathway: 'roche',
  },
  {
    id: 'nha-abuja',
    name: 'National Hospital Abuja — Oncology',
    state: 'Abuja (FCT)',
    address: 'Central Business District, Abuja',
    phone: '0800-BLOOM-NG',
    openingHours: 'Mon–Fri, 8am–4pm',
    pathway: 'roche',
  },
  {
    id: 'ucth-calabar',
    name: 'UCTH Breast Care Centre',
    state: 'Cross River',
    address: 'University of Calabar Teaching Hospital, Calabar',
    phone: '0800-BLOOM-NG',
    openingHours: 'Mon–Fri, 8am–3pm',
    pathway: 'roche',
  },
  {
    id: 'unth-enugu',
    name: 'UNTH Women\'s Health Centre',
    state: 'Enugu',
    address: 'Ituku-Ozalla, Enugu',
    phone: '0800-BLOOM-NG',
    openingHours: 'Mon–Fri, 8am–4pm',
    pathway: 'roche',
  },
  {
    id: 'akth-kano',
    name: 'AKTH Breast Screening Unit',
    state: 'Kano',
    address: 'Aminu Kano Teaching Hospital, Kano',
    phone: '0800-BLOOM-NG',
    openingHours: 'Mon–Fri, 8am–3pm',
    pathway: 'roche',
  },
]

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti',
  'Enugu', 'Abuja (FCT)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
]

export function getFacilitiesByState(state: string): Facility[] {
  return FACILITIES.filter(f => f.state === state)
}
