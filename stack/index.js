// example 十进制转二进制 ( 正数 )
function decToBin(num) {
    if(typeof num !== 'number') return

    // 定义栈对象
    let stack = new Stack()

    // 循环操作
    while(num > 0) {
        stack.push(num % 2)

        num = Math.floor(num / 2)
    }

    // 从栈中取出元素
    let result = ''
    while(!stack.isEmpty()) {
        result += stack.pop()
    }
    return result
}

console.log(decToBin(100)) // 1100100


// 基于数组实现
function Stack() {
    this.list = []

    // 插入元素
    Stack.prototype.push = function(item) {
        this.list.push(item)
    }

    // 取出元素
    Stack.prototype.pop = function() {
        return this.list.pop()
    }

    // 查看栈顶元素
    Stack.prototype.peek = function() {
        return this.list[this.list.length - 1]
    }

    // 判断栈是否为空
    Stack.prototype.isEmpty = function() {
        return this.list.length === 0
    }

    // 获取栈中元素的个数
    Stack.prototype.size = function() {
        return this.list.length
    }

    // toString 方法
    Stack.prototype.toString = function() {
        let str = ''

        this.list.map(o => {
            str += o + ' '
        })

        return str
	}
}
