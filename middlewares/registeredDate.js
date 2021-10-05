function getDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const registered = `${day}/${month}/${year}`;

  return registered;
}

module.exports = getDate;