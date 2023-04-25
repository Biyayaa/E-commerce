let myGoods;
let url = "https://dummyjson.com/products";
let products = document.getElementById("products");
async function fetchGoods() {
  let goods = await fetch(url);
  let res = await goods.json();
  localStorage.setItem("goods", JSON.stringify(res.products));
}
fetchGoods();

myGoods = JSON.parse(localStorage.getItem("goods"));
console.log(myGoods);
let myCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(myCart);

async function displayGoods() {
  let resp = await myGoods.forEach((el, index) => {
    let errmm = myCart.some((ssmm) => ssmm.id == el.id);
    products.innerHTML += `
    <div class='pro'>
    <img src="${el.thumbnail}">
        <div class="des">
            <span>${el.brand}</span>
            <h5>${el.title}</h5>
            <h4>$${el.price}</h4>
            <span class="rate">${el.rating}</span>
            <button id="addToCart-${el.id}" onclick="addToCart(event,${
      el.id
    })" class='btn btn-warning'>
  ${errmm ? "Remove from Cart" : "Add to Cart"}
</button>
        </div>
        
    </div>
        `;
  });
}
displayGoods();

function addToCart(ev, id) {
  let found = myGoods.find((el) => el.id == id);
  console.log(found);
  console.log(myCart);
  let errmm = myCart.some((ssmm) => ssmm.id == found.id);
  console.log(errmm);
  if (errmm) {
    ev.target.innerHTML = "Add to cart";
    ev.target.id = `addToCart-${found.id}`;
    let myIndex = myCart.indexOf(found);
    console.log(myIndex);
    myCart.splice(myIndex, 1);
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartCount();
    return;
  } else {
    ev.target.innerHTML = "Remove from cart";
    ev.target.id = `removeFromCart-${found.id}`;
    myCart.push(found);
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartCount();
  }
  console.log(myCart);
  displayGoods();
}

function cartCount() {
  document.getElementById("cartCount").innerHTML = myCart.length;
}
cartCount();

let cartBtn = document.getElementById("cartBtn");
cartBtn.addEventListener("click", () => {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];

  let cartList = document.getElementById("cartList");
  cartList.innerHTML = ""; // clear existing items

  let total = 0;
  myCart.forEach((item) => {
    // let listItem = document.createElement("li");
    cartList.innerHTML += `<div class="cart-item-container">
    <div class="cart-item-image">
    <img src="${item.thumbnail}">
    </div>
    <div class="cart-item-des">
    <span>${item.title}</span>
    <span>${item.brand}</span>
    <span>${item.stock}</span>
    </div>
    <div class="cart-item-price">
    ${item.price}
    </div>
    <div>
    <button onclick="removeFromCart(event, ${item.id})">Remove</button>
    </div>
    </div>
    `;
    // cartList.appendChild(listItem);
    total += item.price;
  });

  let cartTotal = document.getElementById("cartTotal");
  cartTotal.innerHTML = total.toFixed(2);

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

function removeFromCart(ev, id) {
  let found = myCart.find((el) => el.id == id);
  let myIndex = myCart.indexOf(found);

  // calculate price of item being removed
  let removedPrice = found.price;

  // remove item from cart
  myCart.splice(myIndex, 1);
  localStorage.setItem("cart", JSON.stringify(myCart));

  // update cart count and remove item from modal list
  cartCount();
  ev.target.parentNode.remove();

  // update total cart price
  let cartTotal = document.getElementById("cartTotal");
  let currentTotal = parseFloat(cartTotal.innerHTML);
  let newTotal = currentTotal - removedPrice;
  cartTotal.innerHTML = newTotal.toFixed(2);

  // update corresponding button on products page
  let addToCartBtn = document.getElementById(`addToCart-${id}`);
  addToCartBtn.innerHTML = "Add to Cart";
  addToCartBtn.id = `addToCart-${id}`;
}

function showOne(id) {
  localStorage.setItem("oneItem", id);
  window.location.href = "oneProd.html";
}
