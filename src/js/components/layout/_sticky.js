import '../plugins/_jquery.sticky';


function myFunction(x) {
  if (x.matches) {
    $('.nav-side .flex').sticky();
  }
}

var x = window.matchMedia("(min-width: 900px)");
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
