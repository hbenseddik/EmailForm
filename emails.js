(function( $ ){

	$.fn.multiple_emails = function(options) {
		
		// Default options
		var defaults = {
			checkDupEmail: true,
			theme: "Bootstrap"
		};

		// Merge send options with defaults
		var settings = $.extend( {}, defaults, options );

		//Delete email ICON		
		var deleteIconHTML = "";
		deleteIconHTML = '<div class="remove"><a href="#" class="fill-remove"></a></div>';


		//Return result after EACH INPUT 
		return this.each(function() {
			var $orig = $(this);
			var $list = $('<ul class="multiple_emails-ul" />'); // Create the email input UL


			//If input value is not empty & valid Json string 
				//For each input, parse & return js value -- Then send to funtion alongside index param
					//Append newly created email list under UL
						//Append email remove ICON 
							//On click, remove that specific email and refresh emails
							if ($(this).val() != '' && IsJsonString($(this).val())) {
								$.each(jQuery.parseJSON($(this).val()), function( index, val ) {
									$list.append($('<li class="multiple_emails-email"><span class="email_name" data-email="' + val.toLowerCase() + '">' + val + '</span></li>')
										.append($(deleteIconHTML)	
						   .click(function(e) { $(this).parent().remove(); refresh_emails(); e.preventDefault(); }) //Option to remove email
						   )
										);
								});
							}

			//Email validation 
			var $input = $('<input type="text" class="multiple_emails-input" name="emailtag"/>').on('keyup', function(e) { //Add input then when moving away from input on keyup (conditions below)...

				$(this).removeClass('multiple_emails-error'); //Clean up existing (if any)error css upon new input 
				var input_length = $(this).val().length;
				
				var keynum;
				if(window.event){ // IE					
					keynum = e.keyCode;
				}
				else if(e.which){ // Netscape/Firefox/Opera					
					keynum = e.which;
				}

				// Supported key press: Tab, enter, space or comma
				if(keynum == 9 || keynum == 32 || keynum == 188) { 
					display_email($(this), settings.checkDupEmail);
				}
				else if (keynum == 13) {
					display_email($(this), settings.checkDupEmail);
					//Prevents enter key default (submit)
					e.preventDefault();
				}

			}).on('blur', function(event){ 
				if ($(this).val() != '') { display_email($(this), settings.checkDupEmail); }
			}); //If not empty, check if already exisiting then add email  





			var $container = $('<div class="multiple_emails-container" />')
			$container.append($input).append($list).insertBefore($(this));

			
			//If input is long string of multi emails, break them up and if format of any is invalid, it will not be dispalyed in the ul. The error box will contain it and alert user.

			function display_email(t, checkDupEmail) {
				
				//Remove space, comma and semi-colon from beginning and end of each email
				var arr = t.val().trim().replace(/^,|,$/g , '').replace(/^;|;$/g , '');
				//Remove the double quote
				arr = arr.replace(/"/g,"");
				//Split string into an array, with the space, comma, and semi-colon as the separator
				arr = arr.split(/[\s,;]+/);
				

				var errorEmails = new Array(); 
				

				//Email format validation 

				var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				

				for	(var i = 0; i < arr.length; i++) {
					//Check if the email is already added, only if checkDupEmail is set to true
					if ( checkDupEmail === true && $orig.val().indexOf(arr[i]) != -1 ) {
						if (arr[i] && arr[i].length > 0) {
							new function () {
								var existingElement = $list.find('.email_name[data-email=' + arr[i].toLowerCase().replace('.', '\\.').replace('@', '\\@') + ']');
								existingElement.css('font-weight', 'bold'); //Highlight dup email for 2s.
								setTimeout(function() { existingElement.css('font-weight', ''); }, 2000);
							}(); 
						}
					}
					else if (pattern.test(arr[i]) == true) {
						$list.append($('<li class="multiple_emails-email"><span class="email_name" data-email="' + arr[i].toLowerCase() + '">' + arr[i] + '</span></li>')
							.append($(deleteIconHTML)	
						   .click(function(e) { $(this).parent().remove(); refresh_emails(); e.preventDefault(); }) //Option to remove email
						   )
							);
					}
					else
						errorEmails.push(arr[i]);
				}


				// If invalid emails found, add error class
				if(errorEmails.length > 0)
					t.val(errorEmails.join("; ")).addClass('multiple_emails-error');
				else
					t.val("");
				refresh_emails ();
			}

			function refresh_emails () { 
				var emails = new Array();
				var container = $orig.siblings('.multiple_emails-container');
				container.find('.multiple_emails-email span.email_name').each(function() { emails.push($(this).html()); });
				$orig.val(JSON.stringify(emails)).trigger('change');
			}
			
			function IsJsonString(str) {
				try { JSON.parse(str); }
				catch (e) {	return false; }
				return true;
			}
			

			return $(this).hide();

		});

};


})(jQuery);