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
import './layout/_inputUpload';
import './layout/_modal';
import './layout/_countNum';
import charts from './layout/chartjs.init';


// import DataTable from './plugins/dataTables';
// import Draggabilly from './plugins/draggability';

// #region GLOBAL
function changeTheme(){
  if ($('#theme-toggle').is(':checked')) {
    $('body').removeClass();
    $('body').addClass('theme-dark');
  } else {
    $('body').removeClass();
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
charts();
// counter
// #endregion
