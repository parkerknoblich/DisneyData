function animateTimeCircle(num, trailColor, backgroundColorParam, rideNumber, text) {
    let allCurrentTimes = document.getElementsByClassName("currentTime");
    $(allCurrentTimes[rideNumber]).circliful({
        animationStep: 2,
        fontColor: "#fff",
        foregroundBorderWidth: 15,
        foregroundColor: trailColor,
        backgroundColor: backgroundColorParam,
        backgroundBorderWidth: 15,
        percent: num,
        showPercent: 1,
        noPercentageSign: 1,
        replacePercentageByText: text
      });
}