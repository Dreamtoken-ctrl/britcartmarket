const products = [
  {
    name: "Apple iPhone 15 Pro Case",
    price: 12.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=800&q=80",
    description: "Shockproof phone case with MagSafe support."
  },
  {
    name: "Wireless Bluetooth Headphones",
    price: 34.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable headphones with clear sound and long battery life."
  },
  {
    name: "Baby Feeding Chair",
    price: 49.99,
    category: "Baby",
    image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=800&q=80",
    description: "Foldable baby chair suitable for home feeding."
  },
  {
    name: "Car Interior Cleaning Kit",
    price: 22.50,
    category: "Car",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
    description: "Cleaning tools for seats, dashboard and carpets."
  },
  {
    name: "Modern Home Decoration Set",
    price: 18.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist decoration set for living room or bedroom."
  },
  {
    name: "Women Casual Jacket",
    price: 39.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    description: "Stylish casual jacket for everyday wear."
  }
];

let currentProducts = [...products];
let cart = [];

function renderProducts(list = currentProducts) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((product, index) => {
    const realIndex = products.indexOf(product);
    productList.innerHTML += `
      <article class="card">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Product'" />
        <p class="category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">£${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${realIndex})">Add to cart</button>
      </article>
    `;
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  currentProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  renderProducts(currentProducts);
}

function filterCategory(category) {
  if (category === "All") {
    currentProducts = [...products];
  } else {
    currentProducts = products.filter(product => product.category === category);
  }
  renderProducts(currentProducts);
}

function sortProducts() {
  const value = document.getElementById("sortSelect").value;
  let sorted = [...currentProducts];

  if (value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);
}

function addToCart(index) {
  cart.push(products[index]);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <strong>£${item.price.toFixed(2)}</strong>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function addSellerProduct() {
  const name = document.getElementById("newName").value.trim();
  const price = Number(document.getElementById("newPrice").value);
  const category = document.getElementById("newCategory").value.trim();
  const image = document.getElementById("newImage").value.trim();
  const description = document.getElementById("newDescription").value.trim();

  if (!name || !price || !category || !image || !description) {
    alert("Please complete all product fields.");
    return;
  }

  products.push({ name, price, category, image, description });
  currentProducts = [...products];
  renderProducts(currentProducts);
  updateAdminProductCount();

  document.getElementById("newName").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newCategory").value = "";
  document.getElementById("newImage").value = "";
  document.getElementById("newDescription").value = "";

  alert("Product added successfully.");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Checkout demo. For a real website, connect Stripe or PayPal payment system.");
}


function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  alert(`Login successful for ${email}. This is a demonstration login.`);
  event.target.reset();
}

function approveListing() {
  const pendingListing = document.getElementById("pendingListing");
  pendingListing.textContent = "Listing approved successfully.";
  alert("The product listing has been approved.");
}

function removeListing() {
  const pendingListing = document.getElementById("pendingListing");
  pendingListing.textContent = "No pending product listings.";
  alert("The product listing has been removed.");
}

function updateAdminProductCount() {
  const adminProductCount = document.getElementById("adminProductCount");

  if (adminProductCount) {
    adminProductCount.textContent = products.length;
  }
}

renderProducts();
renderCart();
updateAdminProductCount();
