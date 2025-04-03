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
    { id: "0", name: "Manzana", pricePerKg: 5000, pricePerLb: Math.round(5000 / 2.20462), image: "imagenes/manzana.jpg", description: "La manzana es una fruta jugosa, crujiente y refrescante." },
    { id: "1", name: "Plátano", pricePerKg: 4000, pricePerLb: Math.round(4000 / 2.20462), image: "imagenes/platano.jpg", description: "El plátano es una fruta dulce y cremosa, con alto contenido de potasio." },
    { id: "2", name: "Pera", pricePerKg: 4500, pricePerLb: Math.round(4500 / 2.20462), image: "imagenes/pera.jpg", description: "Las peras son frutas de pulpa jugosa y sabor dulce." },
    { id: "3", name: "Naranja", pricePerKg: 3500, pricePerLb: Math.round(3500 / 2.20462), image: "imagenes/naranja.jpg", description: "La naranja es un cítrico rico en vitamina C." },
    { id: "4", name: "Uva", pricePerKg: 9000, pricePerLb: Math.round(9000 / 2.20462), image: "imagenes/uva.jpg", description: "Las uvas son frutas pequeñas y dulces que contienen antioxidantes." },
    { id: "5", name: "Fresa", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/fresa.jpg", description: "Las fresas son frutas de color rojo vibrante con un sabor dulce y ligeramente ácido." },
    { id: "6", name: "Acelga", pricePerKg: 3000, pricePerLb: Math.round(3000 / 2.20462), image: "imagenes/acelga.jpg", description: "La acelga es una hortaliza de hojas verdes rica en hierro, calcio y vitaminas." },
    { id: "7", name: "Ajo", pricePerKg: 8000, pricePerLb: Math.round(8000 / 2.20462), image: "imagenes/ajo.jpg", description: "El ajo es un ingrediente aromático con propiedades antibacterianas y antioxidantes." },
    { id: "8", name: "Alcachofa", pricePerKg: 7500, pricePerLb: Math.round(7500 / 2.20462), image: "imagenes/alcachofa.jpg", description: "La alcachofa es una hortaliza rica en fibra y antioxidantes, ideal para mejorar la digestión." },
    { id: "9", name: "Alcaparra", pricePerKg: 10000, pricePerLb: Math.round(10000 / 2.20462), image: "imagenes/alcaparra.jpg", description: "Las alcaparras son pequeños brotes encurtidos con un sabor intenso y ligeramente ácido." },
    { id: "10", name: "Apio", pricePerKg: 3500, pricePerLb: Math.round(3500 / 2.20462), image: "imagenes/apio.jpg", description: "El apio es una verdura crujiente y refrescante con propiedades diuréticas." },
    { id: "11", name: "Batata", pricePerKg: 4500, pricePerLb: Math.round(4500 / 2.20462), image: "imagenes/batata.jpg", description: "La batata, también llamada camote, es un tubérculo de sabor dulce y alto contenido de fibra." },
    { id: "12", name: "Berenjena", pricePerKg: 5000, pricePerLb: Math.round(5000 / 2.20462), image: "imagenes/berenjena.jpg", description: "La berenjena es una hortaliza versátil de textura carnosa." },
    { id: "13", name: "Berros", pricePerKg: 3200, pricePerLb: Math.round(3200 / 2.20462), image: "imagenes/berros.jpg", description: "Los berros son una hoja verde con un sabor ligeramente picante y alto contenido de hierro." },
    { id: "14", name: "Pitahaya", pricePerKg: 15000, pricePerLb: Math.round(15000 / 2.20462), image: "imagenes/pitahaya.jpg", description: "Fruta tropical dulce y jugosa." },
    { id: "15", name: "Mangostino", pricePerKg: 18000, pricePerLb: Math.round(18000 / 2.20462), image: "imagenes/mangostino.jpg", description: "Conocida como la reina de las frutas." },
    { id: "16", name: "Rambután", pricePerKg: 16000, pricePerLb: Math.round(16000 / 2.20462), image: "imagenes/rambutan.jpg", description: "Similar al lichi, con un sabor dulce." },
    { id: "17", name: "Maracuyá", pricePerKg: 10000, pricePerLb: Math.round(10000 / 2.20462), image: "imagenes/maracuya.jpg", description: "Fruta con un sabor ácido y refrescante." },
    { id: "18", name: "Noni", pricePerKg: 20000, pricePerLb: Math.round(20000 / 2.20462), image: "imagenes/noni.jpg", description: "Fruta con propiedades medicinales y alto contenido antioxidante." },
    { id: "19", name: "Guayusa", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/guayusa.jpg", description: "Hoja amazónica con efectos energizantes, ideal para infusiones." },
    { id: "20", name: "Açai", pricePerKg: 22000, pricePerLb: Math.round(22000 / 2.20462), image: "imagenes/acai.jpg", description: "Superfruta rica en antioxidantes, popular en batidos y bowls saludables." },
    { id: "21", name: "Lulo", pricePerKg: 9000, pricePerLb: Math.round(9000 / 2.20462), image: "imagenes/lulo.jpg", description: "Fruta cítrica y refrescante, perfecta para jugos naturales." },
    { id: "22", name: "Aguacate", pricePerKg: 12000, pricePerLb: Math.round(12000 / 2.20462), image: "imagenes/aguacate.jpg", discount: "10%", description: "Rico en grasas saludables." },
    { id: "23", name: "Papaya", pricePerKg: 8000, pricePerLb: Math.round(8000 / 2.20462), image: "imagenes/papaya.jpg", discount: "15%", description: "Dulce y excelente para la digestión." },
    { id: "24", name: "Sandía", pricePerKg: 7000, pricePerLb: Math.round(7000 / 2.20462), image: "imagenes/sandia.jpg", discount: "20%", description: "Refrescante y jugosa en días calurosos." },
    { id: "25", name: "Mora", pricePerKg: 6000, pricePerLb: Math.round(6000 / 2.20462), image: "imagenes/mora.jpg", discount: "12%", description: "Fruta rica en antioxidantes y fibra." },
    { id: "26", name: "Tomate de árbol", pricePerKg: 5000, pricePerLb: Math.round(5000 / 2.20462), image: "imagenes/tomate_arbol.jpg", discount: "18%", description: "Ideal para jugos y postres, con alto contenido en vitamina A." },
    { id: "27", name: "Melón", pricePerKg: 6500, pricePerLb: Math.round(6500 / 2.20462), image: "imagenes/melon.jpg", discount: "10%", description: "Dulce y refrescante, perfecto para ensaladas de frutas." },
    { id: "28", name: "Durazno", pricePerKg: 7500, pricePerLb: Math.round(7500 / 2.20462), image: "imagenes/durazno.jpg", discount: "15%", description: "Fruta jugosa y aromática, con alto contenido de fibra." }
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
