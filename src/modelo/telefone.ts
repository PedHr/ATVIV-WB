export default class Telefone {
    public id!: number;
    public ddd: string;
    public numero: string;
    public links: any[] = []; // Adicionado para corresponder ao JSON

    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }
}