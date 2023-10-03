import CompareImages from "./CompareImages";
import Pokemon from "./Pokemon";
class Generation {
    constructor(
        id = 1,
        max_population = 4,
        canvas_height,
        canvas_width,
        max_polygons_per_pokemon = 10,
        target_path,
        bgColor = "white",
        fitness_sorted_indices = [],
        generation_count = 1,
        epsilon = 0.2,
        mutate_extend = 100
    ) {
        this.max_population = max_population;
        this.id = id;
        this.members = [];
        this.fitness_sorted_indices = fitness_sorted_indices;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.max_polygons_per_pokemon = max_polygons_per_pokemon;
        this.bgColor = bgColor;
        this.generation_count = generation_count;
        this.epsilon = epsilon;
        this.mutate_extend = mutate_extend;

        // target image
        this.target_path = target_path;
        const targetImg = new Image();
        targetImg.src = target_path;
        this.target_image = targetImg;
    }

    random_populate() {
        this.members = [];
        for (let i = 0; i < this.max_population; i++) {
            const pokemon = new Pokemon(i, [], this.max_polygons_per_pokemon, this.canvas_height, this.canvas_width, this.bgColor);
            pokemon.random_generate(); // Call the random_generate method to generate triangles
            this.members.push(pokemon);
        }
    }

    random_populate_withWhite() {
        this.members = [];
        for (let i = 0; i < this.max_population - 1; i++) {
            const pokemon = new Pokemon(i, [], this.max_polygons_per_pokemon, this.canvas_height, this.canvas_width, this.bgColor);
            pokemon.random_generate(); // Call the random_generate method to generate triangles
            this.members.push(pokemon);
        }
        const pokemon = new Pokemon(this.max_population - 1, [], this.max_polygons_per_pokemon, this.canvas_height, this.canvas_width, this.bgColor);
        this.members.push(pokemon);
    }

    async score_generation() {
        let scores_generation = [];
        let comparer = new CompareImages(this.target_image, this.canvas_width, this.canvas_height);
        for (let i = 0; i < this.max_population; i++) {
            // console.log(this.members[i].image);
            if (this.members[i].image == null) alert("Image not found (synthesized) yet, click on syntesize and then on score");
            let inverted_mse_val = await comparer.calculateMSE(this.members[i].image);
            this.members[i].score = inverted_mse_val;

            scores_generation.push({ score: inverted_mse_val });
            // console.log("trace:member ", i, " score: ", inverted_mse_val);
        }
        console.log(scores_generation);
    }

    next_generation() {
        this.calculate_fitness();
        console.log(this.members);
        this.repopulate();
        // reproduce them
        console.log("trace: next generation completed");
        console.log(this.members);
    }

    calculate_fitness() {
        // calculates fitness and sorts it
        let sum = 0;
        for (let i = 0; i < this.max_population; i++) {
            let pokemon = this.members[i];
            sum += pokemon.score;
        }

        for (let i = 0; i < this.max_population; i++) {
            this.members[i].fitness = parseFloat((this.members[i].score / sum).toFixed(4));
        }

        this.fitness_sorted_indices = this.members.map((_, index) => index);
        this.fitness_sorted_indices.sort((a, b) => this.members[b].fitness - this.members[a].fitness);
    }

    pickOne_Mutate() {
        var index = 0;
        var r = Math.random();
        while (r > 0) {
            let target_index = this.fitness_sorted_indices[index];
            r = r - this.members[target_index].fitness;
            index++;
        }
        index--;

        let target_index = this.fitness_sorted_indices[index];

        let pokemon = this.members[target_index];
        let copy_pokemon = pokemon.copy2();
        copy_pokemon.mutate(this.epsilon, this.mutate_extend);
        return copy_pokemon;
    }

    repopulate() {
        let children = [];
        for (let i = 0; i < this.max_population; i++) {
            let parent1 = this.pickOne_Mutate();
            let parent2 = this.pickOne_Mutate();
            let child = parent1.reproduce(parent2, i);
            children.push(child);
        }
        this.members = children;
    }
}
// module.exports = Generation;
export default Generation;
