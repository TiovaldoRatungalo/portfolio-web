"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconSend } from "@tabler/icons-react";
import Lottie from "lottie-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChat({ enabled = true }: { enabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Tiovaldo's AI Assistant (Beta Version). Ask about skills, projects, or experience.",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [robotAnimation, setRobotAnimation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  if (!enabled) return null;

  // load lottie
  useEffect(() => {
    fetch("/lottie/robot-wave.json")
      .then((res) => res.json())
      .then(setRobotAnimation);
  }, []);

  // auto scroll
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // typewriter effect
  const typeWriter = (text: string) => {
    let i = 0;
    let current = "";

    setTyping(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const interval = setInterval(() => {
      current += text[i];
      i++;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = current;
        return updated;
      });

      if (i >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 25);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || typing) return;

    const userMsg = input;
    setMessages((p) => [...p, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      setTimeout(() => {
        typeWriter(data.reply || "No response.");
        setLoading(false);
      }, 700);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "⚠️ Failed to connect." },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden"
      >
        {open ? (
          <IconX size={32} className="text-black dark:text-white" />
        ) : (
          robotAnimation && <Lottie animationData={robotAnimation} loop />
        )}
      </motion.button>

      {/* BLUR BACKGROUND */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-lg bg-black/40 z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 z-[9999] w-[90vw] max-w-xs h-[380px] bg-white dark:bg-[#0C1424] border border-cyan-400/30 rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 bg-cyan-400 text-black font-semibold">
              AI Assistant
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 p-4 space-y-3 overflow-y-auto text-sm"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[80%] ${
                      m.role === "user"
                        ? "bg-cyan-400 text-black"
                        : "bg-gray-200 dark:bg-[#050B16] dark:text-cyan-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="text-xs text-gray-400">🤖 AI is typing...</div>
              )}
            </div>

            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#050B16] border"
              />
              <button
                onClick={sendMessage}
                className="bg-cyan-400 px-3 py-2 rounded-lg"
              >
                <IconSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
