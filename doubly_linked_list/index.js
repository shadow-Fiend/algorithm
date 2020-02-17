let doublyLinkedList = new DoublyLinkedList()

doublyLinkedList.append('apple')
doublyLinkedList.append('banana')

doublyLinkedList.insert('tomato', 0)
doublyLinkedList.insert('protein', 2)
doublyLinkedList.insert('orange', 2)

console.log(doublyLinkedList.forwardString())
console.log(doublyLinkedList.backwardString())
console.log(doublyLinkedList.toString())
console.log(doublyLinkedList)
console.log(doublyLinkedList.get(2))
console.log(doublyLinkedList.get(3))
console.log(doublyLinkedList.indexOf('orange'))
console.log(doublyLinkedList.update('potato', 2))
console.log(doublyLinkedList.removeAt(1))
console.log(doublyLinkedList.backwardString())
doublyLinkedList.insert('apple', 1)
console.log(doublyLinkedList.backwardString())
console.log(doublyLinkedList.removeAt(3))
console.log(doublyLinkedList.backwardString())

function DoublyLinkedList() {
    // 内部节点类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    // 内部属性
    this.head = null
    this.tail = null
    this.length = 0

    // 尾部添加元素
    DoublyLinkedList.prototype.append = function(element) {
        let node = new Node(element)

        if(this.length === 0) {
            this.head = node
            this.tail = node
        } else {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }

        this.length++
    }

    // 特定位置插入元素
    DoublyLinkedList.prototype.insert = function(element, position) {
        // 超出边界值的判断
        if(position < 0 || position > this.length) return false

        let node = new Node(element, position)

        if(position === 0) {
            if(this.length === 0) {
                this.head = node
                this.tail = node
            } else {
                node.next = this.head
                this.head.prev = node
                this.head = node
            }
        } else {
            let num = 0
            let cur = this.head
            let pre = null

            while(num++ < position) {
                pre = cur
                cur = cur.next
            }
            pre.next = node
            cur.prev = node
            node.next = cur
            node.prev = pre

            if(position === this.length) {
                this.tail = node
            }
        }

        this.length++

        return true
    }

    // 获取对应位置的元素
    DoublyLinkedList.prototype.get = function(position) {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return null

        let cur
        let num 

        if(position < this.length / 2) {
            cur = this.head
            num = 0

            while(num++ < position) {
                cur = cur.next
            }
        } else {
            cur = this.tail
            num = this.length - 1

            while(num-- > position) {
                cur = cur.prev
            }
        }

        return cur && cur.data
    }

    // 返回在链表中的索引值，如果没有则返回 -1
    DoublyLinkedList.prototype.indexOf = function(element) {
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
    DoublyLinkedList.prototype.update = function(element, position) {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return false

        let cur
        let num 

        if(position < this.length / 2) {
            cur = this.head
            num = 0

            while(num++ < position) {
                cur = cur.next
            }
        } else {
            cur = this.tail
            num = this.length - 1

            while(num-- > position) {
                cur = cur.prev
            }
        }

        cur.data = element

        return true
    }

    // 移除对应位置的元素
    DoublyLinkedList.prototype.removeAt = function(position) {
        // 超出边界值的判断
        if(position < 0 || position >= this.length) return false

        // 只有一个元素的情况
        if(this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            if(position === 0) { // 移除第一个元素
                this.head = this.head.next
                this.head.prev = null
            } else if(position === this.length - 1) { // 移除最后一个元素
                this.tail = this.tail.prev
                this.tail.next = null
            } else {
                let pre = null
                let tail = null
                let num

                if(position < this.length / 2) {
                    num = 0
                    cur = this.head

                    while(num++ < position) {
                        pre = cur
                        cur = cur.next
                    }
                    pre.next = cur.next
                    cur.next.prev = pre
                } else {
                    num = this.length - 1
                    cur = this.tail

                    while(num-- > position) {
                        pre = cur
                        cur = cur.prev
                    }

                    pre.prev = cur.prev
                    cur.prev.next = pre
                }
            }
        }

        this.length--
        return true

    }

    // 移除元素
    DoublyLinkedList.prototype.remove = function(element) {
        let position = this.indexOf(element)

        return this.removeAt(position)
    }

    // 是否为空
    DoublyLinkedList.prototype.isEmpty = function() {
        return this.length === 0
    }

    // 元素的个数
    DoublyLinkedList.prototype.size = function() {
        return this.length
    }

    // toString 方法
    DoublyLinkedList.prototype.toString = function() {
        return this.backwardString()
    }

    // backwardString 方法 - 向前遍历的字符串形式
    DoublyLinkedList.prototype.forwardString = function() {
        if(!this.length) return ''

        let cur = this.tail
        let result = ''

        while(cur) {
            result += cur.data + ' '
            cur = cur.prev
        }

        return result
    }

    // forwardString 方法 - 向后遍历的字符串形式
    DoublyLinkedList.prototype.backwardString = function() {
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