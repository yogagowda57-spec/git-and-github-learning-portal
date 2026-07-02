import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Lesson } from '../types';
import { MessageSquare, Send, Sparkles, User, BrainCircuit, AlertCircle } from 'lucide-react';

interface AITutorProps {
  currentLesson?: Lesson;
}

export default function AITutor({ currentLesson }: AITutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hi there! I'm **Turing**, your Git & GitHub Mentor. 🤖\n\nI can explain any command using fun analogies, walk you through concepts, or help you solve current challenge hints. Ask me anything about Git!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    setInput('');
    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: messages.slice(-10), // Send last 10 messages for conversational memory
          lessonContext: currentLesson
            ? `We are currently on the lesson "${currentLesson.title}" inside module "${currentLesson.moduleId}". The lesson goal is: ${currentLesson.description}.`
            : 'We are in open Git Sandbox mode exploring commands.'
        })
      });

      const data = await response.json();
      
      const coachMsg: ChatMessage = {
        sender: 'ai',
        text: data.text || "I'm having a small connection issue, but let's keep exploring Git!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, coachMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Oops, I had a hitch talking to my server. Make sure your local Express server is running and your network is active!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl h-[460px] overflow-hidden shadow-xl" id="ai-tutor">
      {/* Header */}
      <div className="bg-[#0d1117] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#1f6feb1a] rounded-lg text-[#58a6ff]">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white flex items-center gap-1 uppercase tracking-wider">
              <span>AI Coach Turing</span>
              <Sparkles className="w-3 h-3 text-[#e3b341] animate-pulse" />
            </div>
            <div className="text-[10px] text-[#8b949e] font-medium font-mono">Active Mentor</div>
          </div>
        </div>
        {currentLesson && (
          <span className="text-[9px] font-mono px-2 py-0.5 bg-[#161b22] text-[#8b949e] rounded-full border border-[#30363d]">
            Lesson Assistant
          </span>
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#30363d]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-[#1f6feb] text-white' : 'bg-[#21262d] text-[#58a6ff]'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
            </div>

            {/* Balloon */}
            <div className="flex flex-col gap-1">
              <div className={`p-3 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#1f6feb] text-white rounded-tr-none'
                  : 'bg-[#0d1117] text-[#c9d1d9] rounded-tl-none border border-[#30363d]'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-[#8b949e] font-mono self-end px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 mr-auto max-w-[80%]">
            <div className="w-7 h-7 rounded-full bg-[#21262d] text-[#58a6ff] flex items-center justify-center shrink-0 animate-spin">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-[#0d1117] p-3 rounded-xl rounded-tl-none text-xs text-[#8b949e] border border-[#30363d] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#58a6ff] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#58a6ff] rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-[#58a6ff] rounded-full animate-bounce delay-200"></span>
              <span className="font-mono text-[11px]">Turing is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="bg-[#0d1117] p-3 border-t border-[#30363d] flex gap-2">
        <input
          type="text"
          className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] placeholder-[#484f58] font-sans"
          placeholder="Ask Turing (e.g., 'Explain commit vs staging')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-2.5 bg-[#238636] hover:bg-[#2ea043] border border-[#30363d] rounded-lg text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
          disabled={loading}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
