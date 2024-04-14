const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const vehicleList = document.getElementById("vehicle-list");
const searchResults = document.getElementById("search-results");

document.addEventListener("DOMContentLoaded", () => {
  getCars();

  function getCars() {
    function getCars(page = 1, allCars = []) {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          const cars = data.Results;
          allCars.push(...cars); // Append the new cars to the existing list
          if (cars.length === 0) {
            displayCars(allCars);
          } else {
            getCars(page + 1, allCars); // Fetch the next page
          }
        });
    }}

  function displayCars(data) {
    let listItems = "";
    data.forEach((car) => {
      listItems += `<li data-vehicle-id="${car.MakeId}" class="vehicle-item">${car.MakeName}</li>`;
    });
    vehicleList.innerHTML = listItems;

    const vehicleItems = document.querySelectorAll(".vehicle-item");
    vehicleItems.forEach((item) => {
      item.addEventListener("click", () => {
        const vehicleId = item.dataset.vehicleId;
        displayVehicleType(vehicleId);
      });
    });
  }

  function displayVehicleType(vehicleId) {
    const selectedVehicle = document.querySelector(`[data-vehicle-id="${vehicleId}"]`);
    const makeId = selectedVehicle.dataset.vehicleId;
    const makeName = selectedVehicle.textContent.trim();
  
    // Display MakeId and MakeName
    searchResults.innerHTML = `<p>MakeId: ${makeId}</p><p>MakeName: ${makeName}</p>`;
  }
  

  function searchCars(query) {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json")
      .then((response) => response.json())
      .then((data) => {
        const results = data.Results.filter((car) => car.MakeName.toLowerCase().includes(query.toLowerCase()));
        displaySearchResults(results);
      });
  }

  function displaySearchResults(results) {
    let listItems = "";
    results.forEach((car) => {
      listItems += `<li>${car.MakeName}</li>`;
    });
    searchResults.innerHTML = `<h2>Search Results</h2><ul>${listItems}</ul>`;
  }

  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const query = searchBar.value;
    if (query.length < 3) return;
    searchCars(query);
  });
});
