// @flow
'use strict'

import type { GulpFlowTransformOptions } from './transform.js'

const GulpFlowTransform = require('./transform.js')

module.exports = (
  options?: GulpFlowTransformOptions = {}
): GulpFlowTransform => {
  return new GulpFlowTransform(options)
}
