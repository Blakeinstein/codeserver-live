import "flex-splitter-directive";
import "./style.css";
import "flex-splitter-directive/styles.min.css";

const editor = document.querySelector<HTMLDivElement>('#editor')!
const preview = document.querySelector<HTMLDivElement>('#preview')!
const editorUrl = 'http://3.144.14.133:8080';
const previewUrl = 'http://3.144.14.133:1234';

function createIframe(src: string): HTMLIFrameElement {
  let frame = document.createElement('iframe') as HTMLIFrameElement;
  frame.setAttribute('src', src);
  frame.setAttribute('allow', "clipboard-read; clipboard-write");
  return frame;
}

async function checkPreviewAvailability(): Promise<Boolean> {
  try {
    let res = await fetch(previewUrl, {mode: 'no-cors'});
    if (res.type == "opaque") {
      return true;
    }
  } catch (err) {}
  return false
}

function main() {
  let editorFrame = createIframe(editorUrl);
  editor.appendChild(editorFrame);

  
  let interval = window.setInterval(async () => {
    if (await checkPreviewAvailability()) {
      let previewFrame = createIframe(previewUrl);
      preview.appendChild(previewFrame);
      window.clearInterval(interval);
    }
  }, 1000)
}
window.addEventListener('load', main)
