import { useRef, useState } from "react";
import { motion } from "motion/react";
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink,
  GraduationCap, 
  Download,
  Printer,
  ChevronRight,
  Code2,
  Star,
  Gamepad2
} from "lucide-react";
import { resumeData } from "../data";

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    
    const element = resumeRef.current;
    const opt = {
      margin: [0.25, 0.25, 0.25, 0.25] as [number, number, number, number],
      filename: `Manvendra_Singh_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.99 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 800
      },
      jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="bg-white rounded-3xl p-5 border border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-4 no-print shadow-sm">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wider">A4 Single Page Resume View</h3>
          </div>
          <p className="text-zinc-500 text-xs">This view reflects the exact styling, sections, and structural spacing of your verified PDF resume.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors w-full sm:w-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            Print View
          </button>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-1.5 px-5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-zinc-800 transition-all disabled:opacity-50 w-full sm:w-auto"
          >
            {isDownloading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Elegant Standard A4 Document container */}
      <div className="overflow-x-auto pb-4 no-print-scroll">
        <div 
          ref={resumeRef}
          className="bg-white shadow-xl border border-zinc-200/80 mx-auto w-[210mm] min-h-[297mm] text-zinc-900 select-text p-[20mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0 print:w-full print:min-h-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="space-y-6">
            
            {/* 1. Header & Contact Details */}
            <div className="text-center space-y-2 pb-2">
              <h1 className="text-3xl font-extrabold tracking-widest text-zinc-950 uppercase">
                {resumeData.name}
              </h1>
              <p className="text-zinc-600 text-[13px] tracking-wider font-semibold uppercase">
                {resumeData.title}
              </p>
              
              {/* Clean compact contact details list */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-zinc-700 pt-1 font-medium">
                {/* Phone */}
                <a href={`tel:${resumeData.contact.phone}`} className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <Phone className="w-3 h-3 text-zinc-900 shrink-0" />
                  <span>{resumeData.contact.phone}</span>
                </a>
                
                <span className="text-zinc-400">•</span>
                
                {/* Email */}
                <a href={`mailto:${resumeData.contact.email}`} className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <Mail className="w-3 h-3 text-zinc-900 shrink-0" />
                  <span>{resumeData.contact.email}</span>
                </a>
                
                <span className="text-zinc-400">•</span>
                
                {/* LinkedIn */}
                <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <Linkedin className="w-3 h-3 text-zinc-900 shrink-0" />
                  <span>LinkedIn</span>
                </a>
                
                <span className="text-zinc-400">•</span>
                
                {/* GitHub */}
                <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <Github className="w-3 h-3 text-zinc-900 shrink-0" />
                  <span>GitHub</span>
                </a>
                
                <span className="text-zinc-400">•</span>
                
                {/* LeetCode */}
                <a href={resumeData.contact.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <Code2 className="w-3 h-3 text-zinc-900 shrink-0" />
                  <span>LeetCode</span>
                </a>
                
                <span className="text-zinc-400">•</span>
                
                {/* Geeksforgeeks */}
                <a href={resumeData.contact.geeksforgeeks} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-950">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  <span>GeeksforGeeks</span>
                </a>
              </div>
            </div>

            {/* 2. Summary Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Summary
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <p className="text-[11px] text-zinc-800 leading-relaxed text-justify">
                {resumeData.summary}
              </p>
            </section>

            {/* 3. Education Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Education
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <div className="space-y-3">
                {/* B.Tech */}
                <div className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-zinc-950">B.Tech in Information Technology</span>
                    <span className="font-bold text-zinc-950">GPA: 8.6 / 10</span>
                  </div>
                  <div className="text-[10.5px] text-zinc-800">G.L. Bajaj Institute of Technology & Management, Greater Noida</div>
                  <div className="text-[10.5px] text-zinc-650">Expected 2028</div>
                </div>

                {/* Class XII */}
                <div className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-zinc-950">Higher Secondary Certificate (Class XII)</span>
                    <span className="font-bold text-zinc-950">93%</span>
                  </div>
                  <div className="text-[10.5px] text-zinc-800">Delhi Public School, Bulandshahr</div>
                  <div className="text-[10.5px] text-zinc-650">2024</div>
                </div>

                {/* Class X */}
                <div className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-zinc-950">Secondary School Certificate (Class X)</span>
                    <span className="font-bold text-zinc-950">98%</span>
                  </div>
                  <div className="text-[10.5px] text-zinc-800">Delhi Public School, Bulandshahr</div>
                  <div className="text-[10.5px] text-zinc-650">2022</div>
                </div>
              </div>
            </section>

            {/* 4. Experience Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Experience
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <div className="space-y-2">
                <div className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-zinc-950">Java Programming Virtual Intern</span>
                    <span className="font-bold text-zinc-950">02/2026 - 03/2026</span>
                  </div>
                  <div className="text-[10.5px] text-zinc-800">CodSoft</div>
                </div>
                <ul className="list-disc list-outside pl-3.5 space-y-1 text-[11px] text-zinc-800">
                  <li className="leading-normal">Developed high-performance Java applications focusing on memory management and OOP principles.</li>
                  <li className="leading-normal">Collaborated on backend modules to optimize data processing speeds and logic implementation.</li>
                </ul>
              </div>
            </section>

            {/* 5. Projects Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Projects
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <div className="space-y-3">
                {/* Crop Weed Detection Model */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-950">
                    <a 
                      href="https://github.com/manvendrasingh231105-dot/crop-weed-detection-model" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>Crop Weed Detection Model</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0 no-print" />
                    </a>
                  </div>
                  <ul className="list-disc list-outside pl-3.5 text-[11px] text-zinc-800">
                    <li className="leading-normal">Engineered a CV system differentiating crops and weeds using Python and integrated classification models for precision farming.</li>
                  </ul>
                </div>

                {/* Face-Recognition Attendance System */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-950">
                    <a 
                      href="https://github.com/manvendrasingh231105-dot/face_recognition_system" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>Face-Recognition Attendance System</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0 no-print" />
                    </a>
                  </div>
                  <ul className="list-disc list-outside pl-3.5 text-[11px] text-zinc-800">
                    <li className="leading-normal">Architected a real-time tracking app using Flask and OpenCV with a NumPy data pipeline for automated CSV attendance logging.</li>
                  </ul>
                </div>

                {/* Library Management System */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-950">
                    <a 
                      href="https://github.com/manvendrasingh231105-dot/Library-management-system" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>Library Management System</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0 no-print" />
                    </a>
                  </div>
                  <ul className="list-disc list-outside pl-3.5 text-[11px] text-zinc-800">
                    <li className="leading-normal">Developed a robust and secure multi-user library management console in Java using JDBC and state-persistence layers to automate tracking, reservation, and circulation of books.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 6. Skills Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Skills
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <div className="space-y-1 text-[11px] text-zinc-800 leading-normal">
                <div>
                  <span className="font-bold text-zinc-950">Programming Languages:</span> Java, Python, C, SQL, JavaScript
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Web Technologies:</span> HTML, CSS
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Core Competencies:</span> Prompt Engineering, OOPS, Data Structures & Algorithms, Logic Building
                </div>
              </div>
            </section>

            {/* 7. Certifications Section */}
            <section className="space-y-1.5">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Certifications
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              <ul className="space-y-1 text-[11px] text-zinc-800 font-medium font-sans">
                {resumeData.certificates.map((cert, index) => (
                  <li key={index} className="leading-relaxed">
                    {cert.link && cert.link !== "#" ? (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline hover:text-zinc-950 inline-flex items-center gap-1 align-middle"
                        title={`Verify ${cert.name} Badge`}
                      >
                        <span>{cert.name} — {cert.issuer}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-zinc-500 shrink-0 no-print inline" />
                      </a>
                    ) : (
                      <span>{cert.name} — {cert.issuer}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. Interests & Hobbies Section */}
            <section className="space-y-1.5 pb-2">
              <h2 className="text-[12px] font-extrabold text-zinc-950 uppercase tracking-widest">
                Interests & Hobbies
              </h2>
              <div className="border-t-[1.5px] border-zinc-950" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-0.5 text-[11px] text-zinc-800">
                {/* Left col - Technical Interests */}
                <div className="space-y-1">
                  <h3 className="font-bold text-zinc-950 flex items-center gap-1.5 leading-tight">
                    <Star className="w-3.5 h-3.5 text-zinc-900 fill-current shrink-0" />
                    <span>Technical Interests</span>
                  </h3>
                  <p className="leading-relaxed pl-[20px]">
                    Generative AI, Algorithmic Puzzles, Emerging Tech, Machine Learning
                  </p>
                </div>

                {/* Right col - Hobbies */}
                <div className="space-y-1">
                  <h3 className="font-bold text-zinc-950 flex items-center gap-1.5 leading-tight">
                    <Gamepad2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                    <span>Hobbies</span>
                  </h3>
                  <p className="leading-relaxed pl-[20px]">
                    Music Curation, Competitive Programming, Reading Tech Literature
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
