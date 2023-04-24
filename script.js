fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));



  
let phones= document.getElementById("phones");
phones.addEventListener("click", ()=>{
    console.log("phones");
})