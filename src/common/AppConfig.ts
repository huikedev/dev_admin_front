export default class AppConfig {
  public static devHost = 'http://huike.local/';

  public static productionHost = 'https://dev.api.huike.dev/';

  public static tokenName = 'authorization';

  public static tokenCacheName = 'authorization';

  public static localStoragePrefix = 'huike_';

  public static version = '0.0.1-beta';

  public static edit_level = 2;
}

export const baseUri = () => {
  return process.env.NODE_ENV === 'production' ? AppConfig.productionHost : AppConfig.devHost;
};
