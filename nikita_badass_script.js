/**
 * Created by Insolia on 30.03.17.
 */

var REPEATING_HTML = "<div class='view view-first'>" +
    "<img src='!!!link!!!'>"+
    "<div class='mask'>"+
    "<h2>{%year%}</h2>"+
    "<p>{%album%}</p>" +
    "</div>"+
    "</div>";

function hexToRgb(hex) {
    hex = hex.substring(1, hex.length);
    var r = parseInt((hex).substring(0, 2), 16);
    var g = parseInt((hex).substring(2, 4), 16);
    var b = parseInt((hex).substring(4, 6), 16);

    return [r, g, b];
}

function colorDistance(color1, color2) {
    // This is actually the square of the distance but
    // this doesn't matter for sorting.

    color1 = hexToRgb(color1);
    color2 = hexToRgb(color2);
    var result = 0;
    for (var i = 0; i < color1.length; i++)
        result += (color1[i] - color2[i]) * (color1[i] - color2[i]);
    return result;
}

function sort_json_objects_by_color(jsonArray){
    jsonArray.sort(function(obj1, obj2){
        return colorDistance(obj1.average_color, obj2.average_color)
    })
    return jsonArray
}

function buildPage(jsonArray){
    document.getElementById("sort").innerHTML = ""
    for (var i = 0; i < jsonArray.length; i++){
        var pisece_of_shit = REPEATING_HTML;
        pisece_of_shit = pisece_of_shit.replace('!!!link!!!',jsonArray[i]["link"]);
        pisece_of_shit = pisece_of_shit.replace('{%album%}',jsonArray[i].album);
        pisece_of_shit = pisece_of_shit.replace('{%year%}',jsonArray[i].year);

        document.getElementById("sort").innerHTML += pisece_of_shit;
    }
}

$(document).ready(function(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage(data)
    });
});

function build_sorted_colores_page(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage(sort_json_objects_by_color(data))
    });
}

