import { HLSAudioplayerProps } from "../../model/bookModel";
import React, { CSSProperties, use, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./AudioPlayer.css";
import Image from "next/image";
import { useBook } from "@/context/bookContext";
import { audio } from "framer-motion/client";

const AudioPlayer: React.FC<HLSAudioplayerProps> = ({
  hlsUrl,
  onPageForward,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [bufferAmount, setBufferAmount] = useState<number>(0);
  const [progressAmount, setProgressAmount] = useState<number>(0);
  const [scrubbing, setScrubbing] = useState<boolean>(false);
  const [autoPaused, setAutoPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const {
    chapterPages,
    setHighlightedIndex,
    pageIndex,
    setPageIndex,
    toggleManualChange,
  } = useBook();

  useEffect(() => {
    if (audioRef.current == null || hlsUrl == null) {
      return;
    }

    if (hlsUrl && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl); // Load the HLS URL from the API response
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
  }, [hlsUrl]);

  const onAudioProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration > 0) {
        for (let i = 0; i < audioRef.current.buffered.length; i++) {
          if (
            audioRef.current.buffered.start(
              audioRef.current.buffered.length - 1 - i
            ) < audioRef.current.currentTime
          ) {
            setBufferAmount(
              (audioRef.current.buffered.end(
                audioRef.current.buffered.length - 1 - i
              ) *
                100) /
                duration
            );
            break;
          }
        }
      }
    }
  };

  const onAudioTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgressAmount((audioRef.current.currentTime * 100) / duration);
      }
    }
    linkAudioTimestampWithPage();
  };

  const onScrubStart = (e: React.MouseEvent) => {
    if (progressRef.current) {
      setScrubbing(true);
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setAutoPaused(true);
      }
      let progress = Math.min(
        Math.max(
          ((e.clientX - progressRef.current.offsetLeft) * 100) /
            progressRef.current.clientWidth,
          0
        ),
        100
      );
      setProgressAmount(progress);
    }
  };

  const onScrub = (e: MouseEvent) => {
    if (scrubbing && progressRef.current) {
      let progress = Math.min(
        Math.max(
          ((e.clientX - progressRef.current.offsetLeft) * 100) /
            progressRef.current.clientWidth,
          0
        ),
        100
      );
      setProgressAmount(progress);
    }
  };

  const onScrubEnd = (e: MouseEvent) => {
    if (progressRef.current && scrubbing) {
      setScrubbing(false);
      if (audioRef.current) {
        let percentage = Math.min(
          Math.max(
            (e.clientX - progressRef.current.offsetLeft) /
              progressRef.current.clientWidth,
            0
          ),
          1
        );
        let time = percentage * audioRef.current.duration;
        audioRef.current.currentTime = time;
        autoPaused && audioRef.current.play();
        setAutoPaused(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onScrub);
    document.addEventListener("mouseup", onScrubEnd);
    return () => {
      document.removeEventListener("mousemove", onScrub);
      document.removeEventListener("mouseup", onScrubEnd);
    };
  }, [scrubbing]);

  const onAudioToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const onAudioForward = (sec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + sec,
        audioRef.current.duration
      );
    }
  };

  const onAudioBackward = (sec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - sec,
        0
      );
    }
  };

  const highlighting = (index: number) => {
    const currentTime = audioRef.current
      ? audioRef.current.currentTime * 1000
      : 0;
    const sentenceEndTimes = chapterPages[index]?.sentenceEndTimestamp;
    const sentences = chapterPages[index]?.sentences;

    const newIndex = sentenceEndTimes?.findIndex(
      (endTime) => currentTime <= endTime * 1000
    );

    if (sentences && newIndex !== undefined) {
      setHighlightedIndex(newIndex >= 0 ? newIndex : sentences.length - 1);
    }
  };

  const resetHighlighting = () => {
    setHighlightedIndex(0);
  };

  const linkAudioTimestampWithPage = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const currentPageIndex = chapterPages
        .map((page, index) => {
          if (
            currentTime >= page.firstSentenceStartAt &&
            currentTime <= page.lastSentenceEndAt
          )
            return index;
        })
        .filter((index) => index !== undefined)[0];
      setPageIndex(currentPageIndex);
      highlighting(currentPageIndex);
    }
  };

  const setAudioTimeAtStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        chapterPages[pageIndex].firstSentenceStartAt;
    }
  };

  useEffect(() => {
    resetHighlighting();
    setAudioTimeAtStart();
  }, [toggleManualChange]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 bg-gray-500 rounded-lg">
      <div className="flex items-center space-x-4">
        <div onClick={() => onAudioBackward(10)}>
          <Image
            src={"/backward-10-icon.svg"}
            alt="backward-10"
            width={40}
            height={40}
          />
        </div>

        <div onClick={onAudioToggle}>
          {isPlaying ? (
            <Image src={"/pause-icon.svg"} alt="pause" width={40} height={40} />
          ) : (
            <Image src={"/play-icon.svg"} alt="play" width={40} height={40} />
          )}
        </div>

        <div onClick={() => onAudioForward(10)}>
          <Image
            src={"/forward-10-icon.svg"}
            alt="forward-10"
            width={40}
            height={40}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        onProgress={onAudioProgress}
        onTimeUpdate={onAudioTimeUpdate}
      />
      <div
        ref={progressRef}
        className="progress-bar"
        onMouseDown={onScrubStart}
      >
        <span id="background-track"></span>
        <span
          id="buffered-track"
          style={{ "--buffer": `${bufferAmount}%` } as CSSProperties}
        ></span>
        <span
          id="progress-track"
          style={{ "--progress": `${progressAmount}%` } as CSSProperties}
        ></span>
        <span
          id="thumb"
          style={{ "--progress": `${progressAmount}%` } as CSSProperties}
        ></span>
      </div>
    </div>
  );
};

export default AudioPlayer;
