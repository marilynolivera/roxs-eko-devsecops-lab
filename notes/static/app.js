// Simply Simple Notes - Enhanced Functionality

class NotesApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupFormValidation();
        this.setupKeyboardShortcuts();
        this.setupNotificationSystem();
    }

    setupEventListeners() {
        // Auto-save draft while typing
        const noteField = document.querySelector('input[name="note_field"]');
        if (noteField) {
            noteField.addEventListener('input', this.debounce(this.saveDraft.bind(this), 1000));
            this.loadDraft();
        }

        // Enhanced form submissions
        const addForm = document.querySelector('form:has(input[name="add"])');
        if (addForm) {
            addForm.addEventListener('submit', this.handleAddNote.bind(this));
        }

        const deleteForm = document.querySelector('form:has(input[name="delete"])');
        if (deleteForm) {
            deleteForm.addEventListener('submit', this.handleDeleteNote.bind(this));
        }

        // Note interactions
        this.setupNoteInteractions();
    }

    setupAnimations() {
        // Stagger animation for notes
        const noteItems = document.querySelectorAll('.note-item');
        noteItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bounce-in');
                }
            });
        });

        document.querySelectorAll('.form-section').forEach(section => {
            observer.observe(section);
        });
    }

    setupFormValidation() {
        const noteField = document.querySelector('input[name="note_field"]');
        const addButton = document.querySelector('input[name="add"]');

        if (noteField && addButton) {
            const validateNote = () => {
                const value = noteField.value.trim();
                const isValid = value.length > 0 && value.length <= 500;
                
                addButton.disabled = !isValid;
                addButton.style.opacity = isValid ? '1' : '0.5';
                
                // Show character count
                this.updateCharacterCount(value.length);
            };

            noteField.addEventListener('input', validateNote);
            validateNote(); // Initial validation
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to submit
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                const noteField = document.querySelector('input[name="note_field"]');
                if (noteField && noteField === document.activeElement) {
                    const addForm = noteField.closest('form');
                    if (addForm) addForm.submit();
                }
            }

            // Escape to clear form
            if (e.key === 'Escape') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === 'INPUT') {
                    activeElement.value = '';
                    activeElement.blur();
                }
            }
        });
    }

    setupNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    setupNoteInteractions() {
        const noteItems = document.querySelectorAll('.note-item');
        
        noteItems.forEach((item, index) => {
            // Add copy functionality
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.className = 'note-action-btn copy-btn';
            copyButton.title = 'Copiar nota';
            copyButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 50px;
                background: none;
                border: none;
                color: #718096;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                opacity: 0;
                transition: all 0.3s ease;
            `;

            copyButton.addEventListener('click', () => {
                const noteContent = item.querySelector('.note-content').textContent;
                this.copyToClipboard(noteContent);
            });

            item.appendChild(copyButton);

            // Show/hide action buttons on hover
            item.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });

            // Double-click to edit (future feature)
            item.addEventListener('dblclick', () => {
                this.showNotification('Función de edición próximamente', 'info');
            });
        });
    }

    handleAddNote(e) {
        const form = e.target;
        const noteField = form.querySelector('input[name="note_field"]');
        
        if (noteField && noteField.value.trim()) {
            this.showLoadingState(form);
            this.clearDraft();
            
            // Add success notification after form submission
            setTimeout(() => {
                this.showNotification('Nota agregada exitosamente', 'success');
            }, 100);
        } else {
            e.preventDefault();
            this.showNotification('Por favor escribe algo antes de agregar la nota', 'warning');
            noteField.focus();
        }
    }

    handleDeleteNote(e) {
        const form = e.target;
        const idField = form.querySelector('input[name="id_field"]');
        const noteId = idField ? idField.value : '';
        
        if (!noteId) {
            e.preventDefault();
            this.showNotification('Por favor ingresa el número de la nota a eliminar', 'warning');
            if (idField) idField.focus();
            return;
        }

        if (!confirm(`¿Estás seguro de que quieres eliminar la nota #${noteId}?`)) {
            e.preventDefault();
            return;
        }

        this.showLoadingState(form);
        
        // Add success notification after form submission
        setTimeout(() => {
            this.showNotification('Nota eliminada exitosamente', 'success');
        }, 100);
    }

    saveDraft() {
        const noteField = document.querySelector('input[name="note_field"]');
        if (noteField && noteField.value.trim()) {
            localStorage.setItem('notes_draft', noteField.value);
        }
    }

    loadDraft() {
        const draft = localStorage.getItem('notes_draft');
        const noteField = document.querySelector('input[name="note_field"]');
        
        if (draft && noteField && !noteField.value) {
            noteField.value = draft;
            this.showNotification('Borrador restaurado', 'info');
        }
    }

    clearDraft() {
        localStorage.removeItem('notes_draft');
    }

    updateCharacterCount(count) {
        const maxLength = 500;
        let counter = document.querySelector('.character-counter');
        
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                font-size: 0.8rem;
                color: #718096;
                text-align: right;
                margin-top: 5px;
            `;
            
            const noteField = document.querySelector('input[name="note_field"]');
            if (noteField) {
                noteField.parentNode.appendChild(counter);
            }
        }
        
        const remaining = maxLength - count;
        counter.textContent = `${count}/${maxLength}`;
        counter.style.color = remaining < 50 ? '#e53e3e' : '#718096';
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Nota copiada al portapapeles', 'success');
        }).catch(() => {
            this.showNotification('Error al copiar la nota', 'error');
        });
    }

    showLoadingState(element) {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, 1000);
    }

    showNotification(message, type = 'info') {
        const container = document.querySelector('.notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };

        const colors = {
            success: '#48bb78',
            error: '#e53e3e',
            warning: '#ed8936',
            info: '#4299e1'
        };

        notification.innerHTML = `
            <i class="fas fa-${icons[type]}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            pointer-events: auto;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            min-width: 250px;
        `;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 3000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}