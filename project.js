const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('users.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
)`);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (like HTML)
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], (err) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.send('User data saved successfully!');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

let cart = [];

const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartItems = document.getElementById('cart-items');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productElem = button.parentElement;
    const id = productElem.getAttribute('data-id');
    const name = productElem.getAttribute('data-name');
    const price = parseFloat(productElem.getAttribute('data-price'));

    const product = { id, name, price };

    cart.push(product);
    updateCart();
  });
});

document.getElementById('cart').addEventListener('click', () => {
  cartItems.classList.toggle('hidden');
});

function updateCart() {
  cartCount.textContent = cart.length;
  cartList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
}