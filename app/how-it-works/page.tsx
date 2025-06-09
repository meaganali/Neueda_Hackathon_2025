"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Globe, type LucideIcon, ShieldCheck, Wallet } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <motion.div
              className="inline-flex"
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-primary" />
            </motion.div>
            <Link href="/">Trace the Change</Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-primary">
              How It Works
            </Link>
            <Link href="/charities" className="text-sm font-medium hover:text-primary">
              Charities
            </Link>
            <Link href="/about-us" className="text-sm font-medium hover:text-primary">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="hidden md:flex" {...scaleOnHover}>
              <Link href="#">Log In</Link>
            </Button>
            <Button asChild {...scaleOnHover}>
              <Link href="#">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  How It Works
                </motion.h1>
                <motion.p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  Trace the Change uses blockchain technology to provide complete transparency in charitable giving.
                  Here's how we track every dollar of your donation.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto grid max-w-5xl gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <ProcessStep
                number={1}
                title="Make a Donation"
                description="Choose a charity and make a donation through our secure platform. Each donation is assigned a unique identifier on the blockchain."
                icon={Wallet}
              />
              <ProcessStep
                number={2}
                title="Blockchain Verification"
                description="Your donation is recorded on the blockchain, creating an immutable record that cannot be altered or deleted."
                icon={ShieldCheck}
              />
              <ProcessStep
                number={3}
                title="Fund Distribution"
                description="The charity receives your donation, and each transaction in the distribution process is recorded on the blockchain."
                icon={ArrowRight}
              />
              <ProcessStep
                number={4}
                title="Impact Tracking"
                description="Track how your donation is being used in real-time. Charities provide updates on projects and outcomes that are linked to your donation."
                icon={CheckCircle}
              />
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Blockchain Technology</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our platform leverages blockchain technology to create a transparent and immutable record of all
                    donations and their usage.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Immutable records that cannot be altered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Transparent transaction history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Real-time tracking of fund distribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Secure and encrypted donation process</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Blockchain Technology Visualization"
                  className="aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn more about how our platform works and how we ensure transparency in charitable giving.
                </p>
              </div>
            </div>
            <motion.div
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <FaqCard
                question="How do you verify charities?"
                answer="We conduct thorough due diligence on all partner charities, including legal status verification, financial audits, and impact assessment. Only verified organizations can receive donations through our platform."
              />
              <FaqCard
                question="Can I see exactly how my donation is used?"
                answer="Yes! Our blockchain tracking allows you to see each step of your donation's journey, from your initial contribution to the specific projects and outcomes it funds."
              />
              <FaqCard
                question="What blockchain technology do you use?"
                answer="We use a combination of public and private blockchain technologies to ensure both transparency and efficiency. Our system is built on established protocols with proven security records."
              />
              <FaqCard
                question="How do you protect donor privacy?"
                answer="While transactions are recorded on the blockchain, personal donor information is encrypted and protected. Donors can choose to remain anonymous while still tracking their donation's impact."
              />
              <FaqCard
                question="Are donations tax-deductible?"
                answer="Yes, donations made through our platform to eligible charities are tax-deductible. You will receive a tax receipt for your contributions."
              />
              <FaqCard
                question="What fees do you charge?"
                answer="We charge a small platform fee of 2% to cover operational costs. 100% of the remaining donation goes directly to your chosen charity, and you can track every penny."
              />
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Make a Difference?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start tracking your impact today with transparent, blockchain-verified donations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" {...scaleOnHover}>
                  <Link href="/charities">
                    Start Donating
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" {...scaleOnHover}>
                  <Link href="/charities">Browse Charities</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <motion.footer
        className="w-full border-t bg-background py-6 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <motion.div
              className="inline-flex"
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-primary" />
            </motion.div>
            <span>Trace the Change</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Trace the Change. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about-us" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

interface ProcessStepProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
}

function ProcessStep({ number, title, description, icon: Icon }: ProcessStepProps) {
  return (
    <motion.div className="flex items-start gap-4" variants={fadeInUp}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {number}
      </div>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

interface FaqCardProps {
  question: string
  answer: string
}

function FaqCard({ question, answer }: FaqCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{answer}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
