import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Video, 
  ScanLine, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  ListRestart, 
  Smartphone, 
  Play, 
  Square,
  AlertCircle,
  Database,
  ExternalLink
} from "lucide-react";
import { resumeData } from "../data";

interface SimulatedBook {
  id: string;
  title: string;
  author: string;
  rfidUid: string;
  status: "Checked In" | "Checked Out";
}

const initialBooks: SimulatedBook[] = [
  { id: "1", title: "Introduction to Algorithms", author: "Cormen, Leiserson", rfidUid: "RFID_009x7A2", status: "Checked In" },
  { id: "2", title: "The Pragmatic Programmer", author: "Hunt, Thomas", rfidUid: "RFID_112z8B1", status: "Checked In" },
  { id: "3", title: "Clean Code", author: "Robert C. Martin", rfidUid: "RFID_443x9C9", status: "Checked In" },
];

export default function ProjectsShowcase() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Simulator State: Face recognition
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [faceLogs, setFaceLogs] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [camBlocked, setCamBlocked] = useState(false);

  // Simulator State: RFID
  const [books, setBooks] = useState<SimulatedBook[]>(initialBooks);
  const [scannedLog, setScannedLog] = useState<{ time: string; action: string; uid: string }[]>([]);
  const [rfidActiveSlot, setRfidActiveSlot] = useState<SimulatedBook | null>(null);

  // Face scanner video stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationId: number;

    async function startStream() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 300 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setFaceLogs(["Webcam stream initialized successfully...", "Activating MediaPipe Facemesh emulation layer..."]);
        }
      } catch (err) {
        console.warn("Camera block fallback", err);
        setCamBlocked(true);
        setFaceLogs(["Camera hardware/permission blocked.", "Initializing canvas facial node emulator..."]);
      }
    }

    if (isVideoActive) {
      startStream();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const srcStream = videoRef.current.srcObject as MediaStream;
        srcStream.getTracks().forEach(track => track.stop());
      }
    }

    // Canvas Mesh Emulation
    const drawMesh = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simulated video frame background if camera blocked
        if (camBlocked) {
          ctx.fillStyle = "#18181b";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.strokeStyle = "rgba(113, 113, 122, 0.3)";
          ctx.lineWidth = 1;
          for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
          }
          for (let j = 0; j < canvas.height; j += 20) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(canvas.width, j);
            ctx.stroke();
          }

          // Mock face silhouette
          ctx.strokeStyle = "#3f3f46";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(200, 150, 60, 0, Math.PI * 2);
          ctx.stroke();
        } else if (videoRef.current) {
          // Draw video frames to canvas to overlay mesh
          try {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          } catch(e){}
        }

        // Draw animated scanning overlay mesh
        const time = Date.now() * 0.003;
        ctx.strokeStyle = "#22c55e"; // green-500
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)";
        ctx.lineWidth = 1.5;

        // Simulated scan grid bounding box
        const boxX = 120 + Math.sin(time) * 5;
        const boxY = 70 + Math.cos(time * 0.5) * 5;
        const boxW = 160;
        const boxH = 160;

        ctx.strokeRect(boxX, boxY, boxW, boxH);
        
        // Tracking corners
        ctx.lineWidth = 4;
        // Top-left
        ctx.beginPath(); ctx.moveTo(boxX, boxY + 20); ctx.lineTo(boxX, boxY); ctx.lineTo(boxX + 20, boxY); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(boxX + boxW - 20, boxY); ctx.lineTo(boxX + boxW, boxY); ctx.lineTo(boxX + boxW, boxY + 20); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(boxX, boxY + boxH - 20); ctx.lineTo(boxX, boxY + boxH); ctx.lineTo(boxX + 20, boxY + boxH); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(boxX + boxW - 20, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH - 20); ctx.stroke();

        // Draw facial mesh nodes inside the bounding box
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(34, 197, 94, 0.4)";
        const points: [number, number][] = [];
        
        const centerX = boxX + boxH / 2;
        const centerY = boxY + boxW / 2;
        
        // Generate pseudo facemesh points
        const numPoints = 18;
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const r = 40 + Math.sin(time + i) * 10;
          points.push([
            centerX + Math.cos(angle) * r,
            centerY + Math.sin(angle) * r * 1.2
          ]);
        }
        
        // Add nose, eyes structure
        points.push([centerX, centerY - 15]); // nose bridge
        points.push([centerX, centerY + 10]); // nose tip
        points.push([centerX - 20, centerY - 25]); // left eye
        points.push([centerX + 20, centerY - 25]); // right eye
        points.push([centerX, centerY + 30]); // mouth

        // Connect nodes
        for (let m = 0; m < points.length; m++) {
          const p1 = points[m];
          ctx.beginPath();
          ctx.arc(p1[0], p1[1], 2, 0, Math.PI * 2);
          ctx.fill();

          for (let n = m + 1; n < points.length; n++) {
            const p2 = points[n];
            const dist = Math.hypot(p2[0]-p1[0], p2[1]-p1[1]);
            if (dist < 50) {
              ctx.beginPath();
              ctx.moveTo(p1[0], p1[1]);
              ctx.lineTo(p2[0], p2[1]);
              ctx.stroke();
            }
          }
        }

        // Floating dynamic logs text
        if (Math.random() < 0.05) {
          const possibleLogs = [
            `Nodes analyzed: ${points.length}`,
            "Calculating landmarks mapping vectors...",
            "Matching embedding space against local DB indexes...",
            "SUCCESS: MATCH MATCHED (INDEX_01_GUEST_VISITOR)",
          ];
          setFaceLogs(prev => [...prev.slice(-4), possibleLogs[Math.floor(Math.random() * possibleLogs.length)]]);
        }
      }
      animationId = requestAnimationFrame(drawMesh);
    };

    if (isVideoActive) {
      animationId = requestAnimationFrame(drawMesh);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoActive, camBlocked]);

  // Handle Book Placement on RFID Scanner Slot
  const handlePlaceBook = (book: SimulatedBook) => {
    setRfidActiveSlot(book);
    const nowStamp = new Date().toLocaleTimeString();

    // Toggle book state dynamically
    const updatedBooks = books.map(item => {
      if (item.id === book.id) {
        const nextStatus = item.status === "Checked In" ? "Checked Out" as const : "Checked In" as const;
        setScannedLog(prev => [
          { time: nowStamp, action: `RFID Read: Token recognized, toggled to ${nextStatus}`, uid: item.rfidUid },
          ...prev
        ]);
        return { ...item, status: nextStatus };
      }
      return item;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="space-y-12 text-left">
      {/* Disclaimer Modal Popup */}
      <AnimatePresence>
        {showDisclaimer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/45 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-zinc-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 shrink-0">
                  <AlertCircle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-zinc-900 leading-tight">
                    Interactive Playground Disclaimer
                  </h3>
                  <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-semibold mt-0.5">Conceptual Preview Notice</p>
                </div>
              </div>

              <div className="text-zinc-650 text-xs leading-relaxed space-y-2 font-medium">
                <p>
                  These interactive simulators are **AI-generated conceptual simulations** designed solely to give you a quick gist of what the projects do.
                </p>
                <p>
                  They do not run the actual production backends or physical hardware devices. To inspect the actual, fully functional systems, please check the **official repository links** attached on this page.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="w-full px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold rounded-xl shadow hover:bg-zinc-800 transition-colors cursor-pointer text-center"
                >
                  Understood & Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">Project Showcases & Interactive Playgrounds</h2>
          <p className="text-zinc-500 text-sm mt-1">Simulate real-world engineering prototypes directly inside your browser.</p>
        </div>
        <button
          onClick={() => setShowDisclaimer(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all font-bold shrink-0 self-start md:self-auto cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Simulation Info
        </button>
      </div>

      {/* Persistent Inline Note */}
      <div className="bg-amber-50/40 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 text-zinc-700">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-xs text-amber-950 uppercase tracking-wider">Concept Demo Notice</p>
          <p className="text-xs text-zinc-650 leading-relaxed">
            These interactive sandboxes are AI-generated conceptual simulations to showcase project capabilities. For actual product installations and backend source structures, please inspect the repository links listed below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Project 1 CARD & CAMERA SANDBOX */}
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-bold rounded-full border border-zinc-200">
                Flask & OpenCV & Mediapipe
              </span>
              <ScanLine className="w-5 h-5 text-green-600 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">Face Recognition Attendance</h3>
              <p className="text-zinc-500 text-xs md:text-sm">Real-time landmark capture with local NumPy indices.</p>
            </div>

            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
              Developed a real-time webcam-based face recognition attendance system. Uses MediaPipe Face Mesh to capture facial geometry grids, creating unique vectors for attendee validation without storing privacy-compromising raw photos.
            </p>

            {/* Sandbox Container */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden p-4 relative flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-zinc-400 font-mono text-[10px] pb-2 border-b border-zinc-800 mb-2">
                <span>WEBCAM EMULATION LAYER</span>
                <span className={isVideoActive ? "text-green-500 animate-pulse font-bold" : "text-zinc-600"}>
                  ● {isVideoActive ? "ACTIVE" : "STANDBY"}
                </span>
              </div>

              {/* View Output */}
              <div className="relative w-full aspect-video bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center">
                {isVideoActive ? (
                  <>
                    <video ref={videoRef} className="hidden" muted playsInline />
                    <canvas ref={canvasRef} width={400} height={250} className="w-full h-full object-cover" />
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <p className="text-zinc-500 text-xs font-mono">Camera feed inactive or secure context simulation</p>
                    <button
                      onClick={() => setIsVideoActive(true)}
                      className="px-4 py-2 bg-white text-zinc-950 rounded-lg text-xs font-bold active:scale-95 shadow transition-all hover:bg-zinc-100 cursor-pointer"
                    >
                      Start Simulated Face Mesh
                    </button>
                  </div>
                )}
              </div>

              {/* Real-time telemetry console logs */}
              {isVideoActive && (
                <div className="w-full mt-3 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 font-mono text-[9px] text-zinc-400 text-left min-h-[60px] max-h-[80px] overflow-y-auto space-y-1">
                  {faceLogs.map((log, i) => (
                    <div key={i} className="leading-tight">{`> ${log}`}</div>
                  ))}
                </div>
              )}

              {isVideoActive && (
                <button
                  onClick={() => {
                    setIsVideoActive(false);
                    setFaceLogs([]);
                  }}
                  className="mt-3 px-4 py-1.5 bg-red-950 border border-red-800 text-red-200 text-xs rounded-lg font-bold cursor-pointer hover:bg-red-910"
                >
                  Shut Down Camera Feed
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project 2 CARD & RFID CHECKOUT SANDBOX */}
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-bold rounded-full border border-zinc-200">
                Flask & RFID & Material Bootstrap
              </span>
              <BookOpen className="w-5 h-5 text-blue-600 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">RFID Library Management</h3>
              <p className="text-zinc-500 text-xs md:text-sm">Hardware-integrated transaction tracking database.</p>
            </div>

            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
              Integrated physical RFID controllers with database logic using python-flask. Built interactive system states checking items on-site vs checked out, optimizing resource inventory logs instantly.
            </p>

            {/* Simulated Desktop Workbench RFID Slot */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                <span>SIMULATED HARDWARE WORKBENCH</span>
                <span className="font-mono text-[10px]">COGS: FLASK + SQLITE</span>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {books.map(book => (
                  <button
                    key={book.id}
                    onClick={() => handlePlaceBook(book)}
                    className="p-3 bg-white border border-zinc-250 rounded-xl hover:border-zinc-900 text-left space-y-2 group transition-all duration-150 active:scale-95 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    <div className="leading-tight">
                      <p className="font-bold text-zinc-900 text-[11px] truncate">{book.title}</p>
                      <p className="text-[9px] text-zinc-500 truncate">{book.author}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[8px] font-mono rounded-full font-bold inline-block ${
                      book.status === "Checked In" ? "bg-green-100 text-green-800" : "bg-zinc-100 text-zinc-800"
                    }`}>
                      {book.status}
                    </span>
                  </button>
                ))}
              </div>

              {/* Scan Workbench sensor area */}
              <div className="bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-xl p-5 text-center flex flex-col items-center justify-center space-y-2 relative">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[8px] text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>READER ONLINE</span>
                </div>
                
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">RFID sensor bay</p>
                <p className="text-xs text-zinc-400">Click a book module card above to pass it over the RFID induction reader.</p>
              </div>

              {/* Live logs table */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Controller logs</p>
                <div className="bg-white border border-zinc-200 rounded-lg p-2 max-h-[80px] overflow-y-auto text-[10px] font-mono text-zinc-600 divide-y divide-zinc-100">
                  {scannedLog.length === 0 ? (
                    <div className="text-zinc-400 py-1 text-center italic">Pass cards to build log indexes...</div>
                  ) : (
                    scannedLog.map((log, i) => (
                      <div key={i} className="py-1 flex justify-between">
                        <span>{log.action}</span>
                        <span className="text-zinc-400 text-[9px] shrink-0">{log.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Repositories & Deployments */}
      <div className="space-y-6 pt-8 border-t border-zinc-100">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-zinc-500" />
            Featured Software Engineering Initiatives
          </h3>
          <p className="text-zinc-500 text-xs mt-1">
            Browse through fully-documented architectures, automated ML pipelines, and active pre-release prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, idx) => {
            const isUnderDev = project.title.toLowerCase().includes("under development") || project.title.toLowerCase().includes("amigo");
            return (
              <div 
                key={idx} 
                className={`p-6 rounded-3xl bg-white border transition-all duration-300 hover:shadow-md hover:border-zinc-900 relative overflow-hidden flex flex-col justify-between ${
                  isUnderDev ? "border-amber-250 bg-amber-50/10 hover:shadow-amber-50" : "border-zinc-200"
                }`}
              >
                {isUnderDev && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white font-mono text-[8px] uppercase tracking-wider px-3 py-1 rounded-bl-xl font-black animate-pulse">
                    DEVELOPMENT CONTEXT AVAILABLE
                  </div>
                )}
                
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full ${
                      isUnderDev 
                        ? "bg-amber-100 text-amber-800 border border-amber-200" 
                        : "bg-zinc-100 text-zinc-800 border border-zinc-200"
                    }`}>
                      {isUnderDev ? "Pre-Release Active" : "Repository Release"}
                    </span>
                  </div>

                  <h4 className="text-base font-black tracking-tight text-zinc-900 leading-snug">
                    {project.title}
                  </h4>

                  <p className="text-zinc-600 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-5 flex items-center gap-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isUnderDev
                        ? "bg-zinc-900 text-white hover:bg-zinc-800"
                        : "bg-zinc-100 text-zinc-805 hover:bg-zinc-200 border border-zinc-200"
                    }`}
                  >
                    {isUnderDev ? "Deploy & Test Amigo Sandbox" : "Inspect Codebase"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
