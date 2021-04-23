console.log("app.js loaded");
// beginning of bar graph //
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);
    d3.json("data/samples.json").then(data => {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"

        }
        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bactria Cultures Found",
            margin: { t: 30, l: 150 }
        }
        Plotly.newPlot("bar", barArray, barLayout);

    })
}
//end of the bar graph
// beginning of bubblegraph
function DrawBubblegraph(sampleId) {
    console.log(`DrawBubblegraph(${sampleId})`);
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObj => sampleObj.id == sampleId);
        var result = resultsArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log("sample values: ", sample_values);

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        var bubbleLayout =
        {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}
//end of the bubble graph

//beginning of showmetadata
function ShowMetaData(sampleId) {
    console.log(`ShowMetaData(${sampleId})`);
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        var demogTable = d3.select("#sample-metadata");

        // clear the tablet for each selection
        demogTable.html("");


        // use the key/value pair to populate the demographic table
        Object.entries(result).forEach(([key, value]) => {
            var infoItem = `${key.toUpperCase()}: ${value}`;
            demogTable.append("h6").text(infoItem);
        });
    });
}
//end of showmetadata
// gauge chart and it is not working right now???
function drawGaugeChart(id) {
    console.log("Drawing gauge chart using sample: ", id);
    d3.json("data/samples.json").then((data) => 
    {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        var result = resultArray[0];
        var wfreq = result.wfreq;
        var guageData = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: wfreq,
                title: { text: "Weekly Washing Frequency Gauge", font: { size: 20 }, color: "Red" },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "green" },
                    bar: { color: "Red" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",

                    steps: [
                        { range: [0, 1], color: "white" },
                        { range: [1, 2], color: "whitesmoke" },
                        { range: [2, 3], color: "beige" },
                        { range: [3, 4], color: "lightyellow" },
                        { range: [4, 5], color: "yellow" },
                        { range: [5, 6], color: "lightgreen" },
                        { range: [6, 7], color: "yellowgreen" },
                        { range: [7, 8], color: "green" },
                        { range: [8, 9], color: "darkgreen" }

                    ]
                }
            }
        ];

        var gaugeLayout = {
            width: 400,
            height: 300,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "red", family: "Arial" }
        };
        Plotly.newPlot('gauge', guageData, gaugeLayout);
    });
}

//end of the gauge chart not working yet...
// from office hour with dom
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblegraph(newSampleId);
    ShowMetaData(newSampleId);
    drawGaugeChart(newSampleId);
}
// from office hours with Dom
function InitDashboard() {
    console.log("InitDashboard()");
    //populate dropdow
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;
        sampleNames.forEach(sampleId => {
            selector.append("option").
                text(sampleId).
                property("value", sampleId);


        });
        var id = sampleNames[0];
        //draw the graphs
        DrawBargraph(id);
        DrawBubblegraph(id);
        ShowMetaData(id);
        drawGaugeChart(id);
    });
}
InitDashboard();
//end of code from office hour with Dom