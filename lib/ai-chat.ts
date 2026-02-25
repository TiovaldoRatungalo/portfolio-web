// lib/ai-chat.ts

export type AIMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function sendMessage(message: string): Promise<AIMessage> {
  try {
    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.reply) {
      return {
        role: "assistant",
        content: "AI sedang tidak tersedia, silakan hubungi via contact.",
      };
    }

    return {
      role: "assistant",
      content: data.reply,
    };
  } catch (error) {
    console.error("AI fetch failed:", error);

    return {
      role: "assistant",
      content: "AI sedang tidak tersedia, silakan hubungi via contact.",
    };
  }
}
