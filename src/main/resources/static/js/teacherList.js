var selected = []
var userid = []
var content = []
window.onload=function() {

    var pagenumber;
//总页数
    var totalnumber;
//分页栏显示的页数
    var paginationmax;
    initPagenumber();


    function initPagenumber() {
        $.ajax({
            url:'https://www.findpro.cn/professor/teacher/count',
            type:'get',
            success:function (data) {
                if (data.success) {
                    var total=Math.ceil(data.content/50)
                    // alert(total)
                    $('.test').attr('totalnumber',total)
                    paginationInit();
                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
    }

    function initPagination(element) {
        pagenumber = Number(element.attr('pagenumber'));
        totalnumber = Number(element.attr('totalnumber'));
        paginationmax = Number(element.attr('paginationmax'));
        if (totalnumber >= 1 && pagenumber <= totalnumber && paginationmax <= totalnumber) {
            var content =
                "<ul class='pagination'>" +
                "<li value='pre'>" +
                "<a href='javascript:void(0);'>«</a>" +
                "</li>";
            for (var i = 0; i < totalnumber; i++) {
                content +=
                    "<li value='" + (i + 1) + "'>" +
                    "<a href='javascript:void(0);'>" + (i + 1) +
                    "</a>" +
                    "</li>"
            }
            content +=
                "<li value='next'>" +
                "<a href='javascript:void(0);'>»</a>" +
                "</li>" +
                "</ul>";
            element.append(content);
//                为设置为当前页的页签添加样式
            element.children('ul').children('li[value = ' + pagenumber + ']').addClass('active');
            element.children('ul').children('li').click(clickChange);
            element.children('ul').children('li').click(processData);
//                显示那几个页签 传入任意li元素即可
            pageShow(element.children('ul').children('li[value = ' + pagenumber + ']'))
            processData()
        } else {
            console.log('分页自定义属性不合理')
        }
    };

// 写一个函数用来调用上面的initPagination函数，不直接调用pagination时因为有可能一个页面需要多个分页。
//        凡是带有pagination = p-new属性的元素，都会生成分页，这样设计方便一个页面中有多个不同的分页
    function paginationInit() {
        $('[pagination = p-new]').each(function () {
            initPagination($(this))
        })
    };

// 点击不同页签时候的样式变化。有两种情况：如果点击的是普通页签，此时点击谁就给谁对应的li添加.active样式。如果点击的是首位的上一页和下一页，那么就
// 需要给当前有.active的li元素的前一个或者后一个li添加.active样式。
//        点击页签时候样式的变化
    function clickChange(ev) {
        ev = event || window.event;
        pageShow($(ev.target).parent());

        $(ev.target).parent().parent().children('li').each(function (index, item) {
            if ($(item).hasClass('active')) {
                $(item).removeClass('active');
            }
        });
//                点击页码页签
        if ($(ev.target).parent().attr('value') != 'pre' && $(ev.target).parent().attr('value') != 'next') {
            pagenumber = Number($(ev.target).parent().attr('value'))
            $(ev.target).parent().addClass('active');
            $(ev.target).parent().parent().children('li[value = pre]').removeClass('disabled');
            $(ev.target).parent().parent().children('li[value = next]').removeClass('disabled');
//                点击上一页页签
        } else if ($(ev.target).parent().attr('value') == 'pre') {
            pagenumber -= 1;
            if (pagenumber <= 1) {
                pagenumber = 1;
                $(ev.target).parent().parent().children('li[value = 1]').addClass('active');
                $(ev.target).parent().parent().children('li[value = pre]').addClass('disabled');
            } else {
                $(ev.target).parent().parent().children('li[value = ' + pagenumber.toString() + ']').addClass('active');
                $(ev.target).parent().parent().children('li[value = pre]').removeClass('disabled');
                $(ev.target).parent().parent().children('li[value = next]').removeClass('disabled');
            }
//                点击下一页页签
        } else if ($(ev.target).parent().attr('value') == 'next') {
            pagenumber += 1;
            if (pagenumber >= totalnumber) {
                pagenumber = totalnumber;
                $(ev.target).parent().parent().children('li[value = ' + totalnumber + ']').addClass('active');
                $(ev.target).parent().parent().children('li[value = next]').addClass('disabled');
            } else {
                $(ev.target).parent().parent().children('li[value = ' + pagenumber.toString() + ']').addClass('active');
                $(ev.target).parent().parent().children('li[value = next]').removeClass('disabled');
                $(ev.target).parent().parent().children('li[value = pre]').removeClass('disabled');
            }
        }
    }

//       展示哪些页码 要用一个实际的分页找规律
//比如总共100页数据，我们的分页栏始终显示10页，那么这10页就需要动态的根据当前页、总页数而变化。
    function pageShow(element) {
        if (Number(pagenumber) >= 1 && Number(pagenumber) <= parseInt(.5 * Number(paginationmax))) {
            element.parent().children('li').each(function (index, item) {
                if (Number($(item).attr('value')) >= 1 + Number(paginationmax) && Number($(item).attr('value')) <= Number(totalnumber)) {
                    $(item).css('display', 'none')
                } else {
                    $(item).css('display', 'inline-block')
                }
            });
        } else if (Number(pagenumber) > parseInt(.5 * Number(paginationmax)) && Number(pagenumber) <= Number(totalnumber) - parseInt(.5 * Number(paginationmax))) {
            element.parent().children('li').each(function (index, item) {
                if ((Number($(item).attr('value')) >= 1 && Number($(item).attr('value')) <= Number(pagenumber) - parseInt(.5 * Number(paginationmax))) || (Number($(item).attr('value')) > Number(pagenumber) + parseInt(.5 * Number(paginationmax)) && Number($(item).attr('value')) <= Number(totalnumber))) {
                    $(item).css('display', 'none')
                } else {
                    $(item).css('display', 'inline-block')
                }
            });
        } else if (Number(pagenumber) > Number(totalnumber) - parseInt(.5 * Number(paginationmax))) {
            element.parent().children('li').each(function (index, item) {
                if (Number($(item).attr('value')) >= 1 && Number($(item).attr('value')) <= Number(totalnumber) - Number(paginationmax)) {
                    $(item).css('display', 'none')
                } else {
                    $(item).css('display', 'inline-block')
                }
            });
        }
    }

// 页面切换时候的处理函数。比如发ajax根据不同页码获取不同数据展示数据等，用户自行配置。
    function processData() {
        console.log('当前页码', pagenumber);
//            用户在这里写页码切换时候的逻辑
        var page = pagenumber-1
        $.ajax({
            url:'https://www.findpro.cn/professor/teachers',
            type:'get',
            data:{"page":page,"pageSize":50},
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
    }

    function createTable() {
        var body=$('.panel-body')
        var table='<table id="tb" width="100%" class="table table-striped table-bordered table-hover">\n' +
            '                        <thead>\n' +
            '                        <tr>\n' +
            '                            <th></th>\n' +
            '                            <th>WechatIcon</th>\n' +
            '                            <th>WechatName</th>\n' +
            '                        </tr>\n' +
            '                        </thead>\n' +
            '                        <tbody>'
        for (var i=0;i<content.length;i++) {
            if (i%2==0) {
                table+='<tr class="odd" onclick="select(this,'+content[i].id+')">'
            }
            else {
                table+='<tr class="even" onclick="select(this,'+content[i].id+')">'
            }
            table+='<td><input type="checkbox" id="'+content[i].wechatId+'" onclick="selectbox(this,'+content[i].id+')"></td>'
            table+='<td><img src="'+content[i].wechatIconUrl+'" onerror="this.parentNode.removeChild(this)" style="border-radius: 50%;height: 60px" onclick="javascript:void(0);"></td>'
            table+='<td>'+content[i].wechatName+'</td>'
            table+='</tr>'
        }
        table+='</tbody>\n' +
            '                    </table>'
        body.append(table)
        initCheckbox()
    }

    select=function(ele,user_id) {
        var obj = $(ele).children("td").eq(0).children().eq(0)
        if (obj.prop("checked")) {
            obj.prop("checked",false)
            var index = selected.indexOf(obj.attr("id"));
            if (index > -1) {
                selected.splice(index, 1);
                userid.splice(index, 1);
            }
        }
        else {
            obj.prop("checked",true)
            selected.push(obj.attr("id"))
            userid.push(user_id)
        }
        if (selected.length==1) {
            if (userid[0]==-1) {
                $("#bind").removeClass("disabled")
            }
            else {
                $("#bind").addClass("disabled")
            }
            $("#detail").removeClass("disabled")
        }
        else {
            $("#bind").addClass("disabled")
            $("#detail").addClass("disabled")
        }
        if (selected.length>0) {
            $("#delete").removeClass("disabled")
        }
        else {
            $("#delete").addClass("disabled")
        }
    }

    selectbox=function(ele,user_id) {
        var id=$(ele).attr("id")
        // console.log(id)
        if ($(ele).prop("checked")==false) {
            // console.log("t")
            // $("#"+id).prop("checked",false)
            var index = selected.indexOf(id);
            // console.log(index)
            if (index > -1) {
                // console.log(selected)
                selected.splice(index, 1);
                userid.splice(index, 1);
                // console.log(selected)
            }
        }
        else {
            // console.log("f")
            // $("#"+id).prop("checked",true)
            selected.push(id)
            userid.push(user_id)
        }
        if (selected.length==1) {
            if (userid[0]==-1) {
                $("#bind").removeClass("disabled")
            }
            else {
                $("#bind").addClass("disabled")
            }
            $("#detail").removeClass("disabled")
        }
        else {
            $("#bind").addClass("disabled")
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

function initCheckbox() {
    $("input[type='checkbox']").click(function(e){
        e.stopPropagation();
    });
}

$("#detail").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    window.location.href="/teacher/teacherDetail?wechatId="+selected[0]
})

$("#bind").click(function () {
    if ($(this).hasClass("disabled")) {
        $(this).attr("data-target","")
        $(this).attr("data-toggle","")
    }
    else {
        $(this).attr("data-target","#bindModal")
        $(this).attr("data-toggle","modal")
        $("#wechatId").val(selected[0])
        for(j = 0; j < content.length; j++) {
            if (content[j].wechatId==selected[0]) {
                $("#wechatIconUrl").val(content[j].wechatIconUrl)
                $("#wechatName").val(content[j].wechatName)
                break
            }
        }
    }
})

$("#bindSubmit").click(function () {
    console.log($("#wechatId").val())
    console.log($("#wechatIconUrl").val())
    console.log($("#wechatName").val())
    var wechatId = $("#wechatId").val();
    var wechatIconUrl = $("#wechatIconUrl").val()
    var wechatName = $("#wechatName").val()
    var infoid = $("#infoid").val()
    var data ={
        "wechatId": wechatId,
        "wechatIconUrl": wechatIconUrl,
        "wechatName": wechatName,
        "infoId": infoid,
    }
    $.ajax({
        type: "post",
        url:"https://www.findpro.cn/professor/teacher/update",
        dataType:"json",
        contentType : 'application/json',
        data:JSON.stringify(data),
        success:function(data){
            if(data.success){
                alert("bind success")
            }
            else{
                alert(data.message)
                $("#wechatId").val("")
                $("#wechatIconUrl").val("")
                $("#wechatName").val("")
            }
        },
        error:function(XMLHttRequest){
            alert(XMLHttRequest.responseText);
            $("#wechatId").val("")
            $("#wechatIconUrl").val("")
            $("#wechatName").val("")
        },
    });
})

$("#delete").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    for (var i=0; i<selected.length; i++){
        var tmp=selected[i]
        $.ajax({
            type: "post",
            url:"https://www.findpro.cn/professor/teacher/delete/"+tmp,
            data:{},
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
