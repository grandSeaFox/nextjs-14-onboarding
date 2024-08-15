import flagsmith from 'flagsmith/isomorphic';

class FlagsmithService {
  private static instance: FlagsmithService;
  private isInitialized: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!FlagsmithService.instance) {
      FlagsmithService.instance = new FlagsmithService();
    }
    return FlagsmithService.instance;
  }

  async init() {
    if (!this.isInitialized) {
      await flagsmith.init({
        environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_KEY!,
      });
      this.isInitialized = true;
    }
  }

  async getFlags() {
    await this.init();
    return flagsmith.getAllFlags();
  }

  async getState() {
    await this.init();
    return flagsmith.getState();
  }
}

export default FlagsmithService.getInstance();
