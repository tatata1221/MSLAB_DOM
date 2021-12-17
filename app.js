const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const nameUser = document.getElementById('name');
const age = document.getElementById('age');
const address = document.getElementById('address');
const submitButton = document.getElementById('submit');
const input = document.querySelector('input');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = '';
}

//check username
function checkUsername(input) {
  let isUsernameValid = true;
  const reg = /^[a-z0-9_\.]+$/;
  if (reg.test(input.value.trim()) == true) {
    showSuccess(input);
  } else {
    showError(input, 'Username is not valid');
    isUsernameValid = false;
  }
  return isUsernameValid;
}

//check email is valid
function checkEmail(input) {
  let isEmailValid = true;
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim()) == true) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
    isEmailValid = false;
  }
  return isEmailValid;
}

//check password is valid
function checkPassword(input) {
  let isPasswordValid = true;
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/;
  if (reg.test(input.value.trim()) == true) {
    showSuccess(input);
  } else {
    showError(input, 'Password must contain at least 1 number, A, a');
    isPasswordValid = false;
  }
  return isPasswordValid;
}

//get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check require fields
function checkRequired(inputArr) {
  let isRequired = true;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = false;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
  //console.log(isRequired);
}

//check input length
function checkLength(input, min, max) {
  let isLengthValid = false;
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
    isLengthValid = true;
  }
  return isLengthValid;
}

//check password match
function checkPasswordsMatch(input1, input2) {
  let isPwMatch = true;
  if (input1.value !== input2.value) {
    // console.log(input1.value);
    showError(input2, 'Passwords do not match');
    isPwMatch = false;
  }
  return isPwMatch;
}

//check age 16-120
function checkAge(input) {
  let isAgeValid = true;
  if (input.value >= 16 && input.value <= 120) {
    showSuccess(input);
  } else {
    showError(input, 'Age is ranged about 16-120');
    isAgeValid = false;
  }
  return isAgeValid;
}

//add event listeners
a = username.addEventListener('blur', function (e) {
  e.preventDefault();
  if (checkRequired([username]) == true) {
    checkUsername(username);
    if (checkUsername(username) == true) {
      checkLength(username, 6, 15);
    }
  }
});

b = email.addEventListener('blur', function (e) {
  e.preventDefault();
  if (checkRequired([email]) == true) {
    checkEmail(email);
  }
});

password.addEventListener('blur', function (e) {
  e.preventDefault();
  if (checkRequired([password]) == true) {
    checkPassword(password);
    if (checkPassword(password) == true) {
      checkLength(password, 8, 15);
    }
  }
});

password2.addEventListener('blur', function (e) {
  e.preventDefault();
  if (checkRequired([password2]) == true) {
    checkPasswordsMatch(password, password2);
  }
});

nameUser.addEventListener('blur', function (e) {
  e.preventDefault();
  checkRequired([nameUser]);
});

age.addEventListener('blur', function (e) {
  e.preventDefault();
  if (checkRequired([age]) == true) {
    checkAge(age);
  }
});

address.addEventListener('blur', function (e) {
  e.preventDefault();
  checkRequired([address]);
});

//xu ly submit button
form.addEventListener('change', function (e) {
  e.preventDefault();
  if (
    checkEmail(email) == false ||
    checkUsername(username) == false ||
    checkLength(username, 6, 15) == false ||
    checkLength(password, 8, 15) == false ||
    checkPasswordsMatch(password, password2) == false ||
    checkRequired([username, email, password, password2, nameUser, age, address]) == false ||
    checkAge(age) == false ||
    checkPassword(password) == false
  ) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false; //false = enable
  }
});
