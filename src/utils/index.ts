import { useEffect, useRef } from "react"

/**
 * 返回组件的挂载状态，如果还未挂载或者已经卸载，返回false，反之，返回true
 */
 export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])
    return mountedRef
}

// 根据帧率节流
export function rafThrottle(fn: FrameRequestCallback) {
    let locked = false;
    return function (...args: any) {
      if (locked) return;
      locked = true;
      window.requestAnimationFrame(() => {
        fn.apply(window,args);
        locked = false;
      });
    };
  }
  
  // 是否是火狐浏览器
  export const isFirefox = function () {
    return window.navigator.userAgent.match(/firefox/i);
  };
  
  /* 绑定事件 */
  export const on = (function () {
      return function (element: HTMLElement | null, event: any, handler: (this: HTMLElement, ev: any) => any) {
        if (element && event) {
          element.addEventListener(event, handler, false);
        }
      };
  })();
  
  /* 解绑事件 */
  export const off = (function () {
      return function (element: HTMLElement | null, event: any, handler: (this: HTMLElement, ev: any) => any) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
  })();

  /**获取一个随机id */
  export const getRandomId = (len = 8) => {
    const str = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let id = ''
    for(let i = 0; i < len ; i ++) {
      const randomIndex = Math.floor(Math.random()*36)
      id += str[randomIndex]
    }
    return id
  }
  