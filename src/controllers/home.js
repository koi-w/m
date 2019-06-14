const homeTpl = require('../views/home.html')
export default{
    render(){
        $('#index').html(homeTpl)
        new Swiper ('#swiper-one', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
        });
        new Swiper('#swiper-two', {
          slidesPerView: 3.5,
          spaceBetween: 30,
        });

        let timer = null
        $('main').on('scroll',() => {
          if(timer !== null) return;
          timer = setTimeout(() => {
            if($('main').scrollTop() > 0){
              $('header').addClass('active')
            }else{
              $('header').removeClass('active')
            }
            timer = null
          },300)
        })

        $('.search').on('tap',() => {
          window.location.href = '#/index/search'
        })
    }
}