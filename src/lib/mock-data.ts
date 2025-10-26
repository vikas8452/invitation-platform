import { Template, CustomizationData } from './types';

// Mock data for templates
export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Elegant Wedding',
    description: 'A timeless and elegant wedding invitation template with classic typography and sophisticated design.',
    category: 'wedding',
    price: 29.99,
    isPremium: true,
    thumbnail: '/templates/wedding-elegant-thumb.jpg',
    previewImages: [
      '/templates/wedding-elegant-1.jpg',
      '/templates/wedding-elegant-2.jpg',
      '/templates/wedding-elegant-3.jpg'
    ],
    tags: ['elegant', 'classic', 'sophisticated'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Modern Birthday',
    description: 'Fun and vibrant birthday invitation perfect for celebrating special moments.',
    category: 'birthday',
    price: 0,
    isPremium: false,
    thumbnail: '/templates/birthday-modern-thumb.jpg',
    previewImages: [
      '/templates/birthday-modern-1.jpg',
      '/templates/birthday-modern-2.jpg'
    ],
    tags: ['fun', 'colorful', 'modern'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Romantic Engagement',
    description: 'Celebrate your engagement with this romantic and beautiful invitation design.',
    category: 'engagement',
    price: 19.99,
    isPremium: true,
    thumbnail: '/templates/engagement-romantic-thumb.jpg',
    previewImages: [
      '/templates/engagement-romantic-1.jpg',
      '/templates/engagement-romantic-2.jpg',
      '/templates/engagement-romantic-3.jpg'
    ],
    videoPreview: '/templates/engagement-romantic-video.mp4',
    tags: ['romantic', 'elegant', 'celebration'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '4',
    name: 'Sweet Baby Shower',
    description: 'Adorable baby shower invitation with soft pastels and cute illustrations.',
    category: 'baby-shower',
    price: 15.99,
    isPremium: true,
    thumbnail: '/templates/baby-shower-sweet-thumb.jpg',
    previewImages: [
      '/templates/baby-shower-sweet-1.jpg',
      '/templates/baby-shower-sweet-2.jpg'
    ],
    tags: ['cute', 'pastel', 'baby'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '5',
    name: 'Corporate Event',
    description: 'Professional and clean design perfect for corporate events and business gatherings.',
    category: 'corporate',
    price: 24.99,
    isPremium: true,
    thumbnail: '/templates/corporate-professional-thumb.jpg',
    previewImages: [
      '/templates/corporate-professional-1.jpg',
      '/templates/corporate-professional-2.jpg'
    ],
    tags: ['professional', 'clean', 'business'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '6',
    name: 'Anniversary Celebration',
    description: 'Celebrate years of love with this beautiful anniversary invitation template.',
    category: 'anniversary',
    price: 0,
    isPremium: false,
    thumbnail: '/templates/anniversary-celebration-thumb.jpg',
    previewImages: [
      '/templates/anniversary-celebration-1.jpg',
      '/templates/anniversary-celebration-2.jpg'
    ],
    tags: ['love', 'celebration', 'anniversary'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '7',
    name: 'Rustic Wedding',
    description: 'Charming rustic wedding invitation with earthy tones and natural elements.',
    category: 'wedding',
    price: 24.99,
    isPremium: true,
    thumbnail: '/templates/wedding-rustic-thumb.jpg',
    previewImages: [
      '/templates/wedding-rustic-1.jpg',
      '/templates/wedding-rustic-2.jpg'
    ],
    tags: ['rustic', 'natural', 'vintage'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '8',
    name: 'Minimalist Birthday',
    description: 'Clean and modern minimalist birthday invitation with simple elegance.',
    category: 'birthday',
    price: 9.99,
    isPremium: true,
    thumbnail: '/templates/birthday-minimalist-thumb.jpg',
    previewImages: [
      '/templates/birthday-minimalist-1.jpg',
      '/templates/birthday-minimalist-2.jpg'
    ],
    tags: ['minimalist', 'modern', 'simple'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '9',
    name: 'Garden Engagement',
    description: 'Beautiful garden-themed engagement invitation with floral designs.',
    category: 'engagement',
    price: 22.99,
    isPremium: true,
    thumbnail: '/templates/engagement-garden-thumb.jpg',
    previewImages: [
      '/templates/engagement-garden-1.jpg',
      '/templates/engagement-garden-2.jpg'
    ],
    tags: ['floral', 'garden', 'nature'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '10',
    name: 'Boho Baby Shower',
    description: 'Trendy bohemian-style baby shower invitation with warm earth tones.',
    category: 'baby-shower',
    price: 18.99,
    isPremium: true,
    thumbnail: '/templates/baby-shower-boho-thumb.jpg',
    previewImages: [
      '/templates/baby-shower-boho-1.jpg',
      '/templates/baby-shower-boho-2.jpg'
    ],
    tags: ['boho', 'trendy', 'warm'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '11',
    name: 'Tech Conference',
    description: 'Modern tech conference invitation with bold typography and gradients.',
    category: 'corporate',
    price: 19.99,
    isPremium: true,
    thumbnail: '/templates/corporate-tech-thumb.jpg',
    previewImages: [
      '/templates/corporate-tech-1.jpg',
      '/templates/corporate-tech-2.jpg'
    ],
    tags: ['tech', 'modern', 'professional'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '12',
    name: 'Golden Anniversary',
    description: 'Luxurious golden anniversary invitation for milestone celebrations.',
    category: 'anniversary',
    price: 27.99,
    isPremium: true,
    thumbnail: '/templates/anniversary-golden-thumb.jpg',
    previewImages: [
      '/templates/anniversary-golden-1.jpg',
      '/templates/anniversary-golden-2.jpg'
    ],
    tags: ['luxurious', 'golden', 'milestone'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '13',
    name: 'Beach Wedding',
    description: 'Tropical beach wedding invitation with ocean blues and sandy tones.',
    category: 'wedding',
    price: 0,
    isPremium: false,
    thumbnail: '/templates/wedding-beach-thumb.jpg',
    previewImages: [
      '/templates/wedding-beach-1.jpg',
      '/templates/wedding-beach-2.jpg'
    ],
    tags: ['beach', 'tropical', 'casual'],
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: '14',
    name: 'Kids Birthday Party',
    description: 'Fun and colorful birthday invitation perfect for children\'s parties.',
    category: 'birthday',
    price: 0,
    isPremium: false,
    thumbnail: '/templates/birthday-kids-thumb.jpg',
    previewImages: [
      '/templates/birthday-kids-1.jpg',
      '/templates/birthday-kids-2.jpg'
    ],
    tags: ['kids', 'colorful', 'playful'],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    id: '15',
    name: 'Vintage Engagement',
    description: 'Classic vintage-style engagement invitation with retro charm.',
    category: 'engagement',
    price: 16.99,
    isPremium: true,
    thumbnail: '/templates/engagement-vintage-thumb.jpg',
    previewImages: [
      '/templates/engagement-vintage-1.jpg',
      '/templates/engagement-vintage-2.jpg'
    ],
    tags: ['vintage', 'retro', 'classic'],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06')
  },
  {
    id: '16',
    name: 'Elephant Baby Shower',
    description: 'Adorable elephant-themed baby shower invitation in soft neutrals.',
    category: 'baby-shower',
    price: 0,
    isPremium: false,
    thumbnail: '/templates/baby-shower-elephant-thumb.jpg',
    previewImages: [
      '/templates/baby-shower-elephant-1.jpg',
      '/templates/baby-shower-elephant-2.jpg'
    ],
    tags: ['elephant', 'cute', 'neutral'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  },
  {
    id: '17',
    name: 'Gala Dinner',
    description: 'Elegant gala dinner invitation for formal corporate events.',
    category: 'corporate',
    price: 29.99,
    isPremium: true,
    thumbnail: '/templates/corporate-gala-thumb.jpg',
    previewImages: [
      '/templates/corporate-gala-1.jpg',
      '/templates/corporate-gala-2.jpg'
    ],
    tags: ['formal', 'elegant', 'gala'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '18',
    name: 'Milestone Birthday',
    description: 'Celebrate milestone birthdays with this sophisticated design.',
    category: 'birthday',
    price: 14.99,
    isPremium: true,
    thumbnail: '/templates/birthday-milestone-thumb.jpg',
    previewImages: [
      '/templates/birthday-milestone-1.jpg',
      '/templates/birthday-milestone-2.jpg'
    ],
    tags: ['milestone', 'sophisticated', 'celebration'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Mock customization data
export const defaultCustomization: Partial<CustomizationData> = {
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
  customFields: {}
};

// Category labels
export const categoryLabels = {
  wedding: 'Wedding',
  engagement: 'Engagement',
  birthday: 'Birthday',
  'baby-shower': 'Baby Shower',
  anniversary: 'Anniversary',
  corporate: 'Corporate',
  other: 'Other'
};

// Font options
export const fontOptions = [
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' }
];

// Color presets
export const colorPresets = [
  {
    name: 'Purple Elegance',
    primary: '#8B5CF6',
    secondary: '#F3F4F6',
    accent: '#F59E0B'
  },
  {
    name: 'Rose Gold',
    primary: '#E11D48',
    secondary: '#FEF2F2',
    accent: '#F59E0B'
  },
  {
    name: 'Ocean Blue',
    primary: '#0EA5E9',
    secondary: '#F0F9FF',
    accent: '#10B981'
  },
  {
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#F0FDF4',
    accent: '#F59E0B'
  },
  {
    name: 'Sunset Orange',
    primary: '#EA580C',
    secondary: '#FFF7ED',
    accent: '#E11D48'
  }
];
