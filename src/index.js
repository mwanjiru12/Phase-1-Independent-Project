// Get a reference to the HTML elements
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const vehicleList = document.getElementById("vehicle-list");
const searchResults = document.getElementById("search-results");

// Add a DOMContentLoaded event listener to the document
document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the API and display the cars
  getCars();

  // Define the getCars function
  function getCars() {
    // Fetch data from the API
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json")
      .then((response) => response.json())
      .then((data) => {
        // Display the cars
        displayCars(data.Results);
      });
  }

  // Define the displayCars function
  function displayCars(data) {
    // Create a list of cars
    let listItems = "";
    data.forEach((car) => {
      listItems += `<li data-vehicle-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
    });
    // Display the list of cars
    vehicleList.innerHTML = listItems;

    // Add a click event listener to each car
    const vehicleItems = document.querySelectorAll(".vehicle-item");
    vehicleItems.forEach((item) => {
      item.addEventListener("click", () => {
        const vehicleId = item.dataset.vehicleId;
        const vehicleType = item.dataset.vehicleType;
        // Display the vehicle type
        displayVehicleType(vehicleId, vehicleType);
      });
    });
  }

  // Define the displayVehicleType function
  function displayVehicleType(makeId, vehicleType) {
    const makeName = document.querySelector(`[data-vehicle-id="${makeId}"]`).textContent.trim();
  
    // Display MakeId and MakeName
    searchResults.innerHTML = `<p>MakeId: ${makeId}</p><p>MakeName: ${makeName}</p><p>VehicleTypeName: ${getVehicleTypeName(vehicleType)}</p>`;
  }

  // Define the getVehicleTypeName function
  function getVehicleTypeName(vehicleType) {
    // Return the vehicle type name based on the vehicle type
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

  // Define the searchCars function
  function searchCars(query) {
    // Fetch data from the API
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json")
      .then((response) => response.json())
      .then((data) => {
        // Filter the results based on the query
        const results = data.Results.filter((car) => car.MakeName.toLowerCase().includes(query.toLowerCase()));
        // Display the search results
        displaySearchResults(results);
      });
  }

  // Define the displaySearchResults function
  function displaySearchResults(results) {
    // Create a list of search results
    let listItems = "";
    results.forEach((car) => {
      listItems += `<li data-vehicle-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
    });
    // Display the list of search results
    searchResults.innerHTML = `<h2>Search Results</h2><ul>${listItems}</ul>`;
  }

  // Add a click event listener to the search button
  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const query = searchBar.value;
    if (query.length < 3) return;
    // Search for cars based on the query
    searchCars(query);
  });
});