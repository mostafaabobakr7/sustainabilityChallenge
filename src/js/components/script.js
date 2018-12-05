import './global/global-jquery';
import './global/global-chart';
import './global/global-waves';
import 'bootstrap/dist/js/bootstrap.bundle';
import './validate/_preventSameURL';
import './validate/_acceptNumberOnly';
import './layout/_waves';
import './layout/_sideNav';
import './layout/_dropdown';
import './layout/_pagination';
import './layout/_modal';
import './layout/_countNum';
import charts from './layout/chartjs.init';
// https://github.com/hilios/jQuery.countdown
import 'jquery-countdown';

// #region GLOBAL
function changeTheme(){
  if ($('#theme-toggle').is(':checked')) {
    $('body').removeClass('theme-light');
    $('body').addClass('theme-dark');
  } else {
    $('body').removeClass('theme-dark');
    $('body').addClass('theme-light');
  }
}

$(document).on('change', '#theme-toggle',changeTheme);
// ADD CLASS ROTATED TO SETTING GEAR
$('.settings__btn').on('click', function(){
  if ($(this).hasClass('rotate')){
    $(this).removeClass('rotate');
  }
  $(this).addClass('rotate');
});
// lang__btn on click change html
$('.dropdown-submenu .dropdown-item').on('click', function(){
  const value = $(this).html();
  $('.settings__lang').html(value);
});
// charts();
$('#flipdown').countdown('2019/01/01', function(event) {
  $(this).html(event.strftime('%H:%M:%S'));
});
// counter
// #endregion.



