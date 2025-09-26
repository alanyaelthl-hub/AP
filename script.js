// Agrega esto al inicio del archivo, después de la declaración de 'dataH'
let carrito = [];

// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const switchGenero = document.getElementById("switchGenero");
    const labelGenero = document.getElementById("labelGenero");

    // Función para renderizar productos según el array recibido
    function renderizarProductos(productos) {
        productGrid.innerHTML = ""; // Limpia el grid
        productos.forEach((perfume, perfumeIndex) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col");
        const statusClass =
            perfume.status === "Disponible" ? "bg-success" : "bg-danger";
        productCard.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="card-header border-0 bg-white">
                            <span class="badge ${statusClass}">${
            perfume.status
        }</span>
                        </div>
                        <img src="${
                        perfume.image
                        }" class="card-img-top p-3" alt="Imagen de ${perfume.name}">
                        <div class="card-body text-center">
                            <small class="text-muted">${perfume.brand}</small>
                            <h5 class="card-title mt-2">${perfume.name}</h5>
                            <div class="my-3 d-flex justify-content-center align-items-center gap-2">
                                <span class="badge bg-primary fs-6">3ml</span>
                                <span class="fw-bold text-primary fs-5">$${
                                perfume.prices["3ml"]
                                } MXN</span>
                                <button class="btn btn-outline-primary btn-sm ms-2 add-to-cart" dataH-index="${perfumeIndex}" dataH-size="3ml" dataH-genero="${
            switchGenero.checked ? "M" : "H"
        }" title="Agregar 3ml al carrito">
                                    <i class="bi bi-cart-plus"></i>
                                </button>
                            </div>
                            <div class="mb-2 d-flex justify-content-center align-items-center gap-2">
                                <span class="badge bg-success fs-6">5ml</span>
                                <span class="fw-bold text-success fs-5">$${
                                perfume.prices["5ml"]
                                } MXN</span>
                                <button class="btn btn-outline-success btn-sm ms-2 add-to-cart" dataH-index="${perfumeIndex}" dataH-size="5ml" dataH-genero="${
            switchGenero.checked ? "M" : "H"
        }" title="Agregar 5ml al carrito">
                                    <i class="bi bi-cart-plus"></i>
                                </button>
                            </div>
                            <hr>
                        </div>
                    </div>
                `;

        // Append the card to the product grid
        productGrid.appendChild(productCard);
        });

        // Delegación de eventos para los botones de agregar al carrito
        document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", function () {
            const perfumeIndex = this.getAttribute("dataH-index");
            const size = this.getAttribute("dataH-size");
            const genero = this.getAttribute("dataH-genero");
            const perfume =
            genero === "M" ? dataM[perfumeIndex] : dataH[perfumeIndex];

            carrito.push({
            name: perfume.name,
            brand: perfume.brand,
            size: size,
            price: perfume.prices[size],
            });
            console.log(carrito);
            Swal.fire(`${perfume.name} (${size}) fue agregado a su carrito`);
        });
        });
    }

    // Inicialmente muestra perfumes de hombre
    renderizarProductos(dataH);

    // Evento para el switch
    switchGenero.addEventListener('change', function() {
        if (switchGenero.checked) {
            labelGenero.textContent = "Mujer";
            renderizarProductos(dataM);
        } else {
            labelGenero.textContent = "Hombre";
            renderizarProductos(dataH);
        }
    });

    // Mostrar modal al hacer click en el botón de carrito
    document.getElementById("btn-ver-carrito").addEventListener("click", () => {
        actualizarModalCarrito();
        const modal = new bootstrap.Modal(document.getElementById("modalCarrito"));
        modal.show();
    });

    // Copiar pedido al portapapeles
    document.getElementById("btn-copiar-pedido").addEventListener("click", () => {
        const resumen = generarResumenPedido();
        navigator.clipboard.writeText(resumen).then(() => {
        Swal.fire("¡Pedido copiado!", "", "success");
        });
    });

    // Habilita el botón solo si el check está marcado
    const checkConfirmar = document.getElementById("confirmarPedido");
    const btnCopiar = document.getElementById("btn-copiar-pedido");
    if (checkConfirmar && btnCopiar) {
        btnCopiar.disabled = true; // Deshabilitado por defecto
        checkConfirmar.addEventListener("change", function () {
        btnCopiar.disabled = !this.checked;
        });
    }
    });

    function actualizarModalCarrito() {
    const contenedor = document.getElementById("carrito-contenido");
    const btnCopiar = document.getElementById("btn-copiar-pedido");
    const checkConfirmar = document.getElementById("confirmarPedido");
    const inputNombre = document.getElementById("nombreUsuario");

    // Siempre deshabilita el botón y desmarca el check al abrir el modal
    if (btnCopiar) btnCopiar.disabled = true;
    if (checkConfirmar) checkConfirmar.checked = false;
    if (inputNombre) inputNombre.value = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `<div class="vacio">Aun no has agregado ningun perfume</div>`;
        if (btnCopiar) btnCopiar.disabled = true;
        if (checkConfirmar) checkConfirmar.disabled = true;
        if (inputNombre) inputNombre.disabled = true;
        return;
    }
    if (btnCopiar) btnCopiar.disabled = true;
    if (checkConfirmar) checkConfirmar.disabled = false;
    if (inputNombre) inputNombre.disabled = false;

    // Agrupar por nombre, tamaño y precio
    const agrupados = {};
    carrito.forEach((item) => {
        const key = `${item.name}|${item.size}|${item.price}`;
        if (!agrupados[key]) {
        agrupados[key] = { ...item, cantidad: 1 };
        } else {
        agrupados[key].cantidad += 1;
        }
    });

    let total = 0;
    let html = `<ul class="list-group mb-3">`;
    Object.values(agrupados).forEach((prod) => {
        const subtotal = prod.price * prod.cantidad;
        total += subtotal;
        html += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fw-bold">${prod.name}</span>
                        <span class="badge bg-secondary ms-2">${prod.size}</span>
                        <span class="text-muted ms-2">${prod.brand}</span>
                    </div>
                    <div>
                        <span class="producto-cantidad">${prod.cantidad} x </span>
                        <span class="producto-precio">$${prod.price} MXN</span>
                        <span class="fw-bold ms-2">= $${subtotal} MXN</span>
                    </div>
                </li>
            `;
    });
    html += `</ul>
            <div class="total text-end">Total: $${total} MXN</div>
        `;
    contenedor.innerHTML = html;

    // Habilitar el botón solo si el check está marcado y el nombre no está vacío
    function actualizarEstadoBoton() {
        btnCopiar.disabled = !(
        checkConfirmar.checked && inputNombre.value.trim() !== ""
        );
    }

    // Asigna el evento cada vez que se actualiza el modal
    if (checkConfirmar && btnCopiar && inputNombre) {
        checkConfirmar.onchange = actualizarEstadoBoton;
        inputNombre.oninput = actualizarEstadoBoton;
        actualizarEstadoBoton();
    }
    }

    // Genera el resumen de pedido para copiar
    function generarResumenPedido() {
    if (carrito.length === 0) return "Aun no has agregado nungun perfume";
    const agrupados = {};
    carrito.forEach((item) => {
        const key = `${item.name}|${item.size}|${item.price}`;
        if (!agrupados[key]) {
        agrupados[key] = { ...item, cantidad: 1 };
        } else {
        agrupados[key].cantidad += 1;
        }
    });
    let total = 0;
    let resumen = `Pedido de ${nombreUsuario.value}:\n`;
    Object.values(agrupados).forEach((prod) => {
        const subtotal = prod.price * prod.cantidad;
        total += subtotal;
        resumen +=
        "▶ " +
        `${prod.name} (${prod.size}, ${prod.brand}) x${prod.cantidad}: $${subtotal} MXN\n`;
    });
    resumen += `Total: $${total} MXN\n`;
    resumen += "¡Listo!, confirmo mi pedido";
    return resumen;
    }

    var dataH = [
    {
        name: "ACQUA DI GIO POUR HOME",
        brand: "Armani",
        image: "images/arma-acqua.png",
        prices: {
        "3ml": 32,
        "5ml": 56,
        },
        status: "Disponible",
    },
    {
        name: "YveasSaintLaurent",
        brand: "YveasSaintLaurent",
        image: "images/yveas-ysl.png",
        prices: {
        "3ml": 63,
        "5ml": 107,
        },
        status: "Disponible",
    },
    {
        name: "Eros",
        brand: "Versace",
        image: "images/versace-eros.png",
        prices: {
        "3ml": 52,
        "5ml": 90,
        },
        status: "Disponible",
    },
    {
        name: "Le beau le parfum",
        brand: "Jean paul",
        image: "images/jean-le-beau.png",
        prices: {
        "3ml": 65,
        "5ml": 110,
        },
        status: "Disponible",
    },
    {
        name: "Hawas",
        brand: "Rasasi",
        image: "images/rasasi-hawas.png",
        prices: {
        "3ml": 26,
        "5ml": 45,
        },
        status: "Disponible",
    },
    {
        name: "Homme",
        brand: "Dior",
        image: "images/dior-homme.png",
        prices: {
        "3ml": 75,
        "5ml": 125,
        },
        status: "Disponible",
    },
    {
        name: "Sauvage",
        brand: "Dior",
        image: "images/dior-sauvage.png",
        prices: {
        "3ml": 115,
        "5ml": 195,
        },
        status: "Disponible",
    },
    {
        name: "Scandal",
        brand: "Jean paul",
        image: "images/jean-scandal.png",
        prices: {
        "3ml": 68,
        "5ml": 115,
        },
        status: "Disponible",
    },
    {
        name: "Vip Black Men 212",
        brand: "Carolina Herrera",
        image: "images/ch-vip-black.png",
        prices: {
        "3ml": 58,
        "5ml": 98,
        },
        status: "Disponible",
    },
    {
        name: "Most wanted intense",
        brand: "Azzaro",
        image: "images/azzaro-most-wanted.png",
        prices: {
        "3ml": 60,
        "5ml": 103,
        },
        status: "Disponible",
    },
    {
        name: "Le male le parfum",
        brand: "Jean paul",
        image: "images/jean-le-male.png",
        prices: {
        "3ml": 66,
        "5ml": 112,
        },
        status: "Disponible",
    },
    {
        name: "Born In Romanse intense",
        brand: "Valentino",
        image: "images/valentino-born.png",
        prices: {
        "3ml": 120,
        "5ml": 203,
        },
        status: "Disponible",
    },
    {
        name: "YveasSaintLaurent EDP",
        brand: "YveasSaintLaurent",
        image: "images/yveas-ysl-edp.png",
        prices: {
        "3ml": 93,
        "5ml": 158,
        },
        status: "Disponible",
    },
    ];

    var dataM = [
    {
        name: "Cloud",
        brand: "Ariana Grande",
        image: "images/Dama/Cloud_EDP.png",
        prices: {
        "3ml": 47,
        "5ml": 80,
        },
        status: "Disponible",
    },
    {
        name: "Good Girl",
        brand: "Carolina Herrera",
        image: "images/Dama/Good-Girl.png",
        prices: {
        "3ml": 87,
        "5ml": 147,
        },
        status: "Disponible",
    },
    {
        name: "Billie Eilish",
        brand: "Billie Eilish",
        image: "images/Dama/Billie-Eilish.png",
        prices: {
        "3ml": 37,
        "5ml": 64,
        },
        status: "Disponible",
    },
    {
        name: "Burberry Her London Dream",
        brand: "Burberry",
        image: "images/Dama/Burberry-Her-London-Dream.png",
        prices: {
        "3ml": 66,
        "5ml": 113,
        },
        status: "Disponible",
    },
];
