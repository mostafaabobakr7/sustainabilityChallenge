$('.inputfile').on('change', function (e) {
  const $input = $(this);
  const $label = $input.next('label');
  const labelVal = $label.html();
  let fileName = '';
  fileName = e.target.value.split('\\').pop();
  if (fileName) {
    $label.find('span').html(fileName);
  } else {
    $label.html(labelVal);
  }

});
