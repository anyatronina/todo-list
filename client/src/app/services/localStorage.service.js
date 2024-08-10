export function setFavorites(id) {
  let favoritesArr = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favoritesArr?.includes(id)) {
    favoritesArr = favoritesArr.filter((taskId) => taskId !== id);
  } else {
    favoritesArr.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favoritesArr));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites"));
}

const localStorageService = {
  setFavorites,
  getFavorites,
};

export default localStorageService;
