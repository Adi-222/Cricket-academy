export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl py-24">
        <div className="mb-16 border-b border-slate/10 pb-8">
          <h1 className="text-5xl md:text-6xl font-heading text-slate uppercase mb-4">About Us</h1>
          <p className="text-xl font-sans text-muted-foreground">Building the next generation of cricketing excellence.</p>
        </div>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-crimson"></div>
            <h2 className="text-3xl font-heading text-slate uppercase">Our Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-heading text-slate uppercase mb-4 tracking-wide text-eden">The Vision</h3>
              <p className="text-lg text-slate/80 leading-relaxed font-sans">
                To be the premier institution for cricket development in West Bengal, producing world-class players who excel at all levels of the game while fostering supreme sportsmanship and unshakeable integrity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading text-slate uppercase mb-4 tracking-wide text-eden">The Mission</h3>
              <p className="text-lg text-slate/80 leading-relaxed font-sans">
                We provide structured, high-intensity coaching, state-of-the-art facilities, and intense competitive exposure to nurture raw talent from the grassroots directly to the professional arena.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-crimson"></div>
            <h2 className="text-3xl font-heading text-slate uppercase">Coaching Staff</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hardcoded for now, will be CMS driven later */}
            <div className="card-dossier p-0 overflow-hidden flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 bg-pitch flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-slate/10">
                <div className="w-20 h-20 bg-slate rounded-full flex items-center justify-center text-white font-heading text-2xl">RB</div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-heading text-slate uppercase mb-1">Rahul Banerjee</h3>
                <p className="text-xs font-mono text-crimson uppercase tracking-wider mb-3">Head Coach • L3 BCCI</p>
                <p className="text-sm text-muted-foreground font-sans">Former Ranji Trophy player with 15 years of elite coaching experience across domestic circuits.</p>
              </div>
            </div>

            <div className="card-dossier p-0 overflow-hidden flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 bg-pitch flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-slate/10">
                <div className="w-20 h-20 bg-slate rounded-full flex items-center justify-center text-white font-heading text-2xl">AD</div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-heading text-slate uppercase mb-1">Amit Das</h3>
                <p className="text-xs font-mono text-crimson uppercase tracking-wider mb-3">Bowling Consultant</p>
                <p className="text-sm text-muted-foreground font-sans">Specializes in pace bowling bio-mechanics, workload management, and injury prevention.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
