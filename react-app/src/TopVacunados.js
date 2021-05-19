import React,{useState,useEffect} from 'react'
import './resources/styles/showData.css'

export default function TopVacunados() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
        const url = "https://us-west2-total-pad-307700.cloudfunctions.net/topcountries"
        const result = await fetch(url);
        const dataset = await result.json();
        console.log(dataset.total)
        setData(dataset.total);
        })();
    }, []);

    const showTable = data.total

    return (
        <>
            <div className="main">
                <section className="content-table">
                    <div className="content-center">
                        <div className="main-table">
                            <h3>10 Paises mas Vacunados</h3>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Pais</th>
                                    <th scope="col">Persona Vacunadas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((value, index) => {
                                            return (
                                            <>
                                                <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{value.id}</td>
                                                <td>{value.value}</td>
                                                </tr>
                                            </>
                                            )
                                            
                                        })
                                    }   
                                    
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </section>
            </div>
        </>
    )

}
