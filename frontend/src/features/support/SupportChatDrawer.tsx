import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Headset, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '../../app/store/hooks';

interface Message {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  timestamp: string;
}

interface SupportChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const SupportChatDrawer: React.FC<SupportChatDrawerProps> = ({ isOpen, onClose, onToggle }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello ${user ? user.firstName : 'there'}! Welcome to CommerceHub Support. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    'Where is my order?',
    'What is your return policy?',
    'How do I apply a coupon?',
    'Talk to a live agent',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate automated AI bot or agent response
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "I'm here to help! You can check your order tracking directly under 'My Orders & History' in your profile.";

      const lower = text.toLowerCase();
      if (lower.includes('return') || lower.includes('refund')) {
        botReply = 'CommerceHub offers a hassle-free 30-day return policy. Simply initiate a return request from your Order Details page.';
      } else if (lower.includes('coupon') || lower.includes('promo') || lower.includes('discount')) {
        botReply = 'You can enter promo codes like WELCOME10 or SAVE20 on the Checkout page under the "Apply Coupon" section.';
      } else if (lower.includes('order') || lower.includes('track') || lower.includes('where')) {
        botReply = 'Orders are processed within 24 hours. You can view real-time interactive tracking maps for all active dispatches in your account orders page.';
      } else if (lower.includes('agent') || lower.includes('human') || lower.includes('talk')) {
        botReply = 'Connecting you with a senior CommerceHub support specialist...';
        setIsAgentConnected(true);
      } else if (isAgentConnected) {
        botReply = `Thanks for reaching out! Agent Sarah is inspecting your request and will assist you further.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b_${Date.now()}`,
          sender: isAgentConnected ? 'agent' : 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-brand text-brand-foreground rounded-full shadow-2xl hover:scale-105 hover:bg-brand-hover transition-all cursor-pointer flex items-center gap-2 group border border-white/20"
          title="Open Customer Support Chat"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline-block text-xs font-bold pr-1">Support</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-status-success rounded-full border-2 border-surface animate-pulse" />
        </button>
      )}

      {/* Support Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[520px] bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Drawer Header */}
          <div className="p-4 bg-surface-hover/80 border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand text-brand-foreground shadow-xs">
                {isAgentConnected ? <Headset className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-content-primary flex items-center gap-1.5">
                  <span>{isAgentConnected ? 'Live Support Agent' : 'CommerceHub AI Assistant'}</span>
                  <span className="w-2 h-2 rounded-full bg-status-success" />
                </h3>
                <p className="text-[10px] text-content-muted">Average response time: &lt;1 min</p>
              </div>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg text-content-muted hover:text-content-primary">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender !== 'user' && (
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                    {m.sender === 'agent' ? <Headset className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-brand text-brand-foreground rounded-br-xs font-medium'
                      : 'bg-surface-hover border border-border/80 text-content-primary rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <p
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-brand-foreground/70' : 'text-content-muted'
                    }`}
                  >
                    {m.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-content-muted text-[11px] animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Typing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-border/60 bg-surface-hover/30 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="flex-shrink-0 px-2.5 py-1 bg-surface border border-border/80 rounded-full text-[10px] font-semibold text-content-secondary hover:border-brand/40 hover:text-brand transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-surface border-t border-border/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about orders, products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-surface-hover/70 border border-border rounded-xl text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-brand text-brand-foreground rounded-xl hover:bg-brand-hover transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
