const express = require("express");
const ThemeParks = require("themeparks");
const cors = require("cors");
const mysql = require("mysql2/promise");
const CronJob = require("cron").CronJob;
const { DateTime } = require("luxon");
const { response } = require("express");


const database = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "98DisneyData349621",
    database: "times"
});

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
  "For the First Time in Forever: A Frozen Sing-Along Celebration", "Hollywood & Vine", "Indiana Jones Epic Stunt Spectacular!",
  "Lightning McQueen's Racing Academy", "Mama Melrose's Ristorante Italiano", "Meet Sulley at Walt Disney Presents",
  "Mickey and Minnie Starring in Red Carpet Dreams", "MuppetVision 3D", "Oga's Cantina at the Walt Disney World Resort",
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
  "Art of Disney Animation", "Disney Studio 1", "Rock 'n' Roller Coaster starring Aerosmith", "Studio Tram Tour: Behind the Magic",
  "Top secret - Under construction: The Avengers new headquarters"];
  const disneylandParkHongKongRidesToRemove = ["Animation Academy", "Building a Dream: The Magic Behind a Disney Castle",
  "Clopin's Festival of Foods", "Comet Cafe", "Fairy Tale Forest - presented by PANDORA", "Fantasy Gardens",
  "Hong Kong Disneyland Railroad – Fantasyland Station", "Iron Man Tech Showcase - Presented by Stark Industries",
  "Main Street Vehicles", "River View Cafe", "STAR WARS: Command Post", "Tahitian Terrace",
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
  "Fortress Explorations", 'Fortress Explorations "The Leonardo Challenge"', "Mermaid Lagoon Theater",
  "Sindbad's Storybook Voyage", "The Magic Lamp Theater", "Turtle Talk"];
  const allRidesToRemove = [disneylandParkAnaheimRidesToRemove, disneyCaliforniaAdventureParkRidesToRemove, animalKingdomRidesToRemove,
    epcotRidesToRemove, hollywoodStudiosRidesToRemove, magicKingdomRidesToRemove, disneylandParkParisRidesToRemove, waltDisneyStudiosParkRidesToRemove,
    disneylandParkHongKongRidesToRemove, shanghaiDisneylandRidesToRemove, tokyoDisneylandRidesToRemove, tokyoDisneySeaRidesToRemove];

const DisneylandResortMagicKingdom = new ThemeParks.Parks.DisneylandResortMagicKingdom();
const DisneylandResortCaliforniaAdventure = new ThemeParks.Parks.DisneylandResortCaliforniaAdventure();
const WaltDisneyWorldAnimalKingdom = new ThemeParks.Parks.WaltDisneyWorldAnimalKingdom();
const WaltDisneyWorldEpcot = new ThemeParks.Parks.WaltDisneyWorldEpcot();
const WaltDisneyWorldHollywoodStudios = new ThemeParks.Parks.WaltDisneyWorldHollywoodStudios();
const WaltDisneyWorldMagicKingdom = new ThemeParks.Parks.WaltDisneyWorldMagicKingdom();
const DisneylandParisMagicKingdom = new ThemeParks.Parks.DisneylandParisMagicKingdom();
const DisneylandParisWaltDisneyStudios = new ThemeParks.Parks.DisneylandParisWaltDisneyStudios();
const HongKongDisneyland = new ThemeParks.Parks.HongKongDisneyland();
const ShanghaiDisneyResortMagicKingdom = new ThemeParks.Parks.ShanghaiDisneyResortMagicKingdom();
const TokyoDisneyResortMagicKingdom = new ThemeParks.Parks.TokyoDisneyResortMagicKingdom();
const TokyoDisneyResortDisneySea = new ThemeParks.Parks.TokyoDisneyResortDisneySea();

