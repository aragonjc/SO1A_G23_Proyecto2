import React,{useState,useEffect, useMemo} from 'react';
import DataTable from './DataTable'
import './resources/styles/showData.css'

export default function ShowPeopleByCountry({country}) {
    
    const [data, setData] = useState([]);
    let completeData = JSON.parse(country)

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
    }],[])

   

    return (
        <>  
            <h3>Personas Vacunadas</h3>
            <DataTable columns={columns} data={completeData}/>
        </>
    )
}