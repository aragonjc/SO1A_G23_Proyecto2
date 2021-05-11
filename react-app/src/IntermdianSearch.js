import React,{useState,useEffect, useMemo} from 'react';
import './resources/styles/showData.css'
import DataTable from './DataTable'
export default function IntermedianSearch({country}) {

    const columns = useMemo(() => [{
        Header: 'Nombre',
        accessor: 'name',
    },
    {  
        Header: 'Edad',
        accessor: 'age',
    },
    {  
        Header: 'Ubicacion',
        accessor: 'location',
    },
    {  
        Header: 'Genero',
        accessor: 'gender',
    },
    {
        Header: 'Vacuna',
        accessor:'vaccine_type'
    },
    {
        Header:'Fecha',
        accessor:'createdAt'
    }],[])

    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ country: country })
        };
        const url = "http://localhost:3000/api/lastbycountry"
        const result = await fetch(url,requestOptions);
        const dataset = await result.json();
        setData(dataset);
        })();
    }, []);


    return (
        
        <>  
            <h3>Ultimos 5 vacunados en {country}</h3>
            <DataTable columns={columns} data={data}/>
        </>
    );
}