//payment-system-design-patterns
// Mini projet en TypeScript illustrant plusieurs design patterns :
//     - Strategy (gestion des moyens de paiement)
// - Factory (création des stratégies)
// - logique métier (frais, validation)
//
// Objectif : améliorer la structuration du code et comprendre les patterns en situation réelle.


//Interface commune pour tous les moyens de paiements
interface PaiementStrategy {
    payer(montant: number): void;

    calculFrais(montant: number): number;
}

//implémentation pour le montant et le calcul de frais pour une carte de crédit 1%
class PaiementCarte implements PaiementStrategy {
    payer(montant: number): void {
        console.log(`Paiement de ${montant}€ par carte`);
    }

    calculFrais(montant: number): number {
        return montant * 0.01;
    }
}

//implémentation pour le montant et le calcul de frais pour un paiement via paypal 2%
class PaiementPaypal implements PaiementStrategy {
    payer(montant: number): void {
        console.log(`Paiement de ${montant}€ par Paypal`);
    }

    calculFrais(montant: number): number {
        return montant * 0.03;
    }
}

//implémentation pour le montant et le calcul de frais pour un paiement en crypto 3%
class PaiementCrypto implements PaiementStrategy {
    payer(montant: number): void {
        console.log(`Paiement de ${montant}€ par Crypto`);
    }

    calculFrais(montant: number): number {
        return montant * 0.02;
    }
}

//class factory pour trier le type de méthode de paiement et retourner la class du type de paiement
class PaiementFactory {
    static create(type: string): PaiementStrategy {
        switch (type) {
            case "card":
                return new PaiementCarte();
            case "paypal":
                return new PaiementPaypal();
            case "crypto":
                return new PaiementCrypto();
            default:
                throw new Error("Type inconnu");
        }
    }
}

//initialise le montant, la stratégie de paiement et le type, puis effectue le calcul des frais et retourne le résultat total
class Commande {
    private montant: number;
    private strategy!: PaiementStrategy;
    private type: string;

    constructor(montant: number, type: string) {
        this.montant = montant;
        this.strategy = PaiementFactory.create(type)
        this.type = type;
    }

    payer() {
        if (this.montant < 1) {
            console.log("le montant est inférieur a 1 euros")
            return;
        }

        const frais = this.strategy.calculFrais(this.montant)
        const total = this.montant + frais;

        if (this.type === "crypto" && this.montant > 1000) {
            console.log("Le montant est de plus de 1000 euros et en crypto")
            return;
        }
        console.log(`Montant initial : ${this.montant}€`);
        console.log(`Frais appliqués : ${frais}€`);
        console.log(`Montant final : ${total}€`);

        this.strategy.payer(total);
    }

}

const commande = new Commande(1001, "card");
commande.payer();