// Mobile nav toggle
(function(){
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', function(){
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ links.classList.remove('open'); });
  });
})();
