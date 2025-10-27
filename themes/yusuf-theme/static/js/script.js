document.addEventListener('DOMContentLoaded', function() {
    const cardsWrapper = document.getElementById('cardsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtnMobile = document.getElementById('prevBtnMobile');
    const nextBtnMobile = document.getElementById('nextBtnMobile');
    
    const originalCards = document.querySelectorAll('.card');
    const totalCards = originalCards.length;
    
    // Kartları klonla - başa son kartları, sona ilk kartları ekle
    for (let i = totalCards - 3; i < totalCards; i++) {
        const clone = originalCards[i].cloneNode(true);
        clone.classList.add('clone');
        cardsWrapper.insertBefore(clone, cardsWrapper.firstChild);
    }
    
    for (let i = 0; i < 3; i++) {
        const clone = originalCards[i].cloneNode(true);
        clone.classList.add('clone');
        cardsWrapper.appendChild(clone);
    }
    
    let currentIndex = 3; // Klonlar nedeniyle 3'ten başla
    
    function updateCarousel(animate = true) {
        const isMobile = window.innerWidth <= 768;
        
        if (!animate) {
            cardsWrapper.style.transition = 'none';
        } else {
            cardsWrapper.style.transition = 'transform 0.5s ease';
        }
        
        let cardWidth;
        if (isMobile) {
            // Mobilde her kart tam container genişliği + margin
            cardWidth = cardsWrapper.parentElement.clientWidth;
        } else {
            // Desktopte kart genişliği + margin
            cardWidth = originalCards[0].offsetWidth + 16;
        }
        
        const translateX = -currentIndex * cardWidth;
        cardsWrapper.style.transform = `translateX(${translateX}px)`;
    }
    
    function nextSlide() {
        currentIndex++;
        updateCarousel();
        
        // Son klonlara geldiysek, animasyon bittikten sonra başa git
        if (currentIndex >= totalCards + 3) {
            setTimeout(() => {
                currentIndex = 3;
                updateCarousel(false);
            }, 500);
        }
    }
    
    function prevSlide() {
        currentIndex--;
        updateCarousel();
        
        // İlk klonlara geldiysek, animasyon bittikten sonra sona git
        if (currentIndex <= 0) {
            setTimeout(() => {
                currentIndex = totalCards;
                updateCarousel(false);
            }, 500);
        }
    }
    
    // Event listener'lar
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    nextBtnMobile.addEventListener('click', nextSlide);
    prevBtnMobile.addEventListener('click', prevSlide);
    
    // Başlangıçta doğru pozisyona getir
    updateCarousel(false);
    
    // Pencere boyutu değiştiğinde güncelle
    window.addEventListener('resize', function() {
        updateCarousel(false);
    });
    
    // Sayfa tamamen yüklendiğinde doğru pozisyona getir
    window.addEventListener('load', function() {
        setTimeout(() => {
            currentIndex = 3;
            updateCarousel(false);
        }, 100);
    });
});