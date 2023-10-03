//triangle.js
export default class Triangle {
    constructor(x1, y1, x2, y2, x3, y3, rgba_color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.rgba = rgba_color;
    }

    mutate(extend = 100){
        // Mutate the triangle's properties
        this.x1 += parseInt(Math.random() * extend - (extend / 2));
        this.y1 += parseInt(Math.random() * extend - (extend / 2));
        this.x2 += parseInt(Math.random() * extend - (extend / 2));
        this.y2 += parseInt(Math.random() * extend - (extend / 2));
        this.x3 += parseInt(Math.random() * extend - (extend / 2));
        this.y3 += parseInt(Math.random() * extend - (extend / 2));

        // Mutate the triangle's color
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const alpha = Math.min(1, Math.random() + 0.5);
        this.rgba = `rgba(${red},${green},${blue},${alpha})`;
    }
}

// module.exports = Triangle;