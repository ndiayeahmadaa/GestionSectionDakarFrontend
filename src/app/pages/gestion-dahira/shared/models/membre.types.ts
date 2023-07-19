import { Dahira } from './dahira.types';
import { Fonction } from './fonction.types';

export interface Membre {
// membre: Fonction;
id: number;
matricule: string;
prenom: string;
nom: string;
sexe: string;
telephone: string;
scolarite: string;
adresse: string;
age: number;
dahira: Dahira;
fonction: Fonction;

}
