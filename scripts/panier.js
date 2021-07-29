let selectedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(selectedProducts);
const cartMain = document.getElementById('cart_page');
const listProductOneByOne = document.getElementById("next_row");
let showProductPanier = [];
if(selectedProducts === null)
{
    // si le panier est vide 
    document.getElementById("cart_container").style.display = "none";
    const emptyBasket = `
        <div class = "cart_content">
            <div class = "cart_empty">Votre panier est vide !</div>
     `;
    cartMain.innerHTML = emptyBasket; 
} 
else {
    for(i=0;i<selectedProducts.length;i++)
    {
        showProductPanier = showProductPanier + 
        `<tr>
            <th scope="row" id="product_count">${i}</th>
            <td id="product_name">${selectedProducts[i].productName}</td>
            <td id="product_color">${selectedProducts[i].productColor}</td>
            <td id="product_quantity">${selectedProducts[i].productId}</td>
            <td id="product_rate">${selectedProducts[i].productCost}</td>
        </tr>`;
    }
    if(i == selectedProducts.length)
    {
        listProductOneByOne.innerHTML = showProductPanier;
    }
  
      
}   

//eventListener pour vider le panier
const deleteContent = document.getElementById('delete');
deleteContent.addEventListener("click", function (event)
{
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
    