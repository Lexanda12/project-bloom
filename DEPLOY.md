# Project Bloom — Deployment Checklist

## Before deploying to Vercel

### Environment Variables (set in Vercel dashboard)
| Variable | Where to get it |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project → Settings → API |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase project → Settings → API |
| SUPABASE_SERVICE_ROLE_KEY | Supabase project → Settings → API (keep secret) |

### Supabase setup (must be done before first deploy)
- [ ] Run schema.sql in Supabase SQL Editor (src/lib/supabase/schema.sql)
- [ ] Confirm RLS is enabled on both tables
- [ ] Confirm anon insert policy is active
- [ ] Confirm service_role policy is active

### Before go-live
- [ ] Replace placeholder icons in public/icons/ with real 192x192 and 512x512 PNGs
- [ ] Update 0800-BLOOM-NG with real facility phone numbers in src/content/facilities.ts
- [ ] Clinical content reviewed and signed off
- [ ] Test full journey on a real Android device (Chrome)
- [ ] Test full journey on a real iOS device (Safari)
- [ ] Test offline mode: load /expect on WiFi, turn off data, confirm content still readable
- [ ] Test referral save: generate referral, tap Save, confirm it appears in phone share sheet

### Vercel deployment steps
1. Push project to GitHub
2. Connect repo to Vercel
3. Set all environment variables in Vercel dashboard
4. Deploy
5. Set custom domain if available
6. Test production URL on a real device

## Post-launch (Week 1)
- [ ] Confirm journey_events rows appearing in Supabase
- [ ] Confirm referrals rows appearing in Supabase
- [ ] Share URL via WhatsApp to 5 test users
- [ ] Collect first feedback within 48 hours
