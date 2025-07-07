import Produto from "../modelo/produto";

type Props = {
    produtos: Produto[],
    seletorView: (valor: string, e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ListaProduto(props: Props) {
    return (
        <div className="container-fluid">
            <h4 className="my-4">Lista de Produtos</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-dark">
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.produtos.map((produto: Produto, index: number) => (
                        <tr key={index}>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco.toFixed(2)}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={(e) => props.seletorView('Editar Produto', e)}>Editar</button>
                                <button className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={(e) => props.seletorView('Cadastrar Produto', e)}>Cadastrar Novo Produto</button>
        </div>
    )
}