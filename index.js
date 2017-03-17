
class DevToolsProfiler {
  constructor(options) {
    this.registry = {};
    this.options = options;
  }

  log(name, description) {
    if (this.registry[name] && this.registry[name].start) {
      this.registry[name].end = Date.now();
    } else {
      this.registry[name] = { start: Date.now() };
    }
    if (description) {
      this.registry[name].description = description;
    }
  }

  toString() {
    const seconds = (this.options && this.options.seconds);
    return Object.keys(this.registry).map((e) => {
        const element = this.registry[e];
        const elapsed = (element.end - element.start) / (seconds ? 1000 : 1);
        const dscrptn = element.description || e;
        return `${e}=${elapsed};"${dscrptn}"`
      }).join(',');
  }
}

module.exports = DevToolsProfiler;
