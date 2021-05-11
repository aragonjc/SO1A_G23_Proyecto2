import React,{useState,useEffect} from 'react'
import './resources/styles/showData.css'
import SearchGender from './SearchGender'

export default function ByGender() {
    
    const [data, setData] = useState([]);
    const [component, setComponent] = useState(false);
    const [valor, setValor] = useState("");
    

    useEffect(() => {
        (async () => {
        const url = "http://localhost:3000/api/countries"
        const result = await fetch(url);
        const dataset = await result.json();
        setData(dataset.countries);
        })();
    }, []);

    function huboCambio(e) {
        setValor(e.target.value)
        setComponent(false)
    }

    const LoadComponent =  () => {
        
        setComponent(true);
      };

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
                            {component == true && valor != "" && <SearchGender country={valor}/>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}