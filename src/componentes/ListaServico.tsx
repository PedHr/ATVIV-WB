import Servico from "../modelo/servico";

type Props = {
    servicos: Servico[],
    seletorView: (valor: string, e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ListaServico(props: Props) {
    return (
        <div className="container-fluid">
            <h4 className="my-4">Lista de Serviços</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-dark">
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.servicos.map((servico: Servico, index: number) => (
                        <tr key={index}>
                            <td>{servico.nome}</td>
                            <td>R$ {servico.preco.toFixed(2)}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={(e) => props.seletorView('Editar Serviço', e)}>Editar</button>
                                <button className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             <button className="btn btn-success" onClick={(e) => props.seletorView('Cadastrar Serviço', e)}>Cadastrar Novo Serviço</button>
        </div>
    )
}