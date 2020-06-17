$(()=>{
    $("#butRegistration").click(()=>{
        
        var regObj = {
            login: $("#login").val(),
            password: $("#password").val(),
            fio: $("#fio").val(),
            phone: $("#phone").val(),
            email: $("#email").val() 
        };
        
        var errors = "";
        
        if (regObj.login.length<4)
            errors += 'Логин должен быть минимум 4-ре символа\n';
        if (regObj.password.length<4)
            errors += 'Пароль должен быть минимум 4-ре символа\n';
        if (regObj.fio === "")
            errors += 'Заполните ФИО\n';
        if (regObj.phone === "")
            errors += 'Введите телефон\n';
        if (regObj.email === "")
            errors += 'Введите email\n';
            
        if (errors !== ""){
            alert(errors);
            return;
        }
        
        
        $.ajax({
            method: "POST",
            url: "/registrationData",
            data: JSON.stringify(regObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data)=>{
                if (data.success === 0)
                    alert(data.message);
                    
                if (data.success === 1 && data.redirect)
                    window.location = data.redirect;
            }
        });
        
    });
});