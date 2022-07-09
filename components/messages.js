export class Message {
  start() {
    return "Choose workout planes:";
  }
  equipment() {
    return "Equipment:";
  }
  intencity() {
    return "Intensity:";
  }
  workout(params) {
    return `Workout params:\nIntensive - ${params.intensive}\nPlanes - ${[
      ...new Set(params.planes),
    ].join(", ")}`;
  }
  emptyParams() {
    return "No any choosen. Try again:";
  }
  default(message) {
    return `Unknown command: "${message}"`;
  }
}
