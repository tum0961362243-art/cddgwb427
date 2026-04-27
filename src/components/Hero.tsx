import { motion } from 'motion/react';

const DANMAKU_WORDS = [
  "全网超50万粉丝", "千万级曝光", "爆款操盘", "抽象弹唱", 
  "抖音涨粉10万", "抖音乐器榜第一", "AI音乐创制", "AIGC提效", 
  "数据洞察", "增流27倍"
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Danmaku (Bullet Comments) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.15] pointer-events-none flex flex-col justify-around py-20">
        {[0, 1, 2, 3, 4].map((row) => (
          <div 
            key={row} 
            className="whitespace-nowrap flex gap-12 text-2xl md:text-5xl font-serif italic text-bloom animate-danmaku"
            style={{ 
              animationDuration: `${20 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 20}s`
            }}
          >
            {DANMAKU_WORDS.sort(() => Math.random() - 0.5).map((word, i) => (
              <span key={i} className="inline-block">{word}</span>
            ))}
            {/* Duplicate for seamless loop feeling */}
            {DANMAKU_WORDS.sort(() => Math.random() - 0.5).map((word, i) => (
              <span key={`dup-${i}`} className="inline-block">{word}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl leading-tight text-bloom-heavy"
          >
            Chen<br/>Yangdong.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-serif italic opacity-90 border-l-2 border-current pl-4">
              音乐内容创作 / 企划
            </h2>
            <p className="text-sm md:text-base opacity-70 leading-relaxed font-sans max-w-md">
              拥有5年以上音乐内容创作经验。营销策划出身，深谙流量密码。熟练运用 AI 工具辅助词曲创作与内容生成，打造数字时代的沉浸式音乐体验。
            </p>
          </motion.div>
        </div>

        {/* Placeholder for the "3D object / Anchor" from the style guide */}
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative hidden md:flex items-center justify-center p-8"
        >
          {/* Abstract geometric representation instead of a heavy 3D model */}
          <div className="relative w-64 h-64 md:w-96 md:h-96">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-warm-white/10 to-warm-white/5 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
             <div className="absolute inset-8 border border-warm-white/20 rounded-full transform rotate-45 transition-transform duration-1000 hover:rotate-90 flex items-center justify-center backdrop-blur-sm">
                <span className="font-serif italic opacity-30 text-3xl">Play.</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
