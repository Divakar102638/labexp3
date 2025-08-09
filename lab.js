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
