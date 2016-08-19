var ffi = require('ffi'),
    ref = require('ref'),
    sleep = require('sleep')

var lib = ffi.Library('./libffi_async_demo', {
  'print_thread_id': [ 'void', [] ],
  'run_delayed': [ 'void', [ 'pointer' ] ],
});

var callback = ffi.Callback('void', [], function() {
  console.log("js callback started");
  lib.print_thread_id()
  console.log("js callback finished");
})

lib.run_delayed(callback)

sleep.sleep(2);

console.log("js main finished");
