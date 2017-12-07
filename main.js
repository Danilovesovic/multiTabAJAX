let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
let allLinks = document.querySelectorAll('a');
let img = document.querySelector('img');
let xml = new XMLHttpRequest();

allLinks.forEach(e => {
    e.addEventListener('click',function (event) {
        img.style.display = "block";
        event.preventDefault();
        let link = this.getAttribute('href');
        xml.open('get',link);
          xml.onreadystatechange = function () {
              if (xml.readyState == 4 && xml.status == 200) {
                  display();
              }
          }
          xml.send();

    })
}); 


startScreen();


function startScreen() {

    xml.open('get', "http://mysafeinfo.com/api/data?list=bestnovels&format=json");
    xml.onreadystatechange = function () {
          if (xml.readyState == 4 && xml.status == 200) {
              display();
          }
    }
  
    xml.send()
}


function display() {
    img.style.display = "none";
    let data = JSON.parse(xml.responseText);
    let headText = "";
    let bodyText = "";

    data.forEach((e,i) => {
        if (i == 0) {
            headText += "<tr>";
                for (let prop in e) {
                    headText += '<th>'+prop+'</th>';
                }
            headText += "</tr>";
            thead.innerHTML = headText;
        } 
        bodyText += "<tr>";
            for(let prop in e){
                bodyText += '<td>'+e[prop]+'</td>';
            }
        bodyText += "</tr>";

    });
    tbody.innerHTML = bodyText;
}