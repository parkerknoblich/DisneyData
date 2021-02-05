const express = require("express");
const ThemeParks = require("themeparks");
const cors = require("cors");
const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "98DisneyData349621",
    database: "times"
});

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

const app = express();
const port = 8000;

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
        res.json("ERROR!");
    }
});

async function getLandTimes(day, time, resortID) {
    let ridesSQL = "SELECT ride_land, GROUP_CONCAT(ride_id) FROM rides WHERE resort_id = ? GROUP BY ride_land";
    let [ridesQueryResult] = await database.query(ridesSQL, [resortID]);
    let rideIDsByLand = [];
    for (let i = 0; i < ridesQueryResult.length; i++) {
        rideIDsByLand.push(ridesQueryResult[i]["GROUP_CONCAT(ride_id)"].split(","));
    }
    // one ride
    // let timeQueryAttribute = "time_" + time;
    // let countQueryAttribute = "count_" + time;
    // let timesSQL = "SELECT " + timeQueryAttribute + ", " + countQueryAttribute + " FROM timepoints WHERE ride_id = ? AND park_day = ?";
    // let [timesSQLResult] = await database.query(timesSQL, [parseInt(rideIDsByLand[0][0]), day]);
    // let averageTime = timesSQLResult[0][timeQueryAttribute] / timesSQLResult[0][countQueryAttribute];
    // return averageTime;
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

app.get("/disneylandparkanaheimwaittimes", (req, res) => {
    DisneylandResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneycaliforniaadventureparkwaittimes", (req, res) => {
    DisneylandResortCaliforniaAdventure.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/animalkingdomwaittimes", (req, res) => {
    WaltDisneyWorldAnimalKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/epcotwaittimes", (req, res) => {
    WaltDisneyWorldEpcot.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/hollywoodstudioswaittimes", (req, res) => {
    WaltDisneyWorldHollywoodStudios.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/magickingdomwaittimes", (req, res) => {
    WaltDisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneylandparkpariswaittimes", (req, res) => {
    DisneylandParisMagicKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/waltdisneystudiosparkwaittimes", (req, res) => {
    DisneylandParisWaltDisneyStudios.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/disneylandparkhongkongwaittimes", (req, res) => {
    HongKongDisneyland.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/shanghaidisneylandwaittimes", (req, res) => {
    ShanghaiDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/tokyodisneylandwaittimes", (req, res) => {
    TokyoDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.get("/tokyodisneyseawaittimes", (req, res) => {
    TokyoDisneyResortDisneySea.GetWaitTimes().then((rideTimes) => {
        res.send(rideTimes);
    }).catch((error) => {
        console.error(error);
    });
});

app.listen(port);