document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    setupNavigation();
});

function initializeCharts() {
    const benchCtx = document.getElementById('benchChart').getContext('2d');
    const squatCtx = document.getElementById('squatChart').getContext('2d');

    const commonConfig = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0.4
                }
            }
        }
    };

    new Chart(benchCtx, {
        ...commonConfig,
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                data: [185, 195, 190, 205, 225],
                borderColor: '#64dfdf',
                borderWidth: 2,
                fill: false
            }]
        }
    });

    new Chart(squatCtx, {
        ...commonConfig,
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                data: [225, 245, 260, 275, 285],
                borderColor: '#64dfdf',
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}