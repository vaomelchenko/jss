var shiftSec = 5;
var inFileName;
var inFile;
var outFile;

if(WScript.Arguments.length == 0)
	WScript.quit();
if(!WScript.Arguments(0).match(/.*\.srt$/) && !WScript.Arguments(0).match(/shift=\d+$/))
	WScript.quit();

if(WScript.Arguments(0).match(/.*\.srt$/))
	inFileName = WScript.Arguments(0);
else if(WScript.Arguments.length == 2 && WScript.Arguments(0).match(/shift=\d+$/)) {
	shiftSec = parseInt(WScript.Arguments(0).replace(/shift=/,""));
	WScript.Echo(shiftSec);
	inFileName = WScript.Arguments(1);
	if(!inFileName.match(/.*\.srt$/))
		WScript.quit();
}
else
	WScript.quit();

var inFile = new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(inFileName);
var outFile = new ActiveXObject("Scripting.FileSystemObject").CreateTextFile(inFileName.replace(/(.*)\.srt$/, "$1_shifted.srt"));

if(!inFile || !outFile)
	WScript.quit();

//WScript.Echo(WScript.Arguments(0));
//WScript.Echo(WScript.Arguments(0).replace(/(.*)\.srt$/, "$1_shifted.srt"));

for(i = 0; !inFile.AtEndOfStream; i++) {
	str = inFile.ReadLine();
	if(str.match(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/)) {
		str_1 = str.replace(/^(\d\d:\d\d:\d\d),\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/, "$1");
		str_2 = str.replace(/^\d\d:\d\d:\d\d,\d\d\d --> (\d\d:\d\d:\d\d),\d\d\d$/, "$1");
		time_1 = new Date (new Date().toDateString() + " " + str_1);
		time_2 = new Date (new Date().toDateString() + " " + str_2);
//		WScript.Echo(str_1 + " --> " + str_2);
//		WScript.Echo(time_1.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1") + " --> " + time_2.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1"));
		time_1.setTime(time_1.getTime() + shiftSec * 1000);
		time_2.setTime(time_2.getTime() + shiftSec * 1000);
//		WScript.Echo(time_1.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1") + " --> " + time_2.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1"));]
		str_1 = str.replace(/^\d\d:\d\d:\d\d(,\d\d\d --> )\d\d:\d\d:\d\d,\d\d\d$/, "$1");
		str_2 = str.replace(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d(,\d\d\d)$/, "$1");
        str = time_1.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1") + str_1 + time_2.toString().replace(/^.*(\d\d:\d\d:\d\d).*/, "$1") + str_2;
	}
	outFile.WriteLine(str);
}
inFile.Close();
outFile.Close();

