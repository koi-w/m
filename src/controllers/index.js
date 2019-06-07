const indexTpl = require('../views/index.html')
export default{
    render(){
        $('#app').html(indexTpl)
    }
}



// const indexTpl = require('../views/index.html')
// // const Swiper = require('../libs/swiper/swiper.min')

// function render(){
//     $('#app').html(indexTpl)
//     var mySwiper = new Swiper ('.swiper-container', {
//         // direction: 'vertical', // 垂直切换选项
//         loop: true, // 循环模式选项
//         autoplay: true,
//         // 如果需要分页器
//         pagination: {
//           el: '.swiper-pagination',
//         },
        
//         // // 如果需要前进后退按钮
//         // navigation: {
//         //   nextEl: '.swiper-button-next',
//         //   prevEl: '.swiper-button-prev',
//         // },
        
//         // // 如果需要滚动条
//         // scrollbar: {
//         //   el: '.swiper-scrollbar',
//         // },
//       })      
// }

// module.exports = {
//     list(){
//         $.ajax({
//             // url: '/api/listmore.json?pageNo=2&pageSize=15' ,
//             // url: '/json/list' ,
//             url: '/json/result' ,
//             type : 'POST',
//             data:{
//                 "logger": {
//                     "traceCapable": true,
//                     "name": "com.lagou.entity.mobile.MobilePosition"
//                 },
//                 "id": 7845784,
//                 "positionName": "【配送】品牌合作",
//                 "city": "北京",
//                 "createTime": "今天 20:56",
//                 "salary": "200k-400k",
//                 "companyId": 50452,
//                 "companyLogo": "i/image/M00/6A/05/Cgp3O1gW8zSAUwUsAABMptH-XY087.jpeg",
//                 "companyName": "美团点评",
//                 "companyFullName": "北京三快在线科技有限公司"
//             },
//             success(res){
//                 console.log(res)
//             }
//         })
//     },
//     render
// }
