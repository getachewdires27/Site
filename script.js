function generateID() {
    const name = "Bilisa Yasin Mussa";
    const dob = "02/01/1996";
    const gender = "Male";
    const idNumber = "8653 6940 8925 7913";
    const phone = "+251 937 412 744";
    const region = "Oromia";
    const zone = "East Harerge";
    const woreda = "Kersa";
    const qrCodeUrl = "qr_code_example.png"; // Replace with dynamic QR code generation

    document.getElementById("name").innerText = name;
    document.getElementById("dob").innerText = dob;
    document.getElementById("gender").innerText = gender;
    document.getElementById("idNumber").innerText = idNumber;
    document.getElementById("phone").innerText = phone;
    document.getElementById("region").innerText = region;
    document.getElementById("zone").innerText = zone;
    document.getElementById("woreda").innerText = woreda;
    document.getElementById("qrCode").src = qrCodeUrl;
}
