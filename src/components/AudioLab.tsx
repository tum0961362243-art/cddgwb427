import { motion } from 'motion/react';
import { Waves, PlayCircle } from 'lucide-react';

const TRACKS = [
  { id: '01', title: 'AI 辅助词曲创作原声 Demo', length: '3:14' },
  { id: '02', title: '吉他弹唱 / 创意编曲片段', length: '1:45' },
  { id: '03', title: 'AIGC 工作流生成测试音频', length: '2:20' },
];

export default function AudioLab() {
  return (
    <section id="lab" className="py-32 relative bg-black/40">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">
        
        {/* Left: Description */}
        <div className="space-y-6 text-center md:text-left">
           <Waves className="w-12 h-12 opacity-50 mx-auto md:mx-0 mb-6" />
           <h2 className="font-serif text-4xl md:text-5xl text-bloom">AI Music<br/>Laboratory.</h2>
           <div className="h-px w-24 bg-warm-white/20 mx-auto md:mx-0"></div>
           <p className="opacity-70 leading-relaxed text-sm md:text-base">
             搭建跨界音乐创作提效流程，熟练运用 AI 模型辅助词曲生成、节奏重构与自动化剪辑，以极高的效率落地高质感原创音乐作品。
           </p>
           <button className="px-6 py-3 border border-warm-white/30 text-sm tracking-widest uppercase hover:bg-warm-white hover:text-dark-space transition-colors duration-300">
             Explore Workflow
           </button>
        </div>

        {/* Right: Audio Player UI Mockup */}
        <div className="bg-black/60 border border-warm-white/10 p-6 md:p-10 backdrop-blur-md rounded-sm">
           <div className="flex justify-between items-end border-b border-warm-white/10 pb-4 mb-6">
             <span className="font-mono text-xs tracking-widest opacity-50">TAPE RECORDINGS</span>
             <span className="font-serif italic text-lg opacity-80">Vol. 1</span>
           </div>

           <div className="space-y-2">
             {TRACKS.map((track, idx) => (
               <motion.div 
                 key={track.id}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 viewport={{ once: true }}
                 className="flex items-center gap-4 p-4 hover:bg-warm-white/5 cursor-pointer transition-colors group"
               >
                 <span className="font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity">{track.id}</span>
                 <PlayCircle className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-bloom transition-all" />
                 <span className="font-serif flex-1 opacity-80 group-hover:opacity-100">{track.title}</span>
                 <span className="font-mono text-xs opacity-40">{track.length}</span>
               </motion.div>
             ))}
           </div>

           {/* Decorative Visualizer */}
           <div className="mt-8 h-12 flex items-end gap-1 px-4 opacity-30">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-warm-white rounded-t-sm animate-pulse"
                  style={{ 
                    height: `${20 + Math.random() * 80}%`,
                    animationDuration: `${0.5 + Math.random()}s`
                  }}
                ></div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
