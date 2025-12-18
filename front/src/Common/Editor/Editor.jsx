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


export default function Editor({ onEditorReady }) {
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
          class: "text-indigo-600 underline cursor-pointer hover:text-indigo-800",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your document...",
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
    ],
    content: `
      <h1>Welcome to the Editor</h1>
      <p>This is a rich text editor powered by TipTap. Start typing to create your document.</p>
      <p></p>
      <h2>Features</h2>
      <ul>
        <li>Rich text formatting (bold, italic, underline)</li>
        <li>Multiple heading levels</li>
        <li>Text alignment options</li>
        <li>Bullet and numbered lists</li>
      </ul>
      <p></p>
      <p>Use the toolbar above to format your content, or use keyboard shortcuts like <strong>Ctrl+B</strong> for bold.</p>
    `,
    editorProps: {
      attributes: {
        class: "tiptap prose prose-slate max-w-none focus:outline-none min-h-full",
      },
    },
    immediatelyRender: false,
  });

  // Pass editor to parent when it's ready
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div className="flex-1 bg-slate-100 overflow-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-180px)]">
          <div className="p-8 md:p-12">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}

