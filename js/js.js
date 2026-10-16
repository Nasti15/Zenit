const dropBtn = document.querySelector('.dropbtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const arrowIcon = document.querySelector('.ikon');
let isOpen = false;
if (dropBtn && dropdownMenu) {
    dropBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isOpen = !isOpen;
        if (isOpen) {
            dropdownMenu.classList.add('show');
            if (arrowIcon) {
                arrowIcon.style.transform = 'rotate(180deg)';
            }
        } else {
            dropdownMenu.classList.remove('show');
            if (arrowIcon) {
                arrowIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    document.addEventListener('click', function (e) {
        const isInside = dropBtn.contains(e.target) || dropdownMenu.contains(e.target);
        if (!isInside && isOpen) {
            dropdownMenu.classList.remove('show');
            if (arrowIcon) {
                arrowIcon.style.transform = 'rotate(0deg)';
            }
            isOpen = false;
        }
    });
    const sections = document.querySelectorAll('.category-section');
    const filterLinks = document.querySelectorAll('.filter-link');
    function filterProducts(category, categoryName) {
        sections.forEach(function (section) {
            const sectionCategory = section.getAttribute('data-category');
            if (category === 'all' || sectionCategory === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        if (category === 'all') {
            dropBtn.innerHTML = 'По умолчанию <img class="ikon" src="foto/стрелвниз.png" alt="стрелка">';
        } else {
            dropBtn.innerHTML = categoryName + ' <img class="ikon" src="foto/стрелвниз.png" alt="стрелка">';
        }
        const newArrow = dropBtn.querySelector('.ikon');
        if (newArrow) {
            newArrow.style.transform = 'rotate(0deg)';
        }
    }
    filterLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const category = this.getAttribute('data-filter');
            const categoryName = this.textContent;
            filterProducts(category, categoryName);
            dropdownMenu.classList.remove('show');
            isOpen = false;
            const arrow = document.querySelector('.ikon');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    filterProducts('all', 'По умолчанию');
}


document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!track) {
        console.log('Слайдер не найден на этой странице');
        return;
    }
    if (!prevBtn || !nextBtn) {
        console.error('Ошибка: не найдены кнопки #prevBtn или #nextBtn');
        return;
    }
    if (slides.length === 0) {
        console.error('Ошибка: нет слайдов');
        return;
    }
    let currentIndex = 0;
    const totalSlides = slides.length;
    function updateSlider() {
        const shift = -(100 / totalSlides) * currentIndex;
        track.style.transform = `translateX(${shift}%)`;
        console.log(`Слайд ${currentIndex + 1}, сдвиг: ${shift}%`);
    }
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    console.log('✅ Слайдер загружен! Нажмите на кнопки.');
});


document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('closeModal');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    const cartButtons = document.querySelectorAll('.kor, .korr');
    const modal = document.getElementById('modal');
    const continueBtn = document.getElementById('continueBtn');
    const goCartBtn = document.getElementById('goCartBtn');
    cartButtons.forEach(button => {
        const originalHTML = button.innerHTML;
        let isInCart = false;
        button.classList.add('cart-btn');
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#37BEFC';
        });
        button.addEventListener('mouseleave', function () {
            if (!isInCart) {
                this.style.backgroundColor = 'white';
            } else {
                this.style.backgroundColor = 'white';
            }
        });
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!isInCart) {
                this.innerHTML = `
                    <span style="color: black; font-size: 24px; font-family: Arial; margin-left: 21px; margin-bottom: 5px;">
                        в корзине
                    </span>
                    <img src="foto/корзина.png" alt="korzina" style="width: 31px; height: 31px; margin-left: 8px; filter: brightness(100);">
                `;
                this.style.backgroundColor = 'white';
                isInCart = true;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else {
                this.innerHTML = originalHTML;
                this.style.backgroundColor = 'white';
                isInCart = false;
            }
        });
    });
    continueBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});