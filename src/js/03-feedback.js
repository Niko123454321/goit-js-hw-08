console.log('faina_super_dog');

import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  message: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
onPageLoad();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.email.value === '' || refs.message.value === '') {
    return alert('Заповніть всі поля форми!');
  }
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log('відправка форми:');
  console.log(`E-mail: ${formData.email}, Message: ${formData.message}`);
  formData.email = '';
  formData.message = '';
}

function onTextareaInput() {
  formData.email = refs.email.value;
  formData.message = refs.message.value;
  // console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onPageLoad() {
  const savedMessege = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessege) {
    console.log(savedMessege);
    refs.email.value = savedMessege.email;
    refs.message.value = savedMessege.message;
  }
}
