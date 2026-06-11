import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const AttendSchema = z.object({
  referralId: z.string().uuid(),
  attended: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = AttendSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('referrals')
      .update({
        attended: parsed.data.attended,
        attended_at: new Date().toISOString(),
      })
      .eq('id', parsed.data.referralId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update attendance' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
