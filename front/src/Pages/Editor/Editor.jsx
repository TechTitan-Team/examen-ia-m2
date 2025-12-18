import { useState } from "react";
import Navbar from "@/Common/Navbar/Navbar";
import EditorComponent from "@/Common/Editor/Editor";
import ChatPanel from "@/Common/ChatPanel/ChatPanel";

export default function EditorPage() {
  const [editor, setEditor] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const handleExport = () => {
    if (!editor) return;
    const html = editor.getHTML();
    console.log("Exporting document:", html);
    // TODO: Implement actual export logic
    alert("Export functionality coming soon!");
  };

  const handleAddToChat = (selectedText) => {
    if (selectedText.trim()) {
      setAttachments((prev) => [
        ...prev,
        { id: Date.now(), text: selectedText, type: "selection" },
      ]);
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar editor={editor} onExport={handleExport} />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <EditorComponent onEditorReady={setEditor} onAddToChat={handleAddToChat} />
          </div>
        </div>

        {/* Right chat panel */}
        <ChatPanel 
          attachments={attachments} 
          onRemoveAttachment={handleRemoveAttachment} 
        />
      </div>
    </div>
  );
}

