// Global variables
let currentURLData = {};
let currentCardData = {};
let urlQRBlob = null;
let cardQRBlob = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
initializeEventListeners();
loadSavedData();
});

// Initialize event listeners
function initializeEventListeners() {
// URL form submission
document.getElementById('url-form').addEventListener('submit', function(e) {
e.preventDefault();
generateURLQR();
});

// Card form submission
document.getElementById('card-form').addEventListener('submit', function(e) {
e.preventDefault();
generateBusinessCard();
});
}

// Tab switching
function switchTab(tab) {
// Update tab buttons
document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
document.getElementById(`${tab}-tab`).classList.add('active');
// Update content sections
document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
document.getElementById(`${tab}-section`).classList.add('active');
}

// Update URL form based on type
function updateURLForm() {
const urlType = document.getElementById('urlType').value;
const urlLabel = document.getElementById('urlLabel');
const urlInput = document.getElementById('urlInput');
const urlHelp = document.getElementById('urlHelp');
switch(urlType) {
case 'menu':
urlLabel.textContent = 'Menu URL';
urlInput.placeholder = 'https://restaurant.com/menu';
urlHelp.textContent = 'Enter your online menu URL';
break;
case 'location':
urlLabel.textContent = 'Maps/Location URL';
urlInput.placeholder = 'https://maps.google.com/...';
urlHelp.textContent = 'Enter Google Maps or location URL';
break;
case 'website':
urlLabel.textContent = 'Website URL';
urlInput.placeholder = 'https://www.example.com';
urlHelp.textContent = 'Enter your website URL';
break;
case 'custom':
urlLabel.textContent = 'Custom URL';
urlInput.placeholder = 'https://...';
urlHelp.textContent = 'Enter any valid URL';
break;
}
}

// Generate URL QR Code
function generateURLQR() {
// Collect form data
currentURLData = {
type: document.getElementById('urlType').value,
businessName: document.getElementById('businessName').value,
url: document.getElementById('urlInput').value,
description: document.getElementById('urlDescription').value
};
// Validate URL
if (!currentURLData.url.startsWith('http')) {
currentURLData.url = 'https://' + currentURLData.url;
}
// Save to localStorage
localStorage.setItem('urlData', JSON.stringify(currentURLData));
// Generate QR image
createURLQRImage();
}

// Create URL QR Image
function createURLQRImage() {
const canvas = document.getElementById('urlQRCanvas');
const ctx = canvas.getContext('2d');
// Set canvas size
canvas.width = 400;
canvas.height = 450;
// Background gradient based on type
let gradient;
switch(currentURLData.type) {
case 'menu':
gradient = ctx.createLinearGradient(0, 0, 400, 450);
gradient.addColorStop(0, '#f97316');
gradient.addColorStop(1, '#ea580c');
break;
case 'location':
gradient = ctx.createLinearGradient(0, 0, 400, 450);
gradient.addColorStop(0, '#10b981');
gradient.addColorStop(1, '#059669');
break;
default:
gradient = ctx.createLinearGradient(0, 0, 400, 450);
gradient.addColorStop(0, '#3b82f6');
gradient.addColorStop(1, '#1e40af');
}
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 450);
// White card
ctx.fillStyle = 'white';
roundRect(ctx, 20, 20, 360, 410, 15);
ctx.fill();
// Icon and title
const icons = {
website: '🌐',
menu: '🍽️',
location: '📍',
custom: '🔗'
};
ctx.font = '32px Arial';
ctx.textAlign = 'center';
ctx.fillStyle = '#1e293b';
ctx.fillText(icons[currentURLData.type], 200, 70);
// Business name
ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillText(currentURLData.businessName, 200, 110);
// Description
if (currentURLData.description) {
ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#64748b';
ctx.fillText(currentURLData.description, 200, 135);
}
// Generate QR code
const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.left = '-9999px';
document.body.appendChild(tempDiv);
new QRCode(tempDiv, {
text: currentURLData.url,
width: 220,
height: 220,
colorDark: '#1e293b',
colorLight: '#ffffff',
correctLevel: QRCode.CorrectLevel.H
});
setTimeout(() => {
const qrCanvas = tempDiv.querySelector('canvas');
if (qrCanvas) {
// Draw QR code
ctx.drawImage(qrCanvas, 90, 160);
// URL text
ctx.font = '12px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#3b82f6';
ctx.textAlign = 'center';
const displayUrl = currentURLData.url.replace(/^https?:\/\//, '').substring(0, 40);
ctx.fillText(displayUrl, 200, 400);
// Scan text
ctx.fillStyle = '#94a3b8';
ctx.fillText('Scan to visit', 200, 420);
// Convert to blob
canvas.toBlob((blob) => {
urlQRBlob = blob;
displayURLPreview();
}, 'image/png');
}
document.body.removeChild(tempDiv);
}, 100);
}

