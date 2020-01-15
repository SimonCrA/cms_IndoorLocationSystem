console.log(`hey?`);

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

