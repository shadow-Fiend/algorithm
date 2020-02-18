let hashTable = new HashTable()
hashTable.put('apple', 'red')
hashTable.put('banana', 'yellow')
hashTable.put('protein', 'white')
console.log(hashTable.get('apple'))
console.log(hashTable.remove('banana'))
console.log(hashTable.get('banana'))
console.log(hashTable.get('protein'))
hashTable.put('protein', 'black')
console.log(hashTable.get('protein'))


// 测试 hashFunc
console.log('abc: ', hashFunc('abc', 7))
console.log('cba: ', hashFunc('cba', 7))
console.log('nba: ', hashFunc('nba', 7))
console.log('mba: ', hashFunc('mba', 7))

// 哈希类 HashTable 
function HashTable() {
    this.storage = []
    this.count = 0 // 当前哈希表中存放的元素个数 当 count / limit > 0.75 的时候需要扩容 < 0.25 的时候需要压缩
    this.limit = 7 // 当前的总长度

    // 插入修改操作
    HashTable.prototype.put = function(key, value) {
        // 根据 key 获取对应的 index
        let index = hashFunc(key, this.limit)

        // 根据 index 获取 bucket
        let bucket = this.storage[index]

        // 判断 bucket 是否为空
        if(!bucket) {
            bucket = []
            this.storage[index] = bucket
        }

        // 判断是否为修改数据
        for(let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if(tuple[0] === key) {
                tuple[1] = value
                return
            }
        }

        // 进行新增操作
        bucket.push([key, value])
        this.count++

        // 判断是否需要扩容
        if(this.count / this.limit > 0.75) {
            this.resize(this.limit * 2)
        }
    }

    // 获取操作
    HashTable.prototype.get = function(key) {
        let index = hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if(!bucket) return null

        return bucket.filter(o => o[0] === key)[0] && bucket.filter(o => o[0] === key)[0][1] 
    }

    // 删除操作
    HashTable.prototype.remove = function(key) {
        let index = hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if(!bucket) return null

        for(let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if(tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--

                // 判断是否需要压缩 limit
                if(this.limit > 7 && this.count / this.limit < 0.25) {
                    this.resize(Math.floor(this.limit / 2))
                }

                return tuple[1]
            }
        }

        return null
    }

    // 是否为空
    HashTable.prototype.isEmpty = function() {
        return this.count === 0
    }

    // 长度个数
    HashTable.prototype.size = function() {
        return this.count
    }

    // 扩容实现
    HashTable.prototype.resize = function(newLimit) {
        // 备份旧数据
        let oldStorage = this.storage

        // 保证 newLimit 为质数
        newLimit = getPrime(newLimit)

        // 重置属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 遍历并判断后进行重置
        oldStorage.map(o => {
            if(o && o.length) {
                this.put(o[0], o[1])
            }
        })
    }
}


/** 哈希函数 hashFunc
* 1. hashCode 将字符串转化成较大的数字
* 2. 哈希化：将 hashCode 压缩到数组范围之内
*/
function hashFunc(str, size) {
    // 定义hashCode
    let hashCode = 0

    // 霍纳法则计算 hashCode 的值 - - - Unicode 编码
    for(let i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    // 取余操作
    let num = hashCode % size

    return num
}

/** 判断质数
 * 只能被 1 和自身整除
 */
function isPrime(num) {
    // 效率低
    /* for(let i = 2; i < num; i++) {
        if(num % i === 0) return fales
    } */

    // 一个数如果可以进行因数分解，那么这两个数一个小于 sqrt(num) 一个大于 sqrt(num)
    let temp = parseInt(Math.sqrt(num))
    for(let i = 2; i <= temp; i++) {
        if(num % i === 0) return fales
    }
    return true
}

// 获取质数
function getPrime(num) {
    while(!isPrime(num)) {
        num++
    }
    return num
}