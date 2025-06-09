"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Globe, Shield, ExternalLink, Calendar, DollarSign, Activity, User, BarChart4, TrendingUp, RefreshCw } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useMetaMask } from "@/hooks/useMetaMask"
import { Donation, getDonationsByDonorEmail, astraService } from "@/lib/astradb"
import { MetaMaskButton } from "@/components/MetaMaskButton"
import { Separator } from "@/components/ui/separator"

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
    category: "Environment",
    color: "bg-emerald-500"
  },
  "education-for-all": {
    name: "Education For All",
    category: "Education",
    color: "bg-blue-500"
  },
  "childrens-health-fund": {
    name: "Children's Health Fund",
    category: "Health",
    color: "bg-rose-500"
  }
}

export default function DashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [allDonations, setAllDonations] = useState<Donation[]>([])
  const [isLoadingAll, setIsLoadingAll] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [refreshKey, setRefreshKey] = useState(0)
  
  const { account } = useMetaMask()
  
  // Load donations by email
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
  
  // Load all donations from AstraDB
  useEffect(() => {
    async function loadAllDonations() {
      setIsLoadingAll(true)
      try {
        const allDonationsData = await astraService.getAllDonations(50)
        setAllDonations(allDonationsData)
      } catch (error) {
        console.error("Failed to load all donations:", error)
      } finally {
        setIsLoadingAll(false)
      }
    }
    
    loadAllDonations()
  }, [refreshKey])
  
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1)
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
  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }
  
  // Shorten transaction hash
  const shortenTxHash = (hash?: string) => {
    if (!hash) return 'N/A'
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }
  
  // Calculate statistics for dashboard overview
  const totalDonationAmount = allDonations.reduce((sum, donation) => sum + donation.amount, 0)
  const averageDonationAmount = allDonations.length ? totalDonationAmount / allDonations.length : 0
  const donationsByCharity = allDonations.reduce((acc, donation) => {
    const charity = donation.charity
    if (!acc[charity]) acc[charity] = { count: 0, amount: 0 }
    acc[charity].count++
    acc[charity].amount += donation.amount
    return acc
  }, {} as Record<string, { count: number, amount: number }>)
  
  // Get donor names (first names only) for recent donors display
  const recentDonors = allDonations
    .filter(donation => donation.donor && !donation.donor.isAnonymous)
    .map(donation => donation.donor.firstName)
    .filter((name, index, self) => self.indexOf(name) === index)
    .slice(0, 5)
  
  // Get payment methods breakdown
  const paymentMethods = allDonations.reduce((acc, donation) => {
    const method = donation.paymentMethod
    if (!acc[method]) acc[method] = { count: 0, amount: 0 }
    acc[method].count++
    acc[method].amount += donation.amount
    return acc
  }, {} as Record<string, { count: number, amount: number }>)
  
  // Calculate recent donation trends (simplified)
  const getActivityTrendValue = () => {
    const recentDonations = allDonations.slice(0, 5).length
    const olderDonations = allDonations.slice(5, 10).length
    if (recentDonations > olderDonations) return "Increasing"
    if (recentDonations < olderDonations) return "Decreasing"
    return "Stable"
  }

  // Get donations by date bucketing
  const getDonationsByDate = () => {
    const donationsByDay: Record<string, number> = {}
    allDonations.forEach(donation => {
      const date = new Date(donation.createdAt || 0).toLocaleDateString()
      if (!donationsByDay[date]) donationsByDay[date] = 0
      donationsByDay[date] += donation.amount
    })
    return Object.entries(donationsByDay).slice(-7).map(([date, amount]) => ({ date, amount }))
  }
  
  const donationDateData = getDonationsByDate()

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <motion.div className="flex items-center gap-2 font-bold" whileHover={{ scale: 1.05 }}>
              <Image
                src="/trace-the-change-logo.png"
                width={32}
                height={32}
                alt="Trace the Change Logo"
                className="rounded-full"
              />
              <span>Trace the Change</span>
            </motion.div>
          </Link>
          <nav className="hidden md:flex gap-6">
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
      <main className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <section className="w-full py-8 md:py-10">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center">
                  <BarChart4 className="h-8 w-8 mr-3 text-primary" />
                  Donation Analytics Dashboard
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Track donations and monitor impact in real-time
                </p>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} className="mt-4 md:mt-0">
                <Button onClick={handleRefresh} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </Button>
              </motion.div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="all">Analytics Overview</TabsTrigger>
                <TabsTrigger value="user">Your Donations</TabsTrigger>
              </TabsList>
              
              {/* ALL DONATIONS TAB */}
              <TabsContent value="all" className="space-y-8">
                {isLoadingAll ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-pulse flex items-center gap-2">
                      <Activity className="h-5 w-5 text-muted-foreground" />
                      <span>Loading donation data...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dashboard Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <Card className="overflow-hidden border-t-4 border-primary">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-primary" />
                              Total Donations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formatAmount(totalDonationAmount)}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              From {allDonations.length} donations
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <Card className="overflow-hidden border-t-4 border-emerald-500">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                              Average Donation
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formatAmount(averageDonationAmount)}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Per transaction
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <Card className="overflow-hidden border-t-4 border-blue-500">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <User className="h-4 w-4 mr-2 text-blue-500" />
                              Recent Donors
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1">
                              {recentDonors.length > 0 ? recentDonors.map((donor, index) => (
                                <Badge key={index} variant="secondary">{donor}</Badge>
                              )) : <span className="text-sm text-muted-foreground">No donor data</span>}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Card className="overflow-hidden border-t-4 border-amber-500">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <Activity className="h-4 w-4 mr-2 text-amber-500" />
                              Activity Trend
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{getActivityTrendValue()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Based on recent donations
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                    
                    {/* Donation Distribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Donations by Charity</CardTitle>
                            <CardDescription>Distribution across charitable organizations</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {Object.entries(donationsByCharity).map(([charityId, data]) => {
                                const charityInfo = charities[charityId] || { name: charityId, color: "bg-gray-500" }
                                const percentage = totalDonationAmount > 0 ? 
                                  Math.round((data.amount / totalDonationAmount) * 100) : 0
                                
                                return (
                                  <div key={charityId} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>{charityInfo.name}</span>
                                      <span className="font-medium">{formatAmount(data.amount)}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                      <div 
                                        className={`h-full ${charityInfo.color}`} 
                                        style={{ width: `${percentage}%` }} 
                                      />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>{data.count} donations</span>
                                      <span>{percentage}%</span>
                                    </div>
                                  </div>
                                )
                              })}
                              
                              {Object.keys(donationsByCharity).length === 0 && (
                                <div className="text-center py-6 text-muted-foreground">
                                  No donation data available
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Payment Methods</CardTitle>
                            <CardDescription>Breakdown by payment type</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {Object.entries(paymentMethods).map(([method, data], index) => {
                                const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500"]
                                const percentage = totalDonationAmount > 0 ? 
                                  Math.round((data.amount / totalDonationAmount) * 100) : 0
                                
                                // Format payment method name
                                const formatMethodName = (name: string) => {
                                  if (name === "crypto") return "Cryptocurrency"
                                  if (name === "bank-transfer") return "Bank Transfer"
                                  if (name === "credit-card") return "Credit Card"
                                  return name.charAt(0).toUpperCase() + name.slice(1)
                                }
                                
                                return (
                                  <div key={method} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>{formatMethodName(method)}</span>
                                      <span className="font-medium">{formatAmount(data.amount)}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                      <div 
                                        className={colors[index % colors.length]} 
                                        style={{ width: `${percentage}%` }} 
                                      />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>{data.count} transactions</span>
                                      <span>{percentage}%</span>
                                    </div>
                                  </div>
                                )
                              })}
                              
                              {Object.keys(paymentMethods).length === 0 && (
                                <div className="text-center py-6 text-muted-foreground">
                                  No payment data available
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                    
                    {/* Recent Donations Table */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            Recent Donations
                          </CardTitle>
                          <CardDescription>Latest transactions across all charities</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Donor</TableHead>
                                <TableHead>Charity</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {allDonations.slice(0, 10).map((donation) => (
                                <TableRow key={donation.id} className="hover:bg-muted/50">
                                  <TableCell className="font-medium">{formatDate(donation.createdAt || '')}</TableCell>
                                  <TableCell>
                                    {donation.donor?.isAnonymous ? 
                                      'Anonymous' : 
                                      `${donation.donor?.firstName} ${donation.donor?.lastName}`}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <div className={`w-2 h-2 rounded-full ${charities[donation.charity]?.color || 'bg-gray-500'} mr-2`}></div>
                                      {charities[donation.charity]?.name || donation.charity}
                                    </div>
                                  </TableCell>
                                  <TableCell>{formatAmount(donation.amount)}</TableCell>
                                  <TableCell>
                                    {donation.paymentMethod === 'crypto' ? 'Cryptocurrency' : 
                                     donation.paymentMethod === 'bank-transfer' ? 'Bank Transfer' :
                                     donation.paymentMethod === 'credit-card' ? 'Credit Card' :
                                     donation.paymentMethod.charAt(0).toUpperCase() + donation.paymentMethod.slice(1)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge 
                                      variant={
                                        donation.status === 'completed' ? 'default' : 
                                        donation.status === 'pending' ? 'outline' : 'destructive'
                                      }
                                      className="capitalize"
                                    >
                                      {donation.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                              
                              {allDonations.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No donations found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </>
                )}
              </TabsContent>
              
              {/* USER DONATIONS TAB */}
              <TabsContent value="user" className="space-y-8">
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
                  <motion.div {...fadeInUp}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Donations</CardTitle>
                        <CardDescription>
                          Donations associated with {email}
                        </CardDescription>
                      </CardHeader>
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
                            {donations.length > 0 ? (
                              donations.map((donation) => (
                                <TableRow key={donation.id}>
                                  <TableCell className="font-medium">{formatDate(donation.createdAt || '')}</TableCell>
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
                                    {donation.paymentMethod === 'crypto' ? 'Cryptocurrency' : 
                                     donation.paymentMethod === 'bank-transfer' ? 'Bank Transfer' :
                                     donation.paymentMethod === 'credit-card' ? 'Credit Card' :
                                     donation.paymentMethod}
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
                                      {donation.status?.charAt(0).toUpperCase() + (donation.status ? donation.status.slice(1) : '')}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                  No donations found for this email address
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
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