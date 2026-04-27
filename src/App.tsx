import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Play, Pause, Disc3, ArrowRight, MonitorPlay, Radio, Mail, Smartphone, MessageCircle, Heart, Star } from 'lucide-react';

// --- 全局样式注入 (字体与特效) ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Noto+Serif+SC:wght@300;400;700;900&display=swap');

  :root {
    --bloom-color: #FFF8EE;
    --dark-bg: #050505;
    --light-bg: #F5F2EB;
    --dark-text: #2C2A26;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: 'Noto Serif SC', 'Playfair Display', serif;
    background-color: var(--dark-bg);
    color: var(--bloom-color);
    cursor: none; /* 隐藏默认光标，使用自定义光标 */
  }

  html {
    scroll-behavior: smooth;
  }

  /* 胶片噪点遮罩 */
  .film-grain {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* CRT 辉光文字 */
  .text-bloom {
    text-shadow: 0 0 10px rgba(255,248,238,0.6), 0 0 20px rgba(255,248,238,0.3), 0 0 40px rgba(255,248,238,0.1);
  }

  /* CRT 屏幕扫描线特效 */
  .crt-screen::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 10;
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }

  /* Custom Scrollbar for Lyrics Box */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 248, 238, 0.2);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 248, 238, 0.4);
  }

  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-reverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  .animate-marquee {
    animation: marquee 40s linear infinite;
  }
  .animate-marquee-reverse {
    animation: marquee-reverse 45s linear infinite;
  }
