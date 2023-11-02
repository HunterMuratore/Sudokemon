import './styles/style.css';

import { render } from './lib/actions';

import landingContent from './views/landing.hbs';

render(landingContent);

async function showGame() {
    const gameViewBtn = document.querySelector('#shop-view-btn');

    gameViewBtn.addEventListener('click', () => render(gameView));
}

showGame();