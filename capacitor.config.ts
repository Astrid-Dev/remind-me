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
      sound: "mixkit_happy_bells_notification_937.wav",
    },
  }
};

export default config;
