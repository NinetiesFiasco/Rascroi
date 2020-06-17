$(()=>{
    $("#butEnter").click(()=>{
        
        var enterObj = {
            login: $("#login").val(),
            password: $("#password").val()
        };
        
        $.ajax({
            method: "POST",
            url: "/enter",
            data: JSON.stringify(enterObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data)=>{
                if (data.success===0)
                    alert(data.message);
                if (data.success===1)
                    window.location = data.redirect;
            }
        });
        
    });
});