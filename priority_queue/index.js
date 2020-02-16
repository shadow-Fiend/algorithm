
let priorityQueue = new PriorityQueue() 

priorityQueue.enqueue('apple', 100)
priorityQueue.enqueue('banana', 50)
priorityQueue.enqueue('egg', 300)
priorityQueue.enqueue('potato', 20)

console.log(priorityQueue.toString())

// 基于数组的实现
function PriorityQueue() {
    this.list = []

    // 内部节点类
    function Queue(element, priority) {
        this.element = element
        this.priority = priority
    }

    // 插入元素
    PriorityQueue.prototype.enqueue = (element, priority) => {
        let queue = new Queue(element, priority)

        if(this.list.length === 0) {
            this.list.push(queue)
        } else {
            if(queue.priority >= this.list[this.list.length - 1]['priority']) {
                this.list.push(queue)
            } else {
                for(let i = 0; i < this.list.length; i++) {
                    if(queue.priority < this.list[i]['priority']) {
                        this.list.splice(i, 0, queue)
                        break;
                    }
                }
            }
        }
    }

    // 取出元素
    PriorityQueue.prototype.dequeue = () => {
        return this.list.shift()
    }

    // 查看队列前端元素
    PriorityQueue.prototype.front = () => {
        return this.list[0]
    }

    // 判断队列是否为空
    PriorityQueue.prototype.isEmpty = () => {
        return this.list.length === 0
    }

    // 获取队列中元素的个数
    PriorityQueue.prototype.size = () => {
        return this.list.length
    }

    // toString 方法
    PriorityQueue.prototype.toString = () => {
        let str = ''

        this.list.map(o => {
            str += o.element + '-' + o.priority + ' '
        })

        return str
    }
}
