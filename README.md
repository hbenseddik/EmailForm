# EmailForm
Multi recipient email form

A solid email form with multi recipient functionality and complete input validation.

Funtionality

Email validation: Each inserted email is format validated, confirmed for no duplication, then styled and layed out (option to remove emails individualy before submission).

Subject validation: Subject line is set as a requirement before submission. 

Comment validation: Comment is set as a requirement before submission

Save email: Option to save email decided on whether Save option is on/off [Soon to be added]

Send: If ALL validation criterias are met, email with user Comment and Subjet will be sent to all selected Contacts (PHP: Post method will collect all email inputs). 
		If no errors --> Success message will appear with flashing checkmark for 3s, then reset form (email input will instantly reset to original value post submission to prevent multi submissions)
		If error(s)  --> Error message will appear flashing a red error icon and prompting to try again after form reset for 3s, then reset form.


Note: Not yet 100% complete. There definately are a few changes that could be made to yield a higher efficiency and I will get to them.
