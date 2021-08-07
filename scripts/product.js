
const noOfProducts =  document.getElementById('count_articles'); 
let refreshQuantity= JSON.parse(localStorage.getItem('countProducts'));
main();

function main()
{
  //pour afficher nombres de articles dans le panier
  storageQuantity();
  //la fonction getOneProduct est appellée
  getOneProduct();
}   
function getOneProduct()
{
  let selectedProduct = JSON.parse(localStorage.getItem('newProduct'));
   //récupération de l'id de l'ourson de URL pageweb
   //La partie de l'URL qui suit le symbole « ? », avec ce symbole inclus
   const urlQuery = window.location.search;
   //Retourne un objet URLSearchParams  permettant d'accéder aux arguments de requête GET contenus dans l'URL.
   const urlParams = new URLSearchParams(urlQuery);
   //Retourne la première valeur associée au paramètre de recherche donné.
   const id = urlParams.get('id');
   console.log("Selected Product Id");
   console.log(id);
   // récupération des données de ourson sélectionné par son id
   fetch('http://localhost:3000/api/teddies/' + id)
      .then(function (response)
      {
        return response.json();
      })
      .then(function(receivedData)
      {
        const product = receivedData;
        console.log("Selected Product Details");
        console.table(product);

        //crée le tag div pour image
        const productImageDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productImageDiv);
        productImageDiv.classList.add("product_display_container");
        productImageDiv.classList.add("container","container-sm");

        //crée le tag image et ses attribute 
        const productImageImg = document.createElement("img");
        productImageDiv.appendChild(productImageImg);
        productImageImg.classList.add("product_image","img-fluid");
        productImageImg.setAttribute('src', product.imageUrl);
        productImageImg.setAttribute('alt', 'Ours en peluche ' + product.name);
        productImageImg.setAttribute('title', 'Ours en peluche ' + product.name);

        //crée le tag div pour afficher le details de produits selectioné
        const productDetailDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productDetailDiv);
        productDetailDiv.classList.add("product_details_display");
        productDetailDiv.classList.add("cotainer","container-sm");

        // Pour afficher le nom de l'ourson selectionné
        const productTitle = document.createElement("h3");
        productDetailDiv.appendChild(productTitle);
        productTitle.classList.add("product_title");
        productTitle.innerHTML = product.name;

        //création l'élement HTML label pour description
        const productLabelDescription = document.createElement("label");
        productLabelDescription.setAttribute("for","description");
        productLabelDescription.innerHTML = "Description :  ";
        productDetailDiv.appendChild(productLabelDescription);
        
        //création l'élement HTML para pour afficher la description
        const productDescription = document.createElement("p");
        productDescription.setAttribute("name","description");
        productDescription.classList.add("description");
        productDescription.innerHTML = product.description;
        productDetailDiv.appendChild(productDescription);

        //création l'élement HTML form pour afficher la description
        const productForm = document.createElement('form');
        productDetailDiv.appendChild(productForm);
        productForm.classList.add("color_quantity");

        const productFormDiv = document.createElement('div');
        productForm.appendChild(productFormDiv);
        productFormDiv.className = 'colors_choices';

        //création l'élement HTML label pour la couleur
        const productLabelColor = document.createElement("label");
        productLabelColor.innerHTML = "Couleur"+"&nbsp;&nbsp; :"+"&emsp;";
        productFormDiv.appendChild(productLabelColor);
        productLabelColor.setAttribute('for', "colors available" + product.name);

        //création l'élement HTML select pour afficher la couleur dans le drop down list box
        const colorList = document.createElement("select");
        productFormDiv.appendChild(colorList);
        colorList.setAttribute('name', "colors available" + product.name);
        colorList.setAttribute('id', "select_list");
        colorList.setAttribute('class', "form-select select_size");

        const colors = product.colors;//Récupérer les listes de couleurs
       
        //création l'élement HTML option pour ajouter les values 
        for (let i = 0; i < colors.length; i++)
        {
            const selectOption = document.createElement('option');
            colorList.appendChild(selectOption);
            selectOption.textContent += colors[i];
            selectOption.setAttribute("value", colors[i]);
        }
        //création l'élement HTML label pour la quantity
        const quantitySelectLabel = document.createElement("label");
        
        productFormDiv.appendChild(quantitySelectLabel);
        quantitySelectLabel.innerHTML = "&emsp;"+"Quantité"+"&emsp; :"+"&emsp;";
        quantitySelectLabel.setAttribute('for', "select-quantity");
        quantitySelectLabel.setAttribute('class', "select_quantity_label");

        //création l'élement HTML select pour afficher la couleur dans le drop down list box
        const quantityList = document.createElement("select");
        productFormDiv.appendChild(quantityList);
        quantityList.setAttribute('name', "select-quantity");
        quantityList.setAttribute('id', "select_list_quantity");
        quantityList.setAttribute('class', "formselect select_quantity");

        for (let i = 1; i <= 10; i++)
        {
            const quantityOption = document.createElement('option');
            quantityList.appendChild(quantityOption);
            quantityOption.textContent += i;
            quantityOption.setAttribute("value", i);
        }
        
        const lineBreak = document.createElement('br');
        productFormDiv.appendChild(lineBreak);

        //création l'élement HTML label pour le prix
        const productLabelRate = document.createElement("label");
        productLabelRate.innerHTML = "Prix"+"&emsp; :"  +"&emsp;";
        productFormDiv.appendChild(productLabelRate);
        productLabelRate.setAttribute('for', "price");
        
        //création l'élement HTML para pour afficher le prix
        const productRate = document.createElement('p');
        productFormDiv.appendChild(productRate);
        productRate.className = 'product_rate';
        productRate.setAttribute('name', "price");
        productRate.textContent = product.price / 100+ " €";
                
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
          let calculQuantityPanier=parseInt(quantityList.value);
          if(selectedProduct == null || selectedProduct.length === 0)
          {
             console.log("Le Panier est Vide");
          }else
          {           
            for(i=0;i<selectedProduct.length;i++)
            {
              const quantities =parseInt(selectedProduct[i].Quantity);
              console.log("quantities new");
              console.log(quantities);
              calculQuantityPanier= calculQuantityPanier + parseInt(selectedProduct[i].Quantity);
              console.log(calculQuantityPanier);
            }
          }
          
          let productAdded = {
            productName : product.name,
            productId : product._id,
            productColor : colorList.value,
            Quantity : quantityList.value,
            productCost : (product.price / 100)+ " €",
            TotalQuantity : calculQuantityPanier
          };

          const storageProducts = () =>
          {
            //La méthode push() ajoute de nouveaux éléments à la fin d'un tableau
            selectedProduct.push(productAdded);
            //pour ENREGISTRER les données sur localStorage
            localStorage.setItem('newProduct', JSON.stringify(selectedProduct));
            localStorage.setItem('countProducts', productAdded.TotalQuantity);
          };
         
          if(selectedProduct)
          {
            storageProducts();
           
          }
          else
          {
            selectedProduct = [];
            storageProducts();
            console.log(selectedProduct.length);           
          } 
          refreshQuantity= JSON.parse(localStorage.getItem('countProducts'));      
          window.alert(product.name + " " + colorList.value + ' a bien été ajouté!');
          console.table(selectedProduct); 
          noOfProducts.innerHTML = refreshQuantity + "&nbsp;&nbsp;"+'Articles';
          console.log(refreshQuantity);
        })
      })
      .catch(erreur => console.log('error : '+ erreur))
} 