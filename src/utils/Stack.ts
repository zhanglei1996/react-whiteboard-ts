export default class Stack<T> {
    items: T[]

    constructor() {
        this.items = []
    }

    /**
     * 入栈
     * @param element 
     */
    push(element: T) {
        this.items.push(element);
    }

    /**
     * 出栈
     * @returns 
     */
    pop() {
       return this.items.pop()
    }

    /**
     * 返回栈顶元素
     * @returns 
     */
    peek() {
        return this.items[this.items.length-1];
    }

    /**
     * 在栈的index位置插入元素 
     * @param index 插入位置
     * @param element 插入内容
     */
    add(index: number, element: T) {
       this.items.splice(index,0,element) 
    }

    /**
     * 是否为空栈
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * 获取栈的长度
     * @returns 
     */
    size() {
        return this.items.length
    }

    /**
     * 清空栈
     */
    clear() {
        this.items = []
    }

    /**
     * 打印栈内容
     */
    print() {
        console.log(this.items.toString());
    }
}

