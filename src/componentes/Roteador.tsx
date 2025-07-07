import { useState, useEffect, useCallback } from "react";
import BarraNavegacao from "./BarraNavegacao";
import ListaCliente from "./ListaCliente";
import FormularioCadastroCliente from "./FormularioCadastroCliente";
import ListaProduto from "./ListaProduto";
import FormularioCadastroProduto from "./FormularioCadastroProduto";
import ListaServico from "./ListaServico";
import FormularioCadastroServico from "./FormularioCadastroServico";
import Listagens from "./Listagens";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [cliente, setCliente] = useState<Cliente | null>(null);

    const fetchClientes = useCallback(async () => {
        try {

            const response = await fetch('/clientes');
            const data = await response.json();
            
            if (data._embedded && Array.isArray(data._embedded.clientes)) {
                setClientes(data._embedded.clientes);
            } else if (Array.isArray(data)) { 
                setClientes(data);
            } else {
                setClientes([]);
            }
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setClientes([]);
        }
    }, []);
    
    useEffect(() => {
        fetchClientes();
        setProdutos([new Produto('Produto Exemplo 1', 10.50)]);
        setServicos([new Servico('Serviço Exemplo 1', 50.00)]);
    }, [fetchClientes]);

    const excluirCliente = async (clienteParaExcluir: Cliente) => {
        try {
            const response = await fetch('/cliente/excluir', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: clienteParaExcluir.id })
            });

            if (response.ok) {
                alert('Cliente excluído com sucesso!');
                fetchClientes();
            } else {
                console.error('Falha ao excluir cliente:', response.statusText);
                alert('Falha ao excluir o cliente.');
            }
        } catch (error) {
            console.error("Erro de rede ao excluir cliente:", error);
            alert('Erro de rede ao excluir cliente.');
        }
    };

    const selecionarView = (novaTela: string, clienteSelecionado: Cliente | null) => {
        setTela(novaTela);
        setCliente(clienteSelecionado);
    };

    const handleAcaoClienteCompleta = () => {
        setTela('Clientes');
        fetchClientes();
    };

    const renderizarTela = () => {
        switch (tela) {
            case 'Cadastrar Cliente':
                return <FormularioCadastroCliente cliente={null} onActionComplete={handleAcaoClienteCompleta} />;
            case 'Editar Cliente':
                return <FormularioCadastroCliente cliente={cliente} onActionComplete={handleAcaoClienteCompleta} />;
            case 'Produtos':
                return <ListaProduto produtos={produtos} seletorView={(novaTela, e) => {e.preventDefault(); setTela(novaTela)}} />;
            case 'Cadastrar Produto':
                return <FormularioCadastroProduto seletorView={(novaTela, e) => {e.preventDefault(); setTela(novaTela)}} />
            case 'Serviços':
                return <ListaServico servicos={servicos} seletorView={(novaTela, e) => {e.preventDefault(); setTela(novaTela)}} />;
            case 'Cadastrar Serviço':
                return <FormularioCadastroServico seletorView={(novaTela, e) => {e.preventDefault(); setTela(novaTela)}} />
            case 'Listagens':
                return <Listagens clientes={clientes} />;
            default:
                return <ListaCliente clientes={clientes} seletorView={selecionarView} excluirCliente={excluirCliente} />;
        }
    }

    return (
        <>
            <BarraNavegacao seletorView={(novaTela, e) => { e.preventDefault(); setTela(novaTela)}} botoes={['Clientes', 'Produtos', 'Serviços', 'Listagens']} />
            <div className="container-fluid">
                {renderizarTela()}
            </div>
        </>
    );
}