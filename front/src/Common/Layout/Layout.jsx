import { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatSidebar from "@/Common/ChatSidebar/ChatSidebar";
import LeftSidebar from "@/Common/LeftSidebar/LeftSidebar";
import Toolbar from "@/Common/Navbar/Toolbar";

export default function Layout() {
  const [editor, setEditor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [zoom, setZoom] = useState(100); // Zoom percentage (100 = 100%)
  const [chatContext, setChatContext] = useState(null); // Last selected text

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200)); // Max 200%
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50)); // Min 50%
  };

  const handleAddToChat = (selectedText) => {
    if (selectedText && selectedText.trim()) {
      // Open chat sidebar if not already open
      if (!isChatOpen) {
        setIsChatOpen(true);
      }
      // Set the last selected text as context
      setChatContext(selectedText.trim());
    }
  };

  return (
    <div className="h-screen flex bg-slate-100">
      <LeftSidebar
        editor={editor}
        onOpenChat={() => setIsChatOpen(true)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        zoom={zoom}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-center py-3 px-4">
          <Toolbar editor={editor} />
        </div>
        <Outlet context={{ onEditorReady: setEditor, zoom, onAddToChat: handleAddToChat }} />
      </div>
      <ChatSidebar 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        chatContext={chatContext}
        onClearContext={() => setChatContext(null)}
      />
    </div>
  );
}
