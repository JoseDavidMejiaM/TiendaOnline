document.addEventListener("DOMContentLoaded", () => {
    setupUnitSelector();
    mostrarCarrito();
});

// Función para obtener el carrito desde localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

// Función para obtener la unidad seleccionada (kg o lb)
function getUnit() {
    return localStorage.getItem("unit") || "kg";
}

// Función para establecer la unidad seleccionada
function setUnit(unit) {
    localStorage.setItem("unit", unit);
    mostrarCarrito();
    updateCartCounter();
}

// Configurar el selector de unidades
function setupUnitSelector() {
    const unitSelector = document.getElementById("unit-selector");
    unitSelector.value = getUnit();
    unitSelector.addEventListener("change", (e) => {
        setUnit(e.target.value);
    });
}

// Productos unificados
const allProducts = [
    { id: "0", name: "Manzana", pricePerKg: 5000, pricePerLb: Math.round(5000 / 2.20462), image: "imagenes/manzana.jpg"},
    { id: "1", name: "Plátano", pricePerKg: 4000, pricePerLb: Math.round(4000 / 2.20462), image: "imagenes/platano.jpg"},
    { id: "2", name: "Pera", pricePerKg: 4500, pricePerLb: Math.round(4500 / 2.20462), image: "imagenes/pera.jpg"},
    { id: "3", name: "Naranja", pricePerKg: 3500, pricePerLb: Math.round(3500 / 2.20462), image: "imagenes/naranja.jpg"},
    { id: "4", name: "Uva", pricePerKg: 9000, pricePerLb: Math.round(9000 / 2.20462), image: "imagenes/uva.jpg"},
    { id: "5", name: "Fresa", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/fresa.jpg"},
    { id: "6", name: "Acelga", pricePerKg: 3000, pricePerLb: Math.round(3000 / 2.20462), image: "imagenes/acelga.jpg"},
    { id: "7", name: "Ajo", pricePerKg: 8000, pricePerLb: Math.round(8000 / 2.20462), image: "imagenes/ajo.jpg"},
    { id: "8", name: "Alcachofa", pricePerKg: 7500, pricePerLb: Math.round(7500 / 2.20462), image: "imagenes/alcachofa.jpg"},
    { id: "9", name: "Alcaparra", pricePerKg: 10000, pricePerLb: Math.round(10000 / 2.20462), image: "imagenes/alcaparra.jpg"},
    { id: "10", name: "Apio", pricePerKg: 3500, pricePerLb: Math.round(3500 / 2.20462), image: "imagenes/apio.jpg"},
    { id: "11", name: "Batata", pricePerKg: 4500, pricePerLb: Math.round(4500 / 2.20462), image: "imagenes/batata.jpg"},
    { id: "12", name: "Berenjena", pricePerKg: 5000, pricePerLb: Math.round(5000 / 2.20462), image: "imagenes/berenjena.jpg"},
    { id: "13", name: "Berros", pricePerKg: 3200, pricePerLb: Math.round(3200 / 2.20462), image: "imagenes/berros.jpg"},
    { id: "14", name: "Pitahaya", pricePerKg: 15000, pricePerLb: Math.round(15000 / 2.20462), image: "imagenes/pitahaya.jpg"},
    { id: "15", name: "Mangostino", pricePerKg: 18000, pricePerLb: Math.round(18000 / 2.20462), image: "imagenes/mangostino.jpg"},
    { id: "16", name: "Rambután", pricePerKg: 16000, pricePerLb: Math.round(16000 / 2.20462), image: "imagenes/rambutan.jpg"},
    { id: "17", name: "Maracuyá", pricePerKg: 10000, pricePerLb: Math.round(10000 / 2.20462), image: "imagenes/maracuya.jpg"},
    { id: "18", name: "Noni", pricePerKg: 20000, pricePerLb: Math.round(20000 / 2.20462), image: "imagenes/noni.jpg"},
    { id: "19", name: "Guayusa", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/guayusa.jpg"},
    { id: "20", name: "Açai", pricePerKg: 22000, pricePerLb: Math.round(22000 / 2.20462), image: "imagenes/acai.jpg"},
    { id: "21", name: "Lulo", pricePerKg: 9000, pricePerLb: Math.round(9000 / 2.20462), image: "imagenes/lulo.jpg"},
    { id: "22", name: "Aguacate", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/aguacate.jpg"},
    { id: "23", name: "Papaya", pricePerKg: 8000, pricePerLb: Math.round(8000 / 2.20462), image: "imagenes/papaya.jpg"},
    { id: "24", name: "Sandía", pricePerKg: 7000, pricePerLb: Math.round(7000 / 2.20462), image: "imagenes/sandia.jpg"},
    { id: "25", name: "Mora", pricePerKg: 6000, pricePerLb: Math.round(6000 / 2.20462), image: "imagenes/mora.jpg"},
    
    { id: "26", name: "Col rizada (Kale)", pricePerKg: 8500, pricePerLb: Math.round(8500 / 2.20462), image: "imagenes/kale.jpg"},
    { id: "27", name: "Brócoli romanesco", pricePerKg: 9500, pricePerLb: Math.round(9500 / 2.20462), image: "imagenes/romanesco.jpg"},
    { id: "28", name: "Colinabo", pricePerKg: 7000, pricePerLb: Math.round(7000 / 2.20462), image: "imagenes/colinabo.jpg"},
    { id: "29", name: "Acelga arcoíris", pricePerKg: 8000, pricePerLb: Math.round(8000 / 2.20462), image: "imagenes/acelga-arcoiris.jpg"},
    { id: "30", name: "Hinojo", pricePerKg: 7500, pricePerLb: Math.round(7500 / 2.20462), image: "imagenes/hinojo.jpg"},
    { id: "31", name: "Pak choi (Bok choy)", pricePerKg: 8800, pricePerLb: Math.round(8800 / 2.20462), image: "imagenes/pakchoi.jpg"},
    { id: "32", name: "Amaranto (hojas)", pricePerKg: 6500, pricePerLb: Math.round(6500 / 2.20462), image: "imagenes/amaranto.jpg"},
    { id: "33", name: "Tupinambo", pricePerKg: 7800, pricePerLb: Math.round(7800 / 2.20462), image: "imagenes/tupinambo.jpg"},
    { id: "34", name: "Rábano daikon", pricePerKg: 7200, pricePerLb: Math.round(7200 / 2.20462), image: "imagenes/daikon.jpg"},
    { id: "35", name: "Hojas de mostaza", pricePerKg: 6800, pricePerLb: Math.round(6800 / 2.20462), image: "imagenes/hojas-mostaza.jpg"}
];

// Mostrar los productos en el carrito
function mostrarCarrito() {
    let cart = getCart();
    let unit = getUnit();
    let useLb = unit === "lb";

    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    let totalWeight = 0;
    let receiptText = `Detalles del total (${unit}):\n---------------------------\n`;

    Object.keys(cart).forEach(id => {
        let product = allProducts.find(p => p.id === id);
        if (!product) return;

        let quantity = parseFloat(cart[id]); // Cantidad en kg o lb
        totalWeight += quantity;
        let pricePerUnit = useLb ? Math.round(product.pricePerKg / 2.20462) : product.pricePerKg;
        let subtotal = pricePerUnit * quantity;
        total += subtotal;

        let itemHTML = `
            <div class="flex justify-between p-2 border-b">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16">
                <p>${product.name}</p>
                <div class="flex items-center">
                    <button class="bg-orange-300 p-2 rounded" onclick="decreaseCart('${id}')">-</button>
                    <span class="mx-2">${quantity.toFixed(1)}</span>
                    <button class="bg-orange-300 p-2 rounded" onclick="increaseCart('${id}')">+</button>
                </div>                
            </div>
        `;

        cartItemsContainer.innerHTML += itemHTML;
        receiptText += `${quantity.toFixed(1)} ${unit} x ${product.name} - $${subtotal}\n`;
    });

    // Agregar total de peso al recibo de compra
    receiptText += `---------------------------\nTotal: ${totalWeight.toFixed(1)} ${unit}\n`;

    document.getElementById("total-to-pay").innerText = `$${total}`;

    let totalDetails = document.getElementById("total-details");
    if (totalDetails) {
        totalDetails.value = receiptText;
    }
    
    updateCartCounter();
}


// Función para actualizar el contador del carrito en la barra superior
function updateCartCounter() {
    let cart = getCart();
    let totalWeight = Object.values(cart).reduce((sum, count) => sum + parseFloat(count), 0);
    let unit = getUnit();
    
    let cartCounter = document.getElementById("cart-counter");
    if (cartCounter) {
        cartCounter.innerText = `${totalWeight.toFixed(1)} ${unit}`;
    }
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseCart(id) {
    let cart = getCart();
    cart[id] = (parseFloat(cart[id]) || 0) + 0.5;
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

// Función para disminuir la cantidad de un producto en el carrito
function decreaseCart(id) {
    let cart = getCart();
    if (cart[id] > 0.5) {
        cart[id] = parseFloat(cart[id]) - 0.5;
    } else {
        delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    mostrarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    if (confirm("¿Estás seguro de finalizar la compra?")) {
        localStorage.removeItem("cart");
        alert("¡Compra finalizada con éxito!");
        location.reload();
    }
}
