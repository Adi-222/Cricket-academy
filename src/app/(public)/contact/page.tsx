import { Button } from "@/components/ui/button"

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-glow">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-dark p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Send an Enquiry</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"></textarea>
              </div>
              <Button type="button" className="w-full">Submit</Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Headquarters</h2>
              <address className="not-italic text-zinc-300 space-y-2">
                <p>123 Stadium Road</p>
                <p>Salt Lake City, Kolkata</p>
                <p>West Bengal, 700098</p>
              </address>
              <div className="mt-6 space-y-2 text-zinc-300">
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> info@cricketacademy.com</p>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4">WhatsApp Us</h2>
              <p className="text-zinc-400 mb-6">Get instant replies to your queries during working hours.</p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 hover:text-white border-0">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
