const ticketPriceTpl = require('../views/ticketPrice.html')
export default{
  render() {
    $('.box').html(ticketPriceTpl)
  }
}