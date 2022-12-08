import navSlide from "./scripts/navbar";
import chart1 from "./scripts/chartdata";

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
let countryName = document.querySelector("#country-name");
let countryTotalCases = document.querySelector("#country-total-cases");
let countryTotalDeaths = document.querySelector("#country-total-deaths");
let array_of_active_cases = [];
let array_of_date = [];
let array_of_deaths_cases = [];
let popChart1;
let popChart5;
countryName.innerHTML = "Globally";
countryTotalCases.innerHTML = "Total Active Cases: 651,595,573";
countryTotalDeaths.innerHTML = "Total Deaths: 6,652,007";

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

world_map.addEventListener("click", async (e) => {
  e.preventDefault();
  array_of_active_cases = [];
  array_of_deaths_cases = [];
  array_of_date = [];
  const titleHtml = e.path[0];
  let dataDiv = document.querySelector("#data");
  let deathsDiv = document.querySelector("#deaths");
  let countrynameDiv = document.querySelector(".country-name");
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");
    const name_of_country = a.innerHTML;
    countryName.innerHTML = name_of_country;
    const data2 = await get_data1(name_of_country);

    let sum_of_active_cases = 0;
    let no_of_deaths = 0;
    for (let i = 0; i < data2.length; i++) {
      sum_of_active_cases += data2[i].Active;
      no_of_deaths += data2[i].Deaths;
    }
    countryTotalCases.innerHTML = `Total Active Cases: ${sum_of_active_cases}`;
    countryTotalDeaths.innerHTML = `Total Deaths: ${no_of_deaths}`;
    const data1 = await get_data(name_of_country);
    for (let i = 0; i < data1.length - 91; i += 90) {
      array_of_active_cases.push(data1[i].Confirmed);

      array_of_date.push(data1[i].Date.slice(0, 10));
      array_of_deaths_cases.push(data1[i].Deaths);
    }

    function chart2() {
      const chart1Div = document.getElementById("chart1");
      if (popChart1) {
        popChart1.destroy();
      }
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

    chart2();

    function chart6() {
      const abcd5 = document.getElementById("chart5");
      const abcd51 = abcd5.getContext("2d");
      if (popChart5) {
        popChart5.destroy();
      }

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

    chart6();
  }
});

const tooltipDiv = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("width", "fit-content");

world_map.addEventListener("mouseover", async (e) => {
  e.preventDefault();
  const [x, y] = d3.pointer(e);
  const titleHtml = e.path[0];
  let countrynameDiv = document.querySelector(".country-name");
  if (e.target.tagName === "path") {
    const a = titleHtml.querySelector("country");
    const name_of_country = a.innerHTML;

    const data1 = await get_data1(name_of_country);

    let sum_of_active_cases = 0;
    let no_of_deaths = 0;
    for (let i = 0; i < data1.length; i++) {
      sum_of_active_cases += data1[i].Active;
      no_of_deaths += data1[i].Deaths;
    }
    const tooltipData = `<h4>${name_of_country}</h4>  <p>Active cases: ${sum_of_active_cases}</p><p>Total Deaths: ${no_of_deaths}</p>`;
    tooltipDiv.transition().duration(200).style("opacity", 0.9);
    tooltipDiv
      .html(tooltipData)
      .style("left",  x + 200 + "px")
      .style("top", y+ 100+ "px");
  }
});

world_map.addEventListener("mouseout", async (e) => {
  tooltipDiv.transition().duration(500).style("opacity", 0);
});