`;

// --- 自定义跟随光标 ---
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#FFF8EE]/60 pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,248,238,0.5)]"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-1 h-1 bg-[#FFF8EE] rounded-full shadow-[0_0_10px_#FFF8EE]"></div>
    </motion.div>
  );
};

// --- 弹幕组件 ---
const DanmakuItem = ({ text, top, duration, delay, isImage }: any) => (
  <motion.div
    className={`absolute whitespace-nowrap ${isImage ? '' : 'text-bloom text-[#FFF8EE]/60 font-bold tracking-widest'}`}
    style={{ top: `${top}%`, fontSize: isImage ? '1rem' : `${Math.random() * 1.5 + 1}rem`, zIndex: 0 }}
    initial={{ x: '100vw' }}
    animate={{ x: '-100vw' }}
    transition={{ repeat: Infinity, duration: duration, ease: 'linear', delay: delay }}
  >
    {isImage ? (
      <div className="w-48 h-32 bg-gray-800 border border-[#FFF8EE]/20 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
        <img src={text} alt="Memory" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
      </div>
    ) : (
      text
    )}
  </motion.div>
);

// --- 第一部分：首屏 (Dark Mode) ---
const HeroSection = () => {
  const danmakuData = [
    { text: "AI音乐创制者", top: 10, duration: 18, delay: 0 },
    { text: "爆款操盘手", top: 25, duration: 22, delay: 2 },
    { text: "抽象弹唱地板", top: 45, duration: 20, delay: 5 },
    { text: "数据驱动创作", top: 60, duration: 16, delay: 1 },
    { text: "过亿播放缔造者", top: 80, duration: 25, delay: 4 },
    { text: "50万粉丝音乐博主", top: 15, duration: 19, delay: 7 },
    { text: "双平台爆款制造机", top: 35, duration: 24, delay: 3 },
    { text: "AIGC音乐赋能师", top: 55, duration: 17, delay: 6 },
    { text: "新传硕士营销人", top: 75, duration: 21, delay: 0 },
    { text: "热点捕手", top: 90, duration: 15, delay: 8 },
    { text: "造梗音乐人", top: 5, duration: 20, delay: 5 },
    { text: "词曲创作玩家", top: 30, duration: 18, delay: 9 },
    { text: "音乐垂类5年深耕", top: 50, duration: 22, delay: 1 },
    { text: "短视频运营大神", top: 70, duration: 19, delay: 4 },
    { text: "内容策划先锋", top: 85, duration: 23, delay: 7 },
    { text: "内容提效引擎", top: 20, duration: 16, delay: 2 },
    { text: "流行审美猎手", top: 40, duration: 21, delay: 6 },
    
    // 图片资源 (请确保这些图片放置在项目的 public 文件夹中)
    { text: "/untitled-0/1.jpg", top: 15, duration: 25, delay: 3, isImage: true },
    { text: "/untitled-0/2.jpg", top: 50, duration: 28, delay: 1, isImage: true },
    { text: "/untitled-0/3.jpg", top: 75, duration: 26, delay: 5, isImage: true },
    { text: "/untitled-0/4.jpg", top: 5, duration: 30, delay: 8, isImage: true },
    { text: "/untitled-0/5.jpg", top: 35, duration: 24, delay: 0, isImage: true },
    { text: "/untitled-0/6.jpg", top: 85, duration: 27, delay: 4, isImage: true },
    { text: "/untitled-0/7.jpg", top: 40, duration: 22, delay: 6, isImage: true }
  ];

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#111122] to-[#000000]">
      {/* 弹幕墙背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        {danmakuData.map((item, idx) => (
          <DanmakuItem key={idx} {...item} />
        ))}
      </div>

      {/* 核心信息 */}
      <div className="z-10 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* 左侧文字信息 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mt-16 md:mt-0">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-7xl md:text-[8rem] font-bold mb-4 text-bloom italic leading-none whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            陈阳东
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-light mb-8 text-[#FFF8EE]/90 tracking-widest"
          >
            求职意向: 音乐内容创作/企划
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-lg text-[#FFF8EE]/60 max-w-md leading-relaxed font-sans md:text-left"
          >
            拥有 5 年以上音乐内容创作经验，具备基础乐理与流行音乐审美。营销策划出身，沟通协调与执行力突出，熟练运用 AI 工具辅助词曲创作与音乐内容生成。
          </motion.p>
        </div>

        {/* 右侧个人照片 */}
        <motion.div 
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="relative flex justify-center md:justify-end"
        >
          {/* 照片容器带有复古胶片感相框 */}
          <div className="relative w-72 h-96 md:w-[380px] md:h-[500px] rounded-sm overflow-hidden border border-[#FFF8EE]/10 shadow-[0_0_50px_rgba(255,248,238,0.05)] group">
            <div className="absolute inset-0 bg-[#111] z-0"></div>
            {/* 真实个人照片 */}
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 group-hover:scale-105" 
            />
            {/* 边框角标装饰 */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FFF8EE]/40 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-[#FFF8EE]/80"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FFF8EE]/40 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-[#FFF8EE]/80"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#FFF8EE]/40 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-[#FFF8EE]/80"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FFF8EE]/40 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-[#FFF8EE]/80"></div>
            {/* 渐变遮罩增加电影感 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center opacity-50"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-sans">Scroll to Inspect</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFF8EE] to-transparent"></div>
      </motion.div>
    </section>
  );
};

// --- 第二部分：工作经历 (Light Mode - Vintage Editorial) ---
const ExperienceSection = () => {
  const experiences = [
    {
      company: "联想（北京）有限公司",
      role: "产品营销",
      date: "2025.07 - 至今",
      details: [
        "独立操盘 2 款 IoT 新品（小新3Pro投影仪、M1眼镜）上市全案策划。",
        "跨部门统筹 4 场线上电商大促会场，成功拉动京东会场增流 27 倍、官网会场增流 5.4 倍。",
        "建立 AIGC 提效工作流，结合营销节点输出 50+ 条高质量视觉与文案物料，总曝光达 1000w+。",
        "协助统筹落地 2 场 AIOT 线下体验展，将废材处理等物料成本大幅压缩 70%。"
      ]
    },
    {
      company: "深圳戴乐体感科技有限公司",
      role: "抖音吉他带货主播（实习）",
      date: "2024.11 - 2025.03",
      details: [
        "负责智能吉他音乐垂类抖音直播，双 12 单场 GMV 破 40 万（抖音乐器榜第一）。",
        "基于罗盘数据优化直播话术与互动形式，次月场均互动率提升 100%、转化率 +20%。"
      ]
    },
    {
      company: "网易（杭州）网络有限公司",
      role: "短视频品类运营（实习）",
      date: "2023.09 - 2023.12",
      details: [
        "负责网易新闻 KOL 引入，优化话术使周均触达率提升 150%。",
        "运用 AI 工具完成 30+ 核心短剧片段的矩阵剪辑与标题命名。"
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-20 bg-[#F5F2EB] text-[#2C2A26] relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bloom" style={{ fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>
            工作经历
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80 font-sans leading-relaxed">
            嘿伙计，可以给个机会让创作音乐成为我的主业吗？
          </p>
        </div>

        <div className="grid gap-16">
          {experiences.map((exp, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              key={idx} 
              className="grid md:grid-cols-[1fr_2fr] gap-8 border-t border-[#2C2A26]/20 pt-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 font-serif">{exp.company}</h3>
                <p className="text-lg italic opacity-70" style={{ fontFamily: "'Playfair Display', serif" }}>{exp.role}</p>
                <p className="text-sm font-sans mt-4 opacity-60 uppercase tracking-widest">{exp.date}</p>
              </div>
              <div>
                <ul className="space-y-4 font-sans text-base opacity-80 list-disc pl-4">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="pl-2 leading-relaxed">{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 定制复古音频播放器 ---
const RetroAudioPlayer = ({ title, src, sub }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState<string>('');
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    const txtPath = src.replace('.mp3', '.txt');
    fetch(txtPath)
      .then(res => {
        if (!res.ok) throw new Error("Lyrics not found");
        return res.text();
      })
      .then(text => setLyrics(text))
      .catch(err => console.error(err));
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-[#111116] border border-[#FFF8EE]/10 rounded-lg p-6 flex flex-col gap-5 group hover:border-[#FFF8EE]/30 transition-all duration-300">
        <audio 
          ref={audioRef} 
          src={src} 
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#FFF8EE]/10 flex items-center justify-center text-[#FFF8EE] hover:bg-[#FFF8EE] hover:text-black transition-colors shrink-0"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <div>
              <h4 className="text-lg font-bold text-[#FFF8EE] font-serif">{title}</h4>
              <p className="text-xs text-white/40 font-sans mt-1 uppercase tracking-wider">{sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 self-end md:self-auto">
            <button 
              onClick={() => setShowLyrics(!showLyrics)} 
              className={`text-xs px-4 py-1.5 rounded-full border transition-all ${showLyrics ? 'bg-[#FFF8EE]/20 border-[#FFF8EE]/30 text-white' : 'border-[#FFF8EE]/20 text-white/60 hover:text-white hover:border-[#FFF8EE]/40'}`}
            >
              歌词
            </button>
            <Disc3 className={`w-8 h-8 text-[#FFF8EE]/20 hidden md:block ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full font-sans text-xs text-white/50">
          <span className="w-8 text-right shrink-0">{formatTime(progress)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFF8EE] overflow-hidden"
            style={{
              background: `linear-gradient(to right, rgba(255, 248, 238, 0.8) ${(progress / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.1) ${(progress / (duration || 1)) * 100}%)`
            }}
          />
          <span className="w-8 shrink-0">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Lyrics Frosted Glass Box */}
      {showLyrics && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-lg max-h-72 overflow-y-auto p-8 relative shadow-xl custom-scrollbar"
        >
          <pre className="font-sans text-sm md:text-base text-center text-white/80 whitespace-pre-wrap leading-[2.5]">
            {lyrics || "暂无歌词"}
          </pre>
        </motion.div>
      )}
    </div>
  );
};

