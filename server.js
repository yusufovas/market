const http = require('http')
const RequestHandler = require('./utils/request')
const { read } = require('./utils/fs')
const markets = require('./model/markets.json')
const branches = require('./model/branches.json')
const workers = require('./model/workers.json')
const products = require('./model/products.json')
const userController = require('./utils/Controller')

const server = http.createServer((req, res) => {

    let app = new RequestHandler(req, res)

    let mainUrl = req.url.split('/')[1]
    let slashUrl = req.url.split('/')[2]

    let foundMarket = markets.find(market => market.id == slashUrl)

    // get

    if (mainUrl == 'markets' && req.method == 'GET') {

        if (!slashUrl) {
            const market = read('markets')
            res.end(JSON.stringify(market))
        }

        else {
            if (!foundMarket) return res.end(JSON.stringify({ error: 'market not found' }))
            else {
                branches.map(branch => {
                    branch.worker = workers.filter(worker => worker.branchId === branch.id
                    )
                    branch.product = products.filter(product =>
                        product.branchId === branch.id
                    )
                }) 
                markets.map(market => {
                    market.branch = branches.filter(branch => branch.marketId === market.id)
                }) 
                res.end(JSON.stringify(foundMarket))
            }
        }
    }

    if (mainUrl == 'branches' && req.method == 'GET') {
        if (!slashUrl) res.end(JSON.stringify({ error: 'not found' }))

        else {
            let foundBranch = branches.find(b => b.id == slashUrl)
            res.end(JSON.stringify([foundBranch]))
        }
    }

    if (mainUrl == 'workers' && req.method == 'GET') {
        if (!slashUrl) res.end(JSON.stringify({ error: 'not found' }))

        else {
            let foundWorker = workers.find(w => w.branchId == slashUrl)
            res.end(JSON.stringify([foundWorker]))
        }
    }

    if (mainUrl == 'products' && req.method == 'GET') {
        if (!slashUrl) res.end(JSON.stringify({ error: 'not found' }))

        else {
            let found = products.find(p => p.branchId == slashUrl)
            res.end(JSON.stringify([found]))
        }
    }

    //post

    app.post('/newMarket', userController.POST_MARKET)
    app.post('/newBranch', userController.POST_BRANCH)
    app.post('/newWorker', userController.POST_WORKER)
    app.post('/newProduct', userController.POST_PRODUCT)

    //put

    app.put('/market', userController.PUT_MARKET)
    app.put('/branch', userController.PUT_BRANCH)
    app.put('/worker', userController.PUT_WORKER)
    app.put('/product', userController.PUT_PRODUCT)

    //delete

    app.delete('/market', userController.DELETE_MARKET)
    app.delete('/branch', userController.DELETE_BRANCH)
    app.delete('/workers', userController.DELETE_WORKER)
    app.delete('/product', userController.DELETE_PRODUCT)
}).listen(6060, () => console.log(6060))