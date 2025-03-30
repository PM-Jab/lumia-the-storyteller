import Hls from "hls.js";
import React, { useEffect, useRef } from "react";
import { GenerateJWT } from "@/utils/jwtToken";
import { GetSecret } from "@/utils/secret";

const HlsLoader = (hlsUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (audioRef.current == null || hlsUrl == null) {
    return;
  }

  if (hlsUrl && Hls.isSupported()) {
    const hls = new Hls();
    const token = GenerateJWT({ user: "jab" }, GetSecret());
    hls.loadSource(hlsUrl + "?auth=" + token); // Load the HLS URL from the API response

    hls.attachMedia(audioRef.current);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // audioRef.current?.play();
    });

    return () => {
      hls.destroy();
    };
  } else if (audioRef.current && hlsUrl) {
    // For browsers with native HLS support, like Safari
    audioRef.current.src = hlsUrl;
    audioRef.current.addEventListener("loadedmetadata", () => {
      audioRef.current?.play();
    });
  }

  return audioRef;
};

export default HlsLoader;
