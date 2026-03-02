// Sample analytics data
const monthlyData = [
    { month: 'Jan', donations: 18, servings: 540 },
    { month: 'Feb', donations: 22, servings: 660 },
    { month: 'Mar', donations: 25, servings: 750 },
    { month: 'Apr', donations: 28, servings: 840 },
    { month: 'May', donations: 31, servings: 930 },
    { month: 'Jun', donations: 32, servings: 1130 }
];

const topDonorsData = [
    { name: 'Green Restaurant', donations: 24, servings: 720 },
    { name: 'Community Kitchen', donations: 18, servings: 1080 },
    { name: 'Farm Fresh Market', donations: 16, servings: 480 },
    { name: 'Spice Kitchen', donations: 14, servings: 560 },
    { name: 'Italian Bistro', donations: 12, servings: 420 }
];

const locationData = [
    { location: 'Manhattan, NY', donations: 45, percentage: 29 },
    { location: 'Brooklyn, NY', donations: 38, percentage: 24 },
    { location: 'Queens, NY', donations: 32, percentage: 21 },
    { location: 'Bronx, NY', donations: 25, percentage: 16 },
    { location: 'Staten Island, NY', donations: 16, percentage: 10 }
];

// Display monthly trends
function displayMonthlyTrends() {
    const container = document.getElementById('monthlyTrends');
    
    const maxDonations = Math.max(...monthlyData.map(d => d.donations));
    
    container.innerHTML = monthlyData.map(data => {
        const barHeight = (data.donations / maxDonations) * 100;
        return `
            <div style="display: inline-block; width: 15%; margin: 0 1%; text-align: center;">
                <div style="background: #667eea; height: ${barHeight * 2}px; border-radius: 5px; margin-bottom: 0.5rem; position: relative;">
                    <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-weight: bold; color: #2c3e50;">${data.donations}</span>
                </div>
                <div style="font-weight: 600; color: #2c3e50;">${data.month}</div>
                <div style="font-size: 0.85rem; color: #7f8c8d;">${data.servings} servings</div>
            </div>
        `;
    }).join('');
}

// Display top donors
function displayTopDonors() {
    const container = document.getElementById('topDonors');
    
    container.innerHTML = topDonorsData.map((donor, index) => `
        <div class="analyst-item">
            <div>
                <span style="font-size: 1.5rem; margin-right: 0.5rem;">${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                <strong>${donor.name}</strong>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 0.3rem;">
                    ${donor.donations} donations • ${donor.servings} servings
                </p>
            </div>
        </div>
    `).join('');
}

// Display location analysis
function displayLocationAnalysis() {
    const container = document.getElementById('locationAnalysis');
    
    container.innerHTML = locationData.map(loc => `
        <div class="analyst-item">
            <div style="flex: 1;">
                <strong>${loc.location}</strong>
                <div style="margin-top: 0.5rem;">
                    <div style="background: #ecf0f1; height: 25px; border-radius: 15px; overflow: hidden;">
                        <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; width: ${loc.percentage}%; border-radius: 15px; display: flex; align-items: center; padding: 0 10px;">
                            <span style="color: white; font-size: 0.85rem; font-weight: 600;">${loc.percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: right;">
                <strong style="font-size: 1.2rem; color: #667eea;">${loc.donations}</strong>
                <p style="color: #7f8c8d; font-size: 0.85rem;">donations</p>
            </div>
        </div>
    `).join('');
}

// Update metrics with stored data
function updateMetrics() {
    const storedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    
    if (storedDonations.length > 0) {
        const total = 156 + storedDonations.length;
        const servings = 4850 + storedDonations.reduce((sum, d) => sum + parseInt(d.quantity || 0), 0);
        const waste = Math.round(servings * 0.5);
        const completed = storedDonations.filter(d => d.status === 'requested').length;
        const rate = Math.round(((completed / storedDonations.length) * 100) || 78);
        
        document.getElementById('totalDonations').textContent = total;
        document.getElementById('totalServings').textContent = servings.toLocaleString();
        document.getElementById('wasteReduced').textContent = waste.toLocaleString() + ' kg';
        document.getElementById('completionRate').textContent = rate + '%';
    }
}

// Initialize
displayMonthlyTrends();
displayTopDonors();
displayLocationAnalysis();
updateMetrics();
