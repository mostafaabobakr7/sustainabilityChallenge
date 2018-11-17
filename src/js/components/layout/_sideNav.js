// nav-bar collapse on hover
$(document).on('click', '.navigation-item', function () {
  // clicked
  const $collapse = $(this);
  const $collapseBtn = $collapse.find('button');
  const $collapseToggle = $collapse.find('.dropdown-toggle');
  const $collapseItems = $collapse.find('.collapse');
  // others collapse
  const $otherCollapse = $(this).siblings();
  const $otherCollapseBtn = $otherCollapse.find('button');
  const $otherCollapseToggle = $otherCollapse.find('.dropdown-toggle');
  const $otherCollapseItems = $otherCollapse.find('.collapse');

  // clicked action:
  $collapseItems.slideToggle(300);
  $collapseToggle.toggleClass('rotate90');
  if (!$collapseBtn.hasClass('active')) {
    $collapseBtn.toggleClass('dropdown-hovered');
  }
  // others action
  $otherCollapseItems.slideUp(300);
  $otherCollapseToggle.removeClass('rotate90');
  $otherCollapseBtn.removeClass('dropdown-hovered');

});

// MOBILE: close nav on focus out
$('.page-wrapper').on('click', function () {
  $('.side-nav').removeClass('open');
  // $('.side-nav').css({'display': 'none'}).animate({
  //     opacity:0,
  //     width: '0px',
  //   },200);
  $('#nav-toggle').prop('checked', false);
})
// MOBILE: open nav
$('.navigation__btn').on('click', function (event) {
  event.stopPropagation();
  if ($('#nav-toggle').prop('checked') === false) {
    $('.side-nav').addClass('open');
    // $(this).animate({left: '185px'},200)
    // $('.side-nav').css({'display': 'block'}).animate({
    //   opacity:1,
    //   width: '185px',
    // },200);
  } else {
    $('.side-nav').removeClass('open');
    // $('.side-nav').css({'display': 'none'}).animate({
    //   opacity:0,
    //   width: '0px',
    // },200);
  }
});
