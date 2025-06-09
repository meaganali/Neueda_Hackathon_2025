"use client"

import React, { use } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Heart, Shield, CreditCard, Wallet, Building } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useMetaMask } from "@/hooks/useMetaMask"
import { createDonation, updateDonationStatus, getCharity } from "@/lib/astradb"
import { MetaMaskButton } from "@/components/MetaMaskButton"

// PayPal Icon component
const PayPalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M17.5 7H20C21.1 7 22 7.9 22 9V12C22 13.1 21.1 14 20 14H17.5C18.3 14 19 13.3 19 12.5V8.5C19 7.7 18.3 7 17.5 7Z" />
    <path d="M14 6H4C2.9 6 2 6.9 2 8V12C2 13.1 2.9 14 4 14H9L12 17V14H14C15.1 14 16 13.1 16 12V8C16 6.9 15.1 6 14 6Z" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

// Default charity data in case database fetch fails
const defaultCharityData: Record<string, any> = {
  "sustainability-initiative": {
    name: "Global Climate Action Fund",
    category: "Environmental Sustainability",
    description: "Supporting global climate initiatives and sustainable development projects that reduce carbon emissions and promote renewable energy in underserved communities.",
    impact: "200,000 tons of carbon emissions reduced",
    location: "Global",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "The Global Climate Action Fund is at the forefront of addressing climate change through innovative solutions and community-led initiatives. We partner with local organizations to implement renewable energy projects, reforestation efforts, and sustainable agriculture practices that benefit both the environment and local communities.",
    goals: [
      "Reduce carbon emissions by 500,000 tons by 2030",
      "Install renewable energy in 100 communities",
      "Plant 1 million trees in deforested areas",
    ],
    wallet: "0x1234567890123456789012345678901234567890",
  },
  "financial-inclusion": {
    name: "Financial Literacy Foundation",
    category: "Financial Inclusion",
    description: "Empowering communities through financial education and micro-lending programs to promote economic mobility and financial inclusion for underrepresented groups.",
    impact: "50,000 individuals trained in financial literacy",
    location: "Multiple Countries",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "The Financial Literacy Foundation works to bridge the knowledge gap in personal finance and economic empowerment. Through education programs, micro-financing initiatives, and mentorship, we help individuals gain the skills and resources needed to achieve financial independence and build generational wealth in underserved communities.",
    goals: [
      "Reach 100,000 people with financial education",
      "Distribute 5,000 micro-loans to women entrepreneurs",
      "Launch digital financial literacy platform in 20 languages"
    ],
    wallet: "0x2345678901234567890123456789012345678901",
  },
  "community-development": {
    name: "Urban Opportunity Alliance",
    category: "Community Development",
    description: "Revitalizing urban areas through affordable housing initiatives, small business development, and community infrastructure improvement projects.",
    impact: "25 urban neighborhoods revitalized",
    location: "Urban Centers",
    imageUrl: "/placeholder.svg?height=300&width=600",
    longDescription:
      "The Urban Opportunity Alliance is dedicated to transforming underserved urban areas into thriving, sustainable communities. We focus on comprehensive development approaches that include affordable housing, small business support, workforce development, and public space improvements to create equitable opportunities for all residents.",
    goals: [
      "Develop 1,000 units of affordable housing",
      "Support 500 small businesses in urban cores",
      "Create 20 community centers in underserved neighborhoods"
    ],
    wallet: "0x3456789012345678901234567890123456789012",
  },
}

