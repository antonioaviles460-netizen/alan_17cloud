document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');

  if (!carousel || !track) return; // 🔒 seguridad

  const slides = Array.from(track.children);
  let index = 0;
  let startX = 0;
  let slideWidth = carousel.offsetWidth;

  // Función para actualizar el carrusel
  function updateCarousel() {
    slideWidth = carousel.offsetWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Activar animación/estilo activo
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  // Inicializar
  updateCarousel();

  // Actualizar al cambiar tamaño de ventana
  window.addEventListener('resize', updateCarousel);

  // Autoplay
  setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 3500);

  // Swipe touch
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      index = (index + 1) % slides.length;
    } else if (diff < -50) {
      index = (index - 1 + slides.length) % slides.length;
    }

    updateCarousel();
  });

});
