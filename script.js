const resultElement = document.getElementById('result');
const historyList = document.getElementById('history-list');
const beepSound = document.getElementById('beep');
const filterSelect = document.getElementById('filter');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const clearSelectedBtn = document.getElementById('clear-selected-btn');

let scanHistory = new Set(JSON.parse(localStorage.getItem('scanHistory')) || []);

updateHistoryList();

function getCodeType(text) {
  const qrPatterns = [/^http/, /^https/, /^BEGIN:/i, /:/];
  return qrPatterns.some(p => p.test(text)) ? 'qr' : 'barcode';
}

function shouldDisplay(text) {
  const selected = filterSelect.value;
  const type = getCodeType(text);
  return selected === "all" || selected === type;
}

function onScanSuccess(decodedText) {
  if (!scanHistory.has(decodedText)) {
    scanHistory.add(decodedText);
    localStorage.setItem('scanHistory', JSON.stringify([...scanHistory]));
    resultElement.textContent = decodedText;
    beepSound.play();
    updateHistoryList();
  }
}

function updateHistoryList() {
  historyList.innerHTML = "";
  [...scanHistory].forEach(text => {
    if (shouldDisplay(text)) {
      const li = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "history-checkbox";
      checkbox.value = text;
      li.appendChild(checkbox);

      const span = document.createElement('span');
      span.textContent = " " + text + " ";
      li.appendChild(span);

      const copyBtn = document.createElement('button');
      copyBtn.textContent = "Copy";
      copyBtn.classList.add('copy-btn');
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      };
      li.appendChild(copyBtn);

      historyList.appendChild(li);
    }
  });
}

function clearHistory() {
  if (confirm("Are you sure you want to clear the scan history?")) {
    scanHistory.clear();
    localStorage.removeItem('scanHistory');
    updateHistoryList();
    resultElement.textContent = "Waiting...";
  }
}

function clearSelected() {
  const checkboxes = document.querySelectorAll(".history-checkbox:checked");
  if (checkboxes.length === 0) {
    alert("Please select at least one item to delete.");
    return;
  }

  if (confirm("Are you sure you want to delete the selected entries?")) {
    checkboxes.forEach(cb => {
      scanHistory.delete(cb.value);
    });
    localStorage.setItem('scanHistory', JSON.stringify([...scanHistory]));
    updateHistoryList();
  }
}

filterSelect.addEventListener("change", updateHistoryList);
clearHistoryBtn.addEventListener("click", clearHistory);
clearSelectedBtn.addEventListener("click", clearSelected);

function onScanFailure(error) {
  // Optional: console.warn(error);
}

const html5QrCodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 15,
    qrbox: { width: 250, height: 150 },
    rememberLastUsedCamera: true,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  },
  false
);

html5QrCodeScanner.render(onScanSuccess, onScanFailure);
