import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight, Dog } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FAQPage: React.FC = () => {
  const { navigate } = useShop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I choose the correct collar size for my dog?',
      a: 'Measure around the base of your dog’s neck using a soft tape measure. Always ensure you can slip two fingers comfortably under the tape. Check our Sizing Guide on any product page for detailed breed measurements: Small (25–35 cm), Medium (35–50 cm), Large (45–65 cm), and XL (60–80 cm).'
    },
    {
      q: 'What is DoggyBhai’s shipping timeline and cost?',
      a: 'We offer FREE Express Pan-India Shipping on all orders above ₹499. For orders below ₹499, a nominal flat delivery fee of ₹50 applies. Orders are dispatched within 24 hours and typically reach Tier-1 cities within 2–3 business days.'
    },
    {
      q: 'What is your 30-Day Size Exchange and Return Policy?',
      a: 'We want your dog to have a 100% comfortable fit! If the size isn’t right, you can request a free doorstep size exchange within 30 days of delivery, provided the item is in unused condition with tags.'
    },
    {
      q: 'Are DoggyBhai collars safe for dogs that pull strongly?',
      a: 'Yes! Our Classic Padded and Mountain Leash collections feature high-tensile nylon webbing with reinforced box stitching and solid zinc alloy hardware tested to resist up to 250kg of pull force.'
    },
    {
      q: 'Are your dog feeding bowls food-grade and rust-proof?',
      a: 'Yes, our bowls are crafted from pure SS304 food-grade stainless steel. They are 100% BPA-free, lead-free, non-toxic, and top-rack dishwasher safe.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major Indian payment methods: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking (all major banks), and Cash on Delivery (COD).'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          Help & FAQs
        </h1>
        <p className="text-sm text-zinc-600">
          Find answers to common questions about sizing, delivery, materials, and care.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-extrabold text-sm sm:text-base text-zinc-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help banner */}
      <div className="bg-orange-50 rounded-3xl border border-orange-200 p-8 text-center space-y-3">
        <h3 className="font-heading font-extrabold text-xl text-zinc-950">
          Still Have Questions?
        </h3>
        <p className="text-xs text-zinc-600 max-w-sm mx-auto">
          Our canine care specialists are always happy to help you find the right gear for your dog.
        </p>
        <button
          onClick={() => navigate('contact')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Contact DoggyBhai Pack</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
