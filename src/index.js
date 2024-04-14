document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event triggered");

  getCars();

  function getCars(page = 1, allCars = []) {
    console.log("Fetching cars from page", page);
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cars fetched from page", page, ":", data);
        const cars = data.Results;
        allCars.push(...cars); // Append the new cars to the existing list
        if (cars.length > 0) {
          // If there are cars, fetch the next page
          getCars(page + 1, allCars);
        } else {
          // If no more cars, display them
          displayCars(allCars);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }

  function displayCars(cars) {
    console.log("Displaying cars:", cars);
    let listItems = "";
    cars.forEach((car) => {
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
    console.log("Displaying vehicle type for id:", vehicleId);
    const selectedVehicle = document.querySelector(`[data-vehicle-id="${vehicleId}"]`);
    const makeId = selectedVehicle.dataset.vehicleId;
    const makeName = selectedVehicle.textContent.trim();

    // Display MakeId and MakeName
    searchResults.innerHTML = `<p>MakeId: ${makeId}</p><p>MakeName: ${makeName}</p>`;
  }

  const searchBar = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");
  const vehicleList = document.getElementById("vehicle-list");
  const searchResults = document.getElementById("search-results");

  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const query = searchBar.value;
    if (query.length < 3) return;
    searchCars(query);
  });

  function searchCars(query) {
    console.log("Searching cars for query:", query);
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json&make=${query}`)
      .then((response) => response.json())
      .then((data) => {
        displaySearchResults(data.Results);
      })
      .catch((error) => {
        console.error("Error searching cars:", error);
      });
  }

  function displaySearchResults(results) {
    console.log("Displaying search results:", results);
    let listItems = "";
    results.forEach((car) => {
      listItems += `<li>${car.MakeName}</li>`;
    });
    searchResults.innerHTML = `<h2>Search Results</h2><ul>${listItems}</ul>`;
  }
});
