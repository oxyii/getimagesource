const { createCanvas, registerFont } = require('canvas');

const fill = (font, size, color, code, toBase64) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.font = `${size}px ${font}`;
  ctx.textBaseline = 'top'; // TODO: REALLY ???
  ctx.textAlign = 'center';
  ctx.fillStyle = color;

  ctx.fillText(String.fromCharCode(code), size / 2, 0);

  return toBase64 ? canvas.toDataURL() : canvas.toBuffer();
};

module.exports = fill;

module.exports.registerFont = font => {
  const { path, ...others } = font;
  registerFont(path, others);
};
