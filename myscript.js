
function validationForPayment() {  //function calls 4 different functions to validate for payment validation purposes
       var finalcheck="";//assign new variable for calling function purposes
       finalcheck = validateProp(finalcheck);//function call 
       finalcheck = validateDown(finalcheck);//function call
       finalcheck = validateIntrate(finalcheck);//function call
       finalcheck = validateAmortization(finalcheck); //function call
       if (finalcheck == "")//checking if no errors in the form send information to detail payment calculation
        {
           var newpropValue=Number(document.mortgage.propValue.value);//assign new variable for calling data from id and converts it to number with number function
           var newdownPay=Number(document.mortgage.downPay.value);//assign new variable for calling data from id and converts it to number with number function
           var newintRate=Number(document.mortgage.intRate.value);//assign new variable for calling data from id and converts it to number with number function
           var newamortization=Number(document.mortgage.amortization.value);//assign new variable for calling data from id and converts it to number with number function
           detailPaymentCalculation(newpropValue,newdownPay,newintRate,newamortization);//passing my new received data and send to the other function
        }//end of condition if true
       else{//if we have an error we will send it to comments area box, condition for false statement
       document.getElementById('comments').innerHTML="Please complete the form first and then click on Calculate Monthly Payment";//getting id info and replacing with our text
       }//end of condition if false

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

} // End of validationForPayment function

    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {//calculates our payment

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         paymentError = "Please complete the form before attempting to calculate the monthly payment" 
         document.forms[0].comments.value = paymentError;
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
           //document.forms[0].comments.value = "";
     }

} // End of detailPaymentCalculation function



function completeFormValidation() {

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from OFF to ON      *//
    //*                                                                              *//
    //*    When a browser submits a form to a CGI program, disabled fields           *//
    //*    like the payment field are not included. To insure that the payment field *//
    //*    is sent to the CGI, include the following JavaScript statement            *//
    //*    document.forms[0].payment.disabled = false;                               *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//

       var showErrorMessage = ""; //assign new variable with empty information in it
       showErrorMessage = validateuserId(showErrorMessage);  // Call  validation function
       showErrorMessage = validateClient(showErrorMessage);// Call  validation function
       showErrorMessage = validateProp(showErrorMessage);// Call  validation function
       showErrorMessage = validateDown(showErrorMessage);// Call  validation function
       showErrorMessage = validateDetails(showErrorMessage);// Call  validation function
       showErrorMessage = validateIncome(showErrorMessage);// Call  validation function
       showErrorMessage = validateLocation(showErrorMessage);// Call  validation function
       showErrorMessage = validateYearmonth(showErrorMessage);// Call  validation function
       showErrorMessage = validateMonth(showErrorMessage);// Call  validation function
       showErrorMessage = validateIntrate(showErrorMessage);// Call  validation function
       showErrorMessage = validateAmortization(showErrorMessage);// Call  validation function
      
       if (showErrorMessage != "") {// checks if we have errors , if yes it will show errors through show errors function
          showErrors(showErrorMessage);//call function to show errors messages        
          return false;// returning false just for not submitting purposes to CGI
                                        
       }//end of condition if true                               
       else {// condition if false, will replace the first letter of name with capital one  and jsactive will switch to ON
          clearShowErrors();//call function to clear errors messages 
            showErrorMessage = validatejavaactive(showErrorMessage);//call function to activate jsactive id  to ON, we have OFF by default  
            showErrorMessage = validateUppercase(showErrorMessage);//call function to replace first letter of name with capital letter 
            document.forms[0].payment.disabled = false;           
            return true;// this true will submit my form to the CGI
       }//end of my condition 
          
        
}//end of validation function
function validateuserId(showErrorMessage) {//function validation for userId

               var stringName=document.mortgage.userId.value;// assign new variable when i get the data from userId id 
                   if (stringName.length < 10 || stringName.length > 10  ) { // Rule 1 checking the length if of function 10 char min
                     showErrorMessage += "<p>- User Id: The name field can not be left empty, less than or more than 10 character.This field include hyphen.";//sending error message to complete form validation
                   }// end of condition 
                 if (stringName == " ")
                 {
                 showErrorMessage += "<p>- User Id: Can not be a blank.</p>";
                 }
                       if(stringName.charAt(4) != "-"){// Rule 2 checking if the 5th position is hyphen
                         showErrorMessage += "<p>- User Id: 5th position should be: \"-\" hyphen.</p>";//sending error message to complete form validation
                       }// end of condition 
               var check=true;//boolean  condition with my variable 
                   for( var i=0; i<4; i++){// Rule 3 checking the data for numeric only using ASCII code method with char code method, it runs through the first 4 characters
                       if(stringName.charCodeAt(i) < 48 || stringName.charCodeAt(i) > 57 )
                        {
                         showErrorMessage += "<p>- User Id: First 4 positions must be numeric only.</p>";//sending error message to complete form validation
                        check=false;//checks boolean values
                        break;//this break makes only one error message instead of each and every single loop of for loop
                       }// end of condition 
                   }// end of for loop

                       for( var i=5; i<10; i++){// Rule 4
                            if(stringName.charCodeAt(i) < 48 || stringName.charCodeAt(i) > 57 )// Rule 4 checking the data for numeric only using ASCII code method with char code method, it runs through the last 5 characters
                            {
                             showErrorMessage += "<p>- User Id: Last 5 positions must be numeric only.</p>";//sending error message to complete form validation
                             check=false;//checks boolean values
                             break;//this break makes only one error message instead of each and every single loop of for loop
                            }// end of condition 
                        }// end of for loop
                
               if (check)//boolean method to check condition for true
                {
                    var total= 0;//initializing variable 
                    var total1=0;//initializing variable 
                        for(var i=0;  i<4; i++){// Rule 5
                      
                            var b=stringName.charAt(i);//my loop runs 4 times in the first 4 position 
                            total += Number(b);//after it calculates all data, but to make sure that is a number i use number function to make it number
                        }//end of for loop for the firts 4 positions
                   
                   
                       for(var i=5;  i<=9; i++){// Rule 5
                        
                        var b=stringName.charAt(i);//my loop runs 5 times in the last 5 position 
                        total1 += Number(b);//after it calculates all data, but to make sure that is a number i use number function to make it number
                       }//end of for loop for the last 5 positions
                           if (total == 0)//now checking conditions of our total value if 0 for the first 4 positions
                            {//start condition
                             showErrorMessage += "<p>- User Id: The sum of the first 4 positions must not be 0.</p>";//sending error message to complete form validation
                           }//end of condition
                               if (total1 == 0)//now checking conditions of our total value if 0 for the last 5 positions
                                {//start condition
                                 showErrorMessage += "<p>- User Id: The sum of the last 5 positions must not be 0.</p>";//sending error message to complete form validation
                               }//end of condition
                                   if (total1 != ((total*2)+1))// Rule 6 checking that the total value of the last 5 positions must be double of the first 4 positions plus 1 
                                    {//start condition
                                      showErrorMessage += "<p>- User Id: The sum of the last 5 positions must  double of the first 4 positions plus 1 .</p>";//sending error message to complete form validation
                                   }//end of condition 
                  }// end of if boolean
               return showErrorMessage;// returning error message if we have one or more  
}//end of function for the client id


