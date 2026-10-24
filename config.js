/* ============================================================
   TOUS LES TEXTES DU SITE SE MODIFIENT ICI
   Changez seulement ce qui est entre guillemets "…".
   ============================================================ */
window.CONFIG = {

  titrePage: "Don Veral & Leslie — Invitation de mariage",

  /* ---- Les mariés et la date ---- */
  prenom1: "Don Veral",
  prenom2: "Leslie",
  initiales: "D&L",                       // sur le cachet de cire
  initialesPied: "D & L",                 // dans le pied de page
  dateISO: "2027-09-16T12:00:00+01:00",   // AAAA-MM-JJTHH:MM — le +01:00 = heure de Pointe-Noire
  fuseau: "Africa/Brazzaville",

  /* ---- L'enveloppe ---- */
  ouverture: {
    bouton: "Ouvrir notre invitation",
    carteHaut: "Vous êtes invités",
    carteBas: "Pointe-Noire"
  },

  /* ---- 1. Accueil ---- */
  accueil: {
    photo: "photos/couple.jpg",
    photoAlt: "Don Veral et Leslie",
    surtitre: "Nous nous marions",
    phrase: "C’est avec une immense joie que nous vous invitons à célébrer le plus beau jour de notre vie, entourés de celles et ceux qui nous sont chers.",
    jours: "Jours", heures: "Heures", minutes: "Minutes", secondes: "Secondes",
    jourJ: "Le grand jour est arrivé"
  },

  /* ---- 2. Notre histoire ---- */
  histoire: {
    titre: "Notre histoire",
    intro: "Quelques pages d’une histoire qui continue de s’écrire.",
    etapes: [
      { quand: "Le commencement", titre: "La rencontre",
        texte: "Nos chemins se sont croisés presque par hasard. Un regard, un sourire, et quelque chose a commencé." },
      { quand: "Les premiers pas", titre: "Le premier rendez-vous",
        texte: "Un moment simple, des heures qui passent trop vite, et l’envie évidente de se revoir." },
      { quand: "Le grand oui", titre: "La demande en mariage",
        texte: "Une question, des larmes de joie, et un « oui » qui a ouvert le plus beau des chapitres." }
    ]
  },

  /* ---- 3. Galerie (4 à 6 photos : ajoutez ou retirez des lignes) ---- */
  galerie: {
    titre: "Nos moments",
    photos: [
      { src: "photos/galerie-1.jpg", alt: "Don Veral et Leslie, souvenir 1" },
      { src: "photos/galerie-2.jpg", alt: "Don Veral et Leslie, souvenir 2" },
      { src: "photos/galerie-3.jpg", alt: "Don Veral et Leslie, souvenir 3" },
      { src: "photos/galerie-4.jpg", alt: "Don Veral et Leslie, souvenir 4" },
      { src: "photos/galerie-5.jpg", alt: "Don Veral et Leslie, souvenir 5" }
    ]
  },

  /* ---- 4. Le programme ---- */
  programme: {
    titre: "Le programme",
    moments: [
      { heure: "12h00", titre: "Accueil", texte: "Installez-vous, retrouvez les vôtres : la journée commence dans la joie." },
      { heure: "12h30", titre: "Cérémonie", texte: "L’échange des consentements et des alliances." },
      { heure: "14h00", titre: "Photos", texte: "Des souvenirs avec la famille et les amis." },
      { heure: "15h00", titre: "Repas", texte: "Un déjeuner festif pour partager ce moment ensemble." },
      { heure: "17h30", titre: "Remerciements", texte: "Quelques mots pour vous dire merci, du fond du cœur." }
    ]
  },

  /* ---- 5. Le lieu ---- */
  lieu: {
    titre: "Le lieu",
    nom: "Domicile familial",
    adresse: ["Songolo", "Pointe-Noire, République du Congo"],
    note: "Le plan ci-dessous vous aidera à nous retrouver.",
    // Texte envoyé à Google Maps. Pour plus de précision, mettez des coordonnées GPS, ex. "-4.7761,11.8635"
    recherche: "Songolo, Pointe-Noire, République du Congo",
    bouton: "Ouvrir l’itinéraire"
  },

  /* ---- 6. Tenue ---- */
  tenue: {
    titre: "Tenue",
    texte: "Élégance chaleureuse, aux couleurs de la terre. Nous aimerions vous voir dans ces teintes ; merci de laisser le blanc à la mariée.",
    couleurs: [
      { nom: "Crème", hex: "#F2E8D5" },
      { nom: "Terracotta", hex: "#A64B2E" },
      { nom: "Brun profond", hex: "#2B1A13" }
    ]
  },

  /* ---- 7. Confirmer ma présence ---- */
  rsvp: {
    titre: "Confirmer ma présence",
    texte: "Votre présence sera notre plus beau cadeau. Merci de nous dire si vous serez des nôtres.",
    dateLimite: "Réponse attendue avant le 15 août 2027",
    bouton: "Remplir le formulaire",
    url: "https://forms.gle/REMPLACEZ-PAR-VOTRE-LIEN"   // lien de votre Google Forms
  },

  /* ---- 8. Pied de page ---- */
  pied: {
    phrase: "Merci de faire partie de notre histoire",
    hashtag: "#DonEtLeslie"
  }
};
