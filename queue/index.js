// 击鼓传花实例 - 有一组人围成圈然后规定一个数字，喊道数字的人出列，直到剩最后一人
let arr = ["apple", "orange", "tomato", "potato", "banana", 'protein']
function winner(list, num) {
    let queue = new Queue()
    let index = 0

    // 加入队列
    list.map(o => {
        queue.enqueue(o)
    })

    /* // 计数实现
    while(queue.size() > 1) {
        index += 1

        if(index === num) {
            queue.dequeue()
            index = 0
        } else {
            queue.enqueue(queue.dequeue()) 
        }
    } */

    // 循环实现
    while(queue.size() > 1) {
        for(let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue()) 
        }
        queue.dequeue()
    }

    return queue.front()
}

console.log(winner(arr, 5))

// 基于数组实现
function Queue() {
    this.list = []

    // 插入元素
    Queue.prototype.enqueue = (item) => {
        this.list.push(item)
    }

    // 取出元素
    Queue.prototype.dequeue = () => {
        return this.list.shift()
    }

    // 查看队列前端元素
    Queue.prototype.front = () => {
        return this.list[0]
    }

    // 判断队列是否为空
    Queue.prototype.isEmpty = () => {
        return this.list.length === 0
    }

    // 获取队列中元素的个数
    Queue.prototype.size = () => {
        return this.list.length
    }

    // toString 方法
    Queue.prototype.toString = () => {
        let str = ''

        this.list.map(o => {
            str += o + ' '
        })

        return str
    }
}

