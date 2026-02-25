"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconSend } from "@tabler/icons-react";
import Lottie from "lottie-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Tiovaldo's AI Assistant (Beta Version). Feel free to ask about skills, projects, experience.",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [robotAnimation, setRobotAnimation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  // Load Lottie JSON
  useEffect(() => {
    fetch("/lottie/robot-wave.json")
      .then((res) => res.json())
      .then((data) => setRobotAnimation(data));
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typing]);

  // ===== TYPEWRITER EFFECT =====
  const typeWriter = (text: string) => {
    let index = 0;
    let current = "";

    setTyping(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const interval = setInterval(() => {
      current += text[index];
      index++;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: current,
        };
        return updated;
      });

      if (index >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 25); // kecepatan ngetik
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || typing) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      const replyText = data.reply || "No response from AI.";

      // delay sebelum AI mulai ngetik
      setTimeout(() => {
        typeWriter(replyText);
        setLoading(false);
      }, 700);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Failed to get AI response. Try again later.",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING ROBOT BUTTON */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="fixed bottom-6 right-6 z-[9999] p-0 rounded-full flex items-center justify-center overflow-hidden bg-transparent
                   w-16 h-16 sm:w-20 sm:h-20"
      >
        {open ? (
          <IconX
            size={28}
            className="text-black dark:text-white sm:text-[36px]"
          />
        ) : (
          robotAnimation && (
            <Lottie
              animationData={robotAnimation}
              loop
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                pointerEvents: "none",
              }}
            />
          )
        )}
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-4 z-[9999] w-[90vw] max-w-xs h-[380px] sm:right-6 sm:max-w-xs sm:h-[380px] bg-white dark:bg-[#0C1424] border border-cyan-400/30 rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-4 py-3 bg-cyan-400 text-black font-semibold">
              AI Assistant
            </div>

            {/* MESSAGES */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 space-y-3 overflow-y-auto text-sm"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-cyan-400 text-black"
                        : "bg-gray-200 dark:bg-[#050B16] dark:text-cyan-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 dark:text-gray-400 text-xs"
                >
                  🤖 AI is typing...
                </motion.div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-3 border-t border-cyan-400/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#050B16] border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-cyan-400 text-black px-3 py-2 rounded-lg hover:bg-cyan-500 transition"
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
