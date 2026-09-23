/**
 * ==========================================================================
 * COLÉGIO MICHELINI - INTERATIVIDADE & COMPONENTES JAVASCRIPT VANILLA
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initTeachingLevelTabs();
  initTestimonialsCarousel();
  initContactForm();
  initScheduleModal();
  initLogoFallback();
});

/**
 * 1. NAVBAR DINÂMICA AO ROLAR A PÁGINA (STICKY & BLUR)
 */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Checagem inicial
}

/**
 * 2. MENU HAMBÚRGUER MOBILE
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    menuBtn.classList.toggle('menu-open');
    mobileMenu.classList.toggle('hidden');
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer link de navegação
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
      toggleMenu();
    }
  });
}

/**
 * 3. ROLAGEM SUAVE COM OFFSET PARA OS LINKS ÂNCORA
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.getElementById('main-header')?.offsetHeight || 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 4. ABAS INTERATIVAS DE NÍVEIS DE ENSINO
 */
function initTeachingLevelTabs() {
  const tabButtons = document.querySelectorAll('.level-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Atualiza botões
      tabButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'border-primary');
        btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200', 'hover:border-primary/40');
        btn.setAttribute('aria-selected', 'false');
      });

      button.classList.add('bg-primary', 'text-white', 'shadow-md', 'border-primary');
      button.classList.remove('bg-white', 'text-slate-700', 'border-slate-200', 'hover:border-primary/40');
      button.setAttribute('aria-selected', 'true');

      // Atualiza painéis
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });
}

/**
 * 5. CARROSSEL DE DEPOIMENTOS
 */
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval = null;

  // Criação dos dots de navegação
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot h-2.5 rounded-full transition-all duration-300 ${
        idx === 0 ? 'bg-primary w-8' : 'bg-slate-300 w-2.5 hover:bg-slate-400'
      }`;
      dot.setAttribute('aria-label', `Ir para depoimento ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Atualiza dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('bg-primary', 'w-8');
          dot.classList.remove('bg-slate-300', 'w-2.5');
        } else {
          dot.classList.remove('bg-primary', 'w-8');
          dot.classList.add('bg-slate-300', 'w-2.5');
        }
      });
    }
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlidePosition();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      restartAutoplay();
    });
  }

  // Autoplay com pausa ao passar o mouse
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  };

  const restartAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', () => startAutoplay());

  startAutoplay();
}

/**
 * 6. VALIDAÇÃO DO FORMULÁRIO DE CONTATO & FEEDBACK
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const phoneInput = document.getElementById('contact-phone');

  if (phoneInput) {
    // Máscara dinâmica de telefone brasileiro (DDD + 8 ou 9 dígitos)
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        // Formato Celular: (XX) XXXXX-XXXX
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 6) {
        // Formato Fixo: (XX) XXXX-XXXX
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        e.target.value = `(${value}`;
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Campos obrigatórios
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const phone = document.getElementById('contact-phone');
    const grade = document.getElementById('contact-grade');
    const message = document.getElementById('contact-message');

    // Validação do Nome
    if (!name.value.trim() || name.value.trim().length < 3) {
      setFieldError(name, 'Por favor, informe o nome completo.');
      isValid = false;
    } else {
      clearFieldError(name);
    }

    // Validação do E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setFieldError(email, 'Informe um endereço de e-mail válido.');
      isValid = false;
    } else {
      clearFieldError(email);
    }

    // Validação do Telefone
    const digitsOnly = phone.value.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setFieldError(phone, 'Informe um telefone válido com DDD.');
      isValid = false;
    } else {
      clearFieldError(phone);
    }

    // Validação da Série de Interesse
    if (!grade.value) {
      setFieldError(grade, 'Selecione a etapa ou série de interesse.');
      isValid = false;
    } else {
      clearFieldError(grade);
    }

    // Validação da Mensagem
    if (!message.value.trim() || message.value.trim().length < 5) {
      setFieldError(message, 'Digite sua dúvida ou mensagem.');
      isValid = false;
    } else {
      clearFieldError(message);
    }

    if (isValid) {
      // Simulação de envio com sucesso
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Enviando Mensagem...
      `;

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Mensagem enviada com sucesso! Nossa equipe pedagógica entrará em contato em breve.');
      }, 1200);
    }
  });

  function setFieldError(input, message) {
    input.classList.add('border-red-500', 'bg-red-50/50');
    input.classList.remove('border-slate-300');
    let errorSpan = input.parentElement.querySelector('.form-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'form-error text-xs text-red-600 font-medium mt-1 block';
      input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('border-red-500', 'bg-red-50/50');
    input.classList.add('border-slate-300');
    const errorSpan = input.parentElement.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.remove();
    }
  }
}

/**
 * 7. MODAL DE AGENDAMENTO DE VISITA
 */
function initScheduleModal() {
  const modal = document.getElementById('schedule-modal');
  const openButtons = document.querySelectorAll('.open-schedule-modal');
  const closeButton = document.getElementById('close-schedule-modal');
  const modalForm = document.getElementById('modal-schedule-form');

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Fechar ao clicar no backdrop escuro
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Envio do formulário do modal
  if (modalForm) {
    const modalPhone = document.getElementById('modal-phone');
    if (modalPhone) {
      modalPhone.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        if (val.length > 10) {
          e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
        } else if (val.length > 6) {
          e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
        } else if (val.length > 2) {
          e.target.value = `(${val.slice(0, 2)}) ${val.slice(2)}`;
        }
      });
    }

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      modalForm.reset();
      showToast('Visita solicitada com sucesso! Entraremos em contato via WhatsApp para confirmar o horário.');
    });
  }
}

/**
 * 8. EXIBIÇÃO DE TOAST NOTIFICATION
 */
function showToast(message) {
  let toast = document.getElementById('toast-notification');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3.5 border-l-4 border-secondary opacity-0 translate-y-6 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div class="flex-1 text-sm font-medium leading-relaxed">${message}</div>
    <button type="button" class="text-slate-400 hover:text-white ml-2" onclick="this.parentElement.classList.add('opacity-0', 'translate-y-6')">
      ✕
    </button>
  `;

  // Animação de entrada
  toast.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

  // Auto ocultar após 5 segundos
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    toast.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
  }, 5000);
}

/**
 * 9. FALLBACK INTELIGENTE PARA A LOGO
 * Se o usuário ainda não colocou `assets/logo.png`, carrega automaticamente `assets/logo.svg`
 */
function initLogoFallback() {
  const logoImgs = document.querySelectorAll('.school-logo-img');
  logoImgs.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.getAttribute('data-fallback-tried')) {
        this.setAttribute('data-fallback-tried', 'true');
        this.src = 'assets/logo.svg';
      }
    });
  });
}
