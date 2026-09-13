"use client";

/**
 * At most one portfolio video plays at a time, sitewide. Every CinematicVideo
 * that starts playback calls `claim(id, pause)`; the singleton pauses
 * whoever held the claim before and remembers how to pause the new holder.
 *
 * The hero is exempt by convention — it never calls this (it's the one
 * video allowed to run underneath everything else).
 */
let current = null; // { id, pause }

export function claim(id, pause) {
  if (current && current.id !== id) current.pause();
  current = { id, pause };
}

export function release(id) {
  if (current && current.id === id) current = null;
}
