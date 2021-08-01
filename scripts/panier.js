
let products = JSON.parse(localStorage.getItem('newProduct'));
console.log(products);

const cartMain = document.getElementById('cart_page');
const listProductOneByOne = document.getElementById("next_row");
const noOfProducts =  document.getElementById('count_articles'); 

let showProductPanier = [];
let calculMontant = 0;
//countArticles();
loadPanier();


function loadPanier()
{
    if(products == null || products.length === 0)
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
        noOfProducts.innerHTML =  parseInt(products.length) + "&nbsp;&nbsp;"+'Articles';
        for(i=0;i<products.length;i++)
        {
            showProductPanier = showProductPanier + 
            `<tr>
                
                <td>${products[i].productName}</td>
                <td>${products[i].productColor}</td>
                <td>${products[i].Quantity}</td>
                <td>${products[i].productCost}</td>
                <td>${(parseInt(products[i].productCost)*parseInt(products[i].Quantity)).toFixed(2)}€</td>
            
            </tr>`;
            
            
            
            const calculMontantCol = document.getElementById('calcul_montant');
            calculMontant = calculMontant + parseInt(products[i].productCost)*parseInt(products[i].Quantity);
            
            calculMontantCol.innerText = calculMontant.toFixed(2) + '€';
        
        }
        if(i == products.length)
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
           /* const contact= {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                address: document.querySelector("#address").value,
                city: document.querySelector("#city").value,
                email: document.querySelector("#email").value
            };*/

            const contact= {
                firstName: "test",
                lastName: "test",
                address: "test",
                city: "test",
                email: "test"
            };

            const products = ["5be9c8541c9d440000665243"];

            //mettre le objet contact dans le localStorage
            localStorage.setItem("contact",JSON.stringify(contact));
            
            
            console.table("contact");
            console.table(contact);
            //crée un objet pour mettre les valeurs de formulaire
            // et aussi les produits dans le panier
            const commandeEnvoyer = {
               contact, products
            };
            console.log("commandeEnvoyer");
            console.table(commandeEnvoyer);

            const promisePost = fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                body: JSON.stringify(commandeEnvoyer),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let amountPayable = document.querySelector("#calcul_montant").innerText;
            promisePost.then(async (response) => {
                try {
                    
                    const contentResponse = await response.json();
                    console.log("response contentResponse");
                    console.log(contentResponse);
                    if (response.ok){
                        console.log(`response OK : ${response.ok}`);
                        console.log("contentResponse ID");
                        console.log(contentResponse.orderId);

                        localStorage.setItem("responseOrderId",contentResponse.orderId);
                    }
                    else{
                        console.log(`respose server : ${response.status}`);
                        alert(`problem avec server : ${response.status}`);
                    }                     
                    localStorage.setItem("total", amountPayable);
            
                }catch (e) {
                    console.log(e);
                }
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
