var ffi = require('ffi'),
    ref = require('ref')

var lib = ffi.Library('./libffi_async_demo', {
  'print_thread_id': [ 'void', [] ],
  'run_delayed': [ 'void', [ 'pointer' ] ],
});

var callback = ffi.Callback('void', [], function() {
  lib.print_thread_id()
})

lib.run_delayed(callback)

function loop () {
  process.nextTick(loop)
}

loop()