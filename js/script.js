import { filmsData } from "../data/films.js";
import {
  popupBtns,
  filterGenreBtn,
  sortRatingBtn,
  prevBtn,
  nextBtn,
  searchIcon,
  searchInput,
  myListsBtn,
  filmsBtn,
  popup,
} from "./domElements.js";
import { showData } from "./ui.js";
import {
  search,
  goPrevPage,
  goNextPage,
  filterByGenre,
  sortByRating,
  showMyLists
} from "./utils.js";

myListsBtn.addEventListener("click", showMyLists);

filmsBtn.addEventListener("click", () => showData(filmsData));
searchIcon.addEventListener("click", search);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search();
  }
  return;
});
popupBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  return;
});

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
filterGenreBtn.addEventListener("change", filterByGenre);
sortRatingBtn.addEventListener("change", sortByRating);

document.addEventListener("DOMContentLoaded", () => {
  showData(filmsData);
});
