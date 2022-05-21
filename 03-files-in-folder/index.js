const fs = require('fs');
const path = require('path');

function readRecursive(currPath) {
  fs.readdir(currPath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(`${currPath}/${file.name}`, (err, stats) => {
            console.log(
              file.name.split('.')[0] || 'system file (has no name)',
              '-',
              file.name.split('.')[1],
              '-',
              (stats.size / 1024).toFixed(3) + ' Kb'
            );
          });
        } else if (file.isDirectory()) {
          readRecursive(`${currPath}/${file.name}`);
        }
      });
    }
  });
}

readRecursive('./03-files-in-folder/secret-folder');
