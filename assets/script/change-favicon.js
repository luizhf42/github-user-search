// changes favicon according to the browser theme
const faviconLink = document.querySelector(
    "[href='assets/images/white-favicon.ico']"
  );
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    faviconLink.href = "assets/images/black-favicon.ico";
  }