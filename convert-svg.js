const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

const targetDir = './src/assets/logos';

fs.readdirSync(targetDir).forEach(file => {
  if (path.extname(file).toLowerCase() === '.png') {
    const inputPath = path.join(targetDir, file);
    const outputPath = path.join(targetDir, `${path.parse(file).name}.svg`);

    // Mengubah PNG menjadi SVG
    potrace.trace(inputPath, (err, svg) => {
      if (err) {
        console.error(`[Gagal] ${file}:`, err);
        return;
      }
      fs.writeFileSync(outputPath, svg);
      console.log(`[Berhasil] ${file} -> ${path.parse(file).name}.svg`);
    });
  }
});