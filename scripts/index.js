contentLoad();

function contentLoad()
{
    let url = 'http://localhost:3000/api/teddies';
    fetch('http://localhost:3000/api/teddies').then((Response) => 
        Response.json().then((data) => 
        {
            console.log(data);
            
            for(let teddy of data)
            {
                let productImageDiv = document.createElement("div");
                document.querySelector(".displaycontent").appendChild(productImageDiv);
                productImageDiv.classList.add("productList");
                
                let productImageImg = document.createElement("img");
                document.querySelector(".productList").appendChild(productImageImg);
                productImageImg.src = teddy.imageUrl;
            }
            
        })
    ).catch(err => console.log('error : '+ err));
}