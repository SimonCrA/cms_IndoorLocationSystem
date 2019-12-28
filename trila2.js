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

let arr=[ { region: '5dffc7d6c5a86004a87ca55b',
    rpi:
     [ 'dc:a6:32:0b:97:a7', 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ],
    tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
    share: '5dffc7e9c5a86004a87ca55c',
    statusShare: true,
    arrShare: [ 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ] },
  { region: '5dca0c3aef1a4a362832976a',
    rpi:
     [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:be', 'dc:a6:32:0b:a2:6a' ],
    tag: [],
    share: '5dca1b8abfcbb1377cedd07d',
    statusShare: true,
    arrShare: [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ] },
  { region: '5dffc78cc5a86004a87ca55a',
    rpi:
     [ 'dc:a6:32:0b:a2:6a', 'dc:a6:32:0b:a2:be', 'dc:a6:32:0b:a5:e6' ],
    tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
    share: null,
    statusShare: true,
    arrShare: [] },
  { region: '5dffc7e9c5a86004a87ca55c',
    rpi:
     [ 'b8:27:eb:de:9f:60', 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ],
    tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
    share: '5dffc7d6c5a86004a87ca55b',
    statusShare: true,
    arrShare: [ 'b8:27:eb:d4:04:c9', 'b8:27:eb:bd:36:61' ] },
  { region: '5dca1b8abfcbb1377cedd07d',
    rpi:
     [ 'dc:a6:32:0b:a5:e6', 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ],
    tag: [ 'c4:04:ca:41:50:ad', 'df:a9:ce:b7:4c:f1' ],
    share: '5dca0c3aef1a4a362832976a',
    statusShare: true,
    arrShare: [ 'dc:a6:32:0b:97:a7', 'dc:a6:32:0b:a2:6a' ] } ]

let fin= arr.findIndex(obj=>obj.region==='5dffc7e9c5a86004a87ca55c')

console.log(fin);