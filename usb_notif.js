//var record = WScript.CreateObject("ADODB.Recordset");
//var objConnection = WScript.CreateObject("ADODB.Connection");

var eaidbConnStr = "Provider=OraOLEDB.Oracle;"
                      +"Data Source=EAIDB.BEE.VIMPELCOM.RU;"
                      +"User Id=AI_P;Password=jio4rj493";
var ensConnStr = "Provider=OraOLEDB.Oracle;"
                                +"Data Source=RUS1.BEE.VIMPELCOM.RU;"
                    +"User Id=vmpapp63;Password=vmpapp63";

var eaidbConn = WScript.CreateObject("ADODB.Connection");
var ensConn = WScript.CreateObject("ADODB.Connection");
eaidbConn.ConnectionString = eaidbConnStr;
ensConn.ConnectionString = ensConnStr;
eaidbConn.open();
ensConn.open();

var ctns = eaidbConn.execute("SELECT * FROM ETLEAI_SMS2VSMBC WHERE STATUS = 'N' AND FILEPATH = 'USBN' AND (FN_PREFIX = 'USBN_O' OR FN_PREFIX = 'USBN_A') AND SYS_CREATION_DATE = (SELECT MAX(SYS_CREATION_DATE) FROM ETLEAI_SMS2VSMBC WHERE STATUS = 'N' AND FILEPATH = 'USBN' AND (FN_PREFIX = 'USBN_O' OR FN_PREFIX = 'USBN_A'))");
//var ctns_c2 = eaidbConn.execute("SELECT COUNT(DISTINCT(CTN)) FROM ETLEAI_SMS2VSMBC WHERE STATUS = 'N' AND FILEPATH = 'USBN' AND (FN_PREFIX = 'USBN_O' OR FN_PREFIX = 'USBN_A')").Fields.Item(0);
var ctns_str = "";
while(!ctns.eof) {
        ctns_str = ctns_str + (ctns.Fields("CTN")+"; "+ctns.Fields("PARAMETERS")+"; "+ctns.Fields("SYS_CREATION_DATE")) + "; " + ctns.Fields("FN_PREFIX") + "\n";
        ctns.moveNext();
}
WScript.echo(ctns_str);

//WScript.echo(ctns_c1);
//WScript.echo(ctns_c2);


var socs = ensConn.execute("SELECT DISTINCT(SOC) FROM vmpref63.PP_AGR_RESTRICTION WHERE AGREEMENT_TYPE= 'NOTIFUSB' AND PP_EFFECTIVE_DATE < SYSDATE AND (PP_EXPIRATION_DATE IS NULL OR PP_EXPIRATION_DATE > SYSDATE)");


for(var i = 0; i < 0 && !socs.eof; i++) {
  WScript.echo(socs.Fields.Item("SOC"));
  socs.moveNext();
}
/*
var socs_str = socs.getString(2,10);
var socs_array = socs.getRows();
WScript.echo(socs_str);
WScript.echo(socs_array[0]);
*/
eaidbConn.close();
ensConn.close();
