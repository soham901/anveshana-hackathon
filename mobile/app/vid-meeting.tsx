import { WebView } from "react-native-webview";
import {
  StyleSheet,
  BackHandler,
  Linking,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

export default function App() {
  const webviewRef = useRef(null); // Correctly using useRef for the WebView reference
  const [canGoBack, setCanGoBack] = useState(false);
  const [url, setUrl] = useState(
    "https://fasal-mandi.whereby.com/f865b461-70b6-4bb3-b9aa-851665c34ce0"
  );

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message:
                "This app needs access to your storage to download files",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );

          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("Storage permission granted");
          } else {
            // console.log("Storage permission denied");
          }
        } else {
          // console.log("Storage permission already granted");
        }
      } catch (err) {
        // console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  // Handle back button press for Android
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true; // Prevent default behavior (closing the app)
      } else {
        return false; // Allow default behavior (closing the app)
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up event listener
  }, [canGoBack]);

  const handleNavigationStateChange = (navState) => {
    // console.log(navState.url);
    setUrl(navState.url);
    setCanGoBack(navState.canGoBack); // Update canGoBack state
  };

  const handleShouldStartLoadWithRequest = (request) => {
    const { url } = request;

    // Handle WhatsApp links
    if (
      url.startsWith("https://api.whatsapp.com") ||
      url.startsWith("whatsapp://")
    ) {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open WhatsApp URL:", err)
      );
      return false; // Prevent WebView from opening WhatsApp links
    }

    // Allow all links within the widbazaar.com domain
    if (url.includes("widbazaar.com")) {
      return true; // Allow navigation within the WebView
    } else {
      // Open other external links in the default browser
      Linking.openURL(url);
      return false;
    }
  };

  return (
    <WebView
      ref={webviewRef} // Correctly using useRef here
      source={{ uri: url }}
      style={styles.container}
      onNavigationStateChange={handleNavigationStateChange}
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      forceDarkOn={false}
      setSupportMultipleWindows={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
