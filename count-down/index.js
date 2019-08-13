let btn = document.getElementById('btn');
const TEXT = btn.innerHTML

/*
 * 倒计时
 * @ele: 要增加倒计时的元素
 * @time: 倒计时的时间
 * @text：倒计时结束后要显示的内容
 */
function countDown(ele, time, text) {
    let timer;
    let second = time;
    timer = setInterval(() => {
        second -= 1;
        ele.innerHTML = second;
        if (second < 0) {
            ele.innerHTML = text;
            clearInterval(timer);
        }
    }, 1000);
}

btn.addEventListener('click', () => countDown(btn, 5, TEXT));