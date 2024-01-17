import { describe, expect, test, it } from 'vitest';
import JSvalidator from '../src/index'
function wait() {
    return new Promise(resolve => {
        setTimeout(resolve, 5000);
    });
}
describe('JSvalidator', () => {
    const rules = {
        // name: [{ type: 'number', required: true, message: 'Name must be a string' }],
        // age: [{ 
        //     type: 'number', 
        //     message: 'Age must be a number',
        //     async validator (fieldName, value, callback){
        //         const rs = await wait();
        //         // callback('===0=0=0=0=00=')
        //         callback()
        //     }
        // }],
        // email: [{ type: 'email' }]
        chunkIndex: [{ type: 'number', required: true }],
        totalChunks: [{ type: 'number', required: true, message: 'totalChunks is required' }],
        chunkSize: [{ 
            type: 'number', 
            required: true, 
            message: 'chunkSize is required' 
        },{
            async validator (fieldName, value, callback){
                const rs = await wait();
                if (value > 1000) {
                    callback('文件大小不能超过1000');
                    return
                }
                callback();
            }
        }],
    };
    const validator = new JSvalidator(rules);
    test('should return valid for correct data types', async () => {
        const data = {
            chunkIndex: 0,
            totalChunks: 1,
            chunkSize: 3145728,
            fileSize: 94874,
        //   name: 'John Doe',
        //   age: 30,
        //   email: '303@gmail.com'
        };
        const result = await validator.validate(data);
        expect(result.valid).toBe(true);
        expect(result.fields).toEqual({});
      });
    
    //   test('对于不正确的数据类型应该返回 invalid', async () => {
    //     const data = {
    //       name: 123, // 这应该是一个字符串
    //       age: '30', // 这应该是一个数字
    //       email: '303.com', // 这应该是一个电子邮箱号
    //     };
    //     const result = await validator.validate(data);
    //     expect(result.valid).toBe(false);
    //     expect(result.fields).toEqual({
    //       name: '名称必须是字符串',
    //       age: '年龄必须是数字',
    //       email: '必须是电子邮件',
    //     });
    //   })
});