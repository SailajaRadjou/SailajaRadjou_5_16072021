//récupération les données de localStorage
let storedProducts = JSON.parse(localStorage.getItem('newProduct'));
console.log(storedProducts);

let storageQuantity = JSON.parse(localStorage.getItem('countProducts'));

const cartMain = document.getElementById('cart_page');
const listProductOneByOne = document.getElementById("next_row");
const noOfStoredProducts =  document.getElementById('count_articles'); 

let showProductPanier = [];
let calculMontant = 0;

loadPanier();

function loadPanier()
{
    if(storedProducts == null || storedProducts.length === 0)
    {
        // si le panier est vide 
        document.getElementById("cart_container").style.display = "none";
        document.getElementById("form_section").style.display = "none";
        document.getElementById("delete").style.display = "none";
        noOfStoredProducts.innerHTML =  0 + "&nbsp;&nbsp;"+'Articles';
        const emptyBasket = `
            <div class = "cart_content container container-sm panier_vide_container">
                <div class = "cart_empty container container-sm"><h2 class="panier_vide_text">Votre panier est actuellement vide !</h2></div>
                <button class="display_submit panier_display_button"><a href="index.html">Retour à la Boutique</a></button>
            </div>    
        `;
        cartMain.innerHTML = emptyBasket; 
    } 
    else {
         // si le panier a des produits => récupération des éléments du panier

        noOfStoredProducts.innerHTML = storageQuantity + "&nbsp;&nbsp;"+'Articles';
        for(i=0;i<storedProducts.length;i++)
        {
            showProductPanier = showProductPanier + 
            `<tr>
                
                <td class="table_items">${storedProducts[i].productName}</td>
                <td class="table_items">${storedProducts[i].productColor}</td>
                <td class="table_items">${storedProducts[i].Quantity}</td>
                <td class="table_items">${storedProducts[i].productCost}</td>
                <td class="table_items">${(parseInt(storedProducts[i].productCost)*parseInt(storedProducts[i].Quantity)).toFixed(2)}€</td>
            
            </tr>`;
             //calcul du montant total           
            const calculMontantCol = document.getElementById('calcul_montant');
            calculMontant = calculMontant + parseInt(storedProducts[i].productCost)*parseInt(storedProducts[i].Quantity);
            
            calculMontantCol.innerText = calculMontant.toFixed(2) + '€';
        
        }
        if(i == storedProducts.length)
        {
            listProductOneByOne.innerHTML = showProductPanier;
        } 

        //Afficher le formulaire via JS
        const displaySectionForm = () => 
        {
            //le positionnement du formulaire
            const addForm = document.querySelector('#form_section');
            
            const displayForm = 
            `<form class="needs-validation form_display" novalidate>
                <div class="form-row form_content_display">
                    <div class="col-md-4 mb-3 form_items_display">
                        <label for="firstName">Nom  :</label>
                        <input type="text" class="form-control form_text_input" id="firstName" placeholder="Votre nom" required>
                    </div>
                    <div class="col-md-4 mb-3 form_items_display">
                        <label for="lastName">Prénom  :</label>
                        <input type="text" class="form-control form_text_input" id="lastName" placeholder="Votre prénom" required>
                    </div>
                    <div class="form-row form_items_display">
                        <div class="col-md-6 mb-3">
                        <label for="address">Adresse  :</label>
                        <input type="text" class="form-control form_text_input" id="address" placeholder="Votre adresse" required>
                    </div>
                    <div class="col-md-3 mb-3 form_items_display">
                        <label for="city">Ville  :</label>
                        <input type="text" class="form-control form_text_input" id="city" placeholder="Ville" required>
                    </div>
                    <div class="col-md-4 mb-3 form_items_display">
                        <label for="email">Adresse e-mail  :</label>
                        <input type="email" class="form-control form_text_input" id="email" placeholder="Votre valid adresse E-mail" aria-describedby="inputGroupPrepend" required>
                    </div>
                </div>
                
                <button id="submit_button" class="btn btn-primary form_button_display" type="submit">Valider votre Commande</button>
            </form>`;

            //injection le formulaire HTML
            addForm.insertAdjacentHTML("beforeEnd",displayForm);
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
           
            const contact= {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                address: document.querySelector("#address").value,
                city: document.querySelector("#city").value,
                email: document.querySelector("#email").value
            };

            //Form validity

            //appellé le fonction pour afficher alert
            function alertWindow(texteAlert)
            {
                window.alert(texteAlert+"\nle Chiffre & le Symbole ne sont pas autorisés!\nContient obligatoirement minimum 2 characters");
            }

            //appellé le fonction pour tester Regular Expressions pour firstName,lastName & city
            const regExForNameCity = (value) =>
            {
                return /^[A-Za-z\s,'-]{2,20}$/.test(value);
            }

            //appellé le fonction pour tester Regular Expressions pour adresse e-mail
            const regExForEmail = (value) =>
            {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            }

            //appellé le fonction pour tester Regular Expressions pour adresse postale
            const regExForAddress = (value) =>
            {
                return /^[A-Za-z0-9\s,'-]{3,30}$/.test(value);
            }
            
            //checking validity for first name
             
            function firstNameValidity()
            {
                const firstNameValid = contact.firstName;
                if(regExForNameCity(firstNameValid))
                {
                    firstName.style.border = 'solid 2px green'
                    firstName.style.boxShadow = '0px 0px 4px green'
                    return true;
                }
                else
                {
                    firstName.style.border = 'solid 2px red'
                    firstName.style.boxShadow = '0px 0px 4px red'
                    alertWindow(firstNameValid);
                    return false;
                }
            }

            //checking validity for last name
            function lastNameValidity()
            {
                const lastNameValid = contact.lastName;
                if(regExForNameCity(lastNameValid))
                {
                    lastName.style.border = 'solid 2px green'
                    lastName.style.boxShadow = '0px 0px 4px green'
                    return true;
                }
                else
                {
                    lastName.style.border = 'solid 2px red'
                    lastName.style.boxShadow = '0px 0px 4px red'
                    alertWindow(lastNameValid);
                    return false;
                }
            }

            //checking validity for city name
            function citytNameValidity()
            {
                const cityNameValid = contact.city;
                if(regExForNameCity(cityNameValid))
                {
                    city.style.border = 'solid 2px green'
                    city.style.boxShadow = '0px 0px 4px green'
                    return true;
                }
                else
                {
                    city.style.border = 'solid 2px red'
                    city.style.boxShadow = '0px 0px 4px red'
                    alertWindow(cityNameValid);
                    return false;
                }
            }

            //checking validity for E-mail
            function emailValidity()
            {
                const emailValid = contact.email;
                if(regExForEmail(emailValid))
                {
                    email.style.border = 'solid 2px green'
                    email.style.boxShadow = '0px 0px 4px green'
                    return true;
                }
                else
                {
                    email.style.border = 'solid 2px red'
                    email.style.boxShadow = '0px 0px 4px red'
                    alert("Veuillez saisir une valide adresse mail (exemple : abcd@mail.com).");
                    return false;
                }
            }
            
            //checking validity for address
            function addressValidity()
            {
                const addressValid = contact.address;
                if(regExForAddress(addressValid))
                {
                    address.style.border = 'solid 2px green'
                    address.style.boxShadow = '0px 0px 4px green'
                    return true;
                }
                else
                {
                    address.style.border = 'solid 2px red'
                    address.style.boxShadow = '0px 0px 4px red'
                    alert("Aucun symbole n'est autorisé pour l'adresse");
                    return false;
                }
            }

            //pour controller les valeurs de formulaire si bon le object contact va stocker dans le localStorage
            if(firstNameValidity() && lastNameValidity() && addressValidity() && citytNameValidity() && emailValidity())
            {
                //mettre le objet contact dans le localStorage
                localStorage.setItem("contact",JSON.stringify(contact));
                            
                // création du tableau products ("_id" de teddies du panier)
                let products = [];
                for (storedProduct of storedProducts) {
                    let storedProductId = storedProduct.productId;
                    products.push((storedProductId));
                }
                console.log("productsId");
                console.log(products);
                
                //crée un objet pour mettre les valeurs de formulaire
                // et aussi les produits dans le panier
                const commandeEnvoyer = {
                contact, products
                };
                console.log("commandeEnvoyer");
                console.table(commandeEnvoyer);

                //envoie de l'objet "commandeEnvoyer" vers le serveur et transformer notre objet JavaScript en JSON
                const promisePost = fetch("http://localhost:3000/api/teddies/order", {
                    method: "POST",
                    body: JSON.stringify(commandeEnvoyer),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // envoie du prix total au localStorage
                let amountPayable = document.querySelector("#calcul_montant").innerText;
                
                localStorage.setItem("totalAmount", amountPayable);
                const storagePrice = localStorage.getItem('totalAmount');
                console.log(storagePrice);
            
                //response du serveur dans le console
                promisePost.then(async (response) => {
                    try {
                        
                        const contentResponse = await response.json();
                        console.log("Server Response");
                        console.log(contentResponse);
                        if (response.ok){
                            console.log(`response OK : ${response.ok}`);
                            console.log("Response from serveur OrderId");
                            console.log(contentResponse.orderId);

                            localStorage.setItem("responseOrderId",contentResponse.orderId);

                            window.location.href = "confirmation.html";
                            localStorage.removeItem("newProduct");
                        }
                        else{
                            console.log(`respose server : ${response.status}`);
                            alert(`problem avec server : ${response.status}`);
                        }                     
                                
                    }
                    //appelée s’il y a une erreur qui est survenue lors de la requête
                    catch (e) {
                        console.log(e);
                    }
                });
            }
            else
            {
                alert("Veuillez bien remplir le formulaire !")
            }
        });
    }
}

//eventListener pour vider le panier
const deleteContent = document.getElementById('delete');
deleteContent.addEventListener("click", function (event)
{
    //ajouter une boite de dialog de confirmation pour vider le panier
    if (confirm("Êtes-vous sure de vider tous vos panier ?"))
    {
        localStorage.removeItem('newProduct');
        localStorage.clear();
        document.getElementById("cart_container").style.display = "none";
        document.getElementById("form_section").style.display = "none";

        noOfstoredProducts.innerHTML = 0 + "&nbsp;&nbsp;"+'Articles'; 
    
        const cartEmptyDiv = document.createElement('div');
        cartMain.appendChild(cartEmptyDiv);
        cartEmptyDiv.className = 'cart_content';

        const emptyCart = document.createElement('p');
        cartEmptyDiv.appendChild(emptyCart);
        emptyCart.className = "cart_empty";
        emptyCart.textContent = "Votre panier est vide !"
    }
        
});
