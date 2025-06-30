import Cliente from "../modelo/cliente";

type Props = {
    clientes: Cliente[];
};

export default function Listagens(props: Props) {
    // A lógica original foi comentada porque o back-end atual
    // não fornece os dados de produtos e serviços consumidos por cliente.
    // Esta funcionalidade precisaria ser implementada no back-end para funcionar.

    /*
    const top10MaisConsumo = [...props.clientes]
        .sort((a, b) => (b.getProdutosConsumidos.length + b.getServicosConsumidos.length) - (a.getProdutosConsumidos.length + a.getServicosConsumidos.length))
        .slice(0, 10);

    const top10MenosConsumo = [...props.clientes]
        .sort((a, b) => (a.getProdutosConsumidos.length + a.getServicosConsumidos.length) - (b.getProdutosConsumidos.length + b.getServicosConsumidos.length))
        .slice(0, 10);
    
    const top5Valor = [...props.clientes].map(cliente => {
        const valorProdutos = cliente.getProdutosConsumidos.reduce((total, produto) => total + produto.preco, 0);
        const valorServicos = cliente.getServicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
        return {
            nome: cliente.nome,
            valor: valorProdutos + valorServicos
        };
    }).sort((a, b) => b.valor - a.valor).slice(0, 5);
    */

    return (
        <div className="container-fluid">
            <h4 className="my-4">Relatórios e Listagens</h4>

            <div className="alert alert-info" role="alert">
                As funcionalidades de listagem de maiores e menores consumidores não estão disponíveis, pois o back-end atual não fornece os dados de consumo.
            </div>
        </div>
    );
}