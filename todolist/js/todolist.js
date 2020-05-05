$(function(){
    // console.log(11);
    load();
    // 按下回车 把完整数据 存储到本地存储里面
    $("#title").on("keydown",function(event){
        if(event.keyCode===13){
            if($(this).val()===""){
                alert("请输入您要的数据")
            }else{
                var local=getData();
                local.push({title:$(this).val(),done:false});
                saveData(local);
                load();
                $(this).val("");
            }
        }
    })
    // toDoList 删除操作
    $("ol,ul").on("click","a",function(){
        var data=getData();
        var index=$(this).attr("id");
        console.log(index);
        data.splice(index,1);
        saveData(data);
        load();
    })
    // toDoList 正在进行和已完成选项操作
    $("ol,ul").on("click","input",function(){
        var data=getData();
        var index=$(this).siblings("a").attr("id");
        data[index].done=$(this).prop("checked");
        saveData(data);
        load();
    })
    // 读取本地存储的数据 
    function getData(){
        var data=localStorage.getItem("todolist");
        if(data!==null){
            return JSON.parse(data);
        }else{
            return [];
        }
    }
    // 保存本地存储数据
    function saveData(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }
    // 渲染加载数据
    function load(){
        var data=getData();
        $("ul,ol").empty();
        var todoCount=0;
        var doneCount=0;
        $.each(data,function(i,n){
            if(n.done){
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})