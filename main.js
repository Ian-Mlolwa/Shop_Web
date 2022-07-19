let carts = document.querySelectorAll('.to-cart');

let products = [
    {
        name:"Plain T-shirts",
        tag:"plain t-shirts",
        price:2000,
        inCart:0
    },
    {
        name:"T-shirt",
        tag:"T-shirt",
        price:400,
        inCart:0
    },
    {
        name:"Ladies Whear",
        tag:"Ladies Whear",
        price:300,
        inCart:0
    },
    {
        name:"Sweter",
        tag:"sweter",
        price:500,
        inCart:0
    },
    {
        name:"Lether Jacket",
        tag:"lether jacket",
        price:800,
        inCart:0
    },
    {
        name:"Ladies Dress",
        tag:"ladies dress",
        price:700,
        inCart:0
    },
    {
        name:"Sport Shoes",
        tag:"sport shoes",
        price:900,
        inCart:0
    },
    {
        name:"Convers",
        tag:"Convers",
        price:550,
        inCart:0
    },
    {
        name:"Lether Shoes",
        tag:"lether shoes",
        price:1200,
        inCart:0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(action) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");

    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {   

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem("totalCost");

    console.log("my cartCost is", cartCost);
    console.log(typeof cartCost);

    if( action) {
        cartCost = parseInt(cartCost);

        localStorage.setItem("totalCost", cartCost - product.price);
    }else if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    let productContainer = document.querySelector(".products");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item) => {
            productContainer.innerHTML += `
                <div class="product">
                <ion-icon name="close-circle"></ion-icon>                
                <img src="./images/${item.tag}.jpg">     
                    <span><i>${item.name}</i></span>
                </div>
                <div class="price"><b>${item.price}.00</b></div>
                <div class="quantity">
                    <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>

                 </div>
                <div class="total">
                    <span>${item.inCart * item.price}.00</span>
                </div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal:">
                    ${cartCost}.00
                </h4>
            </div>
        `;   
    }
    deleteButtons();
    manageQuantity();
}

 function manageQuantity() {
     let decreaseButtons = document.querySelectorAll('.decrease');
     let increaseButtons = document.querySelectorAll('.increase');
     let cartItems = localStorage.getItem('productsInCart');
     let currentQuantity = 0;
     let currentProduct = cartItems;
     cartItems = JSON.parse(cartItems);
     console.log(cartItems);

     for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log('decrease button');
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log('increase button');
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct], "increase");
                totalCost(cartItems[currentProduct], "increase");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    let productName ="";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            console.log('delete');
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();