new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 160,
  height: 160,
  colorDark: "#ffffff",
  colorLight: "transparent"
});

document.querySelectorAll('.copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text);
    btn.focus(); 
  });
});

// ฟังก์ชันถอดรหัสตัวอักษร (Hacker Effect)
const decodeText = (element) => {
    const originalText = element.innerText;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let iteration = 0;
    
    // เคลียร์ค่าว่างก่อนเริ่มเพื่อความเนียน
    element.innerText = "";
    
    const interval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((char, index) => {
                if(index < iteration) return originalText[index];
                if(char === " ") return " "; // เว้นวรรคให้คงเดิม
                return chars[Math.floor(Math.random() * chars.length)]
            }).join("");
        
        if(iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

window.addEventListener('DOMContentLoaded', () => {
    // เลือกหัวข้อ h1, h2 และทุกบรรทัดที่มีข้อความใน contact-row รวมถึง bio
    const elementsToGlitch = document.querySelectorAll('h1, h2, .contact-row p, .contact-text, .bio, .qr-text');
    
    elementsToGlitch.forEach(el => {
        // กรองเอาเฉพาะอันที่มีข้อความจริงๆ ไม่ให้ไป Glitch โดนพวก Icon หรือปุ่มว่างๆ
        if (el.innerText.trim().length > 0) {
            decodeText(el);
        }
    });

    // Scanner Line แบบครั้งเดียว
    const card = document.querySelector('.card');
    const scanner = document.createElement('div');
    scanner.className = 'scanner-line';
    card.appendChild(scanner);

    setTimeout(() => {
        scanner.remove();
    }, 2500); 
});