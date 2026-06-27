document.addEventListener('DOMContentLoaded', () => {
    
    // 1. АВТОМАТИЧЕСКОЕ ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 2. ОТПРАВКА ФОРМЫ В ТЕЛЕГРАМ С ИНТЕГРИРОВАННОЙ МОДАЛЬНОЙ ВАЛИДАЦИЕЙ
    const form = document.getElementById('tg-form');
    const TELEGRAM_TOKEN = '8920785499:AAGjECs4O-7N4By8fL3fCU0m4y8aO4r3SFY'; 
    const TELEGRAM_CHAT_ID = '-1004360378203';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            const tour = formData.get('tour');
            const contactMethod = formData.get('contact_method');

            const nameCheck = /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/;
            const cleanPhone = phone.replace(/\D/g, '');

            // Перехват ошибок валидации кастомным окном вместо системного alert
            if (!nameCheck.test(name)) {
                showCustomModal(
                    'Ошибка валидации', 
                    'Имя должно содержать только буквы и быть длиной от 2 до 30 символов.', 
                    'error'
                );
                return; 
            }

            if (cleanPhone.length < 10 || cleanPhone.length > 15) {
                showCustomModal(
                    'Неверный формат', 
                    'Пожалуйста, введите корректный номер телефона (только цифры, без букв и спама).', 
                    'error'
                );
                return; 
            }

            const text = `🔥 Новая заявка "Топим за Туризм"!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Ответить в: ${contactMethod}\n🏔️ Выбранный тур: ${tour}`;
            const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'HTML' })
                });
                if (response.ok) {
                    showCustomModal(
                        'Успешно отправлено', 
                        `Спасибо, ${name}, Заявка успешно отправлена. Мы свяжемся с тобой в ближайшее время через ${contactMethod}.`, 
                        'success'
                    );
                    form.reset();
                } else {
                    showCustomModal(
                        'Ошибка API', 
                        'Произошел сбой на стороне серверов Telegram API. Проверьте правильность токена.', 
                        'error'
                    );
                }
            } catch (error) {
                showCustomModal(
                    'Ошибка сети', 
                    'Не удалось установить соединение с сервером. Проверьте подключение к интернету.', 
                    'error'
                );
            }
        });
    }


    // 3. УНИВЕРСАЛЬНЫЙ ДВИЖОК СЛАЙДЕРОВ ДЛЯ КАРТОЧЕК ПРОГРАММ
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentSlide = 0;

        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        function changeSlide(index) {
            currentSlide = index;
            slides.forEach((slide, i) => {
                if (i === currentSlide) {
                    slide.classList.remove('opacity-0', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'z-0');
                }
            });
        }

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let index = currentSlide - 1;
            if (index < 0) index = slides.length - 1;
            changeSlide(index);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let index = currentSlide + 1;
            if (index >= slides.length) index = 0;
            changeSlide(index);
        });
    });


    // 4. МЯГКОЕ И ПЛАВНОЕ ГЛИССИРОВАНИЕ ПРИ КЛИКЕ НА НАВИГАЦИЮ
    const navigationLinks = document.querySelectorAll('nav a, header a[href^="#"]');

    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault(); 
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });


    // 5. ИЗОЛИРОВАННЫЙ НАБЛЮДАТЕЛЬ ДЛЯ КРУПНОГО СИЛУЭТА ЯНЫ
    const yanaImage = document.querySelector('.yana-pop-up');
    
    if (yanaImage) {
        const yanaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    yanaImage.classList.add('yana-visible');
                    yanaObserver.unobserve(entry.target); 
                }
            });
        }, { root: null, threshold: 0.15 });

        yanaObserver.observe(yanaImage);
    }


    // 6. ИЗОЛИРОВАННАЯ БАЗА ДАННЫХ И ДИНАМИЧЕСКИЙ ДВИЖОК ГАЛЕРЕИ
    // Прописаны точные расширения файлов из твоей структуры
    const galleryDatabase = [
        // Первые 6 фотографий
        { src: 'img/g64.png', alt: 'Сияние' },
        { src: 'img/g58.png', alt: 'Горы' },
        { src: 'img/g71.png', alt: 'Скважина' },
        { src: 'img/g23.png', alt: 'Машина' },
        { src: 'img/g85.png', alt: 'Айсфлоатинг' },
        { src: 'img/g92.png', alt: 'Закат' },
        // Первый блок: Киты
        { src: 'img/g11.png', alt: 'Киты 1' },
        { src: 'img/g17.png', alt: 'Киты 2' },
        { src: 'img/g61.png', alt: 'Киты 3' },
        // Второй блок: Северное сияние
        { src: 'img/g21.png', alt: 'Сияние 1' },
        { src: 'img/g79.png', alt: 'Сияние 2' },
        { src: 'img/g22.png', alt: 'Сияние 3' },
        // Третий блок: Зимние развлечения
        { src: 'img/g20.png', alt: 'Зима 1' },
        { src: 'img/g53.png', alt: 'Зима 2' },
        { src: 'img/g19.png', alt: 'Зима 3' },
        // Четвертый блок: Териберка
        { src: 'img/g95.png', alt: 'Териберка 1' },
        { src: 'img/g30.png', alt: 'Териберка 2' },
        { src: 'img/g98.png', alt: 'Териберка 3' },
        // Пятый блок: Айсфлоатинг
        { src: 'img/g96.png', alt: 'Айсфлоатинг 1' },
        { src: 'img/g81.png', alt: 'Айсфлоатинг 2' },
        { src: 'img/g75.png', alt: 'Айсфлоатинг 3' },
        // Шестой блок: Пейзажи
        { src: 'img/g43.png', alt: 'Пейзажи 1' },
        { src: 'img/g45.png', alt: 'Пейзажи 2' },
        { src: 'img/g31.png', alt: 'Пейзажи 3' },
        // Седьмой блок: Мурманск
        { src: 'img/g90.png', alt: 'Мурманск 1' },
        { src: 'img/g100.png', alt: 'Мурманск 2' },
        { src: 'img/g86.png', alt: 'Мурманск 3' },
        // Восьмой блок: Скважина
        { src: 'img/g69.png', alt: 'Скважина 1' },
        { src: 'img/g70.png', alt: 'Скважина 2' },
        { src: 'img/g72.png', alt: 'Скважина 3' },
        // Девятый блок: Всякое
        { src: 'img/g56.png', alt: 'Всякое 1' },
        { src: 'img/g63.png', alt: 'Всякое 2' },
        { src: 'img/g15.png', alt: 'Всякое 3' },
        { src: 'img/g28.png', alt: 'Всякое 4' },
        { src: 'img/g35.png', alt: 'Всякое 5' },
        { src: 'img/g52.png', alt: 'Всякое 6' },
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const loadMorePhotosBtn = document.getElementById('load-more-photos');
    
    if (galleryContainer && loadMorePhotosBtn) {
        let currentRenderedCount = 0;
        const batchSize = 6; 

        function createPhotoCard(photoData, indexInBatch) {
            const card = document.createElement('div');
            card.className = 'gallery-animate-show aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm hover:scale-[1.02] transition-transform duration-300';
            card.style.animationDelay = `${indexInBatch * 75}ms`;
            card.innerHTML = `<img src="${photoData.src}" class="w-full h-full object-cover" alt="${photoData.alt}">`;
            return card;
        }

        function renderNextBatch() {
            const nextBatchData = galleryDatabase.slice(currentRenderedCount, currentRenderedCount + batchSize);
            
            nextBatchData.forEach((photoData, index) => {
                const photoCard = createPhotoCard(photoData, index);
                galleryContainer.appendChild(photoCard);
            });

            currentRenderedCount += nextBatchData.length;

            if (currentRenderedCount >= galleryDatabase.length) {
                loadMorePhotosBtn.style.display = 'none';
            }
        }

        renderNextBatch();

        loadMorePhotosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderNextBatch();
        });
    }


    // 7. СИСТЕМА ПЛАВНОГО РАЗВЕРТЫВАНИЯ ПОДРОБНОГО ОПИСАНИЯ ТУРОВ
    const expandButtons = document.querySelectorAll('[data-expand-btn]');

    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parentContainer = btn.parentElement;
            const contentBlock = parentContainer.querySelector('[data-expand-content]');
            const arrowIcon = btn.querySelector('svg');
            const textNode = btn.querySelector('span');

            if (!contentBlock) return;

            if (contentBlock.classList.contains('opacity-0')) {
                contentBlock.classList.remove('opacity-0');
                contentBlock.style.maxHeight = contentBlock.scrollHeight + "px";
                if (textNode) textNode.textContent = 'Свернуть описание';
                if (arrowIcon) arrowIcon.classList.add('rotate-180');
            } else {
                contentBlock.style.maxHeight = '0px';
                contentBlock.classList.add('opacity-0');
                if (textNode) textNode.textContent = 'Подробнее о программе';
                if (arrowIcon) arrowIcon.classList.remove('rotate-180');
            }
        });
    });


    // 8. АВТОМАТИЧЕСКАЯ КНОПКА "ВВЕРХ" ПРИ СКРОЛЛЕ
    const scrollTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.remove('opacity-100');
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // 9. СУВЕРЕННЫЙ ДВИЖОК ДИНАМИЧЕСКИХ МОДАЛЬНЫХ УВЕДОМЛЕНИЙ
    const modalWrapper = document.getElementById('custom-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    function showCustomModal(title, message, type = 'error') {
        if (!modalWrapper) return;

        const titleNode = document.getElementById('modal-title');
        const messageNode = document.getElementById('modal-message');
        const iconBgNode = document.getElementById('modal-icon-bg');
        const iconTextNode = document.getElementById('modal-icon-text');

        // Подстановка текстового контента
        if (titleNode) titleNode.textContent = title;
        if (messageNode) messageNode.textContent = message;

        // Сброс старых классов стилизации иконки
        if (iconBgNode) {
            iconBgNode.classList.remove('modal-bg-error', 'modal-bg-success');
            
            // Настройка стилей в зависимости от типа события
            if (type === 'success') {
                iconBgNode.classList.add('modal-bg-success');
                if (iconTextNode) iconTextNode.textContent = '✓';
            } else {
                iconBgNode.classList.add('modal-bg-error');
                if (iconTextNode) iconTextNode.textContent = '✕';
            }
        }

        // Вывод окна на экран
        modalWrapper.classList.add('modal-active');
    }

    // Логика закрытия окна
    if (modalCloseBtn && modalWrapper) {
        modalCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalWrapper.classList.remove('modal-active');
        });

        // Альтернативное закрытие кликом по оверлею (по серому фону)
        modalWrapper.addEventListener('click', (e) => {
            if (e.target === modalWrapper) {
                modalWrapper.classList.remove('modal-active');
            }
        });
    }

