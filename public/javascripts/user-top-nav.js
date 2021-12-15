document.addEventListener("DOMContentLoaded", (e) => {
  const searchCon = document.querySelector(".search-container");
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-bar");
  searchCon.addEventListener("click", (e) => {
    searchIcon.style.color = "black";
  });
  document.addEventListener("click", (e) => {
    if (
      e.target === searchCon ||
      e.target === searchInput ||
      e.target === searchIcon
    ) {
      searchIcon.style.color = "rgba(135, 135, 135, 0.7)";
    } else {
      searchIcon.style.color = "rgba(255, 255, 255, 0.7)";
    }
  });
});
