// Global variables
let currentCard = {};
let qrImageBlob = null;
let qrCodeDataURL = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Form submission
    document.getElementById('card-form').addEventListener('submit', function(e) {
        e.preventDefault();
        generateCard();
    });

    // Real-time form updates for live preview
    const formInputs = document.querySelectorAll('#card-form input');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Auto-save and preview as user types
            if (document.getElementById('firstName').value && 
                document.getElementById('email').value && 
                document.getElementById('phone').value) {
                generateCard();
            }
        });
    });
}

// Generate business card
function generateCard() {
    // Collect form data
    currentCard = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        linkedin: document.getElementById('linkedin').value,
        instagram: document.getElementById('instagram').value,
        address: document.getElementById('address').value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('myCard', JSON.stringify(currentCard));

    // Display the card
    displayCard(currentCard);

    // Generate QR code
    generateQRCode();

    // Show card display and hide empty state
    document.getElementById('card-display').classList.remove('hidden');
    document.getElementById('empty-state').classList.add('hidden');
}

// Display business card
function displayCard(card) {
    // Set avatar initials
    const initials = `${card.firstName[0]}${card.lastName[0]}`.toUpperCase();
    document.getElementById('avatar-initials').textContent = initials;

    // Set card information
    document.getElementById('display-name').textContent = `${card.firstName} ${card.lastName}`;
    document.getElementById('display-title').textContent = card.jobTitle || '';
    document.getElementById('display-company').textContent = card.company || '';
    document.getElementById('display-email').textContent = card.email;
    document.getElementById('display-phone').textContent = card.phone;

    // Optional fields
    if (card.website) {
        let websiteDisplay = card.website.replace(/^https?:\/\//, '');
        document.getElementById('display-website').textContent = websiteDisplay;
        document.getElementById('website-item').style.display = 'flex';
    } else {
        document.getElementById('website-item').style.display = 'none';
    }

    if (card.linkedin) {
        let linkedinDisplay = card.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '');
        document.getElementById('display-linkedin').textContent = linkedinDisplay;
        document.getElementById('linkedin-item').style.display = 'flex';
    } else {
        document.getElementById('linkedin-item').style.display = 'none';
    }

    if (card.instagram) {
        let instagramDisplay = card.instagram.startsWith('@') ? card.instagram : `@${card.instagram}`;
        document.getElementById('display-instagram').textContent = instagramDisplay;
        document.getElementById('instagram-item').style.display = 'flex';
    } else {
        document.getElementById('instagram-item').style.display = 'none';
    }

    if (card.address) {
        document.getElementById('display-address').textContent = card.address;
        document.getElementById('address-item').style.display = 'flex';
    } else {
        document.getElementById('address-item').style.display = 'none';
    }
}

