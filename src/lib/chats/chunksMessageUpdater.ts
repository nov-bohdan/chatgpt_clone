import { updateMessage } from "./data";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Updater = {
  queue: [] as string[],
  status: "idle" as "idle" | "running",

  startUpdating: async function (messageId: string) {
    this.status = "running";
    while (this.status === "running" || this.queue.length > 0) {
      if (this.queue.length > 0) {
        await updateMessage(this.queue[0], messageId);
        console.log("Updated");
        this.queue.shift();
      }
      await sleep(1);
    }
  },

  stopUpdating: function () {
    this.status = "idle";
  },

  addInQueue(chunk: string) {
    if (this.queue.length > 1) {
      this.queue = [this.queue[this.queue.length - 1]];
    }
    this.queue.push(chunk);
  },
};
