import Result from './base/result'
import Mock from 'mockjs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(axios)

let data = Mock.mock(Result.success({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }],
    'aa|1-100': 1,
    'img|1-5': [Mock.Random.dataImage('200x100', 'Hello Mock.js!')],
    'ctitle': Mock.Random.ctitle(3, 9)
}))
let data1 = Mock.mock(Result.success({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+2': 1
    }]
}))
mock.onGet('/users').reply(200, data)
mock.onPost('/login').reply(200, data1)

// 输出结果
