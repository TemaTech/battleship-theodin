import './startCSS/start.css';
import { data } from '..';
import { renderPlacing } from './placing';
import { renderDefault } from './default';

export function renderStart() {
  const content = document.querySelector('.content-container');
  content.innerHTML = '';
  const container = document.createElement('div');
  container.classList = 'start-container';
  const greeting = document.createElement('h3');
  greeting.textContent = 'Welcome back, general.';
  container.appendChild(greeting);
  const inputField = document.createElement('div');
  inputField.classList = 'input-field';
  const label = document.createElement('p');
  label.textContent = 'Enter your nickname:';
  inputField.appendChild(label);
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'Your nickname...');
  inputField.appendChild(input);
  container.appendChild(inputField);
  const continueButton = document.createElement('button');
  continueButton.addEventListener('click', () => {
    if (input.value !== 'Computer') {
      input.value === '' ? data.nickname = 'Player' : data.nickname = input.value;
      content.style.animation = 'fadeOutOpacity 500ms';
      setTimeout(() => {
        renderPlacing();
      }, 450);
    }
  });
  continueButton.textContent = 'Continue';
  container.appendChild(continueButton);
  content.appendChild(container);
  input.addEventListener('input', () => {
    if (input.value === 'Computer') {
      continueButton.classList.add('blocked-btn');
    } else {
      continueButton.classList.remove('blocked-btn');
    }
  });
}