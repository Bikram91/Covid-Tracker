// The svg

const { schemeCategory10 } = require("d3-scale-chromatic");

import navSlide from "./scripts/navbar";
import chart1 from "./scripts/chartdata";

navSlide();
// import {schemeCategory10} from 'd3';
const width = 900;
const height = 610;
// var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//     height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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
  //   console.log(result.Countries[0].Country)
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
  // // console.log(result.Countries[0].Country)
}

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
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

// chart1();

const get_dummy_data = async () => {

}

const get_data = async (ele) => {
  if (typeof ele === "undefined") {
    return "";
  } else {
    try {
      let res = await fetch(
        `https://api.covid19api.com/country/${ele}?from=2020-03-01T00:00:00Z&to=2022-12-01T00:00:00Z`
        // `https://api.covid19api.com/total/country/${ele}/status/confirmed?from=2020-03-01T00:00:00Z&to=2022-12-01T00:00:00Z`
        // `https://api.covid19api.com/live/country/${ele}/status/confirmed/date/2022-09-10T13:13:30Z`
      );
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
};
let world_map = document.querySelector("#my_dataviz");
let array_of_active_cases = [];
let array_of_date = [];
let array_of_deaths_cases = [];
let popChart1;
let popChart5;
 
  world_map.addEventListener("click", async (e) => {
    e.preventDefault();
    const titleHtml = e.path[0];
    // const a = titleHtml.querySelector("country");
    // console.log(a.innerHTML)
    let dataDiv = document.querySelector("#data");
    let deathsDiv = document.querySelector("#deaths");
    let countrynameDiv = document.querySelector(".country-name");

    //  const data1 = await get_data(name_of_country);
    if (e.target.tagName === "path") {
      const a = titleHtml.querySelector("country");
      const name_of_country = a.innerHTML;
      const data1 = await get_data(name_of_country);
    //  console.log(data1)
      //   let no_of_deaths = 0;
      for (let i = 0; i < data1.length - 91; i+=90) {
        array_of_active_cases.push((data1[i].Confirmed));

        array_of_date.push(data1[i].Date.slice(0,10))
        array_of_deaths_cases.push(data1[i].Deaths)
      }
     
      //   countrynameDiv.innerHTML = `Country: ${name_of_country}`;
      //   dataDiv.innerHTML = `Active cases: ${sum_of_active_cases}`;
      //   deathsDiv.innerHTML = `Deaths cases: ${no_of_deaths}`;
      // } else {
      //   dataDiv.innerHTML = "";
      //   deathsDiv.innerHTML = "";
      //   countrynameDiv.innerHTML = "";

              
              function chart2() {
              const abcd1 = document.getElementById('chart1');
              if (popChart1) {
                popChart1.destroy();
              }
                console.log(abcd1.lastChild)
              const abcd11 = abcd1.getContext('2d');
              
               popChart1 = new Chart(abcd11, {
                    type: 'line',
                    data: {
                      labels: array_of_date,
                      datasets: [{
                        label: `Total covid cases in ${name_of_country}`,
                        data: array_of_active_cases, 
                        backgroundColor:'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.4
                      }],
                    },
                    options: {
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
              })
              
            }

            chart2()


            function chart6() {
              const abcd5 = document.getElementById('chart5');
              // abcd5.innerHTML = '';
              const abcd51 = abcd5.getContext('2d');
              if (popChart5) {
                popChart5.destroy();
              }

              popChart5 = new Chart(abcd51, {
                    type: 'line',
                    data: {
                      labels: array_of_date,
                      datasets: [{
                        label: `Total deaths cases in ${name_of_country}`,
                        data: array_of_deaths_cases, 
                        backgroundColor:'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.4
                      }],
                    },
                    options: {
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
              })
            }

            chart6()
      
    }
  });


const tooltipDiv = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);



  const get_data1 = async (ele) => {
    if (typeof ele === "undefined") {
      return "";
    } else {
      try {
        let res = await fetch(
          `https://api.covid19api.com/live/country/${ele}/status/confirmed/date/2022-09-10T13:13:30Z`
        );
        return await res.json();
      } catch (err) {
        console.error(err);
      }
    }
  };

world_map.addEventListener("mouseover", async (e) => {
  e.preventDefault();
  const [x, y] = d3.pointer(e);
  const titleHtml = e.path[0];
  let countrynameDiv = document.querySelector(".country-name");
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");
    // console.log(a)
    const name_of_country = a.innerHTML;

    const data1 = await get_data1(name_of_country);

    // console.log(data1)
    // console.log(data1)
    let sum_of_active_cases = 0;
    let no_of_deaths = 0;
    // let country_name;
    for (let i = 0; i < data1.length; i++) {
      // country_name = data1[i].Country;
      sum_of_active_cases += data1[i].Active;
      no_of_deaths += data1[i].Deaths;
    }
    const tooltipData = `<h4>${name_of_country}</h4>  <p>Active cases: ${sum_of_active_cases}</p>`;
    tooltipDiv.transition().duration(200).style("opacity", 0.9);
    tooltipDiv
      .html(tooltipData)
      .style("left", (x) + "px")
      .style("top", (y+100) + "px");
  }
});

world_map.addEventListener("mouseout", async (e) => {
  tooltipDiv.transition().duration(500).style("opacity", 0);
});
