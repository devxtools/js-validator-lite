# js-validator-lite
<!-- 字段验证器 -->
# A very lightweight field validator 
<!-- 很轻量的字段验证器 -->
# install
```
pnpm add js-validator-lite

yarn add js-validator-lite

npm i js-validator-lite
```

```js
import FieldsValidator from 'js-validator-lite'
const rules = {
    name: [
        { 
            type: 'string', 
            message: 'Name must be a string'
        },
    ],
    age: [{ 
        type: 'number', 
        message: 'Age must be a number',
        validator (fieldName, value, callback){
            if (value > 100) {
                callback('The maximum cannot exceed 100')
                return
            }
            callback() // Verification passed
        }
    }],
    email: [{ type: 'email' }]
};
const validator = new FieldsValidator(rules);
// const rs = await validator.validate(data)
validator.validate(data).then(({ valid, fields })=>{ 
    // valid=boolean false Verification failed | true Verification passed， fields=
    console.log(rs, 'rs')
}).catch((err)=>{
    console.log(err, 'errerr2')
})
```
