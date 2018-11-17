// input[type="number"] not allow only int number no float
$('input[type="number"]').on('keypress', function (event) {
  return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
});
