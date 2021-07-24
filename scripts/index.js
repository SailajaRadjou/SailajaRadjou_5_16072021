
contentLoad();


function contentLoad()
{
    let url = 'http://localhost:3000/api/teddies';
    fetch('http://localhost:3000/api/teddies').then(function(Response){
        return Response.json();
    })
    .then(function(data)
        {
            const articles = data;
            console.log(articles);
            for(let teddy of articles)
            {
                const productImageDiv = document.createElement("div");
                document.querySelector(".displaycontent").appendChild(productImageDiv);
                productImageDiv.classList.add("productList");

                const productLink = document.createElement("a");
                productImageDiv.appendChild(productLink);
                productLink.className = 'product_link';
                productLink.setAttribute('title', "L'ourson " + teddy.name + " vous attend !");

                const productImageImg = document.createElement("img");
                productLink.appendChild(productImageImg);
                productImageImg.classList.add("product_image");
                productImageImg.setAttribute('src', teddy.imageUrl);
                productImageImg.setAttribute('alt', 'Ours en peluche ' + teddy.name);
                productImageImg.setAttribute('title', 'Ours en peluche ' + teddy.name);
            }
            
        })
    .catch(err => console.log('error : '+ err));
}
