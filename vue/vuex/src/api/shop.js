const _products = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
    { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
    { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]

// utils
/**
 * 
 * @param {Number} sec 
 */
function delay(sec) {
    return new Promise((res) => {setTimeout( () => {
        res(true)
    }, sec * 1000)})
}

// api methods
const buyProducts = async () => {
    await delay(1)
    return {success: true}
}

const getProducts = async () => {
    await delay(0.2)
    return _products
}

export {
    buyProducts,
    getProducts
}