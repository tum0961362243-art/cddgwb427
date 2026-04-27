import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-32 pb-16 overflow-hidden">
      {/* Giant Typography (Like "Good buy.") */}
      <div className="text-center px-6 mb-24">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-serif text-[15vw] leading-none text-bloom-heavy tracking-tighter"
        >
          Let's play.
        </motion.h2>
        <p className="mt-8 font-serif italic text-xl md:text-2xl opacity-80 max-w-xl mx-auto">
          Contact me about content creation, music planning, or general inquiries. Let's interface today.
        </p>
      </div>

      {/* Grid Layout for Links */}
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-warm-white/10 pt-16">
        
        {/* Info Column */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-serif text-lg text-bloom mb-4">Intent</h4>
          <p className="font-sans text-sm opacity-70 leading-relaxed">
            音乐内容创作 / 企划<br/>
            (Target: 网易云音乐)
          </p>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-serif text-lg text-bloom mb-4">Enquiries</h4>
          <a href="mailto:646171537@qq.com" className="block text-sm opacity-70 hover:opacity-100 hover:text-bloom transition-all mb-2 retro-link inline-block">
            646171537@qq.com
          </a>
        </div>

        {/* Social Column */}
        <div>
          <h4 className="font-serif text-lg text-bloom mb-4">Channels</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity retro-link self-start">Bilibili</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity retro-link self-start">Douyin</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-24 text-center">
        <p className="font-mono text-xs opacity-30 tracking-widest uppercase">
          © {new Date().getFullYear()} Chen Yangdong. Operated on WebGL.
        </p>
      </div>
    </footer>
  );
}
