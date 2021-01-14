define([
    "vue",
    "jquery",
    "echarts",
    "css!component/echartstest/scoped-style.css"
],function(
    Vue,
    $,
    echarts,
    css
){
    var $testEchart = Vue.extend({
        template : '<div id="comp" style="width:800px;height: 600px;"></div>',
        data : function(){
            return {
                data : '测试111',
            }
        },
        created : function(){

            console.log('这是created')
        },
        mounted : function(){
            $('button').text("aaa");
            $th = $("<th>增加的列头</th>");
            $col = $("<td>增加的列</td>");
            $(".table>thead>tr").append($th);
            $(".table>tbody>tr").append($col);
            console.log('这是mounted')
        },
        methods : {
            methodT : function(){
                console.log("测试方法")
            },
            showEchart : function(){
                var self = this;
                $.ajax({
                    url : 'data/tsconfig.json',
                    async : true,
                    dataType : 'json',
                    success : function(data){
                        var tEchart = echarts.init(self.$el);
                        tEchart.setOption(data);
                    },
                    error : function () {
                        var tEchart = echarts.init(self.$el);
                        tEchart.setOption({  "series": [{
                            "type": "bar",
                        }]});
                    }
                })
            }
        }
    });

    return $testEchart

})