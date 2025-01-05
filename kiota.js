const fs = require('fs');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

// Function to check if a command exists
function checkCommand(command) {
    try {
        execSync(`command -v ${command}`, { stdio: 'ignore' });
    } catch (error) {
        console.error(`Error: '${command}' is not installed. Install it first.`);
        process.exit(1);
    }
}

// Load environment variables from .env.defaults if it exists
function loadEnvVars() {
    const envFile = '.env.defaults';
    if (fs.existsSync(envFile)) {
        const envContent = fs.readFileSync(envFile, 'utf-8');
        envContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                process.env[key] = value;
            }
        });
    }
}

// Validate environment variables
function validateEnvVar(variable) {
    if (!process.env[variable]) {
        console.error(`Error: Environment variable ${variable} is not set. Exiting.`);
        process.exit(1);
    }
}

// Execute shell command and log output
function executeCommand(command) {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
}

// Add server URL to OpenAPI YAML file
function addServerUrlToYaml(filePath, serverUrl) {
    // Read and parse the YAML file
    let doc = yaml.load(fs.readFileSync(filePath, 'utf8'));

    // Ensure servers key exists
    if (!doc.servers) {
        doc.servers = [];
    }

    // Add the server URL
    doc.servers.push({
        url: serverUrl,
        description: "Primary server"
    });

    // Write the modified YAML back to the file
    fs.writeFileSync(filePath, yaml.dump(doc), 'utf8');
}

function main() {
    // Load environment variables from .env.defaults
    loadEnvVars();

    // Validate required environment variables
    validateEnvVar('SERVER_URL');
    validateEnvVar('CLIENT_NAME');

    const inputFile = '_openapi.yaml';
    const outputFile = 'openapi-3.0.yaml';
    const outputDir = './compartments/client';
    const serverUrl = process.env.SERVER_URL;
    const clientName = process.env.CLIENT_NAME;

    // Step 1: Down-convert the OpenAPI 3.1 specification to 3.0
    console.log("Converting OpenAPI 3.1 file to 3.0 format...");
    checkCommand('openapi-down-convert');
    executeCommand(`openapi-down-convert --input ${inputFile} --output ${outputFile}`);

    // Step 2: Add server URL to the OpenAPI 3.0 YAML specification
    console.log("Adding server URL to OpenAPI 3.0 description...");
    addServerUrlToYaml(outputFile, serverUrl);

    // Step 3: Validate the OpenAPI 3.0 specification
    console.log("Validating OpenAPI 3.0 specification...");
    checkCommand('npx');
    executeCommand(`npx @apidevtools/swagger-cli validate ${outputFile}`);

    // Step 4: Generate TypeScript client using Kiota
    console.log("Generating TypeScript client using Kiota...");
    checkCommand('kiota');
    executeCommand(`kiota generate -l typescript -d ${outputFile} -c ${clientName} -o ${outputDir}`);

    console.log("Client generation completed successfully!");

    // Step 5: Generate TypeScript client using Kiota
    console.log("Generating TypeScript client using Kiota...");
    checkCommand('kiota');
    executeCommand(`kiota info -d "./openapi-3.0.yaml" -l TypeScript`);

    console.log("Client generation completed successfully!");



}

main();