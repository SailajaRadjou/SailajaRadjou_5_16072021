
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
            
            const displayForm = 
            `<form class="needs-validation" novalidate>
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="firstName">First Name  :</label>
                        <input type="text" class="form-control" id="firstName" placeholder="Votre nom" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="lastName">Last Name  :</label>
                        <input type="text" class="form-control" id="lastName" placeholder="Votre prénom" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                        <label for="address">Address  :</label>
                        <input type="text" class="form-control" id="address" placeholder="Votre adresse" required>
                        <div class="invalid-feedback">
                        Please provide a valid city.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="city">City  :</label>
                        <input type="text" class="form-control" id="city" placeholder="Ville" required>
                        <div class="invalid-feedback">
                        Please provide a valid state.
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="email">E-mail  :</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input type="text" class="form-control" id="email" placeholder="Votre valid adresse E-mail" aria-describedby="inputGroupPrepend" required>
                            <div class="invalid-feedback">
                                Please choose a username.
                            </div>
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
                <button id="submit_button" class="btn btn-primary" type="submit">Valider votre Commande</button>
            </form>`;

            //injection le formulaire
            addForm.insertAdjacentHTML("afterEnd",displayForm);
        }

        //appellé pour affichage du formulaire
        displaySectionForm(); 

        //selectionner le bouton pour envoyer le formulaire
        const submitFormButton = document.querySelector("#submit_button");
        

        //ajouter EventListener pour formulaire submit 
        submitFormButton.addEventListener("click", (e) => 
        {
            e.preventDefault();
            //recupère des valeurs du formilaire pour stocker dans le locale Storage
            const formulaireDetails = {
                firstName : document.querySelector("#firstName").value,
                lastName : document.querySelector("#lastName").value,
                address : document.querySelector("#address").value,
                city : document.querySelector("#city").value,
                email : document.querySelector("#email").value
            };

            //mettre le objet formulaireDetails dans le localStorage
            localStorage.setItem("formulaireDetails",JSON.stringify(formulaireDetails));
            
            
            console.table("formulaireDetails");
            console.table(formulaireDetails);
            //crée un objet pour mettre les valeurs de formulaire
            // et aussi les produits dans le panier
            const commandeEnvoyer = {
                selectedProducts,formulaireDetails
            };
            console.table(commandeEnvoyer);

            const post = {
                method: "POST",
                bodyData: JSON.stringify(commandeEnvoyer),
               //headers: { "Content-Type": 'application/JSON' }
              };
        
              
             let priceConfirmation = document.querySelector("#calcul_montant").innerText;
             
        
              
              
              fetch('http://localhost:3000/api/teddies/order',post)
              .then(function(Response){
                return Response.json();
                })
                  
                .then(postdata => {
                    e.preventDefault();
                 
                  window.alert("welcome"+postdata.orderId);
                  localStorage.setItem("responseOrder",postdata.orderId);
                  localStorage.setItem("total", priceConfirmation);
        
                 
                  // document.location.href = "confirmation.html";
                })
                 .catch((err) => {
                  alert("Il y a eu une erreur : " + err);
                });
        });
      
        
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

