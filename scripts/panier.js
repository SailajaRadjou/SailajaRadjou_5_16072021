let selectedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(selectedProducts);
const cartMain = document.getElementById('cart_page');
const listProductOneByOne = document.getElementById("next_row");
let showProductPanier = [];
let calculMontant = 0;
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
            <th scope="row" class="id_select">${i}</th>
            <td>${selectedProducts[i].productName}</td>
            <td>${selectedProducts[i].productColor}</td>
            <td>${selectedProducts[i].Quantity}</td>
            <td>${selectedProducts[i].productCost}</td>
            <td class="">${(parseInt(selectedProducts[i].productCost)*parseInt(selectedProducts[i].Quantity)).toFixed(2)}€</td>
            <td><button type = "submit" class="delete_article" onclick=SomeDeleteRowFunction(this)><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
        
        const calculMontantCol = document.getElementById('calcul_montant');
        calculMontant = calculMontant + parseInt(selectedProducts[i].productCost)*parseInt(selectedProducts[i].Quantity);
        console.log(calculMontant);
        calculMontantCol.innerText = calculMontant.toFixed(2) + '€';
        let calculPrice = [];
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
 function SomeDeleteRowFunction(o) {
            
            
                 var p=o.parentNode.parentNode;
                 p.parentNode.removeChild(p);
  } 
//pour supprimer les articles
let deleteButton = document.querySelectorAll(".delete_article");
const idSelect = document.getElementsByClassName("id_select");

console.log(idSelect);
for(let l=0;l < deleteButton.length;l++)
{
    deleteButton[l].addEventListener("click" , (event) => 
    {
        event.preventDefault();

        //produit va supprimer en selection id
        let productToDelete = selectedProducts[l].idSelect;
        console.log(productToDelete);
        localStorage.setItem(
            'newProduct',JSON.stringify(selectedProducts)
        );
    })
}