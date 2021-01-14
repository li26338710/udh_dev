requirejs([
    'text!template/component3.html',
    'component/udh/index',
    './component/udh/index.js'
],function(
    html,
    udh
){
    console.log(udh)
    udh.methodT();
    webpackJsonpCallback('routes/component3.js', function() {
        return {
            template : html,
            components : {
                'comp3' : udh
            },
            data :function(){
                return {
                    msg : 'ttt',
                    eData : [
                        {
                            type : '类型1',
                            isC : true,
                            value : '50%'
                        },{
                            type : '类型2',
                            isC : false,
                            value : '50%'
                        },{
                            type : '类型3',
                            isC : true,
                            value : '60%'
                        },{
                            type : '类型4',
                            isC : true,
                            value : '10%'
                        },{
                            type : '类型1',
                            isC : false,
                            value : '5%'
                        }
                    ]
                }
            },
            //mounted : 
            methods : {
                methodT : function(){
                    console.log("测试方法");
                    
                },
            }
        }
    });
})
