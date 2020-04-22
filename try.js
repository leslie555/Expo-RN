function poll(fn, timeout, interval) {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  var checkCondition = function (resolve, reject) {
    // 如果条件满足，就返回结果
    var result = fn();
    if (result) {
      resolve(result);
    }
    // 如果条件不满足，且没有超时，就等待 interval ms 后再继续检查一遍
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // 调用时间过长，或调用出错，就报错返回
    else {
      reject(new Error('timed out for ' + fn + ': ' + arguments));
    }
  };

  return new Promise(checkCondition);
}

// 使用：轮训，确保元素为可见时，再进行后续逻辑处理
poll(function () {
  return document.getElementById('lightbox').offsetWidth > 0;
}, 2000, 150).then(function (data) {
  // 完成轮训，处理返回的数据
}).catch(function (err) {
  // 超时出错，处理错误
});





let p = new Promise(function (resolve, rejected) {
  if () {
    resolve(data)
  } else {
    reject(err)
  }
})
p.then(data => dosth).catch(err => dosth)



new Promise(function executor(resolve) {
  console.log(2);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function () {
  console.log(4);
});
console.log(5);

function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map(v => v.length)) }).map(v => [])
  );
}


function chai(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((item, idx) => t[idx].push(item)) ),
    Array.from({length: Math.max(...arr.map(v => v.length))}).map(i=>[])
  )
}

