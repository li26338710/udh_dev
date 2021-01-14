
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
  'text!template/component5.html',
  'component/udh/index'
], function (
  html,
  testjs
  ) {
          console.log(testjs);
  console.log("测试js "); 

    webpackJsonpCallback('routes/component5.js', function() {
      return {
          template : html,
      }
    })
  });