
// window.onload=function(){
//     // console.log(location.search);
//
//     $.ajax({
//         url:'get',
//         type:'get',
//         success:function (data) {
//             $('#name').val(data)
//         },
//         error:function(XMLHttRequest){
//             alert(XMLHttRequest.responseText);
//         },
//     });
//
// }

$("#addExpert").click(function () {
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
    var data ={
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
        url:"https://www.findpro.cn/professor/user",
        dataType:"json",
        contentType : 'application/json',
        data:JSON.stringify(data),
        success:function(data){
            if(data.success){
                alert("add success")
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