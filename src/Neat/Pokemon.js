import Triangle from "./TriangleClass";
//pokemon.js
class Pokemon {
    // score is what is generated,
    // fitness is normalised score i.e divided by all their sum
    constructor(
        id,
        triangles = [],
        max_polygons = 30,
        canvas_width = 100,
        canvas_height = 100,
        bgColor = "white",
        score = 0,
        fitness = 0,
        image = null
    ) {
        this.score = score;
        this.id = id;
        this.triangles = triangles;
        this.max_polygons = max_polygons;
        this.canvas_height = canvas_height;
        this.canvas_width = canvas_width;
        this.image = image;
        this.bgColor = bgColor;
        this.fitness = fitness;
    }

    // Copy constructor
    copy(pokemon) {
        const { id, triangles, max_polygons, canvas_width, canvas_height, score, bgColor, fitness, image } = pokemon;
        return new Pokemon(id, [...triangles], max_polygons, canvas_width, canvas_height, bgColor, score, fitness, image);
    }

    copy2(){
        return new Pokemon(
            this.id,
            [...this.triangles],
            this.max_polygons,
            this.canvas_width,
            this.canvas_height,
            this.bgColor,
            this.score,
            this.fitness,
            this.image
        );
    }

    random_generate() {
        for (let i = 0; i < this.max_polygons; i++) {
            const x1 = (Math.random() * this.canvas_width).toFixed(2);
            const y1 = (Math.random() * this.canvas_height).toFixed(2);

            const x2 = (Math.random() * this.canvas_width).toFixed(2);
            const y2 = (Math.random() * this.canvas_height).toFixed(2);

            const x3 = (Math.random() * this.canvas_width).toFixed(2);
            const y3 = (Math.random() * this.canvas_height).toFixed(2);

            const rgba_color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
                Math.random() * 256
            )},${Math.min(1, (Math.random() + 0.5).toFixed(2))})`;

            this.triangles.push(new Triangle(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2), parseInt(x3), parseInt(y3), rgba_color));
        }
    }

    mutate(epsilon, extend) {
        for (let i = 0; i < this.triangles.length; i++) {
            let r = Math.random();
            if (r <= epsilon)
            {
                console.log("calling mutate on pokemon", this.id,  " on triangle", i);
                this.triangles[i].mutate(extend);

            }
        }
    }

    reproduce(pokemon_wife, uid) {
        const childTriangles = [];

        for (let i = 0; i < this.triangles.length; i++) {
            if (Math.random() < 0.5) {
                // Take a triangle from the father
                childTriangles.push(this.triangles[i]);
            } else {
                // Take a triangle from the mother
                childTriangles.push(pokemon_wife.triangles[i]);
            }
        }

        // Create a new child Pokemon with the combined DNA
        const child = new Pokemon(
            uid, // You can implement a function to generate a unique ID
            childTriangles,
            this.max_polygons,
            this.canvas_width,
            this.canvas_height,
            this.bgColor
        );

        return child;
    }
}

// module.exports = Pokemon;
export default Pokemon;
