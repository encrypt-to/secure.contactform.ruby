document.addEventListener('DOMContentLoaded', function() {
	if (window.crypto && window.crypto.getRandomValues) {
		// form ready
		document.getElementById("name").focus();
		var message = document.getElementById("message");
		var ciphertext = document.getElementById("ciphertext");
		// encrypt on the fly
		message.addEventListener("input", function() {
			ciphertext.style.display = "block";
			cleanup(encrypt(message.value)).then(function (clean_msg) {
				ciphertext.value = clean_msg;
			});
		});
		// encrypt on submit
		document.forms[0].addEventListener("submit", function(evt) {
			evt.preventDefault();
			if (form.elements['message'].value == '') {
				alert('Please enter a message!');
			} else {
				encrypt(message.value).then(function(encrypted_msg) {
					form.elements['message'].value = encrypted_msg;
					form.submit();
				});
				return true;
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
	return msg.then(function(msgraw) {
		return msgraw.replace(/(\r\n|\n|\r)/gm,"").replace("-----BEGIN PGP MESSAGE-----Version: OpenPGP.js v0.9.0Comment: http://openpgpjs.org","").replace("-----END PGP MESSAGE-----","");
	});
}

function encrypt(msg) {
	if (msg.indexOf("-----BEGIN PGP MESSAGE-----") !== -1 && msg.indexOf("-----END PGP MESSAGE-----") !== -1) {
		return msg;
	} else {
		var key = document.getElementById("pubkey").innerHTML;
		var publicKey = openpgp.key.readArmored(key).keys[0];
		return openpgp.encryptMessage(publicKey, msg).then(function(pgpMessage) {
			return pgpMessage;
		});
	}
}
