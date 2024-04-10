const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const vehicleList = document.getElementById('vehicle-list');

let vehicles = [];

// Fetch data from API
async function fetchData() {
    try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmakes?format=json');
        const data = await response.json();
        vehicles = data.Results;
        displayVehicles(vehicles);
    } catch (error) {
        console.error(error);
    }
}

// Display vehicles
function displayVehicles(vehicles) {
    vehicleList.innerHTML = '';
    vehicles.forEach(vehicle => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${vehicle.MakeName}</h3>
            <p><strong>Type:</strong> ${vehicle.VehicleTypeName}</p>
            <p><strong>Year:</strong> ${vehicle.ModelYearMin} - ${vehicle.ModelYearMax}</p>
            <p><strong>Color:</strong> ${vehicle.VehicleColor}</p>
        `;
        vehicleList.appendChild(li);
    });
}

// Search functionality
searchButton.addEventListener('click', () => {
    const filter = searchBar.value.toLowerCase();
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.MakeName.toLowerCase().includes(filter)
    );
    displayVehicles(filteredVehicles);
});
}

// Page load
fetchData();