// Generate QR Code
function generateQRCode() {
    // Clear existing QR code
    document.getElementById('qrcode').innerHTML = '';

    // Create vCard data
    const vCardData = generateVCardData(currentCard);

    // Generate QR code with smaller size
    new QRCode(document.getElementById('qrcode'), {
        text: vCardData,
        width: 120,
        height: 120,
        colorDark: '#1e293b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Generate vCard data
function generateVCardData(card) {
    let vCard = 'BEGIN:VCARD\n';
    vCard += 'VERSION:3.0\n';
    vCard += `FN:${card.firstName} ${card.lastName}\n`;
    vCard += `N:${card.lastName};${card.firstName};;;\n`;
    if (card.jobTitle) vCard += `TITLE:${card.jobTitle}\n`;
    if (card.company) vCard += `ORG:${card.company}\n`;
    vCard += `EMAIL:${card.email}\n`;
    vCard += `TEL:${card.phone}\n`;
    if (card.website) {
        let website = card.website;
        if (!website.startsWith('http')) {
            website = 'https://' + website;
        }
        vCard += `URL:${website}\n`;
    }
    if (card.linkedin) {
        let linkedin = card.linkedin;
        if (!linkedin.startsWith('http')) {
            linkedin = 'https://' + linkedin;
        }
        vCard += `URL:${linkedin}\n`;
    }
    if (card.instagram) {
        let instagram = card.instagram.replace('@', '');
        vCard += `URL:https://instagram.com/${instagram}\n`;
    }
    if (card.address) vCard += `ADR:;;${card.address};;;;\n`;
    vCard += 'END:VCARD';
    return vCard;
}

// Create styled QR code image with heading
function createStyledQRImage(callback) {
    // Create a canvas for the styled image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const canvasWidth = 400;
    const canvasHeight = 500;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Add white card background
    ctx.fillStyle = 'white';
    ctx.roundRect(20, 20, canvasWidth - 40, canvasHeight - 40, 15);
    ctx.fill();
    
    // Add heading
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(`Socials of ${currentCard.firstName}`, canvasWidth / 2, 70);
    
    // Add subtitle
    ctx.font = '16px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Scan to save contact', canvasWidth / 2, 100);
    
    // Create temporary div for QR code generation
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    // Generate high-quality QR code
    const vCardData = generateVCardData(currentCard);
    new QRCode(tempDiv, {
        text: vCardData,
        width: 250,
        height: 250,
        colorDark: '#1e293b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Wait for QR code to be generated
    setTimeout(() => {
        const qrCanvas = tempDiv.querySelector('canvas');
        if (qrCanvas) {
            // Draw QR code centered
            const qrX = (canvasWidth - 250) / 2;
            const qrY = 130;
            
            // Add shadow for QR code
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            
            // Draw QR code
            ctx.drawImage(qrCanvas, qrX, qrY);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            
            // Add contact info below QR code
            ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'center';
            
            let yPos = qrY + 270;
            
            // Add name and title
            ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
            ctx.fillStyle = '#1e293b';
            ctx.fillText(`${currentCard.firstName} ${currentCard.lastName}`, canvasWidth / 2, yPos);
            
            if (currentCard.jobTitle) {
                yPos += 25;
                ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
                ctx.fillStyle = '#64748b';
                ctx.fillText(currentCard.jobTitle, canvasWidth / 2, yPos);
            }
            
            // Add social icons and links
            yPos += 35;
            ctx.font = '13px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
            ctx.fillStyle = '#475569';
            
            if (currentCard.email) {
                ctx.fillText(`📧 ${currentCard.email}`, canvasWidth / 2, yPos);
                yPos += 20;
            }
            
            if (currentCard.phone) {
                ctx.fillText(`📱 ${currentCard.phone}`, canvasWidth / 2, yPos);
                yPos += 20;
            }
            
            if (currentCard.linkedin) {
                let linkedinDisplay = currentCard.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '');
                ctx.fillText(`💼 LinkedIn: ${linkedinDisplay}`, canvasWidth / 2, yPos);
                yPos += 20;
            }
            
            if (currentCard.instagram) {
                let instagramDisplay = currentCard.instagram.startsWith('@') ? currentCard.instagram : `@${currentCard.instagram}`;
                ctx.fillText(`📷 ${instagramDisplay}`, canvasWidth / 2, yPos);
            }
            
            // Convert canvas to blob
            canvas.toBlob((blob) => {
                qrImageBlob = blob;
                qrCodeDataURL = canvas.toDataURL('image/png');
                if (callback) callback(blob, qrCodeDataURL);
            }, 'image/png');
        }
        
        // Clean up
        document.body.removeChild(tempDiv);
    }, 100);
}

// Share on WhatsApp with QR image
async function shareOnWhatsApp() {
    if (!currentCard.firstName) {
        alert('Please generate your business card first!');
        return;
    }

    // Show loading state (optional)
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';
    btn.disabled = true;

    // Create styled QR image
    createStyledQRImage(async (blob, dataURL) => {
        // Restore button
        btn.innerHTML = originalText;
        btn.disabled = false;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Try to share using Web Share API (mobile)
        if (isMobile && navigator.share) {
            try {
                const file = new File([blob], `Socials_${currentCard.firstName}.png`, { 
                    type: 'image/png',
                    lastModified: Date.now()
                });
                
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: `Socials of ${currentCard.firstName}`,
                        text: `Contact card for ${currentCard.firstName} ${currentCard.lastName}`
                    });
                    return;
                }
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
        
        // Fallback: Download image and open WhatsApp
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `Socials_${currentCard.firstName}_${Date.now()}.png`;
        link.click();
        
        // Create WhatsApp message
        let message = `✨ *Digital Business Card*\n\n`;
        message += `👤 *${currentCard.firstName} ${currentCard.lastName}*\n`;
        if (currentCard.jobTitle) message += `💼 ${currentCard.jobTitle}\n`;
        if (currentCard.company) message += `🏢 ${currentCard.company}\n`;
        message += `\n📱 Contact saved in QR code - please check your downloads for the image!\n`;
        message += `\n🔗 Digital Card: ${window.location.href}`;
        
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp
        setTimeout(() => {
            if (isMobile) {
                window.location.href = `whatsapp://send?text=${encodedMessage}`;
            } else {
                window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
            }
        }, 500);
    });
}

// Copy details to clipboard
function copyToClipboard() {
    if (!currentCard.firstName) {
        alert('Please generate your business card first!');
        return;
    }

    let details = `${currentCard.firstName} ${currentCard.lastName}\n`;
    if (currentCard.jobTitle) details += `${currentCard.jobTitle}\n`;
    if (currentCard.company) details += `${currentCard.company}\n`;
    details += `\nContact Information:\n`;
    details += `Email: ${currentCard.email}\n`;
    details += `Phone: ${currentCard.phone}\n`;
    if (currentCard.website || currentCard.linkedin || currentCard.instagram) {
        details += `\nSocial Media:\n`;
        if (currentCard.website) details += `Website: ${currentCard.website}\n`;
        if (currentCard.linkedin) details += `LinkedIn: ${currentCard.linkedin}\n`;
        if (currentCard.instagram) {
            let instagram = currentCard.instagram.startsWith('@') ? currentCard.instagram : `@${currentCard.instagram}`;
            details += `Instagram: ${instagram}\n`;
        }
    }
    if (currentCard.address) details += `\nAddress: ${currentCard.address}\n`;

    navigator.clipboard.writeText(details)
        .then(() => {
            // Show success feedback
            const btn = event.target.closest('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="btn-icon">✅</span> Copied!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        })
        .catch(err => console.error('Could not copy text: ', err));
}

// Load from Local Storage
function loadFromLocalStorage() {
    const savedCard = localStorage.getItem('myCard');
    if (savedCard) {
        currentCard = JSON.parse(savedCard);
        // Pre-fill form
        document.getElementById('firstName').value = currentCard.firstName || '';
        document.getElementById('lastName').value = currentCard.lastName || '';
        document.getElementById('jobTitle').value = currentCard.jobTitle || '';
        document.getElementById('company').value = currentCard.company || '';
        document.getElementById('email').value = currentCard.email || '';
        document.getElementById('phone').value = currentCard.phone || '';
        document.getElementById('website').value = currentCard.website || '';
        document.getElementById('linkedin').value = currentCard.linkedin || '';
        document.getElementById('instagram').value = currentCard.instagram || '';
        document.getElementById('address').value = currentCard.address || '';
        
        // Display the card
        displayCard(currentCard);
        generateQRCode();
        document.getElementById('card-display').classList.remove('hidden');
        document.getElementById('empty-state').classList.add('hidden');
    }
}

// Add roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}
