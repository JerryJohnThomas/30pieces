import Pokemon from "./Pokemon"
class Generation {
    constructor(max_population = 4, id = 1, canvas_height, canvas_width, max_polygons_per_pokemon=10) {
        this.max_population = max_population;
        this.id = id;
        this.members = [];
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.max_polygons_per_pokemon = max_polygons_per_pokemon;
    }

    random_populate() {
        this.members = [];
        for (let i = 0; i < this.max_population; i++) {
            const pokemon = new Pokemon(i, [], this.max_polygons_per_pokemon, this.canvas_height, this.canvas_width);
            pokemon.random_generate(); // Call the random_generate method to generate triangles
            this.members.push(pokemon);
        }
    }
}
// module.exports = Generation;
export default Generation;