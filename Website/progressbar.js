function animateProgressBar(num, color, rideNumber) {
    // var value = 150;
    let allProgress = document.getElementsByClassName("progress");
    $(allProgress[rideNumber]).circliful({
        animationStep: 2,
        fontColor: "#fff",
        foregroundBorderWidth: 15,
        foregroundColor: color,
        backgroundBorderWidth: 15,
        percent: num,
        showPercent: 1,
        noPercentageSign: 1,
      });
}