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



let arr = [1,1,1,1]

let a = arr.length
for (let i = 0; i < a; i++) {

    console.log(i);

    let fin = arr.indexOf(1)
    if(fin>=0){
        // console.log(fin);
        arr.splice(fin,1)
    }
}

console.log( arr);