export default function DonatePage({ params }: { params: { charity: string } }) {
  // We'll use params directly for now as we're in a client component
  // The warning is for server components, but we can ignore for this client component
  const { charity: charityId } = params;
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  
  // MetaMask integration
  const { 
    isConnected,
    connect, 
    account,
    sendEth,
    isInstalled
  } = useMetaMask()
  
  // References to scroll to
  const cryptoSectionRef = useRef<HTMLDivElement>(null)
  
  // State for charity data
  const [charityData, setCharityData] = useState<Record<string, any>>({})
  const [isLoadingCharity, setIsLoadingCharity] = useState(true)

  // Fetch charity information from AstraDB
  useEffect(() => {
    const fetchCharity = async () => {
      try {
        setIsLoadingCharity(true)
        const charity = await getCharity(charityId)
        if (charity) {
          setCharityData({
            [charityId]: charity
          })
        }
      } catch (error) {
        console.error("Error fetching charity data:", error)
        // If there's an error, fall back to default data
        setCharityData(defaultCharityData)
      } finally {
        setIsLoadingCharity(false)
      }
    }
    
    fetchCharity()
  }, [charityId])
  
  const charity = (charityData && charityData[charityId]) || 
                  defaultCharityData[charityId] || 
                  defaultCharityData["sustainability-initiative"]
  const predefinedAmounts = [25, 50, 100, 250, 500, 1000]

  // Handles change in form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setDonorInfo(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Auto-select crypto payment method when connected to MetaMask
  useEffect(() => {
    if (isConnected && paymentMethod === "") {
      setPaymentMethod("crypto")
    }
  }, [isConnected, paymentMethod])

  const scrollToCryptoSection = () => {
    if (cryptoSectionRef.current) {
      cryptoSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleConnectForPayment = async () => {
    try {
      await connect()
      setPaymentMethod("crypto")
      scrollToCryptoSection()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    if (value === 'crypto' && !isConnected) {
      toast.info("Please connect your MetaMask wallet", {
        description: "You'll need to connect your wallet to make a crypto donation",
        action: {
          label: "Connect",
          onClick: handleConnectForPayment
        }
      })
    }
  }

  const validateForm = () => {
    // Amount validation
    const amount = customAmount || donationAmount
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid donation amount")
      return false
    }
    
    // Basic validation for donor info
    if (paymentMethod !== 'crypto' || !isAnonymous) {
      if (!donorInfo.firstName.trim()) {
        toast.error("Please enter your first name")
        return false
      }
      if (!donorInfo.lastName.trim()) {
        toast.error("Please enter your last name")
        return false
      }
      if (!donorInfo.email.trim()) {
        toast.error("Please enter your email address")
        return false
      }
    }

    // Payment method validation
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return false
    }
    
    // For crypto payments, check if MetaMask is connected
    if (paymentMethod === 'crypto' && !isConnected) {
      toast.error("Please connect your MetaMask wallet")
      return false
    }

    return true
  }

  const handleDonate = async () => {
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      const amount = customAmount || donationAmount

      // Create donation record via API route (to avoid CORS)
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donor: {
            firstName: isAnonymous ? "Anonymous" : donorInfo.firstName,
            lastName: isAnonymous ? "Donor" : donorInfo.lastName,
            email: donorInfo.email,
            phone: donorInfo.phone,
            isAnonymous
          },
          charity: charityId,
          amount: parseFloat(amount),
          currency: 'USD',
          message,
          paymentMethod
        })
      });
      
      const data = await response.json();
      const donationId = data.id;
      
      // If donation creation failed, show error
      if (!donationId) {
        toast.error("Failed to create donation record");
        return;
      }

      // Handle payment based on method
      if (paymentMethod === 'crypto') {
        try {
          // Get charity's wallet address from AstraDB
          const charityInfo = await getCharity(charityId)
          const charityWallet = charityInfo?.wallet || '0x0000000000000000000000000000000000000000'
          
          // Send crypto transaction
          const txResult = await sendEth(
            charityWallet,
            amount,
            `Donation to ${charity.name}`
          )
          
          if (txResult.success) {
            // Update donation with transaction hash via API
            if (txResult.txHash) {
              await fetch(`/api/donations/${donationId}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  status: 'completed', 
                  transactionHash: txResult.txHash 
                })
              });
              setTransactionHash(txResult.txHash)
            } else {
              await fetch(`/api/donations/${donationId}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'completed' })
              });
            }
            toast.success("Thank you for your donation!", {
              description: `Your donation of $${amount} has been successfully processed.`
            })
            setSubmissionSuccess(`Your donation of $${amount} to ${charity.name} has been successfully processed. Your transaction has been recorded on the blockchain.`);
          } else {
            await fetch(`/api/donations/${donationId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ status: 'failed' })
            });
            toast.error("Transaction failed", {
              description: txResult.error || "Please try again."
            })
          }
        } catch (error) {
          console.error('Error processing crypto payment:', error)
          toast.error("Failed to process crypto payment")
        }
      } else if (paymentMethod === 'paypal') {
        // For PayPal (simulated success)
        await fetch(`/api/donations/${donationId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            status: 'completed', 
            transactionHash: 'paypal-' + Date.now() 
          })
        });
        toast.success("Thank you for your donation!", {
          description: `Your donation of $${amount} has been successfully processed via PayPal.`
        })
        setSubmissionSuccess(`Your donation of $${amount} to ${charity.name} has been successfully processed through PayPal.`);
      } else if (paymentMethod === 'bank-transfer') {
        // For bank transfer (simulated success)
        await fetch(`/api/donations/${donationId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'pending' })
        });
        toast.success("Thank you for initiating your donation!", {
          description: `Your donation of $${amount} is pending bank transfer confirmation.`
        })
        setSubmissionSuccess(`Your donation of $${amount} to ${charity.name} has been recorded. Please complete the bank transfer using the account details provided.`);
      } else {
        // For credit card payments (simulated success)
        await fetch(`/api/donations/${donationId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            status: 'completed', 
            transactionHash: 'card-' + Date.now() 
          })
        });
        toast.success("Thank you for your donation!", {
          description: `Your donation of $${amount} has been successfully processed.`
        })
        setSubmissionSuccess(`Your donation of $${amount} to ${charity.name} has been successfully processed.`);
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      toast.error("Failed to process your donation", {
        description: "Please try again later."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render success state if submission was successful
  if (submissionSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-8">
                <Link href="/charities" className="flex items-center text-sm font-medium text-primary hover:underline">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Charities
                </Link>
                
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Donation Successful!</CardTitle>
                    <CardDescription>
                      Thank you for your generosity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Shield className="h-5 w-5" />
                      <AlertTitle>Donation Confirmed</AlertTitle>
                      <AlertDescription>
                        {submissionSuccess}
                      </AlertDescription>
                    </Alert>
                    
                    {transactionHash && (
                      <div className="space-y-3">
                        <Label>Transaction Hash</Label>
                        <div className="flex items-center gap-2">
                          <Input value={transactionHash} readOnly className="font-mono text-xs" />
                          <Button variant="outline" size="sm" onClick={() => {
                            navigator.clipboard.writeText(transactionHash)
                            toast.success("Transaction hash copied to clipboard")
                          }}>
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-center gap-4 pt-4">
                      <Button asChild>
                        <Link href="/">Return Home</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/charities">Donate Again</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

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
              <MetaMaskButton />
            </motion.div>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link href="/charities" className="flex items-center text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Charities
              </Link>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <Badge variant="outline" className="mb-2">
                    {charity.category}
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{charity.name}</h1>
                  <p className="mt-2 text-muted-foreground">{charity.description}</p>
                </div>

                <motion.div className="mx-auto aspect-[3/2] w-full max-w-[600px] overflow-hidden rounded-xl">
                  <img
                    src={charity.imageUrl}
                    alt={charity.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/placeholder.svg?height=400&width=600";
                    }}
                    style={{
                      maxHeight: "400px"
                    }}
                  />
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">About {charity.name}</h2>
                  <p>{charity.longDescription}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Our Goals</h2>
                  <ul className="space-y-2">
                    {charity.goals.map((goal: string, index: number) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <span className="mt-1 flex h-2 w-2 rounded-full bg-primary" />
                        <span>{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Current Impact</p>
                    <p className="text-muted-foreground">{charity.impact}</p>
                  </div>
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
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            value={donorInfo.firstName}
                            onChange={handleInputChange}
                            disabled={isAnonymous}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe" 
                            value={donorInfo.lastName}
                            onChange={handleInputChange}
                            disabled={isAnonymous}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          value={donorInfo.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="123-456-7890" 
                          value={donorInfo.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={isAnonymous}
                          onCheckedChange={(checked) => {
                            setIsAnonymous(checked as boolean);
                            if (checked) {
                              setDonorInfo(prev => ({
                                ...prev,
                                firstName: "",
                                lastName: ""
                              }));
                            }
                          }}
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
                        <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crypto">Cryptocurrency (MetaMask)</SelectItem>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {paymentMethod === 'crypto' ? (
                        <div className="space-y-4" ref={cryptoSectionRef}>
                          {!isConnected ? (
                            <div className="space-y-3 p-4 border rounded-md">
                              <div className="font-medium flex items-center gap-2">
                                <Wallet className="h-4 w-4" />
                                Connect Your Wallet
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Connect your MetaMask wallet to make a cryptocurrency donation
                              </p>
                              <div className="pt-2">
                                <MetaMaskButton />
                              </div>
                            </div>
                          ) : (
                            <div className="border rounded-md p-4 space-y-2">
                              <div className="font-medium flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-primary" />
                                MetaMask Connected
                              </div>
                              <p className="text-xs text-muted-foreground break-all">
                                Wallet: {account}
                              </p>
                              <div className="text-sm text-muted-foreground mt-2">
                                <p>Your donation will be sent directly to {charity.name}'s wallet address.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : paymentMethod === 'paypal' ? (
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 space-y-2">
                            <div className="font-medium flex items-center gap-2">
                              <PayPalIcon />
                              PayPal
                            </div>
                            <p className="text-sm text-muted-foreground">
                              You'll be redirected to PayPal to complete your donation securely.
                            </p>
                            <div className="text-sm text-muted-foreground mt-2">
                              <p>No PayPal account? You can also pay with a debit or credit card through PayPal.</p>
                            </div>
                          </div>
                        </div>
                      ) : paymentMethod === 'bank-transfer' ? (
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 space-y-2">
                            <div className="font-medium flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Bank Transfer
                            </div>
                            <div className="text-sm space-y-1">
                              <p className="font-medium">Account details:</p>
                              <p>Account Name: {charity.name}</p>
                              <p>Account Number: XXXX-XXXX-XXXX-XXXX</p>
                              <p>Reference: Your email address</p>
                            </div>
                          </div>
                        </div>
                      ) : paymentMethod === 'credit-card' ? (
                        <>
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
                        </>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Leave a message of support..." 
                        className="min-h-[80px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {paymentMethod === 'crypto' && (
                        <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg">
                          <Shield className="h-5 w-5 text-primary" />
                          <div className="text-sm">
                            <p className="font-medium">Blockchain Verified</p>
                            <p className="text-muted-foreground">
                              Your donation will be tracked transparently on the blockchain
                            </p>
                          </div>
                        </div>
                      )}

                      <motion.div {...scaleOnHover}>
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={handleDonate}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : `Donate $${customAmount || donationAmount || "0"}`}
                        </Button>
                      </motion.div>

                      <p className="text-xs text-muted-foreground text-center">
                        100% of your donation goes directly to the charity
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
              <Link href="/about-us" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
