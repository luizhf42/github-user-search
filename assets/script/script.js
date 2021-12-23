const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".user-search");
const userInfoSection = document.querySelector(".user-info");
const beforeSearchText = document.querySelector(".before-search-text");

const validateUsername = (searchedUser) => {
  return githubUsernameRegex.test(searchedUser);
};

const makeRequest = (searchedUser) => {
  axios
    .get(`https://api.github.com/users/${searchedUser}`)
    .then((response) => {
      const {
        login,
        name,
        avatar_url,
        html_url,
        followers,
        following,
        company,
        blog,
        twitter_username,
        location,
        bio,
      } = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const searchedUser = searchInput.value;

  const usernameIsValid = validateUsername(searchedUser);

  if (usernameIsValid) {
    searchInput.classList.remove("error");
    makeRequest(searchedUser);
    // show the info
  } else {
    userInfoSection.style.visibility = "hidden";
    beforeSearchText.textContent = "Invalid username!";
    searchInput.classList.add("error");
    searchInput.focus();
  }
});
