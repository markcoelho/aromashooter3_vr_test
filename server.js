const express = require('express');
const cors = require('cors');
const path = require('path');
const httpProxy = require('http-proxy');
const https = require('https');
const fs = require('fs');
const ip = require('ip');
const selfsigned = require('selfsigned');
const os = require('os');

const appclient = express();
const proxy = httpProxy.createProxyServer({});
const port2 = 3006; 

// Function to generate self-signed certificate
function generateCertificate() {
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const pems = selfsigned.generate(attrs, { days: 365 });

  fs.writeFileSync('./ssl/private.key', pems.private);
  fs.writeFileSync('./ssl/certificate.crt', pems.cert);
  
  console.log('Self-signed certificate generated successfully.');
}

// Create the ssl directory if it doesn't exist
if (!fs.existsSync('./ssl')) {
  fs.mkdirSync('./ssl');
}

// Check if the certificate files exist, otherwise generate them
if (!fs.existsSync('./ssl/private.key') || !fs.existsSync('./ssl/certificate.crt')) {
  generateCertificate();
}

// Load the SSL certificate and key
const options = {
    key: fs.readFileSync('ssl/private.key'),
    cert: fs.readFileSync('ssl/certificate.crt')
};

// Enable CORS
appclient.use(cors()); // Enable CORS 

// Serve static files
appclient.use(express.static(path.join(__dirname)));

// Handle client request
appclient.get('/variables/:var1/:var2/:var3', (req, res) => {
    let { var1, var2, var3 } = req.params;
    console.log(`Received variables: ${var1}, ${var2}, ${var3}`);

    // Convert each variable to an array
    var1 = var1.split(',');
    var2 = var2.split(',');
    var3 = var3.split(',');

    console.log(`Converted variables to arrays: ${var1}, ${var2}, ${var3}`);

    // Call the diffuseAroma function with the array variables
    diffuseAroma(var1, var2, var3);

    res.send(`Variables received and processed: ${var1}, ${var2}, ${var3}`);
});


const interfaces = os.networkInterfaces();
let ipAddress = '';

for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
        if (alias.family === 'IPv4' && !alias.internal && alias.address.startsWith('192.168.')) {
            ipAddress = alias.address;
            break;
        }
    }
}

https.createServer(options, appclient).listen(port2, '0.0.0.0', () => {
    console.log(`HTTPS Server running at https://${ipAddress}:${port2}/`);
});




// Define the diffuseAroma function
let lastCallTime = 0;
function diffuseAroma(channels, intensities, durations) {
    const now = Date.now();
    if (now - lastCallTime < 500) {
        return; // Cooldown period of 0.5 seconds
    }
    lastCallTime = now;

    const url = 'http://asn3a01177.local:1003/as2/diffuse';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channels: channels,
            intensities: intensities,
            durations: durations,
            booster: true
        })
    };

    // Fetch request to send the data
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
}

diffuseAroma([6], [100], [100]);
