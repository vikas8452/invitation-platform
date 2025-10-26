"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Eye, Download, Share2, Palette, Type, Image as ImageIcon, Upload, X, FileDown, Globe } from "lucide-react";
import { mockTemplates, defaultCustomization, fontOptions, colorPresets } from "@/lib/mock-data";
import { Template, CustomizationData } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { downloadAsImage, downloadAsPDF, generateInvitationSlug, shareInvitation } from "@/lib/download-utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CustomizePage() {
  const params = useParams();
  const templateId = params.id as string;
  const { updateCustomization } = useCartStore();
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [customization, setCustomization] = useState<CustomizationData>({
    templateId: templateId,
    eventName: '',
    hostName: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    address: '',
    message: '',
    colors: {
      primary: '#8B5CF6',
      secondary: '#F3F4F6',
      accent: '#F59E0B'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    customFields: {},
    backgroundImage: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const foundTemplate = mockTemplates.find(t => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      setCustomization(prev => ({
        ...prev,
        templateId: foundTemplate.id
      }));
    }
  }, [templateId]);

  const handleInputChange = (field: keyof CustomizationData, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    setCustomization(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleFontChange = (fontType: 'heading' | 'body', value: string) => {
    setCustomization(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontType]: value
      }
    }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setCustomization(prev => ({
      ...prev,
      colors: {
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent
      }
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomization(prev => ({
          ...prev,
          backgroundImage: result
        }));
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const removeBackgroundImage = () => {
    setCustomization(prev => ({
      ...prev,
      backgroundImage: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Background image removed');
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      const filename = customization.eventName || 'invitation';
      await downloadAsImage('invitation-preview', filename);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const filename = customization.eventName || 'invitation';
      await downloadAsPDF('invitation-preview', filename);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const slug = generateInvitationSlug(
      customization.eventName || 'event',
      customization.hostName || 'host'
    );
    const url = `${window.location.origin}/invite/${slug}`;
    
    const result = await shareInvitation(
      url,
      customization.eventName || 'Invitation',
      `You're invited to ${customization.eventName || 'our event'}!`
    );
    
    if (result?.success) {
      toast.success(result.message);
    }
  };

  const handleHostInvitation = () => {
    const slug = generateInvitationSlug(
      customization.eventName || 'event',
      customization.hostName || 'host'
    );
    
    // Save customization to localStorage for the hosted page with correct structure
    const invitationData = {
      id: "1",
      slug: slug,
      template: {
        name: template.name,
        category: template.category
      },
      customization: {
        ...customization,
        eventName: customization.eventName || 'Your Event Name',
        hostName: customization.hostName || 'Host Name(s)',
        eventDate: customization.eventDate || '2025-06-15',
        eventTime: customization.eventTime || '16:00',
        venue: customization.venue || 'Venue Name',
        address: customization.address || 'Venue Address',
        message: customization.message || 'We joyfully invite you to celebrate our special day with us.',
        rsvpLink: customization.rsvpLink || '#',
        colors: {
          primary: customization.colors?.primary || '#8B5CF6',
          secondary: customization.colors?.secondary || '#F3F4F6',
          accent: customization.colors?.accent || '#F59E0B'
        },
        fonts: {
          heading: customization.fonts?.heading || 'Playfair Display',
          body: customization.fonts?.body || 'Inter'
        },
        backgroundImage: customization.backgroundImage || null
      },
      isActive: true,
      viewCount: 0,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`hosted-${slug}`, JSON.stringify(invitationData));
    console.log('Saved invitation data:', invitationData);
    
    const url = `${window.location.origin}/invite/${slug}`;
    window.open(url, '_blank');
    toast.success('Invitation hosted! Opening in new tab...');
  };

  const saveProgress = () => {
    localStorage.setItem(`customization-${templateId}`, JSON.stringify(customization));
    updateCustomization(templateId, customization);
  };

  const loadProgress = () => {
    const saved = localStorage.getItem(`customization-${templateId}`);
    if (saved) {
      setCustomization(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadProgress();
  }, [templateId]);

  useEffect(() => {
    saveProgress();
  }, [customization, templateId]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template not found</h1>
          <Link href="/templates">
            <Button>Back to Templates</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{template.name}</h1>
                <p className="text-sm text-gray-600">Customize your invitation</p>
              </div>
            </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={saveProgress}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share Your Invitation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Button 
                        onClick={handleShare}
                        className="w-full"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Copy Share Link
                      </Button>
                      <Button 
                        onClick={handleHostInvitation}
                        variant="outline"
                        className="w-full"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Host Public Page
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      )}
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
                        disabled={isDownloading}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download as Image (PNG)
                      </Button>
                      <Button 
                        onClick={handleDownloadPDF}
                        variant="outline"
                        className="w-full"
                        disabled={isDownloading}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download as PDF
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Invitation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        value={customization.eventName}
                        onChange={(e) => handleInputChange('eventName', e.target.value)}
                        placeholder="e.g., Sarah & John's Wedding"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hostName">Host Name(s)</Label>
                      <Input
                        id="hostName"
                        value={customization.hostName}
                        onChange={(e) => handleInputChange('hostName', e.target.value)}
                        placeholder="e.g., Sarah & John"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={customization.eventDate}
                          onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Time</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          value={customization.eventTime}
                          onChange={(e) => handleInputChange('eventTime', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={customization.venue}
                        onChange={(e) => handleInputChange('venue', e.target.value)}
                        placeholder="e.g., The Grand Ballroom"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={customization.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Full address..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={customization.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Additional message or details..."
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rsvpLink">RSVP Link (Optional)</Label>
                      <Input
                        id="rsvpLink"
                        value={customization.rsvpLink || ''}
                        onChange={(e) => handleInputChange('rsvpLink', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="design" className="space-y-4">
                    <div>
                      <Label>Color Presets</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {colorPresets.map((preset, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => applyColorPreset(preset)}
                            className="justify-start"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: preset.primary }}
                                />
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: preset.secondary }}
                                />
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: preset.accent }}
                                />
                              </div>
                              <span className="text-xs">{preset.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label>Custom Colors</Label>
                      <div className="space-y-3 mt-2">
                        <div>
                          <Label htmlFor="primaryColor" className="text-sm">Primary</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="primaryColor"
                              type="color"
                              value={customization.colors.primary}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="w-12 h-8 p-1"
                            />
                            <Input
                              value={customization.colors.primary}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="secondaryColor" className="text-sm">Secondary</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="secondaryColor"
                              type="color"
                              value={customization.colors.secondary}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="w-12 h-8 p-1"
                            />
                            <Input
                              value={customization.colors.secondary}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="accentColor" className="text-sm">Accent</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="accentColor"
                              type="color"
                              value={customization.colors.accent}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="w-12 h-8 p-1"
                            />
                            <Input
                              value={customization.colors.accent}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label htmlFor="headingFont">Heading Font</Label>
                      <Select 
                        value={customization.fonts.heading} 
                        onValueChange={(value) => handleFontChange('heading', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bodyFont">Body Font</Label>
                      <Select 
                        value={customization.fonts.body} 
                        onValueChange={(value) => handleFontChange('body', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4">
                    <div>
                      <Label htmlFor="backgroundImage">Background Image</Label>
                      <div className="mt-2 space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="backgroundImage"
                        />
                        
                        {customization.backgroundImage ? (
                          <div className="space-y-2">
                            <div className="relative">
                              <img
                                src={customization.backgroundImage}
                                alt="Background preview"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={removeBackgroundImage}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">Click the X to remove image</p>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">No background image</p>
                            <Button
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                            >
                              {isUploading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Image
                                </>
                              )}
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">
                              JPG, PNG, GIF up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Template Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Template Info</Label>
                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <p>Category: {template.category}</p>
                        <p>Price: {template.price === 0 ? 'Free' : `$${template.price}`}</p>
                        <p>Type: {template.isPremium ? 'Premium' : 'Free'}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Preview</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div id="invitation-preview" className="aspect-[4/5] bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <div 
                    className="h-full w-full p-12 flex flex-col justify-between relative"
                    style={{
                      backgroundColor: customization.colors.secondary,
                      color: customization.colors.primary,
                      fontFamily: customization.fonts.body,
                      backgroundImage: customization.backgroundImage ? `url(${customization.backgroundImage})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Background Overlay for better text readability */}
                    {customization.backgroundImage && (
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundColor: `${customization.colors.secondary}CC`, // 80% opacity
                        }}
                      />
                    )}
                    
                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Decorative Top Border */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: customization.colors.accent }}
                      />
                      
                      {/* Top Decorative Element */}
                      <div className="text-center">
                        <div 
                          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border-2 backdrop-blur-sm"
                          style={{ 
                            borderColor: customization.colors.accent,
                            backgroundColor: customization.colors.accent + '20'
                          }}
                        >
                          <svg 
                            className="w-10 h-10" 
                            fill="none" 
                            stroke={customization.colors.accent} 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 flex flex-col justify-center space-y-6">
                      {/* Event Name */}
                      <div className="text-center">
                        <h1 
                          className="text-4xl font-bold mb-2 leading-tight"
                          style={{
                            color: customization.colors.primary,
                            fontFamily: customization.fonts.heading
                          }}
                        >
                          {customization.eventName || 'Sarah & John'}
                        </h1>
                        {!customization.eventName && (
                          <p className="text-xs text-gray-400 italic">Enter event name</p>
                        )}
                      </div>
                      
                      {/* Divider */}
                      <div className="flex items-center justify-center gap-3">
                        <div 
                          className="h-px flex-1"
                          style={{ backgroundColor: customization.colors.accent }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: customization.colors.accent }}
                        />
                        <div 
                          className="h-px flex-1"
                          style={{ backgroundColor: customization.colors.accent }}
                        />
                      </div>

                      {/* Host Names */}
                      <div className="text-center">
                        <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                          Cordially invite you
                        </p>
                        <p 
                          className="text-2xl font-semibold"
                          style={{ fontFamily: customization.fonts.heading }}
                        >
                          {customization.hostName || 'The Smith Family'}
                        </p>
                        {!customization.hostName && (
                          <p className="text-xs text-gray-400 italic mt-1">Enter host name(s)</p>
                        )}
                      </div>

                      {/* Date & Time */}
                      <div className="text-center space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Date</p>
                          <p className="text-lg font-medium">
                            {customization.eventDate 
                              ? new Date(customization.eventDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : 'Saturday, June 15th, 2025'
                            }
                          </p>
                          {!customization.eventDate && (
                            <p className="text-xs text-gray-400 italic mt-1">Select date</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Time</p>
                          <p className="text-lg font-medium">
                            {customization.eventTime 
                              ? new Date(`2000-01-01T${customization.eventTime}`).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })
                              : '4:00 PM'
                            }
                          </p>
                          {!customization.eventTime && (
                            <p className="text-xs text-gray-400 italic mt-1">Select time</p>
                          )}
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Venue</p>
                        <p className="text-lg font-semibold">
                          {customization.venue || 'The Grand Ballroom'}
                        </p>
                        <p className="text-sm mt-1 text-gray-600">
                          {customization.address || '123 Celebration Avenue, New York, NY'}
                        </p>
                        {!customization.venue && (
                          <p className="text-xs text-gray-400 italic mt-1">Enter venue details</p>
                        )}
                      </div>

                        {/* Message */}
                        {(customization.message || template?.category === 'wedding' || template?.category === 'engagement') && (
                          <div 
                            className="p-4 rounded-lg text-center backdrop-blur-sm"
                            style={{ 
                              backgroundColor: customization.colors.accent + '15',
                              borderLeft: `3px solid ${customization.colors.accent}`
                            }}
                          >
                            <p className="text-sm italic leading-relaxed">
                              {customization.message || '"We joyfully invite you to celebrate our special day with us. Your presence would mean the world to us."'}
                            </p>
                            {!customization.message && (
                              <p className="text-xs text-gray-400 mt-2">Add your personal message</p>
                            )}
                          </div>
                        )}

                        {/* RSVP Button */}
                        <div className="text-center">
                          <button
                            className="px-8 py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
                            style={{
                              backgroundColor: customization.colors.accent,
                            }}
                          >
                            RSVP
                          </button>
                        </div>
                      </div>

                      {/* Decorative Bottom Border */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: customization.colors.accent }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
