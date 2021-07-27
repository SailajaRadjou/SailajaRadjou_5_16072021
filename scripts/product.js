//récupération de l'id de l'ourson de la pageweb
const urlQuery = window.location.search;
const urlParams = new URLSearchParams(urlQuery);
const id = urlParams.get('id');
console.log(id);

function getProduct()
{
   // récupération des données de ourson sélectionné par son id
   fetch('http://localhost:3000/api/teddies/' + id)
      .then(function (response)
      {
        return response.json();
      })
      .then(function(receivedData)
      {
        const products = receivedData;
        console.log(products.colors);

        //crée le tag div pour image
        const productImageDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productImageDiv);
        productImageDiv.classList.add("product_display_container");

        //crée le tag image et ses attribute 
        const productImageImg = document.createElement("img");
        productImageDiv.appendChild(productImageImg);
        productImageImg.classList.add("product_image");
        productImageImg.setAttribute('src', products.imageUrl);
        productImageImg.setAttribute('alt', 'Ours en peluche ' + products.name);
        productImageImg.setAttribute('title', 'Ours en peluche ' + products.name);

        //crée le tag div pour afficher le details de produits selectioné
        const productDetailDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productDetailDiv);
        productDetailDiv.classList.add("product_details_display");

        // Pour afficher le nom de l'ourson selectionné
        const productTitle = document.createElement("h3");
        productDetailDiv.appendChild(productTitle);
        productTitle.classList.add("product_title");
        productTitle.innerHTML = products.name;

        //création l'élement HTML label pour description
        const productLabelDescription = document.createElement("label");
        productLabelDescription.setAttribute("for","description");
        productLabelDescription.innerHTML = "Description :  ";
        productDetailDiv.appendChild(productLabelDescription);
        
        //création l'élement HTML para pour afficher la description
        const productDescription = document.createElement("p");
        productDescription.setAttribute("name","description");
        productDescription.innerHTML = products.description;
        productDetailDiv.appendChild(productDescription);

        //création l'élement HTML form pour afficher la description
        const productForm = document.createElement('form');
        productDetailDiv.appendChild(productForm);

        const productFormDiv = document.createElement('div');
        productForm.appendChild(productFormDiv);
        productFormDiv.className = 'colors_choices';

        //création l'élement HTML label pour la couleur
        const productLabelColor = document.createElement("label");
        productLabelColor.innerHTML = "Color"+"&emsp; :"+"&emsp;";
        productFormDiv.appendChild(productLabelColor);
        productLabelColor.setAttribute('for', "colors available" + products.name);

        //création l'élement HTML select pour afficher la couleur dans le drop down list box
        const colorList = document.createElement("select");
        productFormDiv.appendChild(colorList);
        colorList.setAttribute('name', "colors available" + products.name);
        colorList.setAttribute('id', "select_list");
        colorList.setAttribute('class', "form-select select_size");

        const colors = products.colors;//Récupérer les listes de couleurs
       
        //création l'élement HTML option pour ajouter les values 
        for (let i = 0; i < colors.length; i++)
        {
            const selectOption = document.createElement('option');
            colorList.appendChild(selectOption);
            selectOption.textContent += colors[i];
            selectOption.setAttribute("value", colors[i]);
        }

        const lineBreak = document.createElement('br');
        productFormDiv.appendChild(lineBreak);

        //création l'élement HTML label pour le prix
        const productLabelRate = document.createElement("label");
        productLabelRate.innerHTML = "Price"+"&emsp; :"  +"&emsp;";
        productFormDiv.appendChild(productLabelRate);
        productLabelRate.setAttribute('for', "price" + products.name);
        
        //création l'élement HTML para pour afficher le prix
        const productRate = document.createElement('p');
        productFormDiv.appendChild(productRate);
        productRate.className = 'product_rate';
        productRate.setAttribute('name', "price" + products.name);
        const productPrice = products.price / 100;
        //concatener 2 chiffres après la virgule pour afficher les centimes
        productRate.textContent = productPrice.toFixed(2)+ " €";
                
        // création bouton panier
        let addCart = document.createElement('button');
        productForm.appendChild(addCart);
        addCart.setAttribute('type',"submit");
        addCart.setAttribute('name',"add");
        addCart.setAttribute('id',"submit");
        addCart.setAttribute('class',"display_submit");
        addCart.textContent = "Ajouter au panier";

        addCart.addEventListener("click", function (event) {

          event.preventDefault(); //pour empêcher le lien de suivre l'URL 

          let productAdded = {
            productName : products.name,
            productId : products._id,
            productColor : colorList.value,
            productCost : (products.price / 100).toFixed(2)+ " €",
          };
          console.log(productAdded);

          //Créer un localStorage et pour lire les données de localStorage
          let selectedProduct = JSON.parse(localStorage.getItem('productselect'));

          //Pour utiliser la fonction push d'un Array, le variable doit être un Array.
          selectedProduct=[];

          //La méthode push() ajoute de nouveaux éléments à la fin d'un tableau
          selectedProduct.push(productAdded);

          //pour ENREGISTRER les données sur localStorage
          localStorage.setItem('productselect',JSON.stringify(selectedProduct));

          console.log(selectedProduct);
          window.confirm(products.name + " " + colorList.value + ' a bien été ajouté.');
        })
      })
      .catch(erreur => console.log('error : '+ erreur))
} 
getProduct();