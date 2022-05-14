export enum Toolbar {
    pen = 1, // 画笔
    line, // 线段
    text, // 文字
    eraser, // 橡皮擦
    back, // 撤回
    delete, // 清除
    hand, // 拖动
  }
  
  export enum Event {
    start = 1,
    move = 2,
    end = 3,
    textDraw = 4,
    textEnd = 5
  }
  
  export enum SocketType {
    event = 1,
    path = 2,
    back = 3,
    delete = 4,
    text = 5
  }