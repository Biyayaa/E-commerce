let myGoods;
let url = "https://dummyjson.com/products";
let products = document.getElementById("products");
let item;
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

    <img onclick="proInfo(${el.id})" src="${el.thumbnail}">
        <div class="des">
            <span>${el.brand}</span>
            <h5>${el.title}</h5>
            <h4>#${el.price}</h4>
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

function proInfo(id) {
  let clickedProduct = myGoods.find((el) => el.id == id);
  console.log(clickedProduct);
  let errmm = myCart.some((ssmm) => ssmm.id == clickedProduct.id);
  let modal = document.getElementById("myModalPro");
  modal.style.display = "block";

  let modalDescription = document.getElementById("modalDescription");

  let imageGallery = "";
  clickedProduct.images.forEach((image) => {
    imageGallery += `<img src="${image}">`;
  });

  modalDescription.innerHTML = `<div class="product-details-container">
    <div class="product-images">
      <img id="thumbnail-${clickedProduct.id}" src="${
    clickedProduct.thumbnail
  }">
      <div class="image-gallery">
        ${imageGallery}
      </div>
    </div>

    <div class="product-description">
      <p>${clickedProduct.title}</p>
      <p>${clickedProduct.description}</p>
      <p>${clickedProduct.brand}</p>
      <p>${clickedProduct.rating}</p>
      <p>#${clickedProduct.price}</p>
      <button id="addToCart-${clickedProduct.id}" onclick="addToCart(event,${
    clickedProduct.id
  })" class='btn btn-warning'>
        ${errmm ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>

    <div>
  `;

  // Check if product is in cart and has a quantity
  let cartProduct = myCart.find((el) => el.id == clickedProduct.id);
  if (errmm && cartProduct.quantity !== undefined) {
    modalDescription.innerHTML += `
      <div class="quantity-count">
        <button onclick="reduceQty(${clickedProduct.id})">-</button>
        <h3 id="quantity${clickedProduct.id}">${cartProduct.quantity}</h3>
        <button onclick="addQty(${clickedProduct.id})">+</button>
      </div>
    `;
  }

  // Update the corresponding button on the display page
  // let addToCartButton = document.getElementById(
  //   `addToCart-${clickedProduct.id}`
  // );
  // addToCartButton.innerHTML = errmm ? "Remove from Cart" : "Add to Cart";

  // Add event listener to each image in image gallery
  let imageGalleryImages =
    modalDescription.querySelectorAll(".image-gallery img");
  imageGalleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      let thumbnail = document.getElementById(`thumbnail-${clickedProduct.id}`);
      let tempSrc = thumbnail.src;
      thumbnail.src = image.src;
      image.src = tempSrc;
    });
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

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
    found.quantity = 1; // initialize quantity to 1
    myCart.push(found);
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartCount();
  }
  console.log(myCart);
  displayGoods();
}

function cartCount() {
  let totalQuantity = 0;
  myCart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.getElementById("cartCount").innerHTML = totalQuantity;
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
    cartList.innerHTML += `<div class="cart-item-container">
      <div class="cart-item-image">
      <img src="${item.thumbnail}">
      </div>
      <div class="cart-item-des">
      <span>${item.title}</span>
      <p>${item.description}</p>
      <p>Brand:${item.brand}</p>
      </div>
      <div class="cart-item-price">
      #${item.price.toFixed(2)}
      </div>
      <div class="btn-counter">
      <button onclick="removeFromCart(event, ${item.id})">Remove</button>
      <div class="quantity-count">
      <button onclick="reduceQty(${item.id})">-</button>
      <h3 id="quantity${item.id}">${item.quantity}</h3>
      <button onclick="addQty(${item.id})">+</button>
      </div>
      </div>
      </div>
      <hr>
      `;
    total += item.price * item.quantity;
  });

  let cartTotal = document.getElementById("cartTotal");
  cartTotal.innerHTML = `${total.toFixed(2)}`;
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

function addQty(id) {
  let myItems = myCart.find((el) => el.id == id);
  myItems.quantity++;
  document.getElementById(`quantity${id}`).innerHTML = myItems.quantity;
  console.log(myItems.quantity);
  localStorage.setItem("cart", JSON.stringify(myCart));
  let total = 0;
  myCart.forEach((item) => {
    total += item.price * item.quantity;
  });
  let cartTotal = document.getElementById("cartTotal");
  cartTotal.innerHTML = `${total.toFixed(2)}`;
  cartCount();
}

function reduceQty(id) {
  let myItems = myCart.find((el) => el.id == id);
  if (myItems.quantity > 1) {
    myItems.quantity--;
    document.getElementById(`quantity${id}`).innerHTML = myItems.quantity;
    console.log(myItems.quantity);
    quant = myItems.quantity;
    // console.log(quant);

    localStorage.setItem("cart", JSON.stringify(myCart));

    let total = 0;
    myCart.forEach((item) => {
      total += item.price * item.quantity;
    });
    let cartTotal = document.getElementById("cartTotal");
    cartTotal.innerHTML = `${total.toFixed(2)}`;
  } else {
    document.getElementById(`quantity${id}`).innerHTML = 1;
  }
  cartCount();
}

function removeFromCart(ev, id) {
  let found = myCart.find((el) => el.id == id);
  let myIndex = myCart.indexOf(found);

  // calculate price of item being removed
  let removedPrice = found.price * found.quantity;

  // remove item from cart
  myCart.splice(myIndex, 1);
  localStorage.setItem("cart", JSON.stringify(myCart));

  // update cart count and remove item from modal list
  cartCount();
  ev.target.parentNode.parentNode.remove();

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

function makePayment() {
  let total = 0;
  myCart.forEach((item) => {
    total += item.price * item.quantity;
  });
  let cartTotal = document.getElementById("cartTotal");
  cartTotal.innerHTML = `${total.toFixed(2)}`;
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-1c1913436f4bb40793ad01c221cffc6f-X",
    tx_ref: "titanic-48981487343MDI0NzMx",
    amount: total,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "rose@unsinkableship.com",
      phone_number: "08102909304",
      name: "Rose DeWitt Bukater",
    },
    customizations: {
      title: "Biyaya Store",
      description: "Payment for an awesome cruise",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  });
}
