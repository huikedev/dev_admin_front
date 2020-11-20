export default class AppConfig{

  public static devHost='http://core.local'

  public static productionHost='http://core.local'

  public static tokenName = 'authorization';

  public static tokenCacheName = 'authorization'

  public static localStoragePrefix = 'huike_'

}

export const baseUri = ()=>{
  return process.env.NODE_ENV === 'production' ? AppConfig.productionHost : AppConfig.devHost;
}
