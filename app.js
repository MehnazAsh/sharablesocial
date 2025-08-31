// Global variables
let currentCard = {};

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

// Share on WhatsApp
// function shareOnWhatsApp() {
//     if (!currentCard.firstName) {
//         alert('Please generate your business card first!');
//         return;
//     }

//     // Create a formatted message
//     let message = `✨ *Digital Business Card*\n\n`;
//     message += `👤 *${currentCard.firstName} ${currentCard.lastName}*\n`;
    
//     if (currentCard.jobTitle) message += `💼 ${currentCard.jobTitle}\n`;
//     if (currentCard.company) message += `🏢 ${currentCard.company}\n`;
//     message += `\n📬 *Contact Information*\n`;
//     message += `📧 Email: ${currentCard.email}\n`;
//     message += `📱 Phone: ${currentCard.phone}\n`;
    
//     if (currentCard.website || currentCard.linkedin || currentCard.instagram) {
//         message += `\n🌐 *Social Media*\n`;
//         if (currentCard.website) {
//             let website = currentCard.website;
//             if (!website.startsWith('http')) {
//                 website = 'https://' + website;
//             }
//             message += `🔗 Website: ${website}\n`;
//         }
//         if (currentCard.linkedin) {
//             let linkedin = currentCard.linkedin;
//             if (!linkedin.startsWith('http')) {
//                 linkedin = 'https://' + linkedin;
//             }
//             message += `💼 LinkedIn: ${linkedin}\n`;
//         }
//         if (currentCard.instagram) {
//             let instagram = currentCard.instagram.startsWith('@') ? currentCard.instagram : `@${currentCard.instagram}`;
//             message += `📷 Instagram: ${instagram}\n`;
//         }
//     }
    
//     if (currentCard.address) message += `\n📍 Address: ${currentCard.address}\n`;
    
//     message += `\n💾 *Save my contact by scanning the QR code*\n`;
//     message += `🔗 Digital Card: ${window.location.href}`;

//     // Encode the message for WhatsApp URL
//     const encodedMessage = encodeURIComponent(message);
    
//     // Open WhatsApp with pre-filled message
//     const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
//     window.open(whatsappUrl, '_blank');
// }

// New function: Drop into WhatsApp with vertical business card
function dropIntoWhatsApp() {
    // Generate the vertical business card message
    const verticalCard = generateVerticalBusinessCard();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(verticalCard);
    
    // Check if on mobile or desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
        // Mobile: Open WhatsApp app directly
        whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
    } else {
        // Desktop: Open WhatsApp Web
        whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    }
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Generate vertical business card format for WhatsApp
function generateVerticalBusinessCard() {
    const card = currentCard;
    
    // Create vertical card with details at top and QR representation at bottom
    let message = `┌─────────────────────┐\n`;
    message += `│   *BUSINESS CARD*   │\n`;
    message += `└─────────────────────┘\n\n`;
    
    // Profile section with photo emoji if photo exists
    if (card.photo) {
        message += `       👤\n`;
    } else {
        message += `       ${card.firstName[0]}${card.lastName[0]}\n`;
    }
    
    // Name (centered-ish with spaces)
    message += `   *${card.firstName} ${card.lastName}*\n`;
    
    // Title and Company
    if (card.jobTitle || card.company) {
        message += `   ─────────────\n`;
        if (card.jobTitle) {
            message += `   ${card.jobTitle}\n`;
        }
        if (card.company) {
            message += `   ${card.company}\n`;
        }
    }
    
    message += `\n`;
    message += `╔═══════════════════╗\n`;
    message += `║  CONTACT DETAILS  ║\n`;
    message += `╚═══════════════════╝\n\n`;
    
    // Contact details
    message += `📧 *Email:*\n${card.email}\n\n`;
    message += `📱 *Phone:*\n${card.phone}\n\n`;
    
    // Optional fields
    if (card.website) {
        message += `🌐 *Website:*\n${card.website}\n\n`;
    }
    
    if (card.linkedin) {
        const linkedinUsername = card.linkedin.split('/').pop();
        message += `💼 *LinkedIn:*\n@${linkedinUsername}\n\n`;
    }
    
    if (card.address) {
        message += `📍 *Address:*\n${card.address}\n\n`;
    }
    
    // QR Code section at bottom
    message += `╔═══════════════════╗\n`;
    message += `║    QR CODE 📱     ║\n`;
    message += `╠═══════════════════╣\n`;
    message += `║  ████████████████ ║\n`;
    message += `║  ██▄▄▄▄▄▄▄▄▄▄▄▄██ ║\n`;
    message += `║  ██ ▄▄▄▄▄▄▄▄▄  ██ ║\n`;
    message += `║  ██ █████████  ██ ║\n`;
    message += `║  ██ ▄▄▄▄▄▄▄▄▄  ██ ║\n`;
    message += `║  ██▄▄▄▄▄▄▄▄▄▄▄▄██ ║\n`;
    message += `║  ████████████████ ║\n`;
    message += `╚═══════════════════╝\n`;
    message += `  _Scan to save contact_\n\n`;
    
    // Footer
    message += `─────────────────\n`;
    message += `💳 Created with DigiCard\n`;
    message += `🔗 ${window.location.href}`;
    
    return message;
}

