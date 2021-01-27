




(function() {

    
   window.addEventListener("load", foo);

   function foo() {
    const CHART = document.getElementById("lineChart");
    console.log(CHART);
    let barChart = new Chart(CHART, {
        type: 'bar',
        data: {
            labels: ["Adventureland", "Critter Country", "Fantasyland", "Frontierland", "Main Street U.S.A.", 
                    "Mickey's Toontown", "New Orleans Square", "Star Wars: Galaxy's Edge", "Tomorrowland"],
            datasets: [
                {
                    label: "Average Wait Time (mins)",
                    data: [30, 20, 55, 30, 25, 15, 35, 40, 5, 0],
                    borderWidth: 2,
                    borderColor: ["#ff0000", "#FFFF00", "#008000", "#008000", "#008000", "#008000", "#008000", "#008000", "#008000"],
                    backgroundColor: ["rgb(255,0,0, 0.4)", "rgb(255,255,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)", "rgb(0,128,0,0.4)"]
                }
            ]
        }
    });
   }

}) ();
