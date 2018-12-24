import './global/global-jquery';
import './global/global-chart';
import './global/global-waves';
import 'bootstrap/dist/js/bootstrap.bundle';
import './validate/_preventSameURL';
import './validate/_acceptNumberOnly';
import './layout/_theme';
import './layout/_settings';
import './layout/_waves';
import './layout/_dropdown';
import './layout/_pagination';
import './layout/_sticky';
import './layout/_modal';
import './layout/_countNum';
import { charts, chartSide } from './layout/chartjs.init';
// https://github.com/hilios/jQuery.countdown
import 'jquery-countdown';

// #region GLOBAL
// counter
$('#flipdown').countdown('2019/01/01', function (event) {
  $(this).html(event.strftime('%H:%M:%S'));
});
// cards same height
const prodH = $('.production').height();
$('.demand').height(prodH);
const marketingH = $('.marketing').height();
$('.adminstration').height(marketingH);
// charts
chartSide();
$("#chartModal").on('shown.bs.modal', charts);
// #endregion.



