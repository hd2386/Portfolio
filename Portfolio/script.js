function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function goToWeatherApiPage() {
  window.location.href = "WeatherApiSorter.html";
}
function goToMoviewPage() {
  window.location.href = "MovieApp/moview.html";
}
