function isPalindrome(word)
{
  // Please write your code here.
  let array1 = [];
  let word2 = '';
  word =word.toLowerCase()
  array1 = word.split('');
  let d = array1.length-1
  for(x in array1){
    word2 += array1[d-x]
    
  }
      if (word2 === word){
        return true
      }
      else{
        return false
      }
}
var word = `Deleveleds`
console.log(isPalindrome(word))

