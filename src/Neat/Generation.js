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
        epsilon = 0.5,
        mutate_extend = 100, 
        members = []
    ) {
        this.max_population = max_population;
        this.id = id;
        this.members = members;
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


    deepCopy() {
        return new Generation(
            this.id,
            this.max_population,
            this.canvas_height,
            this.canvas_width,
            this.max_polygons_per_pokemon,
            this.target_path,
            this.bgColor,
            this.fitness_sorted_indices, // Create a shallow copy of the indices array
            this.generation_count,
            this.epsilon,
            this.mutate_extend,
            this.members
        );
    }


    copyAnother(existingGeneration) {
        const {
            id,
            max_population,
            canvas_height,
            canvas_width,
            max_polygons_per_pokemon,
            target_path,
            bgColor,
            fitness_sorted_indices,
            generation_count,
            epsilon,
            mutate_extend,
            members
        } = existingGeneration;

        return new Generation(
            id,
            max_population,
            canvas_height,
            canvas_width,
            max_polygons_per_pokemon,
            target_path,
            bgColor,
            fitness_sorted_indices,    // Create a shallow copy of the indices array
            generation_count,
            epsilon,
            mutate_extend,
            members
        );
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
        pokemon.random_generate_bgcolor();
        this.members.push(pokemon);
    }

    async score_generation() {
        let scores_generation = [];
        let comparer = new CompareImages(this.target_image, this.canvas_width, this.canvas_height);
        for (let i = 0; i < this.max_population; i++) {
            // console.log(this.members[i].image);
            if (this.members[i].image == null) {
                alert("Image not found (synthesized) yet, click on syntesize and then on score");
                return;
            }
            let inverted_mse_val = await comparer.calculateMSE(this.members[i].image);
            this.members[i].score = inverted_mse_val;
            scores_generation.push({ score: inverted_mse_val });
        }
    }

    isScoreGenerated(){
        let flag = true;
        for(let i=0;i<this.members.length;i++)
        {
            if(this.members[i].score == 0)
                return false;
        }
        return true;
    }

    next_generation() {
        let check = this.isScoreGenerated();
        if (check == false)
        {
            alert("Score is not generated, synthesise and score");
            return;
        }
        this.calculate_fitness();
        this.repopulate();
        this.fitness_sorted_indices = [];
        console.log("trace: next generation completed");
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
