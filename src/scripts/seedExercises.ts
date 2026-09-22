import dns from "dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import dbConnect from "../lib/mongodb";
import Exercise from "../models/Exercise";

const exercises = [
  // =========================
  // 50 GYM / EQUIPMENT EXERCISES
  // =========================

  {
    name: "Barbell Bench Press",
    category: "Strength",
    muscleGroup: "Chest",
    equipment: "Barbell",
    description:
      "A compound pressing exercise that primarily targets the chest, with the shoulders and triceps assisting.",
  },
  {
    name: "Incline Barbell Bench Press",
    category: "Strength",
    muscleGroup: "Upper Chest",
    equipment: "Barbell",
    description:
      "An incline pressing movement that emphasizes the upper chest while also training the shoulders and triceps.",
  },
  {
    name: "Dumbbell Bench Press",
    category: "Strength",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    description:
      "A dumbbell pressing exercise that trains the chest, shoulders, and triceps.",
  },
  {
    name: "Incline Dumbbell Press",
    category: "Strength",
    muscleGroup: "Upper Chest",
    equipment: "Dumbbells",
    description:
      "An incline dumbbell press that primarily targets the upper chest.",
  },
  {
    name: "Dumbbell Fly",
    category: "Isolation",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    description:
      "An isolation movement that trains the chest through a controlled horizontal arm movement.",
  },
  {
    name: "Cable Chest Fly",
    category: "Isolation",
    muscleGroup: "Chest",
    equipment: "Cable Machine",
    description:
      "A cable-based chest isolation exercise that maintains tension throughout the movement.",
  },
  {
    name: "Machine Chest Press",
    category: "Strength",
    muscleGroup: "Chest",
    equipment: "Chest Press Machine",
    description:
      "A machine pressing exercise targeting the chest with assistance from the shoulders and triceps.",
  },
  {
    name: "Barbell Squat",
    category: "Strength",
    muscleGroup: "Quadriceps",
    equipment: "Barbell",
    description:
      "A major compound lower-body exercise that trains the quadriceps, glutes, and supporting muscles.",
  },
  {
    name: "Front Squat",
    category: "Strength",
    muscleGroup: "Quadriceps",
    equipment: "Barbell",
    description:
      "A barbell squat variation that places significant emphasis on the quadriceps and core.",
  },
  {
    name: "Leg Press",
    category: "Strength",
    muscleGroup: "Legs",
    equipment: "Leg Press Machine",
    description:
      "A machine-based compound exercise that primarily trains the quadriceps and glutes.",
  },
  {
    name: "Leg Extension",
    category: "Isolation",
    muscleGroup: "Quadriceps",
    equipment: "Leg Extension Machine",
    description:
      "An isolation exercise designed to specifically train the quadriceps.",
  },
  {
    name: "Leg Curl",
    category: "Isolation",
    muscleGroup: "Hamstrings",
    equipment: "Leg Curl Machine",
    description: "An isolation exercise that targets the hamstrings.",
  },
  {
    name: "Romanian Deadlift",
    category: "Strength",
    muscleGroup: "Hamstrings",
    equipment: "Barbell",
    description: "A hip-hinge exercise emphasizing the hamstrings and glutes.",
  },
  {
    name: "Conventional Deadlift",
    category: "Strength",
    muscleGroup: "Back",
    equipment: "Barbell",
    description:
      "A compound pulling exercise that trains the back, glutes, hamstrings, and grip.",
  },
  {
    name: "Sumo Deadlift",
    category: "Strength",
    muscleGroup: "Glutes",
    equipment: "Barbell",
    description:
      "A wide-stance deadlift variation emphasizing the glutes, hamstrings, and inner thighs.",
  },
  {
    name: "Barbell Row",
    category: "Strength",
    muscleGroup: "Back",
    equipment: "Barbell",
    description:
      "A compound pulling movement targeting the lats and upper back.",
  },
  {
    name: "Dumbbell Row",
    category: "Strength",
    muscleGroup: "Back",
    equipment: "Dumbbell",
    description:
      "A unilateral pulling exercise targeting the lats and upper back.",
  },
  {
    name: "Seated Cable Row",
    category: "Strength",
    muscleGroup: "Back",
    equipment: "Cable Machine",
    description:
      "A horizontal pulling exercise that trains the lats and upper back.",
  },
  {
    name: "Lat Pulldown",
    category: "Strength",
    muscleGroup: "Lats",
    equipment: "Cable Machine",
    description:
      "A vertical pulling exercise that primarily targets the latissimus dorsi.",
  },
  {
    name: "T-Bar Row",
    category: "Strength",
    muscleGroup: "Back",
    equipment: "T-Bar Machine",
    description:
      "A compound rowing exercise that develops the lats and upper back.",
  },
  {
    name: "Face Pull",
    category: "Isolation",
    muscleGroup: "Rear Shoulders",
    equipment: "Cable Machine",
    description: "A cable exercise targeting the rear deltoids and upper back.",
  },
  {
    name: "Barbell Overhead Press",
    category: "Strength",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    description:
      "A compound overhead pressing exercise that primarily trains the shoulders and triceps.",
  },
  {
    name: "Dumbbell Shoulder Press",
    category: "Strength",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    description:
      "An overhead dumbbell pressing movement targeting the shoulders and triceps.",
  },
  {
    name: "Dumbbell Lateral Raise",
    category: "Isolation",
    muscleGroup: "Side Shoulders",
    equipment: "Dumbbells",
    description: "An isolation exercise that emphasizes the lateral deltoids.",
  },
  {
    name: "Dumbbell Front Raise",
    category: "Isolation",
    muscleGroup: "Front Shoulders",
    equipment: "Dumbbells",
    description:
      "An isolation movement targeting the front portion of the shoulders.",
  },
  {
    name: "Reverse Dumbbell Fly",
    category: "Isolation",
    muscleGroup: "Rear Shoulders",
    equipment: "Dumbbells",
    description:
      "An isolation exercise targeting the rear deltoids and upper back.",
  },
  {
    name: "Barbell Bicep Curl",
    category: "Isolation",
    muscleGroup: "Biceps",
    equipment: "Barbell",
    description: "A classic arm exercise that primarily targets the biceps.",
  },
  {
    name: "Dumbbell Bicep Curl",
    category: "Isolation",
    muscleGroup: "Biceps",
    equipment: "Dumbbells",
    description: "A dumbbell curling exercise that trains the biceps.",
  },
  {
    name: "Hammer Curl",
    category: "Isolation",
    muscleGroup: "Biceps",
    equipment: "Dumbbells",
    description: "A neutral-grip curl that trains the biceps and brachialis.",
  },
  {
    name: "Preacher Curl",
    category: "Isolation",
    muscleGroup: "Biceps",
    equipment: "Preacher Bench",
    description: "A supported curling movement designed to isolate the biceps.",
  },
  {
    name: "Cable Bicep Curl",
    category: "Isolation",
    muscleGroup: "Biceps",
    equipment: "Cable Machine",
    description:
      "A cable-based bicep exercise providing continuous resistance.",
  },
  {
    name: "Tricep Pushdown",
    category: "Isolation",
    muscleGroup: "Triceps",
    equipment: "Cable Machine",
    description:
      "A cable isolation exercise that primarily trains the triceps.",
  },
  {
    name: "Skull Crusher",
    category: "Isolation",
    muscleGroup: "Triceps",
    equipment: "EZ Bar",
    description: "A lying triceps extension exercise targeting the triceps.",
  },
  {
    name: "Close-Grip Bench Press",
    category: "Strength",
    muscleGroup: "Triceps",
    equipment: "Barbell",
    description:
      "A close-grip pressing movement that places greater emphasis on the triceps.",
  },
  {
    name: "Cable Tricep Extension",
    category: "Isolation",
    muscleGroup: "Triceps",
    equipment: "Cable Machine",
    description:
      "A cable isolation exercise that targets the triceps through elbow extension.",
  },
  {
    name: "Dumbbell Shrug",
    category: "Isolation",
    muscleGroup: "Traps",
    equipment: "Dumbbells",
    description: "An isolation exercise targeting the upper trapezius muscles.",
  },
  {
    name: "Barbell Shrug",
    category: "Isolation",
    muscleGroup: "Traps",
    equipment: "Barbell",
    description:
      "A loaded shrug movement designed to develop the upper trapezius.",
  },
  {
    name: "Standing Calf Raise",
    category: "Isolation",
    muscleGroup: "Calves",
    equipment: "Calf Raise Machine",
    description: "A standing calf exercise emphasizing the gastrocnemius.",
  },
  {
    name: "Seated Calf Raise",
    category: "Isolation",
    muscleGroup: "Calves",
    equipment: "Calf Raise Machine",
    description: "A seated calf movement emphasizing the soleus.",
  },
  {
    name: "Hip Thrust",
    category: "Strength",
    muscleGroup: "Glutes",
    equipment: "Barbell",
    description: "A hip-extension exercise that strongly targets the glutes.",
  },
  {
    name: "Cable Kickback",
    category: "Isolation",
    muscleGroup: "Glutes",
    equipment: "Cable Machine",
    description:
      "A cable isolation exercise targeting the glutes through hip extension.",
  },
  {
    name: "Dumbbell Bulgarian Split Squat",
    category: "Strength",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    description:
      "A unilateral leg exercise targeting the quadriceps and glutes.",
  },
  {
    name: "Dumbbell Lunges",
    category: "Strength",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    description:
      "A unilateral lower-body exercise targeting the quadriceps and glutes.",
  },
  {
    name: "Goblet Squat",
    category: "Strength",
    muscleGroup: "Legs",
    equipment: "Dumbbell",
    description:
      "A squat variation performed while holding a dumbbell or kettlebell in front of the chest.",
  },
  {
    name: "Dumbbell Romanian Deadlift",
    category: "Strength",
    muscleGroup: "Hamstrings",
    equipment: "Dumbbells",
    description:
      "A dumbbell hip-hinge exercise targeting the hamstrings and glutes.",
  },
  {
    name: "Cable Woodchopper",
    category: "Core",
    muscleGroup: "Obliques",
    equipment: "Cable Machine",
    description:
      "A rotational cable exercise that trains the obliques and core.",
  },
  {
    name: "Cable Crunch",
    category: "Core",
    muscleGroup: "Abdominals",
    equipment: "Cable Machine",
    description: "A weighted abdominal exercise using a cable machine.",
  },
  {
    name: "Back Extension",
    category: "Strength",
    muscleGroup: "Lower Back",
    equipment: "Back Extension Bench",
    description:
      "An exercise that trains the lower back, glutes, and hamstrings.",
  },
  {
    name: "Dumbbell Pullover",
    category: "Strength",
    muscleGroup: "Chest",
    equipment: "Dumbbell",
    description:
      "A lying dumbbell movement that trains the chest and also involves the lats.",
  },
  {
    name: "Farmer's Walk",
    category: "Strength",
    muscleGroup: "Full Body",
    equipment: "Dumbbells",
    description:
      "A loaded carry that trains grip strength, traps, core stability, and the lower body.",
  },

  // =========================
  // 50 BODYWEIGHT EXERCISES
  // =========================

  {
    name: "Push-Up",
    category: "Bodyweight",
    muscleGroup: "Chest",
    equipment: "None",
    description:
      "A fundamental bodyweight pressing exercise targeting the chest, shoulders, and triceps.",
  },
  {
    name: "Wide-Grip Push-Up",
    category: "Bodyweight",
    muscleGroup: "Chest",
    equipment: "None",
    description:
      "A push-up variation using a wider hand position to emphasize the chest.",
  },
  {
    name: "Diamond Push-Up",
    category: "Bodyweight",
    muscleGroup: "Triceps",
    equipment: "None",
    description:
      "A close-hand push-up variation that places greater emphasis on the triceps.",
  },
  {
    name: "Decline Push-Up",
    category: "Bodyweight",
    muscleGroup: "Upper Chest",
    equipment: "Bench or Elevated Surface",
    description:
      "A push-up performed with the feet elevated to increase upper-chest and shoulder involvement.",
  },
  {
    name: "Incline Push-Up",
    category: "Bodyweight",
    muscleGroup: "Chest",
    equipment: "Bench or Elevated Surface",
    description:
      "An easier push-up variation performed with the hands elevated.",
  },
  {
    name: "Pike Push-Up",
    category: "Bodyweight",
    muscleGroup: "Shoulders",
    equipment: "None",
    description:
      "A bodyweight pressing exercise that emphasizes the shoulders and triceps.",
  },
  {
    name: "Handstand Push-Up",
    category: "Bodyweight",
    muscleGroup: "Shoulders",
    equipment: "None",
    description:
      "An advanced bodyweight pressing exercise performed in a handstand position.",
  },
  {
    name: "Archer Push-Up",
    category: "Bodyweight",
    muscleGroup: "Chest",
    equipment: "None",
    description:
      "An advanced push-up variation that places more load on one arm.",
  },
  {
    name: "Hindu Push-Up",
    category: "Bodyweight",
    muscleGroup: "Chest",
    equipment: "None",
    description:
      "A dynamic push-up variation combining pressing and controlled body movement.",
  },
  {
    name: "Clap Push-Up",
    category: "Plyometric",
    muscleGroup: "Chest",
    equipment: "None",
    description:
      "An explosive push-up variation designed to develop upper-body power.",
  },
  {
    name: "Pull-Up",
    category: "Bodyweight",
    muscleGroup: "Back",
    equipment: "Pull-Up Bar",
    description:
      "A compound bodyweight pulling exercise targeting the lats, biceps, and upper back.",
  },
  {
    name: "Chin-Up",
    category: "Bodyweight",
    muscleGroup: "Biceps",
    equipment: "Pull-Up Bar",
    description:
      "An underhand-grip vertical pulling exercise emphasizing the biceps and lats.",
  },
  {
    name: "Wide-Grip Pull-Up",
    category: "Bodyweight",
    muscleGroup: "Lats",
    equipment: "Pull-Up Bar",
    description:
      "A pull-up variation using a wider grip to emphasize the upper back and lats.",
  },
  {
    name: "Neutral-Grip Pull-Up",
    category: "Bodyweight",
    muscleGroup: "Back",
    equipment: "Pull-Up Bar",
    description:
      "A pull-up variation using a neutral grip that trains the back and arms.",
  },
  {
    name: "Australian Pull-Up",
    category: "Bodyweight",
    muscleGroup: "Back",
    equipment: "Low Bar",
    description:
      "A horizontal bodyweight pulling exercise suitable for developing pulling strength.",
  },
  {
    name: "Bodyweight Squat",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "A fundamental lower-body movement targeting the quadriceps, glutes, and hamstrings.",
  },
  {
    name: "Jump Squat",
    category: "Plyometric",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "An explosive squat variation designed to develop lower-body power.",
  },
  {
    name: "Bulgarian Split Squat",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "Bench or Elevated Surface",
    description:
      "A unilateral leg exercise targeting the quadriceps and glutes.",
  },
  {
    name: "Walking Lunge",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "A dynamic unilateral leg exercise targeting the quadriceps and glutes.",
  },
  {
    name: "Reverse Lunge",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "A controlled lunge variation that targets the quadriceps and glutes.",
  },
  {
    name: "Forward Lunge",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "A unilateral movement that trains the quadriceps, glutes, and hamstrings.",
  },
  {
    name: "Step-Up",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "Bench or Step",
    description:
      "A unilateral lower-body exercise performed by stepping onto an elevated surface.",
  },
  {
    name: "Glute Bridge",
    category: "Bodyweight",
    muscleGroup: "Glutes",
    equipment: "None",
    description: "A hip-extension exercise that primarily targets the glutes.",
  },
  {
    name: "Single-Leg Glute Bridge",
    category: "Bodyweight",
    muscleGroup: "Glutes",
    equipment: "None",
    description:
      "A unilateral glute bridge variation that increases the challenge on each side.",
  },
  {
    name: "Single-Leg Squat",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "An advanced unilateral squat requiring significant leg strength and balance.",
  },
  {
    name: "Pistol Squat",
    category: "Bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
    description:
      "An advanced single-leg squat requiring strength, mobility, and balance.",
  },
  {
    name: "Calf Raise",
    category: "Bodyweight",
    muscleGroup: "Calves",
    equipment: "None",
    description:
      "A simple calf exercise performed by repeatedly raising the heels.",
  },
  {
    name: "Single-Leg Calf Raise",
    category: "Bodyweight",
    muscleGroup: "Calves",
    equipment: "None",
    description:
      "A unilateral calf exercise that increases the load placed on each leg.",
  },
  {
    name: "Wall Sit",
    category: "Bodyweight",
    muscleGroup: "Quadriceps",
    equipment: "Wall",
    description:
      "An isometric lower-body exercise that primarily challenges the quadriceps.",
  },
  {
    name: "Nordic Hamstring Curl",
    category: "Bodyweight",
    muscleGroup: "Hamstrings",
    equipment: "Anchor",
    description:
      "An advanced bodyweight hamstring exercise emphasizing eccentric strength.",
  },
  {
    name: "Hanging Knee Raise",
    category: "Bodyweight",
    muscleGroup: "Core",
    equipment: "Pull-Up Bar",
    description:
      "A hanging core exercise that targets the abdominal muscles and hip flexors.",
  },
  {
    name: "Hanging Leg Raise",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "Pull-Up Bar",
    description:
      "An advanced hanging exercise targeting the abdominal muscles.",
  },
  {
    name: "Lying Leg Raise",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "None",
    description:
      "A floor-based exercise that trains the abdominal muscles and hip flexors.",
  },
  {
    name: "Crunch",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "None",
    description:
      "A basic abdominal exercise emphasizing controlled trunk flexion.",
  },
  {
    name: "Bicycle Crunch",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "None",
    description:
      "A dynamic abdominal exercise involving trunk rotation and alternating leg movement.",
  },
  {
    name: "Reverse Crunch",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "None",
    description:
      "An abdominal exercise emphasizing controlled pelvic movement.",
  },
  {
    name: "Plank",
    category: "Isometric",
    muscleGroup: "Core",
    equipment: "None",
    description:
      "An isometric exercise that trains core stability and endurance.",
  },
  {
    name: "Side Plank",
    category: "Isometric",
    muscleGroup: "Obliques",
    equipment: "None",
    description:
      "An isometric core exercise emphasizing the obliques and lateral core stability.",
  },
  {
    name: "Mountain Climbers",
    category: "Cardio",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A dynamic bodyweight exercise combining core training with cardiovascular conditioning.",
  },
  {
    name: "Burpee",
    category: "Cardio",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A full-body conditioning exercise combining a squat, plank position, and explosive movement.",
  },
  {
    name: "High Knees",
    category: "Cardio",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A running-in-place movement used to improve cardiovascular conditioning and coordination.",
  },
  {
    name: "Jumping Jacks",
    category: "Cardio",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A simple full-body cardiovascular exercise involving repeated jumping movements.",
  },
  {
    name: "Bear Crawl",
    category: "Bodyweight",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A crawling movement that challenges the core, shoulders, arms, and legs.",
  },
  {
    name: "Crab Walk",
    category: "Bodyweight",
    muscleGroup: "Full Body",
    equipment: "None",
    description:
      "A bodyweight locomotion exercise that challenges the shoulders, arms, core, and legs.",
  },
  {
    name: "Inchworm",
    category: "Bodyweight",
    muscleGroup: "Core",
    equipment: "None",
    description:
      "A dynamic movement combining a forward fold with a walkout into a plank position.",
  },
  {
    name: "Donkey Kick",
    category: "Bodyweight",
    muscleGroup: "Glutes",
    equipment: "None",
    description:
      "A bodyweight glute exercise performed from a hands-and-knees position.",
  },
  {
    name: "Fire Hydrant",
    category: "Bodyweight",
    muscleGroup: "Glutes",
    equipment: "None",
    description:
      "A lateral hip movement that targets the glutes and hip stabilizers.",
  },
  {
    name: "Superman",
    category: "Bodyweight",
    muscleGroup: "Lower Back",
    equipment: "None",
    description:
      "A floor-based posterior-chain exercise targeting the lower back and glutes.",
  },
  {
    name: "Bird Dog",
    category: "Bodyweight",
    muscleGroup: "Core",
    equipment: "None",
    description:
      "A controlled core stability exercise performed from a hands-and-knees position.",
  },
  {
    name: "Dead Bug",
    category: "Bodyweight",
    muscleGroup: "Core",
    equipment: "None",
    description:
      "A controlled core exercise designed to develop abdominal stability and coordination.",
  },
  {
    name: "Bodyweight Good Morning",
    category: "Bodyweight",
    muscleGroup: "Hamstrings",
    equipment: "None",
    description:
      "A hip-hinge movement that trains the hamstrings, glutes, and lower back.",
  },
  {
    name: "V-Up",
    category: "Bodyweight",
    muscleGroup: "Abdominals",
    equipment: "None",
    description:
      "An advanced abdominal exercise requiring simultaneous lifting of the torso and legs.",
  },
];

async function seedExercises() {
  try {
    await dbConnect();

    console.log("Connected to MongoDB");

    let added = 0;
    let skipped = 0;

    for (const exercise of exercises) {
      const exists = await Exercise.findOne({
        name: exercise.name,
      });

      if (exists) {
        skipped++;
        continue;
      }

      await Exercise.create(exercise);
      added++;
    }

    console.log(`Exercises added: ${added}`);
    console.log(`Exercises skipped: ${skipped}`);
    console.log(`Total seed exercises: ${exercises.length}`);
    console.log("Exercise seeding complete.");
  } catch (error) {
    console.error("Error seeding exercises:", error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

seedExercises();
