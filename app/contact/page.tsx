'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Mail, Phone, Copy, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      await fetch('https://getform.io/f/aejjomwb', {
        method: 'POST',
        body: formData,
      })
      
      // Reset form
      form.reset()
      // Reset any controlled inputs if necessary
      // For example, if you have a controlled input for work experience:
      // setWorkExperience('one-year')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#5271FF] to-[#8946FF]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-[#5271FF]">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <X className="h-6 w-6 text-[#5271FF]" />
                <Link href="https://x.com/kalpizzy7" target="_blank" rel="noopener noreferrer" className="text-[#5271FF] hover:underline">
                  @kalpizzy7
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-[#5271FF]" />
                <span>412-400-9215</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('4124009215', 'phone')}
                  className="ml-2"
                >
                  {copiedItem === 'phone' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-[#5271FF]" />
                <span>nkalpakis21@gmail.com</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('nkalpakis21@gmail.com', 'email')}
                  className="ml-2"
                >
                  {copiedItem === 'email' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-[#5271FF]">Send Us Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_gotcha" style={{ display: 'none !important' }} />
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" name="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required className="min-h-[100px]" />
                </div>

                {/* <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup defaultValue="male" name="gender" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-experience">Work Experience</Label>
                  <Select name="work-experience" defaultValue="one-year">
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-year">0-1 years</SelectItem>
                      <SelectItem value="one-five-years">1-5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="subscribe" name="subscribe" defaultChecked />
                  <Label htmlFor="subscribe">Subscribe to newsletter</Label>
                </div> */}

                <Button 
                  type="submit" 
                  className="w-full bg-[#5271FF] hover:bg-[#5271FF]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

