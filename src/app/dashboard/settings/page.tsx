
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MOCK_CURRENT_USER } from "@/lib/mock-data"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
    const [name, setName] = useState(MOCK_CURRENT_USER.name);
    const [email, setEmail] = useState("m@example.com");

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Settings Saved!",
            description: "Your profile information has been updated.",
        });
    }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                  <Card>
                    <form onSubmit={handleSaveChanges}>
                      <CardHeader>
                          <CardTitle>Profile</CardTitle>
                          <CardDescription>
                              This is how others will see you on the site.
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                          </div>
                      </CardContent>
                      <CardFooter>
                          <Button type="submit">Save changes</Button>
                      </CardFooter>
                    </form>
                  </Card>
              </div>
              <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Manage your account security settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Update Password</Button>
                    </CardFooter>
                  </Card>
              </div>
            </div>
        </div>
    </div>
  )
}
