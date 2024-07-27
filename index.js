#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
	console.error("Please specify the project name");
	process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "app");

if (fs.existsSync(projectPath)) {
	console.error(`Directory ${projectName} already exists`);
	process.exit(1);
}

// Function to recursively copy a directory
function copyDirectory(src, dest) {
	const entries = fs.readdirSync(src, { withFileTypes: true });

	fs.mkdirSync(dest);

	for (let entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		entry.isDirectory() ? copyDirectory(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
	}
}

copyDirectory(templatePath, projectPath);

console.log(`Project ${projectName} has been created at ${projectPath}`);

// Change to the newly created project directory
process.chdir(projectPath);

// Initialize a new package.json file if it doesn't exist
if (!fs.existsSync("package.json")) {
	execSync("npm init -y", { stdio: "inherit" });
}

// Install the roseview package and other dependencies
try {
	execSync("npm install roseview", { stdio: "inherit" });
	console.log(`Installed 'roseview' package.`);
} catch (error) {
	console.error("Failed to install dependencies:", error);
	process.exit(1);
}
