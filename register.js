document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    // Validate Full Name
    if (!fullName) {
        document.getElementById('nameError').textContent = 'Full name is required';
        isValid = false;
    } else if (fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
        isValid = false;
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate Password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // Validate Role
    if (!role) {
        document.getElementById('roleError').textContent = 'Please select a role';
        isValid = false;
    }
    
    if (isValid) {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            document.getElementById('emailError').textContent = 'Email already registered';
            return;
        }
        
        // Save user
        const user = { fullName, email, password, role };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    }
});
