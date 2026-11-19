document.addEventListener('DOMContentLoaded', () => {
  const fields = {
    nombre: document.getElementById('nombre'),
    paterno: document.getElementById('paterno'),
    materno: document.getElementById('materno'),
    edad: document.getElementById('edad'),
    telefono: document.getElementById('telefono'),
    email: document.getElementById('email')
  };

  const btnValidar = document.getElementById('btnValidar');
  const modalSuccess = document.getElementById('modalSuccess');
  const btnCerrarModal = document.getElementById('btnCerrarModal');

  // Expresiones Regulares
  const regexTexto = /^[A-ZÁÉÍÓÚÑ\s]+$/;
  const regexNumero = /^\d+$/;

  // Función para mostrar error
  function showError(fieldId, message) {
    const input = fields[fieldId];
    const errDiv = document.getElementById(`err-${fieldId}`);
    input.classList.add('invalid');
    errDiv.textContent = message;
    errDiv.classList.add('visible');
  }

  // Función para limpiar error
  function clearError(fieldId) {
    const input = fields[fieldId];
    const errDiv = document.getElementById(`err-${fieldId}`);
    input.classList.remove('invalid');
    errDiv.textContent = '';
    errDiv.classList.remove('visible');
  }

  // Validaciones individuales
  function validateNombre(val) {
    if (!val) return "Tu nombre es obligatorio.";
    if (!regexTexto.test(val)) return "Solo se aceptan letras en mayúsculas.";
    return null;
  }

  function validateEdad(val) {
    if (!val) return "Tu edad es obligatoria.";
    if (/\s/.test(val)) return "No se aceptan espacios en blanco.";
    if (!regexNumero.test(val)) return "Solamente se aceptan números.";
    if (val.length > 3) return "Máximo 3 dígitos permitidos.";
    return null;
  }

  function validateTelefono(val) {
    if (!val) return "Tu teléfono es obligatorio.";
    if (/\s/.test(val)) return "No se aceptan espacios en blanco.";
    if (!regexNumero.test(val)) return "Solamente se aceptan números.";
    if (val.length > 10) return "El teléfono no debe superar los 10 dígitos.";
    return null;
  }

  function validateEmail(val) {
    if (!val) return "Tu Email es obligatorio.";
    if (/\s/.test(val)) return "El correo no debe contener espacios.";
    if (!val.includes('@') || !val.endsWith('.com')) {
      return "El correo debe incluir '@' y finalizar en '.com'.";
    }
    return null;
  }

  function getError(key, val) {
    if (['nombre', 'paterno', 'materno'].includes(key)) {
      return validateNombre(val);
    } else if (key === 'edad') {
      return validateEdad(val);
    } else if (key === 'telefono') {
      return validateTelefono(val);
    } else if (key === 'email') {
      return validateEmail(val);
    }
    return null;
  }

  // Escuchar eventos en tiempo real (input)
  Object.keys(fields).forEach(key => {
    fields[key].addEventListener('input', () => {

      // BLOQUEO TOTAL: que ni siquiera se escriba lo que no debe

      // 1. Nombre y apellidos: solo letras en MAYÚSCULAS, sin números
      // Si presionas 1, 2, 3, etc. no se pone nada
      if (['nombre', 'paterno', 'materno'].includes(key)) {
        const pos = fields[key].selectionStart;
        fields[key].value = fields[key].value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ\s]/g, '');
        fields[key].setSelectionRange(pos, pos);
      }

      // 2. Edad y teléfono: solo números, sin letras
      // Si presionas una letra, no se pone nada
      if (['edad', 'telefono'].includes(key)) {
        const pos = fields[key].selectionStart;
        fields[key].value = fields[key].value.replace(/[^0-9]/g, '');
        fields[key].setSelectionRange(pos, pos);
      }

      const val = fields[key].value;
      const err = getError(key, val);

      if (err) {
        showError(key, err);
      } else {
        clearError(key);
      }
    });
  });

  // Evento al presionar el botón "Valida"
  btnValidar.addEventListener('click', () => {
    let isValid = true;

    Object.keys(fields).forEach(key => {
      const val = fields[key].value;
      const err = getError(key, val);

      if (err) {
        showError(key, err);
        isValid = false;
      } else {
        clearError(key);
      }
    });

    if (isValid) {
      modalSuccess.classList.add('active');
    }
  });

  // Cerrar modal
  btnCerrarModal.addEventListener('click', () => {
    modalSuccess.classList.remove('active');
  });
});