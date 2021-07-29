import "flex-splitter-directive";
import "./style.css";
import "flex-splitter-directive/styles.min.css";
import "axios";
import axios from "axios";

const editor = document.querySelector<HTMLDivElement>('#editor')!;
const preview = document.querySelector<HTMLDivElement>('#preview')!;
const editorUrl = import.meta.env.VITE_EDITOR_URL as string;
const previewUrl: string = import.meta.env.VITE_PREVIEW_URL as string;
const addressBar = document.querySelector<HTMLDivElement>('#addressBar')!;
let previewFrame: HTMLIFrameElement | null = null;
let editorFrame: HTMLIFrameElement | null = null;

function reloadPreviewFrame() {
  if (previewFrame) {
    previewFrame.src = previewFrame.src;
  }
}

function createIframe(src: string): HTMLIFrameElement {
  let frame = document.createElement('iframe') as HTMLIFrameElement;
  frame.setAttribute('src', src);
  frame.setAttribute('allow', "clipboard-read; clipboard-write");
  return frame;
}

async function checkPreviewAvailability() {
  while(previewFrame == null){
    try {
      await axios.get(previewUrl);
    } catch (err) {
      // lol hacks go brrr
      if (err.response && err.response.status < 405) {
        addressBar.innerText = previewUrl;
        previewFrame = createIframe(previewUrl);
        preview.appendChild(previewFrame);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}

function main() {
  editorFrame = createIframe(editorUrl);
  editor.appendChild(editorFrame);
  document.querySelector("#reload")?.addEventListener('click', reloadPreviewFrame);
  
  checkPreviewAvailability();
}
window.addEventListener('load', main)
