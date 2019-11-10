const fs = require('fs');
const path = require('path');
const { registerFont } = require('./canvas');

const rnviVersion = require('./package').dependencies["react-native-vector-icons"];

const rnviPath = path.resolve('node_modules', 'react-native-vector-icons');

const rnviFontsPath = path.resolve(rnviPath, 'Fonts');

const rnviGlyphMapPath = path.resolve(rnviPath, 'glyphmaps');

const multiStyleFonts = {
  FontAwesome5Free: Object.keys(require(path.join(rnviGlyphMapPath, 'FontAwesome5Free_meta'))),
  // FontAwesome5Pro: Object.keys(require(path.join(rnviGlyphMapPath, 'FontAwesome5Pro_meta'))),
};

const FontAwesome5Data = {
  Brands: { family: 'FontAwesome5Brands', weight: '400' },
  Light: { weight: '300' },
  Regular: { family: 'FontAwesome5-Regular', weight: '400' },
  Solid: { family: 'FontAwesome5', weight: '900' },
};

const fontList = () => {
  let ret = [];
  fs.readdirSync(rnviGlyphMapPath).forEach(filename => {
    if (filename === '.' || filename === '..') return;
    const name = path.parse(filename).name.split('_')[0];
    if (ret.indexOf(name) < 0 && name.substr(-3) !== 'Pro') ret.push(name);
  });
  return ret;
};

const fontBySlug = slug => {
  const fonts = fontList();
  const index = fonts.map(el => el.toLowerCase()).indexOf(slug.toLowerCase());
  return index < 0 ? null : fonts[index];
};

const getFontFamily = (font, style) => {
  if (font.substr(-4) === 'Free') {
    const Style = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
    return FontAwesome5Data[Style].family || font;
  }
  return font;
};

const getFontFile = (font, style) => {
  if (font.substr(-4) === 'Free') {
    const Style = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
    return { path: path.join(rnviFontsPath, `${font.replace('Free', '')}_${Style}.ttf`), ...FontAwesome5Data[Style] };
  }
  return { path: path.join(rnviFontsPath, `${font}.ttf`), family: font, weight: 'normal', style: 'normal' };
};

const getGlyphCode = (font, name, style) => {
  const glyphMap = require(path.join(rnviGlyphMapPath, font));
  const code = glyphMap[name];
  if (style && require(path.join(rnviGlyphMapPath, `${font}_meta`))[style].indexOf(name) < 0)
    return null;
  return code;
};

module.exports = {
  DEFAULT_ICON_COLOR: 'black',
  DEFAULT_ICON_SIZE: 12,
  // ^^^ react required if DEFAULTs imported from create-icon-set
  rnviVersion,
  rnviGlyphMapPath,
  multiStyleFonts,
  fontList,
  fontBySlug,
  getFontFamily,
  getGlyphCode,
};

fontList().forEach(font => {
  if (Object.keys(multiStyleFonts).indexOf(font) < 0)
    return registerFont(getFontFile(font));
  multiStyleFonts[font].forEach(style => registerFont(getFontFile(font, style)));
});
