document.addEventListener('DOMContentLoaded', function() {
    // Extension data
    const extensions = [
        {
            id: 1,
            name: 'DevLens',
            description: 'Quickly inspect page layouts and visualize element boundaries.',
            icon: { backgroundColor: '#8bc34a', symbol: '🔍' },
            active: true
        },
        {
            id: 2,
            name: 'StyleSpy',
            description: 'Instantly analyze and copy CSS from any webpage element.',
            icon: { backgroundColor: '#03a9f4', symbol: '🎨' },
            active: true
        },
        {
            id: 3,
            name: 'SpeedBoost',
            description: 'Optimizes browser resource usage to accelerate page loading.',
            icon: { backgroundColor: '#ffb1b1', symbol: '⚡' },
            active: false
        },
        {
            id: 4,
            name: 'JSONWizard',
            description: 'Formats, validates, and prettifies JSON responses in browser.',
            icon: { backgroundColor: '#ffb1b1', symbol: '{}' },
            active: true
        },
        {
            id: 5,
            name: 'TabMaster Pro',
            description: 'Organizes browser tabs into groups and sessions.',
            icon: { backgroundColor: '#9c27b0', symbol: '📑' },
            active: true
        },
        {
            id: 6,
            name: 'ViewportBuddy',
            description: 'Simulates various screen resolutions directly within the browser.',
            icon: { backgroundColor: '#2196f3', symbol: '📱' },
            active: false
        },
        {
            id: 7,
            name: 'Markup Notes',
            description: 'Enable annotation and notes directly on webpages for collaborative debugging.',
            icon: { backgroundColor: '#4dd0e1', symbol: '📝' },
            active: true
        },
        {
            id: 8,
            name: 'GridGuides',
            description: 'Overlay customizable grids and alignment guides on any webpage.',
            icon: { backgroundColor: '#9575cd', symbol: '📊' },
            active: false
        },
        {
            id: 9,
            name: 'Palette Picker',
            description: 'Instantly extract color palettes from any webpage.',
            icon: { backgroundColor: '#4caf50', symbol: '🎨' },
            active: true
        },
        {
            id: 10,
            name: 'LinkChecker',
            description: 'Scans and highlights broken links on any page.',
            icon: { backgroundColor: '#ffcc80', symbol: '🔗' },
            active: true
        },
        {
            id: 11,
            name: 'DOM Snapshot',
            description: 'Capture and export DOM structures quickly.',
            icon: { backgroundColor: '#4dd0e1', symbol: '📷' },
            active: false
        },
        {
            id: 12,
            name: 'ConsolePlus',
            description: 'Enhanced developer console with advanced filtering and logging.',
            icon: { backgroundColor: '#66bb6a', symbol: '💻' },
            active: true
        }
    ];

    // DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const extensionsContainer = document.getElementById('extensions-container');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
    });
    
    // Filter tabs functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter extensions
            const filter = this.getAttribute('data-filter');
            renderExtensions(filter);
        });
    });
    
    // Render extensions with filter
    function renderExtensions(filter = 'all') {
        // Clear container
        extensionsContainer.innerHTML = '';
        
        // Filter extensions
        const filteredExtensions = extensions.filter(extension => {
            if (filter === 'all') return true;
            if (filter === 'active') return extension.active;
            if (filter === 'inactive') return !extension.active;
            return true;
        });
        
        // Render each extension
        filteredExtensions.forEach(extension => {
            const extensionCard = createExtensionCard(extension);
            extensionsContainer.appendChild(extensionCard);
        });
    }
    
    // Create extension card DOM element
    function createExtensionCard(extension) {
        const card = document.createElement('div');
        card.className = 'extension-card';
        card.setAttribute('data-id', extension.id);
        
        const header = document.createElement('div');
        header.className = 'extension-header';
        
        const icon = document.createElement('div');
        icon.className = 'extension-icon';
        icon.style.backgroundColor = extension.icon.backgroundColor;
        icon.textContent = extension.icon.symbol;
        
        const name = document.createElement('h3');
        name.className = 'extension-name';
        name.textContent = extension.name;
        
        header.appendChild(icon);
        header.appendChild(name);
        
        const description = document.createElement('p');
        description.className = 'extension-description';
        description.textContent = extension.description;
        
        const footer = document.createElement('div');
        footer.className = 'extension-footer';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeExtension(extension.id);
        });
        
        const toggleLabel = document.createElement('label');
        toggleLabel.className = 'toggle-switch';
        
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = extension.active;
        toggleInput.addEventListener('change', function() {
            toggleExtension(extension.id);
        });
        
        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'toggle-slider';
        
        toggleLabel.appendChild(toggleInput);
        toggleLabel.appendChild(toggleSlider);
        
        footer.appendChild(removeBtn);
        footer.appendChild(toggleLabel);
        
        card.appendChild(header);
        card.appendChild(description);
        card.appendChild(footer);
        
        return card;
    }
    
    // Toggle extension active state
    function toggleExtension(id) {
        const extensionIndex = extensions.findIndex(ext => ext.id === id);
        if (extensionIndex !== -1) {
            extensions[extensionIndex].active = !extensions[extensionIndex].active;
            
            // Re-render with current filter
            const activeFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
            renderExtensions(activeFilter);
        }
    }
    
    // Remove extension (UI only)
    function removeExtension(id) {
        // Find the extension index
        const extensionIndex = extensions.findIndex(ext => ext.id === id);
        if (extensionIndex !== -1) {
            // Remove from array
            extensions.splice(extensionIndex, 1);
            
            // Re-render with current filter
            const activeFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
            renderExtensions(activeFilter);
        }
    }
    
    // Initial render
    renderExtensions('all');
});
