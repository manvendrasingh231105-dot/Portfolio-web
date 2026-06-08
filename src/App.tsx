import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Terminal, 
  Sparkles,
  BookOpen,
  Code2,
  FileText,
  User,
  ExternalLink
} from "lucide-react";
import Home from "./components/Home";
import ProjectsShowcase from "./components/ProjectsShowcase";
import SkillsMatrix from "./components/SkillsMatrix";
import Resume from "./components/Resume";
import Logo from "./components/Logo";
import { resumeData } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [copied, setCopied] = useState<boolean>(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    try {
      navigator.clipboard.writeText(resumeData.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const navigationItems = [
    { id: "home", label: "Home", icon: User },
    { id: "projects", label: "Projects Simulator", icon: Code2 },
    { id: "skills", label: "Skills & Certs", icon: Terminal },
    { id: "resume", label: "A4 Resume", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Dynamic Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Custom Vector representation */}
            <div 
              onClick={() => setActiveTab("home")} 
              className="cursor-pointer"
            >
              <Logo />
            </div>

            {/* Nav Tabs */}
            <div className="hidden md:flex space-x-1 bg-zinc-100 p-1 rounded-xl">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isActive 
                        ? "bg-white text-zinc-950 shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions / Soc Links */}
            <div className="flex items-center gap-3">
              <a 
                href={resumeData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={resumeData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={resumeData.contact.leetcode} 
                target="_blank" 
                rel="noopener noreferrer"
                title="LeetCode Profile"
                className="p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <Terminal className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${resumeData.contact.email}`}
                onClick={handleEmailClick}
                title="Send Email / Copy to Clipboard"
                className="p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden sticky top-[64px] z-45 bg-white border-b border-zinc-200/80 px-4 py-2 flex gap-1 overflow-x-auto no-print">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 ${
                isActive 
                  ? "bg-zinc-900 text-white" 
                  : "bg-zinc-100 text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-0 print:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
            {activeTab === "projects" && <ProjectsShowcase />}
            {activeTab === "skills" && <SkillsMatrix />}
            {activeTab === "resume" && <Resume />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Simple Human-literal Footer */}
      <footer className="mt-20 border-t border-zinc-200/80 py-8 text-center bg-white no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Manvendra Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
            <a 
              href={`mailto:${resumeData.contact.email}`} 
              onClick={handleEmailClick}
              className="hover:text-zinc-950 transition-colors"
            >
              Contact Intern Info
            </a>
            <span className="text-zinc-300">•</span>
            <a href={resumeData.contact.portfolio} className="hover:text-zinc-950 transition-colors">
              Portfolio Index
            </a>
          </div>
        </div>
      </footer>

      {/* Floating high-fidelity copy success toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-805 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <div className="text-xs">
              <span className="font-extrabold block text-zinc-100">Email Copied!</span>
              <span className="text-zinc-400 font-mono text-[10px]">{resumeData.contact.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
