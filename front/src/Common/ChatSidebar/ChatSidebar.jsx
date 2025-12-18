import { useState } from "react";
import {
  X,
  RefreshCw,
  Sparkles,
  Plus,
  Send,
  HelpCircle,
} from "lucide-react";

export default function ChatSidebar({ isOpen, onClose }) {
  const [message, setMessage] = useState("");

  const quickActions = [
    { icon: Sparkles, label: "Find and fix typos" },
    { icon: Sparkles, label: "Add evidence from the web with citations" },
    { icon: Sparkles, label: "Move all accent images to the left" },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-[500px] bg-white border-l border-slate-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Agent</h2>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <RefreshCw size={16} />
          </button>
          <span className="text-sm text-slate-500">Clear</span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 ml-2"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Agent Avatar & Greeting */}
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-32 h-32 mb-4">
            <div className="w-full h-full bg-gradient-to-br from-amber-400 via-orange-500 to-blue-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Cat illustration placeholder */}
              <div className="text-6xl">🐱</div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-xs">☕</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Hello! Coffee kicked in yet?
          </h3>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 mt-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <action.icon size={16} className="shrink-0" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">
            59%
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me to edit, create, or style anything"
            className="w-full px-4 py-3 pr-20 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
              <Plus size={18} />
            </button>
            <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
              <Sparkles size={18} />
            </button>
            <button className="p-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-white">
              <Send size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <HelpCircle size={14} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Sparkles size={14} />
            Quick edits
          </button>
        </div>
      </div>
    </aside>
  );
}

