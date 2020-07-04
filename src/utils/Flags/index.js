import images from "../../config/images";

let instance = null;

class FlagResource {
  static getInstance() {
    if (!instance) {
      instance = new FlagResource();
    }
    return instance;
  }

  constructor() {
    this.flags = images.flags;
  }

  get(name) {
    return this.flags[name];
  }
}

export default FlagResource.getInstance();
