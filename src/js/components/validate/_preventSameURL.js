// prevent redirect to same link if hasclass activeSub
function stop() {
  return false;
}

// side-nav links
$('.collapse-item__link.activeSub').on('click', stop);
$('.navigation-item a.active').on('click', stop);

// pagination
$('.page-item.active .page-link').on('click', stop);
