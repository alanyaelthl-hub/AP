document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    data.forEach(perfume => {
        const productCard = document.createElement('div');
        productCard.classList.add('col'); // Bootstrap column class

        // Check the status to determine the badge class
        const statusClass = perfume.status === 'Disponible' ? 'bg-success' : 'bg-danger';

        // Create the HTML content for the card using Bootstrap components
        productCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-header border-0 bg-white">
                    <span class="badge ${statusClass}">${perfume.status}</span>
                </div>
                <img src="${perfume.image}" class="card-img-top p-3" alt="Imagen de ${perfume.name}">
                <div class="card-body text-center">
                    <small class="text-muted">${perfume.brand}</small>
                    <h5 class="card-title mt-2">${perfume.name}</h5>
                    <hr>
                    <div class="d-flex flex-column align-items-center gap-2">
                        <div>
                            <span class="badge bg-primary fs-6">3ml</span>
                            <span class="fw-bold text-dark fs-5 ms-2">$${perfume.prices['3ml']} MXN</span>
                        </div>
                        <div>
                            <span class="badge bg-success fs-6">5ml</span>
                            <span class="fw-bold text-dark fs-5 ms-2">$${perfume.prices['5ml']} MXN</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Append the card to the product grid
        productGrid.appendChild(productCard);
    });
});

var data = [
{
        "name": "ACQUA DI GIO POUR HOME",
        "brand": "Armani",
        "image": "images/arma-acqua.png",
        "prices": {
          "3ml": 28,
          "5ml": 47
        },
        "status": "Disponible"
    },
    {
        "name": "YveasSaintLaurent",
        "brand": "YveasSaintLaurent",
        "image": "images/yveas-ysl.png",
        "prices": {
          "3ml": 59,
          "5ml": 98
        },
        "status": "Disponible"
    },
    {
        "name": "Eros",
        "brand": "Versace",
        "image": "images/versace-eros.png",
        "prices": {
          "3ml": 48,
          "5ml": 80
        },
        "status": "Disponible"
    },
    {
        "name": "Le beau le parfum",
        "brand": "Jean paul",
        "image": "images/jean-le-beau.png",
        "prices": {
          "3ml": 61,
          "5ml": 101
        },
        "status": "Disponible"
    },
    {
        "name": "Hawas",
        "brand": "Rasasi",
        "image": "images/rasasi-hawas.png",
        "prices": {
          "3ml": 22,
          "5ml": 37
        },
        "status": "Disponible"
    },
    {
        "name": "Homme",
        "brand": "Dior",
        "image": "images/dior-homme.png",
        "prices": {
          "3ml": 70,
          "5ml": 117
        },
        "status": "Disponible"
    },
    {
        "name": "Sauvage",
        "brand": "Dior",
        "image": "images/dior-sauvage.png",
        "prices": {
          "3ml": 111,
          "5ml": 185
        },
        "status": "Disponible"
    },
    {
        "name": "Scandal",
        "brand": "Jean paul",
        "image": "images/jean-scandal.png",
        "prices": {
          "3ml": 64,
          "5ml": 107
        },
        "status": "Disponible"
    },
    {
        "name": "Vip Black Men 212",
        "brand": "Carolina Herrera",
        "image": "images/ch-vip-black.png",
        "prices": {
          "3ml": 54,
          "5ml": 89
        },
        "status": "Disponible"
    },
    {
        "name": "Most wanted intense",
        "brand": "Azzaro",
        "image": "images/azzaro-most-wanted.png",
        "prices": {
          "3ml": 57,
          "5ml": 94
        },
        "status": "Disponible"
    },
    {
        "name": "Le male le parfum",
        "brand": "Jean paul",
        "image": "images/jean-le-male.png",
        "prices": {
          "3ml": 62,
          "5ml": 103
        },
        "status": "Disponible"
    },
    {
        "name": "Born In Romanse intense",
        "brand": "Valentino",
        "image": "images/valentino-born.png",
        "prices": {
          "3ml": 117,
          "5ml": 194
        },
        "status": "Disponible"
    },
    {
        "name": "YveasSaintLaurent EDP",
        "brand": "YveasSaintLaurent",
        "image": "images/yveas-ysl-edp.png",
        "prices": {
          "3ml": 89,
          "5ml": 149
        },
        "status": "Disponible"
    }
];