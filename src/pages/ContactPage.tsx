import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Dog } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast('Please fill out all required fields', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Thank you! Our DoggyBhai Care team will respond within 2-4 hours 🐾', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          GET IN TOUCH
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          We’re Here for You & Your Dog
        </h1>
        <p className="text-sm text-zinc-600">
          Have sizing questions or need help with your order? Our friendly canine care pack is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-zinc-950">DoggyBhai Support</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Email Us</p>
                  <p className="text-zinc-600">support@doggybhai.com</p>
                  <p className="text-[10px] text-zinc-400">Response within 2-4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Call / WhatsApp Support</p>
                  <p className="text-zinc-600">+91 98765 43210</p>
                  <p className="text-[10px] text-zinc-400">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Registered Office & Hub</p>
                  <p className="text-zinc-600">
                    DoggyBhai Pet Products Pvt. Ltd., #42, 100 Feet Road, Indiranagar, Bengaluru,
                    Karnataka 560038
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6">
          <h3 className="font-heading font-extrabold text-lg text-zinc-950">Send Us a Message</h3>

          {isSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-zinc-900">Message Received!</h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                Thank you, {name}! Our team will get back to you at <strong>{email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  >
                    <option>Order & Delivery Inquiry</option>
                    <option>Collar / Leash Sizing Help</option>
                    <option>Exchange / Return Request</option>
                    <option>Bulk & Breeder Orders</option>
                    <option>Other Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your dog or how we can help you..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
