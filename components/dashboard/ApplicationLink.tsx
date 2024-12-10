"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/lib/AuthContext'
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CopyApplicationLink() {
  const [copied, setCopied] = useState(false)
  const [applicationUrl, setApplicationUrl] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setApplicationUrl(`${window.location.origin}/apply/user/${user.uid}`)
    }
  }, [user])

  const copyToClipboard = async () => {
    if (!applicationUrl) return

    try {
      await navigator.clipboard.writeText(applicationUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!user) {
    return null // Or you could return a message asking the user to log in
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Application Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This link is for users interested in buying or renting your property. Share it with potential applicants.
        </p>
        <div className="flex items-center space-x-2">
          <Button onClick={copyToClipboard} variant="outline" disabled={!applicationUrl}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Property Application Link
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

