/**
 * 字段验证器
 * @author gemini.dev.t@gmail.com
 * @date 2024-01-14
 * 功能点:
    1、支持同时多个字段验证
    2、类型验证
    3、正则规则验证
    4、支持自定义扩展，支持接口验证
    5、错误提示的文案可外部定规则时定义
    6、每个字段有一个支持多个规则验证
 */

import type { RuleTypes, RuleType, Rules } from './types';
import defaultRegulars from './regulars';

export default class FieldsValidator {
    private rules: Rules;
    private regulars: RuleTypes;
    constructor(rules: Rules, regulars: RuleTypes = {}) {
        this.rules = rules || {};
        this.regulars = Object.assign(regulars, defaultRegulars); 
    }

    async validate(data: Record<string, any>) {
        const errors: Record<string, any> = {};
        for (const [fieldName, rules] of Object.entries(this.rules)) {
            const value = data[fieldName];
            // @ts-ignore
            for (const item of rules) {

                const regularsItem = this.regulars[item.type as string] as RuleType;

                if (item.type && !regularsItem && typeof value !== item.type) {
                    // 类型验证
                    errors[fieldName] = `Field ${fieldName} should be of type ${item.type}.`;
                    break
                }

                if (item.required && !value && !/\d/.test(value)) {
                    errors[fieldName] = item.message || `Field ${fieldName} cannot be empty.`;
                    break;
                }

                if (item.type && regularsItem) {
                    if (typeof regularsItem.value === 'function' && !regularsItem.value(value)) {
                        errors[fieldName] = item.message || regularsItem.message;
                        break
                    }
                    if (typeof regularsItem.value === 'object' && !regularsItem.value.test(value)) {
                        errors[fieldName] = item.message || regularsItem.message;
                        break
                    }
                } 

                if (item.regex && !item.regex.test(value)) {
                    // 正则规则验证
                    errors[fieldName] = item.message || `Field ${fieldName} does not match the required pattern.`;
                    break
                }

                if (item.validator && typeof item.validator === 'function') {
                    function callbackFun(tip: string) {
                        if (tip) {
                            errors[fieldName] = tip || item.message || `Field ${fieldName} failed custom validation.`;
                        }
                    }
                    await item.validator(fieldName, value, callbackFun);
                    break
                } 
                 
            }
        }
        return {
            valid: Object.keys(errors).length === 0,
            fields: errors,
        };
    }
}
