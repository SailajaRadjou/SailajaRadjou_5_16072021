
const urlQuery = window.location.search;
const urlParams = new URLSearchParams(urlQuery);
const id = urlParams.get('id');
console.log(id);
function getProduct()
{
    // On récupère uniquement le produit via le paramètre dans la requête
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

        const productTitle = document.createElement("h3");
        productDetailDiv.appendChild(productTitle);
        productTitle.classList.add("product_title");
        productTitle.innerHTML = products.name;

        const productLabelDescription = document.createElement("label");
        //productLabelDescription.setAttribute("for",description);
        productLabelDescription.innerHTML = "Description :  " + products.description;
        productDetailDiv.appendChild(productLabelDescription);

        const productLabelColor = document.createElement("label");
        productLabelColor.htmlFor = "colorlist";
        productLabelColor.innerHTML = "Color :  ";
        productDetailDiv.appendChild(productLabelColor);

       const colors = products.colors;
       const colorList = document.createElement("select");
       colorList.setAttribute("name","colorlist");
       for (let i = 0; i < colors.length; i++) {
            const selectOption = document.createElement('option');
            productLabelColor.appendChild(colorList);
            colorList.textContent += colors[i];
            colorList.setAttribute("value", colors[i]);
        }
      })

}      

getProduct();