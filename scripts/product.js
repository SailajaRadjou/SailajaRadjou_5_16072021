
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
        console.log(products);

        const productImageDiv = document.createElement("div");
        document.querySelector(".product_description").appendChild(productImageDiv);
        productImageDiv.classList.add("product_dis");

        const productImageImg = document.createElement("img");
        productImageDiv.appendChild(productImageImg);
        productImageImg.classList.add("product_image");
        productImageImg.setAttribute('src', products.imageUrl);
        productImageImg.setAttribute('alt', 'Ours en peluche ' + products.name);
        productImageImg.setAttribute('title', 'Ours en peluche ' + products.name);
      })

}      

getProduct();