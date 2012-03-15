function randomString(chars_str, length) {
    var chars;
    
    if(!chars_str || chars_str == '') {
        chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    }
    else {
        chars_str = chars_str.replace(/\[a\-z\]/, 'abcdefghiklmnopqrstuvwxyz');
        chars_str = chars_str.replace(/\[A\-Z\]/, 'ABCDEFGHIJKLMNOPQRSTUVWXTZ');
        chars_str = chars_str.replace(/\[0\-9\]/, '0123456789');
        chars_str = chars_str.replace(/\!\[\\w\|\\d\]/, '~!@#$%^&*()_+|\{}[]:";\',.<>/?');
        chars  = chars_str.split('');
        WScript.Echo(chars_str);
    }
    
    if(!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
/*
WScript.Echo(randomString());
WScript.Echo(randomString('wakejhdgasldvnbd;sfkj'));
WScript.Echo(randomString(null,100));
*/
WScript.Echo(randomString('[a-z]![\\w|\\d]',100));
