import './style.css';

const main = document.querySelector('main');
if (main) main.focus();

if ('serviceWorker' in navigator) void navigator.serviceWorker.register('/sw.js');
