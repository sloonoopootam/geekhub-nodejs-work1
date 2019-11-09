function perform() {
    const args = Array.from(perform.arguments);
    const cb = args.pop();
    if (typeof cb === "function") {
        const result = cb(args);
        this.then = function (cb) {
            return perform(result, cb);
        };
        return this;
    } else console.error("Last argument is not a callback function");
}

perform(null, function(value) {
    console.log(value); // null
    let param = 1;
    console.log(param); // 1
    return param;
})
    .then(function(param) {
        console.log(++param); // 2
        return param;
    })
    .then(function(param) { // param === 2
        console.log(++param); // 3
        return param;
    });
