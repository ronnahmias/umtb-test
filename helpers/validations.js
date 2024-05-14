function emailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function phoneValid(phone) {
  const regex = /^[\d()-]+$/;
  return regex.test(phone);
}

module.exports = { emailValid, phoneValid };
