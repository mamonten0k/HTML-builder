// const fs = require('fs');

// const requiredDir = './04-copy-directory/files';
// const destDir = './04-copy-directory/files-copy';

// function copyDir(currPath, destDir) {
//   if (fs.existsSync(destDir)) {
//     fs.rm(`${destDir}/`, { recursive: true }, (err) => console.log(err));
//   }
//   console.log(fs.existsSync(destDir));
//   fs.mkdir(destDir, (err) => {
//     if (err) throw err;
//   });
//   fs.readdir(currPath, { withFileTypes: true }, (err, files) => {
//     if (err) throw err;

//     files.forEach((file) => {
//       if (file.isFile()) {
//         fs.copyFile(
//           `${currPath}/${file.name}`,
//           `${destDir}/${file.name}`,
//           (err) => {
//             if (err) throw err;
//           }
//         );
//       } else if (file.isDirectory()) {
//         copyDir(`${currPath}/${file.name}`, `${destDir}/${file.name}`);
//       }
//     });
//   });
// }

// function onMkdir(err) {
//   if (err) {
//     fs.rm(`${destDir}`, { recursive: true }, (err) => console.log(err));
//     fs.mkdir(destDir, (err) => console.log(err));
//   }
//   fs.mkdir(destDir, (err) => console.log(err));
// }

// copyDir(requiredDir, destDir);
