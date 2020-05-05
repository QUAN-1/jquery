window.addEventListener("load",function(){
    var arrow_l=document.querySelector(".arrow_l");
    var arrow_r=document.querySelector(".arrow_r");
    var focus=document.querySelector(".focus")
    // 滑动按钮隐藏与显示
    focus.addEventListener("mouseenter",function(){
        arrow_l.style.display="block";
        arrow_r.style.display="block";
        clearInterval(timer);
        timer=null;
    });
    focus.addEventListener("mouseleave",function(){
        arrow_l.style.display="none";
        arrow_r.style.display="none";
        timer=setInterval(function(){
            arrow_r.click();
        },2000)
    });
    // 动态生成小圈,按照图片个数来生成
    var ul=focus.querySelector("ul");
    var ol=focus.querySelector("ol");
    // 点击右侧按钮,图片滚动一张
    var num=0;
    // 控制小圈的播放
    var circle=0;
    // 节流阀
    var flag=true;
    for(var i=0,len=ul.children.length;i<len;i++){
        var li=document.createElement("li");
        li.setAttribute("index",i);
        ol.appendChild(li);
        // 排他思想,点击哪个,哪个得到current
        li.addEventListener("click",function(){
            for(var i=0,len=ol.children.length;i<len;i++){
                ol.children[i].className="";
            }
            this.className="current";
            // 点击小点,切换图片
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index=this.getAttribute("index");
            console.log(index);
            num=index;
            circle=index;
            animate(ul,-index*focus.offsetWidth);
        });
    }
    // 默认第一个是current
    ol.children[0].className="current";
    //克隆第一张图片li放到ul最后面
    var frist=ul.children[0].cloneNode(true);
    ul.appendChild(frist);
    arrow_r.addEventListener("click",function(){
        if(flag){
            flag=false;
            if(num==ul.children.length-1){
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*focus.offsetWidth,function(){
                // 动画执行完毕才能继续执行其他动画
                flag=true;
            });
            circle++;
            // 到了4立即变零
            if(circle==ol.children.length){
                circle=0;
            }
            circleChang();
        }
    });
    arrow_l.addEventListener("click",function(){
        if(flag){
            flag=false;
            if(num==0){
                num=ul.children.length-1
                ul.style.left=-num*focus.offsetWidth+"px";
            }
            num--;
            // num变小,乘以一个负值,相当于越来越大,相当于盒子右移动
            animate(ul,-num*focus.offsetWidth,function(){
                // 动画执行完毕才能继续执行其他动画
                flag=true;
            });
            circle--
            // if(circle<0){
            //     circle=ol.children.length-1;
            // }
            circle=circle<0?ol.children.length-1:circle;
            circleChang();
        }
    });
    function circleChang (){
        for(var i=0,len=ol.children.length;i<len;i++){
            ol.children[i].className="";
        }
        ol.children[circle].className="current";
    }
    var timer=this.setInterval(function(){
        arrow_r.click();
    },2000);
    // // 点会乱
    // arrow_r.addEventListener("click",function(){
    //     if(flag){
    //         flag=false;
    //         num++;
    //         if(num==ul.children.length){
    //             num=0;
    //             ul.style.left=0;
    //             num++;
    //         }
    //         animate(ul, -num * focus.offsetWidth, function() {
    //             flag = true;
    //         });
    //         circle++;
    //         if (circle == ol.children.length) {
    //             circle = 0;
    //         }
    //         circleChang();
    //     }
    // });
    // // 存在底色
    // arrow_l.addEventListener("click",function(){
    //     if(flag){
    //         flag=false;
    //         num--;
    //         if(num<0){
    //             console.log(ul.children.length);
    //             num=ul.children.length;
    //             ul.style.left=-num * focus.offsetWidth+"px";
    //             num--;
    //             console.log(num)
    //         }
    //         animate(ul, -num * focus.offsetWidth, function() {
    //             flag = true;
    //         });
    //         circle--;
    //         if (circle < 0) {
    //             circle = ol.children.length-1;
    //         }
    //         circleChang();
    //     }
    // });
});
// 有个bug,如果屏幕缩小,点击左右按钮切换没用
//自我猜测:因为屏幕变小了,屏幕像素比也开始变小,只有零点几,
// 这时候取整,向左向右移都已经没有足够的像素,所以会一直卡在那里
// 所以在放大的情况下没有这个问题
