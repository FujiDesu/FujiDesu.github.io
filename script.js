/*------------------------------------------------------------------------------------------------------------
  ส่วนของ QR Code (เฉพาะหน้าแรก)
------------------------------------------------------------------------------------------------------------*/
const qrDiv = document.getElementById("qrcode");
if (qrDiv) {
    new QRCode(qrDiv, {
        text: window.location.href,
        width: 160,
        height: 160,
        colorDark: "#ffffff",
        colorLight: "transparent"
    });
}

/*------------------------------------------------------------------------------------------------------------
  ฟังก์ชัน Copy (เฉพาะหน้าที่มีปุ่ม copy)
------------------------------------------------------------------------------------------------------------*/
document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        navigator.clipboard.writeText(text);
        btn.focus(); 
    });
});

/*------------------------------------------------------------------------------------------------------------
  ระบบ Glitch (รันทุกหน้า)
------------------------------------------------------------------------------------------------------------*/
const forceGlitch = (element) => {
    if (!element) return;
    const originalText = element.textContent.trim();
    if (!originalText) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let iteration = 0;
    
    const interval = setInterval(() => {
        element.textContent = originalText.split("")
            .map((char, index) => {
                if(index < iteration) return originalText[index];
                if(char === " ") return " ";
                return chars[Math.floor(Math.random() * chars.length)]
            }).join("");
        
        if(iteration >= originalText.length) clearInterval(interval);
        
        // ปรับตรงนี้: ยิ่งเลขน้อย ยิ่งจบไว (เพราะหนึ่งรอบมันจะ "คืนค่าจริง" หลายตัวอักษรพร้อมกัน)
        // จากเดิม 1 / 2.5 ให้ลองเปลี่ยนเป็น 1.5 หรือ 2 ไปเลยถ้าข้อความยาวมาก
        iteration += 2; 
    }, 25); 
}

window.addEventListener('load', () => {
    const cardElement = document.querySelector('.card');

    // 1. กระตุ้นข้อความ Glitch (กวาดทุกอย่างที่เจอในหน้านั้น)
    const mainTargets = document.querySelectorAll('.tab, .card-content h1, .card-content h2, .contact-row p, .contact-text, .bio');
    mainTargets.forEach(el => forceGlitch(el));

    // 2. จัดการปุ่ม Social (ถ้ามี)
    const links = document.querySelectorAll('.link-btn');
    links.forEach(btn => {
        const textNode = Array.from(btn.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
        if (textNode) {
            const original = textNode.textContent.trim();
            let iter = 0;
            const linkInterval = setInterval(() => {
                textNode.textContent = original.split("").map((c, idx) => {
                    if(idx < iter) return original[idx];
                    return "ABCDEF012345"[Math.floor(Math.random() * 12)];
                }).join("");
                if(iter >= original.length) clearInterval(linkInterval);
                iter += 1 / 2.5;
            }, 25);
        }
    });

    // 3. จัดการ Discord (ถ้ามี)
    const discordSpans = document.querySelectorAll('.button__text span, .button p span');
    discordSpans.forEach((span) => {
        const originalChar = span.textContent.trim();
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let iteration = 0;
        const discordInterval = setInterval(() => {
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            iteration += 1;
            if (iteration > 12) { 
                clearInterval(discordInterval);
                span.textContent = originalChar;
            }
        }, 35);
    });

    // 4. ประกอบร่าง QR Code (เฉพาะหน้าที่มี)
    const qr = document.getElementById("qrcode");
    if (qr) {
        qr.classList.add('assembling');
        let progress = 0;
        const assembleInterval = setInterval(() => {
            progress += 4;
            qr.style.setProperty('--mask-p', progress + '%');
            if (progress >= 100) {
                clearInterval(assembleInterval);
                qr.style.webkitMaskImage = 'none';
                qr.style.maskImage = 'none';
            }
        }, 10);
    }

    // 5. Card สั่น และ Scanner (รันทุกหน้าที่มี .card)
    if (cardElement) {
        cardElement.classList.add('card-boot-glitch');
        setTimeout(() => {
            cardElement.classList.remove('card-boot-glitch');
        }, 600);

        const scanner = document.createElement('div');
        scanner.className = 'scanner-line';
        document.body.appendChild(scanner);
        setTimeout(() => scanner.remove(), 650);
    }
});