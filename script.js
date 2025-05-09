// Adding single-page application navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    setupNavigation();
    
    // Initialize products
    initializeProducts();
    
    // Initialize cart
    updateCartCount();
    if (window.location.hash === '#cart') {
        renderCart();
    }
    
    // Initialize other functionality
    setupMobileMenu();
    setupForms();
    setupSmoothScrolling();
});

function setupNavigation() {
    // Get all navigation links with data-section attribute
    const navLinks = document.querySelectorAll('[data-section]');
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target section ID
            const targetSection = link.getAttribute('data-section');
            const targetId = link.getAttribute('href');
            
            // Handle product detail links separately
            if (targetId && targetId.includes('product-detail')) {
                const productId = new URLSearchParams(targetId.split('?')[1]).get('id');
                if (productId) {
                    showSection('product-detail');
                    renderProductDetail(Number(productId));
                    window.scrollTo(0, 0);
                    return;
                }
            }
            
            // Update URL hash
            window.location.hash = targetId;
            
            // Show target section
            showSection(targetSection);
            
            // Scroll to top of the page
            window.scrollTo(0, 0);
            
            // Update active class on nav links
            updateActiveNavLinks(targetSection);
        });
    });
    
    // Handle initial page load and URL hash changes
    window.addEventListener('load', handleUrlHashChange);
    window.addEventListener('hashchange', handleUrlHashChange);
}

function handleUrlHashChange() {
    const hash = window.location.hash;
    if (hash) {
        const section = hash.substring(1); // Remove the # character
        showSection(section);
        updateActiveNavLinks(section);
        
        // If hash is #cart, render the cart
        if (section === 'cart') {
            renderCart();
        }
    } else {
        // Default to home page if no hash
        showSection('home');
        updateActiveNavLinks('home');
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateActiveNavLinks(activeSectionId) {
    // Remove active class from all navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to matching navigation links
    const activeLinks = document.querySelectorAll(`.nav-list a[data-section="${activeSectionId}"]`);
    activeLinks.forEach(link => {
        link.classList.add('active');
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navList.classList.contains('active')) {
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function setupForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            newsletterMessage.textContent = `Thank you! ${email} has been subscribed.`;
            newsletterMessage.className = 'success';
            newsletterForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                newsletterMessage.textContent = '';
                newsletterMessage.className = '';
            }, 5000);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Simulate form submission
            formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }
}

function setupSmoothScrolling() {
    // Add smooth scrolling to all links within the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.includes('section')) return; // Skip navigation links
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Product data - in a real application, this would come from a database or API
const products = [
    {
        id: 1,
        title: "Classic White Shirt",
        price: 49.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "A timeless classic white shirt made from 100% organic cotton. Features a contemporary slim fit with a point collar and rounded cuffs.",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        title: "Leather Crossbody Bag",
        price: 89.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Handcrafted genuine leather crossbody bag with adjustable strap and gold-tone hardware. Features multiple interior pockets.",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        title: "Classic Denim Jeans",
        price: 79.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Premium quality denim jeans with a classic straight fit. Made from sustainable materials with a touch of stretch for comfort.",
        inStock: true,
        featured: false
    },
    {
        id: 4,
        title: "Minimal Gold Watch",
        price: 129.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Elegant gold-tone watch with a minimalist design. Features a premium leather strap and Japanese quartz movement.",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        title: "Chelsea Leather Boots",
        price: 159.99,
        category: "footwear",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Classic Chelsea boots crafted from premium leather. Features elastic side panels and a comfortable cushioned insole.",
        inStock: true,
        featured: false
    },
    {
        id: 6,
        title: "Cashmere Scarf",
        price: 69.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1584187839132-b4a554b0c8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Luxuriously soft cashmere scarf in a versatile solid color. Perfect for adding warmth and style to any outfit.",
        inStock: true,
        featured: false
    },
    {
        id: 7,
        title: "Tailored Blazer",
        price: 189.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Expertly tailored blazer in a modern slim fit. Made from premium wool blend fabric with detailed stitching.",
        inStock: true,
        featured: true
    },
    {
        id: 8,
        title: "Designer Sunglasses",
        price: 149.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Premium acetate frame sunglasses with UV protection. Features a timeless design that complements any face shape.",
        inStock: true,
        featured: false
    }
];

// Function to get a product by ID
function getProductById(id) {
    return products.find(product => product.id === Number(id));
}

// Function to get related products (same category, excluding current product)
function getRelatedProducts(currentProductId, limit = 4) {
    const currentProduct = getProductById(currentProductId);
    if (!currentProduct) return [];
    
    return products
        .filter(product => product.category === currentProduct.category && product.id !== currentProductId)
        .slice(0, limit);
}

// Function to get featured products
function getFeaturedProducts(limit = 4) {
    return products
        .filter(product => product.featured)
        .slice(0, limit);
}

// Function to filter products
function filterProducts(category = 'all', sortBy = 'default') {
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // In a real app, you would have a 'dateAdded' field to sort by
            filteredProducts.reverse();
            break;
        default:
            // Default sorting (featured items first)
            filteredProducts.sort((a, b) => b.featured - a.featured);
    }
    
    return filteredProducts;
}

// Function to create a product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <a href="#product-detail" class="quick-view-btn" data-id="${product.id}">Quick View</a>
            </div>
            <div class="product-details">
                <h3 class="product-title">
                    <a href="#product-detail" data-id="${product.id}">${product.title}</a>
                </h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
}