function validateClient(showErrorMessage){//function validation for client
        var stringClient=document.mortgage.client.value;
                
                
           if (stringClient == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Name: Can not be a blank.</p>";
                 }
                 if (stringClient.length < 3 ) { //  checking the length if of function 10 char min
                     showErrorMessage += "<p>- Name: The name field can not be left empty, less than 3 character.";//sending error message to complete form validation
                   }// end of condition 
                 if(stringClient.indexOf('\'') == 0 || stringClient.lastIndexOf('\'') == (stringClient.length -1) )
                 {
                  showErrorMessage += "<p>- Name: An apostrophe can not be at the beginning or the end.";//sending error message to complete form validation
                 }
                 
                     if(stringClient.indexOf('-') == 0 || stringClient.lastIndexOf('-') == (stringClient.length - 1) )
                     {
                      showErrorMessage += "<p>- Name: A hyphen can not be at the beginning or the end.";//sending error message to complete form validation
                     }
                         if(stringClient.indexOf('-') !=  stringClient.lastIndexOf('-') )
                         {
                          showErrorMessage += "<p>- Name: We can use only one hyphen.";//sending error message to complete form validation
                         }
                             if(stringClient.indexOf('\'') !=  stringClient.lastIndexOf('\'') )
                             {
                              showErrorMessage += "<p>- Name: We can use only one apostrophe.";//sending error message to complete form validation
                             }
                                if(stringClient.indexOf('\'') != -1 && stringClient.indexOf('-') != -1){
                                      if(stringClient.indexOf('\'') ==  (stringClient.indexOf('-')-1) || stringClient.indexOf('-') ==  (stringClient.indexOf('\'')-1) ||stringClient.lastIndexOf('\'') ==  (stringClient.lastIndexOf('-')-1) || stringClient.lastIndexOf('-') ==  (stringClient.lastIndexOf('\'')-1))
                                     {
                                      showErrorMessage += "<p>- Name: An apostrophe can not go together with a hyphen and the hyphen can not go together with the apostrophe.";//sending error message to complete form validation
                                     }
                                 }
     
                                     for( var i=0; i<3; i++){
                                            if(stringClient.charCodeAt(i) < 65 || stringClient.charCodeAt(i) > 90 && stringClient.charCodeAt(i) < 97 || stringClient.charCodeAt(i) > 122 )
                                            {
                                             showErrorMessage += "<p>- Name: First 3 positions must alphabetic (a to z) or (A to Z).</p>";//sending error message to complete form validation
                                             break;//this break makes only one error message instead of each and every single loop of for loop
                                           }
                                      }
                                      for( var i=0; i<stringClient.length; i++){
                                           if(stringClient.charCodeAt(i) >= 65 && stringClient.charCodeAt(i) <= 90 || stringClient.charCodeAt(i) >= 97 && stringClient.charCodeAt(i) <= 122 || stringClient.charCodeAt(i) == 39 || stringClient.charCodeAt(i) == 45 )
                                            { 
                                            }
                                               else{
                                                 showErrorMessage += "<p>- Name: The name  can contain ' (apostrophe) or - (hyphen).</p>";//sending error message to complete form validation
                                                 break;//this break makes only one error message instead of each and every single loop of for loop
                                                 }
                                       }
                            return showErrorMessage;// returning error message if we have one or more   


}


