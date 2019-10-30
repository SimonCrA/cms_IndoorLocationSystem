
// var socket = io();
// socket.emit('libreta', 'Client-Web');


// socket.on('libreta-list', function(data) { render(data); });
// let render= async(data)=> { 
//     console.log(menu);
//     console.log(data);

//     menu = data
// }


function sendm(e){
    let distE= document.getElementById('mensaj').value
    console.log(distE)
  
    let urlRequest = '/put/ubicacionrpiselect'
  
    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify({ "command": "on" }),
      dataType: 'json',
      success: function(data){
          app.log("device control succeeded");
      },
      error: function(){
          app.log("Device control failed");
      },
      processData: false,
      type: 'PUT',
      url: '/put/ubicacionrpiselect'
  });
    return false;
  }





  
// let render= async(data)=> { 
//     console.log(menu);
//     console.log(data);

//     menu = data

    
    // console.log(data);
    // let select1 = document.getElementById("maclist1");
    // let select2 = document.getElementById("maclist2");
    // let select3 = document.getElementById("maclist3");
    // let length1 = select1.options.length;
    // let length2 = select2.options.length;
    // let length3 = select3.options.length;
    // console.log(length);
    // for (i = 0; i < length1+1; i++) {
    //   console.log(select1.options[i]);
    //   select1.options[i] = null;
    // } 
    // for (i = 0; i < length2+1; i++) {
    //   console.log(select2.options[i]);
    //   select2.options[i] = null;
    // } 
    // for (i = 0; i < length3+1; i++) {
    //   console.log(select3.options[i]);
    //   select3.options[i] = null;
    // } 
    
  
    // console.log(data.length);
    // for (let i = 0; i < data.length; i++) {
    //   console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    //   let maclist1 = document.getElementById("maclist1");
  
    //   let option = document.createElement("option");
    //   option.text = data[i].mac;
      
    //   maclist1.add(option);  
  
      
    // }
    // for (let i = 0; i < data.length; i++) {
    //   console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    //   let maclist1 = document.getElementById("maclist2");
  
    //   let option = document.createElement("option");
    //   option.text = data[i].mac;
      
    //   maclist1.add(option);  
  
      
    // }
    // for (let i = 0; i < data.length; i++) {
    //   console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    //   let maclist1 = document.getElementById("maclist3");
  
    //   let option = document.createElement("option");
    //   option.text = data[i].mac;
      
    //   maclist1.add(option);  
  
      
    // }


//   }
  
//   socket.on('libreta-list', function(data) { render(data); });