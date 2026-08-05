import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              CA
            </div>
            <span className="text-white font-bold text-lg">Cricket Academy</span>
          </div>
          <p className="text-sm leading-relaxed">
            Nurturing the next generation of cricketing talent with world-class facilities and expert coaching in West Bengal.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/programs#juniors" className="hover:text-primary transition-colors">Junior Camp (U-12)</Link></li>
            <li><Link href="/programs#seniors" className="hover:text-primary transition-colors">Senior Camp (U-16)</Link></li>
            <li><Link href="/programs#elite" className="hover:text-primary transition-colors">Elite Excellence</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <address className="text-sm not-italic space-y-2">
            <p>123 Stadium Road, Kolkata, WB</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@cricketacademy.com</p>
          </address>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Cricket Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}
