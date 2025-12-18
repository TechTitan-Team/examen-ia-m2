import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatSidebar from "@/Common/ChatSidebar/ChatSidebar";
import LeftSidebar from "@/Common/LeftSidebar/LeftSidebar";
import Toolbar from "@/Common/Navbar/Toolbar";
import useHttps from "../../hooks/useHttps";

export default function Layout() {
  const { http } = useHttps();
  const [editor, setEditor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [zoom, setZoom] = useState(100); // Zoom percentage (100 = 100%)
  const [chatContext, setChatContext] = useState(null); // Last selected text
  const [selectedText, setSelectedText] = useState(null); // Current text selection
  const [suggestions, setSuggestions] = useState(null); // Correction suggestions

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

  const handleTextSelection = async (selection) => {
    if (selection && selection.text) {
      setSelectedText(selection);
      // Fetch correction suggestions
      try {
        const res = await http.post("/corrector", {
          text: selection.text
        });
        setSuggestions(res.data);
        // Open sidebar if not already open
        if (!isChatOpen) {
          setIsChatOpen(true);
        }
      } catch (err) {
        console.error("Error fetching corrections:", err);
        setSuggestions(null);
      }
    } else {
      setSelectedText(null);
      setSuggestions(null);
    }
  };

  const handleReplaceText = (wordToReplace, replacementWord) => {
    if (!editor || !selectedText) return;
    
    const { from, to, text } = selectedText;
    
    // Replace the specific word in the selected text
    const updatedText = text.replace(
      new RegExp(`\\b${wordToReplace}\\b`, 'gi'),
      replacementWord
    );
    
    // Replace the entire selection with the updated text
    editor.chain()
      .focus()
      .setTextSelection({ from, to })
      .deleteSelection()
      .insertContent(updatedText)
      .run();
    
    // Clear selection and suggestions after a short delay to allow the replacement to complete
    setTimeout(() => {
      setSelectedText(null);
      setSuggestions(null);
    }, 100);
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
        <Outlet context={{ onEditorReady: setEditor, zoom, onAddToChat: handleAddToChat, onTextSelection: handleTextSelection }} />
      </div>
      <ChatSidebar 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        chatContext={chatContext}
        onClearContext={() => setChatContext(null)}
        selectedText={selectedText}
        suggestions={suggestions}
        onReplaceText={handleReplaceText}
        onClearSelection={() => {
          setSelectedText(null);
          setSuggestions(null);
        }}
      />
    </div>
  );
}
