const { rnviVersion, fontList } = require('./rnvi');

module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>react-native-vector-icons getImageSource</title>
</head>
<body>
  <h3>react-native-vector-icons getImageSource Node.js implementation</h3>
  <p>This is the result of 2 hours of work!!! Therefore no template, no detail description. Even no favicon ))) Repo <a target="_blank" href="https://github.com/oxyii/getimagesource">here</a></p>
  <p>This is very slow for runtime! I do not recommend using this in runtime. In the worst case, pre-caching at application startup.</p>
  <h4>react-native-vector-icons version: ${rnviVersion}</h4>
  <h4>Fonts:</h4>
  <ul>${fontList().map(font => '<li>'+font+'</li>')}</ul>
  <h4>Requests:</h4>
  <p><code>/< fontname-lower-case >/< glyphname ></code></p>
  <h4>Query params:</h4>
  <p>style - only for FontAwesome5 (brands, solid or by default - regular). PLEASE SET FOR FontAwesome5! if no glyph in <a target="_blank" href="https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/FontAwesome5Free_meta.json">GlyphMap</a> - will show this page</p>
  <p>size - in dp... or in px if no pixel ratio (=1)</p>
  <p>ratio - pixel ratio</p>
  <p>color - <a target="_blank" href="https://www.w3schools.com/colors/colors_names.asp">HTML color name</a> or <strong>rgb(0,0,0)</strong> or <strong>rgba(0,0,0,.5)</strong> style. Warning: DO NOT PASS #000000 FORMAT !!!</p>
  <p>output - <strong>uri</strong> - is a JSON object <code>{ uri: data:image/png;base64,... }, <strong>base64</strong> - is just <i>data:image/png;base64,...</i> and by default - <strong>raw</strong> - is a png file with MIME image/png</code></p>
  <h4>Examples:</h4>
  <p><a target="_blank" href="/ionicons/md-more?size=24&ratio=2&color=blue">/ionicons/md-more?size=24&ratio=2&color=blue</a></p>
  <p><a target="_blank" href="/fontawesome5free/github?style=brands&size=100&color=grey">/fontawesome5free/github?style=brands&size=100&color=grey</a></p>
  <p><a target="_blank" href="/entypo/bell?output=uri">/entypo/bell?output=uri</a></p>
  <p><a target="_blank" href="/materialcommunityicons/airbag?color=rgb(20,200,20)&size=25&ratio=3&output=base64">/materialcommunityicons/airbag?color=rgb(20,200,20)&size=25&ratio=3&output=base64</a></p>
</body>
</html>
`;
