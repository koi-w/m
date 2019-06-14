const theatreTpl = require('../views/theatre.html')
const fetch = require('../models/fetch').default;

const theatre_swipper_tpl = require('../views/theatre-swipper-tpl.html')
const theatre_tpl = require('../views/theatre-tpl.html')

let str = `
<div data-id='{{$value["id"]}}' class="swiper-slide">
        <div class="theater-show-date">
            <p></p>
            <span></span>
        </div>
        <a href="{{$value['schedular_url']}}" class="theater-show-pic">
            <p>查看更多></p>
        </a>
    </div>`

export default{
    async render(){
        $('.box').html(theatreTpl)

        let _data = await fetch.get('https://m.juooo.com/RestTheatre/getTheatreList?page=1&&version=5.1.4&referer=2')
        let theatre_list = JSON.parse(_data).data.theatre_list

        let lis = ''
        theatre_list.forEach(ele => {
            let _list = ele.show_list
            let theatre = template.render(theatre_tpl,ele)
            let theatre_swipper = template.render(theatre_swipper_tpl,{_list})
            theatre_swipper += str
            lis += theatre
            $('#theatre').html(lis)
            $(`#theatre_swipper_${ele.id}`).html(theatre_swipper)
            lis = $('#theatre').html()
        });

        new BScroll('.theatre_main')
        
        new Swiper('.swiper-container', {
            slidesPerView: 2.75,
            // spaceBetween: 0,
        });
    
    }
}