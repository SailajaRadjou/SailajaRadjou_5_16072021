
const urlQuery = window.location.search;
const urlParams = new URLSearchParams(urlQuery);
const id = urlParams.get('id');
console.log(id);
function productLoad()
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

      })

}      

    productLoad();