

// Pagination functionality
let currentPage = 1;
const totalPages = 3;

function showPage(page) {
    // Handle prev/next navigation
    if (page === 'prev') {
        if (currentPage > 1) currentPage--;
        else return;
    } else if (page === 'next') {
        if (currentPage < totalPages) currentPage++;
        else return;
    } else {
        currentPage = page;
    }

    // Hide all pages
    for (let i = 1; i <= totalPages; i++) {
        const pageElement = document.getElementById(`p${i}`);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    }

    // Show current page
    const currentPageElement = document.getElementById(`p${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('hidden');
    }

    // Update pagination buttons
    const paginationButtons = document.querySelectorAll('nav button');
    paginationButtons.forEach((button, index) => {
        // Skip prev/next buttons (index 0 and 4)
        if (index !== 0 && index !== 4) {
            if (index === currentPage) {
                button.classList.add('bg-blue-700', 'text-white');
                button.classList.remove('hover:bg-blue-700', 'hover:text-white');
            } else {
                button.classList.remove('bg-blue-700', 'text-white');
                button.classList.add('hover:bg-blue-700', 'hover:text-white');
            }
        }
    });
}

// Search functionality
function searchProperties() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const propertyType = document.getElementById('propertyType').value;
    const priceRange = document.getElementById('priceRange').value;

    //     The value is expected to be a string like "50000-100000", so:
    // .split('-') converts it into an array ["50000", "100000"].
    // .map(Number) converts the strings into numbers [50000, 100000].
    // If priceRange is empty, it defaults to [0, Infinity], meaning no price filtering.
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];

const propertyCards = document.querySelectorAll('.property-card');
    // for ieach loop
    propertyCards.forEach(card => {
        // Retrieves the <h3> inside the property card, which represents the property title.
        // Converts the text to lowercase for case-insensitive search.
        const title = card.querySelector('h3').textContent.toLowerCase();
        // data-typr=house vill tc.
        const type = card.getAttribute('data-type');
        // get attribut method work about retrive var means house etc
        const price = parseInt(card.getAttribute('data-price'));
// p is location for protarti
        const location = card.querySelector('p').textContent.toLowerCase();
// jo hu tital nakhu location and name of villa etc to op lavava
        const matchesSearch = searchInput === '' || 
            title.includes(searchInput) || 
            location.includes(searchInput);
        const matchesType = propertyType === '' || type === propertyType;
        const matchesPrice = price >= minPrice && price <= maxPrice;

        if (matchesSearch && matchesType && matchesPrice) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners for real-time search its bar ni value add karava
document.getElementById('searchInput').addEventListener('input', searchProperties);
document.getElementById('propertyType').addEventListener('change', searchProperties);
document.getElementById('priceRange').addEventListener('change', searchProperties);
