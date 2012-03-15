var reasonFileName = "reasons.txt";
var sqlFileName = "fill_reason_mapping.sql";
if(WScript.Arguments.length > 0) { 
        if(WScript.Arguments(0).match(/^sql:.*$/)) {
                sqlFileName = WScript.Arguments(0).replace(/^sql:/,"");
        }
        else {
                reasonFileName = WScript.Arguments(0).replace(/^reasons?:/,"");
        }
        if(WScript.Arguments.length > 1){
            if(WScript.Arguments(1).match(/^reasons?:.*$/)) {
                reasonFileName = WScript.Arguments(1).replace(/^reasons?:/,"");
            }
            else {
                    sqlFileName = WScript.Arguments(1).replace(/^sql:/,"");
            }
        }
}

//WScript.Echo(reasonFileName);
//WScript.Echo(sqlFileName);

var reasonsFile = new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(reasonFileName);
var sqlFile = new ActiveXObject("Scripting.FileSystemObject").CreateTextFile(sqlFileName);

var reason_mappingColumns = new Array("APPLICATION_ID","THEME_1","THEME_2","THEME_3","THEME_4","REASON_1","REASON_2","REASON_3","REASON_4","NOTES","LOAD_IND","PRIORITY");
var row, str;
for(i = 0; !reasonsFile.AtEndOfStream; i++) {
        str = reasonsFile.ReadLine().replace(/\'/g, "''");
        str = str.replace(/null/gi,"");
        str = str.replace(/(^.*$)/,"'$1'");
        str = str.replace(/\t/g,"'\t'");
        str = str.replace(/\t''\t/g,"\tNULL\t");
        str = str.replace(/\t''\t/g,"\tNULL\t");
        //sqlFile.WriteLine(str);
        row = str.split("\t");
        
/*        if(strs.length != ) {
                
                continue;
        }*/
        
        sqlFile.WriteLine("INSERT INTO REASON_MAPPING("+reason_mappingColumns.toString()+")VALUES("+row.toString()+");");
}
reasonsFile.Close();
sqlFile.Close();
