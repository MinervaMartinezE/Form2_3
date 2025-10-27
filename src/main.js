import './style.css'

//Recorrer el DOM una vez estén todos los elementos cargados
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.payment-form');
  const cardNumberInput = document.getElementById('card-number');
  const cvvInput = document.getElementById('cvv');
  const accountHolderInput = document.getElementById('account-holder');
  const expMonthInput = document.getElementById('exp-month');
  const expYearInput = document.getElementById('exp-year');

  const submitButton = form.querySelector('button[type="submit"]');

  // Función para validar solo números
function validateNumericInput(input) {
  const value = input.value;
  
  if (/[^0-9]/.test(value)) {
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
  }
}

  // Establecer número de tarjeta con espacios cada 4 caracteres
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar todo lo que no sea número
    value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formatted;
    toggleButton();
  });

  // Validar cada campo
  function isFormValid() {
    const accountHolder = accountHolderInput.value.trim();
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const cvv = cvvInput.value.trim();
    const month = expMonthInput.value.trim();
    const year = expYearInput.value.trim();

    return (
      accountHolder !== '' &&
      /^\d{16}$/.test(cardNumber) &&
      /^\d{3}$/.test(cvv) &&
      /^\d{2}$/.test(month) &&
      /^\d{2}$/.test(year)
    );
  }

  // Habilitar/deshabilitar botón
  function toggleButton() {
    submitButton.disabled = !isFormValid();
  }

  // Activar validación al escribir
  [accountHolderInput, cardNumberInput, cvvInput, expMonthInput, expYearInput].forEach(input => {
    input.addEventListener('input', toggleButton);

  });

  // Validación final en envío del formulario
  form.addEventListener('submit', (e) => {
    const accountHolder = accountHolderInput.value.trim();
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const cvv = cvvInput.value.trim();
    const month = expMonthInput.value.trim();
    const year = expYearInput.value.trim();

    let errors = [];

    if (accountHolder === '') {
      errors.push('Account Holder is required.');
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      errors.push('Card Number must be exactly 16 digits.');
    }

    if (!/^\d{3}$/.test(cvv)) {
      errors.push('CVV must be exactly 3 digits.');
    }

    if (!/^\d{2}$/.test(month) || +month < 1 || +month > 12) {
    errors.push('Expiration month must be between 01 and 12.');
    }
    if (!/^\d{2}$/.test(year)) {
    errors.push('Expiration year must be two digits.');
    }

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join('\n'));
    }
  });

  // Habilitar o deshabilitar el botón al cargar
  toggleButton();
});
