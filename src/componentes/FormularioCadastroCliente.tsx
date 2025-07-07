import { useState, useEffect } from 'react';
import Cliente from '../modelo/cliente';
import Endereco from '../modelo/endereco';
import Telefone from '../modelo/telefone';

type Props = {
    cliente: Cliente | null;
    onActionComplete: () => void;
};

export default function FormularioCadastroCliente(props: Props) {
    const [id, setId] = useState<number | undefined>(undefined);
    const [nome, setNome] = useState('');
    const [sobreNome, setSobreNome] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
    const [telefones, setTelefones] = useState<{ ddd: string, numero: string }[]>([{ ddd: '', numero: '' }]);

    useEffect(() => {
        if (props.cliente) {
            setId(props.cliente.id);
            setNome(props.cliente.nome);
            setSobreNome(props.cliente.sobreNome);
            setEmail(props.cliente.email || '');
            if (props.cliente.endereco) {
                setEstado(props.cliente.endereco.estado);
                setCidade(props.cliente.endereco.cidade);
                setBairro(props.cliente.endereco.bairro);
                setRua(props.cliente.endereco.rua);
                setNumero(props.cliente.endereco.numero);
                setCodigoPostal(props.cliente.endereco.codigoPostal);
                setInformacoesAdicionais(props.cliente.endereco.informacoesAdicionais);
            }
            if (props.cliente.telefones && props.cliente.telefones.length > 0) {
                setTelefones(props.cliente.telefones.map(t => ({ ddd: t.ddd, numero: t.numero })));
            }
        }
    }, [props.cliente]);

    const handleTelefoneChange = (index: number, field: 'ddd' | 'numero', value: string) => {
        const novosTelefones = [...telefones];
        novosTelefones[index][field] = value;
        setTelefones(novosTelefones);
    };

    const adicionarTelefone = () => {
        setTelefones([...telefones, { ddd: '', numero: '' }]);
    };

    const removerTelefone = (index: number) => {
        setTelefones(telefones.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const endereco = new Endereco(estado, cidade, bairro, rua, numero, codigoPostal, informacoesAdicionais);
        const telefonesModel = telefones.map(t => new Telefone(t.ddd, t.numero));
        const payload: Partial<Cliente> & { id?: number } = { nome, sobreNome, email, endereco, telefones: telefonesModel };
        
        let url = '/cliente/cadastrar';
        let method = 'POST';

        if (props.cliente) {
            payload.id = id;
            url = '/cliente/atualizar';
            method = 'PUT'; // CORRETO AGORA
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if(response.ok) {
                alert(`Cliente ${props.cliente ? 'atualizado' : 'cadastrado'} com sucesso!`);
                props.onActionComplete();
            } else {
                 throw new Error(`Falha ao salvar cliente: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            alert('Erro ao salvar cliente.');
        }
    };

    return (
        <div className="container-fluid">
            <h4 className="my-4">{props.cliente ? 'Edição de Cliente' : 'Cadastro de Cliente'}</h4>
            <form>
                <h5>Dados Pessoais</h5>
                <div className="row">
                    <div className="col-md-6 mb-3"><label className="form-label">Nome</label><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" /></div>
                    <div className="col-md-6 mb-3"><label className="form-label">Sobrenome</label><input type="text" value={sobreNome} onChange={(e) => setSobreNome(e.target.value)} className="form-control" /></div>
                    <div className="col-md-12 mb-3"><label className="form-label">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" /></div>
                </div>
                <h5>Endereço</h5>
                <div className="row">
                    <div className="col-md-4 mb-3"><label className="form-label">Estado</label><input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="form-control" /></div>
                    <div className="col-md-4 mb-3"><label className="form-label">Cidade</label><input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="form-control" /></div>
                    <div className="col-md-4 mb-3"><label className="form-label">Bairro</label><input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="form-control" /></div>
                    <div className="col-md-8 mb-3"><label className="form-label">Rua</label><input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="form-control" /></div>
                    <div className="col-md-4 mb-3"><label className="form-label">Número</label><input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control" /></div>
                    <div className="col-md-4 mb-3"><label className="form-label">CEP</label><input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} className="form-control" /></div>
                    <div className="col-md-8 mb-3"><label className="form-label">Complemento</label><input type="text" value={informacoesAdicionais} onChange={(e) => setInformacoesAdicionais(e.target.value)} className="form-control" /></div>
                </div>
                <h5>Telefones</h5>
                {telefones.map((tel, index) => (
                    <div className="row align-items-end mb-3" key={index}>
                        <div className="col-md-3"><label className="form-label">DDD</label><input type="text" value={tel.ddd} onChange={(e) => handleTelefoneChange(index, 'ddd', e.target.value)} className="form-control" /></div>
                        <div className="col-md-7"><label className="form-label">Número</label><input type="text" value={tel.numero} onChange={(e) => handleTelefoneChange(index, 'numero', e.target.value)} className="form-control" /></div>
                        <div className="col-md-2"><button className="btn btn-danger btn-sm" type="button" onClick={() => removerTelefone(index)}>Remover</button></div>
                    </div>
                ))}
                <button className="btn btn-secondary mb-3" type="button" onClick={adicionarTelefone}>+ Telefone</button>
                <div className="mt-3"><button className="btn btn-primary" type="submit" onClick={handleSubmit}>{props.cliente ? 'Atualizar' : 'Cadastrar'}</button></div>
            </form>
        </div>
    );
}