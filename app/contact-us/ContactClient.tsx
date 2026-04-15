'use client';

import { useState } from 'react';
import { useDynamicTheme } from '@/components/DynamicThemeProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ContactClient() {
  const { siteConfig } = useDynamicTheme();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isDark = theme === 'dark';
  const primary = siteConfig?.theme?.primaryColor || '#7c3aed';
  const secondary = siteConfig?.theme?.secondaryColor || '#9333ea';
  const siteName = siteConfig?.siteName || 'Coupons Script';
  const pageBg = isDark ? '#111827' : '#f8fafc';
  const textPrimary = isDark ? '#f9fafb' : '#0f172a';
  const textSecondary = isDark ? '#9ca3af' : '#64748b';
  const cardBg = isDark ? '#1f2937' : '#ffffff';
  const borderColor = isDark ? '#374151' : '#e2e8f0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-1 text-xs mb-6" style={{ color: textSecondary }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: primary }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Contact Us</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: primary }}>Contact Us</h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl shadow-lg p-8" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <h2 className="text-xl font-bold mb-6 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>
              Send us a Message
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: primary }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: textPrimary }}>
                  Message Sent Successfully!
                </h3>
                <p className="mb-6" style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}>
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
                  style={{ backgroundColor: primary }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                      style={{ 
                        borderColor: borderColor,
                        backgroundColor: cardBg,
                        color: textPrimary
                      }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                      style={{ 
                        borderColor: borderColor,
                        backgroundColor: cardBg,
                        color: textPrimary
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                    style={{ 
                      borderColor: borderColor,
                      backgroundColor: cardBg,
                      color: textPrimary
                    }}
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-colors resize-none"
                    style={{ 
                      borderColor: borderColor,
                      backgroundColor: cardBg,
                      color: textPrimary
                    }}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: primary }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2" style={{ color: primary, borderBottom: `2px solid ${borderColor}` }}>
                Get in Touch
              </h2>
              <div
                className="max-w-none"
                style={{ color: textSecondary, lineHeight: '1.8', fontSize: '15px' }}
              >
                <p className="mb-4">
                  We're here to help you save money with the best deals and coupons. 
                  Whether you have questions about our platform, need help finding specific offers, 
                  or want to partner with us, don't hesitate to reach out.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primary}20` }}>
                  <Mail className="w-6 h-6" style={{ color: primary }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: textPrimary }}>Email Us</h3>
                  <p style={{ color: textSecondary, fontSize: '15px' }}>support@{siteName.toLowerCase().replace(/\s+/g, '')}.com</p>
                  <p className="text-sm mt-1" style={{ color: textSecondary }}>We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primary}20` }}>
                  <Phone className="w-6 h-6" style={{ color: primary }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: textPrimary }}>Call Us</h3>
                  <p style={{ color: textSecondary, fontSize: '15px' }}>+1 (555) 123-4567</p>
                  <p className="text-sm mt-1" style={{ color: textSecondary }}>Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primary}20` }}>
                  <MapPin className="w-6 h-6" style={{ color: primary }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: textPrimary }}>Visit Us</h3>
                  <div style={{ color: textSecondary, fontSize: '15px' }}>
                    123 Savings Street<br />
                    Deal City, DC 12345<br />
                    United States
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="rounded-2xl shadow-lg p-6" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: textPrimary }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1" style={{ color: textPrimary }}>
                    How do I use a coupon code?
                  </h4>
                  <p className="text-sm" style={{ color: textSecondary }}>
                    Simply click on the coupon to reveal the code, then copy and paste it at checkout on the store's website.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: textPrimary }}>
                    Are all deals verified?
                  </h4>
                  <p className="text-sm" style={{ color: textSecondary }}>
                    Yes, our team regularly verifies all coupons and deals to ensure they're working and up-to-date.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: textPrimary }}>
                    Can I submit a deal?
                  </h4>
                  <p className="text-sm" style={{ color: textSecondary }}>
                    Absolutely! Use the contact form above to share any deals you've found, and we'll review them for inclusion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}