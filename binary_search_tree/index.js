let binarySearchTree = new BinaruSearchTree()

binarySearchTree.insert(11)
binarySearchTree.insert(7)
binarySearchTree.insert(15)
binarySearchTree.insert(5)
binarySearchTree.insert(3)
binarySearchTree.insert(9)
binarySearchTree.insert(8)
binarySearchTree.insert(10)
binarySearchTree.insert(13)
binarySearchTree.insert(12)
binarySearchTree.insert(14)
binarySearchTree.insert(20)
binarySearchTree.insert(18)
binarySearchTree.insert(25)

console.log(binarySearchTree)

// 先序遍历
let resultStr1 = ''
binarySearchTree.preOrderTraversal(function(key) {
    resultStr1 += key + ' '
})
console.log(resultStr1)
// 中序遍历
let resultStr2 = ''
binarySearchTree.midOrderTraversal(function(key) {
    resultStr2 += key + ' '
})
console.log(resultStr2)
// 后序遍历
let resultStr3 = ''
binarySearchTree.postOrderTraversal(function(key) {
    resultStr3 += key + ' '
})
console.log(resultStr3)

//最大最小值
console.log(binarySearchTree.min())
console.log(binarySearchTree.max())

// 搜索
console.log(binarySearchTree.search(10))
console.log(binarySearchTree.search(6))

// 删除
// console.log(binarySearchTree.remove(11))
console.log(binarySearchTree.remove(15))
// console.log(binarySearchTree.remove(9))
console.log(binarySearchTree)

function BinaruSearchTree() {
    // 内部节点类
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    // 内部属性
    this.root = null

    // 插入操作
    BinaruSearchTree.prototype.insert = function(key) {
        // 创建节点 
        let node = new Node(key)

        if(!this.root) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }

    // 查找操作
    BinaruSearchTree.prototype.search = function(key) {
        let node = this.root
        
        while(node) {
            if(key === node.key) return true

            if(node.key > key) {
                node = node.left
            } else {
                node = node.right
            }
        }

        return false
    }

    // 通过中序遍历方式 遍历所有节点
    BinaruSearchTree.prototype.midOrderTraversal = function(handler) {
        this.midOrderTraversalNode(this.root, handler)
    }

    // 通过先序遍历方式 遍历所有节点
    BinaruSearchTree.prototype.preOrderTraversal = function(handler) {
        this.preOrderTraversalNode(this.root, handler)
    }

    // 通过后序遍历方式 遍历所有节点
    BinaruSearchTree.prototype.postOrderTraversal = function(handler) {
        this.postOrderTraversalNode(this.root, handler)
    }

    // 最小值
    BinaruSearchTree.prototype.min = function(node) {
        node = node || this.root
        let min = null

        while(node) {
            min = node
            node = node.left
        }

        return min
    }

    // 最大值
    BinaruSearchTree.prototype.max = function(node) {
        node = node || this.root
        let max = null

        while(node) {
            max = node
            node = node.right
        }

        return max
    }

    // 移除操作
    BinaruSearchTree.prototype.remove = function(key) {
        this.root = this.removeNode(this.root, key)

        /* // 定义变量保存信息
        let current = this.root
        let parent = null
        let isLeftChild = null

        if(!current) return false
        // 查找对应的节点
        while(current.key != key) {
            parent = current
            if(key < current.key) {
                current = current.left
                isLeftChild = true
            } else {
                current = current.right
                isLeftChild = false
            }

            if(!current) return false
        }

        // 叶子节点
        if(!current.left && !current.right) {
            if(current == this.root) {
                this.root = null
            } else if(isLeftChild) {
                parent.left = null
            } else {
                parent.right = null
            }
            return true
        } */
    }

    BinaruSearchTree.prototype.insertNode = function(parentNode, node) {
        if(parentNode.key > node.key) { // 判断左右
            if(!parentNode.left) {
                parentNode.left = node
            } else {
                this.insertNode(parentNode.left, node)
            }
        } else {
            if(!parentNode.right) {
                parentNode.right = node
            } else {
                this.insertNode(parentNode.right, node)
            }
        }
    }

    BinaruSearchTree.prototype.preOrderTraversalNode = function(node, handler) {
        if(node) {
            handler(node.key)
            this.preOrderTraversalNode(node.left, handler)
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    BinaruSearchTree.prototype.midOrderTraversalNode = function(node, handler) {
        if(node) {
            this.midOrderTraversalNode(node.left, handler)
            handler(node.key)
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    BinaruSearchTree.prototype.postOrderTraversalNode = function(node, handler) {
        if(node) {
            this.postOrderTraversalNode(node.left, handler)
            this.postOrderTraversalNode(node.right, handler)
            handler(node.key)
        }
    }

    BinaruSearchTree.prototype.removeNode = function(node, key) {
        if(!node) return null // 空树

        if(node.key === key) { // 要删除的为传入节点
            if(!node.left && !node.right) { // 当前节点为叶子节点
                return null
            } else if(!node.left) { // 左子树为空
                return node.right
            } else if(!node.right) { // 右子树为空 
                return node.left
            } else { // 左右均有节点
                let tempNode = this.min(node.right) // 取出右侧最小值
                node.key = tempNode.key // 赋值传入节点 key 为右侧最小值的 key
                node.right = this.removeNode(node.right, tempNode.key) // 移除右侧最小值并重新赋值传入节点的 right
                return node
            }
        } else if(key < node.key) { // 要删除的节点在传入节点的左侧
            node.left = this.removeNode(node.left, key)
            return node
        } else { // 要删除的节点在传入节点的右侧
            node.right = this.removeNode(node.right, key)
            return node
        }
    }
}