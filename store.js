var removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener("click", function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByName('small-container cart-page')[0]
    var cartRows = cartItemContainer.getElementsByTagName('cart-info')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRows = cartRow[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        total = total +(price * quantity)
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total

}













if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
        <ion-icon name="close-circle"></ion-icon>
           <img src="./images/${item.tag}.jpg">
           <span>${item.name}</span>
        </div>
        <div class="price">${item.price}</div>
        <div class="quantity">
          <ion-icon name="arrow-dropleft-circle"></ion-icon>
          <span>${item.inCart}</span>
          <ion-icon name="arrow-dropright-circle"></ion-icon>
        </div>
        <div class="total"> ${item.inCart * item.price},00</div
        `
    });

    productContainer.innerHTML +=`
        <div class="basketTotalContainer">
           <h4 class="basketTotalTitle">
              Basket Total
            </h4>
            <h4 class="basketTotal">
                ksh:${cartCost},00
            </h4>
    `

}