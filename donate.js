// Check authentication
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'donor') {
    alert('Please login as a donor to access this page');
    window.location.href = 'login.html';
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Image Preview
document.getElementById('foodImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Food Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// Set minimum date to current date/time
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.getElementById('expiryDate').min = now.toISOString().slice(0, 16);

// Form Submission
document.getElementById('donateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const foodName = document.getElementById('foodName').value.trim();
    const foodType = document.getElementById('foodType').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const pickupAddress = document.getElementById('pickupAddress').value.trim();
    const foodImage = document.getElementById('foodImage').files[0];
    
    let isValid = true;
    
    // Clear errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    // Validate fields
    if (!foodName) {
        document.getElementById('foodNameError').textContent = 'Food name is required';
        isValid = false;
    }
    
    if (!foodType) {
        document.getElementById('foodTypeError').textContent = 'Please select food type';
        isValid = false;
    }
    
    if (!quantity || quantity < 1) {
        document.getElementById('quantityError').textContent = 'Please enter valid quantity';
        isValid = false;
    }
    
    if (!expiryDate) {
        document.getElementById('expiryError').textContent = 'Expiry date is required';
        isValid = false;
    } else if (new Date(expiryDate) <= new Date()) {
        document.getElementById('expiryError').textContent = 'Expiry date must be in the future';
        isValid = false;
    }
    
    if (!pickupAddress) {
        document.getElementById('addressError').textContent = 'Pickup address is required';
        isValid = false;
    }
    
    if (!foodImage) {
        document.getElementById('imageError').textContent = 'Please upload an image';
        isValid = false;
    }
    
    if (isValid) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const donation = {
                id: Date.now(),
                donorEmail: currentUser.email,
                donorName: currentUser.fullName,
                foodName,
                foodType,
                quantity,
                expiryDate,
                pickupAddress,
                image: e.target.result,
                status: 'available',
                createdAt: new Date().toISOString()
            };
            
            const donations = JSON.parse(localStorage.getItem('donations') || '[]');
            donations.push(donation);
            localStorage.setItem('donations', JSON.stringify(donations));
            
            alert('Food donation submitted successfully!');
            window.location.href = 'dashboard.html';
        };
        reader.readAsDataURL(foodImage);
    }
});