// Display URL Preview
function displayURLPreview() {
document.getElementById('url-empty-state').classList.add('hidden');
document.getElementById('url-preview').classList.remove('hidden');
showMessage('URL QR Code generated successfully!', 'success');
}

// Generate Business Card
function generateBusinessCard() {
// Collect form data
currentCardData = {
firstName: document.getElementById('firstName').value,
lastName: document.getElementById('lastName').value,
// jobTitle: document.getElementById('jobTitle').value,
// company: document.getElementById('company').value,
email: document.getElementById('email').value,
phone: document.getElementById('phone').value,
// address: document.getElementById('address').value,
//website: document.getElementById('website').value,
linkedin: document.getElementById('linkedin').value,
// instagram: document.getElementById('instagram').value
};
// Save to localStorage
localStorage.setItem('cardData', JSON.stringify(currentCardData));
// Display card preview
displayCardPreview();
// Generate QR code
generateCardQR();
// Create styled QR image
createCardQRImage();
}

// Display Card Preview
function displayCardPreview() {
// Update avatar
// const initials = `${currentCardData.firstName[0]}${currentCardData.lastName[0]}`.toUpperCase();
// document.getElementById('avatar-initials').textContent = initials;
// // Update info
 document.getElementById('display-name').textContent =`${currentCardData.firstName} ${currentCardData.lastName}`;
// document.getElementById('display-title').textContent = currentCardData.jobTitle || '---';
// document.getElementById('display-company').textContent = currentCardData.company || '---';
// document.getElementById('display-email').textContent = currentCardData.email;
// document.getElementById('display-phone').textContent = currentCardData.phone;
// Optional fields
// const optionalFields = ['website', 'linkedin', 'instagram'];
//const optionalFields = ['linkedin'];
// optionalFields.forEach(field => {
// const item = document.getElementById(`${field}-item`);
// const display = document.getElementById(`display-${field}`);
if (currentCardData.linkedin) {
//currentCardData.linkedin.style.display = 'flex';
//display.textContent = currentCardData.linkedin;
} else {
//item.style.display = 'none';
}
// });
// Show preview
document.getElementById('card-empty-state').classList.add('hidden');
document.getElementById('card-preview').classList.remove('hidden');
}

// Generate Card QR
function generateCardQR() {
const qrContainer = document.getElementById('qrcode');
qrContainer.innerHTML = '';
const vCardData = generateVCardData(currentCardData);
new QRCode(qrContainer, {
text: vCardData,
width: 250,
height: 250,
colorDark: '#1e293b',
colorLight: '#ffffff',
correctLevel: QRCode.CorrectLevel.H
});
}

// Generate vCard Data
function generateVCardData(card) {
let vCard = 'BEGIN:VCARD\n';
vCard += 'VERSION:3.0\n';
vCard += `FN:${card.firstName} ${card.lastName}\n`;
vCard += `N:${card.lastName};${card.firstName};;;\n`;
if (card.jobTitle) vCard += `TITLE:${card.jobTitle}\n`;
if (card.company) vCard += `ORG:${card.company}\n`;
vCard += `EMAIL:${card.email}\n`;
vCard += `TEL:${card.phone}\n`;
if (card.linkedin) vCard += `URL:${card.linkedin}\n`;
if (card.address) vCard += `ADR:;;${card.address};;;;\n`;
vCard += 'END:VCARD';
return vCard;
}

