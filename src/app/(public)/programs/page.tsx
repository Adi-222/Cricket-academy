import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Programs() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-glow">Training Programs</h1>
        
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/10" id="juniors">
            <h2 className="text-3xl font-bold text-white mb-4">Junior Camp (U-12)</h2>
            <p className="text-lg text-zinc-300 mb-6">
              Focuses on the fundamentals of the game. Kids learn basic batting stances, bowling actions, and fielding techniques in a fun and engaging environment.
            </p>
            <ul className="list-disc list-inside text-zinc-400 mb-6 space-y-2">
              <li>Batting basics & stance</li>
              <li>Bowling grip & run-up</li>
              <li>Catching & throwing</li>
              <li>Match simulations (soft ball)</li>
            </ul>
            <Link href="/login?tab=signup"><Button>Enroll Now</Button></Link>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10" id="seniors">
            <h2 className="text-3xl font-bold text-white mb-4">Senior Camp (U-16)</h2>
            <p className="text-lg text-zinc-300 mb-6">
              Advanced skill development and match awareness. Tailored for competitive players aiming for district and state selections.
            </p>
            <ul className="list-disc list-inside text-zinc-400 mb-6 space-y-2">
              <li>Advanced shot selection</li>
              <li>Pace & spin variations</li>
              <li>Field placements & strategy</li>
              <li>Net sessions (hard ball) & turf wickets</li>
            </ul>
            <Link href="/login?tab=signup"><Button>Enroll Now</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
