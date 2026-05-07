import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Building2,
  MapPin,
  Layers,
  DoorOpen,
  Maximize,
  Calculator,
  ChevronRight,
  Phone,
  Star
} from 'lucide-react';

type ResidenceType = 'house' | 'apartment';
type City = 'daly-city' | 'sf' | 'vicinity';

export default function App() {
  const [residence, setResidence] = useState<ResidenceType>('house');
  const [city, setCity] = useState<City>('daly-city');
  const [floor, setFloor] = useState(1);
  const [rooms, setRooms] = useState(2);
  const [area, setArea] = useState(50);
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const phoneNumber = "415-756-9422";

  const calculateTotal = () => {
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      let total = 75;

      if (residence === 'apartment') total += 30;

      switch (city) {
        case 'sf': total += 50; break;
        case 'vicinity': total += 25; break;
        default: total += 0;
      }

      if (floor > 1) total += (floor - 1) * 15;
      total += rooms * 40;
      total += area * 1.5;

      setResult(Math.max(250, Math.round(total)));
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-10 md:py-16 font-sans overflow-x-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-400/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Premium Header */}
      <header className="w-full max-w-lg mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block"
        >
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light shadow-2xl mb-6 gold-glow border border-gold/20">
            <div className="bg-indigo-950 rounded-full p-4">
              <Star className="w-8 h-8 text-gold fill-gold" />
            </div>
          </div>
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Carpet Cleaning
        </h1>
        <div className="flex items-center justify-center gap-2 text-gold-light/80 font-bold tracking-[0.3em] uppercase text-[10px]">
          <span className="w-6 h-[1px] bg-gold/40"></span>
          Premium Daly City Care
          <span className="w-6 h-[1px] bg-gold/40"></span>
        </div>
      </header>

      {/* Main Glass Card */}
      <main className="w-full max-w-md glass-iphone-dark iridescent-border rounded-[2.5rem] p-8 shadow-premium relative overflow-hidden z-10">
        <div className="relative flex flex-col gap-9">

          {/* Residence Type */}
          <section>
            <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 text-center">
              Accommodation
            </h2>
            <div className="grid grid-cols-2 p-1 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
              <button
                onClick={() => setResidence('house')}
                className={`flex items-center justify-center gap-2 py-3 rounded-[0.9rem] transition-all duration-400 font-bold text-sm ${
                  residence === 'house'
                    ? 'bg-indigo-900/60 text-white shadow-raised border border-white/10'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Home className={`w-4 h-4 ${residence === 'house' ? 'text-gold' : ''}`} />
                House
              </button>
              <button
                onClick={() => setResidence('apartment')}
                className={`flex items-center justify-center gap-2 py-3 rounded-[0.9rem] transition-all duration-400 font-bold text-sm ${
                  residence === 'apartment'
                    ? 'bg-indigo-900/60 text-white shadow-raised border border-white/10'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className={`w-4 h-4 ${residence === 'apartment' ? 'text-gold' : ''}`} />
                Apartment
              </button>
            </div>
          </section>

          {/* Location Picker */}
          <section>
            <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 text-center">
              Select Area
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { id: 'daly-city', label: 'Daly City', val: 'daly-city' },
                { id: 'sf',        label: 'San Francisco', val: 'sf' },
                { id: 'vicinity',  label: 'Vicinity', val: 'vicinity' }
              ].map((loc) => (
                <button
                  key={loc.val}
                  onClick={() => setCity(loc.val as City)}
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border-2 ${
                    city === loc.val
                      ? 'border-gold-gradient bg-indigo-950 text-white shadow-2xl gold-glow'
                      : 'border-white/5 bg-black/30 text-slate-300 hover:bg-black/40 hover:border-violet-500/30'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${city === loc.val ? 'bg-gold/20' : 'bg-white/5'}`}>
                    <MapPin className={`w-5 h-5 ${city === loc.val ? 'text-gold' : 'text-indigo-400'}`} />
                  </div>
                  <span className={`font-bold transition-colors ${city === loc.val ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {loc.label}
                  </span>
                  {city === loc.val && (
                    <motion.div layoutId="check" className="ml-auto">
                      <div className="bg-gold p-1 rounded-full shadow-lg">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Input Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2 text-center shadow-inner">
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1">
                <Layers className="w-3 h-3 text-gold" /> Level
              </label>
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => setFloor(Math.max(1, floor - 1))}
                  className="w-8 h-8 rounded-full bg-indigo-900/40 shadow-raised flex items-center justify-center text-gold font-bold active:scale-90 border border-white/10"
                >
                  -
                </button>
                <span className="text-xl font-black text-white mx-2">{floor}</span>
                <button
                  onClick={() => setFloor(floor + 1)}
                  className="w-8 h-8 rounded-full bg-indigo-900/40 shadow-raised flex items-center justify-center text-gold font-bold active:scale-90 border border-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2 text-center shadow-inner">
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1">
                <DoorOpen className="w-3 h-3 text-gold" /> Total Rooms
              </label>
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="w-8 h-8 rounded-full bg-indigo-900/40 shadow-raised flex items-center justify-center text-gold font-bold active:scale-90 border border-white/10"
                >
                  -
                </button>
                <span className="text-xl font-black text-white mx-2">{rooms}</span>
                <button
                  onClick={() => setRooms(rooms + 1)}
                  className="w-8 h-8 rounded-full bg-indigo-900/40 shadow-raised flex items-center justify-center text-gold font-bold active:scale-90 border border-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Area Slider */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-4 shadow-inner">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                <Maximize className="w-3 h-3 text-gold" /> Floor Space
              </label>
              <span className="text-lg font-black text-gold">
                {area}<span className="text-xs ml-0.5 text-gold/60 font-mono">m²</span>
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold"
            />
          </div>

          {/* Trust Markers */}
          <section className="grid grid-cols-3 gap-2 px-1">
            <div className="flex flex-col items-center text-center gap-1">
              <div className="h-5 flex items-center justify-center text-gold font-black text-sm italic">15Y+</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Experience</div>
            </div>
            <div className="flex flex-col items-center text-center gap-1 border-x border-white/5">
              <div className="h-5 flex items-center justify-center text-gold font-black text-sm italic">1000+</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Happy Clients</div>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="h-5 flex items-center justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2 h-2 text-gold fill-gold" />)}
              </div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Google Reviews</div>
            </div>
          </section>

          {/* Calculate Button & Result */}
          <div className="pt-2 flex flex-col gap-4">
            <button
              onClick={calculateTotal}
              disabled={isCalculating}
              className="group relative w-full h-[72px] bg-white rounded-3xl flex items-center justify-center overflow-hidden transition-all active:scale-[0.97] shadow-xl"
            >
              <div className="relative z-10 flex items-center gap-3">
                {isCalculating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Calculator className="w-7 h-7 text-black" />
                  </motion.div>
                ) : (
                  <>
                    <Calculator className="w-7 h-7 text-black transition-transform group-hover:scale-110 duration-300" />
                    <span className="text-xl font-black text-black tracking-tight leading-none uppercase">See My Price</span>
                  </>
                )}
              </div>
            </button>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 30 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 30 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-[2rem] p-8 mt-2 text-center shadow-2xl relative overflow-hidden gold-glow">
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em] mb-3 opacity-80">
                      Guaranteed Quote
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg font-bold text-gold/40">$</span>
                      <span className="text-6xl font-black text-white tracking-tighter leading-none italic drop-shadow-sm">
                        {result}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-5 font-bold tracking-wide">
                      {result === 250 ? "* Minimum Service Fee Applied" : "* Premium cleaning service estimate"}
                    </p>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="mt-8 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-gold-dark to-gold text-white font-black text-lg py-5 rounded-2xl transition-all shadow-lg gold-glow-button hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Phone className="w-5 h-5 fill-white" />
                      Finalize Booking
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 flex flex-col items-center gap-8 w-full max-w-sm px-6 relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">
            Diamond Support Line
          </p>
          <a
            href={`tel:${phoneNumber}`}
            className="text-xl font-black text-white hover:text-gold transition-colors flex items-center gap-3 py-2 px-5 bg-white/5 rounded-full border border-white/5 shadow-raised whitespace-nowrap"
          >
            <div className="w-10 h-10 rounded-full bg-gold shadow-lg flex items-center justify-center gold-glow shrink-0">
              <Phone className="w-4 h-4 text-white fill-white" />
            </div>
            {phoneNumber}
          </a>
        </motion.div>

        <div className="w-16 h-[1px] bg-indigo-500/20"></div>

        <div className="text-center space-y-2">
          <p className="text-indigo-300/40 text-[10px] font-bold uppercase tracking-[0.25em]">
            © 2026 Carpet Cleaning Service
          </p>
          <div className="flex items-center justify-center gap-3 opacity-60">
            <div className="w-1 h-1 bg-gold rounded-full"></div>
            <p className="text-indigo-200 text-[9px] uppercase font-black tracking-widest">Master Technicians Only</p>
            <div className="w-1 h-1 bg-gold rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
