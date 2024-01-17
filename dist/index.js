var d = Object.defineProperty;
var g = (l, s, e) => s in l ? d(l, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[s] = e;
var o = (l, s, e) => (g(l, typeof s != "symbol" ? s + "" : s, e), e);
const c = {
  mixNumLetter: {
    value: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
    message: "请输入数字字母混合且不小于 6 位字符"
  },
  oneNine: {
    value: /^([1-9]){1}$/,
    message: "请输入数字1-9，任意一位数字"
  },
  phone: {
    value: /^1[34578][0-9]{9}$/,
    message: "请输入正确的手机号"
  },
  oneAndNineNine: {
    value: /^[1-9]{1,2}$/,
    message: "请输入1-99整数"
  },
  numberUppercaseLetter: {
    value: /^[0-9A-Z]+$/,
    message: "只能是数字与大写字母"
  },
  twoDecimalPlaces: {
    value: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
    message: "只能保留2位小数"
  },
  cn: {
    value: /^[u4e00-u9fa5]{0,}$/,
    message: "请输入中文"
  },
  AZazNumber: {
    value: /^[A-Za-z0-9]+$/,
    message: "请输入英文和数字"
  },
  EnglishAlphabet: {
    value: /^[A-Za-z]+$/,
    message: "请输入英文字母"
  },
  LowerLetters: {
    value: /^[a-z]+$/,
    message: "请输入小写字母"
  },
  uppercaseLetter: {
    value: /^[A-Z]+$/,
    message: "请输入大写字母"
  },
  email: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "请输入正确的邮箱"
  },
  url: {
    value: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    message: "请输入正确的域名"
  },
  tel: {
    value: /^((d{3,4}-)|d{3.4}-)?d{7,8}$/,
    message: "请输入电话号码"
  },
  ip: {
    value: /d+.d+.d+.d+/,
    message: "请输入IP地址"
  },
  s: {
    value: /s/,
    message: "不能为空"
  },
  isDecimalPoint: {
    value: /^\d+\.\d+$/,
    message: "请输入带小数点的数字"
  },
  WeChat: {
    value: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
    message: "请输入微信号"
  },
  PostalCode: {
    value: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
    message: "请输入邮政编码"
  },
  cnAndNumber: {
    value: /^(([\u4E00-\u9FA5])|(\d))+$/,
    message: "只能包含中文和数字"
  },
  id: {
    value: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
    message: "请输入身份证号码"
  },
  json: {
    value: (l) => {
      try {
        const s = JSON.parse(l), e = Object.prototype.toString.call(s);
        return e === "[object Object]" || e === "[object Array]";
      } catch {
        return !1;
      }
    },
    message: "请输入正确的JSON格式 String"
  }
};
class f {
  constructor(s, e = {}) {
    o(this, "rules");
    o(this, "regulars");
    this.rules = s || {}, this.regulars = Object.assign(e, c);
  }
  async validate(s) {
    const e = {};
    for (const [t, n] of Object.entries(this.rules)) {
      const r = s[t];
      for (const a of n) {
        if (a.type && typeof r !== a.type) {
          e[t] = `Field ${t} should be of type ${a.type}.`;
          break;
        }
        if (a.required && !r && !/\d/.test(r)) {
          e[t] = a.message || `Field ${t} cannot be empty.`;
          break;
        }
        const u = this.regulars[a.type];
        if (a.type && u) {
          if (typeof u.value == "function" && !u.value(r)) {
            e[t] = a.message || u.message;
            break;
          }
          if (typeof u.value == "object" && !u.value.test(r)) {
            e[t] = a.message || u.message;
            break;
          }
        }
        if (a.regex && !a.regex.test(r)) {
          e[t] = a.message || `Field ${t} does not match the required pattern.`;
          break;
        }
        if (a.validator && typeof a.validator == "function") {
          let m = function(i) {
            i && (e[t] = i || a.message || `Field ${t} failed custom validation.`);
          };
          await a.validator(t, r, m);
          break;
        }
      }
    }
    return console.log(e, "errors"), {
      valid: Object.keys(e).length === 0,
      fields: e
    };
  }
}
export {
  f as default
};
