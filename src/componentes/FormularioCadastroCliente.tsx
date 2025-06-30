import { useState, useEffect } from 'react';
import Cliente from '../modelo/cliente';
import CPF from '../modelo/cpf';

type Props = {
    cliente: Cliente | null;
    onActionComplete: () => void;
    clientes: Cliente[];
    setClientes: (clientes: Cliente[]) => void;
};

export default function FormularioCadastroCliente(props: Props) {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [genero, setGenero] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataEmissaoCpf, setDataEmissaoCpf] = useState('');

    useEffect(() => {
        if (props.cliente) {
            setNome(props.cliente.nome);
            setNomeSocial(props.cliente.nomeSocial);
            setGenero(props.cliente.genero);
            setCpf(props.cliente.getCpf.getValor);
            setDataEmissaoCpf(new Date(props.cliente.getCpf.getDataEmissao).toISOString().split('T')[0]);
        }
    }, [props.cliente]);

    const handleSubmit = () => {
        if (props.cliente) {
            // Edição
            const clientesAtualizados = props.clientes.map(c => {
                if (c.getCpf.getValor === props.cliente?.getCpf.getValor) {
                    c.nome = nome;
                    c.nomeSocial = nomeSocial;
                    c.genero = genero;
                    return c;
                }
                return c;
            });
            props.setClientes(clientesAtualizados);
        } else {
            // Cadastro
            const novoCpf = new CPF(cpf, new Date(dataEmissaoCpf));
            const novoCliente = new Cliente(nome, nomeSocial, genero, novoCpf);
            props.setClientes([...props.clientes, novoCliente]);
        }
        props.onActionComplete();
    };

    return (
        <div className="container-fluid">
            <h4 className="my-4">{props.cliente ? 'Edição de Cliente' : 'Cadastro de Cliente'}</h4>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome Social</label>
                    <input type="text" className="form-control" placeholder="Nome social" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gênero</label>
                    <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                        <option>Selecione seu gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} readOnly={!!props.cliente} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Data de Emissão do CPF</label>
                    <input type="date" className="form-control" value={dataEmissaoCpf} onChange={(e) => setDataEmissaoCpf(e.target.value)} readOnly={!!props.cliente} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>{props.cliente ? 'Atualizar' : 'Cadastrar'}</button>
                </div>
            </form>
        </div>
    );
}