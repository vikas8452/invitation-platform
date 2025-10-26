"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Star, Users, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Create Beautiful
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Invitations
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Design stunning invitations for any occasion. From weddings to birthdays, 
              create memorable experiences that your guests will love.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/templates">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
                  Create Your Invitation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Browse Templates
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our curated collection of invitation templates
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Wedding", icon: Heart, color: "from-pink-500 to-rose-500", count: "50+ Templates" },
              { name: "Birthday", icon: Star, color: "from-yellow-500 to-orange-500", count: "30+ Templates" },
              { name: "Engagement", icon: Heart, color: "from-purple-500 to-pink-500", count: "25+ Templates" },
              { name: "Baby Shower", icon: Users, color: "from-blue-500 to-cyan-500", count: "20+ Templates" },
              { name: "Anniversary", icon: Heart, color: "from-red-500 to-pink-500", count: "15+ Templates" },
              { name: "Corporate", icon: Zap, color: "from-gray-500 to-blue-500", count: "10+ Templates" }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create your perfect invitation in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Browse our collection of beautiful templates and pick the perfect one for your event.",
                icon: "🎨"
              },
              {
                step: "02", 
                title: "Customize Design",
                description: "Add your details, customize colors, fonts, and upload photos to make it uniquely yours.",
                icon: "✨"
              },
              {
                step: "03",
                title: "Share & Download",
                description: "Get a unique link to share with guests or download high-quality files for printing.",
                icon: "📱"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-sm font-semibold text-purple-600 mb-2">STEP {step.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                event: "Wedding",
                text: "The templates are absolutely stunning! Our guests couldn't stop complimenting our wedding invitation.",
                rating: 5
              },
              {
                name: "Michael Chen",
                event: "Birthday Party",
                text: "Super easy to customize and the final result exceeded our expectations. Highly recommended!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                event: "Baby Shower",
                text: "Perfect for our baby shower! The design was elegant and the customization options were amazing.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.event}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose InviteFlow?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create stunning invitations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Beautiful Templates",
                description: "Choose from 18+ professionally designed templates for every occasion"
              },
              {
                icon: "⚡",
                title: "Real-time Preview",
                description: "See your changes instantly as you customize colors, fonts, and content"
              },
              {
                icon: "📱",
                title: "Easy Sharing",
                description: "Get a unique link to share with guests or download for printing"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your invitations are hosted securely with privacy controls"
              },
              {
                icon: "📊",
                title: "RSVP Tracking",
                description: "Track responses and manage your guest list effortlessly"
              },
              {
                icon: "💝",
                title: "Personal Touch",
                description: "Add your own photos and customize every detail to match your style"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of happy customers who've created stunning invitations with InviteFlow
          </p>
          <Link href="/templates">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">InviteFlow</h3>
              <p className="text-gray-400">
                Creating beautiful digital invitations for every special moment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates">Templates</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/features">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InviteFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
