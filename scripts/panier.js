let selectedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(selectedProducts);
const cartMain = document.getElementById('cart_page');

if(selectedProducts == null)
{
    // si le panier est vide 
    document.getElementById("cart_container").style.display = "none";

    const cartEmptyDiv = document.createElement('div');
    cartMain.appendChild(cartEmptyDiv);
    cartEmptyDiv.className = 'cart_content';

    const emptyCart = document.createElement('p');
    cartEmptyDiv.appendChild(emptyCart);
    emptyCart.className = "cart_empty";
    emptyCart.textContent = "Votre panier est vide !"
} 
else {
    // Récupération des éléments du panier
    let i = 0;
    //const fillProduct = document.getElementById('fill_product')
     /* $("#fill_product tbody").append(
        "<tr>" +
        "<td>" + selectedProducts.productName + "</td>" +
        "<td>" + selectedProducts.productColor+ "</td>" +
        "<td>" + selectedProducts.productId+ "</td>" +
        "<td>" + selectedProducts.productCost + "</td>" +
        "</tr>");*/
  //const listByRows = document.importNode(nextRow, true)
  const table = document.getElementById("next_row");
      
    for (let selectedProduct in selectedProducts)
    {
        const row = table.insertRow(0);
        document.getElementById('product_count').textContent = i;  
        document.getElementById('product_name').textContent = selectedProducts[selectedProduct].productName;
        document.getElementById('product_color').textContent = selectedProducts[selectedProduct].productColor;
        document.getElementById('product_quantity').textContent = selectedProducts[selectedProduct].productId;
        document.getElementById('product_rate').textContent = selectedProducts[selectedProduct].productCost;
      i++;
      
      /*const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);*/
     console.table(selectedProducts);
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
    