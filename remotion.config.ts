import {Config} from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setWebpackPollingInMilliseconds(1000);
Config.overrideWebpackConfig((currentConfiguration) => ({
  ...currentConfiguration,
  experiments: {
    ...currentConfiguration.experiments,
    lazyCompilation: false,
  },
  watchOptions: {
    ...currentConfiguration.watchOptions,
    ignored: [
      "**/node_modules/**",
      "**/out/**",
      "**/transcripts/**",
      "../Screen Studio files/**",
      "../Studio AI/Screen Shot Vids/**",
      "../Convert/Screen Shot Vids/**",
      "../Care/Screen Shot Vids/**",
    ],
    poll: 1000,
  },
}));
