function hexUtfToUtfStr(hexUtf)
{
        var utfStr = '';

    for (i = 0; i < hexUtf.length; i += 4)
        {
                utfStr = utfStr + String.fromCharCode(parseInt(hexUtf.charAt(i)+hexUtf.charAt(i+1)+hexUtf.charAt(i+2)+hexUtf.charAt(i+3), 16));
        }
        if(utfStr == '')
        {
                //utfStr = 'Please, input hexidecimal sequence of utf codes (four hex digits for each string character).';
                utfStr = '';
                //utfStr = '[null]';
        }
        
        return utfStr;
}

var inHex = '';
if(WScript.Arguments.length > 0)
{
        inHex = WScript.Arguments(0);
}
//else {inHex = '04210442043e0438043c043e04410442044c002004370430043f0440043e0441043000200434043e00200033003000300020044004430431002004410020041d04140421002e002004210442043e0438043c043e04410442044c002004430441043b04430433043800200031002e00370020044004430431002004410020041d041404210020043704300020003700200434043d04350439002e0020041f0440043e0432043004390434043504400020041e041e041e002000ab04200430043f043f043e04400442043e00bb';}

WScript.echo(hexUtfToUtfStr(inHex));