// --- 代表作弹幕墙 ---
const MasterpieceWallSection = () => {
  // 复用现有的封面图片模拟作品集并添加数据
  const works = [
    { src: "/masterpieces/1.png", likes: "12.5w", comments: "1.2w", favorites: "5.4w" },
    { src: "/masterpieces/2.png", likes: "8.5w", comments: "4000+", favorites: "1.1w" },
    { src: "/masterpieces/3.png", likes: "20w+", comments: "2w", favorites: "15w" },
    { src: "/masterpieces/4.png", likes: "5.2w", comments: "1000+", favorites: "3000+" },
    { src: "/masterpieces/5.png", likes: "10w+", comments: "8000+", favorites: "2.5w" },
    { src: "/masterpieces/6.png", likes: "3.2w", comments: "500+", favorites: "1.2w" },
    { src: "/masterpieces/7.png", likes: "6.8w", comments: "2000+", favorites: "3.3w" },
    { src: "/masterpieces/8.png", likes: "15w+", comments: "1.5w", favorites: "8w" },
    { src: "/masterpieces/9.png", likes: "4.5w", comments: "800+", favorites: "1.5w" }
  ];

  // 每一行打乱顺序，增加随机感
  const row1 = [...works, ...works].sort(() => 0.5 - Math.random());
  const row2 = [...works, ...works].sort(() => 0.5 - Math.random());

  return (
    <section id="masterpieces" className="py-32 bg-[#000000] relative overflow-hidden flex flex-col justify-center border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFF8EE]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10 px-6">
         <h2 className="text-4xl md:text-5xl font-bold mb-6 text-bloom" style={{ fontFamily: "'Playfair Display', serif" }}>
            爆款制造机
          </h2>
          <p className="text-[#FFF8EE]/60 font-sans max-w-2xl mx-auto leading-relaxed">
            深耕音乐垂类，拥有全网超 50 万粉丝弹唱类自媒体经验。打造“抽象弹唱”差异化人设。有效吸引卡普马、楚门、恩雅、qdc等知名品牌商务合作。
          </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6 z-10 py-10 origin-center rotate-[-2deg]">
        {/* 第一行动画 */}
        <div className="flex w-[200%] gap-4 md:gap-6 animate-marquee flex-nowrap shrink-0 hover:[animation-play-state:paused]">
            {[...row1, ...row1].map((work, idx) => (
                <div key={idx} className="relative w-56 h-36 md:w-72 md:h-44 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-300 group">
                    <img src={work.src} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Masterpiece Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs text-[#FFF8EE]">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{work.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{work.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{work.favorites}</span>
                      </div>
                    </div>
                </div>
            ))}
        </div>
        {/* 第二行动画 */}
        <div className="flex w-[200%] gap-4 md:gap-6 animate-marquee-reverse flex-nowrap shrink-0 hover:[animation-play-state:paused]">
            {[...row2, ...row2].map((work, idx) => (
                <div key={idx} className="relative w-56 h-36 md:w-72 md:h-44 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-300 group">
                    <img src={work.src} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Masterpiece Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs text-[#FFF8EE]">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{work.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{work.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{work.favorites}</span>
                      </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

// --- 第四部分：AI Music Lab ---
const AIMusicLabSection = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">
        
        {/* 左侧说明 */}
        <div>
          <div className="flex items-center gap-3 mb-6 opacity-60">
            <Radio className="w-5 h-5" />
            <span className="font-sans text-sm uppercase tracking-widest">Experimental Lab</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-bloom" style={{ fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>
            用SUNO创作的原创小曲
          </h2>
          <p className="text-[#FFF8EE]/60 font-sans leading-relaxed mb-8">
            搭建 AI 音乐创作提效流程，熟练运用 AI 工具辅助词曲创作与音乐内容生成，高效落地原创音乐作品。在保持人类音乐审美的同时，极大提升内容产出的爆发力。
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest border-b border-[#FFF8EE]/30 pb-1 hover:border-[#FFF8EE] transition-colors">
            Contact for Full Demos <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 右侧播放器列表 */}
        <div className="crt-screen relative bg-black p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col gap-4">
          <RetroAudioPlayer title="故意" src="/guyi.mp3" sub="词/曲：陈阳东 编曲：SUNO" />
          <RetroAudioPlayer title="想见面" src="/xiangjianmian.mp3" sub="词/曲：陈阳东 编曲：SUNO" />
          <RetroAudioPlayer title="快理我" src="/kuailiwo.mp3" sub="词/曲：陈阳东 编曲：SUNO" />
        </div>

      </div>
    </section>
  );
};

// --- 底栏：Contact ---
const Footer = () => {
  return (
    <footer id="contact" className="py-20 bg-black text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-bloom" style={{ fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>
          期待与您的合作！
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16 font-sans">
          <div className="flex items-center gap-3 text-[#FFF8EE]/70 hover:text-[#FFF8EE] transition-colors cursor-pointer">
            <Mail className="w-5 h-5" />
            <span className="text-lg">646171537@qq.com</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-[#FFF8EE]/30 rounded-full"></div>
          <div className="flex items-center gap-3 text-[#FFF8EE]/70 hover:text-[#FFF8EE] transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            <span className="text-lg">微信号：CDDG0121</span>
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          <a href="https://space.bilibili.com/269288799?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[#FFF8EE]/20 flex items-center justify-center hover:bg-[#FFF8EE] hover:text-black transition-all">
            <span className="font-bold font-serif">B</span>
          </a>
          <a href="https://v.douyin.com/0xigedWknnQ/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[#FFF8EE]/20 flex items-center justify-center hover:bg-[#FFF8EE] hover:text-black transition-all">
            <span className="font-bold font-serif">抖</span>
          </a>
        </div>

        <p className="text-sm font-sans opacity-30 uppercase tracking-widest">
          © 2026 CHEN YANGDONG. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

// --- 主应用组件 ---
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="film-grain"></div>
      <CustomCursor />
      
      <main className="relative z-10 w-full min-h-screen">
        {/* 固定顶部极简导航 */}
        <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-[#FFF8EE]">
          <div className="font-bold text-xl tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>
            @陈大东瓜
          </div>
          <div className="hidden md:flex gap-8 font-sans text-base uppercase tracking-widest">
            <a href="#hero" className="hover:opacity-60 transition-opacity">首页</a>
            <a href="#experience" className="hover:opacity-60 transition-opacity">工作经历</a>
            <a href="#masterpieces" className="hover:opacity-60 transition-opacity">代表作品</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">联系方式</a>
          </div>
        </nav>

        <HeroSection />
        <ExperienceSection />
        <MasterpieceWallSection />
        <AIMusicLabSection />
        <Footer />
      </main>
    </>
  );
}
