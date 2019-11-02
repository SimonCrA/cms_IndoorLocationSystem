function isPalindrome(word)
{
  // Please write your code here.
  let array1 = [];
  let word2 = '';
  word =word.toLowerCase()
  array1 = word.split('');
  console.log(array1);
  let d = array1.length-1
  for(x in array1){
      console.log(d-x)
    word2 += array1[d-x]
  }
  return word2
}
var word = `Deleveled`
console.log(isPalindrome(word))