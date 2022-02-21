if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', getCurrentCartItems);
} else {
    getCurrentCartItems();
}

currentUserId = 2; //get from local storage
currentCartId = 1; //get from local storage
toBeRemoved = [];

async function getCurrentCart(){
    let url = `http://localhost:8080/carthistory/current/${currentUserId}`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();
    currentCartId = requestBody.id;
}

async function getCurrentCartItems(){
    let url = `http://localhost:8080/cartitem/${currentCartId}`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();

    originalCartItems = {};
    for(let index in requestBody){
        originalCartItems[index] = requestBody[index];
    }

    appendItems(requestBody);
}

function appendItems(cartItems){
    var index = 0;
    for(let currCartItem of cartItems){
        let [imgPath, itemName, price] = [currCartItem.item.img_path, currCartItem.item.item_name, currCartItem.item.price];
        let currentRow = document.createElement("tr");
        let cartTable = document.querySelector(".cart-table");

        currentRow.classList.add("cart-row");
        currentRow.setAttribute("id", index);
        currentRow.innerHTML = 
            `<tr>
                <td><img src="${imgPath}" alt="" <span>${itemName}</span></td>
                <td><span>$${price.toFixed(2)}</span></td>
                <td><input class="qty" type="number" value="${currCartItem.quantity}"></td>
                <td><button class="button-delete" onclick="removeItem">Remove Item</button></td>
            </tr>`;
        cartTable.appendChild(currentRow);
        currentRow.getElementsByClassName("button-delete")[0].addEventListener("click", removeItem);
        currentRow.getElementsByClassName("qty")[0].addEventListener("change", updateQuantity)
        index++;
    }
    updateTotal();
}

function removeItem(event){
    var buttonClicked = event.target;
    var parentId = buttonClicked.parentElement.parentElement.id;
    toBeRemoved.push(originalCartItems[parentId].id);
    delete originalCartItems[parentId];
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

function updateQuantity(event){
    var qtyChanged = event.target;
    var parentId = qtyChanged.parentElement.parentElement.id;
    originalCartItems[parentId].quantity = qtyChanged.value;
    updateTotal();
}

function updateTotal(){
    var result = 0;
    var itemCount = 0;
    for(let key in originalCartItems){
        result += originalCartItems[key].quantity * originalCartItems[key].item.price;
        itemCount += parseInt(originalCartItems[key].quantity);
    }
    document.getElementById("total").innerHTML = "Subtotal (" + itemCount + " items): " + result;
    document.getElementsByClassName("cart-headers")[0].style.display = (itemCount == 0) ? "none" : "table-row";
}

async function updateCartState(event){
    for(let key in originalCartItems){
        let url = `http://localhost:8080/cartitem/${originalCartItems[key].id}`;

        const data = {
            id: originalCartItems[key].id,
            quantity: originalCartItems[key].quantity,
            cartHistory: originalCartItems[key].cartHistory,
            item: originalCartItems[key].item
        }

        const httpResponse = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const body = await httpResponse.json();
    }

    for(let cartItemId of toBeRemoved){
        let url = `http://localhost:8080/cartitem/${cartItemId}`;

        const httpResponse = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    toBeRemoved = [];
}

// window.addEventListener("beforeunload", updateCartState)