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

        const productImageDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productImageDiv);
        productImageDiv.classList.add("product_display_container");

        const productImageImg = document.createElement("img");
        productImageDiv.appendChild(productImageImg);
        productImageImg.classList.add("product_image");
        productImageImg.setAttribute('src', products.imageUrl);
        productImageImg.setAttribute('alt', 'Ours en peluche ' + products.name);
        productImageImg.setAttribute('title', 'Ours en peluche ' + products.name);

        const productDetailDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productDetailDiv);
        productDetailDiv.classList.add("product_details_display");

        // Pour afficher le nom de l'ourson selectionné
        const productTitle = document.createElement("h3");
        productDetailDiv.appendChild(productTitle);
        productTitle.classList.add("product_title");
        productTitle.innerHTML = products.name;

        const productLabelDescription = document.createElement("label");
        productLabelDescription.setAttribute("for","description");
        productLabelDescription.innerHTML = "Description :  ";
        productDetailDiv.appendChild(productLabelDescription);
        
        const productDescription = document.createElement("p");
        productDescription.setAttribute("name","description");
        productDescription.innerHTML = products.description;
        productLabelDescription.appendChild(productDescription);

        const productForm = document.createElement('form');
        productDetailDiv.appendChild(productForm);
        const productFormDiv = document.createElement('div');
        productForm.appendChild(productFormDiv);
        productFormDiv.className = 'colors_choices';

        const productLabelColor = document.createElement("label");
        productLabelColor.innerHTML = "Color :  ";
        productFormDiv.appendChild(productLabelColor);
        productLabelColor.setAttribute('for', "colors available" + products.name);

        const colorList = document.createElement("select");
        productFormDiv.appendChild(colorList);
        colorList.setAttribute('name', "colors available" + products.name);
        colorList.setAttribute('id', "select_list ");
        const colors = products.colors;
       
        for (let i = 0; i < colors.length; i++) {
            const selectOption = document.createElement('option');
            colorList.appendChild(selectOption);
            selectOption.textContent += colors[i];
            selectOption.setAttribute("value", colors[i]);
        }
        const productLabelRate = document.createElement("label");
        productLabelRate.innerHTML = "Price :  ";
        productFormDiv.appendChild(productLabelRate);
        productLabelRate.setAttribute('for', "price" + products.name);

        const productRate = document.createElement('p');
        productLabelRate.appendChild(productRate);
        productRate.className = 'product_rate';
        productRate.setAttribute('name', "price" + products.name);
        const productPrice = products.price / 100;
        productRate.textContent = productPrice.toFixed(2)+ " €";

        // création bouton panier
        let addCart = document.createElement('button');
        productForm.appendChild(addCart);
        addCart.setAttribute('type',"submit");
        addCart.setAttribute('name',"add");
        addCart.setAttribute('id',"submit");
        addCart.textContent = "Ajouter au panier";


      })

}      

getProduct();