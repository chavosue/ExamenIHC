$('document').ready(()=>{
    console.log("ok");
    $.ajax
    ({
        type: "GET",
        url: "https://ihcanlth.000webhostapp.com/backend/buscar.php",
        success: function (res) {
            let grafbar=JSON.parse(res);
            potenciometro(grafbar.bar);
        }
  });
    $('#tabla').DataTable({
        "ajax": {
            "method":"POST",
            "url":"https://ihcanlth.000webhostapp.com/backend/buscar.php",
        },
        "columns":[
            {"data":"id"},
            {"data":"status"},
            {"data":'fecha'}
        ]
    } );
});

const texts = document.querySelector(".texts");

let compatible = document.getElementById('compatible');

let potencia = document.getElementById('potencia');

let mensaje = document.getElementById('mensaje'); mensaje
let ax = 0;
let v = document.getElementById('valor');
potencia.addEventListener('change', (e)=>{
    console.log(potencia.value);
    let dataString = "status=" + potencia.value;
    
    e.preventDefault();
    
    if(ax != potencia.value){
      ax = potencia.value;
      $.ajax
      ({
          type: "GET",
          url: "https://ihcanlth.000webhostapp.com/backend/setStatusSlider.php",
          data: dataString,
          success: function (res) {
              console.log(res);
              v.textContent = res;
          }
    });
  }
  });


window.SpeechRecognition =

    window.SpeechRecognition || window.webkitSpeechRecognition;



const recognition = new SpeechRecognition();

let gramatica = ['POTENCIA', 0, 100];



recognition.interimResults = true;

recognition.lang = "es-MX";



window.onload = (e) => {

    if (validateSpeechRecognition()) {

        compatible.innerHTML = "¡El navegador es compatible con Speech Recocgnition API!";

        recognition.start();

    }

    else

        compatible.innerHTML = "El navegador NO es compatible con Speech Recocgnition API";

}



recognition.onresult = (e) => {



    let text = Array.from(e.results)

        .map((result) => result[0])

        .map((result) => result.transcript)

        .join("");



    text = text.toUpperCase();



    //console.log(text);



    let arrayText = text.split(" ");



    let segundoValor = parseInt(arrayText[1], 10);



    //console.log(segundoValor);

    //console.log(arrayText);



    if (e.results[0].isFinal) {




        //text.includes("potencia")

        if (validaGramatica(arrayText[0], segundoValor, gramatica[0], gramatica[1], gramatica[2])) {

            texts.innerText = "Potencia por voz: " + segundoValor;

            potencia.value = segundoValor;

            mensaje.innerHTML = "Se envía la petición al servidor..."

        }   
        if (ax != segundoValor){
            ax = segundoValor;
            let dataString = "status=" + potencia.value;
            potencia.value=segundoValor;
            $.ajax
            ({
                type: "GET",
                url: "https://ihcanlth.000webhostapp.com/backend/setStatusSlider.php",
                data: dataString,
                success: function (res) {
                    console.log(res);
                    
                }
            });
    }
        /* else

            texts.innerText = ""; */

    }

};



/* recognition.addEventListener("end", () => {

    recognition.start();

}); */



// run when the speech recognition service has disconnected

// (automatically or forced with recognition.stop())

recognition.onend = () => {

    //console.log('Speech recognition service disconnected');

    recognition.start();

};



// will run when the speech recognition 

// service has began listening to incoming audio 

recognition.onstart = () => {

    console.log('Speech recognition service has started');

};



/* recognition.start(); */




function validateSpeechRecognition() {

    if (!('webkitSpeechRecognition' in window) ||

        !window.hasOwnProperty("webkitSpeechRecognition") ||

        typeof (webkitSpeechRecognition) != "function"

    ) {

        return false;

    }

    else {

        return true;

    }

}



function validaGramatica(palabra1, palabra2, gramatica1, gramatica2, gramatica3) {



    if (palabra1 == gramatica1 &&

        Number.isInteger(palabra2) &&

        palabra2 >= gramatica2 && palabra2 <= gramatica3) {

        return true;

    }

    else

        return false;

}
function potenciometro(a){
google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(a);

        var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('grafibar'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

}

