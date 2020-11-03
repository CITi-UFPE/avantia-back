import fs from 'fs';

const deleteFiles = () => {
  const targetFolder = 'uploads';
  const hours = Number(process.env.FILE_LIFETIME);
  const interval =  Number(process.env.CHECK_FILES_INTERVAL);

  if (fs.existsSync(targetFolder)) {
    setInterval(() => {
      const files = fs.readdirSync(targetFolder);
      files.forEach((file) => {
        const fileName = file.split('.')[0];
        const fileUploadTime = fileName.split('-')[1];

        if (Date.now() - Number(fileUploadTime) > hours * 60 * 60 * 1000) {
          fs.unlinkSync(`${targetFolder}/${file}`);
        }
      });
    }, interval * 1000);
  }
}

export default deleteFiles;
