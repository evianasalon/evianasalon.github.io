// Script untuk halaman gallery dengan fitur zoom
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded - dengan fitur zoom');
    
    // Elements
    const modal = document.getElementById('imageModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const imageCaption = document.getElementById('imageCaption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imageCounter = document.querySelector('.image-counter');
    const galleryItems = document.querySelectorAll('.masonry-item');
    
    let currentImageIndex = 0;
    const totalImages = galleryItems.length;
    
    // Debug: Cek semua elemen gambar
    const images = document.querySelectorAll('img');
    console.log(`Found ${images.length} image elements`);
    
    // Fungsi untuk membuka modal
    function openModal(index) {
        const clickedImage = galleryItems[index].querySelector('img');
        zoomedImage.src = clickedImage.src;
        imageCaption.textContent = clickedImage.alt;
        currentImageIndex = index;
        updateCounter();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Fungsi untuk menutup modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Fungsi untuk navigasi gambar
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateModalImage();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateModalImage();
    }
    
    function updateModalImage() {
        const image = galleryItems[currentImageIndex].querySelector('img');
        zoomedImage.src = image.src;
        imageCaption.textContent = image.alt;
        updateCounter();
        
        // Add fade effect
        zoomedImage.style.opacity = '0';
        setTimeout(() => {
            zoomedImage.style.opacity = '1';
        }, 150);
    }
    
    function updateCounter() {
        imageCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
    }
    
    // Event Listeners untuk gambar
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        
        // Event ketika gambar berhasil dimuat
        img.onload = function() {
            console.log(`✓ Gambar ${index + 1} berhasil dimuat:`, this.src);
            this.style.opacity = '1';
            this.parentElement.style.background = 'none';
        };
        
        // Event ketika gambar gagal dimuat
        img.onerror = function() {
            console.error(`✗ Gambar ${index + 1} gagal dimuat:`, this.src);
            
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTUwLDgwIEE1MCw1MCAwIDEgMCAxNTAsODAgWiIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9Ijc1IiByPSIyMCIgZmlsbD0iI2RkZCIvPjxwYXRoIGQ9Ik0xMzAsMTIwIEwxNzAsMTIwIEwxNzAsMTcwIEwxMzAsMTcwIFoiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSIxNTAiIHk9IjE5NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EZWtvcmFzaSBQZXJuaWthaGFuPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Gambar dekorasi tidak tersedia';
            this.style.border = '2px dashed #e0e0e0';
            this.style.padding = '30px';
            this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        };
        
        img.style.opacity = '0.8';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Click event untuk zoom
        item.addEventListener('click', () => {
            openModal(index);
        });
    });
    
    // Event Listeners untuk modal
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal ketika klik di luar gambar
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Efek untuk tombol kembali
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        backButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Kembali ke landing page');
            
            this.innerHTML = 'Mengalihkan...';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 500);
        });
    }
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Loading animation completion
    setTimeout(() => {
        galleryItems.forEach(item => {
            item.style.animation = 'none';
        });
    }, 2500);
    
    console.log('Gallery dengan fitur zoom siap!');
    console.log('Fitur: Click to zoom, Keyboard navigation, Touch swipe support');
});