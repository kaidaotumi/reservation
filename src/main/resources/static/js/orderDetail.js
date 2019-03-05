var order
window.onload=function(){
    // console.log(location.search);
    $.ajax({
        url:'/order/getOrder',
        type:'get',
        success:function (data) {
            console.log(data)
            order=data
            initDetail()
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
}

function initDetail() {
    $("#userId").val(order.userId)
    $("#serviceId").val(order.serviceId)
    $("#createTime").val(moment(order.createTime).format("YYYY-MM-DD HH:mm:ss"))

    $("#title").val(order.title)
    $("#content").val(order.content)
    $("#reserveAddress").val(order.reserveAddress)
    var reserve_time = moment(order.reserveTime).format("YYYY-MM-DD HH:mm:ss")
    var ddl = moment(order.deadline).format("YYYY-MM-DD HH:mm:ss")
    $("#reserveTime").val(reserve_time)
    $("#deadline").val(ddl)
    var majorTypeId = order.majorTypeId
    var majorType
    if (majorTypeId == 1) {
        majorType = "Economics"
    }
    else if (majorTypeId == 2) {
        majorType = "Business Administration"
    }
    else if (majorTypeId == 3) {
        majorType == "finance"
    }
    else {
        majorType = "Management"
    }
    var serviceTypeId = order.serviceTypeId
    var serviceType
    if (serviceTypeId == 1) {
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
    // $("#price").val(order.price)

    $("#name").val(order.name)
    $("#phone").val(order.phone)
    $("#email").val(order.email)
    $("#company").val(order.company)
}

function initService(userId, serviceId) {
    order.userId = userId
    order.serviceId = serviceId
    // order.createTime = createTime
    $.ajax({
        url:'https://www.ufeng.top/professor/reserve',
        type:'get',
        data:{"userId":userId},
        success:function (res) {
            var content = res.content
            for (var i=0; i<content.length; i++){
                if (content[i].serviceId != serviceId) {
                    continue
                }
                else {
                    order.title = content[i].title
                    order.content = content[i].content
                    order.reserveAddress = content[i].reserveAddress
                    order.reserveTime = content[i].reserveTime
                    order.deadline = content[i].deadline
                    order.majorTypeId = content[i].majorTypeId
                    order.serviceTypeId = content[i].serviceTypeId

                    order.name = content[i].name
                    order.phone = content[i].phone
                    order.email = content[i].email
                    order.company = content[i].company
                    break
                }
            }
            initDetail()
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
}

$("#modifyOrder").click(function () {
    // var professorId = $("#professorId").val();
    var userId = $("#userId").val();
    var serviceId = $("#serviceId").val();
    // var createTime = new Date($("#createTime").val()).getTime();
    var data ={
        "id": order.id,
        "userId": userId,
        "serviceId": serviceId,
    }
    $.ajax({
        type: "put",
        url:"https://www.ufeng.top/professor/reserve",
        contentType : 'application/json',
        data:JSON.stringify(data),
        success:function(data){
            if(data.success){
                alert("modify success")
                initService(userId, serviceId)
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
    initService(order.userId, order.serviceId)
})