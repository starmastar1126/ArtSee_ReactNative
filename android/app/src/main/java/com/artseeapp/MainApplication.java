package com.artseeapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.chirag.RNMail.RNMail;
import cl.json.RNSharePackage;
import com.devialab.exif.RCTExifPackage;
import org.reactnative.camera.RNCameraPackage;
import com.imagepicker.ImagePickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import io.realm.react.RealmReactPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
 
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNMail(),
            new RNSharePackage(),
            new RCTExifPackage(),
            new RNCameraPackage(),
            new ImagePickerPackage(),
            new ImageResizerPackage(),
            new RNViewShotPackage(),
            new RNFetchBlobPackage(),
            new RNUUIDGeneratorPackage(),
            new RealmReactPackage(),
            new ReanimatedPackage(),
            new PickerPackage(),
            new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
