"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, BarChart3, Globe, Shield } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetaMaskButton } from "@/components/MetaMaskButton"
import { astraService, Donation } from "@/lib/astradb"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export default function Home() {
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);

  // Load recent donations from AstraDB
  useEffect(() => {
    async function fetchDonations() {
      try {
        const donations = await astraService.getAllDonations(5);
        setRecentDonations(donations);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setIsLoadingDonations(false);
      }
    }
    
    fetchDonations();
  }, []);
  
  // Format date string
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Format donor name
  const formatDonorName = (donation: Donation) => {
    if (!donation.donor) return "Anonymous";
    if (donation.donor.isAnonymous) return "Anonymous";
    return `${donation.donor.firstName} ${donation.donor.lastName}`;
  }

  // Get charity name from ID
  const getCharityName = (charityId: string) => {
    const charities: Record<string, string> = {
      "global-water-foundation": "Global Water Foundation",
      "education-for-all": "Education For All",
      "childrens-health-fund": "Children's Health Fund"
    };
    
    return charities[charityId] || charityId;
  }

  // Format amount
  const formatAmount = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
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
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Transparent Donations
                </motion.div>
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Know Where Your Impact Is Being Made
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Trace the Change uses blockchain technology to provide complete transparency in charitable giving.
                  Track every dollar of your donation and see the real-world impact you're making.
                </motion.p>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.div {...scaleOnHover}>
                    <Button asChild size="lg">
                      <Link href="/charities">
                        Start Donating
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div {...scaleOnHover}>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/how-it-works">Learn More</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last flex items-center justify-center"
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <Image
                  src="/trace-the-change-logo.png"
                  width={400}
                  height={400}
                  alt="Trace the Change Logo"
                  className="rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" {...fadeInUp}>
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Our Mission
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Transparency in Giving
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  We believe that donors deserve to know exactly how their contributions are being used. Our
                  blockchain-powered platform ensures complete transparency and accountability in charitable giving.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <Shield className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Secure Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      Blockchain technology ensures your donations are securely tracked from your wallet to the final
                      recipient.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Real-time Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      See the real-world impact of your donations with real-time updates and detailed reporting.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <Globe className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Global Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      Support verified charities and causes around the world with confidence in how your funds are used.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Making An Impact
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Top Donations
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  See how our community is making a difference through transparent giving.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto max-w-4xl py-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="donations" className="w-full max-w-5xl">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="donations">Recent Donations</TabsTrigger>
                  <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="donations">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Latest Verified Donations</CardTitle>
                        <CardDescription>Recent contributions from our community</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        {isLoadingDonations ? (
                          <div className="flex justify-center items-center h-48">
                            <div className="animate-pulse text-muted-foreground">Loading donation data...</div>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Donor</TableHead>
                                <TableHead>Charity</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {recentDonations.length > 0 ? (
                                recentDonations.map((donation) => (
                                  <TableRow key={donation.id}>
                                    <TableCell className="font-medium">{formatDonorName(donation)}</TableCell>
                                    <TableCell>{getCharityName(donation.charity)}</TableCell>
                                    <TableCell>{formatAmount(donation.amount, donation.currency)}</TableCell>
                                    <TableCell className="hidden md:table-cell">{formatDate(donation.createdAt)}</TableCell>
                                    <TableCell className="text-right">
                                      <Badge 
                                        className={donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                      >
                                        {donation.status === 'completed' ? 'Verified' : 'Pending'}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center h-24">No donations found</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="impact" className="mt-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Charity</TableHead>
                              <TableHead>Total Raised</TableHead>
                              <TableHead>Impact Metric</TableHead>
                              <TableHead className="hidden md:table-cell">Location</TableHead>
                              <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Clean Water Initiative</TableCell>
                              <TableCell>$125,000</TableCell>
                              <TableCell>50 wells built</TableCell>
                              <TableCell className="hidden md:table-cell">East Africa</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                  In Progress
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Reforestation Project</TableCell>
                              <TableCell>$98,500</TableCell>
                              <TableCell>25,000 trees planted</TableCell>
                              <TableCell className="hidden md:table-cell">Amazon Basin</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Completed
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Education For All</TableCell>
                              <TableCell>$75,000</TableCell>
                              <TableCell>15 schools supported</TableCell>
                              <TableCell className="hidden md:table-cell">Southeast Asia</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                  In Progress
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Medical Supplies Fund</TableCell>
                              <TableCell>$112,750</TableCell>
                              <TableCell>30 clinics equipped</TableCell>
                              <TableCell className="hidden md:table-cell">Global</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Completed
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Hunger Relief</TableCell>
                              <TableCell>$85,000</TableCell>
                              <TableCell>100,000 meals served</TableCell>
                              <TableCell className="hidden md:table-cell">Multiple Regions</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                  In Progress
                                </span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div {...scaleOnHover}>
                  <Button asChild variant="outline">
                    <Link href="#">
                      View All Donations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-t">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Join Our Mission
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Be part of a movement that's transforming charitable giving through transparency and accountability.
                </motion.p>
              </div>
              <motion.div
                className="w-full max-w-sm space-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div {...scaleOnHover}>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/charities">Get Started Today</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
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
            <Image
              src="/trace-the-change-logo.png"
              width={24}
              height={24}
              alt="Trace the Change Logo"
              className="rounded-full"
            />
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
