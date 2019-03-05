
function login(){
    var username = $("#username").val();
    var password = $("#password").val();
    var data={
        "username":username,
        "password":password
    }

    if(username==""||password==""){
        alert("信息填写不完整")
    }
    else{
        $.ajax({
            url:'./login',
            type:'post',
            data:data,
            success:function (data) {
                if(data=="success"){
                    window.location.href="expertList"
                }
                else {
                    alert(data);
                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
    }
}