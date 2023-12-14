
 $.get("https://v1.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=%E5%8C%97%E4%BA%AC",function(data,status){
 	console.log(data.data[0].date)
 	console.log(data.data[0].narrative)
 	$('#pv').html(data.data[0].date+data.data[0].narrative)
       /* alert("数据: " + data + "\n状态: " + status);*/
    });
