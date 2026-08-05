import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row border-b border-slate/10">
        <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-chalk z-10">
          <div className="max-w-2xl mt-16 md:mt-0">
            <div className="inline-block px-3 py-1 mb-6 text-sm font-bold tracking-wider text-crimson bg-crimson/10 border border-crimson/20 rounded-full uppercase">
              Admissions Open 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-heading text-slate mb-6 uppercase leading-[1.1]">
              The Pathway to <br/><span className="text-crimson">First-Class</span> Cricket.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 font-sans max-w-lg">
              Join West Bengal's premier cricket academy. We forge raw talent into match-winning athletes through rigorous training and BCCI-certified coaching.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/login?tab=signup">
                <Button size="lg" className="bg-crimson hover:bg-crimson/90 text-white text-lg px-8 py-6 rounded-sm shadow-sm focus-ring uppercase tracking-wider font-heading">
                  Register for Trials
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-sm border-slate text-slate hover:bg-slate hover:text-white focus-ring transition-colors uppercase tracking-wider font-heading">
                  View Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 relative min-h-[50vh] md:min-h-full border-l border-slate/10">
          <Image
            src="/images/hero-bg.png"
            alt="Cricket Coach working with a young batter in the nets"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-chalk/80 via-transparent to-transparent md:hidden"></div>
          <div className="absolute inset-0 bg-eden/10 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Scouting Report Highlights */}
      <section className="py-24 bg-pitch border-b border-slate/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-slate uppercase">The Academy Advantage</h2>
            <div className="w-16 h-1 bg-crimson mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "BCCI Certified Coaches", desc: "Train under former state players who understand what it takes to succeed at the highest levels of Indian domestic cricket.", stat: "PRO" },
              { title: "Professional Facilities", desc: "Four turf wickets, two cement tracks, bowling machines, and video analysis capabilities identical to state camps.", stat: "TURF" },
              { title: "Multiple Venues", desc: "Accessible training centers across West Bengal ensuring you spend less time commuting and more time in the nets.", stat: "3" }
            ].map((feature, i) => (
              <div key={i} className="card-dossier p-8 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 p-4 text-8xl font-heading text-slate/5 transition-transform group-hover:scale-110 pointer-events-none">{feature.stat}</div>
                <h3 className="text-2xl font-heading text-slate mb-4 uppercase relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{feature.desc}</p>
                <div className="mt-8 pt-4 border-t border-slate/10 flex justify-between items-center relative z-10">
                  <span className="text-xs font-mono text-slate/40 uppercase tracking-widest">Fact File 0{i+1}</span>
                  <div className="w-3 h-3 rounded-full bg-crimson"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
