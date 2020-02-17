// 测试 Set 类方法
let set = new Set()
set.add('apple')
set.add('apple')
set.add('orange')
console.log(set.values())
console.log(set.has('apple'))
console.log(set.size())
set.remove('apple')
console.log(set.values())
set.clear()
console.log(set.values())

// 测试两个集合数学方法
let setA = new Set()
setA.add('apple')
setA.add('banana')
setA.add('orange')
setA.add('potato')
setA.add('protein')
let setB = new Set()
setB.add('tomato')
setB.add('banana')
setB.add('pair')
setB.add('potato')
console.log(setA.values())
console.log(setB.values())

// 并集
console.log(setA.union(setB).values())

// 交集
console.log(setA.intersection(setB).values())

// 差集
console.log(setA.diffrence(setB).values())

// 子集
let setC = new Set()
setC.add('tomato')
setC.add('potato')
console.log(setA.subset(setB))
console.log(setC.subset(setB))

function Set() {
    // 定义属性
    this.items = {}

    // 添加元素
    Set.prototype.add = function(value) {
        if(this.has(value)) return false

        this.items[value] = value
        return true
    }

    // 移除元素
    Set.prototype.remove = function(value) {
        if(!this.has(value)) return false

        delete this.items[value]
        return true
    }

    // 判断元素是否在集合中
    Set.prototype.has = function(value) {
        return value in this.items
        // return this.items.hasOwnProperty(value)
    }

    // 清除集合所有元素
    Set.prototype.clear = function() {
        this.items = {}
    }

    // 返回集合中元素的数量
    Set.prototype.size = function() {
        return Object.keys(this.items).length
    }

    // 返回一个包含集合中所有元素的数组
    Set.prototype.values = function() {
        return Object.keys(this.items)
    }

    // 并集 包含 A 和 B 中所有非重复的元素
    Set.prototype.union = function(otherSet) {
        // this - A   otherSet - B
        let newSet = new Set()

        this.values().map(o => {
            newSet.add(o)
        })

        otherSet.values().map(o => {
            newSet.add(o)
        })

        return newSet
    }

    // 交集 表示 A 和 B 集合中都包含的元素 
    Set.prototype.intersection = function(otherSet) {
        let newSet = new Set()

        this.values().map(o => {
            if(otherSet.has(o)) {
                newSet.add(o)
            }
        })

        return newSet
    }

    // 差集 表示元素存在于 A 中但是不存在于 B 中
    Set.prototype.diffrence = function(otherSet) {
        let newSet = new Set()

        this.values().map(o => {
            if(!otherSet.has(o)) {
                newSet.add(o)
            }
        })

        return newSet
    }

    // 子集 表示 A 中所有的元素都存在与 B 中
    Set.prototype.subset = function(otherSet) {
        if(this.size > otherSet.size) return false

        return this.values().every(o => otherSet.has(o))
    }

}