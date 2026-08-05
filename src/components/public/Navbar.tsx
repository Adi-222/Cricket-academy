import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            CA
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Cricket Academy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/programs" className="hover:text-primary transition-colors">Programs</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Log In</Button>
          </Link>
          <Link href="/login?tab=signup">
            <Button className="font-semibold shadow-lg shadow-primary/20">Enroll Now</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
