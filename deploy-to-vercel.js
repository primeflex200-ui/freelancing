#!/usr/bin/env node

// Simple deployment script for Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel deployment...\n');

// Step 1: Build the project
console.log('📦 Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Check if Vercel CLI is installed
console.log('🔍 Checking Vercel CLI...');
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed\n');
} catch (error) {
  console.log('📥 Installing Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully!\n');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI:', installError.message);
    console.log('Please install Vercel CLI manually: npm install -g vercel');
    process.exit(1);
  }
}

// Step 3: Deploy to Vercel
console.log('🌐 Deploying to Vercel...');
try {
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('\n✅ Deployment completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Set up environment variables in Vercel dashboard');
  console.log('2. Configure custom domain if needed');
  console.log('3. Test the deployed application');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔧 Manual deployment steps:');
  console.log('1. Run: vercel login');
  console.log('2. Run: vercel --prod');
  console.log('3. Follow the prompts to deploy');
  process.exit(1);
}

console.log('\n🎉 Deployment process completed!');