// Alternative: More stylized vertical card
function generateStylizedVerticalCard() {
    const card = currentCard;
    
    let message = `✨ *DIGITAL BUSINESS CARD* ✨\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Profile Section
    message += `        👤\n`;
    message += `  *${card.firstName} ${card.lastName}*\n`;
    
    if (card.jobTitle) {
        message += `  ${card.jobTitle}\n`;
    }
    if (card.company) {
        message += `  @${card.company}\n`;
    }
    
    message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Contact Information
    message += `📞 *CONTACT INFO*\n\n`;
    
    message += `📧 Email:\n`;
    message += `└ ${card.email}\n\n`;
    
    message += `📱 Phone:\n`;
    message += `└ ${card.phone}\n\n`;
    
    if (card.website) {
        message += `🌐 Website:\n`;
        message += `└ ${card.website}\n\n`;
    }
    
    if (card.linkedin) {
        message += `💼 LinkedIn:\n`;
        message += `└ ${card.linkedin}\n\n`;
    }
    
    if (card.address) {
        message += `📍 Location:\n`;
        message += `└ ${card.address}\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // QR Code Visual
    message += `📱 *SCAN QR CODE*\n\n`;
    message += `    ▄▄▄▄▄▄▄▄▄▄▄▄▄\n`;
    message += `    █ ▄▄▄▄▄▄▄▄▄ █\n`;
    message += `    █ █▀▀▀▀▀▀▀█ █\n`;
    message += `    █ █ █▀▀▀█ █ █\n`;
    message += `    █ █ █▀▀▀█ █ █\n`;
    message += `    █ █▄▄▄▄▄▄▄█ █\n`;
    message += `    █▄▄▄▄▄▄▄▄▄▄▄█\n\n`;
    
    message += `💾 _Save to contacts instantly_\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Shared via DigiCard 📇`;
    
    return message;
}

