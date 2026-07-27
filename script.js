const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('burger-icon');
const body = document.body;
btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  if (menu.classList.contains('hidden')) {
    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    body.classList.remove('overflow-hidden');
    menu.classList.remove('fixed');
    menu.classList.add('absolute');
  } else {
    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    body.classList.add('overflow-hidden');
    menu.classList.remove('absolute');
    menu.classList.add('fixed');
  }
});
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
    body.classList.remove('overflow-hidden');
    menu.classList.remove('fixed');
    menu.classList.add('absolute');
    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  });
});
// Animation hero texte
const words = ["Bâtissez votre avenir à l'ESEG"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
function type() {
  currentWord = words[i];
  let typeSpeed = 100;
  let textSegment = isDeleting
    ? currentWord.substring(0, j - 1)
    : currentWord.substring(0, j + 1);
  if (isDeleting) {
    typeSpeed = 20;
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  } else {
    j++;
    if (j === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1000;
    }
  }
  // LOGIQUE DE COULEUR : Séparation dynamique du texte
  const target = "l'ESEG";
  const index = textSegment.indexOf(target);
  if (index !== -1) {
    const part1 = textSegment.substring(0, index);
    const part2 = textSegment.substring(index, index + target.length);
    const part3 = textSegment.substring(index + target.length);

    document.getElementById("typewriter").innerHTML = `
      <span class="text-white">${part1}</span><span class="text-esegBleuClair">${part2}</span><span class="text-white">${part3}</span>
    `;
  } else {
    document.getElementById("typewriter").innerHTML = `<span class="text-white">${textSegment}</span>`;
  }

  setTimeout(type, typeSpeed);
}

// caroussel section hero

(function () {
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;
  const intervalTime = 5000; // temps d'affichage par image (5s)

  if (slides.length > 1) {
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, intervalTime);
  }
})();

// animation scroll section
document.addEventListener("DOMContentLoaded", type);
document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };
  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  document.querySelectorAll('.reveal').forEach(function (section) {
    observer.observe(section);
  });
});


// Section communauté caroussel
(function () {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const dotsContainer = document.getElementById('carousel-dots');
        const cards = track.querySelectorAll('.carousel-card');

        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            });
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function scrollByCard(direction) {
            const card = track.querySelector('.carousel-card');
            const gap = parseFloat(getComputedStyle(track).gap) || 24;
            const scrollAmount = card.offsetWidth + gap;
            track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }

        prevBtn.addEventListener('click', () => scrollByCard(-1));
        nextBtn.addEventListener('click', () => scrollByCard(1));

        function updateUI() {
            const scrollLeft = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;

            prevBtn.disabled = scrollLeft <= 4;
            nextBtn.disabled = scrollLeft >= maxScroll - 4;

            let closestIndex = 0;
            let closestDistance = Infinity;
            cards.forEach((card, i) => {
                const distance = Math.abs(card.offsetLeft - track.scrollLeft);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            });
            dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
        }

        track.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateUI);
        });

        window.addEventListener('resize', updateUI);
        updateUI();
    })();