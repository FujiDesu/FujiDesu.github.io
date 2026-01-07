new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 160,
  height: 160,
  colorDark: "#ffffff",
  colorLight: "transparent"
});
