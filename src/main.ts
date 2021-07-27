import "flex-splitter-directive";
import "./style.css";
import "flex-splitter-directive/styles.min.css";

const editor = document.querySelector<HTMLDivElement>('#editor')!
const preview = document.querySelector<HTMLDivElement>('#preview')!
const editorUrl = 'https://codepair-meetcolab.herokuapp.com';
const previewUrl = editorUrl + '/proxy/1234/'

function createIframe(src: string): HTMLIFrameElement {
  let frame = document.createElement('iframe') as HTMLIFrameElement;
  frame.setAttribute('src', src);
  frame.setAttribute('allow', "clipboard-read; clipboard-write");
  return frame;
}

function main() {
  let editorFrame = createIframe(editorUrl);
  editor.appendChild(editorFrame);

  let previewFrame = createIframe(previewUrl)
  preview.appendChild(previewFrame);
  // let isPreviewFrameReady = false
  // fetch()
}
window.addEventListener('load', main)
