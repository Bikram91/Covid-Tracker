export default function chart1(){
const myChart = document.getElementById('chart').getContext('2d');
  const xlabels = [];

let popChart = new Chart(myChart, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Global Covid Data',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor:'green',
      borderWidth: 1

    }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
})
};
