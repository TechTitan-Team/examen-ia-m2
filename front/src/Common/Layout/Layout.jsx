import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatSidebar from "@/Common/ChatSidebar/ChatSidebar";
import LeftSidebar from "@/Common/LeftSidebar/LeftSidebar";
import Toolbar from "@/Common/Navbar/Toolbar";
import useHttps from "../../hooks/useHttps";

export default function Layout() {
  const { http, iaHttp } = useHttps();
  const [editor, setEditor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [zoom, setZoom] = useState(100); // Zoom percentage (100 = 100%)
  const [chatContext, setChatContext] = useState(null); // Last selected text
  const [selectedText, setSelectedText] = useState(null); // Current text selection with corrections

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
      // Initialize selected text immediately with loading state
      setSelectedText({
        text: selection.text,
        from: selection.from,
        to: selection.to,
        corrections: [],
        incorrectWords: [],
        isLoadingCorrections: true,
        isLoadingAnalysis: true,
        analysisData: null
      });
      
      // Open sidebar if not already open
      if (!isChatOpen) {
        setIsChatOpen(true);
      }

      // Fetch correction suggestions
      try {
        const res = await http.post("/corrector", {
          text: selection.text
        });
        
        setSelectedText(prev => ({
          ...prev,
          corrections: res.data.corrections || [],
          incorrectWords: res.data.incorrect_words || [],
          isLoadingCorrections: false
        }));
      } catch (err) {
        console.error("Error fetching corrections:", err);
        setSelectedText(prev => ({
          ...prev,
          corrections: [],
          incorrectWords: [],
          isLoadingCorrections: false
        }));
      }

      // Fetch NER analysis in parallel
      try {
        const analysisRes = await iaHttp.post("/analyze", {
          context: selection.text,
          num_words: 10
        });
        
        setSelectedText(prev => ({
          ...prev,
          analysisData: analysisRes.data,
          isLoadingAnalysis: false
        }));
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setSelectedText(prev => ({
          ...prev,
          analysisData: null,
          isLoadingAnalysis: false
        }));
      }
    } else {
      setSelectedText(null);
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
    
    // Clear selection after a short delay to allow the replacement to complete
    setTimeout(() => {
      setSelectedText(null);
    }, 100);
  };

  const handleReplaceFullText = (newText) => {
    if (!editor || !selectedText) return;
    
    const { from, to } = selectedText;
    
    // Replace the entire selection with the new text
    editor.chain()
      .focus()
      .setTextSelection({ from, to })
      .deleteSelection()
      .insertContent(newText)
      .run();
    
    // Clear selection after a short delay to allow the replacement to complete
    setTimeout(() => {
      setSelectedText(null);
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
        onReplaceText={handleReplaceText}
        onReplaceFullText={handleReplaceFullText}
        onClearSelection={() => {
          setSelectedText(null);
        }}
      />
    </div>
  );
}
