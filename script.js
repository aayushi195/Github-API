
data = [];
count = 0;


$(function()
{
	$("#btn1").on('click',function(e)
	{
		e.preventDefault();
		var username = $('#username').val();
		var a = 'https://api.github.com/users/'+username;
		var b = 'https://api.github.com/users/'+username+'/repos';
		requestJSON(a,function(json) {

			if(json.message == "Not Found" || username == ''){
				$('#apidata').html("<h2>No User found</h2>");
			}

			else{
				var fullname = json.name;
				var username = json.login;
				var aviurl = json.avatar_url;
				var location = json.location;
				var followersnum = json.followers;

				temp = {'fullname': fullname, 'username': username, 'aviurl': aviurl, 'location':location, 'followersnum': followersnum};
				data[count++] = (temp);
				console.log(data);

				if(fullname == undefined) { fullname = username}

					var outhtml = '<div class="card1">';
				giturl = "https://www.github.com/" + username;
				outhtml += '<img class="img1" onclick="document.location=\''+giturl+'\';return false;" src="'+aviurl+'">';
				outhtml += '<p id="name">'+fullname+'</p>';
				outhtml += '<span id="loc">Location: '+location+'</span>';
				outhtml += '<p>Followers: <span id="fol">'+followersnum+'</span></p><div id="delete"><i class="fa fa-close"></i></div>';
				outhtml += '</div>';
				$('#main').append(outhtml)
			}
		});         
});

$("#name").on('click',function(){
	console.log('here');
	sortResults('fullname',true);
	console.log(data);
	display();
});

$("#loc").on('click',function(){
	console.log('here');
	sortResults('location',true);
	console.log(data);
	display();
});

$("#fol").on('click',function(){
	console.log('here');
	sortResults('followersnum',false);
	console.log(data);
	display();
});

$(document).on('click','#delete',function(){	
// console.log('imhere');	
// alert('here');
$(this).parent().remove();
});




});	

function requestJSON(url, callback) {
	$.ajax({
		url: url,
		complete: function(xhr) {
			callback.call(null, xhr.responseJSON);
		}
	});
}

function sortResults(prop, asc) {
	data = data.sort(function(a, b) {
		if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	});
}

function display(){

	$('#main').empty();
	for(i=0; i<data.length; i++){

		var fullname = data[i].name;
		var username = data[i].username;
		var aviurl = data[i].aviurl;
		var location = data[i].location;
		var followersnum = data[i].followersnum;

		if(fullname == undefined) { fullname = username}

			var outhtml = '<div class="card1">';
		giturl = "https://www.github.com/" + username;
		outhtml += '<img class="img1" onclick="document.location=\''+giturl+'\';return false;" src="'+aviurl+'">';
		outhtml += '<p id="name">'+fullname+'</p>';
		outhtml += '<span id="loc">Location: '+location+'</span>';
		outhtml += '<p>Followers: <span id="fol">'+followersnum+'</span></p><div id="delete"><i class="fa fa-close"></i></div>';
		outhtml += '</div>';
		$('#main').append(outhtml)
	}
}


