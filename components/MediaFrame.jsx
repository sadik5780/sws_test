"use client";

import CinematicVideo from "@/components/CinematicVideo";

/**
 * A MEDIA-AWARE FRAME.
 *
 * The one thing every generic "ProjectCard" gets wrong: it decides a box
 * shape first and crops whatever video lands inside it. This does the
 * opposite — it never sets a width AND a height. Each orientation fixes
 * exactly one dimension (the one the calling scene's layout needs to line
 * frames up on) and leaves the other to fall out of the real aspect ratio
 * via the browser's own `aspect-ratio` box math, so nothing is ever cropped
 * to fit. `orientation` and `role` are just CSS hooks (`frame--portrait`,
 * `frame--hero`, etc.) — each scene's stylesheet decides what "fixed
 * dimension" means for its own composition (a shared row height in SC01, a
 * shared column width in SC02/SC03).
 */
export default function MediaFrame({
  media,
  role = "hero",
  className = "",
  ...rest
}) {
  const orientation = media.orientation || "landscape";
  return (
    <CinematicVideo
      {...rest}
      src={media.src}
      poster={media.poster}
      aspectRatio={media.aspectRatio}
      className={`frame frame--${orientation} frame--${role} ${className}`}
    />
  );
}
