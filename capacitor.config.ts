import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName:'Remind me',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_reminder",
      iconColor: "#18314f",
      sound: "mixkit-happy-bells-notification-937.wav",
    },
  }
};

export default config;
