import Triangle from "./Triangle";
//pokemon.js
class Pokemon {
    constructor(id, triangles = [], max_polygons = 30, canvas_width = 100, canvas_height = 100) {
        this.score = 0;
        this.id = id;
        this.triangles = triangles;
        this.max_polygons = max_polygons;
        this.canvas_height = canvas_height;
        this.canvas_width = canvas_width;
        this.image = null;
    }

    random_generate() {
        for (let i = 0; i< this.max_polygons; i++) {
            const x1 = (Math.random() * this.canvas_width).toFixed(2);
            const y1 = (Math.random() * this.canvas_height).toFixed(2);
            
            const x2 = (Math.random() * this.canvas_width).toFixed(2);
            const y2 = (Math.random() * this.canvas_height).toFixed(2);
            
            const x3 = (Math.random() * this.canvas_width).toFixed(2);
            const y3 = (Math.random() * this.canvas_height).toFixed(2);

            const rgba_color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.min(1, (Math.random() + 0.5).toFixed(2))})`;

            this.triangles.push(
                new Triangle(
                    parseInt(x1),
                    parseInt(y1),
                    parseInt(x2),
                    parseInt(y2),
                    parseInt(x3),
                    parseInt(y3),
                    rgba_color
                )
            );
        }
    }
}

// module.exports = Pokemon;
export default Pokemon;