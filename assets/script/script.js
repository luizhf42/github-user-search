const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  searchBtn = document.querySelector(".search-btn"),
  searchInput = document.querySelector(".user-search"),
  userInfoSection = document.querySelector(".user-info"),
  beforeSearchText = document.querySelector(".before-search-text"),
  avatarElement = document.querySelector(".user-pic"),
  nameElement = document.querySelector(".name-a"),
  usernameElement = document.querySelector(".username"),
  bioElement = document.querySelector(".text-bio"),
  reposElement = document.querySelector(".repos-info"),
  hireableElement = document.querySelector(".hireable-info"),
  followersElement = document.querySelector(".followers-info"),
  followingElement = document.querySelector(".following-info"),
  companyElement = document.querySelector(".company"),
  locationElement = document.querySelector(".location"),
  websiteElement = document.querySelector(".website"),
  twitterUsernameElement = document.querySelector(".twitter");

const validateUsername = (searchedUser) => {
  return githubUsernameRegex.test(searchedUser);
};

const makeRequest = (searchedUser) => {
  axios
    .get(`https://api.github.com/users/${searchedUser}`)
    .then((response) => {
      const userData = getData(response);
      showData(userData);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getData = (response) => {
  const {
    avatar_url,
    html_url,
    name,
    login,
    bio,
    public_repos,
    hireable,
    followers,
    following,
    company,
    location,
    twitter_username,
    blog,
  } = response.data;

  const userData = {
    avatar_url,
    html_url,
    name,
    login,
    bio,
    public_repos,
    hireable,
    followers,
    following,
    company,
    location,
    twitter_username,
    blog,
  };

  return userData;
};

const showData = (userData) => {
  let {
    avatar_url,
    html_url,
    name,
    login,
    bio,
    public_repos,
    hireable,
    followers,
    following,
    company,
    location,
    twitter_username,
    blog,
  } = userData;

  const elements = [
    avatarElement,
    nameElement,
    usernameElement,
    bioElement,
    reposElement,
    hireableElement,
    followersElement,
    followingElement,
    companyElement,
    locationElement,
    websiteElement,
    twitterUsernameElement,
  ];

  const formatter = new Intl.NumberFormat();
  
  avatarElement.src = avatar_url;

  nameElement.textContent = name;
  nameElement.href = html_url;

  usernameElement.textContent = login;

  bioElement.textContent = bio;

  reposElement.textContent = public_repos;

  if (hireable === true) {
    hireableElement.textContent = "Yes";
  } else {
    hireableElement.textContent = "No";
  }

  followersElement.textContent = formatter.format(followers);

  followingElement.textContent = formatter.format(following);

  companyElement.textContent = company;

  locationElement.textContent = location;

  twitterUsernameElement.textContent = twitter_username;

  websiteElement.textContent = blog;

  elements.forEach((element) => {
    if (element.textContent === "" || element.textContent === null) {
      element.textContent = "No info";
      element.classList.add("no-info");
    } else {
      element.classList.remove("no-info");
    }
  });
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const searchedUser = searchInput.value;

  const usernameIsValid = validateUsername(searchedUser);

  if (usernameIsValid) {
    searchInput.classList.remove("error");
    beforeSearchText.style.display = "none";
    makeRequest(searchedUser);
    userInfoSection.style.visibility = "visible";
  } else {
    userInfoSection.style.visibility = "hidden";
    beforeSearchText.textContent = "Invalid username!";
    searchInput.classList.add("error");
    searchInput.focus();
  }
});
