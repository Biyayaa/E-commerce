let productsArray = [];

async function fetchProducts() {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    console.log(data);
    
    let dummyJsonProducts = Object.values(data); // store all products in the array
    console.log(dummyJsonProducts);

    productsArray = productsArray.concat(dummyJsonProducts); // merge with the existing products array

    let productsElement = document.getElementById("products");
    productsElement.innerHTML = ""; // clear any existing content
    
    data.products.forEach((item) => {
      productsElement.innerHTML += `
            <div class="pro-container">
                <div class="pro">
                <img src="${item.thumbnail}">
                    <div class="des">
                        <span>${item.brand}</span>
                        <h5>${item.title}</h5>
                        <h4>$${item.price}</h4>
                        <span class="rate">${item.rating}</span>
                    </div>
                    <i class="fa-solid fa-cart-plus"></i>
                </div>

            </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchProductsS() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log(data);
    
    let fakeStoreProducts = Object.values(data); // store all products in the array
    console.log(fakeStoreProducts);

    productsArray = productsArray.concat(fakeStoreProducts); // merge with the existing products array

    let productsElement = document.getElementById("products2");
    productsElement.innerHTML = ""; // clear any existing content
    
    data.forEach((item) => {
      productsElement.innerHTML += `
            <div class="pro-container">
                <div class="pro">
                <img src="${item.image}">
                    <div class="des">
                        <span>${item.brand}</span>
                        <h5>${item.title}</h5>
                        <h4>$${item.price}</h4>
                        <span>${item.rating.rate}</span>
                    </div>
                    <i class="fa-solid fa-cart-plus"></i>
                </div>

            </div>

      `;
    });
  } catch (error) {
    console.error(error);
  }
}

// Call both functions to fetch products from the two APIs
fetchProducts();
fetchProductsS();


console.log(productsArray);

let productItem = document.getElementById("productItem");
productItem.addEventListener("click", ()=>{
  console.log("works");
})