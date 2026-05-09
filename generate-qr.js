const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Generate QR code as PNG file
const websiteUrl = 'http://isitagoodtimetocall.com/';
const outputPath = path.join(__dirname, 'qr-code.png');

QRCode.toFile(outputPath, websiteUrl, {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  width: 300,
  margin: 1,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  console.log('✅ QR code successfully generated!');
  console.log(`📍 Location: ${outputPath}`);
  console.log(`🌐 URL encoded: ${websiteUrl}`);
  console.log('\nYou can now:');
  console.log('  • Use qr-code.png in your ads and marketing materials');
  console.log('  • Print it for physical locations');
  console.log('  • Embed it in documents, books, or anywhere else!');
});
