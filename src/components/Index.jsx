import {useEffect, useState} from "react";

function Index(props){

    const [cidade, setCidade] = useState("São Paulo")
    const [info, setInfo] = useState({})
    const [atual, setAtual] = useState(0)
    const [todos, setTodos] = useState([])
    const [noturno , setNoturno] =  useState("")


    // esse useEffect é para carregar a função BuscarCidade assim que a pagina for carregada
    useEffect(() => {
        BucarCidade()
    }, []);

    async function BucarCidade(){
        // o cors serve como uma prioridade e da a um site o acesso ou permissão para adentrar em outro mecanismo externo
        let url = "https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=9260257f&city_name="+cidade
        let resposta = await fetch(url)
        resposta = await resposta.json()

        console.log(resposta)

        if (resposta.results?.temp !== undefined) {
            setInfo(resposta.results.forecast[0])
            setAtual(resposta.results.temp)
            setTodos(resposta.results.forecast)
        }
    }

    function alterarTema() {
        if (noturno === "") {
            setNoturno("noturno")
        } else {
            setNoturno("")
        }
    }



    return(

        <div className={"container-fluid text-center tudinho " + noturno}>
            <div className="tudo">
            <div className="row header" >

                <div className="col-sm-2 lado ">
                    <img className="logo" src="/Logo.png"/>
                    <img className="logonoite" src="/LogoNoiteSemFundo.webp" />
                </div>

                <div className="col-sm-8 ">
                    <input className="inp" placeholder="Nome da cidade e estado..." value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    <button className="bb" onClick={BucarCidade}><img className="lupa" src="/LupaIcon.png"/></button>
                </div>

                <div className="col-sm-2 lado ">
                    <button className="lado " onClick={alterarTema}>
                        <img className="moon" src="/lua_ico.png"/>
                        <img className="sun" src="/sun-icon-removebg-preview.png" /></button>
                </div>


            </div>
                <div className="d-flex flex-column align-items-center aqui">
                    <div className="row  maior" style={{backgroundImage: `url(/${info.condition}.gif)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div className="col-md-6 d-flex flex-column align-items-center">
                            <div className="row">
                                <h3 className="branco">{cidade}</h3>
                                <p className="branco">{info.weekday},{info.date}</p>
                            </div>
                            <div className="row divsinha">
                                <p></p>
                                <p > Velocidade do vento: {info.wind_speedy}</p>
                                <p >Probabilidade de chuva: {info.rain_probability}%</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-center aqui ">
                            <div className="col-md-12 divsona ">
                                <img src={`https://assets.hgbrasil.com/weather/icons/conditions/${info.condition}.svg`} />
                                <h4 className="cor">{atual}°C</h4>
                                <p className="cor">{info.max}°C - {info.min}°C</p>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="gerar">
                    {/*isso percore  a minha lista e expoem os valores que eu desejo*/}
                    {todos.map((item) => (
                        <div className="col-md-2 quadros" >
                             <p className="cor">{item.date}</p>
                            <img src={`https://assets.hgbrasil.com/weather/icons/conditions/${item.condition}.svg`} />
                            <p className="cor">{item.max}°C-{item.min}°C </p>
                            <p className="cor">{item.rain_probability}%</p>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index