const { read, write } = require('./fs')
const branches  = require('../model/branches.json')
const workers = require('../model/workers.json')
const products = require('../model/products.json')
const markets = require('../model/markets.json')
let userController = {

    POST_MARKET : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let markets = read('markets')
        data.id = markets.length ? markets.at(-1).id + 1 : 1
        markets.push(data)
        write('markets', markets)
        res.end(JSON.stringify({ status: 201, message: 'added' }))
    },

    POST_BRANCH :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let branches = read('branches')
        data.id = branches.length ? branches.at(-1).id + 1 : 1
        branches.push(data)
        write('branches', branches)
        res.end(JSON.stringify({ status: 201, message: 'added' }))
    },
    POST_WORKER :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let workers = read('workers')
        data.id = workers.length ? workers.at(-1).id + 1 : 1
        workers.push(data)
        write('workers', workers)
        res.end(JSON.stringify({ status: 201, message: 'added' }))
    },
    POST_PRODUCT :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let products = read('products')
        data.id = products.length ? products.at(-1).id + 1 : 1
        products.push(data)
        write('products', products)
        res.end(JSON.stringify({ status: 201, message: 'added' }))
    },

    PUT_MARKET : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let markets = read('markets')
        let found = markets.find(el => el.id == data.id)
        if(found) {
            data.name ? found.name = data.name : found.name
            write('markets', markets)
            res.end(JSON.stringify('updated'))
        }
    },
    PUT_BRANCH : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let branches = read('branches')
        let found = branches.find(el => el.id == data.id)
        if(found) {
            data.name ? found.name = data.name : found.name
            data.marketId ? found.marketId = data.marketId : found.marketId
            data.adress ? found.adress = data.adress : found.adress
            write('branches', branches)
            res.end(JSON.stringify('updated'))
        }
    },
    PUT_WORKER : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let workers = read('workers')
        let found = workers.find(el => el.id == data.id)
        if(found) {
            data.name ? found.name = data.name : found.name
            data.branchId ? found.branchId = data.branchId : found.branchId
            data.position ? found.position = data.position : found.position
            write('workers', workers)
            res.end(JSON.stringify('updated'))
        }
    },
    PUT_PRODUCT : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let products = read('products')
        let found = products.find(el => el.id == data.id)
        if(found) {
            data.name ? found.name = data.name : found.name
            data.branchId ? found.branchId = data.branchId : found.branchId
            data.count ? found.count = data.count : found.count
            data.price ? found.price = data.price : found.price
            write('products', products)
            res.end(JSON.stringify('updated'))
        }
    },

    DELETE_MARKET : async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let markets = read('markets')
        let filtered = markets.filter(market => market.id != data.id)
        let filteredBranches = branches.filter(b => b.marketId != data.id)
        let filteredWorkers = workers.filter(worker => worker.branchId != data.id)
        let filteredProducts = products.filter(product => product.branchId != data.id)
        if (markets.length > filtered.length) {
            write('markets', filtered)
            write('branches', filteredBranches)
            write('workers', filteredWorkers)
            write('products', filteredProducts)
            res.end(JSON.stringify({ status: 202, message: 'deleted' }))
        } else {
            res.end(JSON.stringify({ status: 401, message: 'not found' }))
        }
    },

    DELETE_BRANCH :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let markets = read('markets')
        let filteredBranches = branches.filter(b => b.marketId != data.id)
        let filteredWorkers = workers.filter(worker => worker.branchId != data.id)
        let filteredProducts = products.filter(product => product.branchId != data.id)
        if (branches.length > filteredBranches.length) {
            write('branches', filteredBranches)
            write('workers', filteredWorkers)
            write('products', filteredProducts)
            res.end(JSON.stringify({ status: 202, message: 'deleted' }))
        } else {
            res.end(JSON.stringify({ status: 401, message: 'not found' }))
        }
    },

    DELETE_WORKER :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let workers = read('workers')
        let filtered = workers.filter(el => el.id != data.id)
        if(workers.length > filtered.length) {
            write('workers', filtered)
            res.end(JSON.stringify({status: 202, message: 'deleted'}))
        } else {
            res.end(JSON.stringify({status:401, message:'not found'}))
        }
    },

    DELETE_PRODUCT :  async (req, res) => {
        let data = await req.body
        data = JSON.parse(data)
        let products = read('products')
        let filtered = products.filter(el => el.id != data.id)
        if(products.length > filtered.length) {
            write('products', filtered)
            res.end(JSON.stringify({status: 202, message: 'deleted'}))
        } else {
            res.end(JSON.stringify({status:401, message:'not found'}))
        }
    }
}

module.exports = userController