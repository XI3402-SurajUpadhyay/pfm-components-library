import * as d3 from "d3";

/**
 * 
 * @param {Object} props = { data, width, targetId }
 * this.renderChart function is the main public function which get called from the client,
 * renderChart create the DOM structure and append svg node return from the createChart function.
 */

export type SunburstChartProps = {
  data: any,
  width: number,
  targetId: string,
}

export function RenderSunburstChart(this: any, props: SunburstChartProps) {
  console.log('RenderSunburstChart', props);
  
  if (!props.data) {
    throw new Error(
      "data property not found. please pass data prop to the function."
    );
  }

  let data = props.data;
  let width = props.width;
  let targetId = props.targetId;
  let radius = props.width / 6;

  const format = d3.format(",d");

  const partition = (data: any) => {
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a : any, b: any) => b.value - a.value);
    return d3.partition().size([2 * Math.PI, root.height + 1])(root);
  };

  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  ); // returns a function

  const arc = d3
    .arc()
    .startAngle((d: any) => d.x0)
    .endAngle((d: any) => d.x1)
    .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d: any) => d.y0 * radius)
    .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1));



  const createChart = (data:any) => {



    const root = partition(data);

    root.each((d: any) => (d.current = d));

    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, width])
      .style("fill", "black")
      .style("font", "10px sans-serif")
      .style("font-weight", "bold");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d: any) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d : any) =>
        arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d : any) => (arcVisible(d.current) ? "auto" : "none"))

      .attr("d", (d : any) => arc(d.current));

    path
      .filter((d : any) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    path.append("title").text(
      (d : any) =>
        `${d
          .ancestors()
          .map((d : any) => d.data.name)
          .reverse()
          .join("/")}\n${format(d.value)}`
    );

    const label = g
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root)
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d : any) => +labelVisible(d.current))
      .attr("transform", (d : any) => labelTransform(d.current))
      .text((d : any) => d.data.name);

    const parent = g
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(event: any, p: any) {
      console.log(event, p);
      
      parent.datum(p.parent || root);

      root.each(
        (d : any) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t: any = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path
        .transition(t)
        .tween("data", (d : any) => {
          const i = d3.interpolate(d.current, d.target);
          return (t : any) => (d.current = i(t));
        })
        // .filter(function (d : any) {
        //   if(this){
        //     let th:any = this 
        //     return !!Number(th.getAttribute("fill-opacity"))
        //   }
        //   return arcVisible(d.target);
        // })
        .filter(function(d:any) {
          let th:any = this 
          return !!( +th.getAttribute("fill-opacity") || arcVisible(d.target));
        })
        .attr("fill-opacity", (d : any) =>
          arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("pointer-events", (d : any) => (arcVisible(d.target) ? "auto" : "none"))
        .attrTween("d", (d : any) => () => {
          let a = arc(d.current);
          if(a){
            return a
          }
          return ""
        });

      label
        // .filter(function (d : any) {
        //   if(this){
        //     let th:any = this 
        //     return !!Number(th.getAttribute("fill-opacity")) 
        //   }
        //   return labelVisible(d.target);
        // })
        .filter(function(d:any) {
          let th:any = this 
          return !!( +th.getAttribute("fill-opacity") || labelVisible(d.target));
        })
        .transition(t)
        .attr("fill-opacity", (d : any) => +labelVisible(d.target))
        .attrTween("transform", (d : any) => () => labelTransform(d.current));
    }

    function arcVisible(d:any) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  
    function labelVisible(d: any) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  
    function labelTransform(d:any) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    return svg.node();
  };

  const renderChart = () => {
    // if target element is not present in dom, then create it.
    if (!document.getElementById(targetId)) {
      let div = document.createElement("div")
      div.setAttribute("id", targetId)
      document.appendChild(div);
    }

    const target = document.getElementById(targetId);
    if(target){
      const div = document.createElement("div");
      div.style.width = width + 'px';
  
      // here we create the chart
      let svgNode: any = createChart(data)
      div.appendChild(svgNode);
  
      target.replaceChildren(div);
    }
  
  };

  renderChart()
}
