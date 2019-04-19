var selected = []
var content = []
window.onload=function() {
    $.ajax({
        url:'https://www.findpro.cn/professor/rank/major/all',
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
        // if (selected.length==1) {
        //     $("#modify").removeClass("disabled")
        // }
        // else {
        //     $("#modify").addClass("disabled")
        // }
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
        // if (selected.length==1) {
        //     $("#modify").removeClass("disabled")
        // }
        // else {
        //     $("#modify").addClass("disabled")
        // }
        if (selected.length>0) {
            $("#delete").removeClass("disabled")
        }
        else {
            $("#delete").addClass("disabled")
        }
    }

    modifyRank=function(id) {
        console.log("modify")
        var editObj = $("#rank"+id)
        var preName = editObj.text()
        editObj.css("display","none")
        var inputObj = editObj.next()
        inputObj.css("display","block")
        inputObj.val(preName)
        inputObj.css("cursor","auto")
        inputObj.select()
        inputObj.blur(function () {
            var rank = inputObj.val()
            var institude = $("#"+id).parent().next().text()
            var major = $("#"+id).parent().next().next().text()
            var data = {
                "id": id,
                "institude": institude,
                "major": major,
                "rank": rank,
            }
            // console.log(data)
            $.ajax({
                type: "POST",
                url: "https://www.findpro.cn/professor/rank/major/update",
                data: JSON.stringify(data),
                contentType : 'application/json',
                success: function (data) {
                    if(data.success){
                        inputObj.css("display","none")
                        inputObj.css("cursor","default")
                        editObj.css("display","")
                        editObj.text(rank)
                    }
                    else{
                        alert(data.message)
                    }
                },
                error:function(XMLHttRequest){
                    alert(XMLHttRequest.responseText);
                },
            })
        })
    }
}
function createTable() {
    var body=$('.panel-body')
    var table='<table id="tb" width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">\n' +
        '                        <thead>\n' +
        '                        <tr>\n' +
        '                            <th></th>\n' +
        '                            <th>Institude</th>\n' +
        '                            <th>Major</th>\n' +
        '                            <th>Rank</th>\n' +
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
        table+='<td>'+content[i].institude+'</td>'
        table+='<td>'+content[i].major+'</td>'
        // table+='<td>'+content[i].rank+'</td>'
        table+='<td ondblclick="modifyRank('+content[i].id+')">' +
            '<span id="rank' + content[i].id + '">'+content[i].rank+'</span>\n' +
            '<input type="text" class="form-control name-editor" placeholder="new rank" maxlength="5">\n'
        '</td>'
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

$("#insertSubmit").click(function () {
    var institude = $("#institude").val()
    var major = $("#major").val()
    var rank = $("#rank").val()
    var data ={
        "institude": institude,
        "major": major,
        "rank": rank,
    }
    $.ajax({
        type: "post",
        url:"https://www.findpro.cn/professor/rank/major",
        contentType : 'application/json',
        data:JSON.stringify(data),
        async:false,
        success:function(data){
            if(data.success){
                alert("insert success")
                $("#institude").val("")
                $("#major").val("")
                $("#rank").val("")
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
        url:'https://www.findpro.cn/professor/rank/major/all',
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

$("#delete").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    for (var i=0; i<selected.length; i++){
        var tmp=selected[i]
        var institude = $("#"+tmp).parent().next().text()
        var major = $("#"+tmp).parent().next().next().text()
        var data ={
            "institude": institude,
            "major": major,
        }
        $.ajax({
            type: "post",
            url:"https://www.findpro.cn/professor/rank/major/delete/"+name,
            contentType : 'application/json',
            data:JSON.stringify(data),
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