function validateProp(showErrorMessage){//function validation for property value
        var stringProp=document.mortgage.propValue.value;//assigning variable and getting assign  to propValue id
        var stringDown=document.mortgage.downPay.value;//assigning variable and getting assign  to downPay id
                 if (stringProp == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Property Value: Can not be a blank.</p>";
                 }
             for( var i=0; i<stringProp.length; i++){//for loop runs through the length
                if(stringProp.charCodeAt(i) < 48 || stringProp.charCodeAt(i) > 57 )//checking for numbers with ASCII code
                    {
                     showErrorMessage += "<p>- Property Value: Must be numeric only.</p>";//sending error message to complete form validation
                   break;//this break makes only one error message instead of each and every single loop of for loop
                 }
             }
             if(stringProp.indexOf('.') != -1)//searching for . for decimals, if we do not have it false
                {
                 showErrorMessage += "<p>- Property Value: Must be at least a whole number.</p>";//sending error message to complete form validation
               }
                if(stringProp.indexOf('-') != -1)//searching for - for negative numbers, if we do not have it false
                   {
                     showErrorMessage += "<p>- Property Value: Must be at least a positive number.</p>";//sending error message to complete form validation
                }
                    stringDown=Number(stringDown);//checking for numbers
                    stringProp=Number(stringProp);//checking for numbers
                        if((stringDown + 65000) > stringProp)//checking if it is more than 65000 
                            {
                             showErrorMessage += "<p>- Property Value: Must be at least 65000 more than down payment.</p>";//sending error message to complete form validation
                        }//end  of if condition

             return showErrorMessage;// returning error message if we have one or more    
       
}//end  of function   


function validateDown(showErrorMessage){//function validation for down payment
        var stringProp=document.mortgage.propValue.value;//assigning variable and getting assign  to propValue id
        var stringDown=document.mortgage.downPay.value;//assigning variable and getting assign  to downPay id 
            if (stringDown == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Down Payment: Can not be a blank.</p>";
                 }
             for( var i=0; i<stringDown.length; i++){//for loop runs through the length
                if(stringDown.charCodeAt(i) < 48 || stringDown.charCodeAt(i) > 57 )//checking for numbers with ASCII code
                    {
                     showErrorMessage += "<p>- Down Payment: Must be numeric only.</p>";//sending error message to complete form validation
                   break;//this break makes only one error message instead of each and every single loop of for loop
                }//end  of if condition
              }//end  of for loop
                 if(stringDown.indexOf('.') != -1)//searching for . for decimals, if we do not have it false
                    {
                     showErrorMessage += "<p>- Down Payment: Must be at least a whole number.</p>";//sending error message to complete form validation
                   }//end  of if condition
                    if(stringDown.indexOf('-') != -1)//searching for - for negative numbers, if we do not have it false
                        {
                         showErrorMessage += "<p>- Down Payment: Must be at least a positive number.</p>";//sending error message to complete form validation
                     }//end  of if condition
                        stringDown=Number(stringDown);//checking for numbers
                        stringProp=Number(stringProp);//checking for numbers
                        if((stringDown *10 ) < stringProp)//condition  for false
                            {
                             showErrorMessage += "<p>- Down Payment: Must be at least 10% of the value of property value.</p>";//sending error message to complete form validation        
                        }//end  of if condition 
         return showErrorMessage;// returning error message if we have one or more
       
}//end  of function


