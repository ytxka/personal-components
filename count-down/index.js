let btn = document.getElementById('btn');
const TEXT = btn.innerHTML;

btn.addEventListener('click', () => countDown(btn, 5, TEXT));