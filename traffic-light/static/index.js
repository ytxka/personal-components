var lights = document.getElementById('lights');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

const COLOR_OFF = '#eee';

function sleep(wait) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, wait);
    });
}

function initColor(light) {
    light.style.background = COLOR_OFF;
}

function countDown(ele, time) {
    let second = time - 1;
    this.timer = setInterval(() => {
        ele.innerHTML = second;
        second -= 1;
       if(second < 0) {
           ele.innerHTML = '';
           clearInterval(this.timer);
       }
    }, 1000);
}

// async函数会返回promise对象，并把实际要return的值包装在promise里
async function changeColor(light, color, duration) {
    light.style.background = color;
    countDown(light, duration / 1000);
    await sleep(duration);
    initColor(light);
}

async function lunchTrafficLight() {
    while(true) {
        await changeColor(red, '#e85a5a', 5000);
        await changeColor(yellow, '#f7bc69', 3000);
        await changeColor(green, '#61b54a', 5000);
    }
}

lunchTrafficLight();