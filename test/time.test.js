const momentTz = require('moment-timezone')
const jakartaTz = momentTz().tz('Asia/Jakarta')

describe('timezone test (HH:MM)',_=>{
    it('must return current time',done=>{
        console.log(jakartaTz.format('HH:MM'))
        done()
    })
})

describe('timezone test (HH:mm)',_=>{
    it('must return current time',done=>{
        console.log(jakartaTz.format('HH:mm'))
        done()
    })
})

describe('timezone format LT',_=>{
    it('must not error',done=>{
        console.log(jakartaTz.format('LT'))
        done()
    })
})

describe('timezone utc test',_=>{
    it('must not error',done=>{
        console.log(jakartaTz.utc().format('hh:mm'))
        done()
    })
})