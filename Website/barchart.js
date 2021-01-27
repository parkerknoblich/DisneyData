(function() {

  let activeParkID = 1;
  let ridesToRemove;
  let currentLands;
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
  const disneylandParkAnaheimRidesToRemove = ["Encounter the Dark Side at Star Wars Launch Bay", "Fantasmic!", "Meet Disney Princesses at Royal Hall",
  "Meet the Resistance at Star Wars Launch Bay", "Meet Tinker Bell at Pixie Hollow", "Mickey and the Magical Map"];
  const disneyCaliforniaAdventureParkRidesToRemove = ["Disney Junior Dance Party!", "Frozen – Live at the Hyperion", "Heroic Encounter: Captain Marvel", 
  "Walt Disney Imagineering Blue Sky Cellar", "World of Color"];
  const animalKingdomRidesToRemove = ["Meet Favorite Disney Pals at Adventurers Outpost", "Nomad Lounge",
  "The Animation Experience at Conservation Station", "The Boneyard", "Tiffins Restaurant"];

  window.addEventListener("load", setUp);
  window.addEventListener("load", getWaitTimes);

  function setUp() {  
    if (document.URL.includes("disneylandparkanaheim")) {
      activeParkID = 1;
      currentLands = disneylandParkAnaheimLands;
      ridesToRemove = disneylandParkAnaheimRidesToRemove;
    } else if (document.URL.includes("disneycaliforniaadventurepark")) {
      activeParkID = 2;
      currentLands = disneyCaliforniaAdventureParkLands;
      ridesToRemove = disneyCaliforniaAdventureParkRidesToRemove;
    } else if (document.URL.includes("animalkingdom")) {
      activeParkID = 3;
      currentLands = animalKingdomLands;
      ridesToRemove = animalKingdomRidesToRemove;
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
    displayAverageWaitTimes();
  }

  function getWaitTimes() {
    let url;
    switch (activeParkID) {
      case 1:
        url = "http://localhost:8000/disneylandparkanaheimwaittimes";
        break;
      case 2:
        url = "http://localhost:8000/disneycaliforniaadventureparkwaittimes";
        break;
      case 3:
        url = "http://localhost:8000/animalkingdomwaittimes";
        break;
      case 4:
        url = "http://localhost:8000/epcotwaittimes";
        break;
      case 5:
        url = "http://localhost:8000/hollywoodstudioswaittimes";
        break;
      case 6:
        url = "http://localhost:8000/magickingdomwaittimes";
        break;
      case 7:
        url = "http://localhost:8000/disneylandparkpariswaittimes";
        break;
      case 8:
        url = "http://localhost:8000/waltdisneystudioswaittimes";
        break;
      case 9:
        url = "http://localhost:8000/disneylandparkhongkongwaittimes";
        break;
      case 10:
        url = "http://localhost:8000/shanghaidisneylandwaittimes";
        break;
      case 11:
        url = "http://localhost:8000/tokyodisneylandwaittimes";
        break;
      case 12:
        url = "http://localhost:8000/tokyodisneyseawaittimes";
        break;
    }
    fetch(url)
        .then(response => response.json())
        .then(function(response) {
            return response.sort(sortRides("name"))
        })
        .then(function(response) {
          return filterRides(response);
        })
        .then(displayWaitTimes);
  }

  function sortRides(key) {
      return function(a, b) {
          return a[key].replace(/\W/g, '').localeCompare(b[key].replace(/\W/g, ''));
      }
  }

  function filterRides(responseData) {
      let filteredArray = [];
      for (let i = 0; i < responseData.length; i++) {
        if (!ridesToRemove.includes(responseData[i].name.replace(" - Temporarily Unavailable", ""))) {
            filteredArray.push(responseData[i]);
        }
      }
      console.log(filteredArray);
      return filteredArray;
  }

  function displayWaitTimes(responseData) {
    for (let i = 0; i < responseData.length; i++) {
        console.log(responseData[i].name + " " + responseData[i].waitTime);
    }
    let allRidesImages = document.getElementsByClassName("rideImage");
    for (let i = 0; i < allRidesImages.length; i++) {
        allRidesImages[i].addEventListener("click", function() {
            setTimeout(displayIndividualWaitTime, 350, responseData[i].waitTime, i);
        }, {once : true});
    }
  }

  function displayIndividualWaitTime(num, rideNumber) {
    let color;
    if (num <= 30) {
        color = "#39ff14"
    } else if (num > 30 && num <= 60) {
        color = "#FFFF00";
    } else {
        color = "#FF0000";
    }
    animateProgressBar(num, color, rideNumber);
  }


  function displayAverageWaitTimes() {
   const CHART = document.getElementById("barChart");
   let barChart = new Chart(CHART, {
       type: 'bar',
       data: {
           labels: currentLands,
           datasets: [
               {
                   label: "Average Wait Time (mins)",
                   data: [30, 20, 55, 30, 25, 15, 35, 40, 5, 0],
                   borderWidth: 2,
                   borderColor: ["#ff0000", "#FFFF00", "#32CD32", "#32CD32", "#32CD32", "#32CD32", "#32CD32", "#32CD32", "#32CD32"],
                   backgroundColor: ["rgb(255,0,0, 0.4)", "rgb(255,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)", "rgb(0,255,0,0.4)"]
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
  }

}) ();



// activeParkID = 20;
//         switch(activeParkID) {
//           case 1:
//             currentLands = disneylandParkAnaheimLands;
//             break;
//           case 2:
//             currentLands = disneyCaliforniaAdventureParkLands;
//             break;
//           case 4:
//             currentLands = animalKingdomLands;
//             break;
//           case 5:
//             currentLands = epcotLands;
//             break;
//           case 6:
//             currentLands = hollywoodStudiosLands;
//             break;
//           case 7:
//             currentLands = magicKingdomLands;
//             break;
//           case 9:
//             currentLands = disneylandParkParisLands;
//             break;
//           case 10:
//             currentLands = waltDisneyStudiosPark;
//             break;
//           case 12:
//             currentLands = disneylandParkHongKongLands;
//             break;
//           case 14:
//             currentLands = shanghaiDisneylandLands;
//             break;
//           case 16:
//             currentLands = tokyoDisneylandLands;
//             break;
//           case 17:
//             currentLands = tokyoDisneySeaLands;
//             break;
//         }