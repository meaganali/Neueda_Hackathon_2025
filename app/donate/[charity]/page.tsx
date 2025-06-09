"use client"

import Link from "next/link"
import { ArrowLeft, Globe, Heart, Shield, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

// Mock charity data - in a real app, this would come from an API
const charityData: Record<string, any> = {
  "global-water-foundation": {
    name: "Global Water Foundation",
    category: "Environment",
    description: "Providing clean water access to communities in need around the world.",
    impact: "50 wells built serving over 25,000 people",
    location: "East Africa",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "The Global Water Foundation has been working tirelessly for over 15 years to bring clean, safe drinking water to communities across East Africa. Our comprehensive approach includes drilling wells, installing water purification systems, and training local communities in maintenance and sustainability practices.",
    goals: [
      "Build 100 new wells by end of 2025",
      "Train 500 local water technicians",
      "Reach 50,000 people with clean water access",
    ],
  },
  "education-for-all": {
    name: "Education For All",
    category: "Education",
    description: "Supporting schools and educational programs in underserved communities.",
    impact: "15 schools supported, reaching 5,000 students",
    location: "Southeast Asia",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "Education For All believes that every child deserves access to quality education. We work with local communities to build schools, train teachers, and provide educational materials to ensure children have the tools they need to succeed.",
    goals: ["Support 25 schools by 2026", "Train 200 teachers", "Provide educational materials to 10,000 students"],
  },
  "childrens-health-fund": {
    name: "Children's Health Fund",
    category: "Health",
    description: "Providing medical care and health services to children in need.",
    impact: "30,000 children received medical care",
    location: "Global",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "The Children's Health Fund is dedicated to ensuring that all children have access to quality healthcare, regardless of their economic circumstances. We operate mobile health clinics and partner with local healthcare providers to deliver essential medical services.",
    goals: [
      "Reach 50,000 children with medical care",
      "Establish 10 new mobile clinics",
      "Train 100 local healthcare workers",
    ],
  },
}

export default function DonatePage({ params }: { params: { charity: string } }) {
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const charity = charityData[params.charity] || charityData["global-water-foundation"]

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div className="flex items-center gap-2 font-bold" whileHover={{ scale: 1.05 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-primary" />
            </motion.div>
            <Link href="/">Trace the Change</Link>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
                How It Works
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/charities" className="text-sm font-medium hover:text-primary">
                Charities
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/about-us" className="text-sm font-medium hover:text-primary">
                About Us
              </Link>
            </motion.div>
          </nav>
          <div className="flex items-center gap-4">
            <motion.div {...scaleOnHover}>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link href="#">Log In</Link>
              </Button>
            </motion.div>
            <motion.div {...scaleOnHover}>
              <Button asChild>
                <Link href="#">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div {...scaleOnHover}>
                <Button asChild variant="outline" size="sm">
                  <Link href="/charities">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Charities
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={charity.imageUrl}
                  alt={charity.name}
                  className="w-full h-64 object-cover rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <motion.h1
                      className="text-3xl font-bold tracking-tighter"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {charity.name}
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Badge variant="outline">{charity.category}</Badge>
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {charity.description}
                  </motion.p>

                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {charity.longDescription}
                  </motion.p>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h3 className="font-semibold">Current Goals:</h3>
                    <ul className="space-y-1">
                      {charity.goals.map((goal: string, index: number) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                        >
                          <Heart className="h-4 w-4 text-primary" />
                          {goal}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Impact</p>
                      <p className="font-semibold">{charity.impact}</p>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{charity.location}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Make a Donation
                    </CardTitle>
                    <CardDescription>
                      Your donation will be tracked on the blockchain for complete transparency.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Donation Amount</Label>
                      <motion.div
                        className="grid grid-cols-3 gap-2"
                        variants={{
                          animate: {
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                        initial="initial"
                        animate="animate"
                      >
                        {predefinedAmounts.map((amount) => (
                          <motion.div
                            key={amount}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant={donationAmount === amount.toString() ? "default" : "outline"}
                              className="w-full"
                              onClick={() => {
                                setDonationAmount(amount.toString())
                                setCustomAmount("")
                              }}
                            >
                              ${amount}
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="space-y-2">
                        <Label htmlFor="custom-amount">Custom Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="pl-8"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setDonationAmount("")
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">Donor Information</Label>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={isAnonymous}
                          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Make this donation anonymous
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">Payment Information</Label>

                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="debit-card">Debit Card</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="card-number" placeholder="1234 5678 9012 3456" className="pl-10" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea id="message" placeholder="Leave a message of support..." className="min-h-[80px]" />
                    </div>

                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg">
                        <Shield className="h-5 w-5 text-primary" />
                        <div className="text-sm">
                          <p className="font-medium">Blockchain Verified</p>
                          <p className="text-muted-foreground">
                            Your donation will be tracked transparently on the blockchain
                          </p>
                        </div>
                      </div>

                      <motion.div {...scaleOnHover}>
                        <Button className="w-full" size="lg">
                          Donate ${customAmount || donationAmount || "0"}
                        </Button>
                      </motion.div>

                      <p className="text-xs text-muted-foreground text-center">
                        By donating, you agree to our Terms of Service and Privacy Policy. A 2% platform fee will be
                        applied to cover operational costs.
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <motion.footer
        className="w-full border-t bg-background py-6 md:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <motion.div className="flex items-center gap-2 font-bold" whileHover={{ scale: 1.05 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-primary" />
            </motion.div>
            <span>Trace the Change</span>
          </motion.div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Trace the Change. All rights reserved.
          </p>
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
