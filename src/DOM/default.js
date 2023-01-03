import './defaultCSS/default.css';

export function renderDefault() {
  renderLogo();
  renderContentContainer();
  renderCredits();
}

function renderLogo() {
  const body = document.querySelector('body');
  const logo = document.createElement('h1');
  logo.textContent = 'BATTLESHIP';
  logo.classList = 'LOGO';
  body.appendChild(logo);
}

function renderContentContainer() {
  const body = document.querySelector('body');
  const contentContainer = document.createElement('div');
  contentContainer.classList = 'content-container';
  body.appendChild(contentContainer);
}

function renderCredits() {
  const body = document.querySelector('body');
  const creditsContainer = document.createElement('div');
  creditsContainer.classList = 'credits-container';
  const githubLink = document.createElement('a');
  githubLink.textContent = 'GitHub';
  githubLink.href = 'https://github.com/TemaTech';
  githubLink.setAttribute('target', '_blank');
  creditsContainer.appendChild(githubLink);
  const twitterLink = document.createElement('a');
  twitterLink.textContent = 'Twitter';
  twitterLink.href = 'https://twitter.com/cherrartem';
  twitterLink.setAttribute('target', '_blank');
  creditsContainer.appendChild(twitterLink);
  body.appendChild(creditsContainer);
}