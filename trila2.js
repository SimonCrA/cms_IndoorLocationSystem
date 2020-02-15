// function isPalindrome(word)
// {
//   // Please write your code here.
//   let array1 = [];
//   let word2 = '';
//   word =word.toLowerCase()
//   array1 = word.split('');
//   let d = array1.length-1
//   for(x in array1){
//     word2 += array1[d-x]
    
//   }
//       if (word2 === word){
//         return true
//       }
//       else{
//         return false
//       }
// }
// var word = `Deleveleds`
// // console.log(isPalindrome(word))

// let arr = [[1,1,1,1],
//           [2,2,2,2],
//           [2,2,2,2],
//           [2,2,2,2]]
          
// console.log(arr[0].length)



// let arr = [1,1,1,1]

// let a = arr.length
// for (let i = 0; i < a; i++) {

//     console.log(i);

//     let fin = arr.indexOf(1)
//     if(fin>=0){
//         // console.log(fin);
//         arr.splice(fin,1)
//     }
// }

// console.log( arr);

// let arr=[ { region: '5dffc7d6c5a86004a87ca55b',
//     rpi:
//      [ 'dc:a6:32:0b:97:a7', 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ],
//     tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
//     share: '5dffc7e9c5a86004a87ca55c',
//     statusShare: true,
//     arrShare: [ 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ] },
//   { region: '5dca0c3aef1a4a362832976a',
//     rpi:
//      [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:be', 'dc:a6:32:0b:a2:6a' ],
//     tag: [],
//     share: '5dca1b8abfcbb1377cedd07d',
//     statusShare: true,
//     arrShare: [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ] },
//   { region: '5dffc78cc5a86004a87ca55a',
//     rpi:
//      [ 'dc:a6:32:0b:a2:6a', 'dc:a6:32:0b:a2:be', 'dc:a6:32:0b:a5:e6' ],
//     tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
//     share: null,
//     statusShare: true,
//     arrShare: [] },
//   { region: '5dffc7e9c5a86004a87ca55c',
//     rpi:
//      [ 'b8:27:eb:de:9f:60', 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ],
//     tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
//     share: '5dffc7d6c5a86004a87ca55b',
//     statusShare: true,
//     arrShare: [ 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ] },
//   { region: '5dca1b8abfcbb1377cedd07d',
//     rpi:
//      [ 'dc:a6:32:0b:a5:e6', 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ],
//     tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
//     share: '5dca0c3aef1a4a362832976a',
//     statusShare: true,
//     arrShare: [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ] } ]

// let fin= arr.findIndex(obj=>obj.region==='5dffc7e9c5a86004a87ca55c')
// let fecha = 1000000
// let time = new Date()
// console.log(time);




// let d = new Date();


// var datestring = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
// ("0" + d.getDate()).slice(-2) + "-:" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) ;


// console.log(datestring);




