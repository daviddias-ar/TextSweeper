const isFirefox = window.browser && browser.runtime;

let inputText = {};

document.getElementById("copy").addEventListener("click", function() {
  var copyText = document.getElementById("text");
  inputText = document.getElementById("text");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  saveData(inputText);
});

document.getElementById("deformat").addEventListener("click", function() {
    inputText = document.getElementById("text");
    inputText.value = inputText.value.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ");
    saveData(inputText);
  });
  
document.getElementById("clear").addEventListener("click", function() {
  document.getElementById("text").value = "";
  inputText.value = document.getElementById("text").value;
  saveData(inputText);
});

document.getElementById("footer").addEventListener("click", function() {
  var popup = document.getElementById("popup");
  if (popup.classList.contains("0")) {
    popup.style.display = "flex";
    document.getElementById("footer").innerHTML = "Close Links";
    popup.classList.remove("0")
    popup.classList.add("1")
  }
  else if (popup.classList.contains("1")) {
    popup.style.display = "none";
    document.getElementById("footer").innerHTML = "Links";
    popup.classList.remove("1")
    popup.classList.add("0")
  }
});

function saveData(e) {
  inputText = document.getElementById("text").value;
  if (isFirefox){
    browser.storage.local.set({inputText});
  }
  else{
    chrome.storage.local.set({inputText});
  }
  console.log("Saved: [ " + inputText + " ] !");
}

document.addEventListener('DOMContentLoaded', recoverData);

function recoverData() {
  if (isFirefox){
    console.log("Using Firefox Browser")
    browser.storage.local.get('inputText').then(recoverText);
  }
  else{
    console.log("Using Chrome Browser")
    chrome.storage.local.get('inputText').then(recoverText);
  }
}

function recoverText(a) {
  if(a.inputText){
    document.getElementById("text").value = a.inputText;
    console.log("Restored: [ " + a.inputText + " ] !");
  }
  else {
    document.getElementById("text").value = "";
    console.log("No data to recover!");
  }
  
}
