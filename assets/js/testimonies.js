document.addEventListener("DOMContentLoaded", () => {

  const sourceCards = Array.from(document.querySelectorAll('#testimonialSource .testimonial-card'));
  const stackEl = document.getElementById('testimonialStack');
  const incomingEl = document.getElementById('incomingCard');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  let currentIndex = 0;
  let stack = [];
  const STACK_SIZE = 5;

  function cloneCard(card) {
    const div = document.createElement('div');
    div.className = 'stack-card';
    div.innerHTML = card.innerHTML;
    return div;
  }

  function renderStack() {
    stack.forEach((card, i) => {
      card.style.transform = `translate(${i * 8}px, ${i * 8}px) scale(${1 - i * 0.04})`;
      card.style.opacity = i === 0 ? 1 : 0.85;
      card.style.zIndex = 10 - i;
    });
  }

  function initStack() {
    for (let i = 0; i < STACK_SIZE; i++) {
      const card = cloneCard(sourceCards[(currentIndex + i) % sourceCards.length]);
      stack.push(card);
      stackEl.appendChild(card);
    }
    renderStack();
    currentIndex = STACK_SIZE % sourceCards.length;
  }

  function showNext() {
    const cardData = sourceCards[currentIndex];
    const incoming = cloneCard(cardData);

    incomingEl.innerHTML = '';
    incomingEl.appendChild(incoming);

    incomingEl.classList.remove('enter', 'to-stack');
    void incomingEl.offsetWidth; // force reflow

    incomingEl.classList.add('enter'); // slide to center

    setTimeout(() => {
        incomingEl.classList.remove('enter');
        incomingEl.classList.add('to-stack'); // slide into stack

        setTimeout(() => {
            incomingEl.classList.remove('to-stack');

            stack.unshift(incoming);
            stackEl.appendChild(incoming);

            if (stack.length > STACK_SIZE) {
                const last = stack.pop();
                last.remove();
            }

            renderStack();
        }, 800);

    }, 8000); // pause at center

    currentIndex = (currentIndex + 1) % sourceCards.length;
    }


  function showPrev() {
  currentIndex = (currentIndex - 1 + sourceCards.length) % sourceCards.length;
  const cardData = sourceCards[currentIndex];
  const incoming = cloneCard(cardData);

  incomingEl.innerHTML = '';
  incomingEl.appendChild(incoming);

  incomingEl.classList.remove('enter', 'to-stack');
  void incomingEl.offsetWidth;

  incomingEl.classList.add('enter');

  setTimeout(() => {
    incomingEl.classList.remove('enter');
    incomingEl.classList.add('to-stack');

    setTimeout(() => {
      incomingEl.classList.remove('to-stack');

      stack.unshift(incoming);
      stackEl.appendChild(incoming);

      if (stack.length > STACK_SIZE) {
        const last = stack.pop();
        last.remove();
      }

      renderStack();
    }, 800);

  }, 1200);
}


  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  setInterval(showNext, 6000);

  initStack();
});