const allResorts = [DisneylandResortMagicKingdom, DisneylandResortCaliforniaAdventure, WaltDisneyWorldAnimalKingdom,
WaltDisneyWorldEpcot, WaltDisneyWorldHollywoodStudios, WaltDisneyWorldMagicKingdom, DisneylandParisMagicKingdom,
DisneylandParisWaltDisneyStudios, HongKongDisneyland, ShanghaiDisneyResortMagicKingdom, TokyoDisneyResortMagicKingdom,
TokyoDisneyResortDisneySea];

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.get("/landtimes/:day/:time/:resortID", async function(req, res) {
    let day = req.params["day"];
    let time = req.params["time"];
    let resortID = req.params["resortID"];
    let result = [];
    try {
        result = await getLandTimes(day, time, resortID);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

async function getLandTimes(day, time, resortID) {
    let ridesSQL = "SELECT ride_land, GROUP_CONCAT(ride_id) FROM rides WHERE resort_id = ? GROUP BY ride_land";
    let [ridesQueryResult] = await database.query(ridesSQL, [resortID]);
    let rideIDsByLand = [];
    for (let i = 0; i < ridesQueryResult.length; i++) {
        rideIDsByLand.push(ridesQueryResult[i]["GROUP_CONCAT(ride_id)"].split(","));
    }
    let timeQueryAttribute = "time_" + time;
    let countQueryAttribute = "count_" + time;
    let timesSQL = "SELECT " + timeQueryAttribute + ", " + countQueryAttribute + " FROM timepoints WHERE ride_id = ? AND park_day = ?";
    let rideTimesByLand = [];
    for (let i = 0; i < rideIDsByLand.length; i++) {
        let averageLandTime = 0;
        let rideCount = rideIDsByLand[i].length;
        for (let j = 0; j < rideCount; j++) {
            let [timesSQLResult] = await database.query(timesSQL, [parseInt(rideIDsByLand[i][j]), day]);
            let averageRideTime = Math.round(timesSQLResult[0][timeQueryAttribute] / timesSQLResult[0][countQueryAttribute]);
            averageLandTime += averageRideTime;
        }
        rideTimesByLand.push(Math.round(averageLandTime / rideCount));
    }
    return rideTimesByLand;
}

app.get("/individualtime/:ridename/:resortID/:day", async function(req, res) {
    let rideName = req.params["ridename"];
    let resortID = req.params["resortID"];
    let day = req.params["day"];
    let result = [];
    try {
        result = await getIndividualTime(rideName, resortID, day);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

async function getIndividualTime(rideName, resortID, day) {
    let rideSQLQuery = "SELECT ride_id FROM rides WHERE ride_name = ? AND resort_id = ?";
    let [rideSQLQueryResult] = await database.query(rideSQLQuery, [decodeURI(rideName), resortID]);
    let rideID = rideSQLQueryResult[0]["ride_id"];
    let timeSQLQuery = "SELECT time_900am / count_900am, time_1200pm / count_1200pm, time_300pm / count_300pm, time_600pm / count_600pm, time_900pm / count_900pm, time_1200am / count_1200am FROM timepoints WHERE ride_id = ? AND park_day = ?";
    let [timeSQL] = await database.query(timeSQLQuery, [rideID, day]);
    let predictedTimes = [];
    predictedTimes.push(parseInt(timeSQL[0]["time_900am / count_900am"]));
    predictedTimes.push(parseInt(timeSQL[0]["time_1200pm / count_1200pm"]));
    predictedTimes.push(parseInt(timeSQL[0]["time_300pm / count_300pm"]));
    predictedTimes.push(parseInt(timeSQL[0]["time_600pm / count_600pm"]));
    predictedTimes.push(parseInt(timeSQL[0]["time_900pm / count_900pm"]));
    predictedTimes.push(parseInt(timeSQL[0]["time_1200am / count_1200am "]));
    return predictedTimes;
}

app.get("/disneylandparkanaheimwaittimes", (req, res) => {
    DisneylandResortMagicKingdom.GetWaitTimes()
    .then((rideTimes) => {
        return filterRides(rideTimes, 0);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneycaliforniaadventureparkwaittimes", (req, res) => {
    DisneylandResortCaliforniaAdventure.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 1);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/animalkingdomwaittimes", (req, res) => {
    WaltDisneyWorldAnimalKingdom.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 2);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/epcotwaittimes", (req, res) => {
    WaltDisneyWorldEpcot.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 3);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/hollywoodstudioswaittimes", (req, res) => {
    WaltDisneyWorldHollywoodStudios.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 4);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/magickingdomwaittimes", (req, res) => {
    WaltDisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 5);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneylandparkpariswaittimes", (req, res) => {
    DisneylandParisMagicKingdom.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 6);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/waltdisneystudiosparkwaittimes", (req, res) => {
    DisneylandParisWaltDisneyStudios.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 7);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneylandparkhongkongwaittimes", (req, res) => {
    HongKongDisneyland.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 8);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/shanghaidisneylandwaittimes", (req, res) => {
    ShanghaiDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 9);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/tokyodisneylandwaittimes", (req, res) => {
    TokyoDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 10);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/tokyodisneyseawaittimes", (req, res) => {
    TokyoDisneyResortDisneySea.GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, 11);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

 function filterRides(responseData, index) {
    let filteredArray = [];
    for (let i = 0; i < responseData.length; i++) {
      responseData[i].name = responseData[i].name.replace(" - Temporarily Unavailable", "").trim();
      responseData[i].name = responseData[i].name.replace("®", "");
      responseData[i].name = responseData[i].name.replace("*", "");
      responseData[i].name = responseData[i].name.replace("™", "");
      if (responseData[i].name == "Soarin' Over California") {
          responseData[i].name = "Soarin' Around the World";
      }
      if (!allRidesToRemove[index].includes(responseData[i].name.replace(" - Temporarily Unavailable", "").trim())) {
          filteredArray.push(responseData[i]);
      }
    }
    return filteredArray;
}

