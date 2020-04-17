console.log(`hey?`);
// var settings = {
//   "url": "http://localhost:3000/imagen/Usuarios/5e161078b3aa362f1cac7dd0-844.jpg",
//   "method": "GET",
//   "timeout": 0,
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

var session=''
function login(e) {
  
  let email = document.getElementById('inputEmail').value
  let password = document.getElementById('inputPassword').value

  let dataToSend = {email, password}
  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify(dataToSend),
    dataType: 'json',
    success: function(data){
        console.log(`"device control succeeded" ${JSON.stringify(data)}`);
        console.log(`${data.sessionId}`);
        session = data.sessionId;
        sessionStorage.setItem('sessionId',data.sessionId)
        location.href ="http://192.168.0.101:3000/caracterizacion";
        
    },
    error: function(er){
        console.log(`"Device control failed" `);
        console.log(er.responseText);
    },
    processData: false,
    type: 'POST',
    url: '/users/login'
  });


  return false;
}

