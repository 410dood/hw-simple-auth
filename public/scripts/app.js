console.log("app.js is working")


// $(document).ready(function () { 
    
    

    
$(document).ready(function () {

    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var signupData = $("#signup-form").serialize();
        console.log(signupData);
        // send POST request to /users with the form data
        $.post('/users', signupData, function (response) {
        console.log(response);
        })
    });

    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var loginData = $("#login-form").serialize();
        console.log(loginData);
        // send POST request to /users with the form data
        $.post('/users', loginData, function (response) {
            console.log(response);
        })
    });
});

//         $.ajax({
//             method: 'POST',
//             url: '/users',
//             data: $(this).serialize(),
//             success: newTodoSuccess,
//             error: newTodoError
//         });
//     });
// });

app.post('/signup', (req, res) => {
    let username = req.body.username;
