import { useState } from "react";
import { X, RefreshCw, Sparkles, Send, BookOpen, Lightbulb, Globe, ArrowLeft, BookPlus } from "lucide-react";
import useHttps from "../../hooks/useHttps";

export default function ChatSidebar({
  isOpen,
  onClose,
  chatContext = null,
  onClearContext,
  selectedText = null,
  onReplaceText,
  onClearSelection,
  onReplaceFullText,
}) {
  const { http, iaHttp } = useHttps()
  const [message, setMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [translationDirection, setTranslationDirection] = useState(null);
  const [messages, setMessages] = useState([]);

  const quickActions = [
    { id: "ohabolana", icon: BookOpen, label: "Hijery ohabolana" },
    { id: "hazavaina", icon: Lightbulb, label: "Hanazava teny" },
    // { id: "handika", icon: Globe, label: "Handika teny" },
    { id: "baiboly", icon: BookPlus, label: "Hanohy teny avy ao amin'ny Baiboly" },
    { id: "tsipelina", icon: BookPlus, label: "Hanitsy tsipelina" },
  ];

  const getPlaceholder = () => {
    if (!selectedAction) return "";

    switch (selectedAction) {
      case "ohabolana":
        return "Ohabolana momban'ny inona?";
      case "hazavaina":
        return "Inona ny teny tianao hazavaina?";
      // case "handika":
      //   return translationDirection
      //     ? "Hampidiro ny teny tianao hadika"
      //     : "";
      case "baiboly":
        return "Hanohy teny avy any anaty Baiboly?";
      case "tsipelina":
        return "Inona ny teny tianao ahitsy?";
      default:
        return "";
    }
  };

  const handleActionSelect = (actionId) => {
    setSelectedAction(actionId);
    setTranslationDirection(null);
    setMessage("");
  };

  const handleBack = () => {
    setSelectedAction(null);
    setTranslationDirection(null);
    setMessages([]);
  };

  const handleClear = () => {
    setMessages([]);
    handleBack();
    onClearContext?.();
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    let fullMessage = message;
    if (selectedAction === "handika" && translationDirection) {
      fullMessage = `[${translationDirection}] ${message}`;
    }


    setMessages([...messages, {
      role: "user",
      content: fullMessage,
      action: selectedAction
    }]);
    setMessage("");
    if (selectedAction === "hazavaina") {
      try {
        const res = await http.get(`/features/getExplain/${fullMessage.toLowerCase()}`)
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data },
        ]);
      } catch (err) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Tsy mazava ny fangatahano, mba avereno ampidirina azafady." },
          ]);
        }, 500);
      }
    } else if (selectedAction === "ohabolana") {
      try {
        const res = await http.get(`/features/getOhabolana/${fullMessage.toLowerCase()}`)
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data },
        ]);
      } catch (err) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Tsy mazava ny fangatahano, mba avereno ampidirina azafady." },
          ]);
        }, 500);
      }
    } else if (selectedAction === "baiboly") {
      try {
        const res = await iaHttp.post("/analyze", {
          context: fullMessage,
          num_words: 20
        })
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data.autocompletion.full_text },
        ]);
      } catch (err) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Tsy mazava ny fangatahano, mba avereno ampidirina azafady." },
          ]);
        }, 500);
      }
    } else if (selectedAction === "tsipelina") {
      try {
        const res = await http.post("/corrector", {
          text: fullMessage
        })
        const message = res.data.corrections
  .map(correction =>
    `- Teny diso: ${correction.word} => ${correction.correction
      .map(v => v.word)
      .join(', ')}<br/>`
  )
  .join('');
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant", content: res.data.corrections.length !== 0 ? message : "Tsy misy tsipelina diso"
          },
        ]);
      } catch (err) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Tsy mazava ny fangatahano, mba avereno ampidirina azafady." },
          ]);
        }, 500);
      }
    }

  };

  const showInput = selectedAction && (selectedAction !== "handika" || translationDirection);
  const showSuggestions = selectedText && selectedText.corrections && selectedText.corrections.length > 0;
  const showChat = !showSuggestions;

  if (!isOpen) return null;

  return (
    <aside className="w-[500px] bg-white border-l border-slate-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h2 className="font-semibold text-slate-800">Voambolana.AI</h2>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <>
              <button
                onClick={handleClear}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              >
                <RefreshCw size={16} />
              </button>
              <span className="text-sm text-slate-500">Hanadio</span>
            </>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 ml-2"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {showSuggestions ? (
          <div className="space-y-4">
            {/* Selected Text Display */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
              <p className="text-xs font-medium text-indigo-600 mb-2">Teny voafidy:</p>
              <p className="text-sm text-slate-700 font-medium">{selectedText.text}</p>
            </div>

            {/* Suggestions List */}
            {selectedText.isLoadingCorrections ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin text-indigo-600" />
                  <p className="text-sm text-slate-600">Mikaroka tsipelina diso...</p>
                </div>
              </div>
            ) : selectedText.corrections && selectedText.corrections.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Soso-kevitra fanitsiana:</h3>
                {selectedText.corrections.map((correction, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">
                      Teny diso: <span className="text-red-600">{correction.word}</span>
                    </h4>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-500 mb-2">Soso-kevitra:</p>
                      <div className="flex flex-wrap gap-2">
                        {correction.correction && correction.correction.length > 0 ? (
                          correction.correction.map((suggestion, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => {
                                onReplaceText?.(correction.word, suggestion.word);
                              }}
                              className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 hover:border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-all shadow-sm hover:shadow-md"
                            >
                              {suggestion.word}
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">Tsy misy soso-kevitra</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-green-700">Tsy misy tsipelina diso</p>
              </div>
            )}

            {/* NER Analysis Section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              {selectedText.isLoadingAnalysis ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw size={16} className="animate-spin text-purple-600" />
                    <p className="text-sm text-slate-600">Manampy famakafakana...</p>
                  </div>
                </div>
              ) : selectedText.analysisData ? (
                <div className="space-y-4">
                  {/* Autocompletion Section */}
                  {selectedText.analysisData.autocompletion && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <Sparkles size={16} />
                        Famenoana mandeha ho azy:
                      </h3>
                      <div 
                        className="bg-white rounded-lg p-3 border border-purple-100 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all group"
                        onClick={() => {
                          if (onReplaceFullText) {
                            onReplaceFullText(selectedText.analysisData.autocompletion.full_text);
                          }
                        }}
                      >
                        <p className="text-sm text-slate-700 leading-relaxed group-hover:text-purple-700 transition-colors">
                          {selectedText.analysisData.autocompletion.full_text}
                        </p>
                        <p className="text-xs text-purple-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          ← Tsindrio mba hanova ny soratra
                        </p>
                      </div>
                      {selectedText.analysisData.autocompletion.completion && (
                        <p className="text-xs text-purple-600 mt-2 italic">
                          Teny nampiana: "{selectedText.analysisData.autocompletion.completion}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* NER Entities Section */}
                  {selectedText.analysisData.entities?.in_full_text?.entities?.length > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <BookOpen size={16} />
                        Singa hita ({selectedText.analysisData.entities.in_full_text.count}):
                      </h3>
                      <div className="space-y-2">
                        {selectedText.analysisData.entities.in_full_text.entities.map((entity, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white rounded-lg p-3 border border-emerald-100 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all group"
                            onClick={() => {
                              if (onReplaceText) {
                                onReplaceText(selectedText.text, entity.entity || entity.text);
                              }
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-700">
                                  <span className="text-emerald-700 font-semibold group-hover:text-emerald-800">{entity.text}</span>
                                  <span className="text-xs text-emerald-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    → {entity.entity || entity.text}
                                  </span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {entity.type}
                                  </span>
                                </div>
                                {entity.metadata && Object.keys(entity.metadata).length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {Object.entries(entity.metadata).map(([key, value]) => (
                                      <p key={key} className="text-xs text-slate-600">
                                        <span className="font-medium capitalize">{key}:</span> {value}
                                      </p>
                                    ))}
                                  </div>
                                )}
                                <p className="text-xs text-emerald-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  ← Tsindrio mba hanova ny soratra
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedText.analysisData.summary && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700">
                        <span className="font-semibold">Famintinana:</span> {selectedText.analysisData.summary.total_entities_found} singa hita, 
                        {selectedText.analysisData.summary.total_words_generated} teny novokarina
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                onClearSelection?.();
              }}
              className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
            >
              Hiverina amin'ny chat
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Mascot */}
            <div className="w-32 h-32 mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-lg">
              <div className="text-6xl animate-bounce">🤖​</div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Inona ny tianao atao?
            </h3>

            {/* Quick actions - Always visible */}
            <div className="w-full max-w-md space-y-3 mb-6">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionSelect(action.id)}
                  className={`w-full flex items-center gap-4 p-4 text-left text-base font-medium rounded-xl transition-all group shadow-sm ${selectedAction === action.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-[1.02] shadow-lg"
                    : "bg-white text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 border-2 border-slate-200 hover:border-indigo-300"
                    }`}
                >
                  <action.icon
                    size={24}
                    className={`shrink-0 group-hover:scale-110 transition-transform ${selectedAction === action.id ? "" : "text-indigo-500"
                      }`}
                  />
                  <span className="flex-1">{action.label}</span>
                  {selectedAction === action.id && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Translation direction selection */}
            {selectedAction === "handika" && !translationDirection && (
              <div className="w-full max-w-md space-y-3 animate-fadeIn">
                <p className="text-base font-semibold text-slate-700 mb-4 text-center">
                  Havadika:
                </p>
                <button
                  onClick={() => setTranslationDirection("Anglisy")}
                  className="w-full flex items-center justify-center gap-3 p-4 text-base font-medium bg-white text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl">🇬🇧</span>
                  <span>Anglisy</span>
                </button>
                <button
                  onClick={() => setTranslationDirection("Frantsay")}
                  className="w-full flex items-center justify-center gap-3 p-4 text-base font-medium bg-white text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl">🇫🇷</span>
                  <span>Frantsay</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md shadow-md"
                    : "bg-slate-100 text-slate-700 rounded-bl-md"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Context - Only show when not showing suggestions */}
      {chatContext && showChat && (
        <div className="px-4 pb-2">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm text-slate-700 relative">
            <p className="text-xs font-medium text-indigo-600 mb-1">Soratra voafidy:</p>
            <p className="truncate pr-6">{chatContext}</p>
            <button
              onClick={onClearContext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-indigo-100 rounded transition-colors text-slate-500 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Input - Only show when action is selected and ready, and not showing suggestions */}
      {showInput && showChat && (
        <div className="p-4 border-t border-slate-200 animate-slideUp">
          {/* Back button and label */}
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Hiverina
            </button>
            {selectedAction === "handika" && translationDirection && (
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {translationDirection}
              </span>
            )}
          </div>

          {/* Label */}
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            {getPlaceholder()}
          </label>

          {/* Input field */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Soraty eto..."
              rows={3}
              className="w-full px-4 py-3 pr-12 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none"
              autoFocus
            />
            <div className="absolute right-2 bottom-2">
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="p-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Enter handefa • Shift+Enter andalana vaovao</span>
          </div>
        </div>
      )}
    </aside>
  );
}