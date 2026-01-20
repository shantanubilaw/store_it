const https = require('https');

const projectId = '69655e480019f3f95980';
const apiKey = 'standard_1c04f8f2a09de83b97b27f4605dad445643ee3b52ac2a1f513b67bdcf8ed51c67f13541d8c6a8a455ef0dbecb9af916c0f5aea107b272dd08b45208e2ab2429e210ba9f4a1efb1deae109e816e5abcfe865e4c4f9033113e370c93706cba8ad52cb639401976de7dfd3e3a3eb7b6802c12229c6e023a38786bd06ce89d7abd53';

const endpoints = [
  'https://cloud.appwrite.io/v1',
  'https://us.appwrite.io/v1',
  'https://eu.appwrite.io/v1',
  'https://asia.appwrite.io/v1'
];

async function checkEndpoint(endpoint) {
  return new Promise((resolve) => {
    const url = new URL(endpoint + '/health');
    const options = {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ endpoint, status: res.statusCode, success: res.statusCode === 200 });
      });
    });
    
    req.on('error', (error) => {
      resolve({ endpoint, error: error.message, success: false });
    });
    
    req.end();
  });
}

async function main() {
  console.log('Testing Appwrite endpoints...\n');
  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint);
    if (result.success) {
      console.log(`✅ WORKING: ${result.endpoint}`);
    } else {
      console.log(`❌ Failed: ${result.endpoint} - ${result.error || 'Status ' + result.status}`);
    }
  }
}

main();
