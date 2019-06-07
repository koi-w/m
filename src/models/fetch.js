export default {
    get(url){
        return $.ajax({
            url:url,
            type:'get',
            success(data){
                return data
            }
        })
    }
}