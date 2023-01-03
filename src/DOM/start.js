import './startCSS/start.css';
import { data } from '..';

export function renderStart() {
  const content = document.querySelector('.content-container');
  const container = document.createElement('div');
  container.classList = 'start-container';
  const greeting = document.createElement('h3');
  greeting.textContent = 'Welcome back, general.';
  container.appendChild(greeting);
  const inputField = document.createElement('div');
  const label = document.createElement('p');
  label.textContent = 'Enter your nickname:';
  inputField.appendChild(label);
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'Your nickname...');
  inputField.appendChild(input);
  container.appendChild(inputField);
  const continueButton = document.createElement('button');
  continueButton.addEventListener('click', () => {
    input.value === '' ? data.nickname = 'Player' : data.nickname = input.value;
    // Next render...
  });
  continueButton.textContent = 'Continue';
  container.appendChild(continueButton);
  content.appendChild(container);
}