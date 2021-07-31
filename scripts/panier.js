
let selectedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(selectedProducts);

const cartMain = document.getElementById('cart_page');
const listProductOneByOne = document.getElementById("next_row");
const noOfProducts =  document.getElementById('count_articles'); 

let showProductPanier = [];
let calculMontant = 0;
//countArticles();
loadPanier();


function loadPanier()
{
if(selectedProducts == null || selectedProducts.length === 0)
{
    // si le panier est vide 
    document.getElementById("cart_container").style.display = "none";
    document.getElementById("form_section").style.display = "none";
    noOfProducts.innerHTML =  0 + "&nbsp;&nbsp;"+'Articles';
    const emptyBasket = `
        <div class = "cart_content">
            <div class = "cart_empty">Votre panier est vide !</div>
     `;
    cartMain.innerHTML = emptyBasket; 
} 
else {
    noOfProducts.innerHTML =  parseInt(selectedProducts.length) + "&nbsp;&nbsp;"+'Articles';
    for(i=0;i<selectedProducts.length;i++)
    {
        showProductPanier = showProductPanier + 
        `<tr>
            
            <td>${selectedProducts[i].productName}</td>
            <td>${selectedProducts[i].productColor}</td>
            <td>${selectedProducts[i].Quantity}</td>
            <td>${selectedProducts[i].productCost}</td>
            <td>${(parseInt(selectedProducts[i].productCost)*parseInt(selectedProducts[i].Quantity)).toFixed(2)}€</td>
           
        </tr>`;
        
        
        
        const calculMontantCol = document.getElementById('calcul_montant');
        calculMontant = calculMontant + parseInt(selectedProducts[i].productCost)*parseInt(selectedProducts[i].Quantity);
        console.log(calculMontant);
        calculMontantCol.innerText = calculMontant.toFixed(2) + '€';
       
    }
    if(i == selectedProducts.length)
    {
        listProductOneByOne.innerHTML = showProductPanier;
    }     
} }

//eventListener pour vider le panier
const deleteContent = document.getElementById('delete');
deleteContent.addEventListener("click", function (event)
{
    localStorage.removeItem('newProduct');

    document.getElementById("cart_container").style.display = "none";
    document.getElementById("form_section").style.display = "none";

    noOfProducts.innerHTML = 0 + "&nbsp;&nbsp;"+'Articles'; 
  

    const cartEmptyDiv = document.createElement('div');
    cartMain.appendChild(cartEmptyDiv);
    cartEmptyDiv.className = 'cart_content';

    const emptyCart = document.createElement('p');
    cartEmptyDiv.appendChild(emptyCart);
    emptyCart.className = "cart_empty";
    emptyCart.textContent = "Votre panier est vide !"
    
})
/* function SomeDeleteRowFunction(o) {
            
            
                 var p=o.parentNode.parentNode;
                 p.parentNode.removeChild(p);
  } */
