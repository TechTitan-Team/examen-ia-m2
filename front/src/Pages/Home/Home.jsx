import { useOutletContext } from "react-router-dom";
import Editor from "@/Common/Editor/Editor";

export default function Home() {
  const { onEditorReady, zoom, onAddToChat } = useOutletContext();

  return <Editor onEditorReady={onEditorReady} zoom={zoom} onAddToChat={onAddToChat} />;
}
