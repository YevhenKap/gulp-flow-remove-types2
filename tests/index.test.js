const { src } = require('gulp')
const gulpFlowRemoveTypes = require('../dist/index.js')

describe('gulp-javascript-obfuscator', function () {
  it('should emit same number of files', done => {
    let count = 0
    const stream = src('tests/flow_code.js').pipe(gulpFlowRemoveTypes())
    stream.on('error', done)

    stream.on('data', file => ++count)

    stream.on('end', function () {
      expect(count).toBe(1)
      done.apply(this, arguments)
    })
  })

  it('should emit valid JS code after completion', done => {
    const stream = src('tests/flow_code.js')
      .pipe(gulpFlowRemoveTypes())
    stream.on('error', done)

    stream.on('data', file => {
      eval(file.contents.toString('utf8'))
      expect(multiply).toBeInstanceOf(Function)
      expect(multiply(3, 12)).toBe(36)
      done()
    })
  })

  it('should accept `pretty` option', done => {
    let nonPrettyFileLength
    const stream = src('tests/flow_code.js')
      .pipe(gulpFlowRemoveTypes())
    const streamPretty = src('tests/flow_code.js')
      .pipe(gulpFlowRemoveTypes({ pretty: true }))

    stream.on('error', done)
    streamPretty.on('error', done)

    stream.on('data', file => {
      nonPrettyFileLength = file.contents.toString('utf8').length
    })

    streamPretty.on('data', file => {
      expect(file.contents.toString('utf8').length).toBeLessThan(nonPrettyFileLength)
      done()
    })
  })

  it('should accept `sourceMap` option', done => {
    let count = 0
    const stream = src('tests/flow_code.js')
      .pipe(gulpFlowRemoveTypes({ sourceMap: true }))
    stream.on('error', done)

    stream.on('data', file => ++count)

    stream.on('end', function () {
      expect(count).toBe(2)
      done.apply(this, arguments)
    })
  })
})
