type Props = {
    seletorView: (valor: string, e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FormularioCadastroServico(props: Props) {
    return (
        <div className="container-fluid">
            <h4 className="my-4">Cadastro de Serviço</h4>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" placeholder="Nome do serviço" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input type="number" step="0.01" className="form-control" placeholder="R$ 0,00" />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="button" onClick={(e) => props.seletorView('Serviços', e)}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}