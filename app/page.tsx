"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetaMaskButton } from "@/components/MetaMaskButton"

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

// Floating particles animation
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default function Home() {
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
            <span>Trace the Change</span>
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
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
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
        {/* Hero Section with Mission Statement */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
          <AnimatedGrid />
          <FloatingParticles />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              <motion.div
                className="space-y-6 max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  🚀 Revolutionary Blockchain Transparency
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Every Dollar. Every Impact.
                  <br />
                  <span className="text-primary">Fully Transparent.</span>
                </motion.h1>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Our Mission: Transform charitable giving through blockchain technology
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Track every donation from your wallet to real-world impact. See exactly where your money goes, how
                    it's used, and the lives it changes - all verified on an immutable blockchain ledger.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-4 min-[400px]:flex-row justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.div {...scaleOnHover}>
                    <Button asChild size="lg" className="text-lg px-8 py-6">
                      <Link href="/charities">
                        Start Donating Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div {...scaleOnHover}>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                      <Link href="/how-it-works">See How It Works</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" {...fadeInUp}>
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Why Choose Trace the Change
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Transparency in Every Transaction
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  We believe donors deserve complete visibility into how their contributions create real-world impact.
                  Our blockchain-powered platform ensures every donation is tracked, verified, and accountable.
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
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div
                      className="p-2 rounded-lg bg-primary/10"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Shield className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Blockchain Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      Every donation is cryptographically secured and recorded on an immutable blockchain, ensuring
                      complete transparency from your wallet to the final recipient.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div
                      className="p-2 rounded-lg bg-primary/10"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Real-time Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      Watch your donations create real change with live updates, detailed impact reports, and direct
                      feedback from the communities you're helping.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div
                      className="p-2 rounded-lg bg-primary/10"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Globe className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">Global Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      Support verified charities worldwide with confidence, knowing exactly how your funds are
                      distributed and what impact they're making in communities globally.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Donations Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
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
                  Community Impact
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Recent Verified Donations
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  See how our community is making a difference through transparent, blockchain-verified giving.
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
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="largest">Largest</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="mt-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardContent className="p-0">
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
                            <TableRow>
                              <TableCell className="font-medium">Anonymous</TableCell>
                              <TableCell>Global Water Foundation</TableCell>
                              <TableCell>$2,500</TableCell>
                              <TableCell className="hidden md:table-cell">June 8, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Sarah Johnson</TableCell>
                              <TableCell>Education For All</TableCell>
                              <TableCell>$1,000</TableCell>
                              <TableCell className="hidden md:table-cell">June 7, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Michael Chen</TableCell>
                              <TableCell>Rainforest Alliance</TableCell>
                              <TableCell>$5,000</TableCell>
                              <TableCell className="hidden md:table-cell">June 6, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Emma Wilson</TableCell>
                              <TableCell>Children's Health Fund</TableCell>
                              <TableCell>$750</TableCell>
                              <TableCell className="hidden md:table-cell">June 5, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">David Rodriguez</TableCell>
                              <TableCell>Disaster Relief Network</TableCell>
                              <TableCell>$3,200</TableCell>
                              <TableCell className="hidden md:table-cell">June 4, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="largest" className="mt-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardContent className="p-0">
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
                            <TableRow>
                              <TableCell className="font-medium">James Wilson</TableCell>
                              <TableCell>Ocean Conservation</TableCell>
                              <TableCell>$25,000</TableCell>
                              <TableCell className="hidden md:table-cell">May 15, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Tech For Good Inc.</TableCell>
                              <TableCell>Digital Literacy Fund</TableCell>
                              <TableCell>$18,500</TableCell>
                              <TableCell className="hidden md:table-cell">April 22, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Anonymous</TableCell>
                              <TableCell>Hunger Relief Initiative</TableCell>
                              <TableCell>$15,000</TableCell>
                              <TableCell className="hidden md:table-cell">May 3, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Maria Garcia</TableCell>
                              <TableCell>Women's Empowerment</TableCell>
                              <TableCell>$12,750</TableCell>
                              <TableCell className="hidden md:table-cell">March 18, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Future Foundation</TableCell>
                              <TableCell>Climate Action Fund</TableCell>
                              <TableCell>$10,000</TableCell>
                              <TableCell className="hidden md:table-cell">May 28, 2025</TableCell>
                              <TableCell className="text-right">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Verified
                                </span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
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

        {/* CTA Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background border-t overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
          <FloatingParticles />
          <div className="container px-4 md:px-6 relative z-10">
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
                  Ready to Transform Giving?
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Join the movement that's revolutionizing charitable giving through complete transparency and
                  blockchain accountability.
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
                    <Link href="/charities">Start Your Impact Today</Link>
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