function sortRides(key) {
    return function(a, b) {
        return a[key].replace(/\W/g, '').localeCompare(b[key].replace(/\W/g, ''));
    }
}

// app.get("/test", (req, res) => {
//     getDayAndTime(10);
//     res.send("Hello");
//     let result= [];
//     try {
//         result = await updateWaitTimesInDatabase();
//         res.send(result);
//     } catch (error) {
//         res.send(error);
//     }
// })

 const disneylandParkAnaheimJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(0);
    },
    null,
    true,
    'America/Los_Angeles'
)
disneylandParkAnaheimJob.start();

const disneyCaliforniaAdventureParkJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(1);
    },
    null,
    true,
    'America/Los_Angeles'
)
disneyCaliforniaAdventureParkJob.start();

const animalKingdomJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(2);
    },
    null,
    true,
    'America/New_York'
)
animalKingdomJob.start();

const epcotJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(3);
    },
    null,
    true,
    'America/New_York'
)
epcotJob.start();

const hollywoodstudiosJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(4);
    },
    null,
    true,
    'America/New_York'
)
hollywoodstudiosJob.start();

const magicKingdomJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(5);
    },
    null,
    true,
    'America/New_York'
)
magicKingdomJob.start();

const disneylandParkParisJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(6);
    },
    null,
    true,
    'Europe/Paris'
)
disneylandParkParisJob.start();

const waltDisneyStudiosParkJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(7);
    },
    null,
    true,
    'Europe/Paris'
)
waltDisneyStudiosParkJob.start();

const disneylandParkHongKongJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(8);
    },
    null,
    true,
    'Asia/Hong_Kong'
)
disneylandParkHongKongJob.start();

const shanghaiDisneylandJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(9);
    },
    null,
    true,
    'Asia/Shanghai'
)
shanghaiDisneylandJob.start();

const tokyoDisneylandJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(10);
    },
    null,
    true,
    'Asia/Tokyo'
)
tokyoDisneylandJob.start();

