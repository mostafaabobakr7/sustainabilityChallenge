function themeDark() {
  document.documentElement.setAttribute('data-theme', 'dark');
}

function themeLight() {
  document.documentElement.setAttribute('data-theme', 'light');
}


function changeTheme() {
  if ($('#theme-toggle').is(':checked')) {
    themeDark();
    localStorage.setItem('dark', true);
  } else {
    themeLight();
    localStorage.removeItem('dark');
  }
}
$(document).on('change', '#theme-toggle', changeTheme);
// ON PAGE Refresh GET THEME FROM localstorage
if (localStorage.getItem('dark')) {
  $('#theme-toggle').prop('checked', true);
  themeDark()
}
