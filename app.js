* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #8b5cf6;
    --whatsapp-color: #25D366;
    --whatsapp-hover: #128C7E;
    --background: #f8fafc;
    --card-bg: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-light: #94a3b8;
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-alt: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
}

.app-container {
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
}

/* Navigation - Centered */
.nav-bar {
    background: var(--card-bg);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
}

.nav-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.logo-icon {
    font-size: 2.5rem;
    background: var(--gradient-alt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-brand h1 {
    background: var(--gradient-alt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2rem;
    font-weight: 700;
}

.brand-tagline {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
}

.brand-subtitle {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 0;
}

/* Main Content Layout */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 0 2rem 2rem;
    align-items: start;
}

/* Section Headers */
.section-header {
    margin-bottom: 1.5rem;
}

.section-header h2 {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

/* Left Panel - Form */
.left-panel {
    position: sticky;
    top: 2rem;
}

.card-creator {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

/* Form Layout - All fields in 2 columns */
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1.5px solid var(--border-color);
    border-radius: 10px;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background: #fafbfc;
}

.form-group input:hover {
    border-color: var(--primary-light);
    background: var(--card-bg);
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    background: var(--card-bg);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input::placeholder {
    color: var(--text-light);
    font-size: 0.875rem;
}

/* Right Panel */
.right-panel {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-display {
    width: 100%;
    max-width: 550px; /* Reduced width */
    margin: 0 auto;
}

/* Buttons */
.btn {
    padding: 0.875rem 1.75rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
}

.btn:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.btn:hover:before {
    transform: translateX(0);
}

.btn-block {
    width: 100%;
    margin-top: 1rem;
}

.btn-primary {
    background: var(--gradient-alt);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(99, 102, 241, 0.4);
}

.btn-secondary {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    color: white;
}

.btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(100, 116, 139, 0.4);
}

.btn-whatsapp {
    background: linear-gradient(135deg, var(--whatsapp-color) 0%, var(--whatsapp-hover) 100%);
    color: white;
}

.btn-whatsapp:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(37, 211, 102, 0.4);
}

.btn-icon {
    font-size: 1.2rem;
}

/* Business Card Display - Reduced Width */
.business-card {
    background: var(--gradient);
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
    color: white;
    display: flex;
    overflow: hidden;
    margin-bottom: 2rem;
    position: relative;
    min-height: 280px; /* Reduced height */
    max-width: 100%;
}

.business-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    pointer-events: none;
}

.card-content {
    flex: 1;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;
}

/* QR Section with matching background */
.card-qr-section {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160px; /* Reduced width */
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.qr-container {
    text-align: center;
}

.qr-wrapper {
    background: rgba(255, 255, 255, 0.95);
    padding: 0.625rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
}

#qrcode canvas,
#qrcode img {
    border-radius: 8px;
    width: 120px !important; /* Smaller QR code */
    height: 120px !important;
}

.qr-label {
    margin-top: 0.75rem;
    color: rgba(255, 255, 255, 0.95);
    font-size: 0.8rem;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.875rem;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

.card-avatar {
    width: 60px; /* Reduced size */
    height: 60px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    flex-shrink: 0;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.card-info h3 {
    font-size: 1.25rem; /* Reduced size */
    margin-bottom: 0.2rem;
    font-weight: 600;
}

.card-info p {
    opacity: 0.95;
    font-size: 0.85rem; /* Reduced size */
    line-height: 1.3;
}

.card-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.85rem; /* Reduced size */
    padding: 0.2rem 0;
}

.detail-item .icon {
    font-size: 1rem;
    width: 20px;
    text-align: center;
}

/* Action section - Side by side buttons */
.action-section {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    max-width: 100%;
}

.action-section h3 {
    margin-bottom: 1.25rem;
    color: var(--text-primary);
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
}

.action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

/* Empty State */
.empty-state {
    background: var(--card-bg);
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    text-align: center;
    border: 1px solid var(--border-color);
    max-width: 550px;
    margin: 0 auto;
}

.empty-state-illustration {
    margin-bottom: 2rem;
}

.empty-card-preview {
    width: 200px;
    height: 120px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-radius: 12px;
    margin: 0 auto;
    padding: 1rem;
    position: relative;
}

.empty-card-line {
    height: 10px;
    background: #d1d5db;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.empty-card-line.short {
    width: 60%;
}

.empty-qr {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: #d1d5db;
    border-radius: 8px;
}

.empty-state h3 {
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.empty-state p {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
    color: var(--text-secondary);
}

/* Utility Classes */
.hidden {
    display: none !important;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .left-panel {
        position: static;
    }
    
    .right-panel {
        width: 100%;
    }
    
    .card-display {
        max-width: 600px;
    }
}

@media (max-width: 768px) {
    .nav-bar {
        padding: 1.5rem 1rem;
    }
    
    .nav-brand h1 {
        font-size: 1.75rem;
    }
    
    .brand-tagline {
        font-size: 1.1rem;
    }
    
    .main-content {
        padding: 0 1rem 1rem;
    }
    
    .card-creator {
        padding: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .business-card {
        flex-direction: column;
        min-height: auto;
    }
    
    .card-qr-section {
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        min-width: auto;
    }
    
    #qrcode canvas,
    #qrcode img {
        width: 140px !important;
        height: 140px !important;
    }
    
    .action-buttons {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
}

@media (max-width: 480px) {
    .logo-icon {
        font-size: 2rem;
    }
    
    .nav-brand h1 {
        font-size: 1.5rem;
    }
    
    .brand-tagline {
        font-size: 1rem;
    }
    
    .brand-subtitle {
        font-size: 0.875rem;
    }
    
    .card-content {
        padding: 1.25rem;
    }
    
    .card-avatar {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
    
    .card-info h3 {
        font-size: 1.1rem;
    }
    
    .form-group input {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }

    /* Card Style Selection Modal */
.card-style-options {
    margin: 1.5rem 0;
}

.card-style-options h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.style-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.style-option-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    background: var(--background);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.style-option-btn:hover {
    background: #25D366;
    color: white;
    border-color: #25D366;
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.style-option-btn span:first-child {
    font-size: 2rem;
}

.preview-section {
    background: var(--background);
    padding: 1rem;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
}

.preview-section h4 {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.preview-section pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    line-height: 1.4;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .style-options {
        grid-template-columns: 1fr;
    }
}

}
