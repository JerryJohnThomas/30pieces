starting at 4 40
08 10 2023

lets see how the mutate and next generation is working now ...


# Method 1 analysis
mutate 
    mutates trianlges with epsilon probability and extend extend

reproduce 
    take both parents triangles with equal probability

score : inverted mse 

so the problem is that no new triangles are being generated, i think 

lets study the score trend as it goes

score 

[8.78, 7.3, 8.8, 8.41, 6.06]
[7.31, 7.12, 8.45, 8.16, 9.15]
[8.02, 9.04, 9.86, 9.24, 9.14]
...
[8.51, 8.89, 8.1, 8.9, 8.84]
[11.32, 12.48, 12.43, 11.95, 12.54]
now almost everything same
all the triangles are converging to the same result ...

[10.47, 9.43, 9.98, 9.98, 10.11]
[14.13 , .... ]
[12.7 , ... ]

Attempt 2 
lets change the mutation to form a fresh triangle

mutate
new triangle --> mutate current triangle --> retain



reproduction does not add any thing new, its only the permutation and combination of the exitign

all the magic happens in mutation apparently 

next things would be extend and epsilon some input handler mapper from dashboard
