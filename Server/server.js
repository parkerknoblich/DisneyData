const express = require("express");
const Themeparks = require("themeparks");
const cors = require("cors");

const DisneylandResortMagicKingdom = new Themeparks.Parks.DisneylandResortMagicKingdom();
const DisneylandResortCaliforniaAdventure = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
const WaltDisneyWorldAnimalKingdom = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
const WaltDisneyWorldEpcot = new Themeparks.Parks.WaltDisneyWorldEpcot();
const WaltDisneyWorldHollywoodStudios = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
const WaltDisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
const DisneylandParisMagicKingdom = new Themeparks.Parks.DisneylandParisMagicKingdom();
const DisneylandParisWaltDisneyStudios = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();
const HongKongDisneyland = new Themeparks.Parks.HongKongDisneyland();
const ShanghaiDisneyResortMagicKingdom = new Themeparks.Parks.ShanghaiDisneyResortMagicKingdom();
const TokyoDisneyResortMagicKingdom = new Themeparks.Parks.TokyoDisneyResortMagicKingdom();
const TokyoDisneyResortDisneySea = new Themeparks.Parks.TokyoDisneyResortDisneySea();

const app = express();
const port = 8000;

app.use(cors());

app.get("/disneylandparkanaheimwaittimes", (req, res) => {
    // foo();
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

// function foo() {
//     console.log("PENIS");
// }

app.listen(port);