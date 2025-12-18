import { useState } from "react";

export default function ChatPanel({ attachments = [], onRemoveAttachment }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const quickActions = [
    { icon: "✨", label: "Find and fix typos" },
    { icon: "📚", label: "Add evidence from the web" },
    { icon: "🖼️", label: "Move images to the left" },
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm here to help! What would you like me to do with your document?" },
      ]);
    }, 500);
  };

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800">Agent</span>
        </div>
        <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Clear
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Mascot */}
            <div className="w-32 h-32 mb-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <div className="text-6xl">🐱</div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Ready to help!
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              What would you like to do?
            </p>

            {/* Quick actions */}
            <div className="w-full space-y-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 p-3 text-left text-sm text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-indigo-500 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-700 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="group relative bg-slate-50 border border-slate-200 rounded-lg p-3 pr-8"
              >
                <div className="flex items-start gap-2">
                  <div className="shrink-0 w-5 h-5 rounded bg-indigo-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Zm-1-2V4H5v16h14ZM8 7h8v2H8V7Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 mb-1">Selected text</p>
                    <p className="text-sm text-slate-700 line-clamp-2">{attachment.text}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveAttachment?.(attachment.id)}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove attachment"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything..."
              rows={3}
              className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none min-h-[76px]"
            />
            <button className="absolute right-2 top-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className="self-end p-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}

