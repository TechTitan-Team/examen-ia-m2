import { useState } from "react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  ListBullets,
  ListNumbers,
  ListChecks,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  HighlighterCircle,
  Quotes,
  Code,
  ArrowCounterClockwise,
  ArrowClockwise,
  TextIndent,
  TextOutdent,
  TextAa,
  Minus,
  Plus,
  CaretDown,
  LineSegment,
  Eraser,
  TextSuperscript,
  TextSubscript,
} from "@phosphor-icons/react";

export default function Toolbar({ editor }) {
  const [fontSize, setFontSize] = useState(11);
  const [currentFont, setCurrentFont] = useState("Arial");
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);
  const [showTextColorDropdown, setShowTextColorDropdown] = useState(false);
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false);
  const [showLineSpacingDropdown, setShowLineSpacingDropdown] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState("#000000");
  const [currentHighlightColor, setCurrentHighlightColor] = useState("#FFFF00");

  if (!editor) return null;

  const fonts = [
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Comic Sans MS",
    "Trebuchet MS",
    "Impact",
    "Palatino Linotype",
    "Lucida Console",
  ];

  const styles = [
    {
      label: "Normal",
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      label: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Heading 4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      label: "Heading 5",
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    {
      label: "Heading 6",
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    },
  ];

  const textColors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#B7B7B7",
    "#CCCCCC",
    "#D9D9D9",
    "#EFEFEF",
    "#F3F3F3",
    "#FFFFFF",
    "#980000",
    "#FF0000",
    "#FF9900",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#4A86E8",
    "#0000FF",
    "#9900FF",
    "#FF00FF",
    "#E6B8AF",
    "#F4CCCC",
    "#FCE5CD",
    "#FFF2CC",
    "#D9EAD3",
    "#D0E0E3",
    "#C9DAF8",
    "#CFE2F3",
    "#D9D2E9",
    "#EAD1DC",
  ];

  const highlightColors = [
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#FF00FF",
    "#FF0000",
    "#0000FF",
    "#FFF2CC",
    "#D9EAD3",
    "#D0E0E3",
    "#CFE2F3",
    "#D9D2E9",
    "#EAD1DC",
  ];

  const lineSpacings = [
    { label: "Single", value: 1 },
    { label: "1.15", value: 1.15 },
    { label: "1.5", value: 1.5 },
    { label: "Double", value: 2 },
  ];

  const getCurrentStyle = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    if (editor.isActive("heading", { level: 4 })) return "Heading 4";
    if (editor.isActive("heading", { level: 5 })) return "Heading 5";
    if (editor.isActive("heading", { level: 6 })) return "Heading 6";
    return "Normal";
  };

  const closeAllDropdowns = () => {
    setShowStyleDropdown(false);
    setShowFontDropdown(false);
    setShowAlignDropdown(false);
    setShowTextColorDropdown(false);
    setShowHighlightDropdown(false);
    setShowLineSpacingDropdown(false);
  };

  const getCurrentAlignment = () => {
    if (editor.isActive({ textAlign: "center" }))
      return <TextAlignCenter size={16} weight="bold" />;
    if (editor.isActive({ textAlign: "right" }))
      return <TextAlignRight size={16} weight="bold" />;
    if (editor.isActive({ textAlign: "justify" }))
      return <TextAlignJustify size={16} weight="bold" />;
    return <TextAlignLeft size={16} weight="bold" />;
  };

  const ToolButton = ({ onClick, isActive, children, title, disabled }) => (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded-md transition-all ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  const Dropdown = ({
    label,
    width,
    children,
    isOpen,
    onToggle,
    maxHeight,
  }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        onMouseDown={(e) => e.preventDefault()}
        className="flex items-center gap-1 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-all"
      >
        <span className="truncate" style={{ width }}>
          {label}
        </span>
        <CaretDown size={12} weight="bold" />
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[120px] overflow-y-auto"
          style={{ maxHeight: maxHeight || "auto" }}
        >
          {children}
        </div>
      )}
    </div>
  );

  const ColorPicker = ({ colors, onSelect, currentColor, isOpen, onClose }) =>
    isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3 min-w-[280px]">
        <div className="grid grid-cols-10 gap-1.5">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                onSelect(color);
                onClose();
              }}
              onMouseDown={(e) => e.preventDefault()}
              className={`w-6 h-6 rounded border ${
                currentColor === color
                  ? "ring-2 ring-indigo-500"
                  : "border-slate-200"
              } hover:scale-110 transition-transform`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    );

  const Divider = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

  const handleFontSizeChange = (delta) => {
    if (!editor || !editor.view) return;
    const newSize = Math.max(8, Math.min(72, fontSize + delta));
    setFontSize(newSize);
    editor.chain().focus().setFontSize(`${newSize}px`).run();
  };

  const applyFontSize = (size) => {
    if (!editor || !editor.view) return;
    const newSize = Math.max(8, Math.min(72, size));
    setFontSize(newSize);
    editor.chain().focus().setFontSize(`${newSize}px`).run();
  };

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">

      <Dropdown
        label={getCurrentStyle()}
        width="60px"
        isOpen={showStyleDropdown}
        maxHeight="250px"
        onToggle={() => {
          closeAllDropdowns();
          setShowStyleDropdown(!showStyleDropdown);
        }}
      >
        {styles.map((style) => (
          <button
            key={style.label}
            onClick={() => {
              style.action();
              setShowStyleDropdown(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
          >
            {style.label}
          </button>
        ))}
      </Dropdown>

      <Divider />

      {/* Font Dropdown */}
      <Dropdown
        label={currentFont}
        width="60px"
        isOpen={showFontDropdown}
        maxHeight="250px"
        onToggle={() => {
          closeAllDropdowns();
          setShowFontDropdown(!showFontDropdown);
        }}
      >
        {fonts.map((font) => (
          <button
            key={font}
            onClick={() => {
              editor.chain().focus().setFontFamily(font).run();
              setCurrentFont(font);
              setShowFontDropdown(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </Dropdown>

      <Divider />

      {/* Font Size */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => handleFontSizeChange(-1)}
          title="Decrease font size"
        >
          <Minus size={14} weight="bold" />
        </ToolButton>
        <input
          type="text"
          value={fontSize}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value) setFontSize(value);
          }}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (value) applyFontSize(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = Number(e.target.value);
              if (value) applyFontSize(value);
              e.target.blur();
            }
          }}
          className="w-8 text-center text-sm border border-slate-200 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <ToolButton
          onClick={() => handleFontSizeChange(1)}
          title="Increase font size"
        >
          <Plus size={14} weight="bold" />
        </ToolButton>
      </div>

      <Divider />

      {/* Text Style */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <TextB size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <TextItalic size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <TextUnderline size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <TextStrikethrough size={16} weight="bold" />
      </ToolButton>

      {/* Text Color */}
      <div className="relative">
        <button
          onClick={() => {
            closeAllDropdowns();
            setShowTextColorDropdown(!showTextColorDropdown);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="p-1.5 rounded-md transition-all text-slate-500 hover:bg-slate-100 hover:text-slate-700 flex flex-col items-center"
          title="Text color"
        >
          <TextAa size={16} weight="bold" />
          <div
            className="w-4 h-1 rounded-sm mt-0.5"
            style={{ backgroundColor: currentTextColor }}
          />
        </button>
        <ColorPicker
          colors={textColors}
          currentColor={currentTextColor}
          isOpen={showTextColorDropdown}
          onSelect={(color) => {
            setCurrentTextColor(color);
            editor.chain().focus().setColor(color).run();
          }}
          onClose={() => setShowTextColorDropdown(false)}
        />
      </div>

      {/* Highlight */}
      <div className="relative">
        <button
          onClick={() => {
            closeAllDropdowns();
            setShowHighlightDropdown(!showHighlightDropdown);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`p-1.5 rounded-md transition-all flex flex-col items-center ${
            editor.isActive("highlight")
              ? "bg-indigo-100 text-indigo-600"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          }`}
          title="Highlight color"
        >
          <HighlighterCircle size={16} weight="bold" />
          <div
            className="w-4 h-1 rounded-sm mt-0.5"
            style={{ backgroundColor: currentHighlightColor }}
          />
        </button>
        {showHighlightDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3 min-w-[200px]">
            <div className="grid grid-cols-6 gap-1.5">
              {highlightColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setCurrentHighlightColor(color);
                    editor.chain().focus().toggleHighlight({ color }).run();
                    setShowHighlightDropdown(false);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`w-6 h-6 rounded border ${
                    currentHighlightColor === color
                      ? "ring-2 ring-indigo-500"
                      : "border-slate-200"
                  } hover:scale-110 transition-transform`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button
              onClick={() => {
                editor.chain().focus().unsetHighlight().run();
                setShowHighlightDropdown(false);
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="w-full mt-2 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
            >
              Remove highlight
            </button>
          </div>
        )}
      </div>

      {/* Superscript */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        isActive={editor.isActive("superscript")}
        title="Superscript"
      >
        <TextSuperscript size={16} weight="bold" />
      </ToolButton>

      {/* Subscript */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        isActive={editor.isActive("subscript")}
        title="Subscript"
      >
        <TextSubscript size={16} weight="bold" />
      </ToolButton>

      <Divider />

      {/* Alignment Dropdown */}
      <Dropdown
        label={getCurrentAlignment()}
        width="auto"
        isOpen={showAlignDropdown}
        onToggle={() => {
          closeAllDropdowns();
          setShowAlignDropdown(!showAlignDropdown);
        }}
      >
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("left").run();
            setShowAlignDropdown(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-100 first:rounded-t-lg ${
            editor.isActive({ textAlign: "left" })
              ? "bg-indigo-50 text-indigo-600"
              : ""
          }`}
        >
          <TextAlignLeft size={16} /> Left
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("center").run();
            setShowAlignDropdown(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-100 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-indigo-50 text-indigo-600"
              : ""
          }`}
        >
          <TextAlignCenter size={16} /> Center
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("right").run();
            setShowAlignDropdown(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-100 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-indigo-50 text-indigo-600"
              : ""
          }`}
        >
          <TextAlignRight size={16} /> Right
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("justify").run();
            setShowAlignDropdown(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-100 last:rounded-b-lg ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-indigo-50 text-indigo-600"
              : ""
          }`}
        >
          <TextAlignJustify size={16} /> Justify
        </button>
      </Dropdown>

      <Divider />

      {/* Lists */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive("taskList")}
        title="Checklist"
      >
        <ListChecks size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <ListBullets size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListNumbers size={16} weight="bold" />
      </ToolButton>

      <Divider />

      {/* Extras */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quotes size={16} weight="bold" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <Code size={16} weight="bold" />
      </ToolButton>

      <Divider />

      {/* Clear Formatting */}
      <ToolButton
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        title="Clear formatting"
      >
        <Eraser size={16} weight="bold" />
      </ToolButton>
    </div>
  );
}
