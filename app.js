let sussexData = [];
let kentData = [];

// Fetch CSV data from GitHub repository
function loadCSV(url, targetArray) {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            const data = csvToArray(text);
            targetArray.push(...data);
            renderTable(targetArray);
        });
}

// Convert CSV text to an array of objects
function csvToArray(strData) {
    const rows = strData.split('\n');
    const headers = rows[0].split(',');
    return rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });
}

// Render the table with the data
function renderTable(data) {
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = ''; // Clear existing data
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
    $('#data-table').DataTable(); // Initialize DataTables
}

// Filter data based on search criteria
function filterData() {
    const drugType = document.getElementById('drug-type').value.toLowerCase();
    const unitOfMeasurement = document.getElementById('unit-of-measurement').value.toLowerCase();

    const filteredData = sussexData.filter(row => 
        row['Drug Type'].toLowerCase().includes(drugType) && 
        row['Unit of Measurement'].toLowerCase().includes(unitOfMeasurement)
    );
    
    renderTable(filteredData);
    plotChart(filteredData);
}

// Create the charge comparison chart
function plotChart(data) {
    const sussexCharges = data.map(row => parseFloat(row['Standard Charge Gross (Sussex)']));
    const kentCharges = data.map(row => parseFloat(row['Standard Charge Gross (Kent)']));

    const ctx = document.getElementById('chargeComparisonChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sussex', 'Kent'],
            datasets: [{
                label: 'Standard Charge Gross Comparison',
                data: [average(sussexCharges), average(kentCharges)],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Helper function to calculate average
function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// Load the CSV files
const sussexURL = 'https://raw.githubusercontent.com/aimensiddiqui97/aimensiddiqui97/main/BayhealthSussexNDCs.csv';
const kentURL = 'https://raw.githubusercontent.com/aimensiddiqui97/aimensiddiqui97/main/BayhealthKentNDCs.csv';

loadCSV(sussexURL, sussexData);
loadCSV(kentURL, kentData);
