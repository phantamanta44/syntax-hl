"use strict";
function selectElement(element) {
  let doc = document;
  if (doc.body.createTextRange) {
    let range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

document.onclick = function(e) {
  if (e.target.className === 'click') {
    SelectText('selectme');
  }
};

$(function() {
  const output = $("#out");
  const optFont = $("#opt-font"), optSize = $("#opt-size"), optLang = $("#opt-lang");

  const editor = ace.edit("code");
  editor.setTheme("ace/theme/tomorrow_night");
  editor.getSession().setMode("ace/mode/java");
  editor.getSession().setUseSoftTabs(true);

  function updateOutput() {
    let parsed = hljs.highlight(optLang.val() || "Java", editor.getValue());
    output.css("font-family", optFont.val() || "\"Source Code Pro\", monospace");
    let size = parseInt(optSize.val());
    output.css("font-size", !!size ? `${size}pt` : "12pt");
    output.html(parsed.value.trim());
  }

  optFont.on("change paste keyup", updateOutput);
  optSize.on("change paste keyup", updateOutput);
  optLang.on("change paste keyup", updateOutput);
  editor.getSession().on("change", updateOutput);
  output.on("click", function() {
    selectElement(output[0]);
  });
});