console.log("app.js loaded");
//define the variable
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);
}
function DrawBubblegraph(sampleId) {
    console.log(`DrawBubblegraph(${sampleId})`);
}
function ShowMetaData(sampleId) {
    console.log(`ShowMetaData(${sampleId})`);
    
}

////
function optionChanged(newSampleId){
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblegraph(newSampleId);
    ShowMetaData(newSampleId);
}
// from office hours with Dom
function  InitDashboard() {
    console.log("InitDashboard()");
//populate dropdow
var selector=d3.select("#selDataset");
d3.json("data/samples.json").then(data=> {
    console.log(data);

    var sampleNames=data.names;
    sampleNames.forEach(sampleId=>{
        selector.append("option").
        text(sampleId).
        property("value",sampleId);


    });
    var id =sampleNames[0];

    DrawBargraph(id);
    DrawBubblegraph(id);
    ShowMetaData(id);

});

//update the bargraph
//update the bubble charts
//update the demographic info




}
InitDashboard();