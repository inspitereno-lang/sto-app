const { spawn } = require('child_process');
const path = require('path');

/**
 * Runs the Python translation script in the background.
 */
const triggerTranslation = () => {
  const scriptPath = path.join(__dirname, '../scripts/translate_db.py');
  
  console.log(`Triggering translation script: ${scriptPath}`);
  
  const pythonProcess = spawn('python3', [scriptPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Translation Script: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Translation Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Translation Script finished with code ${code}`);
  });
};

module.exports = { triggerTranslation };
