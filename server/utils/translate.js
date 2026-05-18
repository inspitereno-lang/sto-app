const { spawn } = require('child_process');
const path = require('path');

/**
 * Runs the Python translation script in the background.
 */
const triggerTranslation = () => {
  const scriptPath = path.join(__dirname, '../scripts/translate_db.py');
  
  console.log(`[Translation] Triggering script: ${scriptPath}`);
  
  // Try python3 first, fallback to python
  const runScript = (command) => {
    console.log(`[Translation] Using command: ${command}`);
    const pythonProcess = spawn(command, [scriptPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`[Translation] Output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Translation] Error: ${data}`);
    });

    pythonProcess.on('error', (err) => {
      if (command === 'python3') {
        console.warn(`[Translation] python3 not found, trying python...`);
        runScript('python');
      } else {
        console.error(`[Translation] Failed to start Python process: ${err.message}`);
      }
    });

    pythonProcess.on('close', (code) => {
      console.log(`[Translation] Finished with code ${code}`);
    });
  };

  runScript('python3');
};

module.exports = { triggerTranslation };
