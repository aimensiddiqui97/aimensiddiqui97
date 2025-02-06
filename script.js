{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Generate random sample data\
const sampleData = [\
    \{ hospital: 'City Hospital', cpt: '99213', description: 'Office visit, established patient', price: 150.00 \},\
    \{ hospital: 'City Hospital', cpt: '99214', description: 'Office visit, established patient, moderate complexity', price: 225.00 \},\
    \{ hospital: 'General Medical Center', cpt: '99213', description: 'Office visit, established patient', price: 160.00 \},\
    \{ hospital: 'General Medical Center', cpt: '99215', description: 'Office visit, established patient, high complexity', price: 275.00 \},\
    \{ hospital: 'MediCare Hospital', cpt: '99213', description: 'Office visit, established patient', price: 145.00 \},\
    \{ hospital: 'MediCare Hospital', cpt: '99214', description: 'Office visit, established patient, moderate complexity', price: 210.00 \}\
];\
\
// Initialize the filters and table\
function init(data) \{\
    initFilters(data);\
    updateDisplay(data);\
\}\
\
// Initialize the filters with Hospital, CPT Codes, and Descriptions\
function initFilters(data) \{\
    const hospitalSelect = document.getElementById('hospitalSelect');\
    const cptSelect = document.getElementById('cptSelect');\
    const descSelect = document.getElementById('descSelect');\
\
    const uniqueHospitals = [...new Set(data.map(item => item.hospital))];\
    const uniqueCPTs = [...new Set(data.map(item => item.cpt))];\
    const uniqueDescs = [...new Set(data.map(item => item.description))];\
\
    populateDropdown(hospitalSelect, uniqueHospitals);\
    populateDropdown(cptSelect, uniqueCPTs);\
    populateDropdown(descSelect, uniqueDescs);\
\
    // Add event listeners to apply filters on change\
    document.querySelectorAll('.filter').forEach(filter => \{\
        filter.addEventListener('change', () => updateDisplay(data));\
    \});\
\}\
\
// Populate dropdowns dynamically\
function populateDropdown(selectElement, items) \{\
    selectElement.innerHTML = '<option value="">All</option>'; // Default option\
    items.forEach(item => \{\
        const option = document.createElement('option');\
        option.value = item;\
        option.textContent = item;\
        selectElement.appendChild(option);\
    \});\
\}\
\
// Update display based on selected filters\
function updateDisplay(data) \{\
    const selectedHospital = document.getElementById('hospitalSelect').value;\
    const selectedCPT = document.getElementById('cptSelect').value;\
    const selectedDesc = document.getElementById('descSelect').value;\
\
    let filtered = data.filter(item =>\
        (selectedHospital === '' || item.hospital === selectedHospital) &&\
        (selectedCPT === '' || item.cpt === selectedCPT) &&\
        (selectedDesc === '' || item.description === selectedDesc)\
    );\
\
    // Ensure unique prices for CPT - Description per hospital\
    filtered = filtered.filter((value, index, self) =>\
        index === self.findIndex((t) => (\
            t.hospital === value.hospital && t.cpt === value.cpt && t.description === value.description\
        ))\
    );\
\
    updateResultsTable(filtered);\
\}\
\
// Update the results table\
function updateResultsTable(filtered) \{\
    const resultsBody = document.getElementById('resultsBody');\
    if (filtered.length === 0) \{\
        resultsBody.innerHTML = '<tr><td colspan="4" class="no-results">No results found.</td></tr>';\
    \} else \{\
        resultsBody.innerHTML = filtered.map(item => `\
            <tr>\
                <td>$\{item.hospital\}</td>\
                <td>$\{item.cpt\}</td>\
                <td>$\{item.description\}</td>\
                <td>$$\{item.price.toFixed(2)\}</td>\
            </tr>\
        `).join('');\
    \}\
\}\
\
// Initialize the page with sample data\
init(sampleData);\
}