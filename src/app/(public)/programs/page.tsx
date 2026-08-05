import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Programs() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl py-24">
        <div className="mb-16 border-b border-slate/10 pb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading text-slate uppercase mb-4">Training Programs</h1>
          <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">Structured development pathways for every age group.</p>
        </div>
        
        <div className="space-y-12">
          {/* Junior Camp */}
          <div className="card-dossier overflow-hidden flex flex-col md:flex-row" id="juniors">
            <div className="bg-eden p-8 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-8xl font-heading text-white/5 pointer-events-none">U12</div>
              <h2 className="text-3xl font-heading text-white uppercase mb-2 relative z-10">Junior Camp</h2>
              <div className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-mono tracking-widest uppercase rounded-sm border border-white/20 w-max mb-4 relative z-10">
                Ages 8-12
              </div>
              <p className="text-white/80 font-sans text-sm relative z-10">Focuses on the fundamentals of the game, motor skills, and building a love for cricket.</p>
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading text-slate uppercase mb-4">Core Curriculum</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "Batting basics: Grip, stance, and backlift",
                    "Bowling fundamentals: Grip and smooth run-up",
                    "Fielding: Catching, throwing, and agility drills",
                    "Match simulations (soft ball / tennis ball)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-crimson shrink-0"></div>
                      <span className="font-sans text-slate/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-slate/10 flex items-center justify-between">
                <span className="text-sm font-mono text-slate/50">Reg. Fee: ₹1500</span>
                <Link href="/login?tab=signup">
                  <Button className="bg-slate hover:bg-slate/90 text-white font-heading uppercase tracking-widest rounded-sm px-8">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Senior Camp */}
          <div className="card-dossier overflow-hidden flex flex-col md:flex-row" id="seniors">
            <div className="bg-slate p-8 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-8xl font-heading text-white/5 pointer-events-none">U16</div>
              <h2 className="text-3xl font-heading text-white uppercase mb-2 relative z-10">Senior Camp</h2>
              <div className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-mono tracking-widest uppercase rounded-sm border border-white/20 w-max mb-4 relative z-10">
                Ages 13-16
              </div>
              <p className="text-white/80 font-sans text-sm relative z-10">Advanced skill development and match awareness tailored for competitive players.</p>
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading text-slate uppercase mb-4">Core Curriculum</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "Advanced batting: Shot selection and playing spin/pace",
                    "Bowling variations: Seam presentation, swing, and spin tactics",
                    "Fielding dynamics: Direct hits, slip catching, and field placements",
                    "Hard ball net sessions on turf wickets & turf match simulations"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-crimson shrink-0"></div>
                      <span className="font-sans text-slate/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-slate/10 flex items-center justify-between">
                <span className="text-sm font-mono text-slate/50">Reg. Fee: ₹2500</span>
                <Link href="/login?tab=signup">
                  <Button className="bg-crimson hover:bg-crimson/90 text-white font-heading uppercase tracking-widest rounded-sm px-8">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
