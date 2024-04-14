const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const vehicleList = document.getElementById("vehicle-list");
const searchResults = document.getElementById("search-results");

document.addEventListener("DOMContentLoaded", () => {
  getCars();

  function getCars() {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json")
      .then((response) => response.json())
      .then((data) => {
        displayCars(data.Results);
        
      });
  }

  function displayCars(data) {
    let listItems = "";
    data.forEach((car) => {
      listItems += `<li data-vehicle-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
    });
    vehicleList.innerHTML = listItems;

    const vehicleItems = document.querySelectorAll(".vehicle-item");
    vehicleItems.forEach((item) => {
      item.addEventListener("click", () => {
        const vehicleId = item.dataset.vehicleId;
        const vehicleType = item.dataset.vehicleType;
        displayVehicleType(vehicleId, vehicleType);
      });
    });
  }

  function displayVehicleType(makeId, vehicleType) {
    const makeName = document.querySelector(`[data-vehicle-id="${makeId}"]`).textContent.trim();
  
    // Display MakeId and MakeName
    searchResults.innerHTML = `<p>MakeId: ${makeId}</p><p>MakeName: ${makeName}</p><p>VehicleTypeName: ${getVehicleTypeName(vehicleType)}</p>`;
  }
  
  function getVehicleTypeName(vehicleType) {
    switch(vehicleType) {
      case '2':
        return 'Passenger Car';
      case '3':
        return 'Truck';
      case '5':
        return 'Bus';
      case '7':
        return 'Multipurpose Passenger Vehicle (MPV)';
      default:
        return 'Unknown';
    }
  }

  function searchCars(query) {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json")
      .then((response) => response.json())
      .then((data) => {
        const results = data.Results.filter((car) => car.MakeName.toLowerCase().includes(query.toLowerCase()));
        displaySearchResults(results);
      });
  }

  function displaySearchResults(results) {
    let listItems = "";
    results.forEach((car) => {
      listItems += `<li data-vehicle-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
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
