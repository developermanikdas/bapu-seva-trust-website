'use client';

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, Heart } from "lucide-react";

const FAQ_SUGGESTIONS = [
  "How can I donate to Bapu Seva Trust?",
  "Where are your programs located?",
  "How do I apply as a volunteer?",
  "What is the Senior & Child Bridges program?",
];

const KNOWLEDGE_BASE = [
  {
    keywords: ["donate", "donation", "money", "fund", "tax"],
    reply: "Thank you for your generosity! You can donate directly via our Donate page or contact us for bank transfer details. All donations support education, health camps, and women's empowerment across Bihar, Navi Mumbai, and Delhi.",
  },
  {
    keywords: ["where", "location", "bihar", "mumbai", "navi mumbai", "delhi", "city", "operate"],
    reply: "Bapu Seva Trust operates across rural & urban centers in Bihar, Navi Mumbai, and Delhi. We run learning centers, free health camps, and women's empowerment workshops in these regions.",
  },
  {
    keywords: ["volunteer", "join", "intern", "help", "work"],
    reply: "We welcome passionate volunteers! You can teach children, organize health checkups, mentor students, or assist in social media & tech. Visit our 'Get Involved' page to sign up!",
  },
  {
    keywords: ["senior", "child", "bridges", "elder"],
    reply: "Senior & Child Bridges is our intergenerational initiative connecting isolated elders with young children for storytelling, mentorship, and emotional wellbeing.",
  },
  {
    keywords: ["women", "empowerment", "skill"],
    reply: "We offer vocational skill workshops, financial literacy programs, and self-reliance guidance for women in underserved communities across Bihar, Navi Mumbai & Delhi.",
  },
];

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! 🙏 I am the Bapu Seva Trust AI Assistant. How can I help you today regarding our programs in Bihar, Navi Mumbai & Delhi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add User Message
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Generate AI Reply
    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = KNOWLEDGE_BASE.find((k) =>
        k.keywords.some((kw) => lower.includes(kw))
      );

      const botReply = match
        ? match.reply
        : "Thank you for asking! Bapu Seva Trust is dedicated to building a progressive & uplifted society. For detailed inquiries, please visit our Contact page or email us at info@bapuseva.org.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="AI Assistant Chat"
          className="relative group bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border-2 border-primary-foreground/20"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 animate-pulse" />
              <span className="hidden md:inline font-medium text-xs pr-1">Ask AI Assistant</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-display text-base text-primary-foreground font-semibold flex items-center gap-1.5">
                  BST AI Assistant
                </h3>
                <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online · Instant Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
                      : "bg-card text-foreground border border-border/80 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-muted-foreground italic">
                <Bot className="w-4 h-4 text-primary animate-spin" />
                <span>AI is typing response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length < 4 && (
            <div className="px-3 py-2 bg-card border-t border-border/50 flex gap-1.5 overflow-x-auto no-scrollbar">
              {FAQ_SUGGESTIONS.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(faq)}
                  className="whitespace-nowrap text-[11px] bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-full transition-colors shrink-0"
                >
                  {faq}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-card border-t border-border flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about programs, donation, locations..."
              className="flex-1 bg-muted text-foreground text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
