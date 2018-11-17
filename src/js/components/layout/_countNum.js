function countNum() {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 3000,
    easing: 'swing',
    step(now) {
      $(this).text(Math.ceil(now));
    }
  });
}

$('.dashboard .card-body h3').each(countNum);
