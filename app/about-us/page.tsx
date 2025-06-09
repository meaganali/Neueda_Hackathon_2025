"use client"

import Link from "next/link"
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AboutUs() {
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
              <Link href="/about-us" className="text-sm font-medium text-primary">
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
                  Our Story
                </motion.div>
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  About Trace the Change
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  We're on a mission to transform charitable giving through transparency, accountability, and
                  technology. Founded in 2025, Trace the Change was born from a simple question: "How can we help donors
                  see the real impact of their generosity?"
                </motion.p>
                <motion.p
                  className="max-w-[600px] text-muted-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Our blockchain-powered platform connects donors directly with verified charities, allowing complete
                  transparency in how donations are used and what impact they create. We believe that by building trust
                  through transparency, we can inspire more giving and create greater positive change in the world.
                </motion.p>
              </motion.div>
              <motion.img
                src="/placeholder.svg?height=550&width=800"
                width={550}
                height={550}
                alt="Team Photo"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
                  Our Values
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  What We Stand For
                </motion.h2>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our core values guide everything we do at Trace the Change.
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Transparency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      We believe in complete openness about how charitable funds are used. Our platform makes the entire
                      donation journey visible and verifiable.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Accountability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      We hold ourselves and our partner charities to the highest standards of responsibility and ethical
                      conduct in managing donor funds.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      We leverage cutting-edge blockchain technology to create new solutions for age-old challenges in
                      the charitable sector.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
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
                    Contact Us
                  </motion.div>
                  <motion.h2
                    className="text-3xl font-bold tracking-tighter sm:text-4xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Get in Touch
                  </motion.h2>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Have questions about our platform or want to learn more about how we can help your charity? We'd
                    love to hear from you.
                  </motion.p>
                </div>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground">123 Transparency Way, San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@tracethechange.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.div {...scaleOnHover}>
                    <Button asChild size="lg">
                      <Link href="#">
                        Contact Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Office Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
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
