//2

function palindrome(str){
    var ckeck = '';
    for (let i = str.length; i > 0; i--){
        ckeck += str[i];
    }
    if (str == ckeck){
        return true;
    }else {
        return false;
    }
};

console.log(palindrome(1010));