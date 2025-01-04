// Load environment variables
require('dotenv').config();

const { exec } = require('child_process');
const cron = require('node-cron');

// Ensure necessary environment variables are available
const { PAT, REPO_URL } = process.env;

if (!PAT || !REPO_URL) {
    console.error('Missing PAT or REPO_URL in environment variables');
    process.exit(1);
}

// Schedule the cron job (e.g., every hour: '0 * * * *')
cron.schedule('0 * * * *', () => {
    console.log('Running scheduled git pull...');

    // Replace "https://username" with the token for authentication
    const repoWithAuth = REPO_URL.replace('https://', `https://${PAT}@`);

    // Execute the git pull command
    exec(`git pull ${repoWithAuth}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during git pull: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Git pull stderr: ${stderr}`);
            return;
        }
        console.log(`Git pull output: ${stdout}`);
    });

    // Execute the git pull command
    exec(`cd .. && pnpm dev`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during restart: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`restart stderr: ${stderr}`);
            return;
        }
        console.log(`restart output: ${stdout}`);
    });
});