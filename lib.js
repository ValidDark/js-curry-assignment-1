'use strict'

const listing =
    (name, price) => ({
        name,
        price
    })

const cart =
    (customer, ...items) => ({
        customer,
        items
    })

const listedPrice =
    listing =>
    name =>
    name === listing.name ?
    listing.price :
    0

/**
 * transform carts into an array of { customer, total }
 */
const calculateTotals =
    listings => //array of listings
    carts => { // array of carts

        const newCartArray = []

        carts
            .forEach(c => { //c is each cart object

                newCartArray.push(

                        c.items
                        .reduce((sum, nextItem) => {

                            let rObj = {
                                customer: c.customer,
                                total:
                                    c.items
                                      .reduce((result, item) => result +
                                    listings
                                      .map(l => listedPrice(l)) // array of functions that take a name and return price
                                      .reduce((price, f) => price + f(item), 0), 0)
                            }
                            return rObj
                        }, {}))
            })
        return newCartArray
    }

module.exports = {
    listing,
    cart,
    calculateTotals
}




/*


regularTotals( array of cartscarts) =  calculateTotals(array of listings)


const regularTotals = calculateTotals(regularListings)
const saleTotals = calculateTotals(saleListings)

regularTotals(carts)
  .forEach(cart => console.log(`${cart.customer}, your total is ${cart.total}`))

saleTotals(carts)
  .forEach(cart => console.log(`${cart.customer}, your total could have been ${cart.total} if you were smart enough to come on a sale day! (you dummy)`))
*/
