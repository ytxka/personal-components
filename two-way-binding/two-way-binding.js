// 极简版
// function twoWayBinding1(inputDom, showDom) {
//     inputDom.onkeyup = (e) => {
//         showDom.innerHTML = e.target.value
//     }
// }

// 进阶版
// function twoWayBinding2(inputDom, showDom, modelName) {
//     Object.defineProperty(state, modelName, {
//         configurable: true,
//         enumerable: true,
//         set(newVal) {
//             inputDom.value = newVal;
//             showDom.innerHTML = newVal;
//         }
//     });

//     inputDom.onkeyup = (e) => {
//         state[modelName] = e.target.value;
//     }
// }

// 再次进阶版
function twoWayBinding3(state) {
    // 数据劫持
    const defineReactive = (data, key, val) => {
        observer(val);
        Object.defineProperty(data, key, {
            set(newVal) {
                if(val === newVal) return
                // val 是defineReactive函数的一个变量（参数），只是初始值是data[key]，并非是直接给data的value赋值。。。
                // 因为get返回的也是val，所以通过设置val就实现了数据劫持，并未直接修改data。
                val = newVal; 
                console.log(`给${key}设置了新值`);
            },
            get() {
                console.log(`${key}已经被监听啦！`);
                return val;
            },
        })
    }

    // 数据监听器: 递归监听所有属性
    const observer = (data) => {
        if(!data || typeof data !== 'object') return;
        // twoWayBinding3()
        Object.keys(data).forEach(item => {
            defineReactive(data, item, data[item])
        })
    }

    // let state = {
    //     userInput: 'old',
    // }
    observer(state);
    // state.userInput = 'gg'
    // console.log(state.userInput);
}

