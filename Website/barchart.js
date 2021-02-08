(function() {

  let activeParkID = 1;
  // let ridesToRemove;
  let currentLands;
  let barChart = null;
  let lineChart = null;
  let selectedRideNumber;
  const disneylandParkAnaheimLands = ["Adventureland", "Critter Country", "Fantasyland", "Frontierland", "Main Street U.S.A.", 
  "Mickey's Toontown", "New Orleans Square", "Star Wars: Galaxy's Edge", "Tomorrowland"];
  const disneyCaliforniaAdventureParkLands = ["Cars Land", "Grizzly Peak", "Hollywood Land", "Pacific Wharf", "Paradise Gardens Park",
  "Pixar Pier"];
  const animalKingdomLands = ["Africa", "Asia", "DinoLand U.S.A.", "Discovery Island", "Oasis", "Pandora - The World of Avatar",
  "Rafiki's Plant Watch"];
  const epcotLands = ["Future World", "World Showcase"];
  const hollywoodStudiosLands = ["Animation Courtyard", "Echo Lake", "Grand Avenue", "Hollywood Boulevard", "Star Wars: Galaxy's Edge",
  "Sunset Boulevard", "Toy Story Land"];
  const magicKingdomLands = ["Adventureland", "Fantasyland", "Frontierland", "Liberty Square", "Main Street U.S.A", "Tomorrowland"];
  const disneylandParkParisLands = ["Adventureland", "Discoveryland", "Fantasyland", "Frontierland", "Main Street U.S.A."];
  const waltDisneyStudiosParkLands = ["Front Lot", "Production Courtyard", "Toon Studio"];
  const disneylandParkHongKongLands = ["Adventureland", "Fantasyland", "Grizzly Gulch", "Main Street U.S.A.", "Mystic Point",
  "Tomorrowland", "Toy Story Land"];
  const shanghaiDisneylandLands = ["Adventure Isle", "Fantasyland", "Gardens of Imagination", "Tomorrowland", "Toy Story Land", 
  "Treasure Cove"];
  const tokyoDisneylandLands = ["Adventureland", "Critter Country", "Fantasyland", "Tomorrowland", "Toontown", "World Bazaar"];
  const tokyoDisneySeaLands = ["American Waterfront", "Arabian Coast", "Lost River Delta", "Mediterranean Harbor", 
  "Mermaid Lagoon", "Mysterious Island", "Port Discovery"];
  
  window.addEventListener("load", setUp);
  window.addEventListener("load", getRideWaitTimes);

  function setUp() { 
    if (document.URL.includes("disneylandparkanaheim")) {
      activeParkID = 1;
      currentLands = disneylandParkAnaheimLands;
    } else if (document.URL.includes("disneycaliforniaadventurepark")) {
      activeParkID = 2;
      currentLands = disneyCaliforniaAdventureParkLands;
    } else if (document.URL.includes("animalkingdom")) {
      activeParkID = 3;
      currentLands = animalKingdomLands;
    } else if (document.URL.includes("epcot")) {
      activeParkID = 4;
      currentLands = epcotLands;
    } else if (document.URL.includes("hollywoodstudios")) {
      activeParkID = 5;
      currentLands = hollywoodStudiosLands;
    } else if (document.URL.includes("magickingdom")) {
      activeParkID = 6;
      currentLands = magicKingdomLands;
    } else if (document.URL.includes("disneylandparkparis")) {
      activeParkID = 7;
      currentLands = disneylandParkParisLands;
    } else if (document.URL.includes("waltdisneystudiospark")) {
      activeParkID = 8;
      currentLands = waltDisneyStudiosParkLands;
    } else if (document.URL.includes("disneylandparkhongkong")) {
      activeParkID = 9;
      currentLands = disneylandParkHongKongLands;
    } else if (document.URL.includes("shanghaidisneyland")) {
      activeParkID = 10;
      currentLands = shanghaiDisneylandLands;
    } else if (document.URL.includes("tokyodisneyland")) {
      activeParkID = 11;
      currentLands = tokyoDisneylandLands;
    } else if (document.URL.includes("tokyodisneysea")) {
      activeParkID = 12;
      currentLands = tokyoDisneySeaLands;
    }
    getLandWaitTimes();
    let dateSelector = document.querySelector("#selectDate select");
    dateSelector.addEventListener("change", function() {
      getLandWaitTimes();
    });
    let timeSelector = document.querySelector("#selectTime select");
    timeSelector.addEventListener("change", function() {
      getLandWaitTimes();
    });
  }

  function getRideWaitTimes() {
    let url;
    switch (activeParkID) {
      case 1:
        url = "https://hidden-basin-72625.herokuapp.com/disneylandparkanaheimwaittimes";
        break;
      case 2:
        url = "https://hidden-basin-72625.herokuapp.com/disneycaliforniaadventureparkwaittimes";
        break;
      case 3:
        url = "https://hidden-basin-72625.herokuapp.com/animalkingdomwaittimes";
        break;
      case 4:
        url = "https://hidden-basin-72625.herokuapp.com/epcotwaittimes";
        break;
      case 5:
        url = "https://hidden-basin-72625.herokuapp.com/hollywoodstudioswaittimes";
        break;
      case 6:
        url = "https://hidden-basin-72625.herokuapp.com/magickingdomwaittimes";
        break;
      case 7:
        url = "https://hidden-basin-72625.herokuapp.com/disneylandparkpariswaittimes";
        break;
      case 8:
        url = "https://hidden-basin-72625.herokuapp.com/waltdisneystudiosparkwaittimes";
        break;
      case 9:
        url = "https://hidden-basin-72625.herokuapp.com/disneylandparkhongkongwaittimes";
        break;
      case 10:
        url = "https://hidden-basin-72625.herokuapp.com/shanghaidisneylandwaittimes";
        break;
      case 11:
        url = "https://hidden-basin-72625.herokuapp.com/tokyodisneylandwaittimes";
        break;
      case 12:
        url = "https://hidden-basin-72625.herokuapp.com/tokyodisneyseawaittimes";
        break;
    }
    fetch(url)
        .then(response => response.json())
        .then(getAllIndividualWaitTimes);
  }

  function getAllIndividualWaitTimes(responseData) {
    for (let i = 0; i < responseData.length; i++) {
        console.log(responseData[i].name + " " + responseData[i].waitTime);
    }
    let allRidesImages = document.getElementsByClassName("rideImage");
    let allRideNames = document.getElementsByClassName("rideName");
    for (let i = 0; i < allRidesImages.length; i++) {
        allRidesImages[i].addEventListener("click", function() {
            selectedRideNumber = i;
            setTimeout(displayCurrentIndividualRideWaitTime, 350, responseData[i].waitTime);
            getIndividualPredictedWaitTime(allRideNames[i].innerHTML.replace("&amp;", "&"));
        }, {once : true});
    }
  }

  function displayCurrentIndividualRideWaitTime(num) {
    let trailColor;
    let backgroundColor= "#fff";
    if (num == 0) {
      backgroundColor = "#FF0000";
    }
    if (num <= 30) {
        trailColor = "#39ff14";

    } else if (num > 30 && num <= 60) {
        trailColor = "#FFFF00";
    } else {
        trailColor = "#FF0000";
    }
    animateTimeCircle(num, trailColor, backgroundColor, selectedRideNumber);
  }

  function getIndividualPredictedWaitTime(rideName) {
    let dateSelector = document.querySelector("#selectDate select");
    let day = dateSelector.options[dateSelector.selectedIndex].text.split(" ")[0];
    let url = "https://hidden-basin-72625.herokuapp.com/individualtime/" + rideName + "/" + activeParkID + "/" + day;
    fetch(url)
      .then(response => response.json())
      .then(displayPredictedIndividualWaitTime);
  }
  
  function displayPredictedIndividualWaitTime(predictedRideWaitTimes) {
    let allRideLineCharts = document.getElementsByClassName("predictedTime");
    let CHART = allRideLineCharts[selectedRideNumber];
    let newLineChart = new Chart(CHART, {
       type: 'line',
       data: {
           labels: ["9:00am", "12:00pm", "3:00pm", "6:00pm", "9:00pm", "12:00am"],
           datasets: [
               {
                   label: "Today's Predicted Wait Time (mins)",
                   data: predictedRideWaitTimes,
                   borderWidth: 2,
                   borderColor: "#33BBFF",
               },
           ]
       },
       options: {
         legend: {
           labels: {
             fontColor: "white",
             fontSize: 15
           }
         },
         scales: {
           yAxes: [{
             ticks: {
               fontColor: "white",
               fontSize: 15
             },
             gridLines: {
               lineWidth: 0
             }
           }],
           xAxes: [{
             ticks: {
               fontColor: "white",
               fontSize: 15
             },
             gridLines: {
               
               color: "white",
               display: false
             }
           }]
         }
       }
   });
   lineChart = newLineChart; 
  }

  function getLandWaitTimes() {
    let dateSelector = document.querySelector("#selectDate select");
    let day = dateSelector.options[dateSelector.selectedIndex].text.split(" ")[0];
    let timeSelector = document.querySelector("#selectTime select");
    let time = timeSelector.options[timeSelector.selectedIndex].text;
    time = time.replace(" ", "");
    time = time.replace(":", "");
    let url = "https://hidden-basin-72625.herokuapp.com/landtimes/" + day + "/" + time + "/" + activeParkID;
    fetch(url)
      .then(response => response.json())
      .then(displayAverageWaitTimesByLand);
  }

  function displayAverageWaitTimesByLand(averageLandTimes) {
    if (barChart != null) {
      barChart.destroy();
    }
    let tempAverageLandTimes = [];
    let newTempAverageLandTimes = tempAverageLandTimes.concat(averageLandTimes);
    newTempAverageLandTimes.sort(function(a, b) {
      return a - b;
    });
    let splitAverageLandTimesArray = splitAverageLandTimes(newTempAverageLandTimes);
    let highBackgroundColor = "rgb(255,0,0, 0.4)";
    let highBorderColor = "#FF0000";
    let mediumBackgroundColor = "rgb(255,255,0,0.4)";
    let mediumBorderColor = "#FFFF00";
    let lowBackgroundColor = "rgb(0,255,0,0.4)";
    let lowBorderColor = "#32CD32";
    let backgroundColors = [];
    let borderColors = [];
    for (let i = 0; i < averageLandTimes.length; i++) {
      if (splitAverageLandTimesArray[0].includes(averageLandTimes[i])) {
        backgroundColors.push(lowBackgroundColor);
        borderColors.push(lowBorderColor);
      } else if (splitAverageLandTimesArray[1].includes(averageLandTimes[i])) {
        backgroundColors.push(mediumBackgroundColor);
        borderColors.push(mediumBorderColor);
      } else {
        backgroundColors.push(highBackgroundColor);
        borderColors.push(highBorderColor);
      }
    }
    averageLandTimes.push(0);
    let CHART = document.getElementById("barChart");
    let newBarChart = new Chart(CHART, {
       type: 'bar',
       data: {
           labels: currentLands,
           datasets: [
               {
                   label: "Predicted Average Wait Time (mins)",
                   data: averageLandTimes,
                   borderWidth: 2,
                   borderColor: borderColors,
                   backgroundColor: backgroundColors
               },
           ]
       },
       options: {
         legend: {
           labels: {
             fontColor: "white",
             fontSize: 20
           }
         },
         scales: {
           yAxes: [{
             ticks: {
               fontColor: "white",
               fontSize: 20
             },
             gridLines: {
               color: " #33BBFF",
               lineWidth: 1
             }
           }],
           xAxes: [{
             ticks: {
               fontColor: "white",
               fontSize: 20
             },
             gridLines: {
               color: "white",
               display: false
             }
           }]
         }
       }
   });
   barChart = newBarChart;
  }

  function splitAverageLandTimes(newTempAverageLandTimes) {
    let n = 3;
    let result = [[], [], []];
    let numsPerArray = Math.ceil(newTempAverageLandTimes.length / 3);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < numsPerArray; j++) {
        let value = newTempAverageLandTimes[j + i * numsPerArray];
        result[i].push(value);
      }
    }
    return result;
  }

}) ();