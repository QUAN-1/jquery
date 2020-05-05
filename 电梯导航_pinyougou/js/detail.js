window.addEventListener("load",function(){
    var preview_img=document.querySelector(".preview_img");
    var mask=document.querySelector(".mask");
    var big=document.querySelector(".big");
    var bigImg=document.querySelector(".bigImg");
    // 鼠标经过显示隐藏
    preview_img.addEventListener("mouseover",function(){
        mask.style.display="block";
        big.style.display="block";
    })
    preview_img.addEventListener("mouseout",function(){
        mask.style.display="none";
        big.style.display="none";
    })
    // 鼠标移动的时候,黄色盒子跟着鼠标走
    preview_img.addEventListener("mousemove",function(event){
        // 鼠标在盒子里的坐标
        var x=event.pageX-this.offsetLeft;
        var y=event.pageY-this.offsetTop;
        // 鼠标在盒子的中间，减去盒子宽度的一半
        var maskX=x-mask.offsetWidth/2;
        var maskY=y-mask.offsetHeight/2;
        // 最大移动距离,正方形一样
        var maskMax=preview_img.offsetWidth-mask.offsetWidth;
        if(maskX<=0){
            maskX=0;
        }else if(maskX>=maskMax){
            maskX=maskMax;
        }
        if(maskY<=0){
            maskY=0;
        }else if(maskY>=maskMax){
            maskY=maskMax;
        }
        mask.style.left=maskX+"px";
        mask.style.top=maskY+"px";
        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        var bigMax=bigImg.offsetWidth-big.offsetWidth;
        var bigX=maskX*bigMax/maskMax;
        var bigY=maskY*bigMax/maskMax;
        bigImg.style.left=-bigX+"px";
        bigImg.style.top=-bigY+"px";
    })
})