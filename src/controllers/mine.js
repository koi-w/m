const mineTpl = require('../views/mine.html')
export default{
    render(){
        $('.box').html(mineTpl)

        $('#iphone_inp').on('input',function(){
            let number = $(this).val()
            number.length === 0 ? $('.login-btn').removeClass('active') : $('.login-btn').addClass('active');
            
        })
    }
}