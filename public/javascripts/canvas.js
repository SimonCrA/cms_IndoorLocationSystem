
socket.on('show-canvas', jso =>{

    console.log(jso);
    let color=''
    let X=0
    let Y=0
    let R=1

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var tipCanvas = document.getElementById("tip");
    var wra = document.getElementById("wraps");
    var tipCtx = tipCanvas.getContext("2d");
    var canvasOffset = $("#myCanvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var myCanvas;
    
    //Varianles de configuracion
    var Rpoint =4; // Tamanio del punto a dibujar. (Utilizado para representar Beacons)
    var scale = 20;// escala por la que se multiplica las distancias
    
    // PointY [400 - inicia el origen en la esquina inferior izquierda]
    var pointy = 200;
    var pointx = 0
    
    //fillStyle: Establece el color de relleno del punto
    //lineWidth: establece el grosor de la linea
    ctx.fillStyle = color;
    ctx.lineWidth=1;
    //borra el contenido del canvas [desde el pixel 0,0 hasta el pixel 400,400]
    ctx.clearRect(0, 0, 400, 400);
    
    
    
    //*******************************
    
    
    
    /* ********************************************
    *** Este bloque Dibuja las Circunferencias   **
    *********************************************** */
    ctx.strokeStyle='rgb(27, 34, 36)'; // [Color de la linea de las 3 circunferencias]
    
     
    //**********  [0,0]  ************
    ctx.beginPath();
    ctx.arc((pointx), (pointy), jso.r1.toFixed(2)*scale, 0, Math.PI * 2, false);
    ctx.stroke();
    
    //**********  [X,0]  ************ 
    ctx.beginPath();
    ctx.arc(((jso.x)*scale)+pointx, (pointy), jso.r2.toFixed(2)*scale, 0, Math.PI * 2, false);
    ctx.stroke();
    
    //**********  [0,Y]  ************  
    ctx.beginPath();
    ctx.arc((pointx), (pointy-((jso.y)*scale)),  jso.r3.toFixed(2)*scale, 0, Math.PI * 2, false);
    ctx.stroke();
    
    
    /* ********************************************
    *** Este bloque Dibuja los Beacons           **
    *********************************************** */
    ctx.lineWidth=3;
    
    //**********  [0,0]  ************
    
    ctx.beginPath();
    ctx.strokeStyle='rgb(251, 255, 3)';
    ctx.arc((pointx), (pointy), Rpoint, 0, Math.PI * 2, false);
    ctx.stroke();
    //**********  [0,0]  ************
    
    // ctx.beginPath();
    // ctx.strokeStyle='rgb(251, 255, 3)';
    // ctx.arc((pointx), (350), Rpoint, 0, Math.PI * 2, false);
    // ctx.stroke();
    
    //**********  [X,0]  ************ 
    
    ctx.beginPath();
    ctx.strokeStyle='rgb(190, 68, 247)';
    ctx.arc(((jso.x)*scale)+pointx, (pointy), Rpoint, 0, Math.PI * 2, false);
    ctx.stroke();
    
    //**********  [0,Y]  ************  
    
    ctx.beginPath();
    ctx.strokeStyle='rgb(97, 51, 76)';
    ctx.arc((pointx), (pointy-((jso.y)*scale)), Rpoint, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.stroke();
    
    
    
    // /* ********************************************
    // *** Este bloque Dibuja las intersecciones    **
    // *********************************************** */
    // //**********  [C1C2]  ************
    // ctx.lineWidth=1;
    
    // ctx.beginPath();
    // ctx.strokeStyle='blue';
    // ctx.arc((parseFloat(c1c2)*scale)+pointx, pointy-(parseFloat(c1c2[1])*scale), 4, 0, Math.PI * 2, true);
    // ctx.stroke();
    
    // //**********  [C1C3]  ************ 
    // ctx.beginPath();
    // ctx.strokeStyle='orange';
    // ctx.arc((parseFloat(c1c3[0])*scale)+pointx, pointy-(parseFloat(c1c3[1])*scale), 4, 0, Math.PI * 2, true);
    // ctx.stroke();
    
    
    // //**********  [C2C3]  ************ 
    
    // ctx.lineWidth=2;
    // ctx.strokeStyle='purple';
    
    // //**********  [C2C3] Positivo ************ 
    
    // ctx.beginPath();
    // ctx.arc((parseFloat(ret[0])*scale)+pointx, pointy-(parseFloat(ret[1])*scale), 5, 0, Math.PI * 2, true);
    // ctx.stroke();
    // //**********  [C2C3] Negativo ************ 
    // ctx.beginPath();
    // ctx.arc((parseFloat(ret[2])*scale)+pointx, pointy-(parseFloat(ret[3])*scale), 5, 0, Math.PI * 2, true);
    // ctx.stroke();
    
    
    
    
    
    
    
    //**********  [ T A R G E T ] ************ 
    
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
    
    ctx.arc((jso.punt_x*scale)+pointx, pointy-(jso.punt_y*scale), 3, 0, Math.PI * 2, false);
    ctx.stroke();
    
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle='blue';
    ctx.lineWidth=1;
    ctx.fillStyle = 'blue';
    
    ctx.arc((jso.punt_x*scale)+pointx, pointy-(jso.punt_y*scale), R*scale, 0, Math.PI * 2, false);
    ctx.stroke();
    
    ctx.closePath()


})



function dot(color, X, Y, R){
    //Declaracion de variables...



        
}

