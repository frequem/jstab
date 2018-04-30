function setCookie(name, value, days){
	let d = new Date();
	d.setTime(d.getTime() + (days*24*60*60*1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + "; path=/";
}

function readCookie(name){
	let nameEQ = name + "=";
	let s = document.cookie.split(";");
	for(let i=0; i<s.length; i++){
		let c = s[i];
		let o = c.indexOf(nameEQ);
		if(o >= 0){
			c = c.substring(o, c.length);
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

function deleteCookie(name) { 
	setCookie(name, '', -1);
}
