export default class Endereco {
    public id!: number;
    public estado: string;
    public cidade: string;
    public bairro: string;
    public rua: string;
    public numero: string;
    public codigoPostal: string;
    public informacoesAdicionais: string;
    public links: any[] = [];

    constructor(estado: string, cidade: string, bairro: string, rua: string, numero: string, codigoPostal: string, informacoesAdicionais: string) {
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.codigoPostal = codigoPostal;
        this.informacoesAdicionais = informacoesAdicionais;
    }
}