// Enhanced version with better formatting
function generateEnhancedVerticalCard() {
    const card = currentCard;
    const initials = `${card.firstName[0]}${card.lastName[0]}`.toUpperCase();
    
    let message = `╭──────────────────────╮\n`;
    message += `│  📇 BUSINESS CARD 📇  │\n`;
    message += `╰──────────────────────╯\n\n`;
    
    // Avatar and Name Section
    message += `        【${initials}】\n`;
    message += `    *${card.firstName} ${card.lastName}*\n`;
    
    // Professional Info
    if (card.jobTitle || card.company) {
        message += `    ···············\n`;
        if (card.jobTitle) {
            message += `     ${card.jobTitle}\n`;
        }
        if (card.company) {
            message += `     ${card.company}\n`;
        }
    }
    
    message += `\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n`;
    
    // Contact Details Section
    message += `📮 *CONTACT DETAILS*\n\n`;
    
    // Email
    message += `📧 *Email*\n`;
    message += `   ${card.email}\n\n`;
    
    // Phone
    message += `📱 *Phone*\n`;
    message += `   ${card.phone}\n\n`;
    
    // Optional fields with better formatting
    if (card.website) {
        message += `🌐 *Website*\n`;
        message += `   ${card.website.replace(/^https?:\/\//, '')}\n\n`;
    }
    
    if (card.linkedin) {
        message += `💼 *LinkedIn*\n`;
        const linkedinProfile = card.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '');
        message += `   linkedin.com/in/${linkedinProfile}\n\n`;
    }
    
    if (card.address) {
        message += `📍 *Address*\n`;
        message += `   ${card.address}\n\n`;
    }
    
    message += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n`;
    
    // QR Code Section
    message += `🔲 *QR CODE* 🔲\n\n`;
    message += `┌─────────────────┐\n`;
    message += `│ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ │\n`;
    message += `│ ▀▄   ▄▀▄   ▄▀▀▀ │\n`;
    message += `│ ▀ ▀▄▀   ▀▄▀ ▀▀▀ │\n`;
    message += `│ ▀▀▀ █▀▀▀█ ▀▀▀▀▀ │\n`;
    message += `│ ▀▀▀ █▀▀▀█ ▀▀▀▀▀ │\n`;
    message += `│ ▀▀▀▄  ▀  ▄▀▀▀▀▀ │\n`;
    message += `│ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ │\n`;
    message += `└─────────────────┘\n`;
    message += `  📱 *Scan to Save*\n\n`;
    
    // Footer
    message += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;
    message += `✨ _Digital Card by DigiCard_\n`;
    message += `🔗 Create yours: ${window.location.origin}`;
    
    return message;
}

// Update the existing shareToWhatsApp function to use the new format
function shareToWhatsApp() {
    dropIntoWhatsApp();
}

// Optional: Let users choose between different card styles
function dropIntoWhatsAppWithStyle() {
    // Create modal for style selection
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal active';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-modal-header">
                <h3>💬 Drop into WhatsApp</h3>
                <button class="close-modal" onclick="this.closest('.whatsapp-modal').remove()">✕</button>
            </div>
            
            <div class="card-style-options">
                <h4>Choose Card Style:</h4>
                <div class="style-options">
                    <button class="style-option-btn" onclick="sendWhatsAppCard('classic')">
                        <span>📋</span>
                        <span>Classic</span>
                    </button>
                    <button class="style-option-btn" onclick="sendWhatsAppCard('stylized')">
                        <span>✨</span>
                        <span>Stylized</span>
                    </button>
                    <button class="style-option-btn" onclick="sendWhatsAppCard('enhanced')">
                        <span>💎</span>
                        <span>Enhanced</span>
                    </button>
                </div>
            </div>
            
            <div class="preview-section">
                <h4>Preview:</h4>
                <pre id="card-preview" class="message-preview-text">${generateVerticalBusinessCard()}</pre>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Send WhatsApp card with selected style
function sendWhatsAppCard(style) {
    let message;
    
    switch(style) {
        case 'classic':
            message = generateVerticalBusinessCard();
            break;
        case 'stylized':
            message = generateStylizedVerticalCard();
            break;
        case 'enhanced':
            message = generateEnhancedVerticalCard();
            break;
        default:
            message = generateVerticalBusinessCard();
    }
    
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
        whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
    } else {
        whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    }
    
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    document.querySelector('.whatsapp-modal').remove();
}

// Add function to generate actual QR code as image and send
async function dropIntoWhatsAppWithImage() {
    try {
        // First, generate the text message
        const textMessage = generateVerticalBusinessCard();
        
        // Create a canvas with the business card design
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Draw business card on canvas
        // Background
        ctx.fillStyle = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text and details
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${currentCard.firstName} ${currentCard.lastName}`, 200, 50);
        
        // Add other details...
        ctx.font = '16px Arial';
        ctx.fillText(currentCard.jobTitle || '', 200, 80);
        ctx.fillText(currentCard.company || '', 200, 100);
        
        // Contact details
        ctx.textAlign = 'left';
        ctx.font = '14px Arial';
        ctx.fillText(`📧 ${currentCard.email}`, 30, 150);
        ctx.fillText(`📱 ${currentCard.phone}`, 30, 180);
        
        // Generate QR code at bottom
        const qrCanvas = document.createElement('canvas');
        const qr = new QRious({
            element: qrCanvas,
            value: generateVCardData(currentCard),
            size: 150
        });
        
        // Draw QR code on main canvas
        ctx.drawImage(qrCanvas, 125, 400, 150, 150);
        
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
            // For mobile, try to share image directly
            if (navigator.share && blob) {
                const file = new File([blob], 'business-card.png', { type: 'image/png' });
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Business Card',
                        text: textMessage
                    });
                } catch (err) {
                    // Fallback to text-only sharing
                    dropIntoWhatsApp();
                }
            } else {
                // Fallback to text-only sharing
                dropIntoWhatsApp();
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('Error creating card image:', error);
        // Fallback to text-only sharing
        dropIntoWhatsApp();
    }
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
