export default async function handler(req) {
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { message } = JSON.parse(req.body);

    if (!message || message.length > 300) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "Pertanyaan terlalu panjang." }),
      };
    }

    const prompt = `
Kamu adalah AI Portfolio Assistant milik Tiovaldo.
Jawab hanya berdasarkan data berikut:

Nama: Tiovaldo
Pendidikan: S1 Ilmu Komputer, Universitas Klabat (2024)
Skill:
- Web Development (Next.js, React, Tailwind)
- AI & Machine Learning
- Python
- Cyber Security dasar

Project:
- AI Virtual Assistant Rumah Sakit
- Dataset Fruits Fresh & Rotten Classification

Aturan:
- Jangan mengarang
- Jawaban profesional & singkat
- Bahasa Indonesia

Pertanyaan:
${message}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI sedang tidak tersedia.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Terjadi kesalahan pada AI." }),
    };
  }
}
