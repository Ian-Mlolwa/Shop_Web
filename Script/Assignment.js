
    inputpassword =$('#pass').val();

    for (i in data.username )      //to match username with provided array
      { 
        name = data.username[i];

        for ( i in data.password){
            pass = data.password[i];

            if (inputname == name & inputpassword == pass ){
                window.open('welcome1.html','_self');
            }               
        }
    }

    if (inputname != name & inputpassword != pass ){
        alert("Wrong Password");
    }
}