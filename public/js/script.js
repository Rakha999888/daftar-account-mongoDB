// Toggle antara form login dan register
function showForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.querySelector('.toggle-btn:first-child');
    const registerBtn = document.querySelector('.toggle-btn:last-child');
    
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

// Tampilkan modal
function showModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.display = 'flex';
}

// Tutup modal
function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.display = 'none';
}

// Handle form login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Simpan token di localStorage
            localStorage.setItem('token', data.data.token);
            showModal();
        } else {
            alert(data.message || 'Login gagal. Silakan coba lagi.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi nanti.');
    }
}

// Handle form register
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validasi password
    if (password !== confirmPassword) {
        alert('Konfirmasi password tidak cocok!');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nama: name,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Tampilkan modal dan reset form
            showModal();
            event.target.reset();
            // Otomatis pindah ke form login
            showForm('login');
        } else {
            alert(data.message || 'Registrasi gagal. Silakan coba lagi.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi nanti.');
    }
}

// Cek token saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Jika sudah login, arahkan ke halaman dashboard atau halaman utama
        // window.location.href = '/dashboard.html';
    }
});
