
define(['vue','text!component/echartsbox/echartsbox.html'],function(Vue,eBoxTpl){
    var $eBoxComp = Vue.extend({
        template : '<div id="comp2" style="width:800px;height: 600px;"></div>',
        data : function(){
            return {
                data : '测试',
            }
        },
        
        props : ['prop1'],
        created : function(){
            console.log(this)
        }
    });
    return $eBoxComp;
})