let linkedList = new LinkedList()

linkedList.append('apple')
linkedList.append('tomato')

linkedList.insert('banana', 1)
linkedList.insert('potato', 3)

console.log(linkedList.toString())
console.log(linkedList.get(-1))
console.log(linkedList.get(2))
console.log(linkedList.get(5))
console.log(linkedList.indexOf('banana'))
console.log(linkedList.indexOf('potato'))
console.log(linkedList.update('protein', 2))
console.log(linkedList.toString())
console.log(linkedList.removeAt(2))
console.log(linkedList.toString())
console.log(linkedList.remove('potato'))
console.log(linkedList.toString())

function LinkedList() {
    // 内部节点类
    function Node(data) {
        this.data = data
        this.next = null
    }

    // 内部属性
    this.head = null
    this.length = 0

    // 尾部添加元素
    LinkedList.prototype.append = (element) => {
        let node = new Node(element)

        if(this.length === 0) {
            this.head = node
        } else {
            let cur = this.head

            while(cur.next) {
                cur = cur.next
            }

            cur.next = node
        }

        this.length++
    }

    // 特定位置插入元素
    LinkedList.prototype.insert = (element, position) => {
        // 超出边界值的判断
        if(position < 0 || position > this.length) return false

        let node = new Node(element, position)

        if(position === 0) {
            node.next = this.head
            this.head = node
        } else {
            let num = 0
            let cur = this.head
            let pre = null

            while(num++ < position) {
                pre = cur
                cur = cur.next
            }
            pre.next = node
            node.next = cur
        }

        this.length++

        return true
    }

    // 获取对应位置的元素
    LinkedList.prototype.get = (position) => {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return null

        let cur = this.head
        let num = 0

        while(num++ < position) {
            cur = cur.next
        }

        return cur && cur.data
    }

    // 返回在链表中的索引值，如果没有则返回 -1
    LinkedList.prototype.indexOf = (element) => {
        let num = -1
        let cur = this.head
        
        while(cur) {
            num++
            if(cur.data == element) {
                break;
            }
            cur = cur.next
        }

        return num
    }

    // 更新对应位置的元素
    LinkedList.prototype.update = (element, position) => {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return false

        let cur = this.head
        let num = 0

        while(num++ < position) {
            cur = cur.next
        }

        cur.data = element

        return true
    }

    // 移除对应位置的元素
    LinkedList.prototype.removeAt = (position) => {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return false

        if(!this.length) return true

        let cur = this.head
        
        if(position === 0) {
            this.head = cur.next
        } else {
            let pre = null
            let num = 0

            while(num++ < position) {
                pre = cur
                cur = cur.next
            }
            pre.next = cur.next
        }

        length--
        return true

    }

    // 移除元素
    LinkedList.prototype.remove = (element) => {
        let position = this.indexOf(element)

        return this.removeAt(position)
    }

    // 是否为空
    LinkedList.prototype.isEmpty = () => {
        return this.length === 0
    }

    // 元素的个数
    LinkedList.prototype.size = () => {
        return this.length
    }

    // toString 方法
    LinkedList.prototype.toString = () => {
        if(!this.length) return ''

        let cur = this.head
        let result = ''

        while(cur) {
            result += cur.data + ' '
            cur = cur.next
        }

        return result
    }
}