// Function to render product detail
function renderProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) {
        showSection('products');
        return;
    }
    
    // Update page title and breadcrumb
    document.title = `${product.title} - Elegance`;
    document.getElementById('product-title-breadcrumb').textContent = product.title;
    
    // Create product detail HTML
    const productDetailHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-detail-content">
            <h2>${product.title}</h2>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-detail-description">
                ${product.description}
            </div>
            <div class="product-detail-meta">
                <p>Availability: <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                <p>Category: <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></p>
            </div>
            <div class="product-quantity">
                <div class="quantity-label">Quantity:</div>
                <div class="quantity-input">
                    <button class="quantity-btn minus" aria-label="Decrease quantity">-</button>
                    <input type="number" value="1" min="1" max="10" id="product-quantity">
                    <button class="quantity-btn plus" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <button class="btn add-to-cart-detail" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Render product detail
    document.getElementById('product-detail').innerHTML = productDetailHTML;
    
    // Render related products
    const relatedProducts = getRelatedProducts(productId);
    if (relatedProducts.length > 0) {
        const relatedProductsHTML = relatedProducts.map(product => createProductCard(product)).join('');
        document.getElementById('related-products').innerHTML = relatedProductsHTML;
    } else {
        document.querySelector('.related-products').style.display = 'none';
    }
    
    // Add event listeners for quantity buttons
    document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
        const quantityInput = document.getElementById('product-quantity');
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
        const quantityInput = document.getElementById('product-quantity');
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    });
    
    // Add event listener for add to cart button
    document.querySelector('.add-to-cart-detail').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        addToCart(productId, quantity);
    });
    
    // Add event listeners to all product links in related products
    document.querySelectorAll('#related-products .product-card a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = link.getAttribute('data-id');
            if (productId) {
                renderProductDetail(Number(productId));
                window.scrollTo(0, 0);
            }
        });
    });
}

// Function to initialize product pages
function initializeProducts() {
    // Handle home page (trending products)
    const trendingProductsContainer = document.getElementById('trending-products');
    if (trendingProductsContainer) {
        const featuredProducts = getFeaturedProducts();
        trendingProductsContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
        
        // Add event listeners
        addProductEventListeners(trendingProductsContainer);
    }
    
    // Handle products page
    const productsContainer = document.getElementById('all-products');
    if (productsContainer) {
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        
        // Initial render of all products
        renderFilteredProducts('all', 'default');
        
        // Add event listeners to filters
        categoryFilter.addEventListener('change', () => {
            renderFilteredProducts(categoryFilter.value, sortFilter.value);
        });
        
        sortFilter.addEventListener('change', () => {
            renderFilteredProducts(categoryFilter.value, sortFilter.value);
        });
    }
    
    // Add click event to document for dynamically added elements
    document.addEventListener('click', (e) => {
        // Handle Quick View buttons
        if (e.target.classList.contains('quick-view-btn')) {
            e.preventDefault();
            const productId = e.target.getAttribute('data-id');
            if (productId) {
                showSection('product-detail');
                renderProductDetail(Number(productId));
                window.scrollTo(0, 0);
            }
        }
        
        // Handle product title links
        if (e.target.closest('.product-title a')) {
            e.preventDefault();
            const link = e.target.closest('.product-title a');
            const productId = link.getAttribute('data-id');
            if (productId) {
                showSection('product-detail');
                renderProductDetail(Number(productId));
                window.scrollTo(0, 0);
            }
        }
        
        // Handle Add to Cart buttons
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId, 1);
        }
    });
}

