#!/usr/bin/env node

const { exec } = require('child_process');

function queryGoogle(searchQuery, callback) {
    if (!searchQuery) {
        console.error('Usage: node google-query.js "your search query"');
        process.exit(1);
    }

    const encodedQuery = encodeURIComponent(searchQuery);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    
    const curlCommand = `curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${googleUrl}"`;
    
    console.log(`Searching Google for: "${searchQuery}"`);
    
    exec(curlCommand, (error, stdout, stderr) => {
        if (callback) {
            callback(error, stdout, stderr);
        } else {
            if (error) {
                console.error(`Error executing curl: ${error.message}`);
                return;
            }
            
            if (stderr) {
                console.error(`Curl stderr: ${stderr}`);
                return;
            }
            
            console.log('Google search results:');
            console.log(stdout);
        }
    });
}

if (require.main === module) {
    const searchQuery = process.argv[2];
    queryGoogle(searchQuery);
}

module.exports = { queryGoogle };