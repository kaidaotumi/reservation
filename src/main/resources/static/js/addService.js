
$("#addService").click(function () {
    var professorId = $("#professorId").val();
    var title = $("#title").val()
    var content = $("#content").val()
    var reserveAddress = $("#reserveAddress").val()
    var reserveTime = new Date($("#reserveTime").val()).getTime();
    var deadline = new Date($("#deadline").val()).getTime()
    console.log(reserveTime)
    console.log(deadline)
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
    // console.log(majorType)
    // console.log(serviceType)
    var price = $("#price").val()
    // console.log(price)
    var data ={
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
        type: "post",
        url:"https://www.findpro.cn/professor/service",
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