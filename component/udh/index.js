define([
    "vue",
    "jquery",
    "common_VM_Extend.js"
], function (
    vue,
    $,
    common
    ) {
       //Define API url (Test Env)
       var api_domain = "https://next.udh.yonyouup.com";
       var api_path_productDetail = "/rs/Products/getProductsDetail";
       
       // Define Static params for UDH API (Test Env).
       var api_secret = "db45dabd3ff1821c79720e451ea973f7498d817a";
       var api_param = {
           'appkey': 'b15f9d91f9534153b50a8d44349baff948d0d22f',
           'codes': '',
           'format': 'json',
           'token': '!*2PuNOT73GFPQkkbNEfaf5Y4WdA0aZqcFQCvRbjD2DaM*-'
        }

    var getProductDetail = {
        getCode : function(codes){
            // 
            api_param['codes'] = codes.join();
            console.log("codes : " + api_param['codes']);
        },
        getProductDesc : function(api_param , api_secret){
            // Description API url
            var api_url = api_domain + api_path_productDetail;

            //get sign param
            var sign = createSign(api_param , api_secret);

            //contains param map
            var param_str = "?";
            api_param.forEach(function (value, key, map) {
                param_str = param_str + key + "=" + value + "&";
            });
            param_str = param_str + "sign=" + sign;

            console.log("url" + api_url+param_str)
            return methodT(api_url+param_str);
        },
        createSign : function(api_param, api_secret){

            var sign = "";
            sign = api_secret;
            api_param.forEach(function (value, key, map) {
                sign = sign + key + value;
            });
            sign = sign + api_secret;

            console.log("sign before md5" + sign)
            var sign_md5 = md5(sign);

            return sign_md5;

        }

    }
    
    var methodT = function(url){
        console.log("测试方法");
        $.ajax({
            url : url,
            type: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            success : function(response){
                console.log(666)
                return response;
            },
            error : function(){
                console.log(7777)
            }
        })
    }


    var common_VM_Extend = {
		mounted: function (params) {
            console.log("monted")
			//$('a[href="/agentpage/Orders/quickOrder"]').hide(); //举例 隐藏快速下单 按钮
		},
		afterRequest: function (response) {
			//拦截 getQiuckProducts服务，把返回数据中的 data改成
			if (response && response.data.code === 200 && response.url.indexOf('/api/archives/product/getQiuckProducts') > -1) {
                var productData = response.data.data.data;
                
                var prodList=productData.map(function (item) {
                    return item['cCode']; 
                }); 

                getProductDetail.getCode(prodList);
                var descList = getProductDetail.getProductDesc(api_param, api_secret);
    
                //重置response

				//注意 一定要调用 successCallBack回调，并且传入response.data.data 对象
				response.successCallBack(response.data.data);
			}
		},
	};
	return common_VM_Extend;
});