
API


.set

.add


log.v alias log.val alias log.value


mode:

CONSOLE -> use console log
FILE -> use fs

mode in segment and mode in level
-> if different, use both


encapsulate to prevent JSON.strigify to the needed point
may be not be executed

#### Default

````js
const log = require('log-segment')
log.info('*', 'info message')
log.success('*', 'success message')
log.warning('*', 'warning message')
log.error('*', 'error message')
log.panic('*', 'panic message')
````

output
(attach screenshot)

DEFAULT

````js
const log = require('log-segment')
log.set({
  segments: {
    http: {
      color: 'white'
    },
    sql: {
      color: 'magenta'
    }
  },
  levels: {
    info: {
      color: 'blue',
      marker: 'ℹ️'
    },
    success: {
      color: 'green',
      marker: '✔'
    },
    warning: {
      color: 'yellow',
      marker: '❗️️'
    },
    error: {
      color: 'red',
      marker: '✗️'
    }
  }
})

log.info('*', 'info message')
log.success('*', 'success message')
log.warning('*', 'warning message')
log.error('*', 'error message')
````


one point settings to rule them all

level
* unknow level, or empty


mode

if segment is file, output only to this file
if level is file, output only to this file

else write to console

### API
...
