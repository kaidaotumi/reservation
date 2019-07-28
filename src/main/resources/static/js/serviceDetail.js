var id
window.onload=function(){
    // console.log(location.search);
    $.ajax({
        url:'/service/getServiceId',
        type:'get',
        success:function (data) {
            id=data
            initDetail()
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
}

function initDetail() {
    $.ajax({
        url:'https://www.findpro.cn/professor/service/detail',
        type:'get',
        data:{"serviceId":id},
        success:function (res) {
            var service=res.content.serviceVO
            var user=res.content.userVO
            $("#professorId").val(service.professorId)
            $("#title").val(service.title)
            $("#content").val(service.content)
            $("#reserveAddress").val(service.reserveAddress)
            var reserve_time = service.reserveTime
            var ddl = service.deadline
            $("#reserveTime").val(reserve_time)
            $("#deadline").val(ddl)
            var majorTypeId=service.majorTypeId
            var majorType
            if (majorTypeId==1) {
                majorType = "Economics"
            }
            else if (majorTypeId == 2) {
                majorType = "Business Administration"
            }
            else if (majorTypeId == 3) {
                majorType=="finance"
            }
            else {
                majorType = "Management"
            }
            var serviceTypeId=service.serviceTypeId
            var serviceType
            if (serviceTypeId==1) {
                serviceType = "一般预约咨询"
            }
            else if (serviceTypeId == 2) {
                serviceType = "学术科研项目"
            }
            else {
                serviceType = "企业咨询与合作"
            }
            $("#majorType").val(majorType)
            $("#serviceType").val(serviceType)
            $("#price").val(service.price)

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
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
}

$("#modifyService").click(function () {
    var professorId = $("#professorId").val();
    var title = $("#title").val()
    var content = $("#content").val()
    var reserveAddress = $("#reserveAddress").val()
    var reserveTime = new Date($("#reserveTime").val()).getTime()
    var deadline = new Date($("#deadline").val()).getTime()
    var majorType = $("#majorType").val()
    var majorTypeId
    if (majorType=="Economics") {
        majorTypeId = 1
    }
    else if (majorType=="Business Administration") {
        majorTypeId = 2
    }
    else if (majorType=="finance") {
        majorTypeId = 3
    }
    else {
        majorTypeId = 4
    }
    var serviceType = $("#serviceType").val()
    var serviceTypeId
    if (serviceType=="一般预约咨询") {
        serviceTypeId = 1
    }
    else if (serviceType=="学术科研项目") {
        serviceTypeId = 2
    }
    else {
        serviceTypeId = 3
    }
    var price = $("#price").val()
    var data ={
        "id": id,
        "professorId": professorId,
        "title": title,
        "content": content,
        "reserveAddress": reserveAddress,
        "reserveTime": reserveTime,
        "deadline": deadline,
        "majorTypeId": majorTypeId,
        "serviceTypeId": serviceTypeId,
        "price": price,
    }
    $.ajax({
        type: "put",
        url:"https://www.findpro.cn/professor/service",
        dataType:"json",
        contentType : 'application/json',
        data:JSON.stringify(data),
        success:function(data){
            if(data.success){
                alert("modify success")
                initDetail()
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

$("#cancelModify").click(function () {
    initDetail()
})