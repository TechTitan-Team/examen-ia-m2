import { useRef } from "react";
import { ZoomIn, ZoomOut, Printer, FileUp, Undo2, Redo2, Sparkles, Download } from "lucide-react";

export default function LeftSidebar({ editor, onOpenChat, onZoomIn, onZoomOut, zoom }) {
  const fileInputRef = useRef(null);

  // Import DOCX functionality
  const handleImportDocx = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      try {
        // Dynamic import for mammoth
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        if (editor) {
          editor.commands.setContent(result.value);
        }
      } catch (error) {
        console.error("Error importing DOCX:", error);
        alert("Error importing DOCX file. Please try again.");
      }
    } else {
      alert("Please select a valid .docx file");
    }

    // Reset input
    e.target.value = "";
  };

  // Print functionality - prints only editor content using hidden iframe
  const handlePrint = () => {
    if (!editor) return;

    const content = editor.getHTML();
    
    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.left = "-9999px";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Document</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              padding: 20mm;
              max-width: 210mm;
              margin: 0 auto;
            }
            h1 { font-size: 24pt; font-weight: bold; margin-bottom: 12pt; }
            h2 { font-size: 18pt; font-weight: bold; margin-top: 18pt; margin-bottom: 10pt; }
            h3 { font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 8pt; }
            h4, h5, h6 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; }
            p { margin-bottom: 10pt; }
            ul, ol { margin-left: 20pt; margin-bottom: 10pt; }
            li { margin-bottom: 4pt; }
            blockquote { border-left: 3pt solid #666; padding-left: 12pt; margin: 12pt 0; font-style: italic; }
            code { font-family: 'Courier New', monospace; background: #f5f5f5; padding: 2pt 4pt; font-size: 10pt; }
            pre { background: #f5f5f5; padding: 12pt; margin: 12pt 0; font-family: 'Courier New', monospace; font-size: 10pt; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            u { text-decoration: underline; }
            s { text-decoration: line-through; }
            sup { font-size: 8pt; vertical-align: super; }
            sub { font-size: 8pt; vertical-align: sub; }
            ul[data-type="taskList"] { list-style: none; margin-left: 0; }
            ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 8pt; }
            @media print {
              body { padding: 0; }
              h1, h2, h3 { page-break-after: avoid; }
              p, li { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    doc.close();

    // Wait for content to load then print
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      // Remove iframe after printing
      setTimeout(() => document.body.removeChild(iframe), 100);
    };
  };

  // Zoom functionality - now uses callbacks from Layout
  const handleZoomIn = () => {
    if (onZoomIn) onZoomIn();
  };

  const handleZoomOut = () => {
    if (onZoomOut) onZoomOut();
  };

  // Undo/Redo functionality
  const handleUndo = () => {
    if (editor) {
      editor.commands.undo();
    }
  };

  const handleRedo = () => {
    if (editor) {
      editor.commands.redo();
    }
  };

  const tools = [
    { icon: FileUp, label: "Import DOCX", action: handleImportDocx },
    { icon: Printer, label: "Print", action: handlePrint },
    { icon: ZoomIn, label: `Zoom In (${zoom}%)`, action: handleZoomIn },
    { icon: ZoomOut, label: `Zoom Out (${zoom}%)`, action: handleZoomOut },
    { icon: Undo2, label: "Undo", action: handleUndo },
    { icon: Redo2, label: "Redo", action: handleRedo },
  ];

  return (
    <div className="flex flex-col items-center h-full py-4 pl-3">
      {/* Logo */}
      <div className="px-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      </div>

      {/* Tools - Centered */}
      <aside className="bg-white rounded-2xl shadow-lg border border-slate-200/60 py-3 px-2 flex flex-col gap-1 my-auto">
        {tools.map((tool, idx) => (
          <button
            key={idx}
            onClick={tool.action}
            title={tool.label}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group relative"
          >
            <tool.icon size={20} strokeWidth={1.8} />
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
              {tool.label}
            </span>
          </button>
        ))}

        {/* Hidden file input for DOCX import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="hidden"
        />
      </aside>

      {/* Bottom Actions: AI Agent & Export */}
      <div className="mt-4 px-1 flex flex-col gap-2">
        <button
          onClick={onOpenChat}
          title="AI Agent"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group relative"
        >
          <Sparkles size={22} strokeWidth={1.8} />
          <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
            AI Agent
          </span>
        </button>
        <button
          title="Export"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-white hover:from-fuchsia-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group relative"
        >
          <Download size={22} strokeWidth={1.8} />
          <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
            Export
          </span>
        </button>
      </div>
    </div>
  );
}
