import { motion } from 'motion/react';

const EXPERIENCES = [
  {
    company: "联想（北京）有限公司",
    role: "产品营销",
    date: "2025.07 - 至今",
    items: [
      "独立操盘 2 款 IoT 新品（小新3Pro投影仪、M1眼镜）上市全案策划。",
      "跨部门统筹 4 场线上电商大促会场，成功拉动京东会场增流 27 倍、官网增流 5.4 倍。",
      "建立 AIGC 提效工作流，结合营销节点输出 50+ 条高质量视觉与文案物料，总曝光达 1000w+。",
      "协助统筹落地 2 场 AIOT 线下体验展，将废材处理等物料成本大幅压缩 70%。"
    ]
  },
  {
    company: "深圳戴乐体感科技有限公司",
    role: "抖音吉他带货主播",
    date: "2024.11 - 2025.03",
    items: [
      "负责智能吉他音乐垂类抖音直播，双 12 单场 GMV 破 40 万（抖音乐器榜第一）。",
      "基于罗盘数据优化直播话术与互动形式，次月场均互动率提升 100%、转化率 +20%。"
    ]
  },
  {
    company: "网易（杭州）网络有限公司",
    role: "短视频品类运营",
    date: "2023.09 - 2023.12",
    items: [
      "负责网易新闻 KOL 引入，优化话术使周均触达率提升 150%。",
      "运用 AI 工具完成 30+ 核心短剧片段的矩阵剪辑与标题命名。"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-bloom-heavy mb-4">Professional<br/>Interface.</h2>
          <p className="opacity-60 font-sans tracking-widest text-sm uppercase">Track Record</p>
        </motion.div>

        <div className="space-y-24">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start group"
            >
              {/* Left Column: Meta */}
              <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-warm-white/20 pl-4 md:pl-0 md:pr-6 py-2 transition-colors duration-500 group-hover:border-warm-white/60">
                <h3 className="font-serif text-2xl text-bloom mb-1">{exp.company}</h3>
                <p className="font-sans font-medium opacity-80 mb-2">{exp.role}</p>
                <span className="font-mono text-xs opacity-50 tracking-wider mix-blend-screen">{exp.date}</span>
              </div>

              {/* Right Column: Details */}
              <div className="space-y-4">
                {exp.items.map((item, i) => (
                  <p key={i} className="text-sm md:text-base opacity-70 leading-relaxed relative pl-4">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-warm-white/40 rounded-full"></span>
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
