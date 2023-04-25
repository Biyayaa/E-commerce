let myGoods;
let url = "https://dummyjson.com/products";
let products = document.getElementById("products")
async function fetchGoods(){
    let goods = await fetch(url);
    let res = await goods.json();
    localStorage.setItem("goods", JSON.stringify(res.products))
}
fetchGoods();

myGoods = JSON.parse(localStorage.getItem("goods"));
console.log(myGoods);
let myCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(myCart);

async function displayGoods(){
    let resp = await myGoods.forEach((el, index)=>{
    let errmm = myCart.some(ssmm => ssmm.id == el.id);
    products.innerHTML += `
            <div class=' col-md-3 m-1 card shadow w-25'>
                <img src=${el.thumbnail} w-75 />
                <p>${el.description}</p>
                <button onclick="addToCart(event,${el.id})" class='btn btn-warning'>${errmm? "Remove from Cart": "Add to Cart"}</button>
            </div>
        `
    })
}
displayGoods();

function addToCart(ev, id){
    let found = myGoods.find(el=> el.id == id)
    console.log(found);
    console.log(myCart);
    let errmm = myCart.some(ssmm => ssmm.id == found.id);
    console.log(errmm);
    if(errmm){
        ev.target.innerHTML = "Not there... Add";
        let myIndex = myCart.indexOf(found)
        console.log(myIndex);
        myCart.splice(myIndex,1)
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartCount();
        return;
    }else{
        ev.target.innerHTML = "Already there... Remove"
        myCart.push(found);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartCount();
    }
    console.log(myCart);
    displayGoods();
}

function cartCount(){
    document.getElementById("cart-count").innerHTML = myCart.length;
}
cartCount();

function showOne(id){
    localStorage.setItem("oneItem", id);
    window.location.href = "oneProd.html"
}
