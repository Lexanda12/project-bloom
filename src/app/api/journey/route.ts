import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const JourneySchema = z.object({
  journeyId: z.string().min(1),
  stage: z.enum(['REACHED', 'EXPECTED', 'REFERRED', 'BOOKED', 'ATTENDED']),
  stateCode: z.string().optional(),
})

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = JourneySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const supabase = getServiceClient()
    await supabase.from('journey_events').insert({
      journey_id: parsed.data.journeyId,
      stage: parsed.data.stage,
      state_code: parsed.data.stateCode ?? null,
      metadata: {},
    })

    // Always return success — never block the user on tracking failure
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ success: true }, { status: 200 })
  }
}
