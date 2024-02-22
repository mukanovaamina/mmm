// forhim.js
document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("productSection");
  const filterItems = document.querySelectorAll(".filter-item");
  const loadMoreButton = document.getElementById("loadMoreButton"); // Assuming you have a "Load More" button

  // Sample product data
  let products = [
    {
      category: "shoes",
      imageUrl: "product5.jpg",
      title: "Black trainers",
      description: "For man. New collection",
      price: 59.99,
      productId: "1", // Replace with the actual product ID from MongoDB
    },
    {
      category: "belts",
      imageUrl: "product2.jpg",
      title: "Belt",
      description: "For man.",
      price: 29.99,
      productId: "2", // Replace with the actual product ID from MongoDB
    },
    // Add more product entries here
  ];

  // Function to create product cards
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-3";
    card.dataset.category = product.category;

    card.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}" height="300px" width="50px" />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h6 class="card-text">${product.description}</h6>
          <p class="card-price">Price: $${product.price.toFixed(2)}</p>
          <a href="#" class="btn btn-primary" onclick="addToBasket('${product.title}', ${product.price}, '${product.productId}')">Buy Now</a>
        </div>
      </div>
    `;

    return card;
  }

  // Function to render products based on category
  function renderProducts(category) {
    productsContainer.innerHTML = "";

    const filteredProducts =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);

    filteredProducts.forEach((product) => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });
  }

  // Event listener for filter items
  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedCategory = this.dataset.category;
      renderProducts(selectedCategory);
    });
  });

  // Initial display of all products
  renderProducts("all");

  // Function to add a product to the basket
  function addToBasket(productTitle, productPrice, productId) {
    const username = "user1"; // Replace with the actual logged-in user's username
    const quantity = 1; // You can modify this if needed
    const totalPrice = productPrice * quantity;

    $.ajax({
      url: "http://localhost:1337/addToBasket",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username,
        productId,
        quantity,
        totalPrice,
      }),
      success: function (data) {
        console.log(data);
        alert(`Product added to basket: ${productTitle} - $${productPrice.toFixed(2)}`);
      },
      error: function (error) {
        console.error("Error adding product to basket:", error);
        alert("Error adding product to basket.");
      },
    });
  }
});
