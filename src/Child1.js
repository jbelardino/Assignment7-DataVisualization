import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = { 

  };

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

    //console.log(marchData)
    //console.log(aprilData)
    //console.log(mayData)

    const sentimentColorScale = d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"]);
    const subjectivityColorScale = d3.scaleLinear().domain([0,1]).range(["#ECECEC","#4467C4"]);

    // Set the dimensions of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = 700,
    height = 700,
    innerWidth = 700 - margin.left - margin.right,
    innerHeight = 700 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select("#mysvg")
      .attr("width", width)
      .attr("height", height)
      .select("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // //Set the scales for the axes
    // const x_Scale = d3.scaleTime()
    //   .domain(d3.extent(data, (d) => d.Date))
    //   .range([0, innerWidth]);

    // const y_Scale = d3.scaleLinear()
    //   .domain([-100,500])
    //   .range([innerHeight, 0]);

    // // Add the X axis using join
    // svg
    //   .selectAll(".x.axis")
    //   .data([null])
    //   .join("g")
    //   .attr("class", "x axis")
    //   .attr("transform", `translate(0,${innerHeight})`)
    //   .call(d3.axisBottom(x_Scale).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b")));
    
      // //legend
      // const legend = d3.select("#mylegend")
      // .attr("width", 100)
      // .attr("height", 100)
      // .attr("transform", `translate(0,-100)`);

      // legend.append("rect")
      //   .attr("x",0).attr("y",0)
      //   .attr("width", 15).attr("height", 15).style("fill", "#ff7f00")
  }

  render() {
    return (
      <div className="child1">
        <div className="graph">
          <svg id="mysvg">
            <g></g>
          </svg>
          <svg id="mylegend">
          </svg>
          
        </div>
      </div>
    );
  }
}

export default Child1;