// Function to add event listeners to product elements
function addProductEventListeners(container) {
    // Add event listeners to product links
    container.querySelectorAll('.quick-view-btn, .product-title a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = link.getAttribute('data-id');
            if (productId) {
                showSection('product-detail');
                renderProductDetail(Number(productId));
                window.scrollTo(0, 0);
            }
        });
    });
    
    // Add event listeners to "Add to Cart" buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId, 1);
        });
    });
}

// Function to render filtered products
function renderFilteredProducts(category, sortBy) {
    const productsContainer = document.getElementById('all-products');
    if (!productsContainer) return;
    
    const filteredProducts = filterProducts(category, sortBy);
    productsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new product elements
    addProductEventListeners(productsContainer);
}

// Cart functionality
// Initialize cart from localStorage or as empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to add item to cart
function addToCart(productId, quantity = 1) {
    productId = Number(productId);
    quantity = Number(quantity);
    
    // Check if product exists
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found');
        return;
    }
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save cart and show notification
    saveCart();
    showNotification(`${product.title} added to cart!`);
}

// Function to update item quantity in cart
function updateCartItemQuantity(productId, quantity) {
    productId = Number(productId);
    quantity = Number(quantity);
    
    // Find the item in the cart
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
        if (quantity > 0) {
            // Update quantity
            cart[itemIndex].quantity = quantity;
        } else {
            // Remove item if quantity is 0 or less
            cart.splice(itemIndex, 1);
        }
        
        // Save cart and render
        saveCart();
        renderCart();
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    productId = Number(productId);
    
    // Filter out the item
    cart = cart.filter(item => item.id !== productId);
    
    // Save cart and render
    saveCart();
    renderCart();
}

// Function to calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
    });
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(10px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Function to render cart page
function renderCart() {
    // Get cart elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItemsContainer || !cartSummary || !emptyCart) {
        // Not on cart page
        return;
    }
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = '';
        cartSummary.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }
    
    // Show cart contents
    emptyCart.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    
    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-meta">
                    <span>Category: ${getProductById(item.id).category}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="quantity-decrease" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                    <button class="quantity-increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Update subtotal and total
    const subtotal = calculateCartTotal();
    document.querySelector('.cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.cart-total').textContent = `$${subtotal.toFixed(2)}`;
    
    // Add event listeners
    
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const itemIndex = cart.findIndex(item => item.id === Number(productId));
            if (itemIndex >= 0 && cart[itemIndex].quantity > 1) {
                updateCartItemQuantity(productId, cart[itemIndex].quantity - 1);
            }
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const itemIndex = cart.findIndex(item => item.id === Number(productId));
            if (itemIndex >= 0 && cart[itemIndex].quantity < 10) {
                updateCartItemQuantity(productId, cart[itemIndex].quantity + 1);
            }
        });
    });
    
    // Quantity input fields
    document.querySelectorAll('.cart-item-quantity input').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.getAttribute('data-id');
            const quantity = parseInt(e.target.value);
            if (quantity >= 1 && quantity <= 10) {
                updateCartItemQuantity(productId, quantity);
            } else {
                // Reset to valid value
                const itemIndex = cart.findIndex(item => item.id === Number(productId));
                if (itemIndex >= 0) {
                    e.target.value = cart[itemIndex].quantity;
                }
            }
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Thank you for your order! This would proceed to checkout in a real e-commerce site.');
            // Clear cart after checkout
            cart = [];
            saveCart();
            renderCart();
        });
    }
}
