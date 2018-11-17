$(document).on('click', '.prev', function () {
  const first = $(this).siblings().first();
  if (!first.hasClass('active')) {
    const active = $(this).siblings('.active');
    const prevItem = active.prev();
    const link = prevItem.children('a').prop('href');
    active.removeClass('active');
    prevItem.addClass('active');
    window.location.href = link;
  }
});
$(document).on('click', '.next', function () {
  const last = $(this).siblings().last();
  if (!last.hasClass('active')) {
    const active = $(this).siblings('.active');
    const nextItem = active.next();
    const link = nextItem.children('a').prop('href');
    active.removeClass('active');
    nextItem.addClass('active');
    window.location.href = link;
  }
});
