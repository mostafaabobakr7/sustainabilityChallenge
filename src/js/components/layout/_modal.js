// show modal
$(document).on('click', '.modalOpener', function () {
  const $link = $(this).data('target');
  const $modal = $($link);
  const $modalContent = $modal.find('.modal-content');
  $modal.fadeIn(50).addClass('openedModal');
  $modalContent.addClass('animateScale');
});
// close modal
$('.modal').on('click', '.modalClose', function () {
  $(this).parents('.modal-content').removeClass('animateScale');
  $(this).parents('.modal').fadeOut(50).removeClass('openedModal');
});

// close modal click outside except .modal-content and .modalOpener
$(window).click(function (event) {
  if (!$(event.target).closest('.modal-content, .modalOpener').length) {
    $('body').find('.modal-content').removeClass('animateScale');
    $('body').find('.modal').fadeOut(50);
  }
});
