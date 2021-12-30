const changeThemeBtn = document.querySelector(".change-theme-btn");
const cssThemeLink = document.querySelector(
  "[href='assets/style/themes/dark-theme.css']"
);

changeThemeBtn.addEventListener("click", () => {
  if (cssThemeLink.href.match("assets/style/themes/dark-theme.css")) {
    cssThemeLink.href = "assets/style/themes/light-theme.css";
    localStorage.setItem("theme", "light");
  } else {
    cssThemeLink.href = "assets/style/themes/dark-theme.css";
    localStorage.setItem("theme", "dark");
  }
});

window.addEventListener("load", () => {
  let lastTheme = localStorage.getItem("theme");

  if (lastTheme == "dark") {
    cssThemeLink.href = "assets/style/themes/dark-theme.css";
  } else {
    cssThemeLink.href = "assets/style/themes/light-theme.css";
  }
});
