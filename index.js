window.onload = function(){
    var svg = d3.select('#svg');
    var dv = new DV(svg);

    var n = new Node();
    dv.addNode(n);
};

