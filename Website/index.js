(function() {

    let slideIndex = 0;

    window.addEventListener("load", setUp);
    window.addEventListener("load", displayDates);

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
        let input, filter, ul, li, txtValue, rideNames
        input = document.getElementById("rideSearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("rides");
        li = ul.getElementsByTagName("li");
        rideNames = document.getElementsByClassName("rideName");
        for (let i = 0; i < li.length; i++) {
            txtValue = li[i].innerHTML;
            txtValue = rideNames[i].innerHTML;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
        input.addEventListener("search", function(){
            for (let i = 0; i < li.length; i++) {
                li[i].style.display = "block";
            }
        })
    }

    function displayDates() {
        let days = [];
        let daysRequired = 7
        
        for (let i = 0; i < daysRequired; i++) {
          days.push( moment().add(i, 'days').format('dddd MMMM Do, YYYY') )
        }
        let options = document.querySelectorAll("#selectDate option");
        for (let i = 0; i < options.length; i++) {
          options[i].innerHTML = days[i];
        }
      }

}) ();