// 10. УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ПОЛИТИКИ (ВЫЗОВ ИЗ ФОРМЫ И ИЗ ФУТЕРА)
    const privacyModal = document.getElementById('privacy-modal');
    const privacyTriggers = document.querySelectorAll('[data-privacy-open]');
    const privacyCloseBtn = document.getElementById('privacy-close-btn');

    if (privacyModal && privacyCloseBtn && privacyTriggers.length > 0) {
        // Назначаем обработчик на все элементы с атрибутом data-privacy-open
        privacyTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                privacyModal.classList.add('modal-active');
            });
        });

        privacyCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.remove('modal-active');
        });

        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                privacyModal.classList.remove('modal-active');
            }
        });
    }

    // 11. УПРАВЛЕНИЕ ДИНАМИЧЕСКИМ ШАГОМ ЛЕНТЫ ОТЗЫВОВ (КАРУСЕЛЬ)
    const reviewsTrack = document.getElementById('reviews-track');
    const reviewPrevBtn = document.getElementById('review-prev');
    const reviewNextBtn = document.getElementById('review-next');

    if (reviewsTrack && reviewPrevBtn && reviewNextBtn) {
        // Динамический расчет смещения: берем текущую ширину первой карточки в рантайме + gap (24px)
        const getScrollStep = () => {
            const firstItem = reviewsTrack.firstElementChild;
            return firstItem ? firstItem.offsetWidth + 24 : 350;
        };

        // Клик влево
        reviewPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            reviewsTrack.scrollLeft -= getScrollStep();
        });

        // Клик вправо
        reviewNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            reviewsTrack.scrollLeft += getScrollStep();
        });
    }

});