import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    botoes: string[],
    seletorView: (valor: string, e: React.MouseEvent<HTMLButtonElement>) => void
};

export default function BarraNavegacao(props: Props) {
    const gerarBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>;
        } else {
            return props.botoes.map(valor => (
                <li key={valor} className="nav-item">
                    <button className="nav-link btn-link" onClick={(e) => props.seletorView(valor, e)}>{valor}</button>
                </li>
            ));
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">World Beauty</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {gerarBotoes()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}