let refreshQuantity= JSON.parse(localStorage.getItem('countProducts'));
const noOfProducts =  document.getElementById('count_articles'); 
main();

function main()
{
     //pour afficher nombres de articles dans le panier
     storageQuantity();
    //la fonction getAllProducts est appellée
    getAllProducts();
}
function getAllProducts()
{
    //récupération des données de l'API via URL
    let url = 'http://localhost:3000/api/teddies';
    
    fetch(url)
    .then(function(Response){
        //pour récupérer le résultat de la requête au format json
        return Response.json();
    })
    //récupérons sa vraie valeur
    .then(function(receivedData)
    {
        //récupération tous les données de l'API
        const products = receivedData;
        console.log("Received Products");
        console.table(products);

        for(let product of products)
        {
            //Création de DOM et afficher les données de l'API que on avait recupérer 
            const productImageDiv = document.createElement("div");
            document.querySelector(".display_content").appendChild(productImageDiv);
            productImageDiv.classList.add("product_list","container-sm","container");

            const productLink = document.createElement("a");
            productImageDiv.appendChild(productLink);
            productLink.className = 'product_link';
            productLink.href="product.html?id=" + product._id;
            productLink.setAttribute('title', "L'ourson " + product.name + " vous attend !");

            const productImageImg = document.createElement("img");
            productLink.appendChild(productImageImg);
            productImageImg.classList.add("product_image","img-fluid");
            productImageImg.setAttribute('src', product.imageUrl);
            productImageImg.setAttribute('alt', 'Ours en peluche ' + product.name);
            productImageImg.setAttribute('title', 'Ours en peluche ' + product.name);

            const productDetail = document.createElement('div');
            productImageDiv.appendChild(productDetail );
            productDetail.classList.add("product_detail","container-sm","container");

            const productDetailButton = document.createElement('a');
            productDetail.appendChild(productDetailButton);
            productDetailButton.classList.add("display_submit","voir_produit","order-1");
            productDetailButton.innerHTML="Voir le Produit"+"&nbsp;";
                       
            const chevronButtonIcon = document.createElement('i');
            productDetailButton.appendChild(chevronButtonIcon);
            chevronButtonIcon.classList.add("fas","fa-chevron-right");
            productDetailButton.href="product.html?id=" + product._id;

        
            const productNameRate = document.createElement('div');
            productDetail.appendChild(productNameRate);
            productNameRate.classList.add("product_name_rate","order-sm-1","order-md-1");

            const productName = document.createElement('h3');
            productNameRate.appendChild(productName);
            productName.className = 'product_name';
            productName.textContent = product.name;
            
            const productRate = document.createElement('p');
            productNameRate.appendChild(productRate);
            productRate.className = 'product_rate';
            productRate.textContent = product.price / 100+ " €";
        }
            
    })
    //appelée s’il y a une erreur qui est survenue lors de la requête
    .catch(erreur => {
        const serveurErrorDiv = document.querySelector('#galerie_section_failure');
    const erreurServer =
    `<p class="error_message_connexion container">La connexion au serveur n'a pas pu être effectué.<br /> Verifier bien que vous avez lancé le serveur local (Port 3000) ?<br /> Puis vous réessayez !</p>`
    serveurErrorDiv.insertAdjacentHTML("beforeEnd",erreurServer);
    });
}