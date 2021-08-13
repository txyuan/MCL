// import html2canvas from 'html2canvas'
const { html2canvas } = require("@/lib/html2canvas");

/* 根据window.devicePixelRatio获取像素比
    */
function DPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}

/**
 *  将传入值转为整数
 */
function parseValue(value) {
    return parseInt(value, 10);
};

/**
 * 图片转base64格式
 */
 function convertCanvasToImage(canvas, x, y) {
    let image = new Image();
    image.width = x;
    image.height = y;
    image.crossOrigin="anonymous"
    image.src = canvas.toDataURL("image/png");
    image.crossOrigin="anonymous"
    return image;
}

/**
 * 绘制canvas
 */
export async function drawCanvas(selector) {
    // 获取想要转换的 DOM 节点
    const dom = document.querySelector(selector);
    const box = window.getComputedStyle(dom);
    // DOM 节点计算后宽高
    const width = parseValue(box.width);
    const height = parseValue(box.height);
    // 获取像素比
    const scaleBy = DPR();
    // 创建自定义 canvas 元素
    var canvas = document.createElement('canvas');
    // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    // 设定 canvas css宽高为 DOM 节点宽高
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 获取画笔
    const context = canvas.getContext('2d');

    // 将所有绘制内容放大像素比倍
    context.scale(scaleBy, scaleBy);

    let x = width;
    let y = height;
    // return await html2canvas(dom, { canvas }).then(function () {
    //     return convertCanvasToImage(canvas, x, y)
    // })

    return await html2canvas(dom, { width: x, height: y, useCORS: true, }).then(function (canvas) {
        return convertCanvasToImage(canvas, x, y)
    })
}

