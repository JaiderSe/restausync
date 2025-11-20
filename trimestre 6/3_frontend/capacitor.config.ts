import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.restausync.app',
  appName: 'Restausync',
  webDir: 'dist/frontend/browser',
  server: {
    androidScheme: 'http',
    url: 'http://172.20.10.2:4200',
    cleartext: true,
    allowNavigation: [
      'http://localhost:4200',
      'http://localhost:4201',
      'http://127.0.0.1:4200',
      'http://127.0.0.1:4201',
      'http://172.20.10.2:4200',
      'http://172.20.10.2:4001',
      'http://192.168.1.40:4200',
      'http://192.168.1.40:4001',
      'http://localhost',
      'https://localhost',
      'http://10.0.2.2:4200',
      'http://10.0.2.2:4001',
    ],
  },
};

export default config;
