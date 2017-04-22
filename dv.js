class DV {

    constructor(svg){
        this.nodes = [];
        this.svg = svg;
    }

    loadFromLocalStorage(key){
        var str = localStorage[key];
        var nodes =  JSON.parse(str);
        for(var i = 0; i < nodes.length; i++){
            this.addNode(nodes[i]);
        }
    }

    addNode(n){
        this.nodes.push(n);
        n.setContainer(this.svg);
    }

}

class Node {
    
    constructor(){
        this.container = null;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;

        var thisref = this;

        // init element
        //var e = d3.select(document.createElementNS("http://www.w3.org/2000/svg", 'g'))
        var e = d3.select('body').append('svg:g')
                .attr("class", "node")
                .attr('transform', 'translate(' + this.x + ',' + this.y + ')')
                .remove();
        e.append('rect')
            .attr("class", "node-background")
             .attr("width", this.width)
              .attr('height', this.height)
              .call(d3.drag().on("drag", function(){thisref.move(d3.event.sourceEvent.x, d3.event.sourceEvent.y)}));
        e.append('rect')
            .attr("class", "node-resize")
            .attr("x", this.width -5)
            .attr("y", this.height -5)
             .attr("width", 10)
              .attr('height', 10)
              .call(d3.drag().on("drag", function(){
                  var w = d3.event.sourceEvent.x - thisref.x;
                  var h = d3.event.sourceEvent.y - thisref.y;
                  w = w > 50 ? w : 50;
                  h = h > 50 ? h : 50;
                  thisref.resize(w, h);
                }));
           
        this.element = e;



    }

    setContainer(c){
        this.container = c;
        c.node().appendChild(this.element.node());
    }

    move(newX, newY){
        this.x = newX;
        this.y = newY;
        this.element.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
    }

    resize(w, h){
        this.width = w;
        this.height = h;
        this.element.select('.node-background')
                .attr("width", this.width)
                .attr('height', this.height);
        this.element.select('.node-resize')
                .attr("x", this.width -5)
                .attr("y", this.height -5);
    }

}

class ScriptNode extends Node{
    constructor(){
        this.script = null;
    }

    setScript(str){
        this.script = str;
    }

    run(){

    }
}

class DataNode extends Node {
    constructor(){
        this.data
    }
    
    getData(){

    }

}
