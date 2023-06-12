




(()=>{
    const ctx = document.getElementById('myChart');
    Chart.defaults.font.size = 16;

    const temperature = document.getElementById('temperature');
    const airHumidity = document.getElementById('air-humidity');    
    const soilHumidity = document.getElementById('soil-humidity');

    const fanOn = document.getElementById('fan-on');
    const fanOff = document.getElementById('fan-off');
    const pumpOn = document.getElementById('pump-on');   
    const pumpOff = document.getElementById('pump-off');

    // Datasets
    // [0]Temperature
    // [1]Air Humidity
    // [2]Soil Humidity

    const updateChart = (chart) => {
        const id = location.href.split('/').pop();
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.data.datasets[1].data = [];
        chart.data.datasets[2].data = [];
        fetch(`/dashboard/api?q=${id}`)
        .then(res => res.json())
        .then(res => {
            const keys = Object.keys(res);
            keys.forEach(key => {
                chart.data.labels.push(new Date(Number(key)).toISOString().split('.')[0].replace('T', ' '));
                chart.data.datasets[0].data.push(res[key].temperature);
                chart.data.datasets[1].data.push(res[key].humidity);
                chart.data.datasets[2].data.push(res[key].soilhumidity);
            });
            chart.update();
            const last = keys.pop();
            temperature.innerText = res[last].temperature + '°C';
            airHumidity.innerText = res[last].humidity + '%';
            soilHumidity.innerText = res[last].soilhumidity + '%';

            if(res[last].fan === 1){
                fanOn.classList.remove('hidden');
                fanOff.classList.add('hidden');
            } else {
                fanOff.classList.remove('hidden');
                fanOn.classList.add('hidden');
            }

            if(res[last].waterpump === 1){
                pumpOn.classList.remove('hidden');
                pumpOff.classList.add('hidden');
            } else {
                pumpOff.classList.remove('hidden');
                pumpOn.classList.add('hidden');
            }
        });
    }

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperature',
                    data: [],
                    borderWidth: 1
                },
                {
                    label: 'Air Humidity',
                    data: [],
                    borderWidth: 1
                },
                {
                    label: 'Soil Humidity',
                    data: [],
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Geologica'
                        }
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        display: false
                        // maxTicksLimit: 4, // labels.length / 2
                        // maxRotation: 90,
                        // minRotation: 90
                    }
                }
            },
            // mantainAspectRatio: false,
            aspectRatio: 2
        }
    });

    updateChart(chart);
    
    setInterval(() => {
        updateChart(chart);
    },6000)
    
})()

