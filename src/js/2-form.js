const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);

populateForm();

// ==============обробили сабміт=====

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  form.reset();
  formData.email = '';
  formData.message = '';
}

// =========обробили інпут==========

function handleFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// ===============

function populateForm() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText) {
    try {
      const parsedData = JSON.parse(savedText);
      if (parsedData.email) {
        form.elements.email.value = parsedData.email;
        formData.email = parsedData.email;
      }
      if (parsedData.message) {
        form.elements.message.value = parsedData.message;
        formData.message = parsedData.message;
      }
    } catch (error) {
      alert('Error...');
    }
  }
}
