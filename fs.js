/************************* 获取文件名
fs.readdir('views/', function(err,data){
  if(err){
    console.error(err);
  }else{
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      if(data[i].indexOf("html") != -1){
        arr.push(data[i]);
      }
    }
    console.log(arr);
  }
});
***************************************/