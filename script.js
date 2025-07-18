
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const responseDiv = document.getElementById('formResponse');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    fetch('https://formsubmit.co/ajax/adarshmaurya8383@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            message: form.message.value,
            _subject: 'New Contact from Educator Website',
            _template: 'table'
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        responseDiv.style.display = 'block';
        responseDiv.className = 'success';
        responseDiv.innerHTML = '<p><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</p>';
        form.reset();
    })
    .catch(error => {
        responseDiv.style.display = 'block';
        responseDiv.className = 'error';
        responseDiv.innerHTML = '<p><i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again later or contact me directly at adarshmaurya8383@gmail.com</p>';
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            responseDiv.style.display = 'none';
        }, 5000);
    });
});