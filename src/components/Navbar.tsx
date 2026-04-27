import { motion } from 'motion/react';
import { Phone, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference"
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-warm-white opacity-80" />
        <span className="font-serif italic font-bold text-xl tracking-wider text-bloom">
          CYD.STUDIO
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <a href="#hero" className="retro-link active">Home</a>
        <a href="#experience" className="retro-link">Experience</a>
        <a href="#works" className="retro-link">Masterpieces</a>
        <a href="#lab" className="retro-link">AI Music Lab</a>
      </div>

      {/* Right Contact */}
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 opacity-70" />
        <a href="#contact" className="retro-link text-sm font-medium tracking-wide">
          Contact Me
        </a>
      </div>
    </motion.nav>
  );
}
