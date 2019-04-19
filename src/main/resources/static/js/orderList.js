var selected = []
var content = []
window.onload=function() {
    $.ajax({
        url:'https://www.findpro.cn/professor/reserve/all',
        type:'get',
        success:function (data) {
            if (data.success) {
                $('#tb').remove()
                content=data.content
                createTable();

            }

        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });

    select=function(id) {
        if ($("#"+id).prop("checked")) {
            $("#"+id).prop("checked",false)
            var index = selected.indexOf(id);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }
        else {
            $("#"+id).prop("checked",true)
            selected.push(id)
        }
        if (selected.length==1) {
            $("#detail").removeClass("disabled")
        }
        else {
            $("#detail").addClass("disabled")
        }
        if (selected.length>0) {
            $("#delete").removeClass("disabled")
        }
        else {
            $("#delete").addClass("disabled")
        }
    }

    selectbox=function(id) {
        if ($("#"+id).prop("checked")==false) {
            var index = selected.indexOf(id);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }
        else {
            selected.push(id)
        }
        if (selected.length==1) {
            $("#detail").removeClass("disabled")
        }
        else {
            $("#detail").addClass("disabled")
        }
        if (selected.length>0) {
            $("#delete").removeClass("disabled")
        }
        else {
            $("#delete").addClass("disabled")
        }
    }

}

function createTable() {
    var body=$('.panel-body')
    var table='<table id="tb" width="100%" class="table table-striped table-bordered table-hover">\n' +
        '                        <thead>\n' +
        '                        <tr>\n' +
        '                            <th></th>\n' +
        '                            <th>Service</th>\n' +
        '                            <th>Student</th>\n' +
        '                            <th>CreateTime</th>\n' +
        '                        </tr>\n' +
        '                        </thead>\n' +
        '                        <tbody>'
    for (var i=0;i<content.length;i++) {
        if (i%2==0) {
            table+='<tr class="odd" onclick="select('+content[i].id+')">'
        }
        else {
            table+='<tr class="even" onclick="select('+content[i].id+')">'
        }
        table+='<td><input type="checkbox" id="'+content[i].id+'" onclick="selectbox('+content[i].id+')"></td>'
        table+='<td>'+content[i].title+'</td>'
        table+='<td>'+content[i].name+'</td>'
        table+='<td>'+content[i].createTime+'</td>'
        table+='</tr>'
    }
    table+='</tbody>\n' +
        '                    </table>'
    body.append(table)
    initCheckbox()
}

function initCheckbox() {
    $("input[type='checkbox']").click(function(e){
        e.stopPropagation();
    });
}

$("#addSubmit").click(function () {
    var userId = $("#userId").val()
    var serviceId = $("#serviceId").val()
    var data ={
        "userId": userId,
        "serviceId": serviceId,
    }
    $.ajax({
        type: "post",
        url:"https://www.findpro.cn/professor/reserve",
        data:data,
        async:false,
        success:function(data){
            if(data.success){
                alert("insert success")
                $("#userId").val("")
                $("#serviceId").val("")
            }
            else{
                alert(data.message)
            }
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
    $.ajax({
        url:'https://www.findpro.cn/professor/reserve/all',
        type:'get',
        success:function (data) {
            if (data.success) {
                $('#tb').remove()
                content=data.content
                createTable();

            }

        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
        },
    });
})

$("#detail").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    for (var i=0; i<content.length; i++){
        if (content[i].id != selected[0]) {
            continue
        }
        else {
            var data ={
                "id": content[i].id,
                "userId": content[i].userId,
                "serviceId": content[i].serviceId,
                "createTime": new Date(content[i].createTime).getTime(),
                "title": content[i].title,
                "content": content[i].content,
                "reserveAddress": content[i].reserveAddress,
                "reserveTime": new Date(content[i].reserveTime).getTime(),
                "deadline": new Date(content[i].deadline).getTime(),
                "majorTypeId": content[i].majorTypeId,
                "serviceTypeId": content[i].serviceTypeId,
                "name": content[i].name,
                "phone": content[i].phone,
                "email": content[i].email,
                "company": content[i].company,
            }
            $.ajax({
                type: "post",
                url:"/order/postOrder",
                contentType : 'application/json',
                data:JSON.stringify(data),
                async:false,
                success:function(data){
                    console.log(data)
                },
                error:function(XMLHttRequest){
                    alert(XMLHttRequest.responseText);
                },
            });
            window.location.href="/order/orderDetail"
        }
    }
})

$("#delete").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    for (var i=0; i<selected.length; i++){
        var tmp=selected[i]
        $.ajax({
            type: "delete",
            url:"https://www.findpro.cn/professor/reserve",
            data:{"orderId":tmp},
            async: false,
            success:function(data){
                if(data.success){
                    // alert("delete success")
                }
                else{
                    alert(data.message)
                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
        $("#"+tmp).parent().parent().remove()
    }
})