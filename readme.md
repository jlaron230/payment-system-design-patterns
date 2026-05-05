# Payment System (TypeScript)

Petit projet en TypeScript pour pratiquer les design patterns sur un cas concret de système de paiement.

## Objectif

Mettre en pratique :

* Strategy (gestion des moyens de paiement)
* Factory (création des stratégies)

## Fonctionnement

Une commande prend :

* un montant
* un type de paiement (`card`, `paypal`, `crypto`)

Chaque méthode applique ses propres frais :

* carte : 1%
* paypal : 2%
* crypto : 3%

Avec quelques règles métier :

* montant minimum : 1€
* crypto limité à 1000€

## Exemple

```ts
const commande = new Commande(100, "paypal");
commande.payer();
```

## Fichier

Tout le code est dans :

```
index.ts
```

## Notes

Projet simple pour comprendre comment structurer du code avec des patterns sans sur-ingénierie.
