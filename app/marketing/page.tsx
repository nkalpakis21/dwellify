import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Calendar, Home, ArrowRight } from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="relative h-[600px] bg-gradient-to-r from-[#5271FF] to-[#8946FF] flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4">
            <h1 className="text-5xl font-bold mb-4">Showcase Your Property to High-Intent Buyers</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Get paid for property viewings and only deal with serious prospects</p>
            <Button 
              size="lg" 
              className="bg-white text-[#5271FF] hover:bg-white/90"
              asChild
            >
              <Link href="/contact">List Your Property Now</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-[#5271FF]/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 text-[#5271FF]" />
                  Earn from Viewings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Receive $5 for every scheduled viewing, ensuring your time is valued and compensated.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#5271FF]/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 text-[#5271FF]" />
                  Quality Prospects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>The viewing fee filters out casual browsers, connecting you with serious, high-intent buyers.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#5271FF]/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 text-[#5271FF]" />
                  Effortless Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Integrate with Calendly for seamless viewing appointments that sync directly to your calendar.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#5271FF]/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="mr-2 text-[#5271FF]" />
                  Showcase Your Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Present your real estate in the best light with our professional listing tools and features.</p>
              </CardContent>
            </Card>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#5271FF]">How It Works</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { title: "Sign Up", description: "Create your property listing with photos and details." },
                { title: "Set Availability", description: "Use our integrated calendar system for viewings." },
                { title: "Buyers Schedule", description: "Interested buyers pay $5 to book a viewing." },
                { title: "Get Notified", description: "Receive alerts and sync with your calendar." },
                { title: "Meet Prospects", description: "Connect with high-intent buyers and close deals faster." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#5271FF] text-white flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm">{step.description}</p>
                  {index < 4 && <ArrowRight className="text-[#5271FF] mt-4 hidden md:block" />}
                </div>
              ))}
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-[#5271FF] to-[#8946FF] text-white p-16 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Maximize Your Property&#39;s Potential?</h2>
            <p className="text-xl mb-8">Join Dwellify today and start connecting with serious buyers.</p>
            <Button 
              size="lg" 
              className="bg-white text-[#5271FF] hover:bg-white/90"
              asChild
            >
              <Link href="/contact">Get Started Now</Link>
            </Button>
          </section>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Dwellify. All rights reserved.</p>
      </footer>
    </div>
  )
}

