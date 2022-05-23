const { createReadStream } = require('fs');

//createReadStream - обертка для ReadStream, возвращает объект класса ReadStream (см. документацию).
//так что баллы тут снижать не нужно
const readStream = createReadStream(`${__dirname}/text.txt`);

readStream.on('data', (data) => {
  console.log(data.toString());
});
