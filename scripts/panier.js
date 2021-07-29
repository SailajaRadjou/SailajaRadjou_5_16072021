let selectedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(selectedProducts);
const cartMain = document.getElementById('cart_page');

const deleteContent = document.getElementById('delete');
    
if(selectedProducts == null){
    // si le panier est vide 
    
    document.getElementById("cart_container").style.display = "none";
    const cartEmptyDiv = document.createElement('div');
    cartMain.appendChild(cartEmptyDiv);
    cartEmptyDiv.className = 'cart_content';
    const emptyCart = document.createElement('p');
    cartEmptyDiv.appendChild(emptyCart);
    emptyCart.className = "cart_empty";
    emptyCart.textContent = "Votre panier est vide !"
} //else {

//eventListener pour vider le panier
deleteContent.addEventListener("click", function (event) {
    localStorage.removeItem('newProduct');

    document.getElementById("cart_container").style.display = "none";

    const cartEmptyDiv = document.createElement('div');
    cartMain.appendChild(cartEmptyDiv);
    cartEmptyDiv.className = 'cart_content';

    const emptyCart = document.createElement('p');
    cartEmptyDiv.appendChild(emptyCart);
    emptyCart.className = "cart_empty";
    emptyCart.textContent = "Votre panier est vide !"
})
    