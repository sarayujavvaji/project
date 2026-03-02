// Sample active distributions
const activeDistributions = [
    {
        id: 1,
        foodName: "Vegetable Biryani",
        quantity: 50,
        donor: "Green Restaurant",
        pickupAddress: "123 Main St, New York, NY",
        pickupTime: "Today, 2:00 PM",
        status: "Ready for Pickup",
        beneficiaries: "Community Shelter A"
    },
    {
        id: 2,
        foodName: "Fresh Vegetables",
        quantity: 30,
        donor: "Farm Fresh Market",
        pickupAddress: "456 Oak Ave, Brooklyn, NY",
        pickupTime: "Today, 4:00 PM",
        status: "Confirmed",
        beneficiaries: "Food Bank Center"
    },
    {
        id: 3,
        foodName: "Rice & Dal",
        quantity: 60,
        donor: "Community Kitchen",
        pickupAddress: "321 Elm St, Queens, NY",
        pickupTime: "Tomorrow, 10:00 AM",
        status: "Scheduled",
        beneficiaries: "Homeless Shelter B"
    },
    {
        id: 4,
        foodName: "Pasta Primavera",
        quantity: 35,
        donor: "Italian Bistro",
        pickupAddress: "222 West St, Brooklyn, NY",
        pickupTime: "Tomorrow, 1:00 PM",
        status: "Scheduled",
        beneficiaries: "Senior Center"
    }
];

// Sample completed distributions
const completedDistributions = [
    {
        foodName: "Chicken Curry",
        quantity: 40,
        donor: "Spice Kitchen",
        completedDate: "Yesterday",
        beneficiaries: "Community Center A",
        peopleServed: 40
    },
    {
        foodName: "Fruit Salad",
        quantity: 20,
        donor: "Healthy Cafe",
        completedDate: "2 days ago",
        beneficiaries: "Children's Home",
        peopleServed: 20
    },
    {
        foodName: "Grilled Chicken",
        quantity: 25,
        donor: "BBQ House",
        completedDate: "3 days ago",
        beneficiaries: "Food Bank Center",
        peopleServed: 25
    },
    {
        foodName: "Fish Fry",
        quantity: 30,
        donor: "Seafood Grill",
        completedDate: "4 days ago",
        beneficiaries: "Homeless Shelter A",
        peopleServed: 30
    },
    {
        foodName: "Vegetable Soup",
        quantity: 45,
        donor: "Soup Kitchen",
        completedDate: "5 days ago",
        beneficiaries: "Community Shelter B",
        peopleServed: 45
    }
];

// Display active distributions
function displayActiveDistributions() {
    const container = document.getElementById('activeDistributions');
    
    if (activeDistributions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">No active distributions</p>';
        return;
    }
    
    container.innerHTML = activeDistributions.map(dist => `
        <div class="donation-item" style="flex-direction: column; align-items: flex-start; padding: 1.5rem; border: 2px solid #ecf0f1; border-radius: 10px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 1rem;">
                <div>
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">${dist.foodName}</h4>
                    <p style="color: #7f8c8d; font-size: 0.9rem;">📦 ${dist.quantity} servings</p>
                </div>
                <span class="status-badge available" style="height: fit-content;">${dist.status}</span>
            </div>
            <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <p style="font-size: 0.9rem; color: #555;"><strong>Donor:</strong> ${dist.donor}</p>
                    <p style="font-size: 0.9rem; color: #555;"><strong>Pickup:</strong> ${dist.pickupTime}</p>
                </div>
                <div>
                    <p style="font-size: 0.9rem; color: #555;"><strong>Location:</strong> ${dist.pickupAddress}</p>
                    <p style="font-size: 0.9rem; color: #555;"><strong>For:</strong> ${dist.beneficiaries}</p>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; width: 100%;">
                <button class="btn btn-primary" style="flex: 1; padding: 0.6rem;" onclick="markPickedUp(${dist.id})">Mark as Picked Up</button>
                <button class="btn btn-secondary" style="flex: 1; padding: 0.6rem;" onclick="viewDetails(${dist.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// Display completed distributions
function displayCompletedDistributions() {
    const container = document.getElementById('completedDistributions');
    
    if (completedDistributions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">No completed distributions</p>';
        return;
    }
    
    container.innerHTML = completedDistributions.map(dist => `
        <div class="analyst-item" style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">
            <div style="flex: 1;">
                <strong style="color: #2c3e50;">${dist.foodName}</strong>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 0.3rem;">
                    ${dist.quantity} servings • ${dist.donor} → ${dist.beneficiaries}
                </p>
                <p style="color: #27ae60; font-size: 0.85rem; margin-top: 0.3rem;">
                    ✅ ${dist.completedDate} • ${dist.peopleServed} people served
                </p>
            </div>
        </div>
    `).join('');
}

// Mark as picked up
function markPickedUp(id) {
    alert(`Distribution #${id} marked as picked up!\n\nPlease proceed with distribution to beneficiaries.`);
    // In real app, update status in database
}

// View details
function viewDetails(id) {
    const dist = activeDistributions.find(d => d.id === id);
    if (dist) {
        alert(`Distribution Details:\n\nFood: ${dist.foodName}\nQuantity: ${dist.quantity} servings\nDonor: ${dist.donor}\nPickup: ${dist.pickupTime}\nLocation: ${dist.pickupAddress}\nBeneficiaries: ${dist.beneficiaries}\nStatus: ${dist.status}`);
    }
}

// Update stats
function updateStats() {
    const storedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && storedDonations.length > 0) {
        const myRequests = storedDonations.filter(d => d.requestedBy === currentUser.email);
        const pending = myRequests.filter(d => d.status === 'requested').length;
        
        if (pending > 0) {
            document.getElementById('pendingPickups').textContent = pending + activeDistributions.length;
        }
    }
}

// Initialize
displayActiveDistributions();
displayCompletedDistributions();
updateStats();
