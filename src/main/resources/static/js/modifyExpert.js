var id
window.onload=function(){
    // console.log(location.search);

    $.ajax({
        url:'/expert/getExpertId',
        type:'get',
        success:function (data) {
            id=data
            $.ajax({
                url:'https://www.ufeng.top/professor/user/id/'+data,
                type:'get',
                success:function (res) {
                    var user=res.content
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
                    $('#institudeRank').attr("placeholder",user.institudeRank)
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

$("#submit").click(function () {
    var name = $("#name").val();
    var telephone = $("#telephone").val()
    var email = $("#email").val()
    var position = $("#position").val()
    var introduction = $("#introduction").val()
    var school = $("#school").val()
    var major = $("#major").val()
    var website = $("#website").val()
    var country = $("#country").val()
    var researchInterest = $("#researchInterest").val()
    var firstName = $("#firstName").val()
    var familyName = $("#familyName").val()
    // var institudeRank = $('#institudeRank').attr("placeholder")
    var data ={
        "id": id,
        "name": name,
        "telephone": telephone,
        "email": email,
        "position": position,
        "introduction": introduction,
        "school": school,
        "major": major,
        "website": website,
        "country": country,
        "researchInterest": researchInterest,
        "firstName": firstName,
        "familyName": familyName,
    }
    $.ajax({
        type: "post",
        url:"https://www.ufeng.top/professor/user/update",
        dataType:"json",
        contentType : 'application/json',
        data:JSON.stringify(data),
        success:function(data){
            if(data.success){
                alert("modify success")
            }
            else{
                alert(data.message)
            }
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
})