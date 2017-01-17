// Convert to a bookmarklet using:
// http://bookmarklets.org/maker/
var oldScript = document.getElementById('omarsbookmarklet');

if (oldScript) {
  document.body.removeChild(oldScript);
}

var s=document.createElement('script');
s.setAttribute('src','http://localhost:8000/cnx/handler.js');
s.id = 'omarsbookmarklet';
document.body.appendChild(s);
