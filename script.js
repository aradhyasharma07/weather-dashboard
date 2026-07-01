function checkLogin()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch("users.json")
    .then(function(response)
    {
        return response.json();
    })

    .then(function(users)
    {
        var login = false;

        for(var i = 0; i < users.length; i++)
        {
            if(username == users[i].username && password == users[i].password)
            {
                login = true;
                break;
            }
        }

        if(login == true)
        {
            window.location.href = "dashboard.html";
        }
        else
        {
            document.getElementById("message").innerHTML = "Invalid Username or Password";
        }
    })

    .catch(function()
    {
        alert("Unable to read users.json");
    });

}