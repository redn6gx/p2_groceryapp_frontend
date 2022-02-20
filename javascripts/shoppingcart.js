/**
 * Retrieve all data from the current user's cart
 * Append each item to the main cart divider
 *      Remove button: Remove this item from cart
 *      Quantity: Number input that can be changed
 * Update current state of cart when user leaves page
 * Checkout button: Redirect to checkout page 
 * 
 * 
 * 
 * On page load
 *      Get a list of all items in shopping cart
 *      Iterate through items
 *      Add each item to the cart
 *      Update state of cart when leaving the page
 */

 if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', getCurrentCart);
} else {
    getCurrentCart();
}

currentUserId = 2; //get from local storage
currentCartId = "";

async function getCurrentCart(){
    let url = `http://localhost:8080/carthistory/current/${currentUserId}`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();
    currentCartId = requestBody.id;

    console.log(requestBody.user.id);
    console.log(requestBody);
    console.log(currentCartId);
}

function addCurrentItems(){
    
}

function addItem(){
    var imgPath = "https://pics.drugstore.com/prodimg/610336/900.jpg";
    var itemName = "Cinnamon Toast Crunch";
    var quantity = 2;
    var price = 20.00;
    var currentRow = document.createElement("tr");
    var cartTable = document.querySelector(".cart-table");

    currentRow.classList.add('cart-row');
    currentRow.innerHTML = 
    `<tr>
        <td><img src="${imgPath}" alt="" <span>${itemName}</span></td>
        <td><span>$${price.toFixed(2)}</span></td>
        <td><input type="number" value="${quantity}"></td>
        <td><button onClick="functionName()">Remove Item</button></td>
    </tr>`;

    cartTable.appendChild(currentRow);
}

function removeItem(){

}

async function updateCartState(){

}