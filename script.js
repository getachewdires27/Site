function processDocument() {
    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Please upload a file!");
        return;
    }

    const fileType = file.type;

    if (fileType.includes("pdf")) {
        extractFromPDF(file);
    } else if (fileType.includes("image")) {
        extractFromImage(file);
    } else {
        alert("Unsupported file type.");
    }
}

function extractFromPDF(file) {
    const reader = new FileReader();
    reader.onload = function() {
        const pdfData = new Uint8Array(this.result);
        pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                return page.getTextContent();
            }).then(textContent => {
                let text = textContent.items.map(item => item.str).join(" ");
                populateCard(text);
            });
        });
    };
    reader.readAsArrayBuffer(file);
}

function extractFromImage(file) {
    const reader = new FileReader();
    reader.onload = function() {
        Tesseract.recognize(reader.result, 'eng').then(({ data }) => {
            populateCard(data.text);
        });
    };
    reader.readAsDataURL(file);
}

function populateCard(text) {
    const nameMatch = text.match(/Name:\s*(.+)/);
    const dobMatch = text.match(/Date of Birth:\s*(.+)/);
    const genderMatch = text.match(/Sex:\s*(.+)/);
    const idMatch = text.match(/ID Number:\s*(.+)/);
    const phoneMatch = text.match(/Phone Number:\s*(.+)/);
    const regionMatch = text.match(/Region:\s*(.+)/);
    const zoneMatch = text.match(/Zone:\s*(.+)/);
    const woredaMatch = text.match(/Woreda:\s*(.+)/);

    document.getElementById("name").innerText = nameMatch ? nameMatch[1] : "N/A";
    document.getElementById("dob").innerText = dobMatch ? dobMatch[1] : "N/A";
    document.getElementById("gender").innerText = genderMatch ? genderMatch[1] : "N/A";
    document.getElementById("idNumber").innerText = idMatch ? idMatch[1] : "N/A";
    document.getElementById("phone").innerText = phoneMatch ? phoneMatch[1] : "N/A";
    document.getElementById("region").innerText = regionMatch ? regionMatch[1] : "N/A";
    document.getElementById("zone").innerText = zoneMatch ? zoneMatch[1] : "N/A";
    document.getElementById("woreda").innerText = woredaMatch ? woredaMatch[1] : "N/A";

    // Generate QR Code
    new QRCode(document.getElementById("qrCode"), text);
}
