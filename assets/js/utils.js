function getEleById(idName) {
  return document.getElementById(idName)
}

function getEleByClassName(className) {
  return document.getElementsByClassName(className)
}

// return flag instead if val is empty(means in emptyList).
function formatEmptyData(val, flag) {
  const emptyList = [null, undefined, '']
  return emptyList.indexOf(val) >= 0 ? val : flag
}
/**
 * Execute function 'fn' only once during 'wait' seconds, no matter how many times it is triggered.
 * @param {*} fn Function name that want to be process.
 * @param {*} wait Seconds.
 */
function debounce(fn, wait) {
  let timer
  return function() {
    let args = arguments
    let context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * Execute function 'fn' once during every 'wait' seconds, if you trigger it.
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
  let timer
  return function() {
    let args = arguments
    let context = this
    if (!timer) {
      timer = setTimeout(function() {
        timer = null
        fn.apply(context, args)
      }, wait)
    }
  }
}