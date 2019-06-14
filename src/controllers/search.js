const search = require('../views/search.html')
const fetch = require('../models/fetch').default;
// const showlist_tpl = require('../views/showlist-tpl.html')

export default {
    render(){
        $('#index').html(search)

        new BScroll('.search_main')

        //
        $('.hot-search li').on('tap',function(){
            let text = $(this).text()
            loadData(text)
        })

        //清空input
        $('.cancel-icon').on('click',() => {
            $('#search_inp').val('')
        })

        async function loadData(text){
            let url = `https://m.juooo.com/Search/getShowList?keywords=${text}&page=1&sort_type=1&&version=5.1.4&referer=2`
            let _result = await fetch.get(url)
            _result = JSON.parse(_result).data.list

            let showlist = ''
            _result.forEach(ele => {
                showlist +=  `
                                <li data-id="${ele['schedular_id']}">
                                <div class="show-icon">
                                    <a href="javascript:void(0)" target="_top"><img src="${ele['pic']}" alt=""></a>
                                </div>
                                <div class="show-desc">
                                    <p class="show-date"><strong>${ele['show_time_top']}</strong> ${ele['show_time_bottom']}</p>
                                    <a href="javascript:void(0)" target="_top"><h3>${ele['name']}</h3></a>
                                    <p class="show-address">${ele['city_name']} | ${ele['venue_name']}</p>
                                    <p class="show-price"><strong>￥${ele['min_price']}</strong>起</p>
                                </div>
                            </li>
                                `
            });

            //不是数字才匹配高亮，以免影响li里的id
            if(!(/^[0-9]*$/.test(text))){
                var reg = new RegExp("(" + text + ")","g");
                showlist = showlist.replace(reg,"<font style='color:#ff6743;'>$1</font>")
            }
            
            $('.hot-search').hide()
            $('#search_list').html(showlist)
        }
        //加载数据
        $('#search_inp').on('input',function(){
            let text = $(this).val()
            loadData(text)
        })

        //点击跳转对应页面
        $('#search_list').on('tap','li',function(){
          let _id = $(this).attr('data-id')
          window.location = `https://m.juooo.com/ticket/${_id}`
        })

    }
}