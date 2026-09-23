/**
 * JAVASCRIPT VANILLA - ÓTICA LIMEIRA
 * Interatividade, manipulação do DOM e componentes dinâmicos
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de Configuração
  const WHATSAPP_NUMBER = "5582996402650"; // Substitua pelo WhatsApp oficial da Ótica Limeira (DDD + Número)

  /* ==========================================================================
     1. NAVBAR STICKY & SCROLL EFFECT
     ========================================================================== */
  const navbar = document.getElementById('main-navbar');
  const topBar = document.getElementById('top-bar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-xl', 'bg-dark/95', 'backdrop-blur-md', 'py-3');
      navbar.classList.remove('py-4', 'bg-dark/80');
      if (topBar) {
        topBar.classList.add('opacity-0', '-translate-y-full');
      }
    } else {
      navbar.classList.remove('shadow-xl', 'bg-dark/95', 'backdrop-blur-md', 'py-3');
      navbar.classList.add('py-4', 'bg-dark/80');
      if (topBar) {
        topBar.classList.remove('opacity-0', '-translate-y-full');
      }
    }
  });

  /* ==========================================================================
     2. MENU HAMBÚRGUER MOBILE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Fechar o menu ao clicar em qualquer link interno
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     3. ROLAGEM SUAVE (SMOOTH SCROLL) COM OFFSET DO HEADER
     ========================================================================== */
  const internalNavLinks = document.querySelectorAll('a[href^="#"]');

  internalNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     4. ATIVAÇÃO DINÂMICA DO LINK DO MENU (SCROLL SPY)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ==========================================================================
     5. FILTRO DINÂMICO DE CATEGORIAS DE PRODUTOS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza estilo dos botões
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.add('bg-primary', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');

      const category = btn.getAttribute('data-category');

      // Filtra produtos
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'todos' || cardCategory === category) {
          card.classList.remove('hidden-card');
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.classList.add('hidden-card');
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     6. CONSULTA DE PRODUTO VIA WHATSAPP
     ========================================================================== */
  const productInquiryButtons = document.querySelectorAll('.btn-inquire-product');

  productInquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const productName = card ? card.querySelector('.product-title')?.innerText : 'este modelo de óculos';
      const productPrice = card ? card.querySelector('.product-price')?.innerText : '';

      const message = `Olá, Ótica Limeira! Gostei muito do modelo *${productName}* (${productPrice}). Gostaria de verificar a disponibilidade e tirar dúvidas sobre as opções de lentes para o meu grau.`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  /* ==========================================================================
     7. SISTEMA DE ENVIO / UPLOAD DE RECEITA MÉDICA
     ========================================================================== */
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('prescription-file');
  const fileInfo = document.getElementById('file-info');
  const fileNameDisplay = document.getElementById('file-name');
  const removeFileBtn = document.getElementById('remove-file-btn');
  const sendPrescriptionBtn = document.getElementById('btn-send-prescription-form');

  let selectedFile = null;

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-primary', 'bg-red-50/40');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-primary', 'bg-red-50/40');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-primary', 'bg-red-50/40');
      if (e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    selectedFile = file;
    if (fileNameDisplay) {
      fileNameDisplay.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    }
    if (fileInfo) {
      fileInfo.classList.remove('hidden');
    }
    if (dropZone) {
      dropZone.classList.add('hidden');
    }
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedFile = null;
      if (fileInput) fileInput.value = '';
      if (fileInfo) fileInfo.classList.add('hidden');
      if (dropZone) dropZone.classList.remove('hidden');
    });
  }

  if (sendPrescriptionBtn) {
    sendPrescriptionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('presc-name')?.value.trim() || 'Cliente';
      const patientPhone = document.getElementById('presc-phone')?.value.trim() || '';
      const patientNotes = document.getElementById('presc-notes')?.value.trim() || '';

      const fileAttached = selectedFile ? `[Foto/Arquivo da Receita: ${selectedFile.name}]` : '[Vou anexar a foto da receita a seguir]';

      const message = `Olá, equipe da *Ótica Limeira*!\n\n` +
        `Meu nome é: *${patientName}*\n` +
        `WhatsApp: *${patientPhone}*\n` +
        `Observações: *${patientNotes || 'Nenhuma'}*\n\n` +
        `Estou enviando minha receita médica para avaliação e orçamento de lentes digitais: ${fileAttached}.\n\n` +
        `Poderiam me apresentar as melhores opções de lentes e armações disponíveis?`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Redirecionando para o WhatsApp da Ótica Limeira com seus dados...');
    });
  }

  /* ==========================================================================
     8. FORMULÁRIO DE CONTATO & AGENDAMENTO
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const unit = document.getElementById('contact-unit')?.value;
      const messageText = document.getElementById('contact-message')?.value.trim();

      const message = `*Nova Mensagem pelo Site - Ótica Limeira*\n\n` +
        `*Nome:* ${name}\n` +
        `*WhatsApp:* ${phone}\n` +
        `*Unidade/Assunto:* ${unit}\n` +
        `*Mensagem:* ${messageText}`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Obrigado pelo contato! Mensagem pronta para envio no WhatsApp.');
      contactForm.reset();
    });
  }

  /* ==========================================================================
     9. MODAL DE ENVIO RÁPIDO DE RECEITA
     ========================================================================== */
  const prescriptionModal = document.getElementById('prescription-modal');
  const openModalBtns = document.querySelectorAll('.btn-open-prescription-modal');
  const closeModalBtns = document.querySelectorAll('.btn-close-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (prescriptionModal) {
        prescriptionModal.classList.remove('hidden');
        prescriptionModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (prescriptionModal) {
        prescriptionModal.classList.add('hidden');
        prescriptionModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // Fechar ao clicar fora do modal
  if (prescriptionModal) {
    prescriptionModal.addEventListener('click', (e) => {
      if (e.target === prescriptionModal) {
        prescriptionModal.classList.add('hidden');
        prescriptionModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  /* ==========================================================================
     10. COMPONENTE TOAST DE FEEDBACK
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('toast-feedback');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-feedback';
      toast.className = 'fixed bottom-24 right-6 z-50 bg-dark text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-red-500/30 transition-all duration-300 transform translate-y-10 opacity-0';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-primary text-xl"></i><span class="text-sm font-medium">${message}</span>`;
    
    // Animação de entrada
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);

    // Animação de saída
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 4500);
  }

  // Máscara simples para telefones brasileiros nos inputs
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 6) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        e.target.value = value;
      }
    });
  });
});
