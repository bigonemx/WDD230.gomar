const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
 document.getElementById('Modified').textContent = new Date().toLocaleDateString('en-US', options);