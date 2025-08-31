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
function shareOnWhatsApp() {
    if (!currentCard.firstName) {
        alert('Please generate your business card first!');
        return;
    }

    // Create a formatted message
    let message = `✨ *Digital Business Card*\n\n`;
    message += `👤 *${currentCard.firstName} ${currentCard.lastName}*\n`;
    
    if (currentCard.jobTitle) message += `💼 ${currentCard.jobTitle}\n`;
    if (currentCard.company) message += `🏢 ${currentCard.company}\n`;
    message += `\n📬 *Contact Information*\n`;
    message += `📧 Email: ${currentCard.email}\n`;
    message += `📱 Phone: ${currentCard.phone}\n`;
    
    if (currentCard.website || currentCard.linkedin || currentCard.instagram) {
        message += `\n🌐 *Social Media*\n`;
        if (currentCard.website) {
            let website = currentCard.website;
            if (!website.startsWith('http')) {
                website = 'https://' + website;
            }
            message += `🔗 Website: ${website}\n`;
        }
        if (currentCard.linkedin) {
            let linkedin = currentCard.linkedin;
            if (!linkedin.startsWith('http')) {
                linkedin = 'https://' + linkedin;
            }
            message += `💼 LinkedIn: ${linkedin}\n`;
        }
        if (currentCard.instagram) {
            let instagram = currentCard.instagram.startsWith('@') ? currentCard.instagram : `@${currentCard.instagram}`;
            message += `📷 Instagram: ${instagram}\n`;
        }
    }
    
    if (currentCard.address) message += `\n📍 Address: ${currentCard.address}\n`;
    
    message += `\n💾 *Save my contact by scanning the QR code*\n`;
    message += `🔗 Digital Card: ${window.location.href}`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
