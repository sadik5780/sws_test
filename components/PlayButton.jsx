"use client";

/**
 * The transport control. Nothing below the opening plays on its own, so every
 * film on the page carries one of these centred on its frame. Sits inside a
 * `.media-hold` (any positioned frame) and pairs with CinematicVideo's
 * `forceActive`, which is what overrides the usual autoplay-on-screen rule.
 */
export default function PlayButton({ playing, onClick, label }) {
  return (
    <button
      type="button"
      className="play-btn"
      data-playing={playing}
      onClick={onClick}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
    >
      {playing ? (
        <svg viewBox="0 0 12 14" aria-hidden="true">
          <rect x="0" y="0" width="4" height="14" />
          <rect x="8" y="0" width="4" height="14" />
        </svg>
      ) : (
        <svg viewBox="0 0 12 14" aria-hidden="true">
          <path d="M0 0l12 7-12 7z" />
        </svg>
      )}
    </button>
  );
}
