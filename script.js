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
