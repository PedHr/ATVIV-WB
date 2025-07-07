import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente {
    public id!: number
    public nome: string
    public sobreNome: string
    public email: string | null 
    public endereco: Endereco
    public telefones: Array<Telefone>
    public links: any[] = []; 

    constructor(nome: string, sobreNome: string, email: string | null, endereco: Endereco, telefones: Array<Telefone>) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.email = email;
        this.endereco = endereco;
        this.telefones = telefones;
    }
}