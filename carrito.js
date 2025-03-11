document.addEventListener("DOMContentLoaded", renderCart);
console.log(localStorage.getItem("cart"));
console.log("Carrito en localStorage:", localStorage.getItem("cart"));

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

function agregarAlCarrito(id) {
    let carrito = getCart();
    carrito[id] = (carrito[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(carrito));
    console.log("Carrito actualizado:", carrito);
    mostrarCarrito();
}

if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify({}));
}

function mostrarCarrito() {
    let cart = getCart(); // Obtener carrito desde localStorage
    const products = [
        { id: "0", name: "Manzana", price: 5000, image: "imagenes/manzana.jpg" },
        { id: "1", name: "Plátano", price: 4000, image: "imagenes/platano.jpg" },
        { id: "2", name: "Pera", price: 4500, image: "imagenes/pera.jpg" },
        { id: "3", name: "Naranja", price: 3500, image: "imagenes/naranja.jpg" },
        { id: "4", name: "Uva", price: 9000, image: "imagenes/uva.jpg" },
        { id: "5", name: "Fresa", price: 12000, image: "imagenes/fresa.jpg" },
        { id: "6", name: "Acelga", price: 7000, image: "imagenes/acelga.jpg" },
        { id: "7", name: "Ajo", price: 6000, image: "imagenes/ajo.jpg" },
        { id: "8", name: "Alcachofa", price: 15000, image: "imagenes/alcachofa.jpg" },
        { id: "9", name: "Alcaparra", price: 3000, image: "imagenes/alcaparra.jpg" },
        { id: "10", name: "Apio", price: 8000, image: "imagenes/apio.jpg" },
        { id: "11", name: "Batata", price: 7500, image: "imagenes/batata.jpg" },
        { id: "12", name: "Berenjena", price: 10000, image: "imagenes/berenjena.jpg" },
        { id: "13", name: "Berros", price: 3500, image: "imagenes/berros.jpg" }
    ];
    
    let exoticProducts = [
        { id: "exotic-0", name: "Pitahaya", price: 15000, image: "imagenes/pitahaya.jpg" },
        { id: "exotic-1", name: "Mangostino", price: 18000, image: "imagenes/mangostino.jpg" },
        { id: "exotic-2", name: "Rambután", price: 16000, image: "imagenes/rambutan.jpg" },
        { id: "exotic-3", name: "Maracuyá", price: 10000, image: "imagenes/maracuya.jpg" },
        { id: "exotic-4", name: "Noni", price: 11000, image: "imagenes/Noni.jpg" },
        { id: "exotic-5", name: "Guayusa", price: 9000, image: "imagenes/guayusa.jpg" },
        { id: "exotic-6", name: "Açai", price: 17000, image: "imagenes/acai.jpg" },
        { id: "exotic-7", name: "Lulo", price: 14000, image: "imagenes/lulo.jpg" }
    ];
    
    let offerProducts = [
        { id: "offer-0", name: "Aguacate", price: 12000, image: "imagenes/aguacate.jpg" },
        { id: "offer-1", name: "Papaya", price: 8000, image: "imagenes/papaya.jpg" },
        { id: "offer-2", name: "Sandía", price: 7000, image: "imagenes/sandia.jpg" },
        { id: "offer-3", name: "Mora", price: 7500, image: "imagenes/Mora.jpg" },
        { id: "offer-4", name: "Tomate de árbo", price: 4000, image: "imagenes/tomate_arbol.jpg" },
        { id: "offer-5", name: "Melón", price: 5000, image: "imagenes/melon.jpg" },
        { id: "offer-6", name: "Durazno", price: 6500, image: "imagenes/durazno.jpg" }
    ];
   
    // Unificar todos los productos en una lista
    let allProducts = [...products, ...exoticProducts, ...offerProducts];

    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    let receiptText = "Detalles del total:\n---------------------------\n";

    Object.keys(cart).forEach(id => {
        let product = allProducts.find(p => p.id === id);
        if (!product) {
            console.error(`Producto no encontrado: ${id}`);
            return;
        }

        let quantity = cart[id];
        let subtotal = product.price * quantity;
        total += subtotal;

        let itemHTML = `
            <div class="flex justify-between p-2 border-b">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16">
                <p>${product.name}</p>
                <div class="flex items-center">
                    <button class="bg-gray-300 p-2 rounded" onclick="decreaseCart('${id}')">-</button>
                    <span class="mx-2">${quantity}</span>
                    <button class="bg-gray-300 p-2 rounded" onclick="increaseCart('${id}')">+</button>
                </div>                
            </div>
        `;

        cartItemsContainer.innerHTML += itemHTML;
        receiptText += `${quantity} x ${product.name} - $${subtotal}\n`;
    });

    document.getElementById("total-to-pay").innerText = `$${total}`;

    // Actualizar el textarea con el detalle de la compra
    let totalDetails = document.getElementById("total-details");
    if (totalDetails) {
        totalDetails.value = receiptText;
    } else {
        console.error("No se encontró el elemento con id 'total-details'");
    }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

function renderCart() {
    const cart = getCart();
    console.log("Carrito actual:", cart);

    const cartItems = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const totalPrice = document.getElementById("total-price");
    const totalDetails = document.getElementById("total-details");

    if (!cartItems || !cartSummary || !totalPrice || !totalDetails) {
        return;
    }

    cartItems.innerHTML = "";
    cartSummary.innerHTML = "";
    let total = 0;
    let detailsText = "";

    Object.keys(cart).forEach(id => {
        let product = products[id];
        let quantity = cart[id];
        let subtotal = product.price * quantity;
        total += subtotal;
        detailsText += `${quantity} x ${product.name} - $${subtotal}\n`;

        cartItems.innerHTML += `
            <div class='bg-white p-4 rounded shadow-md text-center'>
                <img src='${product.image}' class='w-full h-32 object-cover'>
                <p class='font-bold'>${product.name}</p>
                <p>$${product.price}/kg</p>
                <div class='flex justify-center items-center mt-2'>
                    <button class='bg-gray-300 p-2 rounded' onclick='decreaseCart(${id})'>-</button>
                    <span class='mx-2'>${quantity}</span>
                    <button class='bg-gray-300 p-2 rounded' onclick='increaseCart(${id})'>+</button>
                </div>
            </div>`;
        cartSummary.innerHTML += `<p>${quantity} kg de ${product.name} - $${subtotal}</p>`;
    });

    totalPrice.innerText = `$${total}`;
    totalDetails.value = detailsText.trim(); // Actualiza la caja de texto con el detalle

    // Actualiza el contador del carrito
    document.getElementById("cart-counter").innerText = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function increaseCart(id) {
    let cart = getCart();
    cart[id]++;
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

function decreaseCart(id) {
    let cart = getCart();
    if (cart[id] > 1) {
        cart[id]--;
    } else {
        delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

function finalizarCompra() {
    if (confirm("¿Estás seguro de finalizar la compra?")) {
        localStorage.removeItem("cart");
        alert("¡Compra finalizada con éxito!");
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

function renderCart() {
    const cart = getCart();
    console.log("Carrito actual:", cart);

    const cartItems = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const totalPrice = document.getElementById("total-price");
    const totalDetails = document.getElementById("total-details");

    if (!cartItems || !cartSummary || !totalPrice || !totalDetails) {
        return;
    }

    cartItems.innerHTML = "";
    cartSummary.innerHTML = "";
    let total = 0;
    let detailsText = "";

    Object.keys(cart).forEach(id => {
        let product = products[id];
        let quantity = cart[id];
        let subtotal = product.price * quantity;
        total += subtotal;
        detailsText += `${quantity} x ${product.name} - $${subtotal}\n`;

        cartItems.innerHTML += `
            <div class='bg-white p-4 rounded shadow-md text-center'>
                <img src='${product.image}' class='w-full h-32 object-cover'>
                <p class='font-bold'>${product.name}</p>
                <p>$${product.price}/kg</p>
                <div class='flex justify-center items-center mt-2'>
                    <button class='bg-gray-300 p-2 rounded' onclick='decreaseCart(${id})'>-</button>
                    <span class='mx-2'>${quantity}</span>
                    <button class='bg-gray-300 p-2 rounded' onclick='increaseCart(${id})'>+</button>
                </div>
            </div>`;
        cartSummary.innerHTML += `<p>${quantity} kg de ${product.name} - $${subtotal}</p>`;
    });

    totalPrice.innerText = `$${total}`;
    totalDetails.value = detailsText.trim(); // Actualiza la caja de texto con el detalle

    // Actualiza el contador del carrito
    document.getElementById("cart-counter").innerText = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function increaseCart(id) {
    let cart = getCart();
    cart[id]++;
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

function decreaseCart(id) {
    let cart = getCart();
    if (cart[id] > 1) {
        cart[id]--;
    } else {
        delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

function finalizarCompra() {
    if (confirm("¿Estás seguro de finalizar la compra?")) {
        localStorage.removeItem("cart");
        alert("¡Compra finalizada con éxito!");
        location.reload();
    }
}
