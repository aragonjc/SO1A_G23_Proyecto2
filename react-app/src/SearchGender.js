import React,{useState,useEffect, useMemo} from 'react';
import './resources/styles/showData.css'
import PieGraph from './PieGraph'
export default function SearchGender({country}) {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ country: country })
        };
        const url = "http://localhost:3000/api/genderbycountry"
        const result = await fetch(url,requestOptions);
        const dataset = await result.json();
        setData(dataset);
        })();
    }, []);


    return (
        
        <>  
            <h3>Grafica de Vacunados por genero en {country}</h3>
            <PieGraph data={data}/>
        </>
    );
}