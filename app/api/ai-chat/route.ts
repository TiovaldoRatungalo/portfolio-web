import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ReplyLanguage = "id" | "en";

type KnowledgeItem = {
  keywords?: string[];
  answer?: string;
  answer_id?: string;
  answer_en?: string;
};

/* ===============================
   LOAD KNOWLEDGE FROM FILE
================================ */
function loadKnowledgeBase(): KnowledgeItem[] {
  try {
    const filePath = path.join(process.cwd(), "data/knowledge.json");
    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("Failed to load knowledge base:", err);
    return [];
  }
}

const knowledgeBase = loadKnowledgeBase();
console.log("Loaded KB items:", knowledgeBase.length);

function detectLanguage(message: string): ReplyLanguage {
  const lower = message.toLowerCase();
  const padded = ` ${lower} `;

  const indonesianHints = [
    " apa ",
    " siapa ",
    " dimana ",
    " bagaimana ",
    " kenapa ",
    "kamu",
    "saya",
    "yang",
    "dan",
    "tidak",
    "terima kasih",
    "tolong",
  ];

  const englishHints = [
    " what ",
    " who ",
    " where ",
    " when ",
    " why ",
    " how ",
    " you ",
    " i ",
    " is ",
    " are ",
    " can ",
    " please",
    "thanks",
    "thank you",
  ];

  const idScore = indonesianHints.filter((hint) => padded.includes(hint)).length;
  const enScore = englishHints.filter((hint) => padded.includes(hint)).length;

  return enScore > idScore ? "en" : "id";
}

/* ===============================
   GREETING DETECTOR
================================ */
function detectGreeting(message: string) {
  const greetings = [
    "halo",
    "hai",
    "hi",
    "hello",
    "pagi",
    "siang",
    "sore",
    "malam",
  ];

  return greetings.some((g) => message.includes(g));
}

/* ===============================
   SMALL TALK RESPONSES
================================ */
function smallTalk(message: string, language: ReplyLanguage) {
  if (message.includes("apa kabar") || message.includes("how are you")) {
    return language === "en"
      ? "I'm doing well. Thanks for asking."
      : "Saya baik. Terima kasih sudah bertanya.";
  }

  if (message.includes("siapa kamu") || message.includes("who are you")) {
    return language === "en"
      ? "I am Tiovaldo's AI assistant. I can help explain his skills, projects, and experience."
      : "Saya adalah AI Assistant milik Tiovaldo. Saya siap membantu menjelaskan skill, project, dan pengalaman.";
  }

  if (
    message.includes("terima kasih") ||
    message.includes("thank you") ||
    message.includes("thanks")
  ) {
    return language === "en"
      ? "You're welcome. Glad to help."
      : "Sama-sama. Senang bisa membantu.";
  }

  return null;
}

function pickAnswer(item: KnowledgeItem, language: ReplyLanguage): string {
  if (language === "en") {
    return item.answer_en || item.answer || item.answer_id || "";
  }

  return item.answer_id || item.answer || item.answer_en || "";
}

/* ===============================
   BOT LOGIC
================================ */
function getBotReply(message: string) {
  const lower = message.toLowerCase().trim();
  const language = detectLanguage(lower);

  if (detectGreeting(lower)) {
    const greetReplies =
      language === "en"
        ? [
            "Hello! What would you like to know about Tiovaldo?",
            "Hi! Nice to meet you.",
            "Hello! I'm ready to help answer your questions.",
          ]
        : [
            "Halo! Ada yang ingin kamu ketahui tentang Tiovaldo?",
            "Hai! Senang bertemu denganmu.",
            "Hello! Saya siap membantu menjawab pertanyaanmu.",
          ];

    return greetReplies[Math.floor(Math.random() * greetReplies.length)];
  }

  const talk = smallTalk(lower, language);
  if (talk) return talk;

  const match = knowledgeBase.find((item) =>
    item.keywords?.some((key) => lower.includes(key.toLowerCase())),
  );

  if (match) {
    const baseAnswer = pickAnswer(match, language);
    const variations =
      language === "en"
        ? [
            baseAnswer,
            `${baseAnswer}`,
            `${baseAnswer}\n\nDo you want to ask anything else?`,
          ]
        : [
            baseAnswer,
            `${baseAnswer}`,
            `${baseAnswer}\n\nAda yang ingin ditanyakan lagi?`,
          ];

    return variations[Math.floor(Math.random() * variations.length)];
  }

  const fallback =
    language === "en"
      ? [
          "I don't have information about that yet.",
          "That topic is not available in my data yet.",
          "Try asking about skills, projects, or experience.",
          "Sorry, I couldn't find the answer. You can ask another question.",
        ]
      : [
          "Hmm, saya belum punya info tentang itu.",
          "Topik itu belum tersedia di data saya.",
          "Coba tanyakan tentang skill, project, atau pengalaman.",
          "Maaf, saya belum menemukan jawabannya. Kamu bisa tanyakan hal lain.",
        ];

  return fallback[Math.floor(Math.random() * fallback.length)];
}

/* ===============================
   DELAY (biar terasa AI mengetik)
================================ */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ===============================
   API ROUTE
================================ */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { reply: "Pesan tidak boleh kosong." },
        { status: 400 },
      );
    }

    await delay(700 + Math.random() * 800);
    const reply = getBotReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      { reply: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
