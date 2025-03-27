// Classe para gerenciamento de formulário
class FormManager {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.nameInput = document.getElementById('nome');
        this.initEventListeners();
    }

    // Inicializa event listeners
    initEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.nameInput.addEventListener('input', this.validateName.bind(this));
    }

    // Valida nome em tempo real
    validateName(event) {
        const input = event.target;
        const value = input.value.trim();
        const errorSpan = document.getElementById('name-error');

        // Remove erros anteriores
        if (errorSpan) errorSpan.remove();

        if (value.length < 2) {
            this.showError(input, 'Nome deve ter pelo menos 2 caracteres');
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
            this.showError(input, 'Nome deve conter apenas letras');
        }
    }

    // Exibe erro de validação
    showError(input, message) {
        const errorSpan = document.createElement('span');
        errorSpan.id = 'name-error';
        errorSpan.classList.add('error-message');
        errorSpan.textContent = message;
        
        input.parentNode.appendChild(errorSpan);
        input.classList.add('input-error');
    }

    // Manipula submissão do formulário
    handleSubmit(event) {
        event.preventDefault();
        
        const name = this.nameInput.value.trim();
        
        if (this.validateSubmission(name)) {
            this.displaySuccess(name);
        }
    }

    // Valida submissão
    validateSubmission(name) {
        if (name.length < 2) {
            this.showError(this.nameInput, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        return true;
    }

    // Exibe mensagem de sucesso
    displaySuccess(name) {
        // Cria elemento de sucesso
        const successDiv = document.createElement('div');
        successDiv.classList.add('success-message');
        successDiv.innerHTML = `
            <h3>Olá, ${name}! 👋</h3>
            <p>Seus dados foram enviados com sucesso!</p>
        `;

        // Limpa formulário e adiciona mensagem
        this.form.innerHTML = '';
        this.form.appendChild(successDiv);

        // Animação de sucesso
        setTimeout(() => {
            successDiv.style.transform = 'scale(1)';
            successDiv.style.opacity = '1';
        }, 50);
    }
}

// Função para adicionar estilos dinâmicos
function addDynamicStyles() {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
            animation: shake 0.3s;
        }

        .input-error {
            border-color: #e74c3c !important;
        }

        .success-message {
            text-align: center;
            color: #2ecc71;
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.3s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 90% { transform: translateX(-2px); }
            20%, 80% { transform: translateX(2px); }
            30%, 50%, 70% { transform: translateX(-2px); }
            40%, 60% { transform: translateX(2px); }
        }
    `;
    document.head.appendChild(styleTag);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    new FormManager('testForm');
});