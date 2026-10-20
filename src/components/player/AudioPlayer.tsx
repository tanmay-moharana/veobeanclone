"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Plays a recording when `mediaUrl` is set; otherwise reads the transcript with
 * the browser's German speech synthesis so listening tasks work before audio exists.
 */
export function AudioPlayer({
  label,
  mediaUrl,
  transcript,
  revealTranscript,
}: {
  label?: string;
  mediaUrl?: string;
  transcript?: string;
  revealTranscript: boolean;
}) {
  const [speaking, setSpeaking] = useState(false);
  const canSpeak = useSyncExternalStore(noopSubscribe, () => "speechSynthesis" in window, () => false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function play() {
    if (!transcript) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = "de-DE";
    utterance.rate = 0.95;
    utterance.voice = synth.getVoices().find((v) => v.lang.startsWith("de")) ?? null;
    utterance.onend = utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-3 text-sm font-medium text-muted">{label ?? "Audio"}</p>
      {mediaUrl ? (
        <audio controls src={mediaUrl} className="w-full" preload="none" />
      ) : transcript && canSpeak ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={speaking ? stop : play}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
          >
            {speaking ? "■ Stop" : "▶ Play"}
          </button>
          <span className="text-xs text-muted">No recording yet — using your browser&apos;s German voice.</span>
        </div>
      ) : (
        <p className="text-sm text-muted">Audio is not available in this browser.</p>
      )}
      {transcript && revealTranscript && (
        <div className="mt-4">
          <button type="button" onClick={() => setShowTranscript((v) => !v)} className="text-sm font-medium text-primary">
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          {showTranscript && <p className="mt-2 whitespace-pre-line text-sm leading-6">{transcript}</p>}
        </div>
      )}
    </div>
  );
}
