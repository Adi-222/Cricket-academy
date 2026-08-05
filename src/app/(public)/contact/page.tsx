import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Contact() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl py-24">
        <div className="mb-16 border-b border-slate/10 pb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading text-slate uppercase mb-4">Contact Us</h1>
          <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">Get in touch with our admissions office or technical support team.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-dossier p-8 border-t-4 border-t-eden">
              <h2 className="text-2xl font-heading text-slate uppercase mb-6">Headquarters</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-eden/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-eden" />
                  </div>
                  <div>
                    <h3 className="font-heading uppercase text-sm text-slate tracking-wider mb-1">Address</h3>
                    <address className="not-italic text-muted-foreground font-sans text-sm">
                      123 Stadium Road<br/>
                      Salt Lake City, Kolkata<br/>
                      West Bengal, 700098
                    </address>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-eden/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-eden" />
                  </div>
                  <div>
                    <h3 className="font-heading uppercase text-sm text-slate tracking-wider mb-1">Phone</h3>
                    <p className="text-muted-foreground font-sans text-sm">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-eden/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-eden" />
                  </div>
                  <div>
                    <h3 className="font-heading uppercase text-sm text-slate tracking-wider mb-1">Email</h3>
                    <p className="text-muted-foreground font-sans text-sm">admissions@cricketacademy.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-dossier p-8 text-center bg-[#25D366]/5 border-[#25D366]/20">
              <h2 className="text-2xl font-heading text-[#25D366] uppercase mb-4">WhatsApp Us</h2>
              <p className="text-slate/70 mb-6 font-sans text-sm">Get instant replies to your queries during working hours (9 AM - 6 PM IST).</p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 font-heading uppercase tracking-widest rounded-sm">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="card-dossier p-8 border-t-4 border-t-crimson">
              <h2 className="text-2xl font-heading text-slate uppercase mb-2">Send an Enquiry</h2>
              <p className="text-muted-foreground mb-8 font-sans text-sm">We aim to respond to all email enquiries within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-heading tracking-widest uppercase text-slate/70">First Name</label>
                    <input type="text" className="w-full bg-chalk border border-slate/10 rounded-sm px-4 py-3 text-slate font-sans focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-shadow" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-heading tracking-widest uppercase text-slate/70">Last Name</label>
                    <input type="text" className="w-full bg-chalk border border-slate/10 rounded-sm px-4 py-3 text-slate font-sans focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-shadow" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-heading tracking-widest uppercase text-slate/70">Email Address</label>
                  <input type="email" className="w-full bg-chalk border border-slate/10 rounded-sm px-4 py-3 text-slate font-sans focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-shadow" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-heading tracking-widest uppercase text-slate/70">Message</label>
                  <textarea rows={5} className="w-full bg-chalk border border-slate/10 rounded-sm px-4 py-3 text-slate font-sans focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-shadow resize-none"></textarea>
                </div>
                
                <Button type="button" className="w-full py-6 bg-slate hover:bg-slate/90 text-white font-heading uppercase tracking-widest rounded-sm text-lg">
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
