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

    // Aalborg collage: aalborg1 is tall (portrait), aalborg2 is a smaller portrait, aalborg3 is wide (landscape)
    aalborg1:  { src: "images/aalborg-1.jpg",     alt: "Port of Aalborg redevelopment project" },
    aalborg2:  { src: "images/aalborg-2.jpg",     alt: "Stakeholder interviews in Aalborg" },
    aalborg3:  { src: "images/aalborg-3.jpg",     alt: "Client presentation at Aalborg University" },

    // Green Innovation Network: gin1 is tall (portrait), gin2 is wide (landscape)
    gin1:      { src: "images/gin-1.jpg",        alt: "Green Innovation Network event" },
    gin2:      { src: "images/gin-2.jpg",        alt: "Green Innovation Network workshop" },

    // Buraq: one tall (portrait) photo and one wide (landscape) photo
    buraqTall: { src: "images/buraq2.jpg",        alt: "Lecturing at the Buraq STEM camp" },
    buraqWide: { src: "images/buraq1.jpg",        alt: "Students at the Buraq STEM camp" }
  },

  links: {
    linkedin: "https://www.linkedin.com/in/ammar-aamir-khan-597a16257/",
    github:   "https://github.com/AmmarKhan2204",
    email:    "",   // e.g. "you@example.com"
    resume:   ""    // e.g. "resume.pdf" (put the file in the repo root)
  }
};
