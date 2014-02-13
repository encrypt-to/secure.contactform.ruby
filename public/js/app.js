document.addEventListener('DOMContentLoaded', function(){	
  if (window.crypto && window.crypto.getRandomValues) {
		// form ready
		document.getElementById("name").focus();
		var message = document.getElementById("message");
		var ciphertext = document.getElementById("ciphertext");				
		// encrypt on the fly
		message.addEventListener("input", function(){
			ciphertext.style.display = "block";			
			ciphertext.value = cleanup(encrypt(message.value));			
		});		
		// encrypt on submit
		document.forms[0].addEventListener("submit", function(evt){
		  if( form.elements['message'].value == '') {
		    evt.preventDefault();
		    alert('Please enter a message!');
		  } else {
		  	form.elements['message'].value = encrypt(message.value);
				return true
		  }
		});		    
  } else {
		// not ready
		document.getElementById("button").disabled = true;
    window.alert("Error: Browser not supported\nReason: We need a cryptographically secure PRNG to be implemented (i.e. the window.crypto method)\nSolution: Use Chrome >= 11, Safari >= 3.1, Firefox >= 21, Opera >= 15 or IE >= 11.");   
    return false;
  }
});

function cleanup(msg) {
	return msg.replace(/(\r\n|\n|\r)/gm,"").replace("-----BEGIN PGP MESSAGE-----Version: OpenPGP.js v0.3.2Comment: http://openpgpjs.org","").replace("-----END PGP MESSAGE-----","");
}

function encrypt(msg) {
	if (msg.indexOf("-----BEGIN PGP MESSAGE-----") !== -1 && msg.indexOf("-----END PGP MESSAGE-----") !== -1) {
		return msg;		
	} else {
		var publickey = openpgp.key.readArmored(document.getElementById("pubkey").innerHTML).keys[0];
		return openpgp.encryptMessage([publickey],msg);;
	}  
}
