import CompareImages from "./CompareImages";
import Pokemon from "./Pokemon"
class Generation {
    constructor(id = 1, max_population = 4, canvas_height, canvas_width, max_polygons_per_pokemon = 10, target_path) {
        this.max_population = max_population;
        this.id = id;
        this.members = [];
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.max_polygons_per_pokemon = max_polygons_per_pokemon;
        
        // target image 
        this.target_path = target_path;
        const targetImg = new Image();
        targetImg.src = target_path;
        this.target_image = targetImg;
    }

    random_populate() {
        this.members = [];
        for (let i = 0; i < this.max_population; i++) {
            const pokemon = new Pokemon(i, [], this.max_polygons_per_pokemon, this.canvas_height, this.canvas_width);
            pokemon.random_generate(); // Call the random_generate method to generate triangles
            this.members.push(pokemon);
        }
    }

    score_generation(){
        // console.log(this.members);
        let comparer = new CompareImages(this.target_image, this.canvas_width, this.canvas_height);
        for (let i = 0; i < this.max_population; i++) {
            // console.log(this.members[i].image);
            if(this.members[i].image==null)
                alert("Image not found (synthesized) yet, click on syntesize and then on score");
            let mse_val= comparer.calculateMSE(this.members[i].image);
            // this.members[i].score = mse_val;
            this.members[i].score = 2.2;
            break;
        }
        console.log("trace: score generation");
    }
}
// module.exports = Generation;
export default Generation;