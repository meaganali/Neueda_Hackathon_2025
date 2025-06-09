"use client"

import Link from "next/link"
import { ArrowRight, Globe, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function Charities() {
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
              <Link href="/charities" className="text-sm font-medium text-primary">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Our Partner Charities
                </motion.h1>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Discover verified organizations making a real impact around the world. Every charity on our platform
                  has been thoroughly vetted for transparency and effectiveness.
                </motion.p>
              </div>
              <motion.div
                className="w-full max-w-md space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search charities..."
                    className="w-full appearance-none bg-background pl-8 shadow-none"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Global Water Foundation"
                        category="Environment"
                        description="Providing clean water access to communities in need around the world."
                        impact="50 wells built serving over 25,000 people"
                        location="East Africa"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="global-water-foundation"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Education For All"
                        category="Education"
                        description="Supporting schools and educational programs in underserved communities."
                        impact="15 schools supported, reaching 5,000 students"
                        location="Southeast Asia"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="education-for-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Children's Health Fund"
                        category="Health"
                        description="Providing medical care and health services to children in need."
                        impact="30,000 children received medical care"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="childrens-health-fund"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Rainforest Alliance"
                        category="Environment"
                        description="Protecting rainforests and supporting sustainable forestry practices."
                        impact="25,000 acres of rainforest protected"
                        location="Amazon Basin"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="rainforest-alliance"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Digital Literacy Fund"
                        category="Education"
                        description="Bridging the digital divide by providing technology education and resources."
                        impact="10,000 students trained in digital skills"
                        location="Multiple Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="digital-literacy-fund"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Disaster Relief Network"
                        category="Health"
                        description="Providing immediate aid and long-term support to communities affected by disasters."
                        impact="Responded to 15 major disasters in the past year"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="disaster-relief-network"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Ocean Conservation"
                        category="Environment"
                        description="Working to protect marine ecosystems and reduce ocean pollution."
                        impact="Removed 500,000 pounds of plastic from oceans"
                        location="Coastal Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="ocean-conservation"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Women's Empowerment"
                        category="Education"
                        description="Supporting women's education, entrepreneurship, and leadership."
                        impact="Supported 5,000 women entrepreneurs"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="womens-empowerment"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Hunger Relief Initiative"
                        category="Health"
                        description="Fighting hunger through food distribution and sustainable agriculture programs."
                        impact="100,000 meals served to those in need"
                        location="Multiple Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="hunger-relief-initiative"
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="environment" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Global Water Foundation"
                        category="Environment"
                        description="Providing clean water access to communities in need around the world."
                        impact="50 wells built serving over 25,000 people"
                        location="East Africa"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="global-water-foundation"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Rainforest Alliance"
                        category="Environment"
                        description="Protecting rainforests and supporting sustainable forestry practices."
                        impact="25,000 acres of rainforest protected"
                        location="Amazon Basin"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="rainforest-alliance"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Ocean Conservation"
                        category="Environment"
                        description="Working to protect marine ecosystems and reduce ocean pollution."
                        impact="Removed 500,000 pounds of plastic from oceans"
                        location="Coastal Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="ocean-conservation"
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="education" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Education For All"
                        category="Education"
                        description="Supporting schools and educational programs in underserved communities."
                        impact="15 schools supported, reaching 5,000 students"
                        location="Southeast Asia"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="education-for-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Digital Literacy Fund"
                        category="Education"
                        description="Bridging the digital divide by providing technology education and resources."
                        impact="10,000 students trained in digital skills"
                        location="Multiple Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="digital-literacy-fund"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Women's Empowerment"
                        category="Education"
                        description="Supporting women's education, entrepreneurship, and leadership."
                        impact="Supported 5,000 women entrepreneurs"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="womens-empowerment"
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="health" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Children's Health Fund"
                        category="Health"
                        description="Providing medical care and health services to children in need."
                        impact="30,000 children received medical care"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="childrens-health-fund"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Disaster Relief Network"
                        category="Health"
                        description="Providing immediate aid and long-term support to communities affected by disasters."
                        impact="Responded to 15 major disasters in the past year"
                        location="Global"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="disaster-relief-network"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <CharityCard
                        name="Hunger Relief Initiative"
                        category="Health"
                        description="Fighting hunger through food distribution and sustainable agriculture programs."
                        impact="100,000 meals served to those in need"
                        location="Multiple Regions"
                        imageUrl="/placeholder.svg?height=200&width=300"
                        slug="hunger-relief-initiative"
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </Tabs>
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
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Partner With Us
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Are you a charity looking to increase transparency and build donor trust? Join our platform to
                  showcase your impact through blockchain verification.
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
                    <Link href="/charities">Apply as a Charity</Link>
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

interface CharityCardProps {
  name: string
  category: string
  description: string
  impact: string
  location: string
  imageUrl: string
  slug: string
}

function CharityCard({ name, category, description, impact, location, imageUrl, slug }: CharityCardProps) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
        <motion.img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{name}</CardTitle>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Badge variant="outline">{category}</Badge>
            </motion.div>
          </div>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm">Impact:</span>
            <span className="text-sm text-muted-foreground">{impact}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm">Location:</span>
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <motion.div className="w-full" {...scaleOnHover}>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/donate/${slug}`}>
                Donate Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
