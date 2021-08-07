function storageQuantity()
{
    //Créer un localStorage et pour lire les données de localStorage
    let productsInLocalStorage = JSON.parse(localStorage.getItem('newProduct'));
    
    console.log("products dans le panier");
    console.table(productsInLocalStorage);

    console.log("No of Products in the basket");
    console.log(refreshQuantity);

    if(productsInLocalStorage == null || productsInLocalStorage.length === 0)
    {
        // si le panier est vide        
        noOfProducts.innerHTML =  0 + "&nbsp;&nbsp;"+'Articles';        
    } 
    else{
      noOfProducts.innerHTML = refreshQuantity + "&nbsp;&nbsp;"+'Articles'; 
    }
}    