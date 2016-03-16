
<?php

include 'process.php';
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<title>EmailForm</title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0 maximum-scale=1.0;">
	
	<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
	<script type="text/javascript" src='http://code.jquery.com/jquery-latest.min.js'></script>

	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans">
	<script type="text/javascript" src="emails.js"></script>
	<link type="text/css" rel="stylesheet" href="main.css" />


	<script type="text/javascript">

		//Load edited Bootstrap theme for email input 
		$(function() {
			$('#emailtag').multiple_emails("Bootstrap");
		});
		
	</script>

</head>

<body>
	
	<div class="container">
		<?php echo $result; ?> <!--Success/Failure div after form is sent-->
		<div class="groupForm">			
			<form method="post" autocomplete="off" >

				<label for="emailtag">Contacts</label>
				<input class="email" type='text' id='emailtag' name='emailtag'  value='["contact@abc.com"]' >

				<label for="subject">Subject</label>
				<input class="subject" 
				data-msg-maxlength="Please limit your subject to 30 characters." 
				data-msg-minlength="Subject line must be at least 1 character." 
				data-msg-required="Please enter your subject." 
				data-rule-maxlength="30" 
				data-rule-minlength="1" 
				data-rule-required="true" 
				name="subject" type="text" placeholder="You can add a subject" value="<?php echo $_POST['subject']; ?>" > 

				<label for="message">Message</label>
				<textarea class="message" 
				data-msg-email="Please enter your message." 
				data-msg-required="Please enter your message." 
				data-rule-required="true" 
				name="message" type="text" placeholder="Leave your message here"><?php echo $_POST['message']; ?></textarea>

				<div class="gBtn">
					<input type="checkbox" name="checked" value="yes" id="c1" name="cc">
					<label for="c1"><span></span>Save a copy</label>

					<input type="submit" name="submit" value=" " class="btnz btnz2"></input>
				</div>

			</form>
		</div>
	</div>




<script src="http://ajax.aspnetcdn.com/ajax/jQuery.validate/1.11.1/jquery.validate.js" type="text/javascript"></script>
<script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>

<script type="text/javascript">

$(function() {  // Validation for Subject & Comment sections (Email validation taken care of by 'emails.js')

	$("form").validate({

		showErrors: function(errorMap, errorList) {

          // Remove tooltips when requirements are met
          $.each(this.validElements(), function (index, element) {
          	var $element = $(element);
          	$element.data("title", "") 
          	.removeClass("error")
          	.tooltip("destroy");
          });

          // New tooltips for invalid inputs
          $.each(errorList, function (index, error) {
          	var $element = $(error.element);

              $element.tooltip("destroy") // Remove pre-existing tooltip for regeneration
              .data("title", error.message)
              .addClass("error")
                  .tooltip(); // Create tooltip upon invalid input
              });

      }

  });

});

</script>

</body>
</html>
