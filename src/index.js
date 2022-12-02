// The svg

const width = 900;
const height = 600; 
    
const svg = d3.select("svg").attr("width", width).attr("height", height);

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.5])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( function(data) {

    // Draw the map
    const countries = svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr('class', 'country')
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            
})