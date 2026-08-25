import React, { useState } from 'react';
import {
  Dog,
  Sparkles,
  Save,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Zap,
  Bot,
  Video,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { DogProfile } from '../types';

export const MyDogPage: React.FC = () => {
  const { user, updateDogProfile, products, addToast, navigate } = useShop();

  const existingProfile: DogProfile = user?.dogProfile || {
    name: 'Buddy',
    breed: 'Golden Retriever',
    ageYears: 2,
    ageMonths: 6,
    gender: 'Male',
    weightKg: 28,
    sizeCategory: 'Large',
    activityLevel: 'High',
    pullingHabit: 'Moderate Puller'
  };

  const [formData, setFormData] = useState<DogProfile>(existingProfile);
  const [isSaved, setIsSaved] = useState(false);

  // AI Paw-Advisor State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const breedsList = [
    'Golden Retriever',
    'Labrador Retriever',
    'German Shepherd (GSD)',
    'Indie / Indian Pariah',
    'Beagle',
    'Shih Tzu',
    'Pug',
    'Rottweiler',
    'Doberman',
    'Cocker Spaniel',
    'French Bulldog',
    'Siberian Husky',
    'Great Dane',
    'Pomeranian',
    'Boxer',
    'Other / Mixed'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      addToast('Please provide your dog’s name', 'error');
      return;
    }
    updateDogProfile(formData);
    setIsSaved(true);
    addToast(`Woof! ${formData.name}’s profile has been updated! 🐾`, 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAskPawAdvisor = async () => {
    setAiLoading(true);
    setAiAdvice(null);

    try {
      const res = await fetch('/api/ai/paw-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dogProfile: formData })
      });
      const data = await res.json();
      if (data.advice) {
        setAiAdvice(data.advice);
      } else {
        // Fallback custom rule advisor if Gemini API key not present
        setAiAdvice(
          `Based on ${formData.name}'s profile (${formData.breed}, ${formData.weightKg}kg, ${formData.activityLevel} activity): We recommend our Padded Ergonomic Collar (Size ${formData.sizeCategory === 'Large' ? 'L' : 'M'}) with neoprene cushioning to prevent chafing, paired with our Heavy-Duty Shock-Absorbing Rope Leash to handle ${formData.pullingHabit?.toLowerCase() || 'pulling'}. For meals, our Anti-Slip Stainless Steel Bowl (900ml) offers maximum hygiene.`
        );
      }
    } catch (err) {
      setAiAdvice(
        `Based on ${formData.name}'s profile (${formData.breed}, ${formData.weightKg}kg): We recommend our Heavy-Duty Padded Collar (Size ${formData.sizeCategory === 'Large' ? 'L' : 'M'}) paired with our 5ft Traffic Handle Leash for optimal control and safety.`
      );
    } finally {
      setAiLoading(false);
    }
  };

  // Recommended products based on size and breed
  const tailoredPicks = products.filter((p) => {
    const matchesBreed = p.recommendedBreeds?.some((b) =>
      b.toLowerCase().includes(formData.breed.toLowerCase())
    );
    const matchesSize =
      formData.sizeCategory === 'Large'
        ? p.availableSizes.includes('L') || p.availableSizes.includes('XL')
        : p.availableSizes.includes('M') || p.availableSizes.includes('S');
    return matchesBreed || matchesSize;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
          <Dog className="w-4 h-4" /> Personalization
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          My Dog Profile
        </h1>
        <p className="text-sm text-zinc-600">
          Tell us about your furry companion to unlock tailored collar sizes, leash recommendations, and personalized feeding advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Edit Form (Left) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-zinc-950">
                {formData.name ? `${formData.name}'s Details` : 'Dog Information'}
              </h2>
              <p className="text-xs text-zinc-500">Update weight, breed, and walking behavior.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Dog className="w-6 h-6" />
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            {/* Name & Breed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Dog's Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Max, Bella, Simba, Charlie, Daisy"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Breed *</label>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  {breedsList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={formData.ageYears}
                  onChange={(e) => setFormData({ ...formData, ageYears: Number(e.target.value) })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Age (Months)</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={formData.ageMonths}
                  onChange={(e) => setFormData({ ...formData, ageMonths: Number(e.target.value) })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Weight & Size Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Weight in KG</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Size Category</label>
                <select
                  value={formData.sizeCategory}
                  onChange={(e) => setFormData({ ...formData, sizeCategory: e.target.value as any })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="Small">Small (Puppy, Shih Tzu, Pug)</option>
                  <option value="Medium">Medium (Beagle, Indie, Cocker)</option>
                  <option value="Large">Large (Labrador, Golden, GSD)</option>
                  <option value="Extra Large">Extra Large (Rottweiler, Great Dane)</option>
                </select>
              </div>
            </div>

            {/* Activity & Pulling Habit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Energy / Activity Level</label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="Low">Low (Calm couch cuddle dog)</option>
                  <option value="Moderate">Moderate (Regular daily park walks)</option>
                  <option value="High">High (Energetic runner / outdoor agility)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Walking / Leash Habit</label>
                <select
                  value={formData.pullingHabit}
                  onChange={(e) => setFormData({ ...formData, pullingHabit: e.target.value as any })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="Calm Walker">Calm Walker (Loose leash)</option>
                  <option value="Moderate Puller">Moderate Puller (Excited by birds/dogs)</option>
                  <option value="Heavy Puller">Heavy Puller (Needs shock absorption)</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Save className="w-4 h-4" />
                <span>SAVE PROFILE</span>
              </button>

              {isSaved && (
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* AI Paw-Advisor & Recommendations (Right) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Paw-Advisor Box */}
          <div className="bg-gradient-to-br from-zinc-900 to-[#18181B] text-white p-6 sm:p-7 rounded-3xl border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                  <span>AI Paw-Advisor</span>
                  <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase">
                    Smart AI
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Instant sizing & gear analysis for {formData.name || 'your dog'}.
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Click below to generate personalized collar width, leash handle type, and bowl volume recommendations based on {formData.name}’s breed, weight, and activity level.
            </p>

            <button
              onClick={handleAskPawAdvisor}
              disabled={aiLoading}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-heading font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{aiLoading ? 'Analyzing Dog Anatomy...' : `ASK ADVISOR FOR ${formData.name.toUpperCase()}`}</span>
            </button>

            {aiAdvice && (
              <div className="p-4 bg-zinc-800/80 border border-zinc-700 rounded-2xl text-xs text-zinc-200 leading-relaxed space-y-2 animate-in fade-in">
                <div className="text-[11px] font-extrabold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Personalized Recommendation:
                </div>
                <p>{aiAdvice}</p>
              </div>
            )}
          </div>

          {/* Smart Care Monitoring Card */}
          <div className="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-black">
                    Smart Care Status
                  </h4>
                  <p className="text-[11px] text-zinc-500">Live monitoring & AI coat checks</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PROTECTED
              </span>
            </div>

            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1 text-zinc-700">
              <p className="flex items-center justify-between text-[11px]">
                <span>Assigned Cameras:</span>
                <strong className="text-black">2 Devices Online</strong>
              </p>
              <p className="flex items-center justify-between text-[11px]">
                <span>Last Tick Screening:</span>
                <strong className="text-emerald-700">Coat Clear (2 days ago)</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate('smart-care', { tab: 'live-cam' })}
                className="py-2.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[11px] rounded-xl text-center shadow-xs transition-colors cursor-pointer"
              >
                LIVE CAM
              </button>
              <button
                type="button"
                onClick={() => navigate('smart-care', { tab: 'ai-tick-check' })}
                className="py-2.5 px-3 bg-black hover:bg-zinc-800 text-white font-extrabold text-[11px] rounded-xl text-center shadow-xs transition-colors cursor-pointer"
              >
                COAT CHECK
              </button>
            </div>
          </div>

          {/* Quick Fit Summary Card */}
          <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-3xl space-y-3 text-xs">
            <h4 className="font-heading font-extrabold text-sm text-zinc-900 uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-600" />
              {formData.name}'s Recommended Specs
            </h4>
            <div className="space-y-1.5 text-zinc-700">
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span>Ideal Collar Size:</span>
                <span className="font-bold text-zinc-900">
                  {formData.sizeCategory === 'Large'
                    ? 'Size L (18" - 26")'
                    : formData.sizeCategory === 'Extra Large'
                    ? 'Size XL (24" - 32")'
                    : 'Size M (14" - 20")'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span>Recommended Leash:</span>
                <span className="font-bold text-zinc-900">
                  {formData.pullingHabit === 'Heavy Puller'
                    ? '12mm Mountain Climbing Rope'
                    : '5ft Traffic Padded Leash'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Bowl Capacity:</span>
                <span className="font-bold text-zinc-900">
                  {formData.weightKg > 20 ? '900ml – 1400ml SS304' : '450ml – 850ml SS304'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailored Products Row */}
      <div className="space-y-6 pt-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-zinc-950">
            Tailored Gear for {formData.name} ({formData.breed})
          </h2>
          <button
            onClick={() => navigate('shop')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>Explore All Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tailoredPicks.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
