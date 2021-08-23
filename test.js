const obj = {
    func1: function () {
        console.log('func1');
    },
    func2: function () {
        console.log('func2');
        console.log(obj === this);
        console.log(window === this);
    },
};
obj.func2();

function testFunc(param) {
    return {
        func1: () => {
            console.log('func1');
        },
        func2: () => {
            console.log('func2');
            this.func1();
        },
    };
}
