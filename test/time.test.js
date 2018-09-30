const assert = require('assert')
const moment = require('moment')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('api1','arief','arief',{
    operatorsAliases:false,
    dialect:'mysql',
    timezone:'Asia/Jakarta'
})


describe('query to get curtime',_=>{
    it('must return time',async()=>{
        const result = await sequelize.query('select curtime()')
        console.log(result)
    })
})


describe('test moment',_=>{
    it('must return id',done=>{
        console.log(moment().format('LT'))
        done()
    })
})