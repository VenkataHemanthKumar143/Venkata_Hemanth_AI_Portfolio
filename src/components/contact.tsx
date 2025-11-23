'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Github, Instagram, MapPin, Twitter } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      value: 'hemanththemanthkumar2004@gmail.com',
      href: '<mailto:hemanththemanthkumar200></mailto:hemanththemanthkumar200>4@gmail.com',
      color: 'text-blue-600'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      value: '+91 6300829223',
      href: 'tel:+916300829223',
      color: 'text-green-600'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      value: 'Narasaraopet, Andhra Pradesh',
      href: 'https://maps.google.com/?q=Narasaraopet,Andhra+Pradesh',
      color: 'text-purple-600'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: 'LinkedIn',
      value: 'venkata-hemanth-kumar-chejarla724',
      href: 'https://www.linkedin.com/in/venkata-hemanth-kumar-chejarla724/',
      color: 'text-blue-700'
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: 'GitHub',
      value: 'VenkataHemanthKumar143',
      href: 'https://github.com/VenkataHemanthKumar143',
      color: 'text-gray-800'
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: 'Instagram',
      value: 'future_star_hemanth',
      href: 'https://www.instagram.com/future_star_hemanth/',
      color: 'text-pink-600'
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      title: 'X (Twitter)',
      value: 'HemanthKumar724',
      href: 'https://x.com/HemanthKumar724',
      color: 'text-black dark:text-white'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground">
          I'm always excited to connect with fellow tech enthusiasts, discuss opportunities, or just chat about the latest in AI and data science!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((contact, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${contact.color} dark:text-gray-200`}>
                  {contact.icon}
                </div>
                <CardTitle className="text-lg">{contact.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium mb-3">
                {contact.value}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(contact.href, '_blank')}
              >
                {contact.title === 'Location' ? 'View on Map' : `Open ${contact.title}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4 pt-6">
        <div className="bg-accent/80 dark:bg-accent/90 rounded-lg p-6">
          <h3 className="font-semibold mb-2 text-foreground">What I'm Looking For</h3>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            • Data Science & AI opportunities • AI Automation projects • Full-stack development roles • 
            Open source contributions • Tech community connections
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Feel free to reach out for collaborations, job opportunities, or just to discuss the latest in tech! 
          I'm particularly interested in projects that combine AI/ML with real-world impact.
        </p>
      </div>
    </div>
  );
}
