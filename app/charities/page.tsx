"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Globe, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MetaMaskButton } from "@/components/MetaMaskButton"
import astraService, { Charity } from "@/lib/astradb"

// Animation effects
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

// Fallback charities in case AstraDB is not available
const fallbackCharities: Charity[] = [
  {
    id: "global-water-foundation",
    name: "Global Water Foundation",
    category: "Environment",
    description: "Provides clean water access to communities in need around the world.",
    impact: "1,500,000 people provided with clean water access",
    location: "Global",
    imageUrl: "/images/charities/global-water-foundation.jpg",
    longDescription: "The Global Water Foundation is dedicated to ensuring that every community has access to clean, safe water. We work with local partners to build sustainable water infrastructure, educate communities on water conservation and sanitation practices, and advocate for water as a basic human right. Our projects include well construction, rainwater harvesting systems, and water purification technologies.",
    goals: [
      "Provide clean water to 5 million people by 2030",
      "Implement water sanitation programs in 1000 communities",
      "Create sustainable water management systems in water-stressed regions"
    ],
    wallet: "0xA1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9"
  },
  {
    id: "education-for-all",
    name: "Education For All",
    category: "Education",
    description: "Supports schools and educational programs in underserved communities.",
    impact: "250,000 children gained access to quality education",
    location: "Multiple Countries",
    imageUrl: "/images/charities/education-for-all.jpg",
    longDescription: "Education For All believes that every child deserves access to quality education regardless of their background or circumstances. We partner with local schools and communities to improve educational infrastructure, provide learning materials, train teachers, and offer scholarships to students in need. Our holistic approach addresses the various barriers to education, from physical access to quality of teaching.",
    goals: [
      "Build or renovate 500 schools in underserved areas",
      "Provide educational materials to 1 million students",
      "Train 10,000 teachers in modern teaching methods"
    ],
    wallet: "0xB2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9"
  },
  {
    id: "childrens-health-fund",
    name: "Children's Health Fund",
    category: "Health",
    description: "Provides medical care and health services to children in need.",
    impact: "500,000 children received essential healthcare",
    location: "Global",
    imageUrl: "/images/charities/childrens-health-fund.jpg",
    longDescription: "The Children's Health Fund is committed to ensuring that every child has access to comprehensive healthcare services. We operate mobile medical clinics, support pediatric facilities in underserved areas, provide vaccinations and preventive care, and offer specialized treatments for children with chronic conditions. Our team of dedicated healthcare professionals works tirelessly to improve children's health outcomes worldwide.",
    goals: [
      "Provide healthcare access to 1 million children by 2030",
      "Deploy 50 mobile medical clinics in remote areas",
      "Conduct health screenings and vaccinations for 2 million children"
    ],
    wallet: "0xC3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0"
  }
];

// List of allowed charity IDs
const allowedCharityIds = ["global-water-foundation", "education-for-all", "childrens-health-fund"];

export default function Charities() {
  const [charities, setCharities] = useState<Charity[]>(fallbackCharities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadCharities() {
      try {
        const data = await astraService.getAllCharities();
        
        // Filter to only show the three specific charities
        const filteredData = data.filter(charity => allowedCharityIds.includes(charity.id));
        
        // Only use AstraDB data if we got valid results back
        if (filteredData && filteredData.length > 0) {
          setCharities(filteredData);
        } else {
          // Use fallback data if the filtered results are empty
          setCharities(fallbackCharities);
        }
      } catch (err) {
        console.error("Error fetching charities from AstraDB:", err);
        setError("Failed to fetch charities from database. Using fallback data.");
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    }

    loadCharities();
  }, []);

  // Filter charities based on search term
  const filteredCharities = charities.filter(
    charity => 
      charity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      charity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group charities by category
  const environmentCharities = filteredCharities.filter(charity => charity.category === "Environment");
  const educationCharities = filteredCharities.filter(charity => charity.category === "Education");
  const healthCharities = filteredCharities.filter(charity => charity.category === "Health");

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
              <MetaMaskButton />
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
                className="w-full max-w-sm space-y-2"
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>
              {error && (
                <motion.div 
                  className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4 max-w-md" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>{error}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div className="mx-auto max-w-6xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  {loading ? (
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredCharities.length > 0 ? (
                    <motion.div
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {filteredCharities.map((charity) => (
                        <motion.div key={charity.id} variants={fadeInUp}>
                          <CharityCard
                            name={charity.name}
                            category={charity.category}
                            description={charity.description}
                            impact={charity.impact}
                            location={charity.location}
                            imageUrl={charity.imageUrl}
                            slug={charity.id}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground">No charities found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="environment" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {environmentCharities.map((charity) => (
                      <motion.div key={charity.id} variants={fadeInUp}>
                        <CharityCard
                          name={charity.name}
                          category={charity.category}
                          description={charity.description}
                          impact={charity.impact}
                          location={charity.location}
                          imageUrl={charity.imageUrl}
                          slug={charity.id}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                <TabsContent value="education" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {educationCharities.map((charity) => (
                      <motion.div key={charity.id} variants={fadeInUp}>
                        <CharityCard
                          name={charity.name}
                          category={charity.category}
                          description={charity.description}
                          impact={charity.impact}
                          location={charity.location}
                          imageUrl={charity.imageUrl}
                          slug={charity.id}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                <TabsContent value="health" className="mt-6">
                  <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {healthCharities.map((charity) => (
                      <motion.div key={charity.id} variants={fadeInUp}>
                        <CharityCard
                          name={charity.name}
                          category={charity.category}
                          description={charity.description}
                          impact={charity.impact}
                          location={charity.location}
                          imageUrl={charity.imageUrl}
                          slug={charity.id}
                        />
                      </motion.div>
                    ))}
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl.startsWith('/images') ? imageUrl : `/images/charities/${slug}.jpg`}
          alt={name}
          width={300}
          height={200}
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg?height=200&width=300";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <CardDescription className="text-sm text-muted-foreground mb-4">{description}</CardDescription>
        <div className="grid gap-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-semibold">Impact:</span>
            <span className="text-muted-foreground">{impact}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold">Location:</span>
            <span className="text-muted-foreground">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <motion.div {...scaleOnHover} className="w-full">
          <Button asChild className="w-full">
            <Link href={`/donate/${slug}`}>
              Donate Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
