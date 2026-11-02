document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const backTop = document.getElementById("backTop");
    const year = document.getElementById("year");

    // Menu navigasi untuk HP
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("show");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu" : "Buka menu"
            );
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                navMenu.classList.remove("show");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Animasi ketika bagian website muncul
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Tahun footer otomatis
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Tombol kembali ke atas
    function updateBackTop() {
        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 400);
        }
    }

    window.addEventListener("scroll", updateBackTop, { passive: true });
    updateBackTop();

    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
/* =========================================
   FISHSTORY — CARTOON OCEAN INTERACTIONS
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  // Hormati pengaturan pengurangan animasi.
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Buat elemen transisi ikan secara otomatis.
  const transition = document.createElement('div');
  transition.className = 'fish-transition';
  transition.setAttribute('aria-hidden', 'true');

  transition.innerHTML = `
    <span class="transition-fish">🐠</span>
    <span class="transition-fish fish-two">🐟</span>
    <span class="transition-bubble b1">🫧</span>
    <span class="transition-bubble b2">🫧</span>
    <div class="transition-message">Swimming to a new world! 🌊</div>
  `;

  document.body.appendChild(transition);

  // Tampilkan transisi hanya untuk navigasi halaman lokal.
  let navigating = false;

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');

    if (!link || reduceMotion || navigating) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const rawHref = link.getAttribute('href');

    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      rawHref.startsWith('javascript:')
    ) return;

    let destination;

    try {
      destination = new URL(rawHref, window.location.href);
    } catch {
      return;
    }

    if (destination.origin !== window.location.origin) return;

    // Jangan animasikan tautan yang hanya mengganti hash.
    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search
    ) return;

    // Biarkan navigasi form dan perilaku browser lain tetap berjalan.
    if (event.defaultPrevented) return;

    event.preventDefault();
    navigating = true;

    transition.querySelector('.transition-fish').style.animation = 'none';
    transition.querySelector('.transition-fish').offsetHeight;
    transition.querySelector('.transition-fish').style.animation = '';

    transition.classList.add('is-active');

    window.setTimeout(function () {
      window.location.href = destination.href;
    }, 850);
  });

  // Gelembung dekoratif yang muncul sesekali.
  if (!reduceMotion) {
    function createBubble() {
      if (document.hidden) return;

      const bubble = document.createElement('span');
      bubble.className = 'ocean-bubble';

      const size = 7 + Math.random() * 18;

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + 'vw';
      bubble.style.setProperty(
        '--bubble-duration',
        (4 + Math.random() * 4) + 's'
      );

      document.body.appendChild(bubble);

      window.setTimeout(function () {
        bubble.remove();
      }, 8500);
    }

    // Jangan membuat terlalu banyak gelembung.
    createBubble();

    window.setInterval(createBubble, 1800);
  }

  // Ambil nama produk dari URL pada halaman kontak.
  const params = new URLSearchParams(window.location.search);
  const productInput = document.getElementById('produk');

  if (productInput && params.has('produk') && !productInput.value) {
    productInput.value = params.get('produk');
  }
});
