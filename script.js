const API_URL = 'http://localhost:5000/api/predict';

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    
    if (!fileInput.files[0]) {
        alert('Please select a CSV file');
        return;
    }

    // Show loading state
    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Analysis failed');
        }

        // Update UI with results
        const statusElement = document.getElementById('resultStatus');
        const messageElement = document.getElementById('resultMessage');
        
        statusElement.textContent = data.status;
        messageElement.textContent = data.message;
        
        // Apply appropriate class based on status
        resultDiv.className = 'result-section';
        resultDiv.classList.add(data.status.toLowerCase());
        resultDiv.style.display = 'block';

    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function resetForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('result').className = 'result-section';
}