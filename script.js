// Initialize the page by fetching data from the backend
function init() {
    fetchDataAndInitialize();
    setInterval(fetchDataAndInitialize, 10000); // Auto-refresh every 10 seconds
}

// Fetch data from the backend
function fetchDataAndInitialize() {
    fetch("http://yourserver.com/search.php") // Replace with your backend URL
        .then(response => response.json())
        .then(data => {
            initFilters(data);
            updateDisplay(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Initialize the filters with Hospital, CPT Codes, and Descriptions
function initFilters(data) {
    const hospitalSelect = document.getElementById('hospitalSelect');
    const cptSelect = document.getElementById('cptSelect');
    const descSelect = document.getElementById('descSelect');

    const uniqueHospitals = [...new Set(data.map(item => item.hospital))];
    const uniqueCPTs = [...new Set(data.map(item => item.cpt))];
    const uniqueDescs = [...new Set(data.map(item => item.description))];

    populateDropdown(hospitalSelect, uniqueHospitals);
    populateDropdown(cptSelect, uniqueCPTs);
    populateDropdown(descSelect, uniqueDescs);

    // Add event listeners to apply filters on change
    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('change', updateDisplay);
    });
}

// Populate dropdowns dynamically
function populateDropdown(selectElement, items) {
    selectElement.innerHTML = '<option value="">All</option>'; // Default option
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

// Fetch filtered data from the backend when filters change
function updateDisplay() {
    const selectedHospital = document.getElementById('hospitalSelect').value;
    const selectedCPT = document.getElementById('cptSelect').value;
    const selectedDesc = document.getElementById('descSelect').value;

    const url = `http://yourserver.com/search.php?cpt=${selectedCPT}&hospital=${selectedHospital}&desc=${selectedDesc}`;

    fetch(url)
        .then(response => response.json())
        .then(filteredData => updateResultsTable(filteredData))
        .catch(error => console.error("Error fetching filtered data:", error));
}

// Update the results table
function updateResultsTable(filtered) {
    const resultsBody = document.getElementById('resultsBody');
    if (filtered.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="4" class="no-results">No results found.</td></tr>';
    } else {
        resultsBody.innerHTML = filtered.map(item => `
            <tr>
                <td>${item.hospital}</td>
                <td>${item.cpt}</td>
                <td>${item.description}</td>
                <td>$${item.price.toFixed(2)}</td>
            </tr>
        `).join('');
    }
}

// Call init() to load data from the backend on page load
init();

