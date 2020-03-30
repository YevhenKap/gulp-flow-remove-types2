const { src } = require('gulp')
const gulpFlowRemoveTypes = require('../dist/index.js')

describe('gulp-javascript-obfuscator', () => {
  test('should emit same number of files', () => {
    return new Promise(resolve => {
      let count = 0
      const stream = src('tests/flow_code.js').pipe(gulpFlowRemoveTypes())
      stream.on('error', resolve)

      stream.on('data', file => ++count)

      stream.on('end', function() {
        expect(count).toBe(1)
        resolve.apply(this, arguments)
      })
    })
  })

  test('should emit valid JS code after completion', () => {
    return new Promise(resolve => {
      const stream = src('tests/flow_code.js').pipe(gulpFlowRemoveTypes())
      stream.on('error', resolve)

      stream.on('data', file => {
        // eslint-disable-next-line no-eval
        eval(file.contents.toString('utf8'))
        // eslint-disable-next-line no-undef
        expect(multiply).toBeInstanceOf(Function)
        // eslint-disable-next-line no-undef
        expect(multiply(3, 12)).toBe(36)
        // eslint-disable-next-line no-undef
        expect(multiply(3, '12')).toBe(NaN)
        resolve()
      })
    })
  })

  test('should accept `pretty` option', () => {
    return new Promise(resolve => {
      let nonPrettyFileLength
      const stream = src('tests/flow_code.js').pipe(gulpFlowRemoveTypes())
      const streamPretty = src('tests/flow_code.js').pipe(
        gulpFlowRemoveTypes({ pretty: true })
      )

      stream.on('error', resolve)
      streamPretty.on('error', resolve)

      stream.on('data', file => {
        nonPrettyFileLength = file.contents.toString('utf8').length
      })

      streamPretty.on('data', file => {
        expect(file.contents.toString('utf8').length).toBeLessThan(
          nonPrettyFileLength
        )
        resolve()
      })
    })
  })

  test('should accept `sourceMap` option', () => {
    return new Promise(resolve => {
      let count = 0
      const stream = src('tests/flow_code.js').pipe(
        gulpFlowRemoveTypes({ sourceMap: true })
      )
      stream.on('error', resolve)

      stream.on('data', file => ++count)

      stream.on('end', function() {
        expect(count).toBe(2)
        resolve.apply(this, arguments)
      })
    })
  })
})
