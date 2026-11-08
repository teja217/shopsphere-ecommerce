import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { contactService } from '../services/contactService';
import { useToast } from '../context/ToastContext';

const FAQ_ITEMS = [
  {
    q: 'How long does standard and express shipping take?',
    a: 'Orders are processed within 24 hours. Standard shipping takes 3 to 5 business days, while Express Air delivery arrives in 1 to 2 business days. All orders over $50 qualify for free standard shipping.',
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'We offer an unconditional 30-day return policy. Items must be in their original packaging and undamaged. Return shipping labels are generated free of charge through your account dashboard.',
  },
  {
    q: 'Can I track my package in real-time?',
    a: 'Yes! As soon as your order leaves our fulfillment center, you will receive an email and SMS containing your carrier tracking link and estimated delivery window.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, UPI / Digital Wallets, and Cash on Delivery in supported postal regions.',
  },
];

export const ContactPage = () => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email format';
      }
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validate()) {
      addToast('Please correct the highlighted form errors', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await contactService.submitContact(formData);
      const msg =
        res.message || 'Thank you! Your message has been received. Our team will reply shortly.';
      setSuccessMessage(msg);
      addToast(msg, 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      const errorMsg = err.message || 'Unable to submit your message. Please try again.';
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          We Are Here For You
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with ShopSphere
        </h1>
        <p className="text-sm text-slate-500">
          Have an inquiry about an order, warranty claims, or product specifications? Reach out and
          our dedicated support team will assist you promptly.
        </p>
      </div>

      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</h3>
            <p className="text-sm font-bold text-slate-900 mt-1">support@shopsphere.io</p>
            <p className="text-xs text-slate-500">Replies within 4 hours</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Support</h3>
            <p className="text-sm font-bold text-slate-900 mt-1">+1 (800) 555-0199</p>
            <p className="text-xs text-slate-500">Toll-free customer line</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</h3>
            <p className="text-sm font-bold text-slate-900 mt-1">San Francisco, CA</p>
            <p className="text-xs text-slate-500">500 Howard Street, Suite 400</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Hours</h3>
            <p className="text-sm font-bold text-slate-900 mt-1">24 / 7 Live Chat</p>
            <p className="text-xs text-slate-500">Phone: 8 AM - 8 PM EST</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500">All submissions are monitored by our concierge team</p>
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Jordan Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                    errors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:border-indigo-600 text-slate-900`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="jordan@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                    errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:border-indigo-600 text-slate-900`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                placeholder="How can we assist you today?"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                  errors.subject ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                } focus:outline-none focus:border-indigo-600 text-slate-900`}
              />
              {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Message *
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Include details such as order ID or item model numbers if applicable..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                  errors.message ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                } focus:outline-none focus:border-indigo-600 text-slate-900`}
              />
              {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ Accordion (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-800">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-2 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
