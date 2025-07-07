import Cliente from "../modelo/cliente";

type Props = {
    clientes: Cliente[],
    seletorView: (valor: string, cliente: Cliente | null) => void,
    excluirCliente: (cliente: Cliente) => void
}

export default function ListaCliente(props: Props) {
    return (
        <div className="container-fluid">
            <h4 className="my-4">Lista de Clientes</h4>
            <div className="list-group">
                {props.clientes.length > 0 ? (
                    props.clientes.map((cliente) => (
                        <div key={cliente.id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{cliente.nome} {cliente.sobreNome}</h5>
                                <small>ID: {cliente.id}</small>
                            </div>
                            <p className="mb-1">{cliente.email || 'Email não cadastrado'}</p>
                            <small>{cliente.endereco ? `${cliente.endereco.rua}, ${cliente.endereco.numero}` : 'Endereço não cadastrado'}</small>
                            <div className="mt-2">
                                <button className="btn btn-primary btn-sm me-2" onClick={() => props.seletorView('Editar Cliente', cliente)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => props.excluirCliente(cliente)}>Excluir</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info" role="alert">
                        Nenhum cliente encontrado.
                    </div>
                )}
            </div>
            <button className="btn btn-success mt-3" onClick={() => props.seletorView('Cadastrar Cliente', null)}>Cadastrar Novo Cliente</button>
        </div>
    );
}