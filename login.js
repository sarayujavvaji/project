// Toggle Password Visibility
document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    // Validate Email
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    }
    
    // Validate Password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    }
    
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('loginError').textContent = 'Invalid email or password';
        }
    }
});
