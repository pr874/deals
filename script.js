document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("category-select");
    const productContainer = document.getElementById("product-container");
    const toggleProductsBtn = document.getElementById("toggle-products-btn");
    const toggleLessBtn = document.getElementById("toggle-less-btn");

    // Sample product data (simulate as if fetched from an API)
    const mockProductData = [
        { id: 1, name: "Awesome Headphones", category: "electronics", description: "Top-notch sound and noise cancellation. Great for work or play.", image: "https://via.placeholder.com/220x150?text=Product+1", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 2, name: "Smart Light Bulbs", category: "home", description: "Color-changing bulbs controlled by your voice or phone.", image: "https://via.placeholder.com/220x150?text=Product+2", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 3, name: "Stylish Watch", category: "fashion", description: "A modern watch that goes with any outfit.", image: "https://via.placeholder.com/220x150?text=Product+3", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 4, name: "Bluetooth Speaker", category: "electronics", description: "Portable speaker with crisp sound and bass.", image: "https://via.placeholder.com/220x150?text=Product+4", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 5, name: "Coffee Maker", category: "home", description: "Brew your coffee like a barista with this sleek coffee maker.", image: "https://via.placeholder.com/220x150?text=Product+5", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 6, name: "Designer Sunglasses", category: "fashion", description: "Stylish sunglasses for every occasion.", image: "https://via.placeholder.com/220x150?text=Product+6", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 7, name: "Wireless Mouse", category: "electronics", description: "Ergonomic wireless mouse for smooth navigation.", image: "https://via.placeholder.com/220x150?text=Product+7", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 8, name: "Kitchen Blender", category: "home", description: "High-powered blender for your smoothies and shakes.", image: "https://via.placeholder.com/220x150?text=Product+8", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 9, name: "Running Shoes", category: "fashion", description: "Lightweight running shoes for ultimate comfort.", image: "https://via.placeholder.com/220x150?text=Product+9", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 10, name: "Smartphone Stand", category: "electronics", description: "Adjustable smartphone stand for hands-free use.", image: "https://via.placeholder.com/220x150?text=Product+10", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 11, name: "Electric Toothbrush", category: "home", description: "Rechargeable electric toothbrush with multiple modes.", image: "https://via.placeholder.com/220x150?text=Product+11", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" },
        { id: 12, name: "Leather Jacket", category: "fashion", description: "Premium leather jacket for a stylish look.", image: "https://via.placeholder.com/220x150?text=Product+12", url: "https://www.amazon.com/dp/YOURID?tag=youraffiliateid" }
    ];

    let currentPage = 1;
    const productsPerPage = 3;
    let totalPages = Math.ceil(mockProductData.length / productsPerPage);

    // Simulate fetching data from an API
    function fetchProducts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockProductData);  // Return the mock data
            }, 1000);  // Simulate API delay
        });
    }

    // Function to render products
    function renderProducts(products) {
        productContainer.innerHTML = ""; // Clear existing products
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="Product">
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <a href="${product.url}" target="_blank" class="buy-btn">Check Price</a>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
    }

    // Function to load more products
    function loadMoreProducts() {
        fetchProducts().then(products => {
            const start = (currentPage - 1) * productsPerPage;
            const end = currentPage * productsPerPage;
            const productsToDisplay = products.slice(start, end);

            renderProducts(productsToDisplay);

            currentPage++;
            if (currentPage > totalPages) {
                toggleProductsBtn.style.display = 'none'; // Hide "Show More" button when all products are displayed
                toggleLessBtn.style.display = 'inline-block'; // Show "Show Less" button
            }
        });
    }

    // Function to show fewer products (reset)
    function showLessProducts() {
        currentPage = 1;
        toggleProductsBtn.style.display = 'inline-block'; // Show "Show More" button
        toggleLessBtn.style.display = 'none'; // Hide "Show Less" button
        fetchProducts().then(products => {
            renderProducts(products.slice(0, productsPerPage)); // Show the first set of products
        });
    }

    // Event listener for "Show More" button
    toggleProductsBtn.addEventListener("click", loadMoreProducts);

    // Event listener for "Show Less" button
    toggleLessBtn.addEventListener("click", showLessProducts);

    // Show initial products when page loads
    fetchProducts().then(products => {
        renderProducts(products.slice(0, productsPerPage)); // Show the first set of products
    });

    // Privacy Policy Modal
    const privacyPolicyLink = document.getElementById("privacy-policy-link");
    const modal = document.getElementById("privacy-policy-modal");
    const closeModal = document.querySelector(".close-btn");

    // Show the privacy policy modal when clicked
    privacyPolicyLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        modal.style.display = "block";
    });

    // Close the privacy policy modal when clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal if the user clicks outside of the modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
