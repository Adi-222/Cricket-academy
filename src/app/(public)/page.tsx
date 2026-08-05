import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Cricket Stadium at Sunset"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white text-glow">
            Master the Game.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto font-medium">
            Join West Bengal's premier cricket academy. Expert coaching, world-class facilities, and a proven pathway to excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?tab=signup">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                Enroll Now
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full glass hover:bg-white/10 border-white/20 text-white">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expert Coaches", desc: "Learn from former state and national level players with BCCI certifications." },
              { title: "World-Class Facilities", desc: "Multiple practice nets, bowling machines, and video analysis capabilities." },
              { title: "Multiple Locations", desc: "Conveniently located centers across West Bengal for easy accessibility." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl glass-dark border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to take your game to the next level?</h2>
          <p className="text-xl text-zinc-400 mb-10">
            Admissions are now open for the upcoming season. Limited spots available across all age groups.
          </p>
          <Link href="/login?tab=signup">
            <Button size="lg" className="text-lg px-10 py-6 rounded-full shadow-xl">
              Register Today
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
