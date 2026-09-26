import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { useToast } from '../components/Toast';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Room Inquiry & Availability');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Save demo message in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('aurelia_grand_demo_messages') || '[]');
      const newMsg = {
        id: `MSG-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('aurelia_grand_demo_messages', JSON.stringify([newMsg, ...existing]));
    } catch (e) {
      console.warn('Failed to store demo message', e);
    }

    setIsSubmitted(true);
    showToast('Your message has been received by our demo concierge desk.', 'success');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('Room Inquiry & Availability');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-2 sm:py-6">
          <SectionHeading
            subtitle="Concierge & Guest Relations"
            title="Connect with Aurelia Grand"
            description="Whether arranging custom accommodations, scheduling airport chauffeured transit, or planning private dining, our host team is at your service."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details & Location Card */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-sm transition-colors">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Direct Contact
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                Concierge Desk
              </h3>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-[#A67C52] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">Hotel Address</strong>
                    <span>Sector F-6, Margalla Vista Boulevard, Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#A67C52] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">Reservations & Desk</strong>
                    <span>+92 (51) 849-2000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-[#A67C52] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">Electronic Inquiries</strong>
                    <span className="break-all">concierge@aureliagrand-demo.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#A67C52] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">Operational Hours</strong>
                    <span>24 Hours Daily / 7 Days a Week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Location Map Representation */}
            <div className="bg-[#171717] text-white border border-stone-800 p-4 sm:p-8 space-y-3 sm:space-y-4 shadow-md">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Sanctuary Coordinates
              </span>
              <h4 className="text-lg sm:text-xl font-serif-luxury">Federal Capital Vicinity</h4>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Overlooking the Margalla ridge with rapid 5-minute access to Blue Area, diplomatic missions, and Islamabad's premier fine-dining quarters.
              </p>
              <div className="pt-2 text-[10px] sm:text-[11px] font-mono text-stone-400 border-t border-stone-800">
                GPS: 33.7294° N, 73.0931° E · Altitude: 620m
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 md:p-10 shadow-sm transition-colors">
            {isSubmitted ? (
              <div className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-[#A67C52]/10 dark:bg-[#C5A880]/15 text-[#A67C52] dark:text-[#C5A880] mx-auto flex items-center justify-center rounded-full">
                  <CheckCircle2 className="w-8 sm:w-9 h-8 sm:h-9" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                    Message Dispatched
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] mt-1">
                    Thank You, {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] max-w-md mx-auto mt-2 leading-relaxed">
                    Your inquiry regarding <em>"{subject}"</em> has been logged to the demo system. In a production environment, our concierge responds within 2 hours.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  <p>Demo submission recorded locally in browser storage.</p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-8 py-3 min-h-[44px] bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                    Inquiry Form
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] mt-0.5 sm:mt-1">
                    Send a Message to Concierge
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asim Qureshi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="asim.q@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1.5">
                      Subject Matter
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    >
                      <option value="Room Inquiry & Availability" className="dark:bg-[#16161A]">Room Inquiry & Availability</option>
                      <option value="The Ember Table Dining" className="dark:bg-[#16161A]">The Ember Table Dining</option>
                      <option value="Private Event & Executive Salon" className="dark:bg-[#16161A]">Private Event & Executive Salon</option>
                      <option value="Chauffeured Airport Transit" className="dark:bg-[#16161A]">Chauffeured Airport Transit</option>
                      <option value="General Concierge Assistance" className="dark:bg-[#16161A]">General Concierge Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How may our concierge assist your stay?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-md active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
