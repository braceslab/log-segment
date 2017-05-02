'use strict'
/**
 * @todo test add funciton: segments, levels
 */
const tap = require('tap')

const log = require('../main')

let segments, levels, enabled, scenarios

const test = function () {
  console.log('settings', log.get())

  tap.test('.check', (test) => {
    test.plan(1)
    log.check()
      .then(() => {
        test.pass('check ok - success')
      })
      .catch((err) => {
        test.pass('check ok - error', err)
      })
  })
  // @todo .set
  // @todo .add
  // @todo .get
  // @todo .value
}

// default settings
segments = log.segments
levels = log.levels
enabled = log.enabled
test()

// custom settings
segments = {
  '*': {
    color: 'white'
  },
  http: {
    color: 'cyan'
  },
  sql: {
    mode: log.mode.FILE,
    file: '/tmp/log-segment-test.log'
  }
}

levels = {
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
    color: 'red',
    marker: '✗️'
  },
  panic: {
    color: 'red',
    mode: log.mode.EMAIL,
    email: {
      transporter: {
        service: 'gmail',
        auth: {
          user: 'braceslab0@gmail.com',
          pass: process.argv[2]
        }
      },
      options: {
        from: '"log-segment" <log-segment@test.test>',
        to: 'braceslab0@gmail.com',
        subject: 'YOUR-APPLICATION: PANIC ERROR'
      }
    }
  }
}

scenarios = {
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
  },
  prod: {
    segments: [ 'sql' ],
    levels: [ 'panic' ]
  }
}

for (const env in scenarios) {
  enabled = scenarios[env]

  log.set({
    segments: segments,
    levels: levels,
    enabled: enabled
  })
  test()
}

// weird settings
segments = {
  http: {
    color: 'purple'
  },
  sql: {
    color: 'magenta'
  }
}

levels = {
  warning: {
    color: 'orange',
    marker: 'WARNING'
  },
  custom: {
  }
}

scenarios = {
  dev: {
    segments: [ 'http', 'sql', 'unknown' ],
    levels: [ 'error', 'warning', 'info', 'success' ]
  },
  beta: {
    segments: [ 'http' ],
    levels: [ 'custom', 'success', 'unknown' ]
  }
}

for (const env in scenarios) {
  enabled = scenarios[env]

  log.set({
    segments: segments,
    levels: levels,
    enabled: enabled
  })
  test()
}
