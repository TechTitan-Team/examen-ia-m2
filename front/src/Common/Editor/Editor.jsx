import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  HighlighterCircle,
  Link as LinkIcon,
  Code,
  ChatCircleText,
  CheckCircle,
} from "@phosphor-icons/react";
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

export default function Editor({ onEditorReady, onAddToChat, zoom = 100 }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionTitle, setSuggestionTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState({ from: 0, to: 0 });
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

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
      <h1>Tongasoa eto amin'ny mpandika</h1>
      <p>Ity dia mpandika lahatsoratra be endrika izay miaraka amin'ny TipTap. Manomboka manoratra mba hamoronana ny antontan-taratasinao.</p>
      <p></p>
      <h2>Toetra</h2>
      <ul>
        <li>Fanamboarana lahatsoratra be endrika (matavy, miolakolaka, misy tsipika eo ambaniny)</li>
        <li>Ampahany lohateny maro</li>
        <li>Safidy fametrahana lahatsoratra</li>
        <li>Lisitra misy teboka sy misy isa</li>
      </ul>
      <p></p>
      <p>Ampiasao ny fitaovana eo ambony mba hanamboarana ny votoatinao, na ampiasao ny fitendry haingana toy ny <strong>Ctrl+B</strong> ho an'ny matavy.</p>
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

  const handleCorrection = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    if (!editor) return;
    const { from, to } = selectedRange;
    editor
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .deleteSelection()
      .insertContent(suggestion)
      .run();
    setShowSuggestions(false);
    setSelectedRange({ from: 0, to: 0 });
  };

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
            {editor && (
              <BubbleMenu
                editor={editor}
                shouldShow={({ from, to }) => from !== to}
                tippyOptions={{ duration: 100 }}
                className="flex items-center gap-1 bg-white text-slate-700 rounded-lg shadow-lg px-2 py-1.5 border border-slate-200"
              >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("bold")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Matavy (Ctrl+B)"
                >
                  <TextB size={16} weight="bold" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("italic")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Miolakolaka (Ctrl+I)"
                >
                  <TextItalic size={16} weight="bold" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("underline")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Misy tsipika eo ambaniny (Ctrl+U)"
                >
                  <TextUnderline size={16} weight="bold" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("strike")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Misy tsipika mamaky"
                >
                  <TextStrikethrough size={16} weight="bold" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("highlight")
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }`}
                  title="Mamantatra"
                >
                  <HighlighterCircle size={16} weight="bold" />
                </button>
                <button
                  onClick={() => {
                    const previousUrl = editor.getAttributes("link").href;
                    const url = window.prompt("Rohy", previousUrl);
                    if (url === null) return;
                    if (url === "") {
                      editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .unsetLink()
                        .run();
                      return;
                    }
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange("link")
                      .setLink({ href: url })
                      .run();
                  }}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("link")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Ampio rohy"
                >
                  <LinkIcon size={16} weight="bold" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                    editor.isActive("code")
                      ? "bg-slate-100 text-indigo-600"
                      : ""
                  }`}
                  title="Kaody anaty lahatsoratra"
                >
                  <Code size={16} weight="bold" />
                </button>
                <>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button
                    onClick={handleCorrection}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition-colors text-sm font-medium"
                    title="Fanovana AI"
                  >
                    <CheckCircle size={16} weight="bold" />
                    Fanovana AI
                  </button>
                </>
              </BubbleMenu>
            )}
            {showSuggestions && (
              <BubbleMenu
                editor={editor}
                tippyOptions={{
                  duration: 100,
                  placement: "bottom",
                }}
                className="bg-white text-slate-700 rounded-lg shadow-lg border border-slate-200 p-3 min-w-[200px] z-50"
              >
                {loadingSuggestions ? (
                  <div className="py-4 text-center text-sm text-slate-500">
                    Mampiditra tolo-kevitra...
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-slate-800 mb-2">
                      {suggestionTitle}
                    </h3>
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestionGroup, index) => (
                        <div key={index}>
                          <div className="text-xs font-medium text-slate-500 mb-1">
                            {suggestionGroup.title}
                          </div>
                          <div className="space-y-1">
                            {suggestionGroup.values.map((value, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(value)}
                                className="w-full text-left px-3 py-2 rounded hover:bg-indigo-50 text-sm text-slate-700 hover:text-indigo-600 transition-colors"
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-2 text-sm text-slate-500">
                        Tsy misy tolo-kevitra azo
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setShowSuggestions(false);
                        setLoadingSuggestions(false);
                      }}
                      className="w-full mt-2 px-3 py-2 rounded hover:bg-slate-100 text-sm text-slate-500 transition-colors"
                    >
                      Ajanona
                    </button>
                  </div>
                )}
              </BubbleMenu>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
