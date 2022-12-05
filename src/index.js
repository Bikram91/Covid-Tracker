// The svg

const width = 900;
const height = 600; 
    
const svg = d3.select("svg").attr("width", width).attr("height", height);

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.5])

// Load external data and boot
let map_data = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")


    // Draw the map
    map_data.then(function(data) {
    const countries = svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr('class', 'map')
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .append('country')
            .text(d => (d.properties.name))
    });

    // const tooltipDiv = d3.select("svg").append("div")    
    // .attr("class", "tooltip")               
    // .style("opacity", 0);


    
    
    let map = document.querySelector("#my_dataviz")
    map.addEventListener("click",  async (e) => {
        e.preventDefault();
        const titleHtml = e.path[0];
        let dataDiv = document.querySelector("#data"); 
        let deathsDiv = document.querySelector("#deaths"); 
        let countrynameDiv = document.querySelector(".country-name"); 
        // console.log(e)
        // console.log(e.path[1])
        if (e.target.tagName === 'path') {

            const a = titleHtml.querySelector("country");
            console.log(a)
            const name_of_country = a.innerHTML;

            const data1 = await (get_data(name_of_country));
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
            
                countrynameDiv.innerHTML = `Country: ${name_of_country}`
                dataDiv.innerHTML = `Active cases: ${sum_of_active_cases}`;
                deathsDiv.innerHTML = `Deaths cases: ${no_of_deaths}`;
        } else {
            dataDiv.innerHTML = '';
            deathsDiv.innerHTML = '';
            countrynameDiv.innerHTML = '';

        }
    });   
    
    
    
    const get_data = async (ele) => {
        if (typeof ele === 'undefined') {
            return '';
        } else {
                try{
                    let res = await fetch(`https://api.covid19api.com/live/country/${ele}/status/confirmed/date/2022-09-10T13:13:30Z`);
                    return await res.json();
                } catch(err) {
                    console.error(err);
                }
            }
    }





    

    



    
    

    



