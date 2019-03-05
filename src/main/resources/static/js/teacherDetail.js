var wechatId
window.onload=function(){
    // console.log(location.search);

    $.ajax({
        url:'/teacher/getTeacherId',
        type:'get',
        success:function (data) {
            wechatId=data
            $.ajax({
                url:'https://www.ufeng.top/professor/teacher/'+wechatId,
                type:'get',
                data:{},
                success:function (res) {
                    var user=res.content
                    // console.log(user)
                    $("#wechatIcon").attr('src',user.wechatIconUrl)
                    $("#wechatName").val(user.wechatName)
                    // console.log(user.id)
                    if (user.id!=-1){
                        $("#user").show()
                        $("#name").val(user.name)
                        $("#telephone").val(user.telephone)
                        $("#email").val(user.email)
                        $("#position").val(user.position)
                        $("#introduction").val(user.introduction)
                        $("#school").val(user.school)
                        $("#major").val(user.major)
                        $("#website").val(user.website)
                        $("#country").val(user.country)
                        $("#researchInterest").val(user.researchInterest)
                        $("#firstName").val(user.firstName)
                        $("#familyName").val(user.familyName)
                        $('#institudeRank').val(user.institudeRank)
                    }
                },
                error:function(XMLHttRequest){
                    alert(XMLHttRequest.responseText);
                },
            });
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
}
