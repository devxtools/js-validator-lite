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
import type { RuleTypes, Rules } from './types';
export default class FieldsValidator {
    private rules;
    private regulars;
    constructor(rules: Rules, regulars?: RuleTypes);
    validate(data: Record<string, any>): Promise<{
        valid: boolean;
        fields: Record<string, any>;
    }>;
}
