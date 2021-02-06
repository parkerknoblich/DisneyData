(function() {

  let activeParkID = 1;
  let ridesToRemove;
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
  const disneylandParkAnaheimRidesToRemove = ["Encounter the Dark Side at Star Wars Launch Bay", "Fantasmic!", "Meet Disney Princesses at Royal Hall",
  "Meet the Resistance at Star Wars Launch Bay", "Meet Tinker Bell at Pixie Hollow", "Mickey and the Magical Map"];
  const disneyCaliforniaAdventureParkRidesToRemove = ["Disney Junior Dance Party!", "Frozen – Live at the Hyperion", "Heroic Encounter: Captain Marvel", 
  "Walt Disney Imagineering Blue Sky Cellar", "World of Color"];
  const animalKingdomRidesToRemove = ["Meet Favorite Disney Pals at Adventurers Outpost", "Nomad Lounge",
  "The Animation Experience at Conservation Station", "The Boneyard", "Tiffins Restaurant"];
  const epcotRidesToRemove = ["Awesome Planet", "Beauty and the Beast Sing-Along", "Biergarten Restaurant",
  "Canada Far and Wide in Circle-Vision 360", "Coral Reef Restaurant", "Disney and Pixar Short Film Festival",
  "Garden Grill Restaurant", "Impressions de France", "La Hacienda de San Angel", "Le Cellier Steakhouse",
  "Meet Anna and Elsa at Royal Sommerhus", "Reflections of China", "Rose & Crown Dining Room", "San Angel Inn Restaurante",
  "Spice Road Table", "The American Adventure"];
  const hollywoodStudiosRidesToRemove = ["50's Prime Time Café", "BB-8 Astromech on Duty", "Beauty and the Beast-Live on Stage",
  "Celebrity Spotlight", "Disney Junior Dance Party!", "Disney Junior Play and Dance!", "Disney Society Orchestra and Friends",
  "For the First Time in Forever: A Frozen Sing-Along Celebration", "Hollywood & Vine", "Indiana Jones™ Epic Stunt Spectacular!",
  "Lightning McQueen's Racing Academy", "Mama Melrose's Ristorante Italiano", "Meet Sulley at Walt Disney Presents",
  "Mickey and Minnie Starring in Red Carpet Dreams", "Muppet*Vision 3D", "Oga's Cantina at the Walt Disney World Resort",
  "Sci-Fi Dine-In Theater Restaurant", "Star Wars: Galaxy's Edge", "Star Wars Launch Bay: Encounter Darth Vader",
  "Star Wars Launch Bay: Meet Chewbacca", "Star Wars Launch Bay Theater", "The Hollywood Brown Derby", "Vacation Fun - An Original Animated Short with Mickey & Minnie",
  "Voyage of The Little Mermaid", "Walt Disney Presents"];
  const magicKingdomRidesToRemove = ["A Pirate's Adventure ~ Treasures of the Seven Seas", "Be Our Guest Restaurant", "Cinderella's Royal Table",
  "Country Bear Jamboree", "Enchanted Tales with Belle", "Jungle Navigation Co. LTD Skipper Canteen", "Liberty Square Market",
  "Liberty Tree Tavern", "Main Street Vehicles", "Meet Ariel at Her Grotto", "Meet Cinderella and Elena at Princess Fairytale Hall",
  "Meet Daring Disney Pals as Circus Stars at Pete's Silly Side Show", "Meet Dashing Disney Pals as Circus Stars at Pete’s Silly Side Show",
  "Meet Mickey Mouse at Town Square Theater", "Meet Rapunzel and Tiana at Princess Fairytale Hall", "Meet Tinker Bell at Town Square Theater",
  "Sorcerers of the Magic Kingdom", "The Crystal Palace", "The Hall of Presidents", "The Plaza Restaurant", "Tony's Town Square Restaurant",
  "Walt Disney World Railroad - Fantasyland", "Walt Disney World Railroad - Frontierland"];
  const disneylandParkParisRidesToRemove = ["Alice's Curious Labyrinth", "Adventure Isle", "Discovery Arcade", "Disneyland Railroad", "Disneyland Railroad Discoveryland Station",
  "Disneyland Railroad Fantasyland Station", "Disneyland Railroad Frontierland Depot", "Frontierland Playground", "Horse-Drawn Streetcars",
  "La Galerie de la Belle au Bois Dormant", "La Tanière du Dragon", "Le Passage Enchanté d'Aladdin", "Liberty Arcade", "Main Street Vehicles",
  "Pirate Galleon", "Pirates' Beach", "Princess Pavilion", "Rustler Roundup Shootin' Gallery", "Sleeping Beauty Castle",
  "Welcome to Starport: A Star Wars Encounter"];
  const waltDisneyStudiosParkRidesToRemove = ["Animation Celebration – Frozen : A Musical Invitation", "Armageddon : les Effets Spéciaux",
  "Art of Disney Animation®", "Disney Studio 1", "Rock 'n' Roller Coaster starring Aerosmith", "Studio Tram Tour®: Behind the Magic",
  "Top secret - Under construction: The Avengers new headquarters"];
  const disneylandParkHongKongRidesToRemove = ["Animation Academy", "Building a Dream: The Magic Behind a Disney Castle",
  "Clopin's Festival of Foods", "Comet Cafe", "Fairy Tale Forest - presented by PANDORA", "Fantasy Gardens",
  "Hong Kong Disneyland Railroad – Fantasyland Station", "Iron Man Tech Showcase - Presented by Stark Industries",
  "Main Street Vehicles", "River View Cafe", "STAR WARS™: Command Post", "Tahitian Terrace",
  "The Royal Reception Hall"];
  const shanghaiDisneylandRidesToRemove = ["Alice in Wonderland Maze", "Become Iron Man", "Buzz Lightyear Planet Rescue (Standby Pass Required)",
  "Camp Discovery", "Challenge Trails at Camp Discovery", "Challenge Trails at Camp Discovery (Standby Pass Required)", "Marvel Universe",
  "“Once Upon a Time” Adventure", "Peter Pan’s Flight (Standby Pass Required)", "Roaring Rapids (Standby Pass Required)", "Selfie Spot with Captain America", "Selfie Spot with Disney Jungle Characters",
  "Selfie Spot with Mickey", "Selfie Spot with Princesses", "Selfie Spot with Spider Man", "Seven Dwarfs Mine Train (Standby Pass Required)",
  "Shipwreck Shore", "Siren's Revenge", "Soaring Over the Horizon (Standby Pass Required)", "Stitch Encounter", 
  "The Many Adventures of Winnie the Pooh (Standby Pass Required)", "TRON Lightcycle Power Run – Presented by Chevrolet (Standby Pass Required)",
  "TRON Realm, Chevrolet Digital Challenge", "Vista Trail at Camp Discovery"];
  const tokyoDisneylandRidesToRemove = ["Chip 'n Dale's Treehouse", "Cinderella's Fairy Tale Hall", "Country Bear Theater",
  "Donald's Boat", "Enchanted Tale of Beauty and the Beast", "Goofy's Paint 'n' Play House", "Minnie's House", "Omnibus",
  "Penny Arcade", "Stitch Encounter", "Toon Park", "Westernland Shootin' Gallery"];
  const tokyoDisneySeaRidesToRemove = ["Ariel's Playground", "Big City Vehicles", "DisneySea Electric Railway (Port Discovery Station)",
  "DisneySea Transit Steamer Line (Lost River Delta Dock)", "DisneySea Transit Steamer Line (Mediterranean Harbor Dock)",
  "Fortress Explorations", "Fortress Explorations &quotThe Leonardo Challenge&quot", "Mermaid Lagoon Theater",
  "Sindbad's Storybook Voyage", "The Magic Lamp Theater", "Turtle Talk"];

  window.addEventListener("load", setUp);
  window.addEventListener("load", getRideWaitTimes);

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
      ridesToRemove = epcotRidesToRemove;
    } else if (document.URL.includes("hollywoodstudios")) {
      activeParkID = 5;
      currentLands = hollywoodStudiosLands;
      ridesToRemove = hollywoodStudiosRidesToRemove;
    } else if (document.URL.includes("magickingdom")) {
      activeParkID = 6;
      currentLands = magicKingdomLands;
      ridesToRemove = magicKingdomRidesToRemove;
    } else if (document.URL.includes("disneylandparkparis")) {
      activeParkID = 7;
      currentLands = disneylandParkParisLands;
      ridesToRemove = disneylandParkParisRidesToRemove;
    } else if (document.URL.includes("waltdisneystudiospark")) {
      activeParkID = 8;
      currentLands = waltDisneyStudiosParkLands;
      ridesToRemove = waltDisneyStudiosParkRidesToRemove
    } else if (document.URL.includes("disneylandparkhongkong")) {
      activeParkID = 9;
      currentLands = disneylandParkHongKongLands;
      ridesToRemove = disneylandParkHongKongRidesToRemove;
    } else if (document.URL.includes("shanghaidisneyland")) {
      activeParkID = 10;
      currentLands = shanghaiDisneylandLands;
      ridesToRemove = shanghaiDisneylandRidesToRemove;
    } else if (document.URL.includes("tokyodisneyland")) {
      activeParkID = 11;
      currentLands = tokyoDisneylandLands;
      ridesToRemove = tokyoDisneylandRidesToRemove;
    } else if (document.URL.includes("tokyodisneysea")) {
      activeParkID = 12;
      currentLands = tokyoDisneySeaLands;
      ridesToRemove = tokyoDisneySeaRidesToRemove;
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
        url = "http://localhost:8000/waltdisneystudiosparkwaittimes";
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
        .then(getAllIndividualWaitTimes);
  }

  function sortRides(key) {
      return function(a, b) {
          return a[key].replace(/\W/g, '').localeCompare(b[key].replace(/\W/g, ''));
      }
  }

  function filterRides(responseData) {
      let filteredArray = [];
      for (let i = 0; i < responseData.length; i++) {
        if (!ridesToRemove.includes(responseData[i].name.replace(" - Temporarily Unavailable", "").trim())) {
            filteredArray.push(responseData[i]);
        }
      }
      return filteredArray;
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
    let color;
    if (num <= 30) {
        color = "#39ff14"
    } else if (num > 30 && num <= 60) {
        color = "#FFFF00";
    } else {
        color = "#FF0000";
    }
    animateTimeCircle(num, color, selectedRideNumber);
  }

  function getIndividualPredictedWaitTime(rideName) {
    let dateSelector = document.querySelector("#selectDate select");
    let day = dateSelector.options[dateSelector.selectedIndex].text.split(" ")[0];
    let url = "http://localhost:8000/individualtime/" + rideName + "/" + activeParkID + "/" + day;
    fetch(url)
      .then(response => response.json())
      .then(displayPredictedIndividualWaitTime);
  }

  
  function displayPredictedIndividualWaitTime(predictedRideWaitTimes) {
    console.log(predictedRideWaitTimes);
    // if (lineChart != null) {
    //   lineChart.destroy();
    // }
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
               zeroLineColor: "white",
               lineWidth: 1
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
    let url = "http://localhost:8000/landtimes/" + day + "/" + time + "/" + activeParkID;
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
    console.log("Sorted:");
    console.log(newTempAverageLandTimes);
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
    console.log(result);
    return result;
  }

}) ();