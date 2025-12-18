import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { SpellChecker } from "./SpellChecker";

export default function Editor({ onEditorReady, zoom = 100, onTextSelection }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-indigo-600 underline cursor-pointer hover:text-indigo-800",
        },
      }),
      Placeholder.configure({
        placeholder: "Manomboka manoratra ny antontan-taratasinao...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SpellChecker.configure({
        dictionaryUrl: "/teny_malagasy_clean.json",
        useJson: true,
      }),
    ],
    content: `
      <h1>Tongasoa eto amin'ny Voambolan-AI</h1>
    `,
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-slate max-w-none focus:outline-none min-h-full",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (!editor || !onTextSelection) return;

    const handleSelectionUpdate = () => {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, " ");
      
      if (selectedText.trim()) {
        onTextSelection({
          text: selectedText.trim(),
          from,
          to,
        });
      } else {
        onTextSelection(null);
      }
    };

    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("blur", () => {
      setTimeout(() => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, " ");
        if (!selectedText.trim()) {
          onTextSelection(null);
        }
      }, 100);
    });

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, onTextSelection]);

  const scale = zoom / 100;
  const editorWidth = 896 * scale;
  const editorMinHeight = `calc((100vh - 180px) * ${scale})`;

  return (
    <div className="flex-1 bg-slate-100 overflow-auto">
      <div
        className="mx-auto py-8 px-4 transition-all duration-200"
        style={{ width: editorWidth + 32 }}
      >
        <div
          className="bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200"
          style={{
            width: editorWidth,
            minHeight: editorMinHeight,
          }}
        >
          <div className="p-8 md:p-12">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
