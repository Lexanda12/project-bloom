import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const ReferralSchema = z.object({
  journeyId: z.string().min(1),
  facilityId: z.string().min(1),
  facilityName: z.string().min(1),
  facilityState: z.string().min(1),
  facilityPhone: z.string().min(1),
  whatsappPhoneHash: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ReferralSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid referral data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('referrals')
      .insert({
        journey_id: parsed.data.journeyId,
        facility_id: parsed.data.facilityId,
        facility_name: parsed.data.facilityName,
        facility_state: parsed.data.facilityState,
        facility_phone: parsed.data.facilityPhone,
        whatsapp_phone_hash: parsed.data.whatsappPhoneHash ?? null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Referral insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save referral' },
        { status: 500 }
      )
    }

    return NextResponse.json({ referralId: data.id }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
