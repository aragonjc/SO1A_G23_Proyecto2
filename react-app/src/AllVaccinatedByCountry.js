import React,{useState,useEffect} from 'react'
import './resources/styles/showData.css'
import ShowPeopleByCountry from './ShowPeopleByCountry'

export default function AllVaccinatedByCountry() {
    
    const [data, setData] = useState([]);
    const [component, setComponent] = useState(false);
    const [valor, setValor] = useState("");
    const [alldata,setAlldata] = useState([]);
    const [sendalldata,setSendalldata] = useState("");

    useEffect(() => {
        (async () => {
        const url = "https://us-west2-total-pad-307700.cloudfunctions.net/personasvacunadas"
        const result = await fetch(url);
        const dataset = await result.json();
        //console.log(dataset.list_countries)
        setData(dataset.list_countries);
        setAlldata(dataset.data)
        })();
    }, []);

    function huboCambio(e) {
        setValor(e.target.value)
        setComponent(false)
    }

    const LoadComponent =  () => {
        let newData = JSON.stringify(alldata[valor]);
        setSendalldata(newData);
        /*console.log(valor)
        console.log(alldata[valor])*/
        //console.log(sendalldata)
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
                            {component == true && valor != "" && <ShowPeopleByCountry country={sendalldata}/>}
                        </div>
                    </div>
                </section>
            </div>
                        
        </>
    )
}   