function validateDetails(showErrorMessage){//function validation for property details
              var numchecks = document.mortgage.propDetails.length;//assigning variable and getting assign  to propLocation id 
              var check = true;//boolean condition
               for (var i = 0; i < numchecks; i++) {//for loop runs through data in that that form
                   if (document.mortgage.propDetails[i].checked) { // 1  checked not not checked
                                                                           
                     check=false;//checking boolean condition when true
                     break;//this break makes only one error message instead of each and every single loop of for loop
                   }//end of if condition
                }//end of for loop condition 
                    if (check) {//boolean check if false
                    showErrorMessage += "<p>- Property Details: One of the options should be selected </p>";//sending error message to complete form validation
                    }//end of if condition
                    else{//unchecking all the above option if something checked
                        if(document.mortgage.propDetails[6].checked ==true)//condition for all the above check
                         { 
                            for(var m=0; m<6; m++)//i run the for loop to check where is check mark 
                                {
                                document.mortgage.propDetails[m].checked=false;//unchecking 
                            }//end of for loop
                        }//end of if condition
                    }//end of else condition
                return showErrorMessage; // returning error message if we have one or morerm
}//end of function
  
function validateLocation(showErrorMessage){//function validation for property location
            var numradio = document.mortgage.propLocation.length;//assigning variable and getting assign  to propLocation id 
            var check = true;//boolean condition
               for (var i = 0; i < numradio; i++) {//for loop runs through data in that that form
                   if (document.mortgage.propLocation[i].checked) { // 1 checked -1 not checked
                                                                           
                     check=false;//checking boolean condition when true
                     break;//this break makes only one error message instead of each and every single loop of for loop
                   }//end of if condition
                }//for loop condition
                    if (check) {//checking boolean condition when false
                        showErrorMessage += "<p>- Property Location: One of the options should be selected </p>";//sending error message to complete form validation
                    }//end of if condition
            return showErrorMessage;// returning error message if we have one or more 
}//end of for loop condition                
     
function validateIncome(showErrorMessage){//function validation for income
                var stringIncome = document.mortgage.income.selectedIndex;//assigning variable to 

                   if (stringIncome == -1) {  // 1 checked 
                                             // -1 not checked
                        showErrorMessage += "<p>- Income: One of the options should be selected</p>";//sending error message to complete form validation 

                     }//end of if condition
            return showErrorMessage;// returning error message if we have one or more
}// end of function    

function validateYearmonth(showErrorMessage){//function validation for mortgage year
        var checkyear=document.mortgage.mortYear.value;//assigning variable and data from mortYear id to that variable
            if (checkyear == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Year: Can not be a blank.</p>";
                 }
        for(i=0; i<checkyear.length; i++){//for loop runs through data in that that form

                if(checkyear.charCodeAt(i) <48 || checkyear.charCodeAt(i) > 57)//condition to check if it is number or not
                       {
                         showErrorMessage += "<p>- Year: Must be numeric only.</p>";//sending error message to complete form validation
                         break;//this break makes only one error message instead of each and every single loop of for loop
                        }// end of if condition
            }// end of for loop
                    var myyear= new Date();//assigning a new variable to get current date
                    checkyear=Number(checkyear);//assigning variable and gives it to number function to check to make sure it is a number
                    if(checkyear == myyear.getFullYear()  || checkyear == (myyear.getFullYear()+1))//checking for current date + next year
                     {
                    }// end of if condition
                        else//false condition
                          {
                            showErrorMessage += "<p>- Year: Please type in current year or next year.</p>";//sending error message to complete form validation
                         }// end of else condition
                 return showErrorMessage;// returning error message if we have one or more
}//end of function


