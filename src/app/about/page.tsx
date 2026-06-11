import Link from 'next/link'
import { MobileShell } from '@/components/layout/MobileShell'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <MobileShell>
      <div className="pt-10 pb-6">
        <Link href="/" className="text-bloom-muted text-sm underline">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-display text-bloom-text text-[1.75rem] leading-tight mb-2">
        About Project Bloom
      </h1>
      <p className="text-bloom-muted text-[17px] mb-8 leading-relaxed">
        Project Bloom exists for one reason: to close the gap between knowing
        you should go for a breast screening and actually going.
      </p>

      {/* Mission */}
      <Card className="mb-4">
        <h2 className="font-display text-bloom-text text-[1.2rem] mb-3">
          Why we built this
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          Most women who have never been for a breast screening are not missing
          information. They are missing confidence — the belief that they can
          walk into an unfamiliar place and come out the other side intact,
          whatever they find.
        </p>
        <p className="text-bloom-text text-[17px] leading-relaxed mt-3">
          Project Bloom makes the unknown known. That is all. Once you know
          what to expect, the barrier becomes much smaller.
        </p>
      </Card>

      {/* What we do not do */}
      <Card className="mb-4">
        <h2 className="font-display text-bloom-text text-[1.2rem] mb-3">
          What this is not
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          Project Bloom is not a diagnostic tool. It does not tell you whether
          anything is wrong. It does not replace a doctor. It helps you take
          the first step — finding a clinic and walking in.
        </p>
      </Card>

      {/* Clinical governance */}
      <Card className="mb-4">
        <h2 className="font-display text-bloom-text text-[1.2rem] mb-3">
          Clinical oversight
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          All health content on this platform is reviewed by qualified Nigerian
          healthcare professionals. Nothing is published without clinical
          sign-off. Content is reviewed and updated regularly.
        </p>
      </Card>

      {/* Partners — credentials live here, not on the landing page */}
      <Card className="mb-4">
        <h2 className="font-display text-bloom-text text-[1.2rem] mb-3">
          Supported by
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          The screening facilities listed on Project Bloom are connected to a
          supported clinical pathway. We are working with healthcare partners
          to expand this network across Nigeria.
        </p>
      </Card>

      {/* Privacy */}
      <Card className="mb-8">
        <h2 className="font-display text-bloom-text text-[1.2rem] mb-3">
          Your privacy
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          No account is required. No identifying information is stored without
          your explicit consent. Your journey through this app is tracked
          anonymously — we use this only to understand how to make the product
          better. Your phone number, if shared, is never stored in readable
          form.
        </p>
      </Card>

      {/* Built by */}
      <div className="text-center mb-8">
        <p className="text-bloom-muted text-sm">
          Built by{' '}
          <a
            href="https://clarit.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bloom-primary underline"
          >
            Clarit Studio
          </a>
        </p>
        <p className="text-bloom-muted text-sm mt-1">
          Eniola Alex — Product & Engineering
        </p>
      </div>

      <Link href="/" className="block">
        <Button variant="primary">Start your journey →</Button>
      </Link>
    </MobileShell>
  )
}
