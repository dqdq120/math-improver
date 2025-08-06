
export function clearBody(params) {
  var i = 0;
  document.querySelectorAll("body > *").forEach(function (e) {
    if (i > 4) {
      e.remove();
    }
    i++;
  });
}
async function loadInit(fileName) {
  console.log(fileName)
    const { init } = await import(fileName);
    init(); // call the imported function
}


export function loadHTML(fileName) {
  fetch(fileName+".html")  
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML+= html;
        let folderPath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1);
        loadInit(folderPath+fileName+".js")
    })    
    .catch(err => console.error('Error loading HTML:', err));

}    
