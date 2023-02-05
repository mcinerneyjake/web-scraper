const feedDisplay = document.querySelector('#feed');

fetch('http://localhost:8500/classifieds')
.then(response => response.json())
.then(data => {
  data.map(classified => {
    const title = `<div><h3>` + classified.title + `<h3><p>` + `https://minnesotaplaylist.com` + classified.classifiedUrl + `</p></div>`;
    feedDisplay.insertAdjacentHTML('beforeend', title);
  })
});