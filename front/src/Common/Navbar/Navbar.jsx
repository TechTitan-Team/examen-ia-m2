import { Download, ChevronDown, Sparkles } from "lucide-react";
import Toolbar from "./Toolbar";

export default function Navbar({ editor, onOpenChat }) {
  return (
    <div className="bg-white border-b border-slate-200 shrink-0">
      {/* Single row with logo, toolbar, and actions */}
      <header className="h-14 flex items-center px-4">
        {/* Left - Logo */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-800 font-medium">Untitled</span>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>

        {/* Center - Toolbar */}
        <div className="flex-1 flex justify-center">
          <Toolbar editor={editor} />
        </div>

        {/* Right - Export Actions */}
        <div className="flex items-center gap-2 min-w-[180px] justify-end">
          <button
            onClick={onOpenChat}
            className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={16} />
            AI Agent
          </button>
          <button className="px-4 py-1.5 text-sm text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 hover:from-fuchsia-600 hover:via-purple-600 hover:to-indigo-600 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1.5 font-medium">
            <Download size={16} />
            Export
          </button>
        </div>
      </header>
    </div>
  );
}
