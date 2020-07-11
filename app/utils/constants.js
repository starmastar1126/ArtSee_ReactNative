import { Platform } from "react-native";

export const fiveminutes = 5*60*1000;
export const oneminute = 60*1000;

export const AdMobInterstitialID = Platform.OS == 'android' ? 'ca-app-pub-5872692320828903/6886817060' : 'ca-app-pub-5872692320828903/3818882163';
export const AdBannerID = Platform.OS == 'android' ? 'ca-app-pub-5872692320828903/2400777146' : 'ca-app-pub-5872692320828903/2888943875';
export function getAvatarText(username) {
    if (username == null)
        return '';
    if (username.length < 2)
        return username.toUpperCase();
    return username.substr(0, 2).toUpperCase();
}