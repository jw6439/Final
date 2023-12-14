
    const CLIENT_ID = "bce3dd7a243a4e9189d3fc0c3694aa07"
    const CLIENT_SECRET = "f10397f224804219987177ad55ebc877"
    const body = 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+''
    let access_token = ''
    let refresh_token = ''
	let player = document.getElementById('player');
	
    function getToken(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://accounts.spotify.com/api/token', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET));
        //-d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
        xhr.send(body);
        xhr.onload = run;
    }

    function run() {
        if( this.status == 200 ){
          var data = JSON.parse(this.responseText);
          console.log('data',data);
          
          if ( data.access_token != undefined ){
              access_token = data.access_token;
              localStorage.setItem("access_token", access_token);
          }
          if (data.refresh_token  != undefined ){
              refresh_token = data.refresh_token;
              localStorage.setItem("refresh_token", refresh_token);
          }

          // load
          load(access_token, 'list1', 'list0', '7gymGzawTWPj5BUamue2rr');
          load(access_token, 'list2', 'list3', '32RKYln79XabaXSvjZsv8y');
          load(access_token, 'list4', 'list5', '0pY8ltfCY31mkCTKR4GHiW');
          load(access_token, 'list6', 'list7', '2Z1zerAuAaaExrsG1F1dCm');
          load(access_token, 'list8', 'list9', '4sGZAFZUcoqGBkd1fEImHb');

      } else {
          console.log(this.responseText);
          alert(this.responseText);
      }
    }
	
	// play
	function playFun(url) {
		player.src = url;
		player.play()
	}
	
    // load
    function load(token, id1, id2, albums) {
      let xhr1 = new XMLHttpRequest();
        xhr1.open("GET", 'https://api.spotify.com/v1/albums/'+albums, true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr1.setRequestHeader('Authorization', 'Bearer ' + token);
        
        xhr1.send();
        xhr1.onload = function() {

          if( this.status == 200 ){

            var data = JSON.parse(this.responseText);
            console.log('result',data);
            let str1 = '';
            let str2 = '';
            // albums images
            let img = '';
            data.images.forEach(function(item,index) {
              if(index == 1) {
                str1 += '<li>'
                str1 += '<img src="'+item.url+'" alt="" width="300" height="300"/>'
                str1 += '</li>'  
                img = item.url;
              }
            
            })
            document.getElementById(id1).innerHTML = str1;
            
            // tracks
            data.tracks.items.forEach(function(item,index) {
              str2 += `<li data-url="${item.preview_url}" onclick="playFun('${item.preview_url}')">`
              // str1 += '<img src="'+img+'" alt="" width="300" height="300"/>'
              str2 += item.name + '<span class="play-btn">Play</span>'
              str2 += '</li>'  
            })
            document.getElementById(id2).innerHTML = str2;
            
            // play
            // $('.music-list').on('click','li', function() {
            //   $('#player')[0].src = $(this).data('url');
            //   $('#player')[0].play()
            // })
                
            } else {
                console.log(this.responseText);
                alert(this.responseText);
            }

        }
    }

    
    getToken();


