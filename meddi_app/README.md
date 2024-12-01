# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started


1. Install dependencies

   ```bash
   npm install
   ```

2. Fill in the environment variables
```bash
EXPO_PUBLIC_BACKEND_URI="<YOUR_LOCAL_RUNNING_BACKEND>"
```

3. Start the app

   ```bash
    npx expo start
   ```

Or run with a specific device:
```bash
npm run ios -- --device
npm run android -- --device
```

Note: For running on a specific device, you may need to play around with networking
- The BACKEND_URI must be that of your computer IPv4 address
- The expo command may require `--tunnel` flag

