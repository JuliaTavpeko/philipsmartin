"use strict"

const addLoadedClass = () => {
    window.addEventListener("load", function () {
        setTimeout(function () {
            document.documentElement.classList.add('loaded');
        }, 0);
    });
}

const SmoothScroll = (element) => {
    const smoothLinks = document.querySelectorAll(element);
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
}

const mobileNav = () => {
    if (document.querySelectorAll('[data-nav-toggle]')) {
        document.querySelectorAll('[data-nav-toggle]').forEach( (element) => {
            element.addEventListener('click',  (event) => {
                console.log('clicked');
                document.body.classList.toggle('nav-open')
                return false
            })
        })
    }
}

const initSliders = () => {
    if (document.querySelector('[data-hero]')) {
        new Swiper('[data-hero]', {
            loop: true,
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 500,
            breakpoints: {
                768: {
                    spaceBetween: 0,
                    slidesPerView: 2,
                },
                1024: {
                    spaceBetween: 0,
                    slidesPerView: 2,
                },
            },
            on: {}
        });
    }

    if (document.querySelector('[data-compilation]')) {
        new Swiper('[data-compilation]', {
            loop: false,
            observer: true,
            roundLengths: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 6,
            speed: 500,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                },
            },
            on: {}
        });
    }

    if (document.querySelector('[data-libs]')) {
        new Swiper('[data-libs]', {
            loop: true,
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 60,
            speed: 6500,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: 80,
                },
                1440: {
                    slidesPerView: 'auto',
                    spaceBetween: 100,
                },
            },
            on: {}
        });
    }

    if (document.querySelector('[data-product-gallery]')) {
        new Swiper('[data-product-gallery]', {
            loop: true,
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 500,
            breakpoints: {
                768: {
                    spaceBetween: 12,
                    slidesPerView: 2,
                },
                1024: {
                    spaceBetween: 12,
                    slidesPerView: 2,
                },
            },
            pagination: {
                el: '[data-product-pagination]',
                clickable: true,
            },
            on: {}
        });
    }
}

const Spoilers = () => {

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-spoiler-control]')) {
            const spoilerItem       = event.target.closest('[data-spoiler]');
            const spoilerContent    = spoilerItem.querySelector('[data-spoiler-content]');
            const spoilerIsOpen     = spoilerItem.classList.contains('open');


            if (event.target.closest('[data-spoilers]')) {
                if (!spoilerIsOpen) {
                    event.target.closest('[data-spoilers]').querySelectorAll('[data-spoiler]').forEach(elem => {

                        if (elem.classList.contains('open')) {
                            slidetoggle.hide(
                                elem.querySelector('[data-spoiler-content]'),
                                {
                                    miliseconds: 200,
                                }
                            )
                            elem.classList.remove('open')
                        }
                    });

                    slidetoggle.show(
                        spoilerContent,
                        {
                            miliseconds: 200,
                        }
                    )
                    spoilerItem.classList.add('open')
                }
                else {

                }
            }
            else  {
                slidetoggle.toggle(
                    spoilerContent,
                    {
                        miliseconds: 200,
                    }
                )
                spoilerItem.classList.toggle('open')
            }
        }
    })
}

const initModal = () => {
    // Modal Fancybox
    Fancybox.bind("[data-fancybox]", {
        autoFocus: false,
        Thumbs: false,
        // Thumbs: {
        //     type: "classic",
        // },
    });

    Fancybox.bind("[data-modal]", {
        autoFocus: false,
        closeButton: false,
        Carousel: {
            Panzoom: {
                touch: false,
            },
        },
    });
}

const Marquee = () => {
    if (document.querySelectorAll('.vendors').length > 0) {
        document.querySelectorAll('.vendors').forEach((vendors) => {
            const track = vendors.querySelector('.vendors__track');

            track.innerHTML += track.innerHTML;

            let position = 0;
            let speed = 1;

            const originalWidth = track.scrollWidth / 2;

            function animate() {
                position -= speed;

                if (-position >= originalWidth) {
                    position += originalWidth;
                }

                track.style.transform = `translate3d(${position}px,0,0)`;

                requestAnimationFrame(animate);
            }

            animate();
        });
    }
}

const initStickyHeader = () => {
    const header = document.querySelector('.header');

    if (!header) return;

    const observerTarget = document.createElement('div');
    observerTarget.className = 'header-observer';

    header.before(observerTarget);

    const observer = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle('is-fixed', !entry.isIntersecting);
        },
        {
            threshold: 0,
        }
    );

    observer.observe(observerTarget);
}

document.addEventListener('DOMContentLoaded', initStickyHeader);

class LoadMore {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('[data-load-more]');

            if (!button) return;

            this.load(button);
        });
    }

    async load(button) {
        if (button.classList.contains('is-loading')) {
            return;
        }

        const targetSelector = button.dataset.target;
        const url = button.dataset.url;

        const container = document.querySelector(targetSelector);

        if (!container || !url) {
            console.error('Не найден контейнер или URL');
            return;
        }

        try {
            button.classList.add('is-loading');
            button.disabled = true;

            const response = await fetch(url, { method: 'GET' });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}`);
            }

            const html = await response.text();

            // создаём временный контейнер
            const temp = document.createElement('div');
            temp.innerHTML = html;

            const items = Array.from(temp.children);

            // 1. добавляем в DOM СРАЗУ, но без visible
            items.forEach((el) => {
                el.classList.add('product-card');
                container.appendChild(el);
            });

            // 2. запускаем анимацию после вставки (важно!)
            container.offsetHeight;

            requestAnimationFrame(() => {
                items.forEach((el, i) => {
                    el.style.transitionDelay = `${i * 60}ms`;
                    el.classList.add('is-visible');
                });
            });

        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            button.classList.remove('is-loading');
            button.disabled = false;
        }
    }
}

new LoadMore();

window.addEventListener('load',  (e) => {

    addLoadedClass()
    SmoothScroll()
    mobileNav()
    initSliders()
    Spoilers()
    initModal()
    Marquee()
});


