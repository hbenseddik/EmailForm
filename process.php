
<?php

if ($_POST["submit"]){ /*Trigger only when submitted*/


    $to = $_POST['emailtag'];  /*To all available recipients*/
    $to = str_replace('"', "", $to); /*Remove any " [ ] from post-value*/
    $to = str_replace('[', "", $to);
    $to = str_replace(']', "", $to);

    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $from = "emailformtest2016@gmail.com";
    $title = "Message from contact form";
    $headers = "From: $from";


    $formcontent = "
    From: $from \n
    Subject: $subject \n
    Message: $message";


    if (mail($to, $title, $formcontent, $headers)){ /*If mail is success, create and display success div.*/

        $result='<div id="success">Form sent<img id="successimg" src="images/success.png"></div>';

    } else {
        $result='<div id="error">Form failed<img id="errorimg" src="images/fail.png"><span><br>Try again after refresh</span></div>'; /*If mail failed, create and display fail div.*/
    }

	/*Display success/fail for 3s, then reset form by rerouting to main page*/
    header("Refresh:3; url=index.php");    

}     


    

?>
