import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
    state = {
      selectedColor: "Sentiment"
    }

  componentDidMount() {
    //console.log("Data: ", this.props.csv_data)
    //this.renderChart();
  }

  componentDidUpdate() {
    //console.log("Data: ", this.props.json_data)
    this.renderChart();
  }

  renderChart(){
    var originalData = this.props.json_data
    var data = originalData.slice(0, 300);
    //console.log("Data: ", data)

    var marchData = [];
    var aprilData = [];
    var mayData = [];

    for(var i = 0; i < data.length; i++){
      if(data[i].Month === 'March'){
        marchData.push(data[i])
      }
      else if(data[i].Month === 'April'){
        aprilData.push(data[i])
      }
      else if(data[i].Month === 'May'){
        mayData.push(data[i])
      }
    }

    const sentimentColorScale = d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"]);
    const sentimentColors = ["green", "#ECECEC","red"];
    const subjectivityColorScale = d3.scaleLinear().domain([0,1]).range(["#ECECEC","#4467C4"]);
    const subjectivityColors = ["#4467C4", "#ECECEC"];

    const svg = d3.select("#mysvg")
    const labels = d3.select("#labels")
    const legend = d3.select("#legend")
    
    if(svg.selectAll("g").empty()){
      labels.append("text")
        .attr("y", 150).style("font-size", "18px")
        .style("font-weight", "bold").text("March")
      labels.append("text")
        .attr("y", 300).style("font-size", "18px")
        .style("font-weight", "bold").text("April")
      labels.append("text")
        .attr("y", 450).style("font-size", "18px")
        .style("font-weight", "bold").text("May")

      const marchNode = svg.append("g")
        .selectAll("circle")
        .data(marchData)
        .join("circle")
        .attr("r", 4)
        .attr("stroke", "none")
        .on("click", function(event, d){
          console.log(d.idx)
          const currentStroke = d3.select(this).attr('stroke');
          const div = d3.select("#tweets");
          const p = div.select(`p.circle-${d.idx}`);
          if (p.empty()) {
            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${(i+1) * 125}px`);
            });
            div.append("p")
              .attr("class", `circle-${d.idx}`)
              .text(d.RawTweet)
            
          } else {
            p.remove();

            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${i * 125}px`);
            });
          }

          if (currentStroke === 'none') {
            d3.select(this).attr('stroke', 'black');
          } 
          else {
            d3.select(this).attr('stroke', 'none');
          }
        });

      d3.forceSimulation(marchData)
        .on("tick", tick)
        .force("collide", d3.forceCollide(5))
        .force("x", d3.forceX(500).strength(0.009))
        .force("y", d3.forceY(150).strength(0.2))

      const aprilNode = svg.append("g")
        .selectAll("circle")
        .data(aprilData)
        .join("circle")
        .attr("r", 4)
        .attr("stroke", "none")
        .on("click", function(event, d){
          console.log(d.idx)
          const currentStroke = d3.select(this).attr('stroke');
          const div = d3.select("#tweets");
          const p = div.select(`p.circle-${d.idx}`);
          if (p.empty()) {
            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${(i+1) * 125}px`);
            });
            div.append("p")
              .attr("class", `circle-${d.idx}`)
              .text(d.RawTweet)
            
          } else {
            p.remove();

            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${i * 125}px`);
            });
          }

          if (currentStroke === 'none') {
            d3.select(this).attr('stroke', 'black');
          } 
          else {
            d3.select(this).attr('stroke', 'none');
          }
        });
  
      d3.forceSimulation(aprilData)
        .on("tick", tick)
        .force("collide", d3.forceCollide(5))
        .force("x", d3.forceX(500).strength(0.009))
        .force("y", d3.forceY(300).strength(0.2))

      const mayNode = svg.append("g")
        .selectAll("circle")
        .data(mayData)
        .join("circle")
        .attr("r", 4)
        .attr("stroke", "none")
        .on("click", function(event, d){
          console.log(d.idx)
          const currentStroke = d3.select(this).attr('stroke');
          const div = d3.select("#tweets");
          const p = div.select(`p.circle-${d.idx}`);
          if (p.empty()) {
            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${(i+1) * 125}px`);
            });
            div.append("p")
              .attr("class", `circle-${d.idx}`)
              .text(d.RawTweet)
            
          } else {
            p.remove();

            div.selectAll("p").each(function(d, i) {
              d3.select(this).style("top", `${i * 125}px`);
            });
          }

          if (currentStroke === 'none') {
            d3.select(this).attr('stroke', 'black');
          } 
          else {
            d3.select(this).attr('stroke', 'none');
          }
        });
    
      d3.forceSimulation(mayData)
        .on("tick", tick)
        .force("collide", d3.forceCollide(5))
        .force("x", d3.forceX(500).strength(0.009))
        .force("y", d3.forceY(450).strength(0.2))

      function tick() {
        marchNode.attr("cx", d => d.x).attr("cy", d => d.y);
        aprilNode.attr("cx", d => d.x).attr("cy", d => d.y);
        mayNode.attr("cx", d => d.x).attr("cy", d => d.y);
      }

      legend.append("rect")
        .attr("height", 300).attr("width", 30).attr("y", 150)
      
      var sentimentGradient = legend.append('defs')
        .append('linearGradient')
        .attr('id', 'sentimentGradient')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');
      sentimentGradient.selectAll('stop')
        .data(sentimentColors)
        .enter()
        .append('stop')
        .style('stop-color', function(d){ return d; })
        .attr('offset', function(d,i){
          return 100 * (i / (sentimentColors.length - 1)) + '%';
        })
  
      var subjectivityGradient = legend.append('defs')
        .append('linearGradient')
        .attr('id', 'subjectivityGradient')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');
      subjectivityGradient.selectAll('stop')
        .data(subjectivityColors)
        .enter()
        .append('stop')
        .style('stop-color', function(d){ return d; })
        .attr('offset', function(d,i){
          return 100 * (i / (subjectivityColors.length - 1)) + '%';
        })

      legend.append("text")
        .attr("x", 35).attr("y", 162)
        .attr("class","text1").style("font-size", "14px")

      legend.append("text")
        .attr("x", 35).attr("y", 447)
        .attr("class","text2").style("font-size", "14px")
    }


    var circles = svg.selectAll("g").selectAll("circle");

    if(this.state.selectedColor === "Sentiment"){
      circles.attr("fill", function(d){
        return sentimentColorScale(d.Sentiment)
      });

      legend.select("rect")
        .style('fill', 'url(#sentimentGradient)');
      legend.select(".text1").text("Postive")
      legend.select(".text2").text("Negative")
    }
    else{
      circles.attr("fill", function(d){
        return subjectivityColorScale(d.Subjectivity)
      });

      legend.select("rect")
        .style('fill', 'url(#subjectivityGradient)');
      legend.select(".text1").text("Subjective")
      legend.select(".text2").text("Objective")
    }
  }

  render() {
    return (
      <div className="child1">
        <div className="dropdown">
          <b fontSize="18px">Color By: </b>
          <input type="radio" name="selectedColor" value={'Sentiment'} onChange={e=>this.setState({selectedColor : e.target.value})}/>{'Sentiment'}
          <input type="radio" name="selectedColor" value={'Subjectivity'} onChange={e=>this.setState({selectedColor : e.target.value})}/>{'Subjectivity'}
        </div>

        <div className="graph">
          <svg id="labels" width="100" height="700">
          </svg>
          <svg id="mysvg" width="500" height="700">
          </svg>
          <svg id="legend" width="100" height="700">
          </svg>
        </div>

        <div id="tweets">

        </div>

      </div>
    );
  }
}

export default Child1;
