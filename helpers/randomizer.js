import {
  shouldersLimitExcercises,
  kneesLimitExcercises,
  lowerBackLimitExcercises,
} from "../models/excercises.js";
import { allExcercises } from "../models/excercises.js";
import { protocols } from "../models/protcols.js";
import { workoutParams } from "../models/workout.params.js";
import { random, filter, shuffle } from "./helpers.js";

const params = {
  equipment: ["bw", "iron"],
  healthLimit: [],
  intensive: ["heavy"],
  bodyPart: ["pull", "push", "abs"],
};

const components = {
  warmup: {
    protocol: protocols.warmup,
    excercises: allExcercises.warmup,
  },
  power: { protocol: protocols.power, excercises: allExcercises.power },
  stamina: {
    protocol: protocols.stamina,
    excercises: allExcercises.stamina,
  },
};

export class Randomizer {
  constructor(params) {
    this.params = params;
  }

  getProtocolsAndExcercises() {
    const intensity = this.params.intensive;
    const bodyPart = this.params.bodyPart;

    for (let stage in components) {
      let protocol = components[stage].protocol;
      let excercises = components[stage].excercises;
      // фильтр всех упражнений по интенсивности и плоскостям
      filter(intensity, excercises);
      filter(intensity, protocol);
      filter(bodyPart, excercises[intensity]);

      components[stage].protocol = this.randomProtocol(protocol[intensity]);
      components[stage].excercises = this.randomExercises(
        excercises[intensity],
        stage
      );
    }
  }

  // TBT 4 min, RND 5, AMRAP 6 min
  randomProtocol(protocolObj) {
    const protocolName = random(protocolObj);
    const roundsQty = random(protocolObj[protocolName].qty);
    const timeParam = protocolObj[protocolName].time;

    return `${protocolName} ${roundsQty} ${timeParam}`;
  }

  randomExercises(excercisesObj, stage) {
    const excersises = [];
    const exQty = random(workoutParams[stage].exercisesQty);

    for (let key in excercisesObj) {
      excercisesObj[key].forEach((el) => {
        const reps = random(workoutParams[stage].reps);

        const healthFilter = (param, filterArray) => {
          if (this.params.healthLimit.includes(param)) {
            if (!filterArray.includes(el)) {
              el = `${el} - ${reps}`;
              excersises.push(el);
            }
            return;
          }
        };
        healthFilter("arms", shouldersLimitExcercises);
        healthFilter("knees", kneesLimitExcercises);
        healthFilter("back", lowerBackLimitExcercises);

        el = `${el} - ${reps}`;
        excersises.push(el);
      });
    }
    console.log(excersises);
    return shuffle(excersises).slice(0, exQty);
    // which equipment
  }
}

const randomExercise = new Randomizer(params);
// randomExercise.getIntensive();
randomExercise.getProtocolsAndExcercises();
// randomExercise.getProtocolsAndExercises();
// randomExercise.filterBySplit(["knees", "hips"]);
// randomExercise.getExcercises();

console.log(components);

// console.log(randomExercise.random([5, 6, 7, 8]));

/**
Пример вывода:



Разминка:
TBT 4 min




Фильтрация:
1. интенсивность (исключить все heavy/light)
2. оборудование (зависят от нагрузки и упражнений)
3. упражнения (зависят от ограничений и сплита)
 */
