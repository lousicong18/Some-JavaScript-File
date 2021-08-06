/**
 * 支持 15 位和 18 位身份证号校验
 * 关于身份证校验码可以看：https://baike.baidu.com/item/身份证校验码/3800388
 *
 * @param {string} code 身份证号码
 * @returns {boolean} 是否检验通过
 */
const checkIDNumber = code => {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  let verify = true

  if (!code || typeof code !== 'string') {
    // 请检查实参
    verify = false
  } else if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/i.test(code)) {
    // 身份证号码格式错误
    verify = false
  } else if (!city[code.substr(0, 2)]) {
    // 身份证号码地址编码错误
    verify = false
  } else if (code.length === 18) {
    // 18 位身份证需要验证最后一位校验位
    code = code.split('')
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = code[i]
      wi = factor[i]
      sum += ai * wi
    }
    if (parity[sum % 11] != code[17].toUpperCase()) {
      // 身份证号码校验位错误
      verify = false
    }
  } else if (code.length !== 15) {
    verify = false
  }
  return verify
}
