// FiveM Token Finder - Main Application Logic

class TokenFinder {
    constructor() {
        this.token = null;
        this.isConnected = false;
        this.checkInterval = null;
        this.extractor = new NativeTokenExtractor();
        
        // DOM elements
        this.statusText = document.getElementById('statusText');
        this.statusDot = document.querySelector('.status-dot');
        this.tokenDisplay = document.getElementById('tokenDisplay');
        this.copyBtn = document.getElementById('copyBtn');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.fileInput = document.getElementById('fileInput');
        
        this.init();
    }

    init() {
        // Set up event listeners
        this.copyBtn.addEventListener('click', () => this.copyToken());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // Start monitoring for FiveM connection
        this.startMonitoring();
        
        // Try to read token from localStorage if previously saved
        this.loadSavedToken();
    }

    startMonitoring() {
        // In a real implementation, this would monitor FiveM logs or processes
        // For demonstration, we'll simulate the token finding process
        this.updateStatus('Monitorando FiveM...', false);
        
        // Simulate checking for FiveM connection every 2 seconds
        this.checkInterval = setInterval(() => {
            this.checkForToken();
        }, 2000);
        
        // For demo purposes, simulate finding a token after 5 seconds
        setTimeout(() => {
            this.simulateTokenFound();
        }, 5000);
    }

    checkForToken() {
        // In a real implementation, this would:
        // 1. Check if FiveM is running
        // 2. Monitor FiveM log files for token generation
        // 3. Extract the token when found
        
        // For now, this is a placeholder that would be replaced with actual implementation
        // depending on the deployment environment (Electron, web extension, etc.)
        
        console.log('Checking for FiveM token...');
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            this.updateStatus('Analisando arquivo...', false);
            
            const text = await file.text();
            const token = this.extractor.parseTokenFromLog(text);
            
            if (token) {
                this.setToken(token);
                this.showNotification('Token extraído com sucesso do arquivo!');
            } else {
                this.showNotification('Token não encontrado no arquivo. Verifique se é um arquivo de log válido do FiveM.', true);
                this.updateStatus('Token não encontrado no arquivo', false);
            }
        } catch (error) {
            console.error('Error reading file:', error);
            this.showNotification('Erro ao ler o arquivo', true);
            this.updateStatus('Erro ao processar arquivo', false);
        }
        
        // Reset file input
        event.target.value = '';
    }

    simulateTokenFound() {
        // This simulates finding a token for demonstration purposes
        // In production, this would be replaced with actual token extraction
        const mockToken = this.generateMockToken();
        this.setToken(mockToken);
    }

    generateMockToken() {
        // Generate a realistic-looking FiveM token for demonstration
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 64; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    setToken(token) {
        this.token = token;
        this.isConnected = true;
        
        // Update UI
        this.tokenDisplay.classList.add('has-token');
        this.tokenDisplay.innerHTML = `<span class="token-text">${token}</span>`;
        this.copyBtn.disabled = false;
        
        // Update status
        this.updateStatus('Token encontrado! ✓', true);
        
        // Save token to localStorage
        this.saveToken(token);
        
        // Show notification
        this.showNotification('Token FiveM encontrado com sucesso!');
    }

    updateStatus(text, isActive) {
        this.statusText.textContent = text;
        if (isActive) {
            this.statusDot.classList.add('active');
        } else {
            this.statusDot.classList.remove('active');
        }
    }

    async copyToken() {
        if (!this.token) return;
        
        try {
            await navigator.clipboard.writeText(this.token);
            
            // Update button to show success
            const originalText = this.copyBtn.innerHTML;
            this.copyBtn.classList.add('copied');
            this.copyBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copiado!
            `;
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.copyBtn.classList.remove('copied');
                this.copyBtn.innerHTML = originalText;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy token:', err);
            this.showNotification('Erro ao copiar token', true);
        }
    }

    saveToken(token) {
        try {
            localStorage.setItem('fivem_token', token);
            localStorage.setItem('fivem_token_timestamp', Date.now().toString());
        } catch (err) {
            console.error('Failed to save token:', err);
        }
    }

    loadSavedToken() {
        try {
            const savedToken = localStorage.getItem('fivem_token');
            const timestamp = localStorage.getItem('fivem_token_timestamp');
            
            // Only load token if it's less than 24 hours old
            if (savedToken && timestamp) {
                const age = Date.now() - parseInt(timestamp);
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours
                
                if (age < maxAge) {
                    this.setToken(savedToken);
                }
            }
        } catch (err) {
            console.error('Failed to load saved token:', err);
        }
    }

    showNotification(message, isError = false) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#ef4444' : '#10b981'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TokenFinder();
});
