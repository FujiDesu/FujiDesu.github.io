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
