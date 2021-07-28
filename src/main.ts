import "flex-splitter-directive";
import "./style.css";
import "flex-splitter-directive/styles.min.css";

const editor = document.querySelector<HTMLDivElement>('#editor')!;
const preview = document.querySelector<HTMLDivElement>('#preview')!;
const editorUrl = 'http://3.144.14.133:8080';
const previewUrl = 'http://3.144.14.133:1234';
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
      let res = await fetch(previewUrl, {mode: 'no-cors'});
      if (res.type == "opaque") {
        addressBar.innerText = previewUrl;
        previewFrame = createIframe(previewUrl);
        preview.appendChild(previewFrame);
      }
    } catch (err) {}
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function main() {
  editorFrame = createIframe(editorUrl);
  editor.appendChild(editorFrame);
  document.querySelector("#reload")?.addEventListener('click', reloadPreviewFrame);
  
  checkPreviewAvailability();
}
window.addEventListener('load', main)
