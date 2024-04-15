// Get a reference to the HTML elements
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const vehicleList = document.getElementById("vehicle-list");
const searchResultsList = document.getElementById("search-results-list");
const vehicleDetails = document.getElementById("vehicle-details");

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
            listItems += `<li data-make-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
        });
        // Display the list of cars
        vehicleList.innerHTML = listItems;

        // Add a click event listener to each car
        const vehicleItems = document.querySelectorAll(".vehicle-item");
        vehicleItems.forEach((item) => {
            item.addEventListener("click", () => {
                const makeId = item.dataset.makeId;
                const vehicleType = item.dataset.vehicleType;
                // Display the vehicle type and make id
                displayVehicleType(makeId, vehicleType);
            });
        });
    }

    // Define the displayVehicleType function
    function displayVehicleType(makeId, vehicleType) {
        const makeName = document.querySelector(`[data-make-id="${makeId}"]`).textContent.trim();
        const vehicleTypeName = getVehicleTypeName(vehicleType);

        // Display MakeId, MakeName, and VehicleTypeName
        vehicleDetails.innerHTML = ` <input type="text" id="search-bar" placeholder="Search by Vehicle Type...">
        <button id="search-button">Search</button>
        <p>MakeId: ${makeId}</p><p>MakeName: ${makeName}</p><p>VehicleTypeName: ${vehicleTypeName}</p>`;
    }

    // Define the getVehicleTypeName function
    function getVehicleTypeName(vehicleType) {
        const vehicleTypes = {
            '2': 'Passenger Car',
            '3': 'Truck',
            '5': 'Bus',
            '7': 'Multipurpose Passenger Vehicle (MPV)',
            '10': 'Incomplete Vehicle',
            '1': 'Motorcycle',
            '6': 'Trailer'
        };
        return vehicleTypes[vehicleType] || 'Unknown';
    }

    // Define the searchCars function
    function searchCars(query) {
        // Fetch data from the API
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json")
            .then((response) => response.json())
            .then((data) => {
                // Filter the results based on the query
                const results = data.Results.filter((car) => car.VehicleTypeName.toLowerCase().includes(query.toLowerCase()));
                // Display the search results
                displaySearchResults(results);
            });
    }

    // Define the displaySearchResults function
    function displaySearchResults(results) {
        // Create a list of search results
        let listItems = "";
        results.forEach((car) => {
            listItems += `
            <li data-make-id="${car.MakeId}" data-vehicle-type="${car.VehicleTypeId}" class="vehicle-item">${car.MakeName}</li>`;
        });
        // Display the list of search results
        searchResultsList.innerHTML = listItems;

        // Add a click event listener to each search result
        const searchResultItems = document.querySelectorAll(".vehicle-item");
        searchResultItems.forEach((item) => {
            item.addEventListener("click", () => {
                const makeId = item.dataset.makeId;
                const vehicleType = item.dataset.vehicleType;
                // Display the vehicle type and make id
                displayVehicleType(makeId, vehicleType);
            });
        });
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
