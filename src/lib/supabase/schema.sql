-- Journey tracking (anonymous)
CREATE TABLE journey_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN (
    'REACHED', 'EXPECTED', 'REFERRED', 'BOOKED', 'ATTENDED'
  )),
  created_at TIMESTAMPTZ DEFAULT now(),
  state_code TEXT,
  metadata JSONB DEFAULT '{}'
);

-- Referrals
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id TEXT NOT NULL,
  facility_id TEXT NOT NULL,
  facility_name TEXT NOT NULL,
  facility_state TEXT NOT NULL,
  facility_phone TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now(),
  whatsapp_phone_hash TEXT,
  followup_24h_sent BOOLEAN DEFAULT false,
  followup_7d_sent BOOLEAN DEFAULT false,
  attended BOOLEAN,
  attended_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE journey_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Anonymous insert only
CREATE POLICY "anon insert journey events"
  ON journey_events FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon insert referrals"
  ON referrals FOR INSERT TO anon WITH CHECK (true);

-- Service role full access (for WhatsApp follow-up worker)
CREATE POLICY "service read journey events"
  ON journey_events FOR SELECT TO service_role USING (true);

CREATE POLICY "service all referrals"
  ON referrals FOR ALL TO service_role USING (true);
