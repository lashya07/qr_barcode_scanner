# qr_barcode_scanner


A simple, responsive web application to scan QR codes and barcodes in real-time using your device's camera.
##  Features

- Realtime scanning using webcam
- Supports both QR codes and barcodes
- Beep sound on successful scan
- Filter results: All, QR only, Barcode only
- Scan history with localStorage persistence
- Copy scanned results to clipboard
- Selective and complete history deletion
## Project Structure

qr-barcode-scanner/
├── index.html              # Main HTML structure of the app
├── css/
│   └── styles.css          # Styling for the UI
├── js/
│   └── script.js           # Scanner logic and history management
├── README.md               # Project documentation


## How to Use

1. **Download or clone this repository**
2. Open `index.html` in your browser
3. Grant camera access when prompted
4. Point the camera to a QR code or barcode
5. View, copy, or manage scanned results from the history section

##  Requirements

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A device with a camera (PC webcam or mobile)

---

##  Libraries Used

- **html5-qrcode**  
  Provides camera integration and QR/barcode decoding.  
  CDN:  
  ```html
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
