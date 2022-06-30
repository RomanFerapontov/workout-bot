import { noLimitExcersises } from "../models/excercises.js";
import {
  warmupProtocols,
  powerProtocols,
  staminaProtocols,
} from "../models/protcols.js";
import { split } from "../models/split.js";

const params = [
  "bw",
  "iron",
  "knees",
  "back",
  "heavy",
  "legs",
  ["knees", "hips"],
];

const workoutComponents = {
  protocols: {
    warmup: [],
    power: [],
    stamina: [],
  },
  excercises: {
    warmup: {},
    power: [],
    stamina: [],
  },
};

export class Randomizer {
  constructor(...args) {
    this.workoutParams = args[0];
    this.excercises = workoutComponents.excercises;
    this.protocols = workoutComponents.protocols;
    this.intensive = workoutComponents.intensive;
  }

  random(data) {
    if (Array.isArray(data)) {
      return data[Math.floor(Math.random() * data.length)];
    }
    if (typeof data === "object") {
      const keys = Object.keys(data);
      const key = keys[Math.floor(Math.random() * keys.length)];
      return key;
    }
  }

  getIntensive() {
    if (this.workoutParams.includes("light")) {
      this.intensive = "light";
    } else if (this.workoutParams.includes("heavy")) {
      this.intensive = "heavy";
    }
  }

  getProtocols() {
    if (this.workoutParams.includes(this.intensive)) {
      const warmup = warmupProtocols[this.intensive];
      const power = powerProtocols[this.intensive];
      const stamina = staminaProtocols[this.intensive];

      const warmupRandom = this.random(warmup);
      const powerRandom = this.random(power);
      const staminaRandom = this.random(stamina);

      this.protocols.warmup = `${warmupRandom} ${this.random(
        warmup[warmupRandom]["qty"]
      )} ${warmup[warmupRandom]["time"]}`;

      this.protocols.power = `${powerRandom} ${this.random(
        power[powerRandom]["qty"]
      )} ${power[powerRandom]["time"]}`;

      this.protocols.stamina = `${staminaRandom} ${this.random(
        stamina[staminaRandom]["qty"]
      )} ${stamina[staminaRandom]["time"]}`;

      this.excercises.warmup = noLimitExcersises.warmup[this.intensive];
      this.excercises.power = noLimitExcersises.power[this.intensive];
      this.excercises.stamina = noLimitExcersises.stamina[this.intensive];
    }
  }

  filterBySplit(...excerciseTypes) {
    for (let stage in this.excercises) {
      Object.keys(this.excercises[stage]).forEach((type) => {
        if (!excerciseTypes[0].includes(type)) {
          delete this.excercises[stage][type];
        }
      });
    }
  }

  getExcercises() {
    for (let key in this.excercises) {
      const totalExcercises = Object.values(this.excercises[key])
        .toString()
        .split(",");
      this.excercises[key] = totalExcercises;
    }
  }
}
