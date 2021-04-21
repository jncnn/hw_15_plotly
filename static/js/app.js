console.log("app.js loaded");
//define the variable
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);
    d3.json("data/samples.json").then(data =>{
        console.log(data);
        var samples =data.samples;
        var resultArray=samples.filter(s=> s.id ==sampleId);
        var result=resultArray[0];
        console.log(result);
        var otu_ids=result.otu_ids;
        var otu_labels=result.otu_labels;
        var sample_values=result.sample_values;
        yticks=otu_ids.slice(0,10).map(otuId=>`OTU ${otuId}`).reverse(); 
        var barData={
            x:sample_values.slice(0,10).reverse(),
            y:yticks,
            type:"bar",
            text:otu_labels.slice(0,10).reverse(),
            orientation:"h"

        }
        var barArray=[barData];
        var barLayout={
            title:"Top 10 Bactria Cultures Found",
            margin:{t:30, l:150}
        }
        Plotly.newPlot("bar",barArray,barLayout);


        //console.log(sample_values)
        // console.log(otu_labels);


    })
}
function DrawBubblegraph(sampleId) {
    console.log(`DrawBubblegraph(${sampleId})`);
}
function ShowMetaData(sampleId) {
    console.log(`ShowMetaData(${sampleId})`);

}

////
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblegraph(newSampleId);
    ShowMetaData(newSampleId);
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

    });






}
InitDashboard();