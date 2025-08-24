let barChart = null;
let pieChart = null;

async function analyzeText() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value.trim();
    
    if (!text) {
        showError('Please enter some text to analyze.');
        return;
    }
    
    // Show loading
    showLoading(true);
    hideResults();
    hideError();
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            displayResults(data);
        } else {
            showError(data.error || 'An error occurred while analyzing the text.');
        }
    } catch (error) {
        showError('Network error. Please check your connection and try again.');
        console.error('Error:', error);
    } finally {
        showLoading(false);
    }
}

function displayResults(data) {
    // Display statistics
    displayStats(data);
    
    // Display charts
    displayCharts(data.chart_data);
    
    // Display table
    displayTable(data.words_data);
    
    // Show results
    showResults();
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function displayStats(data) {
    const statsContainer = document.getElementById('stats');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${data.total_words}</div>
            <div class="stat-label">Total Words</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${data.unique_words}</div>
            <div class="stat-label">Unique Words</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${data.chart_data.length}</div>
            <div class="stat-label">Top Words Shown</div>
        </div>
    `;
}

function displayCharts(chartData) {
    const labels = chartData.map(item => item.word);
    const counts = chartData.map(item => item.count);
    const colors = generateColors(chartData.length);
    
    // Create bar chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    if (barChart) {
        barChart.destroy();
    }
    
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Word Frequency',
                data: counts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Frequency: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        maxRotation: 30,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });
    
    // Create pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: colors,
                borderColor: 'white',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        color: '#333',
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });
}

function displayTable(wordsData) {
    const tableBody = document.getElementById('tableBody');
    const totalWords = wordsData.reduce((sum, item) => sum + item.count, 0);
    
    // Sort by frequency (descending)
    const sortedData = wordsData.sort((a, b) => b.count - a.count);
    
    tableBody.innerHTML = sortedData.map((item, index) => {
        const percentage = ((item.count / totalWords) * 100).toFixed(2);
        return `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${item.word}</strong></td>
                <td>${item.count}</td>
                <td>${percentage}%</td>
            </tr>
        `;
    }).join('');
}

function generateColors(count) {
    const colors = [
        'rgba(102, 126, 234, 0.8)',   // Blue
        'rgba(118, 75, 162, 0.8)',    // Purple
        'rgba(255, 99, 132, 0.8)',    // Pink
        'rgba(54, 162, 235, 0.8)',    // Light Blue
        'rgba(255, 159, 64, 0.8)',    // Orange
        'rgba(75, 192, 192, 0.8)',    // Teal
        'rgba(255, 205, 86, 0.8)',    // Yellow
        'rgba(153, 102, 255, 0.8)',   // Purple
        'rgba(255, 99, 132, 0.8)',    // Pink
        'rgba(201, 203, 207, 0.8)'    // Gray
    ];
    
    // Repeat colors if needed
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(colors[i % colors.length]);
    }
    return result;
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'block' : 'none';
}

function showResults() {
    document.getElementById('results').style.display = 'block';
}

function hideResults() {
    document.getElementById('results').style.display = 'none';
}

function showError(message) {
    hideError();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(errorDiv, mainContent.firstChild);
}

function hideError() {
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
}

// Add event listener for Enter key in textarea
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeText();
        }
    });
    
    // Add some sample text for testing
    textInput.placeholder = "Paste or type your text here to analyze word frequencies...\n\nExample: The quick brown fox jumps over the lazy dog. This is a sample text for testing the word frequency analyzer.";
});
