import navSlide from "./scripts/navbar";
import { Chart, registerables } from "chart.js/auto";
Chart.register(...registerables);
navSlide();
const width = 890;
const height = 570;

const svg = d3.select("svg").attr("width", width).attr("height", height);

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3
  .geoMercator()
  .scale(140)
  .translate([width / 2, height / 1.4]);

// Load external data and boot
let map_data = d3.json("./src/scripts/mapdata.JSON");

const all_data = async (ele) => {
  try {
    let res = await fetch(`./src/scripts/coviddata.JSON`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

let newArr = new Map();
async function color() {
  let result = await all_data();

  for (let i = 0; i < result.Countries.length; i++) {
    let total_cases = result.Countries[i].TotalConfirmed;
    const countryN = result.Countries[i].Country;
    if (total_cases < 1000) {
      total_cases = "#fcb900";
    } else if (total_cases < 10000 && total_cases > 1000) {
      total_cases = "#f78da7";
    } else if (total_cases < 1000000 && total_cases > 10000) {
      total_cases = "#ff6900";
    } else if (total_cases < 10000000 && total_cases > 1000000) {
      total_cases = "#cf2e2e";
    } else if (total_cases < 100000000 && total_cases > 10000000) {
      total_cases = "rgb(107,0,62)";
    }
    newArr.set(countryN, total_cases);
  }
  newArr;
}

color()
  .then(() => map_data)
  .then((data) => {
    map_data.then(function (data) {
      const countries = svg
        .append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("class", "map")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", (d) => newArr.get(d.properties.name))
        .append("country")
        .text((d) => d.properties.name);
    });
  });

async function get_data_cases(country) {
  let hash = {}
  hash["2020-01-22"] = 0;
  hash["2020-03-22"] = 0;
  hash["2020-06-22"] = 0;
  hash["2020-09-22"] = 0;
  hash["2021-01-22"] = 0;
  hash["2021-03-22"] = 0;
  hash["2021-06-22"] = 0;
  hash["2021-09-22"] = 0;
  hash["2022-01-22"] = 0;
  hash["2022-03-22"] = 0;
  hash["2022-06-22"] = 0;
  hash["2022-09-22"] = 0;
  hash["2023-01-22"] = 0
  hash["2023-03-08"] = 0;
  

  try {
      const result = await $.ajax({
          method: 'GET',
          url: `https://api.api-ninjas.com/v1/covid19?country=${country}&type=cases`,
          headers: { 'X-Api-Key': 'Pu1Rm1WZ3pp28zZwBF51AVKJ6fmPnSVFi5hQADj9'},
          contentType: 'application/json'
      });

      for (let i = 0; i < result.length; i++) {
          hash["2020-01-22"] += result[i].cases["2020-01-22"]["total"];
          hash["2020-03-22"] += result[i].cases["2020-03-22"]["total"];
          hash["2020-06-22"] += result[i].cases["2020-06-22"]["total"];
          hash["2020-09-22"] += result[i].cases["2020-09-22"]["total"];
          hash["2021-01-22"] += result[i].cases["2021-01-22"]["total"];
          hash["2021-03-22"] += result[i].cases["2021-03-22"]["total"];
          hash["2021-06-22"] += result[i].cases["2021-06-22"]["total"];
          hash["2021-09-22"] += result[i].cases["2021-09-22"]["total"];
          hash["2022-01-22"] += result[i].cases["2022-01-22"]["total"];
          hash["2022-03-22"] += result[i].cases["2022-03-22"]["total"];
          hash["2022-06-22"] += result[i].cases["2022-06-22"]["total"];
          hash["2022-09-22"] += result[i].cases["2022-09-22"]["total"];
          hash["2023-01-22"] += result[i].cases["2023-01-22"]["total"];
          hash["2023-03-08"] += result[i].cases["2023-03-08"]["total"];
      }
      return hash
  } catch (error) {
      console.error('Error: ', error.responseText);
  }
}

async function get_data_deaths(country) {
  let hash1 = {}
  hash1["death2020-01-22"] = 0;
  hash1["death2020-03-22"] = 0;
  hash1["death2020-06-22"] = 0;
  hash1["death2020-09-22"] = 0;
  hash1["death2021-01-22"] = 0;
  hash1["death2021-03-22"] = 0;
  hash1["death2021-06-22"] = 0;
  hash1["death2021-09-22"] = 0;
  hash1["death2022-01-22"] = 0;
  hash1["death2022-03-22"] = 0;
  hash1["death2022-06-22"] = 0;
  hash1["death2022-09-22"] = 0;
  hash1["death2023-01-22"] = 0;
  hash1["death2023-03-08"] = 0;

  try {
      const deathRequest = await $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/covid19?country=${country}&type=deaths`,
        headers: { 'X-Api-Key': 'Pu1Rm1WZ3pp28zZwBF51AVKJ6fmPnSVFi5hQADj9'},
        contentType: 'application/json'
      });

      for (let i = 0; i < deathRequest.length; i++) {
        hash1["death2020-01-22"] += deathRequest[i].deaths["2020-01-22"]["total"];
        hash1["death2020-03-22"] += deathRequest[i].deaths["2020-03-22"]["total"];
        hash1["death2020-06-22"] += deathRequest[i].deaths["2020-06-22"]["total"];
        hash1["death2020-09-22"] += deathRequest[i].deaths["2020-09-22"]["total"];
        hash1["death2021-01-22"] += deathRequest[i].deaths["2021-01-22"]["total"];
        hash1["death2021-03-22"] += deathRequest[i].deaths["2021-03-22"]["total"];
        hash1["death2021-06-22"] += deathRequest[i].deaths["2021-06-22"]["total"];
        hash1["death2021-09-22"] += deathRequest[i].deaths["2021-09-22"]["total"];
        hash1["death2022-01-22"] += deathRequest[i].deaths["2022-01-22"]["total"];
        hash1["death2022-03-22"] += deathRequest[i].deaths["2022-03-22"]["total"];
        hash1["death2022-06-22"] += deathRequest[i].deaths["2022-06-22"]["total"];
        hash1["death2022-09-22"] += deathRequest[i].deaths["2022-09-22"]["total"];
        hash1["death2023-01-22"] += deathRequest[i].deaths["2023-01-22"]["total"];
        hash1["death2023-03-08"] += deathRequest[i].deaths["2023-03-08"]["total"];
      }
      return hash1
  } catch (error) {
      console.error('Error: ', error.responseText);
  }
}


let world_map = document.querySelector("#my_dataviz");
let countryName = document.querySelector("#country-name");
let countryTotalCases = document.querySelector("#country-total-cases");
let array_of_active_cases = [];
let array_of_date = [];
let array_of_deaths_cases = [];
let popChart1;
let popChart5;
countryName.innerHTML = "Globally";
countryTotalCases.innerHTML = "Total Cases: 651,595,573 <br> Total Deaths: 6,652,007";



world_map.addEventListener("click", async (e) => {
  
  if (popChart5) {
    popChart5.destroy();
  }
  if (popChart1) {
    popChart1.destroy();
  }

  
  
  countryName.innerHTML = "Globally";
  countryTotalCases.innerHTML = "Total Cases: 651,595,573 <br> Total Deaths: 6,652,007";
  let loaderClass
  e.preventDefault();
  array_of_active_cases = [];
  array_of_deaths_cases = [];
  array_of_date = [];
  const titleHtml = e.target;
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");
    const loaderElement = document.querySelector('.loading')
    loaderClass = loaderElement.classList.add('loader')

    const name_of_country = a.innerHTML;
    countryName.innerHTML = name_of_country;

    const clickData = await mouseOverData();
    countryTotalCases.innerHTML = `${clickData[name_of_country]}`
   
    const data1 = await get_data_cases(name_of_country);
    const data2 = await get_data_deaths(name_of_country);
    loaderClass = loaderElement.classList.remove('loader')

    array_of_active_cases = Object.values(data1);
    array_of_deaths_cases = Object.values(data2);
    array_of_date = Object.keys(data1);

    function chart2() {
      if (popChart1) {
        popChart1.destroy();
      }
      const chart1Div = document.getElementById("chart1");
      const chart1Context = chart1Div.getContext("2d");

      popChart1 = new Chart(chart1Context, {
        type: "line",
        data: {
          labels: array_of_date,
          datasets: [
            {
              label: `Total covid cases in ${name_of_country}`,
              data: array_of_active_cases,
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }


    function chart6() {
      if (popChart5) {
        popChart5.destroy();
      }
      const abcd5 = document.getElementById("chart5");
      const abcd51 = abcd5.getContext("2d");

      popChart5 = new Chart(abcd51, {
        type: "line",
        data: {
          labels: array_of_date,
          datasets: [
            {
              label: `Total deaths cases in ${name_of_country}`,
              data: array_of_deaths_cases,
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    chart2()
    chart6()
  }
});

const mouseOverData = async () => {
  let hoverData = {}
  const data1 = await all_data();
  for (let i = 0; i < data1.Countries.length; i++) {

    hoverData[data1.Countries[i].Country] = `Total Cases: ${data1.Countries[i].TotalConfirmed} <br> Total Deaths: ${data1.Countries[i].TotalDeaths}`
  }
  return hoverData;
}




const tooltipDiv = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("width", "fit-content");

  

world_map.addEventListener("mouseover", async (e) => {
  e.preventDefault();
  // const [x, y] = d3.pointer(e);
  const x = e.clientX;
  const y = e.clientY;

  const titleHtml = e.toElement  

  let countrynameDiv = document.querySelector(".country-name");
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");
    const name_of_country = a.innerHTML;
    const hoverData1 = await mouseOverData();
    const tooltipData = `<h4>${name_of_country}</h4>  <p>${hoverData1[name_of_country]}</p>`;
    tooltipDiv.transition().duration(200).style("opacity", 0.9);
    tooltipDiv
      .html(tooltipData)
      .style("left", (x+15) + "px")
      .style("top", (y-50) + "px");
  }
});

world_map.addEventListener("mouseout", async (e) => {
  tooltipDiv.transition().duration(500).style("opacity", 0);
});
