/*
  Site config: edit this file to swap photos and links. No other file needs to change.

  Photos: drop the image into the /images folder, then set "src" below to its path.
  If a file is missing, the page shows a purple placeholder that names the file it expects.

  Links: leave a value as "" to hide that button.
*/
window.SITE = {
  images: {
    profile:   { src: "images/profile.png",       alt: "Portrait of Ammar Aamir Khan" },

    boston1:   { src: "images/boston-health-1.jpg", alt: "Clinical deployment in Houston" },

    stanford1: { src: "images/stanford-1.jpg",    alt: "Stanford research project" },
    stanford2: { src: "images/stanford-2.jpg",    alt: "Working with the research team" },
    stanford3: { src: "images/stanford-3.jpg",    alt: "Presenting research" },

    // Climate Resilient Development, University of Aalborg (3 photos)
    aalborg1:  { src: "images/aalborg-1.jpg",     alt: "Climate resilient development at Aalborg" },
    aalborg2:  { src: "images/aalborg-2.jpg",     alt: "Aalborg project work" },
    aalborg3:  { src: "images/aalborg-3.jpg",     alt: "Aalborg team" },

    // Buraq: one tall (portrait) photo and one wide (landscape) photo
    buraqTall: { src: "images/buraq2.jpg",        alt: "Lecturing at the Buraq STEM camp" },
    buraqWide: { src: "images/buraq1.jpg",        alt: "Students at the Buraq STEM camp" }
  },

  links: {
    linkedin: "https://www.linkedin.com/in/ammar-aamir-khan-597a16257/",
    github:   "https://github.com/AmmarKhan2204",
    email:    "",   // e.g. "you@example.com"
    resume:   ""    // e.g. "resume.pdf" (put the file in the repo root)
  },

  // YouTube video ID shown under the Buraq section. Set to "" to hide it.
  buraqVideoId: "3wzoA-VQiH4"
};
