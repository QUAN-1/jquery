// 匀速动画 就是 盒子是当前的位置 +  固定的值 10 
// 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        // 步长，越来越慢
        var step=(target-obj.offsetLeft)/10;
        // 取整,不出现小数问题
        step=step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
            // 有回调函数就执行
            // if(callback){
            //     callback();
            // }
            callback&&callback();
        }
        obj.style.left=obj.offsetLeft+step+"px";
    },15);
}