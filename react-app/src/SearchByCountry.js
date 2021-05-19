import React,{useState,useEffect, useMemo} from 'react';
import './resources/styles/showData.css'
import IntermedianSearch from './IntermdianSearch'

export default function SearchByCountry() {

    const [data, setData] = useState([]);
    const [component, setComponent] = useState(false);
    const [valor, setValor] = useState("");
    let value = "Hola";
    let cond = true;

    useEffect(() => {
        (async () => {
        const url = "http://34.66.107.110:3000/api/countries"
        const result = await fetch(url);
        const dataset = await result.json();
        setData(dataset.countries);
        })();
    }, []);

    function huboCambio(e) {
        value = e.target.value;
        setValor(e.target.value)
        setComponent(false)
        console.log(e.target.value)
    }

    const LoadComponent =  () => {
        
        setComponent(true);
      };

    function hizoClick() {
        cond = true;
        console.log("HIZO CLIck")
        console.log(cond)
        
    }
    return (
        
        <>
            <div className="main">
            <section className="content-table">
                    <div className="content-center">
                        <div className="main-table">
                            <label htmlFor="countires">Seleccionar Pais</label>
                            
                            <select name="countries" id="countries" onChange={huboCambio}>
                            <option disabled selected value> -- seleccion un pais -- </option>
                            {
                                
                                data.map((element,index) => 
                                    <option key={index} value={element}>{element}</option>
                                    
                                )
                                
                            }
                            </select> 
                            <button onClick={LoadComponent}>Seleccionar</button>
                            {component == true && valor != "" && <IntermedianSearch country={valor}></IntermedianSearch>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}