(function() {

    let activeParkID = 0;
    let ANAHEIM_NUMBER = 77;
    let ORLANDO_NUMBER = 172;
    let PARIS_NUMBER = 50;
    let HONG_KONG_NUMBER = 38;
    let SHANGHAI_NUMBER = 28;
    let TOKYO_NUMBER = 69;
    let ANAHEIM_ATTRACTIONS = ["Alice in Wonderland", "Animation Academy", "Astro Orbitor", "Autopia", 
    "The Bakery Tour", "Big Thunder Mountain Railroad", "Buzz Lightyear Astro Blasters", "Casey Jr. Circus Train", "Chip 'n Dale Treehouse", 
    "Davy Crockett's Explorer's Canoes", "The Disney Gallery", 
    "Disneyland Monorail", "Disneyland Railroad", "Great Moments with Mr. Lincoln", "Donald's Boat", 
    "Dumbo the Flying Elephant", "Finding Nemo Submarine Voyage", "Fortune Tellers", 
    "Frontierland Shootin' Exposition", "Gadget's Go Coaster", "Games of Pixar Pier", "Golden Zephyr", "Goofy's Playhouse", "Goofy's Sky School", 
    "Grizzly River Run", "Guardians of the Galaxy - Mission: BREAKOUT!", "Guardians of the Galaxy - Monsters After Dark", 
    "Haunted Mansion", "Incredicoaster", "Indiana Jones Adventure", "Inside Out Emotional Whirlwind", 
    "\"it's a small world\"", "Jessie's Critter Carousel", "Jumpin' Jellyfish", "Jungle Cruise", "King Arthur Carrousel", "The Little Mermaid ~ Ariel's Undersea Adventure", 
    "Luigi's Rollickin' Roadsters", "Mad Tea Party", "Main Street Cinema", "Main Street Vehicles", "The Many Adventures of Winnie the Pooh", 
    "Mark Twain Riverboat", "Mater's Junkyard Jamboree", "Matterhorn Bobsleds", 
    "Mickey's House and Meet Mickey", "Mickey's PhilharMagic", "Millenium Falcon: Smugglers Run", "Minnie's House", 
    "Monsters, Inc. Mike & Sulley to the Rescue!", "Mr. Toad's Wild Ride", "Peter Pan's Flight", 
    "Pinocchio's Daring Journey", "Pirate's Lair on Tom Sawyer Island", "Pirates of the Caribbean", "Pixar Pal-A-Round - Non-Swinging", 
    "Pixar Pal-A-Round - Swinging", "Radiator Springs Racers", "Red Car Trolley", 
    "Redwood Creek Challenge Trail", "Roger Rabbit's Car Toon Spin", "Sailing Ship Columbia", "Silly Symphony Swings", "Sleeping Beauty Castle Walkthrough", 
    "Snow White's Scary Adventures", "Soarin' Around the World", 
    "Sorcerer's Workshop", "Space Mountain", "Splash Mountain", "Star Tours", "Star Wars Launch Bay", "Star Wars: Rise of the Resistance", 
    "Storybook Land Canal Boats", "Tarzan's Treehouse", "Toy Story Midway Mania!", "Turtle Talk with Crush", "Walt Disney's Enchanted Tiki Room"];
    let ANAHEIM_ATTRACTION_IMAGES = ["aliceinwonderlandblurred.jpg", "animationacademyblurred.jpg", "astroorbitorblurred.jpg", "autopiablurred.jpg",
    "bakerytourblurred.jpg", "bigthundermountainrailroadblurred.jpg", "buzzlightyearastroblastersblurred.jpg", "caseyjuniorcircustrainblurred.jpg", 
    "chipanddaletreehouseblurred.jpg", "davycrockettexplorercanoesblurred.jpg", "thedisneygalleryblurred.jpg", "monorailblurred.jpg", "railroadblurred.jpg",
    "lincolnblurred.jpg", "donaldsboatblurred.jpg", "dumbotheflyingelephantblurred.jpg", "findingnemosubarminevoyageblurred.jpg", "fortunetellersblurred.jpg",
    "frontierlandshootinexpositionblurred.jpg", "gadgetsgocoasterblurred.jpg", "gamesofpixarpierblurred.jpg", "goldenzephyrblurred.jpg", 
    "goofysplayhouseblurred.jpg", "goofysskyschoolblurred.jpg", "grizzlyriverrunblurred.jpg", "guardiansofthegalaxyblurred.jpg",
    "guardiansofthegalaxymonstersblurred.jpg", "hauntedmansionblurred.jpg", "incredicoasterblurred.jpg", "indianajonesadventureblurred.jpg",
    "insideoutemotionalwhirlwindblurred.jpg", "itsasmallworldblurred.jpg", "jessiescrittercarouselblurred.jpg", "jumpinjellyfishblurred.jpg",
    "junglecruiseblurred.jpg", "kingarthurcarrouselblurred.jpg", "littlemermaidblurred.jpg", "luigisrollickinroadstersblurred.jpg",
    "madteapartyblurred.jpg", "mainstreetcinemablurred.jpg", "mainstreetvehiclesblurred.jpg", "themanyadventuresofwinniethepoohblurred.jpg",
    "marktwainriverboatblurred.jpg", "matersjunkyardjamboreeblurred.jpg", "matterhornbobsledsblurred.jpg", "mickeyshouseblurred.jpg",
    "mickeysphilharmagicblurred.jpg", "milleniumfalconsmugglersrunblurred.jpg", "minnieshouseblurred.jpg", "monstersincblurred.jpg",
    "mrtoadswildrideblurred.jpg", "peterpansflightblurred.jpg", "pinocchiosdaringjourneyblurred.jpg", "pirateslairblurred.jpg",
    "piratesofthecaribbeanblurred.jpg", "pixarpalaroundblurred.jpg", "pixarpalaroundblurred.jpg", "radiatorspringsracersblurred.jpg",
    "redcartrolleyblurred.jpg", "redwoodcreekchallengetrailblurred.jpg", "rogerrabbitscartoonspinblurred.jpg", "sailingshipcolumbiablurred.jpg",
    "sillysymphonyswingsblurred.jpg", "sleepingbeautycastlewalkthroughblurred.jpg", "snowwhitesscaryadventureblurred.jpg",
    "soarinaroundtheworldblurred.jpg", "sorcerersworkshopblurred.jpg", "spacemountainblurred.jpg", "splashmountainblurred.jpg",
    "startoursblurred.jpg", "starwarslaunchbayblurred.jpg", "starwarsriseoftheresistanceblurred.jpg", "storybooklandcanalboatsblurred.jpg",
    "tarzanstreehouseblurred.jpg", "toystorymidwaymaniablurred.jpg", "turtletalkwithcrushblurred.jpg", "enchantedtikiroomblurred.jpg"];
    let slideIndex = 0;

    window.addEventListener("load", setUp);
    // window.addEventListener("load", getWaitTimes);

    function setUp() {
        setTimeout(initialCarousel, 6000);
        document.getElementById("rideSearch").addEventListener("keyup", filterRides);
        const links = document.querySelectorAll("div > a")
        for (const link of links) {
            link.addEventListener("click", clickHandler);
        }
    }

    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }


    function initialCarousel() {
        let indicators = document.getElementsByClassName("indicator");
        indicators[0].classList.remove("activeIndicator");
        slideIndex++;
        mainCarousel();
    }

    function mainCarousel() {
        let indicators = document.getElementsByClassName("indicator");
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("activeIndicator");
        }
        indicators[slideIndex].classList.add("activeIndicator");
        slideIndex++;
        if (slideIndex >= 4) {
            slideIndex = 0;
        }
        setTimeout(mainCarousel, 7500);
    }

    function filterRides() {
        let input, filter, ul, li, txtValue;
        input = document.getElementById("rideSearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("rides");
        li = ul.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            txtValue = li[i].innerHTML;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    // function getWaitTimes() {
    //     let url = "http://localhost:8000/times";
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(function(response) {
    //             return response.sort(sortRides("name"))
    //         })
    //         .then(displayWaitTimes);
    // }

    // function sortRides(key) {
    //     return function(a, b) {
    //         return a[key].replace(/\W/g, '').localeCompare(b[key].replace(/\W/g, ''));
    //     }
    // }

    // function displayWaitTimes(responseData) {
    //     for (let i = 0; i < responseData.length; i++) {
    //         console.log(responseData[i].name + " " + responseData[i].waitTime);
    //     }
    //     let allRidesImages = document.getElementsByClassName("rideImage");
    //     for (let i = 0; i < allRidesImages.length; i++) {
    //         allRidesImages[i].addEventListener("click", function() {
    //             setTimeout(displayIndividualWaitTime, 350, 30, i);
    //         }, {once : true});
    //     }
    // }

    // function displayIndividualWaitTime(num, rideNumber) {
    //     let color;
    //     if (num <= 30) {
    //         color = "#39ff14"
    //     } else if (num > 30 && num <= 60) {
    //         color = "#FFFF00";
    //     } else {
    //         color = "#FF0000";
    //     }
    //     animateProgressBar(num, color, rideNumber);
    // }

}) ();
