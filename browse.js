// Check authentication
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Please login to access this page');
    window.location.href = 'login.html';
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

let allDonations = [];
let currentFilter = 'all';

// Load donations
function loadDonations() {
    allDonations = JSON.parse(localStorage.getItem('donations') || '[]');
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
        const canRequest = currentUser.role === 'ngo' && donation.status === 'available' && !isExpired;
        
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
                    ${canRequest ? `<button class="request-btn" onclick="requestFood(${donation.id})">Request Food</button>` : ''}
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
                            donation.pickupAddress.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });
    
    displayDonations(filtered);
}

// Request food
function requestFood(donationId) {
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const donation = donations.find(d => d.id === donationId);
    
    if (donation && donation.status === 'available') {
        donation.status = 'requested';
        donation.requestedBy = currentUser.email;
        donation.requestedAt = new Date().toISOString();
        
        localStorage.setItem('donations', JSON.stringify(donations));
        
        alert('Food requested successfully! The donor will be notified.');
        loadDonations();
    }
}

// Initialize
loadDonations();
