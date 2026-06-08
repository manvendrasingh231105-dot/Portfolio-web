import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, Sparkles, Send, Play, ShieldAlert, Cpu, ArrowRight } from "lucide-react";
import { resumeData } from "../data";

export default function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "manvendra-os v1.0.0 init successful...",
    "Type 'help' to see available options.",
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands: core, skills, projects, contact, clear";
        break;
      case "core":
        response = `Profile: ${resumeData.name} | ${resumeData.title} | GL Bajaj IT 2024-2028`;
        break;
      case "skills":
        response = `Tech Stack: ${resumeData.skills.flatMap(s => s.items).join(", ")}`;
        break;
      case "projects":
        response = `Key initiatives: 1. Face-recognition Attendance, 2. Library RFID Tracker. Type 'nav projects' to open Projects tab.`;
        break;
      case "contact":
        response = `Connect with me: ${resumeData.contact.email} / ${resumeData.contact.phone}`;
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "nav projects":
        setActiveTab("projects");
        response = "Navigating to Projects tab...";
        break;
      case "nav skills":
        setActiveTab("skills");
        response = "Navigating to Skills tab...";
        break;
      case "nav resume":
        setActiveTab("resume");
        response = "Navigating to Resume tab...";
        break;
      default:
        response = `Command unknown: '${cmd}'. Try typing 'help' of 'core'.`;
    }

    setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  return (
    <div className="space-y-12">
      {/* Hero Block */}
      <section className="bg-zinc-900 rounded-3xl p-8 md:p-14 text-white overflow-hidden relative shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-zinc-800 to-transparent opacity-40 pointer-events-none" />
        
        <div className="max-w-2xl space-y-6 relative z-10 text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-full border border-zinc-700"
          >
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Seeking Engineering Internships</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Engineering <span className="text-zinc-400">intelligent solutions</span> for today's systems.
          </h1>

          <p className="text-zinc-400 h-auto text-base md:text-lg leading-relaxed">
            I am a B.Tech Information Technology undergraduate focused on modern full-stack engineering, Computer Vision models, and data security infrastructure.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setActiveTab("projects")}
              className="px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl shadow hover:bg-zinc-100 transition-all active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              Explore Interactive Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab("resume")}
              className="px-6 py-3 bg-zinc-800 text-white font-bold rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-all active:scale-95 cursor-pointer"
            >
              Get Resume PDF
            </button>
          </div>
        </div>
      </section>

      {/* Grid Overview Info (Bento Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
        {/* Core Vision */}
        <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">Philosophy</span>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Academic rigor meets practical execution</h2>
          </div>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed italic font-serif">
            "{resumeData.summary}"
          </p>
          <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-500">Current Study Era: 2024 - 2028</span>
            </div>
            <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">GL Bajaj IT</span>
          </div>
        </div>

        {/* Interactive Terminal Shell */}
        <div className="md:col-span-5 bg-zinc-950 text-zinc-300 rounded-3xl p-6 shadow-lg flex flex-col font-mono text-xs border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-zinc-400" />
              <span className="font-bold text-[11px] text-zinc-400">manvendra@fresher:~$</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[180px] space-y-2 mb-3 text-left">
            {terminalHistory.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex gap-2">
            <span className="text-zinc-500 shrink-0">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help' here..."
              className="flex-1 bg-transparent border-none outline-none text-zinc-200 focus:ring-0 placeholder-zinc-700 font-mono"
            />
            <button type="submit" className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
