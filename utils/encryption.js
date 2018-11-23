//生成大写字母  A的Unicode值为65
function generateBig_1(){
    let str = [];
    for(let i=65;i<91;i++){
        str.push(String.fromCharCode(i));
    }
    return str;
}
//生成大写字母  a的Unicode值为97
function generateSmall_1(){
    let str = [];
    for(let i=97;i<123;i++){
        str.push(String.fromCharCode(i));
    }
    return str;
}

function generateNumber(){
    let str = [];
    for(let i=48;i<58;i++){
        str.push(String.fromCharCode(i));
    }
    return str;
}


//将字符串转换成Unicode码
function toUnicode(str = 'DBCAEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='){
    let codes = [];
    for(let i=0;i<str.length;i++){
        codes.push(str.charCodeAt(i).toString('2'));
    }
    return codes;
}
toUnicode()

function generateSmall(){
    let ch_small = 'a';
    let str_small = '';
    for(let i=0;i<26;i++){
        str_small += String.fromCharCode(ch_small.charCodeAt(0)+i);
    }
    return str_small;
}

function generateBig(){
    let ch_big = 'A';
    let str_big = '';
    for(let i=0;i<26;i++){
        str_big += String.fromCharCode(ch_big.charCodeAt(0)+i);
    }
    return str_big;
}

// console.log(generateBig());
// console.log(generateSmall());

console.log(toUnicode(generateBig()));
console.log(toUnicode(generateSmall()));

// console.log(generateBig_1());
// console.log(generateSmall_1());