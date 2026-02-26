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

// Welcome message
document.getElementById('welcomeMsg').textContent = `Welcome back, ${currentUser.fullName}!`;

// Load dashboard based on role
if (currentUser.role === 'donor') {
    loadDonorDashboard();
} else {
    loadNGODashboard();
}

function loadDonorDashboard() {
    document.getElementById('donorDashboard').style.display = 'block';
    
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const myDonations = donations.filter(d => d.donorEmail === currentUser.email);
    
    const total = myDonations.length;
    const active = myDonations.filter(d => d.status === 'available').length;
    const completed = myDonations.filter(d => d.status === 'requested').length;
    
    // Update stats
    document.getElementById('totalDonations').textContent = total;
    document.getElementById('activeDonations').textContent = active;
    document.getElementById('completedDonations').textContent = completed;
    
    // Update progress bars
    const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;
    const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('activePercent').textContent = `${activePercent}%`;
    document.getElementById('activeProgress').style.width = `${activePercent}%`;
    
    document.getElementById('completedPercent').textContent = `${completedPercent}%`;
    document.getElementById('completedProgress').style.width = `${completedPercent}%`;
    
    // Display recent donations
    const donationsList = document.getElementById('donorDonationsList');
    if (myDonations.length === 0) {
        donationsList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No donations yet. <a href="donate.html">Donate now</a></p>';
    } else {
        donationsList.innerHTML = myDonations.slice(-5).reverse().map(d => `
            <div class="donation-item">
                <div>
                    <strong>${d.foodName}</strong>
                    <p style="color: #7f8c8d; font-size: 0.9rem;">${d.quantity} servings</p>
                </div>
                <span class="status-badge ${d.status}">${d.status.toUpperCase()}</span>
            </div>
        `).join('');
    }
}

function loadNGODashboard() {
    document.getElementById('ngoDashboard').style.display = 'block';
    
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const myRequests = donations.filter(d => d.requestedBy === currentUser.email);
    
    const requested = myRequests.length;
    const accepted = myRequests.filter(d => d.status === 'requested').length;
    const totalServings = myRequests.reduce((sum, d) => sum + parseInt(d.quantity), 0);
    
    // Update stats
    document.getElementById('requestedFood').textContent = requested;
    document.getElementById('acceptedFood').textContent = accepted;
    document.getElementById('totalServings').textContent = totalServings;
    
    // Update progress bars
    const pending = requested - accepted;
    const pendingPercent = requested > 0 ? Math.round((pending / requested) * 100) : 0;
    const acceptedPercent = requested > 0 ? Math.round((accepted / requested) * 100) : 0;
    
    document.getElementById('pendingPercent').textContent = `${pendingPercent}%`;
    document.getElementById('pendingProgress').style.width = `${pendingPercent}%`;
    
    document.getElementById('acceptedPercent').textContent = `${acceptedPercent}%`;
    document.getElementById('acceptedProgress').style.width = `${acceptedPercent}%`;
    
    // Display requests
    const requestsList = document.getElementById('ngoRequestsList');
    if (myRequests.length === 0) {
        requestsList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No requests yet. <a href="browse.html">Browse donations</a></p>';
    } else {
        requestsList.innerHTML = myRequests.slice(-5).reverse().map(d => `
            <div class="donation-item">
                <div>
                    <strong>${d.foodName}</strong>
                    <p style="color: #7f8c8d; font-size: 0.9rem;">${d.quantity} servings - ${d.pickupAddress}</p>
                </div>
                <span class="status-badge ${d.status}">${d.status.toUpperCase()}</span>
            </div>
        `).join('');
    }
}
