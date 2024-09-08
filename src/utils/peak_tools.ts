/**
 * 工具函数
 */

/**
 * @description 时间处理转换
 * @param date YYYY-MM-DD HH:mm:ss
 * @param type
 * @param zeroFillFlag
 * @returns
 */
export function formatPast(date: string, type = "default", zeroFillFlag = true) {
  // 定义countTime变量，用于存储计算后的数据
  let countTime;
  // 获取当前时间戳
  let time = new Date().getTime();
  // 转换传入参数为时间戳
  let afferentTime = new Date(date).getTime();
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - afferentTime}`);
  if (time < 10000) {
    // 10秒内
    return "刚刚";
  } else if (time < 60000) {
    // 超过10秒少于1分钟内
    countTime = Math.floor(time / 1000);
    return `${countTime}秒前`;
  } else if (time < 3600000) {
    // 超过1分钟少于1小时
    countTime = Math.floor(time / 60000);
    return `${countTime}分钟前`;
  } else if (time < 86400000) {
    // 超过1小时少于24小时
    countTime = Math.floor(time / 3600000);
    return `${countTime}小时前`;
  } else if (time >= 86400000 && type == "default") {
    // 超过二十四小时（一天）且格式参数为默认"default"
    countTime = Math.floor(time / 86400000);
    //大于等于365天
    if (countTime >= 365) {
      return `${Math.floor(countTime / 365)}年前`;
    }
    //大于等于30天
    if (countTime >= 30) {
      return `${Math.floor(countTime / 30)}个月前`;
    }
    return `${countTime}天前`;
  } else {
    // 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
    // 数字补零
    let Y = new Date(date).getFullYear();
    let M = new Date(date).getMonth() + 1;
    let zeroFillM = M > 9 ? M : "0" + M;
    let D = new Date(date).getDate();
    let zeroFillD = D > 9 ? D : "0" + D;
    // 传入格式为"-" "/" "."
    if (type == "-" || type == "/" || type == ".") {
      return zeroFillFlag
        ? Y + type + zeroFillM + type + zeroFillD
        : Y + type + M + type + D;
    }
    // 传入格式为"年月日"
    if (type == "年月日") {
      return zeroFillFlag
        ? Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2]
        : Y + type[0] + M + type[1] + D + type[2];
    }
    // 传入格式为"月日"
    if (type == "月日") {
      return zeroFillFlag
        ? zeroFillM + type[0] + zeroFillD + type[1]
        : M + type[0] + D + type[1];
    }
    // 传入格式为"年"
    if (type == "年") {
      return Y + type;
    }
  }
}
// console.log(formatPast("2024-1-1 11:11:11")); // 3天前
// console.log(formatPast("2023-11-1 11:11:11")); // 2个月前
// console.log(formatPast("2015-07-10 21:32:01")); // 8年前
// console.log(formatPast("2023-02-01 09:32:01", "-", false)); // 2023-2-1
// console.log(formatPast("2023.12.8 19:32:01", "/")); // 2023/12/08
// console.log(formatPast("2023.12.8 19:32:01", ".")); // 2023.12.08
// console.log(formatPast("2023/5/10 11:32:01", "年月日")); // 2023年05月10日
// console.log(formatPast("2023/6/25 11:32:01", "月日", false)); // 6月25日
// console.log(formatPast("2023/8/08 11:32:01", "年")); // 2023年

/**
 * 格式化一个时间为相对于当前时间的描述
 * @param {Date} date
 * @returns
 */
export function formatTimeAgo(date: Date): string {
  const timestamp = date.getTime();
  if (!timestamp) return "";

  const units = [
    { limit: 30, divisor: 1, suffix: "刚刚" },
    { limit: 60, divisor: 1, suffix: "秒前" },
    { limit: 3600, divisor: 60, suffix: "分钟前" },
    { limit: 86400, divisor: 3600, suffix: "小时前" },
    { limit: 2592000, divisor: 86400, suffix: "天前" },
    { limit: 31536000, divisor: 2592000, suffix: "月前" },
    { limit: Infinity, divisor: 31536000, suffix: "年前" }
  ];

  const now = Date.now();
  const secondDiff = (now - timestamp) / 1000; // 秒差

  if (secondDiff < 0) return "";

  for (const unit of units) {
    if (secondDiff < unit.limit) {
      if (unit.suffix === "刚刚") return unit.suffix;
      return `${Math.floor(secondDiff / unit.divisor)}${unit.suffix}`;
    }
  }
}

type Procedure = (...args: any[]) => void;
/**
 * 防抖
 * @param {function} fun -- 执行的回调函数(vue2该函数不能是箭头函数)
 * @param {number} delay -- 延迟时间(默认500ms)
 * @param {boolean} isImmediate -- 是否首次是否立即执行一下(默认true)
 */
export function debounce<T extends Procedure>(
  fun: T,
  delay: number = 500,
  isImmediate: boolean = true
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null; // 定时器
  let immediateTimer: ReturnType<typeof setTimeout> | null = null; // 继续首次触发的定时器
  let _isImmediate = isImmediate; //  第一次触发是否立即
  // vue2返回的函数不能是箭头函数
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 规定时间频繁触发就清除上一次的定时器
    timer && clearTimeout(timer);
    immediateTimer && clearTimeout(immediateTimer);

    // 首次触发立即执行一下(如果后续紧跟继续触发,就走定时器)
    if (_isImmediate) {
      fun.call(this, ...args);
      _isImmediate = false; // 首次执行完成把 _isImmediate 为false
      timer = null;

      // 如果点击一次后在delay时间内没有继续点击,下次点击继续首次触发
      immediateTimer = setTimeout(() => {
        _isImmediate = isImmediate; // 继续开启首次立即执行
        immediateTimer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fun.call(this, ...args);
        _isImmediate = isImmediate; // 定时器执行完毕,继续(开启|关闭)首次立即执行
        timer = null; // 执行完毕置空
        immediateTimer = null;
      }, delay);
    }
  };
}

/**
 * 节流
 * @param {function} fun -- 执行的回调函数(vue2该函数不能是箭头函数)
 * @param {number} delay -- 延迟时间(默认500ms)
 * @param {boolean} immediate -- 是否立即执行
 * @returns
 */
export function throttle<T extends Procedure>(
  fun: T,
  delay: number = 500,
  immediate: boolean = true
): (...args: Parameters<T>) => void {
  let previousTimeStamp: number = 0; // 上一次点击的时间戳
  let timer: ReturnType<typeof setTimeout> | null = null; // 定时器
  // vue2返回的函数不能是箭头函数
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 点击后立即执行,等待指定时间以后才能再次点击
    if (immediate) {
      let nowTimeStamp = +new Date(); // 获取当前点击的时间戳
      // 就上次点击相隔时间大于 delay 就执行
      if (nowTimeStamp - previousTimeStamp > delay) {
        fun.call(this, ...args);
        previousTimeStamp = nowTimeStamp; // 并记录点击 触发的时间
      }
    } else {
      // 点击后等待指定的时间后才执行且才能再次点击
      if (!timer) {
        timer = setTimeout(() => {
          fun.call(this, ...args);
          timer = null; // 定时器结束后赋值为null,方便下次执行
        }, delay);
      }
    }
  };
}
