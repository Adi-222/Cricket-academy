export default function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-glow">About Us</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h2>
          <p className="text-lg text-zinc-300 leading-relaxed mb-6">
            To be the premier institution for cricket development in West Bengal, producing world-class players who excel at all levels of the game while fostering sportsmanship and integrity.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            We provide structured, high-quality coaching, state-of-the-art facilities, and competitive exposure to nurture talent from the grassroots to the professional level.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hardcoded for now, will be CMS driven later */}
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Rahul Banerjee</h3>
              <p className="text-sm text-primary mb-3">Head Coach (Level 3 Certified)</p>
              <p className="text-zinc-400">Former Ranji Trophy player with 15 years of coaching experience.</p>
            </div>
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Amit Das</h3>
              <p className="text-sm text-primary mb-3">Bowling Consultant</p>
              <p className="text-zinc-400">Specializes in pace bowling mechanics and injury prevention.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