function validateMonth(showErrorMessage){//function validation for the  mortMonth id  
        var checkmonth=document.mortgage.mortMonth.value;//assigning variable and data from mortMonth id to that variable
             if (checkmonth == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Month: Can not be a blank.</p>";
                 }
            for(i=0; i<checkmonth.length; i++){//for loop runs through data in that that form

                    if(checkmonth.charCodeAt(i) <48 || checkmonth.charCodeAt(i) > 57)//condition to check if it is number or not 
                           {
                             showErrorMessage += "<p>- Month: Must be numeric only.</p>";//sending error message to complete form validation
                             break;//this break makes only one error message instead of each and every single loop of for loop
                            }//end of if condition
                }// end of for loop 
                        var mymonth= new Date();//assigning a new variable to get current date
                        checkmonth=Number(checkmonth);//assinging varible and gives it to number function to check to make sure it is a number
                        if(checkmonth == (mymonth.getMonth()+1)  || checkmonth == (mymonth.getMonth()+2))//checking for current date + next year
                         {
                        }// end of if condition

                            else//condition when false
                              {
                                showErrorMessage += "<p>- Month: Please type in current month or next month.</p>";//sending error message to complete form validation 
                             }//end of false condition
                                 if(checkmonth <1 ||  checkmonth >12)//checking from 01-12 numbers  
                                  {
                                    showErrorMessage += "<p>- Month: Allowable values only 01-12 (12 inclusive).</p>";//sending error message to complete form validation
                                 }//end of if condition

             return showErrorMessage;// returning error message if we have one or more
}//end of function

 
function validateIntrate(showErrorMessage){//function validation for amortization id 
        var checkint=document.mortgage.intRate.value;//assign variable and data from intrate id 
            if (checkint == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- Interest Rate: Can not be a blank.</p>";
                 }
                    for(i=0; i<checkint.length; i++){//for loop runs through the 

                            if((checkint.charCodeAt(i) >= 48 && checkint.charCodeAt(i) <= 57) || checkint.charCodeAt(i) == 46){}//checking for numbers and single dot
                            else
                                   {
                                     showErrorMessage += "<p>- Interest Rate: Must be numeric only.</p>";//sending error message to complete form validation
                                     break;//this break makes only one error message instead of each and every single loop of for loop
                                    }
                        }//end of for loop
                            checkint=parseFloat(checkint);//assigning variable and checking with function parse float for decimals
                            if(checkint <2 || checkint>11)//condition for length
                                 {
                                 showErrorMessage += "<p>- Interest Rate: Allowable values only 05-11.</p>";//sending error message to complete form validation
                             }//end of if condtion
                             return showErrorMessage;// returning error message if we have one or more
}//end of function 

            
            
function validateAmortization(showErrorMessage){//function validation for amortization id 
            var checkamort=document.mortgage.amortization.value;//assigning variable with data from amortization id  
              if (checkamort == " ")//checking  empty space
                 {
                 showErrorMessage += "<p>- No of years: Can not be a blank.</p>";
                 }
              for(i=0; i<checkamort.length; i++){//for loop checks the length of amortization data

                    if(checkamort.charCodeAt(i) < 48 || checkamort.charCodeAt(i) > 57)//condition where i check each character in filed  against ASCII code by charcodeat method function
                           {
                             showErrorMessage += "<p>- No of years: Must be numeric only.</p>";// returning error message if we have one or more
                             break;//this break makes only one error message instead of each and every single loop of for loop
                     }//end of condition
                }//end of for loop
                        checkamort=Number(checkamort);//assigning new variables
                        if(checkamort < 5 || checkamort > 20)//condition where i am checking the length of  amortization id,the length should between 05 and 20
                            {
                            showErrorMessage += "<p>- No of years: Allowable values only 05-20.</p>";// returning error message if we have one or more
                         }//end of condition
                   return showErrorMessage;// returning error message if we have one or more
}//end of function

            
function validatejavaactive(showErrorMessage){//this functions returns ON value for jsactive id , we have OFF value by default
            if (showErrorMessage == "")//condition when i don't have errors
                {
                document.mortgage.jsActive.value = "ON";//just assigning ON value for jsactive id 
            }//end of condition
 return showErrorMessage;// returning error message if we have one or more
}//end of function


function validateUppercase(showErrorMessage){ //if we have no errors this function will take the name field and replace the first letter with capital letter 
            if (showErrorMessage == "")//condition when i do not have errors
                {
                document.mortgage.client.value=document.mortgage.client.value.substr(0,1).toUpperCase()+document.mortgage.client.value.substr(1);//using id client name i replace the first letter of client name with capital letter by substr and touppercase methods
            }//end of if condition
 return showErrorMessage;// returning error message if we have one or more
}//end of function

    
function showErrors(messages) {//this function shows shows error messages
                        
     document.getElementById('reserverd').innerHTML = messages;// i am getting reserved area by id and replace it with my error messages

}// end of function
  
function  clearShowErrors() {// this function clears reserved area with errors

        document.getElementById('reserverd').innerHTML = " ";//i am getting id of reserved area and replace it with empty space, by innerHTML
            
}//end of function 

 // End of completeFormValidation