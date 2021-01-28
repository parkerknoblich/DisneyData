var value = 150;
$(document).ready(function() {
  $("#test-circle").circliful({
    animationStep: 2,
    foregroundBorderWidth: 15,
    foregroundColor: "#39ff14",
    backgroundBorderWidth: 15,
    percent: value,
    showPercent: 1,
    noPercentageSign: 1,
  });
});