let array = [
    {
        "_id": "5d714f8dbe48251a587daf79",
        "mactag": "cc:50:e3:a9:8e:d6",
        "nombre": "tag1_ESP32",
        "tipo": "ventas",
        "estado": false,
        "__v": 0
    },
    {
        "_id": "5d729714284aa90a041e085f",
        "mactag": "c4:2f:eb:44:2c:ea",
        "nombre": "tag_lemon",
        "tipo": "ventas",
        "estado": true,
        "__v": 0
    },
    {
        "_id": "5d72bcc0d773281c848cea90",
        "mactag": "c4:4f:33:0b:35:23",
        "nombre": "tag2_ESP32",
        "tipo": "ventas",
        "estado": true,
        "__v": 0
    },
    {
        "_id": "5d72bcf4d773281c848cea91",
        "mactag": "c4:4f:33:0b:aa:1b",
        "nombre": "tag3_ESP32",
        "tipo": "ventas",
        "estado": true,
        "__v": 0
    },
    {
        "_id": "5dbd0b4f0137bd3410fcf1ad",
        "mactag": "ee:23:f3:72:56:17",
        "nombre": "tag1_Betrooth",
        "tipo": "ventas",
        "estado": true,
        "__v": 0
    },
    {
        "_id": "5dbd0b5f0137bd3410fcf1ae",
        "mactag": "e5:57:fe:96:d6:f8",
        "nombre": "tag1_Candy",
        "tipo": "ventas",
        "estado": true,
        "__v": 0
    },
    {
        "_id": "5ddeda61de8f9041902e1359",
        "mactag": "c8:64:46:ac:3a:18",
        "nombre": "PtDatz",
        "tipo": "ventas",
        "estado": true,
        "temperature": 0,
        "batteryLevel": 0,
        "__v": 0
    },
    {
        "_id": "5ddeda7ede8f9041902e135a",
        "mactag": "c4:04:ca:41:50:ad",
        "nombre": "PtQ09p",
        "tipo": "ventas",
        "estado": true,
        "temperature": 28.5,
        "batteryLevel": 2975,
        "__v": 0
    },
    {
        "_id": "5ddeda97de8f9041902e135b",
        "mactag": "df:a9:ce:b7:4c:f1",
        "nombre": "PtX9uL",
        "tipo": "ventas",
        "estado": true,
        "temperature": 29.75,
        "batteryLevel": 2962,
        "__v": 0
    },
    {
        "_id": "5de81b749f8ef02c9cd47d3f",
        "mactag": "12::234:234:",
        "nombre": "esphfhf",
        "tipo": null,
        "estado": false,
        "__v": 0
    },
    {
        "_id": "5e0e3779f0ba1222285264e6",
        "mactag": "cc:50:e3:a9:8e:d623232323",
        "nombre": "tag1_ESP32222wwwww",
        "tipo": "servicio",
        "__v": 0,
        "estado": false
    },
    {
        "_id": "5e1b0ad285741214c4bb2d5f",
        "mactag": "23:23:23:23:23:23",
        "nombre": "tagbeco",
        "tipo": null,
        "__v": 0
    },
    {
        "_id": "5e1b0e91757cb83774468b39",
        "mactag": "24:24:24:24:24:24:",
        "nombre": "tagbeco223fsdf",
        "tipo": null,
        "__v": 0
    },
    {
        "_id": "5e20cd722f1ea3235cf7186d",
        "mactag": "beto:jose:Lb",
        "nombre": "beto",
        "tipo": "Ventas",
        "__v": 0
    }
]







// array.forEach((element, index) => {
//     if(element.batteryLevel != undefined){
//         // console.log(index);
//         console.log(element.batteryLevel);
        
//         array[index].batteryLevel = ((element.batteryLevel/1000) /3) *100
        
//         console.log(element.batteryLevel);

        
        

//     }
// });

// console.log(((1049/1000)/3)*100);


// let dato
// console.log("Escribe tu nombre");
// process.stdin.on('readable', () => {
//     let chunk;
//     // Use a loop to make sure we read all available data.
//     while ((chunk = process.stdin.read()) !== null) {
//       process.stdout.write(`data: ${chunk}`);
//     }
//   });
  
//   process.stdin.on('end', () => {
//     process.stdout.write('end');
//   });

// // let chunk = process.stdin.read()
// //       process.stdout.write(`data: ${chunk}`);
const gm = require('gm');



// try {
    
    
    
//     let validarImagen = (imagen) =>{
    
//         return new Promise((resolve, reject) => {
//             console.log(imagen);
    
//             gm(imagen)
//             .size((err, size) => {
//                 if(err){
//                     return reject(err)
//                 }else{
    
//                     objectSize = {
//                         width: size.width,
//                         height: size.height
//                     }
//                     return resolve(objectSize)
//                 }
//             })
//         })
        
    
//     }
    
//     validarImagen().then(obj=>{
//         console.log(obj);
//     })
// } catch (error) {
//     console.log(error);
// }


// gm('712.jpg')
//             .size((err, size) => {
//                 if(!err){
//                     console.log(size);
//                 }
//                 else{console.log(err);}

//             })





var sizeof = require('image-size')

sizeof('uploads/usuarios/undefined-889.jpg', (err, dim)=>{
  
    console.log(dim);
})