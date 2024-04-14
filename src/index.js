const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const vehicleList = document.getElementById("vehicle-list");
const searchResults = document.getElementById("search-results");

function getCars() {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      displayCars(data.Vehicles);
    });
}

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
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      const vehicle = data.Vehicles.find((v) => v.MakeId === parseInt(vehicleId));
      if (vehicle) {
        searchResults.innerHTML = `<p>Vehicle Type: ${vehicle.VehicleTypeName}</p>`;
      } else {
        searchResults.innerHTML = "<p>Vehicle not found</p>";
      }
    });
}

function searchCars(query) {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      const results = data.Vehicles.filter((car) => car.MakeName.toLowerCase().includes(query.toLowerCase()));
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

searchButton.addEventListener("click", () => {
  const query = searchBar.value;
  if (query.length < 3) return;
  searchCars(query);
});

getCars();