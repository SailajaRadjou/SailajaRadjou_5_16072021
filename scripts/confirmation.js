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
    ` <section class="confirmation_container_display confirmation_display">
        <h3 class="confirmation_title">Récapitulatif de votre commande</h3>
        <h4>Identifiant de votre commande : <span class="order_detail_display highlight_details" id="order_id">${orderId}</span></h4>
        <h4>Le montant total est de <span class="display-price order_detail_display highlight_details">${amountPayable}</span></h4> 
        <h5 class="text_confirmation">Vos achats arriverons bientôt chez vous.<br /></h5>
        <h5 class="text_confirmation">Nous espérons vous revoir très vite chez Orinoco !<br /></h5>
        <h6 class="text_confirmation">Remerciements de toute l'équipe d'Orinoco</h6>
        <div class="button_confirmation_div">
            <button class="form_button_display"><a href="index.html" title="Retour sur la page d'accueil">Retour à la Boutique</a></button>
        </div>
    </section> `;
    //injection le confirmation commande
    addConfirmation.insertAdjacentHTML("beforeEnd",displayConfirmationContent);
}
//appellé pour affichage de confirmation commande
displayConfirmationCommande(); 