// Sample food donations data
const sampleDonations = [
    {
        id: 1,
        foodName: "Vegetable Biryani",
        foodType: "veg",
        quantity: 50,
        expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        pickupAddress: "123 Main St, New York, NY",
        donorName: "Green Restaurant",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
        status: "available"
    },
    {
        id: 2,
        foodName: "Fresh Vegetables",
        foodType: "veg",
        quantity: 30,
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        pickupAddress: "456 Oak Ave, Brooklyn, NY",
        donorName: "Farm Fresh Market",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
        status: "available"
    },
    {
        id: 3,
        foodName: "Chicken Curry",
        foodType: "non-veg",
        quantity: 40,
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        pickupAddress: "789 Park Rd, Manhattan, NY",
        donorName: "Spice Kitchen",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
        status: "available"
    },
    {
        id: 4,
        foodName: "Rice & Dal",
        foodType: "veg",
        quantity: 60,
        expiryDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        pickupAddress: "321 Elm St, Queens, NY",
        donorName: "Community Kitchen",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80",
        status: "available"
    },
    {
        id: 5,
        foodName: "Grilled Chicken",
        foodType: "non-veg",
        quantity: 25,
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        pickupAddress: "555 Broadway, Manhattan, NY",
        donorName: "BBQ House",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80",
        status: "available"
    },
    {
        id: 6,
        foodName: "Fruit Salad",
        foodType: "veg",
        quantity: 20,
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        pickupAddress: "888 5th Ave, New York, NY",
        donorName: "Healthy Cafe",
        image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400&q=80",
        status: "available"
    },
    {
        id: 7,
        foodName: "Pasta Primavera",
        foodType: "veg",
        quantity: 35,
        expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        pickupAddress: "222 West St, Brooklyn, NY",
        donorName: "Italian Bistro",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
        status: "available"
    },
    {
        id: 8,
        foodName: "Fish Fry",
        foodType: "non-veg",
        quantity: 30,
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        pickupAddress: "999 Harbor Rd, Queens, NY",
        donorName: "Seafood Grill",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
        status: "available"
    }
];

let allDonations = [];
let currentFilter = 'all';

// Load donations
function loadDonations() {
    // Merge sample data with localStorage data
    const storedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    allDonations = [...sampleDonations, ...storedDonations];
    displayDonations(allDonations);
}

// Display donations
function displayDonations(donations) {
    const grid = document.getElementById('donationsGrid');
    const noResults = document.getElementById('noResults');
    
    if (donations.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    grid.innerHTML = donations.map(donation => {
        const isExpired = new Date(donation.expiryDate) < new Date();
        
        return `
            <div class="food-card">
                <img src="${donation.image}" alt="${donation.foodName}">
                <div class="food-card-content">
                    <h3>${donation.foodName}</h3>
                    <span class="food-type ${donation.foodType}">${donation.foodType === 'veg' ? '🥗 Vegetarian' : '🍗 Non-Veg'}</span>
                    <div class="food-info">
                        <p><strong>Quantity:</strong> ${donation.quantity} servings</p>
                        <p><strong>Expires:</strong> ${new Date(donation.expiryDate).toLocaleString()}</p>
                        <p><strong>Location:</strong> ${donation.pickupAddress}</p>
                        <p><strong>Donor:</strong> ${donation.donorName}</p>
                    </div>
                    <span class="status-badge ${donation.status}">${donation.status.toUpperCase()}</span>
                    ${!isExpired ? `<button class="request-btn" onclick="requestFood(${donation.id})">Request Food</button>` : ''}
                    ${isExpired ? '<p style="color: red; margin-top: 10px;">Expired</p>' : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        applyFilters();
    });
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    applyFilters();
});

// Apply filters and search
function applyFilters() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    
    let filtered = allDonations.filter(donation => {
        const matchesFilter = currentFilter === 'all' || donation.foodType === currentFilter;
        const matchesSearch = donation.foodName.toLowerCase().includes(searchTerm) ||
                            donation.pickupAddress.toLowerCase().includes(searchTerm) ||
                            donation.donorName.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });
    
    displayDonations(filtered);
}

// Request food
function requestFood(donationId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please login to request food');
        window.location.href = 'login.html';
        return;
    }
    
    if (currentUser.role !== 'recipient') {
        alert('Only recipient organizations can request food');
        return;
    }
    
    alert(`Food request submitted successfully!\n\nDonation ID: ${donationId}\nThe donor will be notified.`);
}

// Initialize
loadDonations();
