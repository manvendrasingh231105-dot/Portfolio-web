import { motion } from "motion/react";
import { Terminal, Award, BookOpen, CheckCircle, ExternalLink } from "lucide-react";
import { resumeData } from "../data";

export default function SkillsMatrix() {
  return (
    <div className="space-y-12 text-left">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-zinc-900">Technical Capability Matrix</h2>
        <p className="text-zinc-500 text-sm mt-1">Detailed evaluation of programming proficiencies and certified academic credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Skills Levels (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {resumeData.skills.map((category, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-zinc-200 p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Terminal className="w-5 h-5 text-zinc-400" />
                <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">
                  {category.category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5 pt-1">
                {category.items.map((skill, sIdx) => (
                  <div key={sIdx} className="bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 flex-1 min-w-[140px] max-w-[240px] flex items-center justify-between hover:border-zinc-900 transition-all group">
                    <span className="font-bold text-zinc-900 text-xs tracking-tight group-hover:text-zinc-950 transition-colors">
                      {skill}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Academic Interests */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 md:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-zinc-500" />
              Academic & Technical Interests
            </h3>
            <p className="text-zinc-500 text-xs">Primary fields of focus and technical interest:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {resumeData.interests.map((item, id) => (
                <div key={id} className="p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors border border-zinc-250 rounded-xl text-xs text-zinc-700 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Certs & Extra details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 px-1">
            <Award className="w-5 h-5 text-zinc-505" />
            <h3 className="text-lg font-black text-zinc-900">Verified Credentials</h3>
          </div>

          {/* Certificate Block */}
          {resumeData.certificates.map((cert, idx) => (
            <div key={idx} className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-radial from-zinc-800 to-transparent opacity-50 pointer-events-none" />
              
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase block">
                    {cert.issuer || "Credential Record"}
                  </span>
                  <a href={cert.link} className="text-zinc-400 hover:text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h4 className="text-base font-black tracking-tight pr-6 leading-snug">{cert.name}</h4>
              </div>

              {cert.bullets && cert.bullets.length > 0 && (
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {cert.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="bg-zinc-850 border border-zinc-800/80 p-2.5 rounded-xl flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-zinc-300 leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
