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
// ฟังก์ชันถอดรหัสตัวอักษร - ปรับให้รับค่าตรงๆ เพื่อความชัวร์
const forceGlitch = (element) => {
    const originalText = element.textContent.trim(); // ใช้ textContent แทน innerText เพื่อความแม่นยำ
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

window.addEventListener('load', () => { // เปลี่ยนจาก DOMContentLoaded เป็น load เพื่อรอให้ทุกอย่างนิ่งก่อน
    
    // 1. จัดการข้อความทั่วไป (Tab, H1, H2, Contact)
    const mainTargets = document.querySelectorAll('.tab, .card-content h1, .card-content h2, .contact-row p, .contact-text');
    mainTargets.forEach(el => forceGlitch(el));

    // 2. จัดการ Discord (กวาดทุก span ใน button__text)
    // สาเหตุที่มันไม่ติดคราวที่แล้ว อาจเพราะ selector ไม่ลึกพอ เราจะกวาดใหม่
    const discordLetters = document.querySelectorAll('.button__text span');
    discordLetters.forEach(span => {
        // บังคับให้ Glitch แม้จะเป็น span เล็กๆ
        forceGlitch(span);
    });

    // 3. จัดการปุ่ม Social (Facebook, IG, GitHub)
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
    
    const discordSpans = document.querySelectorAll('.button__text span, .button p span');
    
    if (discordSpans.length > 0) {
        discordSpans.forEach((span) => {
            const originalChar = span.textContent.trim();
            if (!originalChar) return;

            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let iteration = 0;
            
            // ใช้ Interval แยกตัวใครตัวมันสำหรับแต่ละตัวอักษร
            const discordInterval = setInterval(() => {
                span.textContent = characters[Math.floor(Math.random() * characters.length)];
                
                iteration += 1;
                
                // หยุด Glitch เมื่อถึงจำนวนครั้งที่กำหนด (ประมาณ 1 วินาที)
                if (iteration > 20) { 
                    clearInterval(discordInterval);
                    span.textContent = originalChar; // คืนค่าตัวอักษรจริง
                }
            }, 50); // ความเร็วในการเปลี่ยนตัวอักษร
        });
    }

    //glitch qr code
    const qr = document.getElementById("qrcode");
    if (qr) {
        qr.classList.add('assembling');
        let progress = 0;
        
        // ค่อยๆ เพิ่มเปอร์เซ็นต์การโผล่ (จาก 0% ถึง 100%)
        const assembleInterval = setInterval(() => {
            progress += 2; // ปรับความเร็วตรงนี้ (เลขน้อย = ช้าและเนียน)
            qr.style.setProperty('--mask-p', progress + '%');
            
            if (progress >= 100) {
                clearInterval(assembleInterval);
                // ล้างค่า mask ออกเมื่อประกอบเสร็จเพื่อให้สแกนติดง่าย
                qr.style.webkitMaskImage = 'none';
                qr.style.maskImage = 'none';
            }
        }, 20); // วิ่งทุกๆ 20ms
    }

    // Scanner Line ครั้งเดียว
    const card = document.querySelector('.card');
    if(card) {
        const scanner = document.createElement('div');
        scanner.className = 'scanner-line';
        card.appendChild(scanner);
        setTimeout(() => scanner.remove(), 2500);
    }
});

