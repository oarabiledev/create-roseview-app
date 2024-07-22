#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

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
