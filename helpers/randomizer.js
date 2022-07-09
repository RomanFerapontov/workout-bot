import { allExcercises } from "../models/excercises-f.js";
import { protocols } from "../models/protcols.js";
import { random, shuffle, equipmentFilter } from "./helpers.js";

export class Randomizer {
  constructor(params) {
    this.intensive = params.intensive;
    this.planes = params.planes;
    this.equipment = params.equipment;
  }

  getProtocol(workoutPart) {
    return random(protocols[workoutPart][this.intensive]);
  }

  getExcercises(workoutPart) {
    const part = { protocol: "", excercises: [] };
    const partProtocol = this.getProtocol(workoutPart);

    const randomExQty = random(partProtocol.exQty);
    const allExcercisesForPart = allExcercises[workoutPart][this.intensive];

    let exByPlanes = this.planes
      .map((plane) => {
        if (Object.keys(allExcercisesForPart).includes(plane)) {
          return allExcercisesForPart[plane];
        }
      })
      .flat();

    if (!this.equipment.includes("KB")) {
      exByPlanes = equipmentFilter(exByPlanes);
    }

    const exForPart = exByPlanes.map((ex) => {
      const randomReps = random(partProtocol.reps);
      return `${ex} x ${randomReps}\n`;
    });
    part.protocol = `${partProtocol.name} ${random(partProtocol.qty)}`;
    part.excercises = shuffle(exForPart).splice(0, randomExQty).join("");

    return part;
  }

  getRest() {
    if (this.intensive == "light") {
      return "4-5 min rest";
    }
    if (this.intensive == "heavy") {
      return "2-3 min rest";
    }
  }

  getWorkout() {
    const warmup = this.getExcercises("warmup");
    const power = this.getExcercises("power");
    const stamina = this.getExcercises("stamina");

    return `WOD:\n\n${warmup.protocol}\n${
      warmup.excercises
    }\n${this.getRest()}\n\n${power.protocol}\n${
      power.excercises
    }\n${this.getRest()}\n\n${stamina.protocol}\n${stamina.excercises}\n`;
  }
}
