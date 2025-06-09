"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Globe, Shield, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

import { useMetaMask } from "@/hooks/useMetaMask"
import { Donation, getDonationsByDonorEmail } from "@/lib/astradb"
import { MetaMaskButton } from "@/components/MetaMaskButton"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

const charities: Record<string, any> = {
  "global-water-foundation": {
    name: "Global Water Foundation",
    category: "Environment"
  },
  "childrens-health-fund": {
    name: "Children's Health Fund",
    category: "Health"
  }
}

export default function DashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  const { account } = useMetaMask()
  
  const loadDonations = async (userEmail: string) => {
    if (!userEmail) return
    
    setIsLoading(true)
    try {
      const userDonations = await getDonationsByDonorEmail(userEmail)
      setDonations(userDonations)
      setHasSearched(true)
    } catch (error) {
      console.error("Failed to load donations:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadDonations(email)
  }

  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Format amount with currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  // Shorten transaction hash
  const shortenTxHash = (hash?: string) => {
    if (!hash) return 'N/A'
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
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
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
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
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Donation Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Track your donations and see the impact you've made
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Donation Lookup
                </CardTitle>
                <CardDescription>
                  Enter the email address you used for donations to see your history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Search"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {hasSearched && (
              <motion.div className="mt-8" {...fadeInUp}>
                <h2 className="text-2xl font-bold mb-4">Your Donations</h2>
                
                {donations.length > 0 ? (
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Charity</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Transaction</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {donations.map((donation) => (
                            <TableRow key={donation.id}>
                              <TableCell className="font-medium">{formatDate(donation.createdAt)}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  {charities[donation.charity]?.name || 'Unknown Charity'}
                                  <Badge variant="outline" className="w-fit mt-1">
                                    {charities[donation.charity]?.category || 'Other'}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>{formatAmount(donation.amount)}</TableCell>
                              <TableCell>
                                {donation.paymentMethod === 'crypto' ? 'Cryptocurrency' : donation.paymentMethod}
                              </TableCell>
                              <TableCell>
                                {donation.transactionHash ? (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs">{shortenTxHash(donation.transactionHash)}</span>
                                    <Button variant="ghost" size="icon" className="h-5 w-5" asChild>
                                      <a href={`https://etherscan.io/tx/${donation.transactionHash}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    </Button>
                                  </div>
                                ) : (
                                  'N/A'
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    donation.status === 'completed' ? 'default' : 
                                    donation.status === 'pending' ? 'outline' : 'destructive'
                                  }
                                >
                                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t p-4">
                      <div className="text-sm text-muted-foreground">
                        Total donations: {donations.length}
                      </div>
                      <div className="text-sm font-medium">
                        Total amount: {formatAmount(
                          donations.reduce((sum, donation) => sum + donation.amount, 0)
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <p>No donations found for this email address.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/charities">
                          Make Your First Donation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
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