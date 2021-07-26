
contentLoad();


function contentLoad()
{
    let url = 'http://localhost:3000/api/teddies';
    fetch(url)
    .then(function(Response){
        return Response.json();
    })
    .then(function(receivedData)
    {
        const products = receivedData;
        console.log(products);
        for(let product of products)
        {
            const productImageDiv = document.createElement("div");
            document.querySelector(".display_content").appendChild(productImageDiv);
            productImageDiv.classList.add("product_list");

            const productLink = document.createElement("a");
            productImageDiv.appendChild(productLink);
            productLink.className = 'product_link';
            productLink.href="product.html";
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
            const productPrice = product.price / 100;
            productRate.textContent = productPrice.toFixed(2)+ " €";
        }
            
    })
    .catch(erreur => console.log('error : '+ erreur));
}