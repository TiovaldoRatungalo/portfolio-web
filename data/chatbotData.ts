export const chatbotData = [
  // --- Sapaan & Identitas ---
  {
    patterns: ["halo", "hai", "hello", "hi", "hey"],
    responses: {
      id: ["Halo! 👋", "Hai, ada yang bisa saya bantu? 😊"],
      en: ["Hello! 👋", "Hi, how can I help you? 😊"],
    },
  },
  {
    patterns: ["siapa kamu", "who are you", "kamu siapa"],
    responses: {
      id: ["Saya asisten virtualnya Tiovaldo 🤖"],
      en: ["I am Tiovaldo’s virtual assistant 🤖"],
    },
  },
  {
    patterns: ["siapa yang buat kamu", "who created you", "who made you"],
    responses: {
      id: ["Saya dibuat oleh Tiovaldo 👨‍💻"],
      en: ["I was created by Tiovaldo 👨‍💻"],
    },
  },
  {
    patterns: ["apakah kamu lagi kerja", "are you working", "sedang kerja"],
    responses: {
      id: ["Ya, saya sedang bekerja untuk membantu kamu ✨"],
      en: ["Yes, I’m working to assist you ✨"],
    },
  },

  // --- Portfolio: Tentang Tiovaldo ---
  {
    patterns: [
      "tentang kamu",
      "about you",
      "who is tiovaldo",
      "tiovaldo itu siapa",
      "ceritakan tentang tiovaldo",
    ],
    responses: {
      id: [
        "Tiovaldo adalah profesional di pemrograman, web, AI, dan keamanan siber. Fresh graduate dari Universitas Klabat 2024 🎓",
      ],
      en: [
        "Tiovaldo is a professional with expertise in programming, web, AI, and cybersecurity. Fresh graduate from Universitas Klabat 2024 🎓",
      ],
    },
  },

  // --- Skills / Keahlian ---
  {
    patterns: ["skill", "keahlian", "skills", "tools", "alat"],
    responses: {
      id: [
        "Keahlian utama Tiovaldo: Python, JavaScript, HTML, CSS, C++, React.js, Vue.js, Cyber Security, Machine Learning, Deep Learning, NLP, MySQL, MongoDB ⚡",
      ],
      en: [
        "Tiovaldo’s main skills: Python, JavaScript, HTML, CSS, C++, React.js, Vue.js, Cyber Security, Machine Learning, Deep Learning, NLP, MySQL, MongoDB ⚡",
      ],
    },
  },

  // --- Tools / Software ---
  {
    patterns: ["tools", "software", "perangkat lunak", "aplikasi"],
    responses: {
      id: [
        "Tiovaldo sering menggunakan: VSCode, PyCharm, Git/GitHub, Postman, Figma, TensorFlow, Keras, OpenCV, Flask, React.js, Vue.js 🛠️",
      ],
      en: [
        "Tiovaldo often uses: VSCode, PyCharm, Git/GitHub, Postman, Figma, TensorFlow, Keras, OpenCV, Flask, React.js, Vue.js 🛠️",
      ],
    },
  },

  // --- Proyek / Projects ---
  {
    patterns: ["proyek", "project", "portfolio", "work", "hasil kerja"],
    responses: {
      id: [
        "Beberapa proyek Tiovaldo: 1) AI Virtual Assistant RS Manembo-nembo Bitung 🏥, 2) Dataset Fruits Fresh & Rotten 🍎, 3) Web Portfolio Front-End 🚀",
      ],
      en: [
        "Some of Tiovaldo’s projects: 1) AI Virtual Assistant for Manembo-nembo Hospital 🏥, 2) Fruits Fresh & Rotten Dataset 🍎, 3) Front-End Portfolio Website 🚀",
      ],
    },
  },

  // --- Pendidikan / Education ---
  {
    patterns: ["pendidikan", "education", "kuliah", "study"],
    responses: {
      id: [
        "Pendidikan: Universitas Klabat 🎓, Sarjana Komputer (2024). Skripsi: 'Pengembangan AI Virtual Assistant di RS Manembo-nembo Bitung'.",
      ],
      en: [
        "Education: Universitas Klabat 🎓, Bachelor of Computer Science (2024). Thesis: 'Development of AI Virtual Assistant at Manembo-nembo Hospital'.",
      ],
    },
  },

  // --- Sertifikasi / Certifications ---
  {
    patterns: ["sertifikasi", "certification", "certifications"],
    responses: {
      id: ["Sertifikasi: • Keamanan Siber • Pemrograman (relevan)"],
      en: ["Certifications: • Cyber Security • Programming (relevant)"],
    },
  },

  // --- Kontak / Contact ---
  {
    patterns: ["kontak", "contact", "email", "phone", "linkedin", "github"],
    responses: {
      id: [
        "Kontak Tiovaldo: 📧 tiovaldo@example.com 🔗 GitHub: https://github.com/your-github 🔗 LinkedIn: https://linkedin.com/in/your-linkedin",
      ],
      en: [
        "Contact Tiovaldo: 📧 tiovaldo@example.com 🔗 GitHub: https://github.com/your-github 🔗 LinkedIn: https://linkedin.com/in/your-linkedin",
      ],
    },
  },

  // --- Hobi / Interests ---
  {
    patterns: ["hobi", "interest", "hobbies", "aktivitas"],
    responses: {
      id: [
        "Hobi Tiovaldo termasuk membaca buku, coding, dan eksplorasi AI 📚💻",
      ],
      en: ["Tiovaldo’s hobbies include reading, coding, and exploring AI 📚💻"],
    },
  },

  // --- Pengalaman Kerja / Internship ---
  {
    patterns: ["pengalaman kerja", "internship", "work experience"],
    responses: {
      id: [
        "Tiovaldo memiliki pengalaman mengembangkan proyek AI dan web baik untuk tugas kuliah maupun freelance/portofolio 💼",
      ],
      en: [
        "Tiovaldo has experience developing AI and web projects for both university assignments and freelance/portfolio 💼",
      ],
    },
  },

  // --- Bahasa / Language Preference ---
  {
    patterns: ["bahasa", "language", "english", "indonesia"],
    responses: {
      id: ["Bahasa yang digunakan: Indonesia (Fluent), English (Advanced) 🌐"],
      en: ["Languages: Indonesian (Fluent), English (Advanced) 🌐"],
    },
  },

  // --- Lain-lain seputar portfolio ---
  {
    patterns: ["apa yang bisa kamu lakukan", "what can you do", "capabilities"],
    responses: {
      id: [
        "Saya bisa menjawab pertanyaan seputar portfolio Tiovaldo, skill, proyek, pendidikan, sertifikasi, kontak, hobi, dan pengalaman kerja.",
      ],
      en: [
        "I can answer questions about Tiovaldo’s portfolio, skills, projects, education, certifications, contact, hobbies, and work experience.",
      ],
    },
  },
];
