# algorithm
algorithm - js

# Stack 栈 以十进制转二进制为例 ( 正数 )
- 先进后出 只有一端可以添加移除元素
stack/index.js

# Queue 队列 以击鼓传花为例
- 先进先出 后端添加元素前端移除元素
queue/index.js

# PriorityQueue 优先级队列
- 先进先出 根据优先级添加元素 前端移除元素 
priority_queue/index.js

# LinkedList 单向链表
- 因为没有下标且不是连续的内存空间 所以查找效率比数组低 但是增删效率高 回到上一个元素消耗大
linked_list/index.js

# DoublyLinkedList 双向链表
- 不是连续的内存空间 对比单向链表保存前后两个元素的指针 所以可以很快访问上一个元素
doubly_linked_list/index.js

# Set 集合类 并集 交集 差集 子集
- 对比数组 无序 不可重复
set/index.js

# hash 哈希表 哈希函数 质数
- 对比数组 插入删除和查找都很快 但是数据是没有顺序的 key 不允许重复
hash/index.js

# BinarySearchTree 二叉搜索树 删除为难点
- 第 i 层最多有 2 的 (i- 1) 次方个子节点

- 深度为 k 的二叉树最多有 2 的 (i) 次方 - 1 个子节点

- 叶节点如果为 n0 那么 度为 2 的节点 n2 + 1 = n0

- 非空左子树的键值小于根节点的键值

- 非空右子树的键值大于根节点的键值

- 左右子树本身也是二叉搜索树