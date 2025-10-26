"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Share2, Download, Heart } from "lucide-react";
import { downloadAsImage, downloadAsPDF, shareInvitation } from "@/lib/download-utils";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/CountdownTimer";


export default function InvitePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [invitation, setInvitation] = useState<any>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    attending: true,
    numberOfGuests: 1,
    message: ''
  });

  useEffect(() => {
    console.log('Loading invitation for slug:', slug);
    
    // Load invitation data from localStorage
    const savedData = localStorage.getItem(`hosted-${slug}`);
    console.log('Looking for data with key:', `hosted-${slug}`);
    console.log('Found data:', savedData);
    
    if (savedData) {
      try {
        const invitationData = JSON.parse(savedData);
        console.log('Parsed invitation data:', invitationData);
        
        // Validate the data structure
        if (invitationData.customization) {
          console.log('Data structure is valid, setting invitation');
          setInvitation(invitationData);
        } else {
          console.log('Invalid data structure, using fallback');
          setInvitation(getFallbackInvitation(slug));
        }
      } catch (error) {
        console.error('Error parsing invitation data:', error);
        setInvitation(getFallbackInvitation(slug));
      }
    } else {
      console.log('No saved data found, using fallback');
      setInvitation(getFallbackInvitation(slug));
    }
  }, [slug]);

  const getFallbackInvitation = (slug: string) => ({
    id: "1",
    slug: slug,
    template: {
      name: "Elegant Wedding",
      category: "wedding"
    },
    customization: {
      eventName: "Sarah & John's Wedding",
      hostName: "Sarah & John",
      eventDate: "2025-06-15",
      eventTime: "16:00",
      venue: "The Grand Ballroom",
      address: "123 Celebration Avenue, New York, NY 10001",
      message: "We joyfully invite you to celebrate our special day with us. Your presence would make our wedding complete.",
      rsvpLink: "#",
      colors: {
        primary: "#8B5CF6",
        secondary: "#F3F4F6",
        accent: "#F59E0B"
      },
      fonts: {
        heading: "Playfair Display",
        body: "Inter"
      }
    },
    isActive: true,
    viewCount: 42
  });

  const handleRSVP = () => {
    // Mock RSVP submission - will be replaced with API call
    toast.success("Thank you for your RSVP!");
    setRsvpOpen(false);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/invite/${slug}`;
    
    const result = await shareInvitation(
      url,
      invitation?.customization.eventName || 'Invitation',
      `You're invited to ${invitation?.customization.eventName || 'our event'}!`
    );
    
    if (result?.success) {
      toast.success(result.message);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const filename = invitation?.customization.eventName || 'invitation';
      await downloadAsImage('invitation-card', filename);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const filename = invitation?.customization.eventName || 'invitation';
      await downloadAsPDF('invitation-card', filename);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  if (!invitation || !invitation.customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading invitation...</h1>
            <p className="text-gray-600">Please wait while we prepare your invitation</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const { customization } = invitation;

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ 
        backgroundColor: customization?.colors?.secondary || '#F3F4F6',
        fontFamily: customization?.fonts?.body || 'Inter'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-end gap-2 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="bg-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Download Options</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadImage}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download as Image (PNG)
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download as PDF
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card id="invitation-card" className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div 
              className="p-12 md:p-16 text-center"
              style={{ 
                backgroundColor: customization?.colors?.secondary || '#F3F4F6',
                color: customization?.colors?.primary || '#8B5CF6'
              }}
            >
              {/* Decorative Element */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Heart 
                  className="h-12 w-12 mx-auto"
                  style={{ color: customization?.colors?.accent || '#F59E0B' }}
                  fill={customization?.colors?.accent || '#F59E0B'}
                />
              </motion.div>

              {/* Event Name */}
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ 
                  fontFamily: customization?.fonts?.heading || 'Playfair Display',
                  color: customization?.colors?.primary || '#8B5CF6'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {customization?.eventName || 'Your Event Name'}
              </motion.h1>

              {/* Hosts */}
              <motion.p 
                className="text-xl md:text-2xl mb-8 opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {customization?.hostName || 'Host Name(s)'}
              </motion.p>

              {/* Date & Time */}
              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="h-5 w-5" style={{ color: customization?.colors?.accent || '#F59E0B' }} />
                  <span className="text-lg font-semibold">
                    {customization?.eventDate 
                      ? new Date(customization.eventDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Event Date'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="h-5 w-5" style={{ color: customization?.colors?.accent || '#F59E0B' }} />
                  <span className="text-lg">
                    {customization?.eventTime 
                      ? new Date(`2000-01-01T${customization.eventTime}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })
                      : 'Event Time'
                    }
                  </span>
                </div>
              </motion.div>

              {/* Venue */}
              <motion.div 
                className="space-y-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5" style={{ color: customization?.colors?.accent || '#F59E0B' }} />
                  <span className="text-lg font-semibold">{customization?.venue || 'Venue Name'}</span>
                </div>
                <p className="text-sm opacity-70">{customization?.address || 'Venue Address'}</p>
              </motion.div>

              {/* Message */}
              {customization?.message && (
                <motion.div 
                  className="max-w-2xl mx-auto p-6 rounded-lg mb-8"
                  style={{ backgroundColor: (customization?.colors?.accent || '#F59E0B') + '20' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <p className="text-base leading-relaxed">{customization.message}</p>
                </motion.div>
              )}

              {/* Countdown Timer */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-center opacity-80">
                  Event Countdown
                </h3>
                <CountdownTimer 
                  targetDate={customization?.eventDate ? 
                    customization.eventDate + 'T' + (customization.eventTime || '16:00') : 
                    '2025-06-15T16:00'
                  } 
                  className="mb-6"
                />
              </motion.div>

              {/* RSVP Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <Dialog open={rsvpOpen} onOpenChange={setRsvpOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg"
                      className="text-lg px-8 py-6"
                      style={{
                        backgroundColor: customization?.colors?.accent || '#F59E0B',
                        color: 'white'
                      }}
                    >
                      RSVP Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Please Confirm Your Attendance</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="guestName">Your Name *</Label>
                        <Input
                          id="guestName"
                          value={rsvpData.guestName}
                          onChange={(e) => setRsvpData({...rsvpData, guestName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestEmail">Email</Label>
                        <Input
                          id="guestEmail"
                          type="email"
                          value={rsvpData.guestEmail}
                          onChange={(e) => setRsvpData({...rsvpData, guestEmail: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestPhone">Phone</Label>
                        <Input
                          id="guestPhone"
                          type="tel"
                          value={rsvpData.guestPhone}
                          onChange={(e) => setRsvpData({...rsvpData, guestPhone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numberOfGuests">Number of Guests</Label>
                        <Input
                          id="numberOfGuests"
                          type="number"
                          min="1"
                          value={rsvpData.numberOfGuests}
                          onChange={(e) => setRsvpData({...rsvpData, numberOfGuests: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={rsvpData.message}
                          onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <Button 
                        onClick={handleRSVP} 
                        className="w-full"
                        style={{
                          backgroundColor: customization?.colors?.accent || '#F59E0B',
                          color: 'white'
                        }}
                      >
                        Submit RSVP
                      </Button>
                    </div>
                </DialogContent>
              </Dialog>
              </motion.div>
            </div>
          </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Created with ❤️ using InviteFlow</p>
          <p className="mt-2">
            <a href="/" className="text-purple-600 hover:text-purple-700 underline">
              Create your own invitation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

