'use strict'

const tap = require('tap')

const log = require('../main')

const segments = {
  '*': {
    // color: 'white'
  },
  http: {
    color: 'orange'
  },
  sql: {
    color: 'magenta'
  }
}

const levels = {
  '*': {
    color: 'white'
  },
  info: {
    color: 'blue',
    marker: 'ℹ️'
  },
  success: {
    color: 'green',
    marker: '✔' // ✔ ✔️
  },
  warning: {
    color: 'yellow',
    marker: '❗️️'
  },
  error: {
    // color: 'red',
    marker: '✗️'
  }
}

log.set({
  segments: segments,
  levels: levels
})

const enabled = {
  dev: {
    segments: [ 'http', 'sql' ],
    levels: [ 'error', 'warning', 'info', 'success' ]
  },
  beta: {
    segments: [ 'http' ],
    levels: [ 'error', 'success' ]
  },
  all: {
    segments: '*',
    levels: '*'
  },
  none: {
    segments: null,
    levels: null
  }
}

const samples = [
  {
    segment: '*',
    message: 'message: the sun is shining'
  },
  {
    segment: 'db',
    message: 'connected to db'
  },
  {
    segment: 'sql',
    message: 'INSERT INTO (...) '
  },
  {
    segment: 'http',
    message: '/api/user/123'
  },
  {
    segment: 'unknown',
    message: 'doh'
  }
]

const result = function (env, level, segment) {
  try {
    return (segment === '*' ||
      enabled[env].segments === '*' ||
      enabled[env].segments.indexOf(segment) !== -1) &&
      (enabled[env].levels === '*' ||
      enabled[env].levels.indexOf(level) !== -1)
  } catch (e) {}
  return false
}

for (const env in enabled) {
  log.set({
    enabled: {
      segments: enabled[env].segments,
      levels: enabled[env].levels
    }
  })

  log.levels.forEach(function (level) {
    samples.forEach((sample) => {
      tap.test(`log for ${env} ${level}`, (test) => {
        test.plan(1)
        let _print = log[level](sample.segment, sample.message)
        test.equal(_print, result(env, level, sample.segment))
      })
    })
  })
}
