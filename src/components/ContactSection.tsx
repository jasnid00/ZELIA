import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onSendMessage?: (msg: { name: string; email: string; subject: string; message: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Personal Fragrance Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // VIP Salon Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    if (onSendMessage) {
      onSendMessage({
        name,
        email,
        subject: inquiryType,
        message
      });
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <section id="contact-us" className="py-20 md:py-28 bg-[#F4EFEA] border-t border-[#EADBCE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9A7B38] font-semibold">
              Boutique Concierge
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#2C241E] font-normal tracking-wide">
            Contact Us
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            Whether seeking bespoke bridal scent consultations, private gifting, or guidance
            on choosing your signature flacon, our Maison Concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Ateliers & Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#EADBCE] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A7B38] block mb-1">
                  Haute Parfumerie Salons
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#2C241E]">
                  Flagship Flagship Addresses
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#5A4D43]">
                {/* Paris */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9A7B38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C241E] block font-serif-luxury text-base">
                      Salons ZÉLIA Paris
                    </strong>
                    <p>18 Place Vendôme, 75001 Paris, France</p>
                    <p className="text-[11px] text-[#7A6A5D]">Visits by private appointment</p>
                  </div>
                </div>

                {/* Grasse Atelier */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9A7B38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C241E] block font-serif-luxury text-base">
                      Atelier Botanique de Grasse
                    </strong>
                    <p>42 Chemin des Roses Centifolia, 06130 Grasse</p>
                    <p className="text-[11px] text-[#7A6A5D]">Extraction lab & private gardens</p>
                  </div>
                </div>

                {/* Direct Concierge Line */}
                <div className="flex items-start gap-3 pt-2 border-t border-[#F0E6DA]">
                  <Phone className="w-5 h-5 text-[#9A7B38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C241E] block font-serif-luxury text-base">
                      VIP Client Concierge
                    </strong>
                    <p>+33 (0)1 42 68 55 90</p>
                    <p className="text-[11px] text-[#7A6A5D]">Monday – Saturday, 9h to 19h CET</p>
                  </div>
                </div>

                {/* Email Direct */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#9A7B38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C241E] block font-serif-luxury text-base">
                      Private Correspondence
                    </strong>
                    <p>concierge@zelia-parfums.com</p>
                    <p className="text-[11px] text-[#7A6A5D]">Dedicated replies within 4 business hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Invitation Box */}
            <div className="bg-[#2C241E] text-[#FAF7F2] p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">
                  The Private ZÉLIA Circle
                </span>
              </div>
              <h4 className="font-serif-luxury text-2xl font-normal">
                Receive 10% Off Your First Flacon
              </h4>
              <p className="text-xs text-[#D8C3A5] leading-relaxed">
                Join our members for invitations to limited-edition harvest extraits, complimentary flacon engraving, and private fragrance consults.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 bg-[#4B6B48]/40 border border-[#4B6B48] rounded-lg text-xs text-[#FAF7F2] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Bienvenue. Your 10% privilege code is: <strong>ZELIA10</strong></span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#1C1714] border border-[#3E342B] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder:text-[#7A6A5D] focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#FAF7F2] text-[#2C241E] text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Concierge Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#EADBCE] shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#9A7B38] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#2C241E]">
                  Message Transmitted with Honor
                </h3>
                <p className="text-sm text-[#6E5D53] max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Your private inquiry has reached our Grasse boutique concierge. We will respond thoughtfully via <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setName('');
                    setEmail('');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#2C241E] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-[#C5A059] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A7B38] block mb-1">
                    Private Correspondence
                  </span>
                  <h3 className="font-serif-luxury text-3xl text-[#2C241E]">
                    Inquire with Our Concierge
                  </h3>
                  <p className="text-xs text-[#7A6A5D] mt-1">
                    Please provide your details below and an artisan concierge will assist you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#4A3F35] font-medium block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jacqueline Moreau"
                      className="w-full bg-[#FAF7F2] border border-[#D8C3A5] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:border-[#2C241E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#4A3F35] font-medium block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jacqueline@domain.com"
                      className="w-full bg-[#FAF7F2] border border-[#D8C3A5] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:border-[#2C241E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#4A3F35] font-medium block mb-1.5">
                    Nature of Inquiry
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#D8C3A5] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:border-[#2C241E]"
                  >
                    <option value="Personal Fragrance Consultation">
                      Personal Fragrance Consultation / Scent Matching
                    </option>
                    <option value="Bridal & Bespoke Event Gifting">
                      Bridal & Bespoke Event Gifting
                    </option>
                    <option value="Order & Delivery Inquiries">
                      Order Concierge & Delivery Assistance
                    </option>
                    <option value="Press & Retail Partnership">
                      Press & Retail Partnerships
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#4A3F35] font-medium block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the scent profiles you cherish, occasions, or questions..."
                    className="w-full bg-[#FAF7F2] border border-[#D8C3A5] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:border-[#2C241E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#2C241E] hover:bg-[#4A3F35] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#C5A059]" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
