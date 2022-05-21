const fs = require('fs');

const mainEntry = './05-merge-styles/styles';
const bundleDir = './05-merge-styles/project-dist';

function makeCssBundle() {
  let writableStream = fs.createWriteStream(`${bundleDir}/bundle.css`);
  fs.readdir(mainEntry, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fs.createReadStream(`${mainEntry}/${file.name}`, 'utf8').pipe(
          writableStream
        );
      }
    });
  });
}

makeCssBundle();
