import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const VIDEOS = [
  {
    title: "抽象弹唱系列",
    data: "播放 2500W+ / 点赞 87W",
    desc: "半个月抖音涨粉 10 万，单月 B站涨粉 14 万",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "品牌合作企划",
    data: "恩雅 / 卡普马",
    desc: "将品牌调性融入高互动创意短视频",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "高互动现场切片",
    data: "抖音乐器榜Top1",
    desc: "直播高光时刻精粹与二次传播创作",
    image: "https://images.unsplash.com/photo-1470229722913-7c090b332da8?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Masterpieces() {
  return (
    <section id="works" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-bloom-heavy mb-4">Selected<br/>Transmissions.</h2>
        <p className="opacity-60 font-sans tracking-widest text-sm uppercase">Social Media & Viral Hits</p>
      </div>

      {/* "Film Strip" Style Layout */}
      <div className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory hide-scrollbars no-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {/* Spacer for initial centering effect on large screens */}
        <div className="hidden md:block min-w-[10vw]"></div>
        
        {VIDEOS.map((vid, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="min-w-[85vw] md:min-w-[500px] snap-center shrink-0 group relative cursor-pointer"
          >
             {/* Thumbnail Container */}
             <div className="relative aspect-video bg-black/50 border border-warm-white/10 overflow-hidden mb-4 rounded-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img 
                  src={vid.image} 
                  alt={vid.title} 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full border border-warm-white/30 backdrop-blur-md flex items-center justify-center text-warm-white">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>

                {/* Film Strip Holes Decoration */}
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-around items-center px-2 opacity-30">
                   {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-1.5 bg-black rounded-xs shadow-[0_0_2px_rgba(255,255,255,0.2)]"></div>)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-around items-center px-2 opacity-30">
                   {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-1.5 bg-black rounded-xs shadow-[0_0_2px_rgba(255,255,255,0.2)]"></div>)}
                </div>
             </div>

             {/* Meta Info */}
             <div className="pl-2 border-l border-warm-white/20 transition-colors group-hover:border-warm-white/60">
                <h3 className="font-serif italic text-2xl text-bloom mb-1">{vid.title}</h3>
                <p className="font-mono text-xs opacity-80 mb-2">{vid.data}</p>
                <p className="text-sm opacity-60 font-sans max-w-sm">{vid.desc}</p>
             </div>
          </motion.div>
        ))}
        
        <div className="hidden md:block min-w-[10vw]"></div>
      </div>
      
      {/* Metrics Summary */}
      <div className="container mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-warm-white/10 pt-12">
         <div>
           <p className="font-serif italic text-3xl md:text-5xl text-bloom">50w+</p>
           <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Total Fans</p>
         </div>
         <div>
           <p className="font-serif italic text-3xl md:text-5xl text-bloom">10w</p>
           <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Douyin Fast Growth</p>
         </div>
         <div>
           <p className="font-serif italic text-3xl md:text-5xl text-bloom">14w</p>
           <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Bilibili Monthly</p>
         </div>
         <div>
           <p className="font-serif italic text-3xl md:text-5xl text-bloom">Top 1</p>
           <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Music Instrument Rank</p>
         </div>
      </div>
    </section>
  );
}
