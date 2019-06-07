const indexController = require('../controllers/index')

const router = {
    renderView(){
        let hash = location.hash
        switch(hash){
            case '#index':
                break;
            case '#theatre':
                break;
            case '#ticketPrice':
                break;
            case '#mine':
                break;
            
        }
    },
    init(){
        indexController.render()
        this.renderView()
        window.addEventListener('load',this.renderView)
        window.addEventListener('hashchange',this.renderView)
    }
}

export {
    router
}