const showlistTpl_main = require('../views/showlist.html')
const showlistTpl_list_tpl = require('../views/showlist-tpl.html')
// const queryString = require('query-string')
import fetch from '../models/fetch'

let positionList = []
let currentPage = 1


function loadBScroll(queryId){
  // Better scroll 实例化
  let bScroll = new BScroll('#showlist_scroll',{
    probeType: 1
  }) 
  let head = $('.head img'),
  topImgHasClass = head.hasClass('up')
  let foot = $('.foot img'),
  bottomImgHasClass = head.hasClass('down') 

  // 初始化距离
  bScroll.scrollTo(0,-40)
  // 绑定滑动事件
  bScroll.on('scroll', function () {
    let y = this.y
    let maxY = this.maxScrollY - y
    // 下拉，当隐藏的loading完全显示的时候触发
    if (y >= 0) {
        !topImgHasClass && head.addClass('up')
        return
    }
    // 上拉，当滚动到最底部时候触发
    if (maxY >= 0) {
        !bottomImgHasClass && foot.addClass('down')
        return
    }
  })
  // 绑定手指松开触发的事件
  bScroll.on('scrollEnd', async function() {
  // 下拉刷新处理
  if (this.y >= -40 && this.y < 0) {
    this.scrollTo(0, -40)
    head.removeClass('up')
  } else if (this.y >= 0) {
    head.attr('src', '/images/ajax-loader.gif')

    let _result = await fetch.get(`/juooo/Search/getShowList?category=${queryId}&city_id=0&page=${++currentPage}&&version=5.1.4&referer=2`)
    _result = positionList = [...JSON.parse(_result).data.list , ...positionList]
    let showlistTpl_list = template.render(showlistTpl_list_tpl,{_result})

    $('#library-wrap-list').html(showlistTpl_list)
    this.refresh() // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    this.scrollTo(0, -40)
    head.removeClass('up')
    head.attr('src', '/images/arrow.png')
  }
  // 上拉加载处理
  let maxY = this.maxScrollY - this.y
  if (maxY > -40 && maxY < 0) {
      this.scrollTo(0, this.maxScrollY + 40);
      foot.removeClass('down')
  } else if (maxY >= 0) {
    foot.attr('src', '/images/ajax-loader.gif')

    let _result = await fetch.get(`/juooo/Search/getShowList?category=${queryId}&city_id=0&page=${++currentPage}&&version=5.1.4&referer=2`)
    _result = positionList = [...positionList , ...JSON.parse(_result).data.list]
    let showlistTpl_list = template.render(showlistTpl_list_tpl,{_result})

    $('#library-wrap-list').html(showlistTpl_list)
    this.refresh() // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    this.scrollTo(0, this.maxScrollY + 40)
    foot.removeClass('down')
    foot.attr('src', '/images/arrow.png')
  }
  })
}

async function render(){
    var queryId = location.hash.split('?')[1].split('=')[1]
    var url = `/juooo/Search/getShowList?category=${queryId}&city_id=0&page=1&&version=5.1.4&referer=2`
    let _result = await fetch.get(url)
    _result = positionList = JSON.parse(_result).data.list
    let showlistTpl_list = template.render(showlistTpl_list_tpl,{_result})
    $('#index').html(showlistTpl_main)
    $('#library-wrap-list').html(showlistTpl_list)
    loadBScroll(queryId)

    new Swiper('.swiper-container', {
      slidesPerView: 4,
      // spaceBetween: 10,
    });

    $('.swiper-wrapper div').each((index,item)=>{
      if($(item).attr('data-id') == queryId){
        $(item).addClass('active')
        return
      }
    })
    $('.swiper-wrapper').on('click','div',async function(){
      let id = $(this).attr('data-id')
      let _result = await fetch.get(`/juooo/Search/getShowList?category=${id}&city_id=0&page=1&&version=5.1.4&referer=2`)
      _result = positionList = JSON.parse(_result).data.list
      let showlistTpl_list = template.render(showlistTpl_list_tpl,{_result})
      $('#library-wrap-list').html(showlistTpl_list)
      $(this).addClass('active').siblings('div').removeClass('active')
    })

    $('#library-wrap-list').on('tap','li',function(){
      let _id = $(this).attr('data-id')
      window.location = `https://m.juooo.com/ticket/${_id}`
    })
}
export default{
    render
}
