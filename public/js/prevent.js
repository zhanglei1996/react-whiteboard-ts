(function () {
  window.addEventListener(
    "wheel",
    function (e) {
      // 禁止浏览器缩放
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
  var preventDefaultFn = function (e) {
    e.preventDefault();
  };
  // 禁止safari笔记本触屏双指缩放
  window.addEventListener("gesturestart", preventDefaultFn, { passive: false });
  window.addEventListener("gesturechange", preventDefaultFn, {
    passive: false,
  });
  window.addEventListener("gestureend", preventDefaultFn, { passive: false });
  document.addEventListener(
    "touchstart",
    function (e) {
      // 禁止ios 双指缩放浏览器缩放
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
  var lastTouchTime = 0;
  document.addEventListener("touchend", function (e) {
    const now = new Date().getTime();
    if (now - lastTouchTime <= 300 || e.touches.length > 1) {
      e.preventDefault();
    }
    lastTouchTime = now;
  });
})();
