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

/*------------------------------------------------------------------------------------------------------------
  เอฟเฟค glitch
------------------------------------------------------------------------------------------------------------*/
const forceGlitch = (element) => {
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
        iteration += 1 / 3;
    }, 30);
}

window.addEventListener('load', () => {
    // 1. ประกาศตัวแปร card แค่ครั้งเดียว (แก้จุด Error)
    const cardElement = document.querySelector('.card');

    // 2. จัดการข้อความทั่วไป
    const mainTargets = document.querySelectorAll('.tab, .card-content h1, .card-content h2, .contact-row p, .contact-text');
    mainTargets.forEach(el => forceGlitch(el));

    // 3. จัดการปุ่ม Social (Icon ไม่หาย)
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
                iter += 1/3;
            }, 30);
        }
    });
    
    // 4. จัดการปุ่ม Discord
    const discordSpans = document.querySelectorAll('.button__text span, .button p span');
    discordSpans.forEach((span) => {
        const originalChar = span.textContent.trim();
        if (!originalChar) return;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let iteration = 0;
        const discordInterval = setInterval(() => {
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            iteration += 1;
            if (iteration > 20) { 
                clearInterval(discordInterval);
                span.textContent = originalChar;
            }
        }, 50);
    });

    // 5. Glitch QR Code (ประกอบร่าง)
    const qr = document.getElementById("qrcode");
    if (qr) {
        qr.classList.add('assembling');
        let progress = 0;
        const assembleInterval = setInterval(() => {
            progress += 2;
            qr.style.setProperty('--mask-p', progress + '%');
            if (progress >= 100) {
                clearInterval(assembleInterval);
                qr.style.webkitMaskImage = 'none';
                qr.style.maskImage = 'none';
            }
        }, 20);
    }

    // 6. Glitch Card สั่น (ใช้ตัวแปร cardElement ที่ประกาศไว้ข้างบน)
    if (cardElement) {
        cardElement.classList.add('card-boot-glitch');
        setTimeout(() => {
            cardElement.classList.remove('card-boot-glitch');
        }, 1200);
    }

    // 7. Scanner Line (ใช้ตัวแปร cardElement)
    if(cardElement) {
        const scanner = document.createElement('div');
    scanner.className = 'scanner-line';
    document.body.appendChild(scanner);

    // ต้องให้เวลาลบ (Remove) มากกว่าหรือเท่ากับเวลา Animation (1.2s)
    // ผมแนะนำให้ใส่ 1300 (1.3 วินาที) เพื่อให้เห็นเส้นมันวิ่งพ้นขอบล่างไปจริงๆ ก่อนลบ
    setTimeout(() => {
        scanner.remove();
    }, 1300);
    }
});