$(function(){
    // 1. 全选 全不选功能模块
    $(".checkall").change(function(){
        $(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        }else{
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function(){
        if($(".j-checkbox:checked").length==$(".j-checkbox").length){
            $(".checkall").prop("checked",true);
        }else{
            $(".checkall").prop("checked",false);
        }
        if($(this).prop("checked")==true){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），
    // 就让这个值++，然后赋值给文本框。
    $(".increment").click(function(){
        var n=$(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块
        var p=$(this).parents(".p-num").siblings(".p-price").html();
        p=p.substr(1);
        var price=(p*n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+price);
        getSum();
    });
    $(".decrement").click(function(){
        var n=$(this).siblings(".itxt").val();
        // console.log(n);
        if(n==1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块
        var p=$(this).parents(".p-num").siblings(".p-price").html();
        p=p.substr(1);
        var price=(p*n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+price);
        getSum();
    });
    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function(){
        var n=$(this).val();
        console.log(n);
        var p=$(this).parents(".p-num").siblings(".p-price").html().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+(p*n).toFixed(2));
        getSum();
    });
    // 5计算总计和总额模块
    getSum();
    function getSum(){
        // 计算总件数 
        var count=0;
        // 计算总价钱
        var money=0;
        $(".itxt").each(function(i,ele){
            count+=parseInt($(ele).val());
        });
        // $(".amount-sum em").html(count);
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i,ele){
            money+=parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥"+money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    })
});