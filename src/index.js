import navSlide from "./scripts/navbar";
import chart1 from "./scripts/chartdata";
import { Chart, registerables } from "chart.js/auto";
Chart.register(...registerables);
navSlide();
const width = 900;
const height = 610;

const svg = d3.select("svg").attr("width", width).attr("height", height);

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3
  .geoMercator()
  .scale(140)
  .translate([width / 2, height / 1.5]);

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
      total_cases = "#D8E0BB";
    } else if (total_cases < 10000 && total_cases > 1000) {
      total_cases = "#b6cec7";
    } else if (total_cases < 1000000 && total_cases > 10000) {
      total_cases = "#86a3c3";
    } else if (total_cases < 10000000 && total_cases > 1000000) {
      total_cases = "#7268A6";
    } else if (total_cases < 100000000 && total_cases > 10000000) {
      total_cases = "#6b3074";
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

const get_data = async (ele) => {
  if (typeof ele === "undefined") {
    return "";
  } else {
    try {
      let res = await fetch(
        `https://api.covid19api.com/country/${ele}?from=2020-03-01T00:00:00Z&to=2022-12-01T00:00:00Z`
      );
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
};


let world_map = document.querySelector("#my_dataviz");
let countryName = document.querySelector("#country-name");
let countryTotalCases = document.querySelector("#country-total-cases");
let countryTotalDeaths = document.querySelector("#country-total-deaths");
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

  const loaderElement = document.querySelector('.loading')
  const loaderClass = loaderElement.classList.add('loader')


  e.preventDefault();
  array_of_active_cases = [];
  array_of_deaths_cases = [];
  array_of_date = [];
  const titleHtml = e.target;
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");

    const name_of_country = a.innerHTML;
    countryName.innerHTML = name_of_country;

    const clickData = await mouseOverData();
    countryTotalCases.innerHTML = `${clickData[name_of_country]}`
   
    const data1 = await get_data(name_of_country);
    const loaderClass = loaderElement.classList.remove('loader')

    for (let i = 0; i < data1.length - 91; i += 90) {
      array_of_active_cases.push(data1[i].Confirmed);

      array_of_date.push(data1[i].Date.slice(0, 10));
      array_of_deaths_cases.push(data1[i].Deaths);
    }


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
  const [x, y] = d3.pointer(e);
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
      // .style.top = (y + 20) + 'px';
      // .style.left = (x + 20) + 'px';
      .style("left", (x + 20) + "px")
      .style("top", (y + 80) + "px");
  }
});

world_map.addEventListener("mouseout", async (e) => {
  tooltipDiv.transition().duration(500).style("opacity", 0);
});
