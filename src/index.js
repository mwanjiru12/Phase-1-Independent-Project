// Wait for the DOM to load before executing any JavaScript code
document.addEventListener('DOMContentLoaded', () => {
    // Get the necessary elements from the DOM
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const vehicleTypeFilter = document.getElementById('vehicle-type-filter');
    const vehicleListContainer = document.getElementById('vehicle-list-container');
    const vehicleList = document.getElementById('vehicle-list');
  
    // Define the API endpoint and parameters
    const apiEndpoint = 'http://localhost:3000/Vehicles';
  
    // Define an array to store the vehicle data
    let vehicleData = [];
  
    // Define a function to fetch the vehicle data from the API
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        vehicleData = data.Vehicles;
        displayVehicleList();
      } catch (error) {
        console.error(error);
      }
    };
  
    // Define a function to display the vehicle list
    const displayVehicleList = () => {
      vehicleList.innerHTML = '';
      vehicleData.forEach((vehicle) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${vehicle.MakeName} (${vehicle.VehicleTypeName})`;
        listItem.addEventListener('click', () => {
          displayVehicleDetails(vehicle);
        });
        vehicleList.appendChild(listItem);
      });
    };
  
    // Define a function to display the vehicle details
    const displayVehicleDetails = (vehicle) => {
      // TODO: Implement this function to display the vehicle details in a modal or separate section of the page
    };
  
    // Define a function to filter the vehicle data by vehicle type
    const filterVehicleData = (event) => {
      const selectedType = event.target.value;
      if (selectedType === 'all') {
        displayVehicleList();
      } else {
        const filteredData = vehicleData.filter((vehicle) => vehicle.VehicleTypeName === selectedType);
        displayVehicleList(filteredData);
      }
    };
  
    // Define a function to search the vehicle data by make name
    const searchVehicleData = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      if (searchTerm.length === 0) {
        displayVehicleList();
      } else {
        const filteredData = vehicleData.filter((vehicle) => vehicle.MakeName.toLowerCase().includes(searchTerm));
        displayVehicleList(filteredData);
      }
    };
  
    // Add event listeners to the search button, vehicle type filter, and submit button
    searchButton.addEventListener('click', searchVehicleData);
    vehicleTypeFilter.addEventListener('change', filterVehicleData);
    searchBar.addEventListener('input', searchVehicleData);
  
    // Fetch the vehicle data from the API when the DOM is loaded
    fetchVehicleData();
  });