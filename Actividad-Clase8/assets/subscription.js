const form = document.getElementById("formulario-suscripcion");
const tituloSaludo = document.getElementById("titulo-saludo");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repetirPassword = document.getElementById("repetirPassword");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const ciudad = document.getElementById("ciudad");
const codigoPostal = document.getElementById("codigoPostal");
const dni = document.getElementById("dni");

const campos = [
  nombre,
  email,
  password,
  repetirPassword,
  edad,
  telefono,
  direccion,
  ciudad,
  codigoPostal,
  dni
];

function mostrarError(campo, mensaje) {
  const error = document.getElementById("error-" + campo.id);
  error.textContent = mensaje;
  campo.classList.add("con-error");
}

function ocultarError(campo) {
  const error = document.getElementById("error-" + campo.id);
  error.textContent = "";
  campo.classList.remove("con-error");
}

function tieneLetra(texto) {
  const letras = "abcdefghijklmnñopqrstuvwxyz";
  const textoMinuscula = texto.toLowerCase();

  for (let i = 0; i < textoMinuscula.length; i++) {
    if (letras.includes(textoMinuscula[i])) {
      return true;
    }
  }

  return false;
}

function tieneNumero(texto) {
  const numeros = "0123456789";

  for (let i = 0; i < texto.length; i++) {
    if (numeros.includes(texto[i])) {
      return true;
    }
  }

  return false;
}

function validarNombre() {
  const valor = nombre.value.trim();
  const sinEspacios = valor.replaceAll(" ", "");

  if (sinEspacios.length <= 6 || !valor.includes(" ")) {
    return "El nombre completo debe tener más de 6 letras y al menos un espacio entre medio.";
  }

  return "";
}

function validarEmail() {
  const valor = email.value.trim();

  if (!valor.includes("@") || !valor.includes(".")) {
    return "El email debe tener un formato válido.";
  }

  return "";
}

function validarPassword() {
  const valor = password.value;

  if (valor.length < 8 || !tieneLetra(valor) || !tieneNumero(valor)) {
    return "La contraseña debe tener al menos 8 caracteres y combinar letras y números.";
  }

  return "";
}

function validarRepetirPassword() {
  if (repetirPassword.value === "") {
    return "Debe repetir la contraseña.";
  }

  if (repetirPassword.value !== password.value) {
    return "Las contraseñas deben coincidir.";
  }

  return "";
}

function validarEdad() {
  const valor = edad.value.trim();
  const numeroEdad = Number(valor);

  if (valor === "" || !Number.isInteger(numeroEdad) || numeroEdad < 18) {
    return "La edad debe ser un número entero mayor o igual a 18.";
  }

  return "";
}

function validarTelefono() {
  const valor = telefono.value.trim();

  if (valor.length < 7 || isNaN(valor) || valor.includes(" ")) {
    return "El teléfono debe tener al menos 7 dígitos, sin espacios, guiones ni paréntesis.";
  }

  return "";
}

function validarDireccion() {
  const valor = direccion.value.trim();

  if (valor.length < 5 || !tieneLetra(valor) || !tieneNumero(valor) || !valor.includes(" ")) {
    return "La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.";
  }

  return "";
}

function validarCiudad() {
  if (ciudad.value.trim().length < 3) {
    return "La ciudad debe tener al menos 3 caracteres.";
  }

  return "";
}

function validarCodigoPostal() {
  if (codigoPostal.value.trim().length < 3) {
    return "El código postal debe tener al menos 3 caracteres.";
  }

  return "";
}

function validarDni() {
  const valor = dni.value.trim();

  if ((valor.length !== 7 && valor.length !== 8) || isNaN(valor) || valor.includes(" ")) {
    return "El DNI debe ser un número de 7 u 8 dígitos.";
  }

  return "";
}

function validarCampo(campo) {
  let mensaje = "";

  if (campo === nombre) {
    mensaje = validarNombre();
  } else if (campo === email) {
    mensaje = validarEmail();
  } else if (campo === password) {
    mensaje = validarPassword();
  } else if (campo === repetirPassword) {
    mensaje = validarRepetirPassword();
  } else if (campo === edad) {
    mensaje = validarEdad();
  } else if (campo === telefono) {
    mensaje = validarTelefono();
  } else if (campo === direccion) {
    mensaje = validarDireccion();
  } else if (campo === ciudad) {
    mensaje = validarCiudad();
  } else if (campo === codigoPostal) {
    mensaje = validarCodigoPostal();
  } else if (campo === dni) {
    mensaje = validarDni();
  }

  if (mensaje !== "") {
    mostrarError(campo, mensaje);
    return false;
  }

  ocultarError(campo);
  return true;
}

function validarFormulario() {
  const errores = [];

  for (let i = 0; i < campos.length; i++) {
    const campo = campos[i];
    const esValido = validarCampo(campo);

    if (!esValido) {
      const error = document.getElementById("error-" + campo.id);
      errores.push(error.textContent);
    }
  }

  return errores;
}

function actualizarTitulo() {
  const valorNombre = nombre.value.trim().toUpperCase();

  if (valorNombre === "") {
    tituloSaludo.textContent = "HOLA";
  } else {
    tituloSaludo.textContent = "HOLA " + valorNombre;
  }
}

function armarMensajeDatos() {
  return "Datos cargados:\n" +
    "Nombre completo: " + nombre.value.trim() + "\n" +
    "Email: " + email.value.trim() + "\n" +
    "Contraseña: " + password.value + "\n" +
    "Repetir contraseña: " + repetirPassword.value + "\n" +
    "Edad: " + edad.value.trim() + "\n" +
    "Teléfono: " + telefono.value.trim() + "\n" +
    "Dirección: " + direccion.value.trim() + "\n" +
    "Ciudad: " + ciudad.value.trim() + "\n" +
    "Código postal: " + codigoPostal.value.trim() + "\n" +
    "DNI: " + dni.value.trim();
}

for (let i = 0; i < campos.length; i++) {
  campos[i].addEventListener("blur", function () {
    validarCampo(campos[i]);
  });

  campos[i].addEventListener("focus", function () {
    ocultarError(campos[i]);
  });
}

nombre.addEventListener("keydown", function () {
  setTimeout(actualizarTitulo, 0);
});

nombre.addEventListener("focus", actualizarTitulo);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const errores = validarFormulario();

  if (errores.length > 0) {
    alert("Errores encontrados:\n- " + errores.join("\n- "));
  } else {
    alert(armarMensajeDatos());
  }
});
