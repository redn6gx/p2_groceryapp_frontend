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
    document.addEventListener('DOMContentLoaded', getCurrentCartItems);
} else {
    getCurrentCartItems();
}

currentUserId = 2; //get from local storage
currentCartId = 1; //get from local storage

async function getCurrentCart(){
    let url = `http://localhost:8080/carthistory/current/${currentUserId}`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();
    currentCartId = requestBody.id;

    console.log(requestBody.user.id);
    console.log(requestBody);
    console.log(currentCartId);
}

async function getCurrentCartItems(){
    let url = `http://localhost:8080/cartitem/${currentCartId}`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();

    // console.log(currentCartItems);

    // for(var prop of currentCartItems){
    //     console.log(prop.item.item_name);
    //     addItem(prop);
    // }

    appendItems(requestBody);
}

function appendItems(cartItems){
    for(let currCartItem of cartItems){
        console.log(currCartItem);
        let [imgPath, itemName, price] = [currCartItem.item.img_path, currCartItem.item.item_name, currCartItem.item.price];

        let currentRow = document.createElement("tr");
        let cartTable = document.querySelector(".cart-table");
        currentRow.classList.add('cart-row');
        currentRow.innerHTML = 
            `<tr>
                <td><img src="${imgPath}" alt="" <span>${itemName}</span></td>
                <td><span>$${price.toFixed(2)}</span></td>
                <td><input type="number" value="${currCartItem.quantity}"></td>
                <td><button onclick="removeItem()">Remove Item</button></td>
            </tr>`;
        cartTable.appendChild(currentRow);
    }
}

function removeItem(){

}

async function updateCartState(){

}