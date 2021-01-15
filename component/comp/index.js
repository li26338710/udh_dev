define([
    "common_VM_Extend.js",
    "vue",
    "jquery",
    "./md5.min.js"
], function (
    common,
    Vue,
    $,
    md5
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
    var descList = [];

    var common_VM_Extend = Vue.extend({
        template: '<div id="comp" style="width:800px;height: 600px;"></div>',
        data: function () {
        },
        created: function () {
        },
        mounted: function (params) {
            //拦截 getQiuckProducts服务，把返回数据中的 data改成
            //if (response && response.data.code === 200 && response.url.indexOf('/api/archives/product/getQiuckProducts') > -1) {

            this.getCode();
            var descList = this.getProductDesc(api_param, api_secret);

            //重置response
            console.log("descList:"+descList);
                
            $th = $("<th>商品描述</th>");
            //$col = $("<td>增加的列</td>");
            $(".table>thead>tr").append($th);
            //$(".table>tbody>tr").append($col);
            this.resetDom(descList);
            console.log('这是mounted');
        },
        methods: {
            getDescByAPI: function (url) {
                console.log("url 1： " + url);
                var jsondata;
                $.get({
                    //url: 'https://next.udh.yonyouup.com/rs/Products/getProductsDetail?code=010101003,010101002&format=json&sign=099B8535FC91F75F635414DD6986A0FD&appkey=b15f9d91f9534153b50a8d44349baff948d0d22f&token=!*2PuNOT73GFPQkkbNEfaf5Y4WdA0aZqcFQCvRbjD2DaM*-&callback=?',
                    url: './component/comp/testjson.json',
                    type: "get",
                    dataType: "json",
                    async: false,
                    //jsonp:"callback",
                    //jsonpCallback:"success_jsonpCallback",
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    success: function (response) {
                        console.log('data:' + response.data.data);
                        jsondata = response.data.data;
                        console.log(response.data.data.length);

                        // for(let i = 0; i　< response.data.data.length; i++) {
                        //     console.log(response.data.data[i].cCode);
                        //     descList[i] = new Object(); 
                        //     descList[i].code = response.data.data[i].cCode;
                        //     descList[i].cDescription = response.data.data[i].cDescription;
                        // }

                    },
                    error: function (error) {
                        console.log("get product description error." + error);
                    }
                })
                // $.getJSON('https://next.udh.yonyouup.com/rs/Products/getProductsDetail?code=010101003,010101002&format=json&sign=099B8535FC91F75F635414DD6986A0FD&appkey=b15f9d91f9534153b50a8d44349baff948d0d22f&token=!*2PuNOT73GFPQkkbNEfaf5Y4WdA0aZqcFQCvRbjD2DaM*-&jsoncallback=?',
                // function(json){
                //     console.log("response : " + json)
                // });
                console.log("array:"+jsondata);
                return jsondata;
            },
            getCode: function () {
                // Get codes from HTML DOM
                var codes =new Array();
                
                $(".table tbody").find("tr").each(function(index,element){
                    var code = $(this).find("p[ng-bind='sku.product.cCode']").text();
                    codes[index] = code;
                });
                if(codes.length > 0){
                    api_param['codes'] = codes.join();
                }
                console.log("codes : " + api_param['codes']);
            },
            getProductDesc: function (api_param, api_secret) {
                // Product Description API url
                var api_url = api_domain + api_path_productDetail;

                //get sign param
                var sign = this.createSign(api_param, api_secret);

                //contains param map
                var param_str = "?";
                for(var key in api_param){ 
                    param_str = param_str + key + "=" + api_param[key] + "&";
                }

                param_str = param_str + "sign=" + sign;

                return this.getDescByAPI(api_url + param_str);
            },
            createSign: function (api_param, api_secret) {
                // generate param sign
                var sign = "";
                sign = api_secret;

                for(var key in api_param){ 
                    sign = sign + key + api_param[key];
                    console.log(key +":" +api_param[key]);
                }

                sign = sign + api_secret;

                console.log("sign before md5 ： " + sign);
                var sign_md5 = md5(sign).toUpperCase();

                return sign_md5;
            },
            resetDom: function (descList) {
                console.log("resetDom");

                // if descList is not empty
                if(descList && typeof(descList)!="undefined" && descList!=0){
                    var flag = false;

                    //add description to table dom
                    $(".table tbody").find("tr").each(function(index,element){

                        var code = $(this).find("p[ng-bind='sku.product.cCode']").text();
                        console.log("code : " +code);
                        for (item in descList){
                            if (code == descList[item].cCode){
                                var desc = descList[item].cDescription.length>25?descList[item].cDescription.substring(0,25)+"...":descList[item].cDescription;
                                $(this).find("td:last").after("<td><p title=\""+ descList[item].cDescription +"\">"+desc+"</span></td>");
                                flag = true;
                                break;
                            }
                        }

                        // If there has no description data, add '-' to table.
                        if(!flag){
                            $(this).find("td:last").after("<td>-</td>");
                        }
                        // reset flag
                        flag = false;
                    });
                } else {
                    $col = $("<td>-</td>");
                    $(".table>tbody>tr").append($col);
                }
            }
        }
    });

    return common_VM_Extend
})