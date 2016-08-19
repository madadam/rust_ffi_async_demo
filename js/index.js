var ffi = require('ffi'),
    ref = require('ref')

var lib = ffi.Library('./libffi_async_demo', {
  'print_thread_id': [ 'void', [] ],
  'run_delayed': [ 'void', [ 'pointer' ] ],
});

var done = false

var callback = ffi.Callback('void', [], function() {
  console.log("js callback started");
  lib.print_thread_id()
  console.log("js callback finished");
  done = true
})

lib.run_delayed(callback)

function loop () {
  if (!done) {
    process.nextTick(loop)
  }
}

loop()