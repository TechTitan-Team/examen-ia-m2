import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Common/Navbar/Navbar";
import ChatSidebar from "@/Common/ChatSidebar/ChatSidebar";

export default function Layout() {
  const [editor, setEditor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <Navbar editor={editor} onOpenChat={() => setIsChatOpen(true)} />
      <div className="flex-1 flex overflow-hidden">
        <Outlet context={{ onEditorReady: setEditor }} />
        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}
