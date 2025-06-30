export default class Telefone {
    public id!: number;
    public ddd: string;
    public numero: string;

    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }
}