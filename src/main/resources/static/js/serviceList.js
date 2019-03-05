var selected = []
var serviceType = []
var majorType = []
window.onload=function() {

    var pagenumber;
//总页数
    var totalnumber;
//分页栏显示的页数
    var paginationmax;

    getAllServiceType();
    getAllMajorType();
    initPagenumber();

    function initPagenumber() {
        $.ajax({
            url:'https://www.ufeng.top/professor/service/count',
            type:'get',
            async: false,
            success:function (data) {
                if (data.success) {
                    var total=Math.ceil(data.content/50)
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
        var startPos = (pagenumber-1)*50
        $.ajax({
            url:'https://www.ufeng.top/professor/service/list',
            type:'get',
            data:{"startPos":startPos,"number":50},
            async: false,
            success:function (data) {
                if (data.success) {
                    $('#tb').remove()
                    createTable(data.content);

                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
    }

    function createTable(data) {
        // alert(data)
        var body=$('.panel-body')
        var table='<table id="tb" width="100%" class="table table-striped table-bordered table-hover">\n' +
            '                        <thead>\n' +
            '                        <tr>\n' +
            '                            <th></th>\n' +
            '                            <th>ProfessorName</th>\n' +
            '                            <th>Title</th>\n' +
            '                            <th>ReserveAddress</th>\n' +
            '                            <th>ReserveTime</th>\n' +
            '                            <th>Deadline</th>\n' +
            '                            <th>ServiceType</th>\n' +
            '                            <th>MajorType</th>\n' +
            '                            <th>Price</th>\n' +
            '                        </tr>\n' +
            '                        </thead>\n' +
            '                        <tbody>'
        for (var i=0;i<data.length;i++) {
            if (i%2==0) {
                table+='<tr class="odd" onclick="select('+data[i].serviceVO.id+')">'
            }
            else {
                table+='<tr class="even" onclick="select('+data[i].serviceVO.id+')">'
            }
            table+='<td><input type="checkbox" id="'+data[i].serviceVO.id+'" onclick="selectbox('+data[i].serviceVO.id+')"></td>'
            table+='<td>'+data[i].professorName+'</td>'
            table+='<td>'+data[i].serviceVO.title+'</td>'
            table+='<td>'+data[i].serviceVO.reserveAddress+'</td>'
            // var reserve_time=formatDate(new Date(data[i].serviceVO.reserveTime));
            // var ddl=formatDate(new Date(data[i].serviceVO.deadline));
            // var reserve_time = new Date(data[i].serviceVO.reserveTime).format("YYYY-MM-DD hh:mm:ss")
            // var ddl = new Date(data[i].serviceVO.deadline).format("YYYY-MM-DD hh:mm:ss")
            // var restmp = data[i].serviceVO.reserveTime.replace(/-/g, "/")
            // var ddltmp = data[i].serviceVO.deadline.replace(/-/g, "/")
            // console.log(data[i].serviceVO.reserveTime)
            // var reserve_time = moment(data[i].serviceVO.reserveTime).utc().zone(+6).format("YYYY-MM-DD HH:mm:ss")
            // var ddl = moment(data[i].serviceVO.deadline).utc().zone(+6).format("YYYY-MM-DD HH:mm:ss")
            var reserve_time = data[i].serviceVO.reserveTime
            var ddl = data[i].serviceVO.deadline
            table+='<td>'+reserve_time+'</td>'
            table+='<td>'+ddl+'</td>'

            var serviceIndex = data[i].serviceVO.serviceTypeId
            // console.log(serviceIndex)
            var majorIndex = data[i].serviceVO.majorTypeId
            // console.log(majorIndex)
            var serviceType_tmp = serviceType[serviceIndex-1]
            // console.log(serviceType_tmp)
            var majorType_tmp = majorType[majorIndex-1]
            // console.log(majorType_tmp)
            table+='<td>'+serviceType_tmp+'</td>'
            table+='<td>'+majorType_tmp+'</td>'
            table+='<td>'+data[i].serviceVO.price+'</td>'
            table+='</tr>'
        }
        table+='</tbody>\n' +
            '                    </table>'
        body.append(table)
        initCheckbox()
    }

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


    function getAllServiceType() {
        $.ajax({
            url:'https://www.ufeng.top/professor/service/service_type',
            type:'get',
            data:{},
            async: false,
            success:function (data) {
                var content = data.content
                for (var i=0;i<content.length;i++) {
                    serviceType.push(content[i].name)
                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
    }


    function getAllMajorType() {
        $.ajax({
            url:'https://www.ufeng.top/professor/service/major_type',
            type:'get',
            data:{},
            async: false,
            success:function (data) {
                var content = data.content
                for (var i=0;i<content.length;i++) {
                    majorType.push(content[i].name)
                }
            },
            error:function(XMLHttRequest){
                alert(XMLHttRequest.responseText);
            },
        });
    }
}

function initCheckbox() {
    $("input[type='checkbox']").click(function(e){
        e.stopPropagation();
    });
}

$("#add").click(function () {
    window.location.href="/service/addService"
})

$("#detail").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    window.location.href="/service/serviceDetail?id="+selected[0]
})

$("#delete").click(function () {
    if ($(this).hasClass("disabled")){
        return
    }
    // alert(selected)
    for (var i=0; i<selected.length; i++){
        var tmp=selected[i]
        $.ajax({
            type: "delete",
            url:"https://www.ufeng.top/professor/service",
            data:{"serviceId":tmp},
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

// function formatDate(now) {
//     var year = now.getFullYear(),
//         month = now.getMonth() + 1,
//         date = now.getDate(),
//         hour = now.getHours()+now.getTimezoneOffset()/60,
//         minute = now.getMinutes(),
//         second = now.getSeconds();
//
//     return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
// }