const tokyoDisneySeaJob = new CronJob(
    '0 */20 9-23 * * *',
    function() {
         updateWaitTimesInDatabase(11);
    },
    null,
    true,
    'Asia/Tokyo'
)
tokyoDisneySeaJob.start();


async function updateWaitTimesInDatabase(parkID) {
    let dayAndTime = getDayAndTime(parkID);
    let ids = [];
    await allResorts[parkID].GetWaitTimes().then((rideTimes) => {
        return filterRides(rideTimes, parkID);
    }).then((rideTimes) => {
        return rideTimes.sort(sortRides("name"));
    }).then(async (rideTimes) => {
        let rideSQLQuery = "SELECT ride_id FROM rides WHERE ride_name = ? AND resort_id = ?";
        for (let j = 0; j < rideTimes.length; j++) {
            let rideName = rideTimes[j].name.replace("&amp;", "&");
            let [rideSQLQueryResult] = await database.query(rideSQLQuery, [decodeURI(rideName), parkID + 1]);
            if (rideSQLQueryResult[0] != null) {
                ids.push(rideSQLQueryResult[0]["ride_id"]);
            }
        }
        for (let k = 0; k < ids.length; k++) {
            let timeSQLAttribute = "time_" + dayAndTime[1];
            let countSQLAttribute = "count_" + dayAndTime[1];
            let waitTimeToAdd = rideTimes[k].waitTime;
            if (waitTimeToAdd != null && waitTimeToAdd != 0) {
                let updateTimeSQLQuery = "UPDATE timepoints SET " + timeSQLAttribute + " = " + timeSQLAttribute + " + " + waitTimeToAdd + " WHERE ride_id = ? AND park_day = ?";
                await database.query(updateTimeSQLQuery, [ids[k], dayAndTime[0]]);
                let updateCountSQLQuery = "UPDATE timepoints SET " + countSQLAttribute + " = " + countSQLAttribute + " + 1 WHERE ride_id = ? AND park_day = ?";
                await database.query(updateCountSQLQuery, [ids[k], dayAndTime[0]]);
            }
        }
    });
}


    function getDayAndTime(parkID) {
        const timeZones = ["America/Los_Angeles", "America/New_York", "Europe/Paris", "Asia/Hong_Kong", "Asia/Shanghai", "Asia/Tokyo"];
        let selectedTimeZone;
        let dayAndTime = [];
        if (parkID == 0 || parkID == 1) {
            selectedTimeZone = timeZones[0];
        } else if (parkID == 2 || parkID == 3 || parkID == 4 || parkID == 5) {
            selectedTimeZone = timeZones[1];
        } else if (parkID == 6 || parkID == 7) {
            selectedTimeZone = timeZones[2];
        } else if (parkID == 8) {
            selectedTimeZone = timeZones[3];
        } else if (parkId = 9) {
            selectedTimeZone = timeZones[4];
        } else {
            selectedTimeZone = timeZones[5];
        }
        let dayTimeObject = DateTime.local().setZone(selectedTimeZone);
        let dayNumber = dayTimeObject.weekday;
        let day;
        if (dayNumber == 7) {
            day = "Sunday";
        } else if (dayNumber == 1) {
            day = "Monday";
        } else if (dayNumber == 2) {
            day = "Tuesday";
        } else if (dayNumber == 3) {
            day = "Wednesday";
        } else if (dayNumber == 4) {
            day = "Thursday";
        } else if (dayNumber == 5) {
            day = "Friday";
        } else {
            day = "Saturday";
        }
        dayAndTime.push(day);
        let dayTimeString = dayTimeObject.toLocaleString(DateTime.DATETIME_MED);
        let dayTimeStringSplit = dayTimeString.split(",");
        let time = dayTimeStringSplit[2].trim();
        time = time.replace(" ", "").replace(":", "").toLowerCase();
        dayAndTime.push(time);
        return dayAndTime;
    }

app.listen(port);