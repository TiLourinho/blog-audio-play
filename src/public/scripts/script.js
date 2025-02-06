const currentYear = document.querySelector("footer span");

currentYear.innerHTML = getCurrentYear();

function getCurrentYear() {
  return new Date().getFullYear();
}
