const path = require('path');
const express = require('express');
const helpers = require('./rnvi');
const canvas = require('./canvas');

const router = express.Router();

router.get('/:font/:glyph', (req, res, next) => {
  const font = helpers.fontBySlug(req.params.font);
  if (!font) return next();

  const style = Object.keys(helpers.multiStyleFonts).indexOf(font) >= 0 ? req.query.style || 'regular' : null;
  const glyphCode = helpers.getGlyphCode(font, req.params.glyph, style);
  if (!glyphCode) return next();

  const ratio = req.query.ratio || 1;
  const size = (req.query.size || helpers.DEFAULT_ICON_SIZE) * ratio;
  const color = req.query.color || helpers.DEFAULT_ICON_COLOR;
  const output = req.query.output || 'raw';

  const result = canvas(helpers.getFontFamily(font, style), size, color, glyphCode, output !== 'raw');
  if (output === 'raw') return res.type('png').send(result);
  output === 'uri' ? res.json({ uri: result }) : res.send(result);
});

router.get('/:font', (req, res, next) => {
  const font = helpers.fontBySlug(req.params.font);
  if (!font) return next();
  if (Object.keys(helpers.multiStyleFonts).indexOf(font) >= 0)
    return res.json({ glyphs: require(path.join(helpers.rnviGlyphMapPath, `${font}_meta`)) });
  res.json({ glyphs: Object.keys(require(path.join(helpers.rnviGlyphMapPath, font))) });
});

router.get('/*', (req, res) => {
  res.send(require('./homepage'));
});

router.all('*', (req, res) => {
  res.status(404).end();
});

module.exports = router;
