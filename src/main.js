import './style.css'

//Recorrer el DOM una vez estén todos los elementos cargados
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.payment-form');
  const cardNumberInput = document.getElementById('card-number');
  const cvvInput = document.getElementById('cvv');
  const accountHolderInput = document.getElementById('account-holder');
  const expiryInput = document.getElementById('expiry');
  const submitButton = form.querySelector('button[type="submit"]');

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
    const expiry = expiryInput.value;

    return (
      accountHolder !== '' &&
      /^\d{16}$/.test(cardNumber) &&
      /^\d{3}$/.test(cvv) &&
      expiry !== ''
    );
  }

  // Habilitar/deshabilitar botón
  function toggleButton() {
    submitButton.disabled = !isFormValid();
  }

  // Activar validación al escribir
  [accountHolderInput, cardNumberInput, cvvInput, expiryInput].forEach(input => {
    input.addEventListener('input', toggleButton);
  });

  // Validación final en envío del formulario
  form.addEventListener('submit', (e) => {
    const accountHolder = accountHolderInput.value.trim();
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const cvv = cvvInput.value.trim();
    const expiry = expiryInput.value;

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

    if (!expiry) {
      errors.push('Expiration Date is required.');
    }

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join('\n'));
    }
  });

  // Habilitar o deshabilitar el botón al cargar
  toggleButton();
});
