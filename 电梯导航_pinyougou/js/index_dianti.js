$(function(){
    // console.log(11);
    // 节流阀  互斥锁 
    var flag = true;
    var tooltop=$(".recommed").offset().top;
    toggleTool();
    function toggleTool(){
        if($(document).scrollTop()>=tooltop){
            $(".fixedtool").fadeIn();
        }else{
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool();
        // 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if(flag){
            $(".floor .quan").each(function(i,ele){
                // console.log(ele);
                if($(document).scrollTop()>=$(ele).offset().top){
                    // console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });
    // 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function(){
        flag=false;
        var current=$(".floor .quan").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop:current
        },function(){
            flag=true;
        })
        $(this).addClass("current").siblings().removeClass();
    })
})