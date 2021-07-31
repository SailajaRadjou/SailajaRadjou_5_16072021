let selectedProduct = JSON.parse(localStorage.getItem('newProduct'));
const noOfProducts =  document.getElementById('count_articles'); 
if(selectedProduct == null || selectedProducts.length === 0)
{
    // si le panier est vide 
    
    noOfProducts.innerHTML =  0 + "&nbsp;&nbsp;"+'Articles';
    
} 
else
{
    noOfProducts.innerHTML =  selectedProduct.length + "&nbsp;&nbsp;"+'Articles';  
}
function contentLoad()
{
    //récupération des données de l'API via URL
    let url = 'http://localhost:3000/api/teddies';

    fetch(url)
    .then(function(Response){
        return Response.json();
    })
    .then(function(receivedData)
    {
        //récupération tous les données de l'API
        const products = receivedData;
        console.log(products);

        for(let product of products)
        {
            //Création de DOM et afficher les données de l'API que on avait recupérer 
            const productImageDiv = document.createElement("div");
            document.querySelector(".display_content").appendChild(productImageDiv);
            productImageDiv.classList.add("product_list");

            const productLink = document.createElement("a");
            productImageDiv.appendChild(productLink);
            productLink.className = 'product_link';
            productLink.href="product.html?id=" + product._id;
            productLink.setAttribute('title', "L'ourson " + product.name + " vous attend !");

            const productImageImg = document.createElement("img");
            productLink.appendChild(productImageImg);
            productImageImg.classList.add("product_image");
            productImageImg.setAttribute('src', product.imageUrl);
            productImageImg.setAttribute('alt', 'Ours en peluche ' + product.name);
            productImageImg.setAttribute('title', 'Ours en peluche ' + product.name);

            const productDetail = document.createElement('div');
            productImageDiv.appendChild(productDetail );
            productDetail.className = 'product_detail';
        
            const productName = document.createElement('h3');
            productDetail.appendChild(productName);
            productName.className = 'product_name';
            productName.textContent = product.name;
            
            const productRate = document.createElement('p');
            productDetail.appendChild(productRate);
            productRate.className = 'product_rate';
            productRate.textContent = product.price / 100+ " €";
        }
            
    })
    .catch(erreur => console.log('error : '+ erreur));
}

//la fonction contentLoad est appellée
contentLoad();

