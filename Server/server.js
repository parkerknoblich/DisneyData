const express = require("express");
const ThemeParks = require("themeparks");
const cors = require("cors");

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