//Example of options ={hidden:false,locked:true,panel:false}
var options = { hidden:false, responsive: true, width: 1600, height: 900 }

function initVideoJS(){
    mplayer=videojs("preview-player");
    mplayer.rangeslider(options);
}        
 
function playBetween(){
    var start,end;
    start = document.getElementById('Start').value;
    end = document.getElementById('End').value;
    mplayer.playBetween(start,end);
}
function loopBetween() {
    var start = document.getElementById('Start').value;
    var end = document.getElementById('End').value;
    mplayer.loopBetween(start, end);
}
function getValues(){
    var values = mplayer.getValueSlider();
    console.log(values);
    document.getElementById('Start').value=videojs.round(values.start,2);
    document.getElementById('End').value=videojs.round(values.end,2);
}

function showhide(){
    var plugin=mplayer.rangeslider.options;
    if(plugin.hidden)
        mplayer.showSlider();
    else
        mplayer.hideSlider();
}
function lockunlock(){
    var plugin=mplayer.rangeslider.options;
    if(plugin.locked)
        mplayer.unlockSlider();
    else
        mplayer.lockSlider();
}
function showhidePanel(){
    var plugin=mplayer.rangeslider.options;
    if(!plugin.panel)
        mplayer.showSliderPanel();
    else
        mplayer.hideSliderPanel();
}
function showhideControlTime(){
    var plugin=mplayer.rangeslider.options;
    if(!plugin.controlTime)
        mplayer.showControlTime();
    else
        mplayer.hideControlTime();
}

document.addEventListener("DOMContentLoaded", function(event) { 
    initVideoJS();
});