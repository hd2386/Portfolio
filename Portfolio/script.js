function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function goToWeatherApiPage() {
  window.open("WeatherApp/WeatherAPISorter.html", "_blank");
}
function goToMoviewPage() {
  window.open("MovieApp/moview.html", "_blank");
}
