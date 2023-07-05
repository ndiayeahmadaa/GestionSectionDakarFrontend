
export class DialogUtil {
    static confirmer = 'CONFIRMER';
    static annuler = 'ANNULER';
}
export class NotificationUtil {
    static ajout = 'AJOUT REUSSI';
    // tslint:disable-next-line:no-inferrable-types
    static modification: string = 'MODIFICATION REUSSIE';
    static suppression = 'SUPPRESSION REUSSIE';
    static validation = 'TRAITEMENT REUSSI';
    static cocher = 'VEUILLEZ COCHER UN ELEMENT AU MOINS';
    static echec = 'TRAITEMENT ECHOUE';
    static rejet = 'REJET REUSSI';
    static cloture = 'CLÔTURE REUSSIE';
    static transmis = 'TRANSMISSION REUSSIE';
    static impute = 'IMPUTATION REUSSIE';
    static ouvertureDossier = 'DOSSIER OUVERT';
    static envoyeDossier = 'DOSSIER ENVOYE';
    static fermetureDossier = 'DOSSIER FERME';
    static vide = 'Aucun élément Disponible!';
}
export class ValidationChamps {
    email = '[A-Za-z]+[0-9]*[\.]*[0-9]*[A-Za-z]*[0-9]*(@portdakar\.sn)';
    telephone = '[7][8760][0-9]{7}';
    chaine = '[A-Za-z]+[ ]*[A-Za-z]*[ ]*[A-Za-z]*[ ]*[0-9]*';
}
// export class MailDossierConge {
//     static objet: string = 'DOSSIER CONGE ' + new Date().getFullYear() + ' ';
//     static content =
//         'Le dossier conge de l\\'annee ' + new Date().getFullYear() + ' est ouvert.\n' +
//         ' Veuillez ajouter vos plannings conges.'
// }
export class MailClotureAttestation {
    static susbject = 'Disponibilité de l\'attestation de travail';
    static content =
        'Bonjour, \nVotre demande d\'attestation de travail a été traitée avec succés et est disponible dans votre espace privé ';

}
export class MailRejeterAttestation {
    static susbject = 'Rejet de la demande d\'attestation de travail ';
    static content = 'Votre demande d\'attestation de travail a été rejeter ';
    static commentaire = 'rejeter';
}