// Create Card QR Image
function createCardQRImage() {
const canvas = document.getElementById('cardQRCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;
// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 400, 500);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 500);
// White card
ctx.fillStyle = 'white';
roundRect(ctx, 20, 20, 360, 460, 15);
ctx.fill();
// Title
ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.textAlign = 'center';
ctx.fillStyle = '#1e293b';
ctx.fillText(`Socials of ${currentCardData.firstName}`, 200, 70);
// Subtitle
ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#64748b';
ctx.fillText('Scan to save contact', 200, 95);
// Generate QR
const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.left = '-9999px';
document.body.appendChild(tempDiv);
const vCardData = generateVCardData(currentCardData);
new QRCode(tempDiv, {
text: vCardData,
width: 240,
height: 240,
colorDark: '#1e293b',
colorLight: '#ffffff',
correctLevel: QRCode.CorrectLevel.H
});
setTimeout(() => {
const qrCanvas = tempDiv.querySelector('canvas');
if (qrCanvas) {
// Draw QR
ctx.drawImage(qrCanvas, 80, 120);
// Contact info
let yPos = 380;
ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#1e293b';
ctx.fillText(`${currentCardData.firstName} ${currentCardData.lastName}`, 200, yPos);
if (currentCardData.jobTitle) {
yPos += 25;
ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#64748b';
ctx.fillText(currentCardData.jobTitle, 200, yPos);
}
yPos += 30;
ctx.font = '13px -apple-system, BlinkMacSystemFont, Segoe UI';
ctx.fillStyle = '#475569';
ctx.fillText(`📧 ${currentCardData.email}`, 200, yPos);
yPos += 20;
ctx.fillText(`📱 ${currentCardData.phone}`, 200, yPos);
// Convert to blob
canvas.toBlob((blob) => {
cardQRBlob = blob;
showMessage('Business card generated successfully!', 'success');
}, 'image/png');
}
document.body.removeChild(tempDiv);
}, 100);
}

// Share functions
async function shareURLQR() {
if (!urlQRBlob) return;
await shareToWhatsApp(urlQRBlob, 'URL', currentURLData.businessName);
}

async function shareCardQR() {
if (!cardQRBlob) return;
await shareToWhatsApp(cardQRBlob, 'Card', currentCardData.firstName);
}

// Share to WhatsApp
async function shareToWhatsApp(blob, type, name) {
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if (isMobile && navigator.share) {
try {
const file = new File([blob], `QR_${type}_${name}.png`, { type: 'image/png' });
await navigator.share({
files: [file],
title: `QR Code - ${name}`,
text: type === 'URL' ? 'Check out our QR code!' : `Contact card for ${name}`
});
return;
} catch (err) {
console.error('Share failed:', err);
}
}
// Fallback: Download and open WhatsApp
downloadQR(blob, `QR_${type}_${name}`);
setTimeout(() => {
const message = type === 'URL'
? `Check out our QR code for ${name}!`
: `Here's my digital business card!`;
const encoded = encodeURIComponent(message);
if (isMobile) {
window.location.href = `whatsapp://send?text=${encoded}`;
} else {
window.open(`https://web.whatsapp.com/send?text=${encoded}`, '_blank');
}
}, 500);
}

// Download functions
function downloadURLQR() {
if (urlQRBlob) {
downloadQR(urlQRBlob, `QR_URL_${currentURLData.businessName}`);
}
}

function downloadCardQR() {
if (cardQRBlob) {
downloadQR(cardQRBlob, `QR_Card_${currentCardData.firstName}`);
}
}

function downloadQR(blob, filename) {
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `${filename}_${Date.now()}.png`;
a.click();
URL.revokeObjectURL(url);
showMessage('QR Code downloaded!', 'success');
}

// Load saved data
function loadSavedData() {
const urlData = localStorage.getItem('urlData');
const cardData = localStorage.getItem('cardData');
if (urlData) {
const data = JSON.parse(urlData);
document.getElementById('urlType').value = data.type || 'website';
document.getElementById('businessName').value = data.businessName || '';
document.getElementById('urlInput').value = data.url || '';
document.getElementById('urlDescription').value = data.description || '';
}
if (cardData) {
const data = JSON.parse(cardData);
Object.keys(data).forEach(key => {
const element = document.getElementById(key);
if (element) element.value = data[key] || '';
});
}
}

// Show message
function showMessage(text, type) {
const message = document.getElementById('message');
message.textContent = text;
message.className = `message ${type}`;
message.style.display = 'block';
setTimeout(() => {
message.style.display = 'none';
}, 3000);
}

// Helper function for rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
ctx.beginPath();
ctx.moveTo(x + radius, y);
ctx.lineTo(x + width - radius, y);
ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
ctx.lineTo(x + width, y + height - radius);
ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
ctx.lineTo(x + radius, y + height);
ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
ctx.lineTo(x, y + radius);
ctx.quadraticCurveTo(x, y, x + radius, y);
ctx.closePath();
}

// Export functions
window.switchTab = switchTab;
window.updateURLForm = updateURLForm;
window.shareURLQR = shareURLQR;
window.shareCardQR = shareCardQR;
window.downloadURLQR = downloadURLQR;
window.downloadCardQR = downloadCardQR;
