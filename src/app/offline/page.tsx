import Link from 'next/link'
import { MobileShell } from '@/components/layout/MobileShell'
import { Button } from '@/components/ui/Button'

export default function OfflinePage() {
  return (
    <MobileShell>
      <div className="pt-24 flex flex-col items-center text-center">
        <div className="text-5xl mb-6">🌸</div>
        <h1 className="font-display text-bloom-text text-[1.75rem] leading-tight mb-4">
          You are offline right now
        </h1>
        <p className="text-bloom-muted text-[17px] leading-relaxed mb-8 max-w-[300px]">
          Your progress is saved. Come back when you have a connection and you
          will pick up exactly where you left off.
        </p>
        <Link href="/" className="w-full">
          <Button variant="primary">I am back online →</Button>
        </Link>
      </div>
    </MobileShell>
  )
}
