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

    mutate(extend = 100) {
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

    random(canvas_height, canvas_width ){
        const x1 = (Math.random() * canvas_width).toFixed(2);
        const y1 = (Math.random() * canvas_height).toFixed(2);

        const x2 = (Math.random() * canvas_width).toFixed(2);
        const y2 = (Math.random() * canvas_height).toFixed(2);

        const x3 = (Math.random() * canvas_width).toFixed(2);
        const y3 = (Math.random() * canvas_height).toFixed(2);

        const rgba_color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256
        )},${Math.min(1, (Math.random() + 0.5).toFixed(2))})`;

        return new Triangle(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2), parseInt(x3), parseInt(y3), rgba_color);
    }
}

// module.exports = Triangle;