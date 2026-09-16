const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = './src/assets/images'; 

fs.readdirSync(targetDir).forEach(file => {
  if (path.extname(file).toLowerCase() === '.png') {
    const inputPath = path.join(targetDir, file);
    const outputPath = path.join(targetDir, `${path.parse(file).name}.webp`);

    sharp(inputPath)
      .webp({ quality: 80 }) // Kualitas 80% (ukuran file jauh lebih kecil, visual tetap tajam)
      .toFile(outputPath)
      .then(() => console.log(`[Berhasil] ${file} -> ${path.parse(file).name}.webp`))
      .catch(err => console.error(`[Gagal] ${file}:`, err));
  }
});