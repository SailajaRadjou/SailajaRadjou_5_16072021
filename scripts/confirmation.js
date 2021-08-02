// récupération de l'id de la commande
let orderId = localStorage.getItem('responseOrderId');
console.log(orderId);

// récupération du prix total de la commande
let amountPayable = localStorage.getItem('totalAmount');
console.log(amountPayable);

//création page de confirmation et remerciement
const displayConfirmationCommande = () => 
{
    //le positionnement de l'affichage de confirmation commande
    const addConfirmation = document.querySelector('#confirmation_container');
    
    const displayConfirmationContent = 
    ` <section class="confirmation_container_display">
        <h3>Récapitulatif de votre commande</h3>
        <p class="">Félicitation, votre commande à bien été prise en compte !</p>
        <h4 class="">Identifiant de votre commande : <span class="" id="order_id">${orderId}</span></h4>
        <h4 class="">Le montant total est de <span class="display-price">${amountPayable}</span></h4> 
        <p>Vos achats arriverons bientôt chez vous.<br /></p>
        <h5>Nous espérons vous revoir très vite chez Orinoco !<br /></h5>
        <h6>Remerciements de toute l'équipe d'Orinoco</h6>
        <div>
            <button><a href="index.html" title="Retour sur la page d'accueil">Retour à la Boutique</a></button>
        </div>
    </section> `;
    //injection le confirmation commande
    addConfirmation.insertAdjacentHTML("beforeEnd",displayConfirmationContent);
}
//appellé pour affichage de confirmation commande
displayConfirmationCommande(); 
