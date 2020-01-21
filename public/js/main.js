var script = document.createElement("script");

script.src = "https://code.jquery.com/jquery-3.4.1.js";

const submitBtn = document.getElementById("register");

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log("register button cilcked..");

    const userName = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password1 = document.getElementById("registerPassword1").value;
    const password2 = document.getElementById("registerPassword2").value;

    console.log(userName.value);
    //validations
    if (userName.length !== 0 && email.length !== 0 && password1 === password2) {
        //ajax call to server...
        console.log("ajax here..");
        const userRegisterInfo = {
            username: userName,
            email: email,
            password: password1,
            confirmPassword: password2
        };
        $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            data: JSON.stringify(userRegisterInfo),
            contentType: "application/json; charset=utf-8",
            success: function (data, textStatus) {
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                } else {
                    // data.form contains the HTML for the replacement form
                    //$("#myform").replaceWith(data.form);
                    console.log("no direct got from server...", data);
                }
            }
        });
    } else {
        console.log("error in inputs.");
    }
});