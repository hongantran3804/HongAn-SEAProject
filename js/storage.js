export function getMyLists() {
  return JSON.parse(localStorage.getItem("myLists")) || {};
}

export function saveMyLists(myLists) {
  localStorage.setItem("myLists", JSON.stringify(myLists));
}

export function getCurFilmData() {
  return JSON.parse(localStorage.getItem("curFilmData")) || [];
}

export function saveCurFilmData(data) {
  localStorage.setItem("curFilmData", JSON.stringify(data));
}
