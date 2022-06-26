// API for accessing and setting timetable data from local storage

function getData() {
  return window.localStorage.getItem("persist:timetables");
}

function setData(timetable_data) {
  window.localStorage.setItem("persist:timetables", timetable_data);
  window.location.reload();
}

function resetData() {
  window.localStorage.clear();
  window.location.reload();
}

export { getData, setData, resetData };
