
// requirejs([
//   'text!template/component2.html',
//   'component/comp/index',
//   'component/comp2/index'
// ],function(
//   html,
//   comp,
//   comp2
// ){

requirejs([
  'text!template/component4.html',
  'component/udh/index'
], function (
  html,
  testjs
  ) {
          console.log(testjs);
  console.log("测试js "); 

    webpackJsonpCallback('routes/component4.js', function() {
      return {
          template : html,
      }
    })
  });