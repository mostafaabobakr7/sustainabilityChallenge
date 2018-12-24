// ADD CLASS ROTATED TO SETTING GEAR
$('.settings__btn').on('click', function () {
  if ($(this).hasClass('rotate')) {
    $(this).removeClass('rotate');
  }
  $(this).addClass('rotate');
});
// lang__btn on click change html
$('.dropdown-submenu .dropdown-item').on('click', function () {
  const value = $(this).html();
  $('.settings__lang').html(value);
});
