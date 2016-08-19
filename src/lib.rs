extern crate thread_id;

use std::thread;
use std::time::Duration;

#[no_mangle]
pub extern fn print_thread_id() {
    println!("current thread id: {}", thread_id::get())
}

#[no_mangle]
pub extern fn run_delayed(callback: extern fn()) {
    println!("main thread id: {}", thread_id::get());

    thread::spawn(move || {
        println!("second thread started (id: {})", thread_id::get());
        thread::sleep(Duration::from_secs(1));
        println!("second thread done sleeping");
        callback();
        println!("second thread finished");
    });
}
