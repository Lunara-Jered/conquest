# Assets — à remplacer

Ce dossier est prévu pour les fichiers officiels de la marque CONQUEST.
Aucun logo n'a été fourni : le header, le footer et les cartes utilisent
un placeholder texte/typographique (`CONQUEST` + un petit triangle rouge)
en attendant les vrais fichiers.

À déposer ici, avec ces noms exacts pour un remplacement direct dans le code :

- `logo-conquest.svg` — logo typographique (wordmark), zones institutionnelles
- `logo-conquest-symbol.svg` — emblème seul, icône de marque
- `logo-rsg.svg` — logo « CONQUEST RSG — Rendez-vous du Sport Gabonais », usage événementiel uniquement
- `og-conquest.jpg` — image de partage (Open Graph), 1200×630px

## Photographies

Toutes les zones photo du site (`<div class="ph">`) sont des placeholders
CSS avec une légende (`data-ph="..."`) indiquant le sujet attendu
(ex. "Piste — Sprint / Demi-fond / Fond"). Pour remplacer une zone par une
vraie photo :

```html
<div class="ph" style="background-image:url('assets/photos/sprint-01.jpg'); background-size:cover; background-position:center;">
</div>
```

Privilégier des formats WebP/AVIF compressés et des visuels d'athlètes
africains / gabonais en mouvement (piste, terrain, entraînement,
compétition), traitement contrasté et cinématique, cohérent avec la
charte noir / rouge CONQUEST / argent.

## Statistiques

Les chiffres de la section "Le mouvement est en marche" (page d'accueil)
sont marqués comme provisoires (`<div class="prov">Chiffre provisoire</div>`)
et modifiables directement dans `index.html` via l'attribut `data-count`.

## Réseaux sociaux

Les liens du footer (`FB`, `IG`, `TT`, `YT`, `IN`) sont des placeholders
`href="#"` — à remplacer par les vraies URLs des comptes CONQUEST.

## Formulaires

Les formulaires (page `rejoindre.html`) interceptent actuellement la
soumission côté client (`js/main.js`, écouteur `data-conquest-form`) et
affichent un message de confirmation local. Ils sont prêts à être branchés
sur un service backend ou une base de données (endpoint `fetch`/`POST` à
ajouter dans le même écouteur).
