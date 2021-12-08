import {EditorState} from "@codemirror/state";
import {EditorView, drawSelection, keymap} from "@codemirror/view";
import {history, historyKeymap} from "@codemirror/history";
import {defaultKeymap} from "@codemirror/commands";
import {defaultHighlightStyle} from "@codemirror/highlight";
import {lineNumbers} from "@codemirror/gutter";
import {Text} from "@codemirror/text";
import {html} from "@codemirror/lang-html";

let lines = [`<!doctype html>`, `<meta charset="utf8">`, `<body>`];
let repeated = [`  <p>These lines are repeated many times to save memory on`,
                `  string data.</p>`,
                `  <hr>`,
                `  <img src="../logo.svg">`,
                ``];
for (let i = 0; lines.length < 30; i++) {
  lines.push(repeated[i % repeated.length]);
}
lines.push(`</body>`, ``);

const container = document.getElementById("editor")!;
const views: EditorView[] = [];
for (let i = 0; i < 100; i++) {
  const div = document.createElement("div");
  div.innerHTML = `Editor ${i + 1}`;
  container.append(div);

  const view = new EditorView({
    state: EditorState.create({
      doc: Text.of(lines),
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        drawSelection(),
        defaultHighlightStyle,
        lineNumbers(),
        html()
      ]
    })
  });
  container.append(view.dom);
  views.push(view);
}

let currentView = 0;
function scrollintoView() {
  const view = views[currentView];
  document.getElementById("currentView")!.innerHTML = `Current editor = ${currentView}`
  view.scrollPosIntoView(Math.floor(view.state.doc.length / 2));
}

document.getElementById("next")!.addEventListener("click", () => {
  currentView++;
  if (currentView === views.length) {
    currentView = 0;
  }
  scrollintoView();
});

document.getElementById("previous")!.addEventListener("click", () => {
  currentView--;
  if (currentView < 0) {
    currentView = views.length - 1;
  }
  scrollintoView();
});
