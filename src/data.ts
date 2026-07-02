import { ResumeData } from "./types";

export const resumeData: ResumeData = {
  name: "MANVENDRA SINGH",
  title: "Aspiring Software Engineer",
  contact: {
    email: "manvendrasingh231105@gmail.com",
    phone: "+91 8755445952",
    linkedin: "https://www.linkedin.com/in/manvendra-singh-605aa3308/",
    github: "https://github.com/manvendrasingh231105-dot",
    leetcode: "https://leetcode.com/u/manvendra05_/",
    geeksforgeeks: "https://www.geeksforgeeks.org/user/manvendrasingh231105/",
    portfolio: "#",
  },
  summary: "Disciplined and innovative software enthusiast with a strong command of Java, Python, and OOP. Experienced in developing computer vision systems and full-stack applications, with a focus on real-time data processing and ML integration. Proven ability to translate complex logic into efficient, scalable solutions through dedicated project work and competitive programming.",
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "Python", "C", "SQL", "JavaScript"]
    },
    {
      category: "Web Technologies",
      items: ["HTML", "CSS"]
    },
    {
      category: "Core Competencies",
      items: ["Prompt Engineering", "OOPS", "Data Structures & Algorithms", "Logic Building"]
    }
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "G.L. Bajaj Institute of Technology & Management, Greater Noida",
      period: "Expected 2028",
      score: "GPA: 8.6 / 10"
    },
    {
      degree: "Higher Secondary Certificate (Class XII)",
      institution: "Delhi Public School, Bulandshahr",
      period: "2024",
      score: "93%"
    },
    {
      degree: "Secondary School Certificate (Class X)",
      institution: "Delhi Public School, Bulandshahr",
      period: "2022",
      score: "98%"
    }
  ],
  experience: [
    {
      title: "Java Programming Virtual Intern",
      company: "CodSoft",
      period: "02/2026 - 03/2026",
      bullets: [
        "Developed high-performance Java applications focusing on memory management, garbage collection analysis, and OOP principles.",
        "Collaborated on backend modules to optimize data processing speeds, custom algorithm execution, and modular logic implementation.",
        "Created comprehensive documentation and object-oriented UML diagrams for 4 distinct software architectures."
      ]
    },
    {
      title: "Open Source Contributor & Core Member",
      company: "G.L. Bajaj Tech Club & Open Source Community",
      period: "09/2024 - Present",
      bullets: [
        "Coached junior university peers in algorithmic design, object-oriented concepts, and Git version control systems.",
        "Maintained public repository code bases with structural test suites using Python and shell automation scripts.",
        "Coordinated technical hackathons and competitive programming workshops, accumulating 300+ attendee sign-ups."
      ]
    }
  ],
  projects: [
    {
      title: "Crop Weed Detection Model",
      description: "Engineered an automated Deep Learning & Computer Vision system using custom CNN topologies in PyTorch to distinguish and classify crops from invasive weeds. Achieved 94.6% classification accuracy, outputting segmented bounding coordinate arrays to facilitate high-precision spot spraying.",
      link: "https://github.com/manvendrasingh231105-dot/crop-weed-detection-model"
    },
    {
      title: "Amigo [Under Development]",
      description: "Building an immersive collaborative tool integrating context-aware real-time chat nodes, AI agent workflows, and unified collaborative workspaces. Actively deployed in continuous integration for user experience testing.",
      link: "https://amigo-2vl3y1v6q-manvendrasingh231105-4649s-projects.vercel.app/"
    },
    {
      title: "Face-Recognition Attendance System",
      description: "Architected a real-time tracking app using Flask and OpenCV with a NumPy data pipeline for automated CSV attendance logging.",
      link: "https://github.com/manvendrasingh231105-dot/face_recognition_system"
    },
    {
      title: "Library Management System",
      description: "Developed a robust and secure multi-user library management console in Java using JDBC and state-persistence layers to automate tracking, reservation, and circulation of books.",
      link: "https://github.com/manvendrasingh231105-dot/Library-management-system"
    }
  ],
  certificates: [
    {
      name: "Google AI Essentials",
      link: "https://www.coursera.org/account/accomplishments/specialization/H3UPM1LG0Y3O?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=s12n",
      issuer: "Coursera / Google",
      bullets: ["Maximize Productivity With AI Tools", "Discover the Art of Prompting", "Use AI Responsibly", "Stay Ahead of AI Curve"]
    },
    {
      name: "Introduction to Modern AI",
      link: "https://drive.google.com/file/d/1tfENq6VIZCZt3izfP4KjOFs49Pq96l1a/view",
      issuer: "Cisco Networking Academy",
      bullets: ["Explored foundations of generative algorithms", "Discussed security and fairness standards in predictive networks"]
    },
    {
      name: "Data Analytics Essentials",
      link: "https://drive.google.com/file/d/1yKrkSVgSyoxugmTcoMOTLqnmdzOkIfrs/view",
      issuer: "Cisco Networking Academy",
      bullets: ["Structured data collection pipelines", "Applied summary metrics to derive key trends"]
    },
    {
      name: "AWS Academy Graduate - Machine Learning Foundations",
      link: "https://www.credly.com/badges/140716f9-f608-4501-a273-b98dc7713ab2/public_url",
      issuer: "AWS Academy",
      bullets: ["Managed predictive pipelines", "Learned custom feature engineering on AWS Cloud"]
    },
    {
      name: "AWS Academy Graduate - Cloud Foundations",
      link: "https://www.credly.com/badges/65150c39-0683-40d1-91fc-c72ea0795c52/public_url",
      issuer: "AWS Academy",
      bullets: ["Architected cloud resources", "Learned virtual compute clusters and permission configurations"]
    }
  ],
  interests: [
    "Generative AI & LLM Fine-Tuning",
    "Algorithmic Problem Solving (250+ solved on LeetCode/GFG)",
    "Computer Vision & Pattern Recognition",
    "Database Normalization & Query Tuning",
    "Machine Learning Pipelines"
  ],
  hobbies: [
    "Acoustic & Classical Music Curation",
    "Competitive Programming Practice",
    "Annotating Machine Learning Papers",
    "Tinkering with Raspberry Pi & IoT Sensors"
  ],
  languages: [
    { name: "English", level: 5 },
    { name: "Hindi", level: 5 },
    { name: "German", level: 3 }
  ]
};
