(() => {
  const slides = [...document.querySelectorAll('[data-slide]')];
  const dots = [...document.querySelectorAll('[data-dot]')];
  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  const slider = document.querySelector('[data-slider]');
  let current = 0;
  let timer;

  const showSlide = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  const startSlider = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
  };

  prev?.addEventListener('click', () => {
    showSlide(current - 1);
    startSlider();
  });

  next?.addEventListener('click', () => {
    showSlide(current + 1);
    startSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startSlider();
    });
  });

  slider?.addEventListener('mouseenter', () => clearInterval(timer));
  slider?.addEventListener('mouseleave', startSlider);
  startSlider();

  const toast = document.querySelector('[data-help-toast]');
  const closeToast = document.querySelector('[data-close-toast]');
  let toastTimer;

  if (toast) {
    toastTimer = window.setTimeout(() => {
      toast.classList.add('is-visible');
    }, 4500);
  }

  closeToast?.addEventListener('click', () => {
    clearTimeout(toastTimer);
    toast?.classList.remove('is-visible');
  });

  const modal = document.querySelector('[data-booking-modal]');
  const openButtons = document.querySelectorAll('[data-open-booking]');
  const closeBooking = document.querySelector('[data-close-booking]');
  const serviceButtons = [...document.querySelectorAll('[data-service]')];
  const modalWhatsApp = document.querySelector('[data-modal-whatsapp]');
  let selectedService = 'AC Service';

  const updateWhatsAppLink = () => {
    if (!modalWhatsApp) return;
    const message = `Hello, I want to book ${selectedService}. My location is:`;
    modalWhatsApp.href = `https://wa.me/919756572466?text=${encodeURIComponent(message)}`;
  };

  const openModal = () => {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    toast?.classList.remove('is-visible');
    closeBooking?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  openButtons.forEach(button => button.addEventListener('click', openModal));
  closeBooking?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      serviceButtons.forEach(item => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      selectedService = button.dataset.service || 'AC Service';
      updateWhatsAppLink();
    });
  });

  updateWhatsAppLink();
})();
