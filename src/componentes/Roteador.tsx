import { useState, useEffect } from "react";
import BarraNavegacao from "./BarraNavegacao";
import ListaCliente from "./ListaCliente";
import FormularioCadastroCliente from "./FormularioCadastroCliente";
import ListaProduto from "./ListaProduto";
import FormularioCadastroProduto from "./FormularioCadastroProduto";
import ListaServico from "./ListaServico";
import FormularioCadastroServico from "./FormularioCadastroServico";
import Listagens from "./Listagens";

// Importando os modelos originais
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import CPF from "../modelo/cpf";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [cliente, setCliente] = useState<Cliente | null>(null);

    // Função para gerar dados de exemplo, como era no início
    const popularDados = () => {
        const clientesIniciais: Cliente[] = [];
        const produtosIniciais: Produto[] = [];
        const servicosIniciais: Servico[] = [];

        // Clientes
        const nomes = ["Ana", "Bruno", "Carla", "Daniel", "Eduarda", "Felipe", "Gabriela", "Hugo", "Isabela", "João", "Laura"];
        const generos = ["F", "M", "F", "M", "F", "M", "F", "M", "F", "M", "F"];
        for (let i = 0; i < nomes.length; i++) {
            const cpf = new CPF(`${i + 1}`.padStart(11, '0'), new Date(2000, i % 12, (i % 28) + 1));
            const cliente = new Cliente(nomes[i], `Social ${nomes[i]}`, generos[i], cpf);
            // @ts-ignore
            cliente.id = i + 1; // Adicionando um ID para simular o banco de dados
            clientesIniciais.push(cliente);
        }

        // Produtos
        const nomesProdutos = ["Esmalte", "Shampoo", "Condicionador", "Creme Hidratante", "Óleo para Cabelo"];
        for (let i = 0; i < nomesProdutos.length; i++) {
            const preco = parseFloat((10 + Math.random() * 50).toFixed(2));
            const produto = new Produto(nomesProdutos[i], preco);
            // @ts-ignore
            produto.id = i + 1;
            produtosIniciais.push(produto);
        }

        // Serviços
        const nomesServicos = ["Manicure", "Pedicure", "Corte de Cabelo", "Escova", "Pintura"];
        for (let i = 0; i < nomesServicos.length; i++) {
            const preco = parseFloat((30 + Math.random() * 100).toFixed(2));
            const servico = new Servico(nomesServicos[i], preco);
            // @ts-ignore
            servico.id = i + 1;
            servicosIniciais.push(servico);
        }

        // Consumos Aleatórios
        for (const cliente of clientesIniciais) {
            let numConsumos = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < numConsumos; i++) {
                if (Math.random() > 0.4 && produtosIniciais.length > 0) {
                    cliente.consumirProduto(produtosIniciais[Math.floor(Math.random() * produtosIniciais.length)]);
                } else if (servicosIniciais.length > 0) {
                    cliente.consumirServico(servicosIniciais[Math.floor(Math.random() * servicosIniciais.length)]);
                }
            }
        }
        
        setClientes(clientesIniciais);
        setProdutos(produtosIniciais);
        setServicos(servicosIniciais);
    };

    // UseEffect agora chama a função que cria os dados locais
    useEffect(() => {
        popularDados();
    }, []);

    const selecionarView = (novaTela: string, cliente: Cliente | null) => {
        setTela(novaTela);
        setCliente(cliente);
    };

    const handleAcaoCliente = () => {
        // Esta função agora apenas redireciona para a lista de clientes.
        // A lógica de adicionar/atualizar está no formulário.
        setTela('Clientes');
    };
    
    // Função para simular a exclusão
    const excluirCliente = (clienteParaExcluir: Cliente) => {
        setClientes(clientes.filter(c => c.getCpf.getValor !== clienteParaExcluir.getCpf.getValor));
    };
    
    const barraNavegacao = <BarraNavegacao seletorView={(tela, e) => { e.preventDefault(); selecionarView(tela, null)}} botoes={['Clientes', 'Produtos', 'Serviços', 'Listagens']} />;

    switch (tela) {
        case 'Cadastrar Cliente':
            return <>{barraNavegacao}<FormularioCadastroCliente cliente={null} onActionComplete={handleAcaoCliente} setClientes={setClientes} clientes={clientes} /></>;
        case 'Editar Cliente':
            return <>{barraNavegacao}<FormularioCadastroCliente cliente={cliente} onActionComplete={handleAcaoCliente} setClientes={setClientes} clientes={clientes} /></>;
        case 'Produtos':
            return <>{barraNavegacao}<ListaProduto produtos={produtos} seletorView={(tela, e) => { e.preventDefault(); selecionarView(tela, null)}} /></>;
        case 'Cadastrar Produto':
        case 'Editar Produto':
            return <>{barraNavegacao}<FormularioCadastroProduto seletorView={(tela, e) => { e.preventDefault(); selecionarView(tela, null)}} /></>;
        case 'Serviços':
            return <>{barraNavegacao}<ListaServico servicos={servicos} seletorView={(tela, e) => { e.preventDefault(); selecionarView(tela, null)}} /></>;
        case 'Cadastrar Serviço':
        case 'Editar Serviço':
            return <>{barraNavegacao}<FormularioCadastroServico seletorView={(tela, e) => { e.preventDefault(); selecionarView(tela, null)}} /></>;
        case 'Listagens':
            return <>{barraNavegacao}<Listagens clientes={clientes} /></>;
        default: // Clientes
            return <>{barraNavegacao}<ListaCliente clientes={clientes} seletorView={selecionarView} excluirCliente={excluirCliente} /></>;
    }
}