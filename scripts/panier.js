
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
    //Afficher le formulaire via JS


const displaySectionForm = () => 
{
    //le positionnement du formulaire
    const addForm = document.querySelector('#form_section');
    console.log( addForm);
    const displayForm = 
    `<form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="col-md-4 mb-3">
        <label for="nom">Nom</label>
        <input type="text" class="form-control" id="nom" placeholder="Votre nom" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="prenom">Prénom</label>
        <input type="text" class="form-control" id="prenom" placeholder="Votre prénom" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="adressemail">Adresse E-mail</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
          </div>
          <input type="text" class="form-control" id="adressemail" placeholder="Votre valid adresse E-mail" aria-describedby="inputGroupPrepend" required>
          <div class="invalid-feedback">
            Please choose a username.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="adressepostale">Adresse</label>
        <input type="text" class="form-control" id="adressepostale" placeholder="Votre adresse" required>
        <div class="invalid-feedback">
          Please provide a valid city.
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="ville">Ville</label>
        <input type="text" class="form-control" id="ville" placeholder="Ville" required>
        <div class="invalid-feedback">
          Please provide a valid state.
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="codepostale">Code Postal</label>
        <input type="text" class="form-control" id="codepostale" placeholder="Code Postal" required>
        <div class="invalid-feedback">
          Please provide a valid zip.
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Valider votre Commande</button>
  </form>`;

  addForm.insertAdjacentHTML("afterEnd",displayForm);
}
  displaySectionForm();  
}
}

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

