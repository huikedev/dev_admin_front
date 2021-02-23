export default class AppConfig {
  public static devHost = 'http://huike.local/';

  public static productionHost = '';

  public static tokenName = 'authorization';

  public static tokenCacheName = 'authorization';

  public static localStoragePrefix = 'huike_';

  public static version = '1.0.0';
}

export const baseUri = () => {
  return process.env.NODE_ENV === 'production' ? AppConfig.productionHost : AppConfig.devHost;
};
