import React,{useState,useEffect} from 'react';
import './resources/styles/index.css'
import Mapa from './Mapa'

export default function Home() {

    const [data, setData] = useState([]);
    //const [component, setComponent] = useState(false);
    //const [valor, setValor] = useState("");
    const [alldata,setAlldata] = useState([]);
    //const [sendalldata,setSendalldata] = useState("");

    useEffect(() => {
        (async () => {
        const url = "https://us-west2-total-pad-307700.cloudfunctions.net/personasvacunadas"
        const result = await fetch(url);
        const dataset = await result.json();
        setData(dataset.list_countries);
        setAlldata(dataset.data)
        })();
    }, []);

    return (
        <>
            <div className="main-section big-circles">
                <section className="content-overview">
                    <div className="content-left">
                        <aside className="region-details">
                            <div>
                                <ul>
                                    <li className="principal-li">
                                        <div>
                                        <strong className="principal-strong"></strong>
                                        Region
                                        </div>
                                    </li>
                                    <li>
                                        <strong></strong>
                                        Casos
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className="content-center">
                        <div className="map">
                            <h3>Vacunados por COVID-19</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0,0,2000,900">
                               
                                    <Mapa data={data} />
                            
                            </svg>
                        </div>
                    </div>
                    <div className="content-right">
                    
                    </div>
                </section>
                <footer>
                </footer>
            </div>
        </>
    );
}