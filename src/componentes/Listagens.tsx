import Cliente from "../modelo/cliente";

type Props = {
    clientes: Cliente[];
};

export default function Listagens(props: Props) {
    return (
        <div className="container-fluid">
            <h4 className="my-4">Relatórios e Listagens</h4>

            <div className="alert alert-info" role="alert">
                As funcionalidades de listagem de maiores e menores consumidores não estão disponíveis, pois o back-end atual não fornece os dados de consumo.
            </div>
        </div>
    );
}