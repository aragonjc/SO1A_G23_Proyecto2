import React,{useState,useEffect, useMemo} from 'react';
import BarChart from './BarChart'

import './resources/styles/showData.css'

export default function ShowGraphBar({country}) {
    
    let completeData = JSON.parse(country)

   function fillBarChart() {

        if(completeData) {
            if(completeData.length > 0) {
                let resultData = [];
                const arr1  = completeData.filter(element => element.age >= 0  && element.age<=10);
                const arr2  = completeData.filter(element => element.age >= 11 && element.age<=20);
                const arr3  = completeData.filter(element => element.age >= 21 && element.age<=30);
                const arr4  = completeData.filter(element => element.age >= 31 && element.age<=40);
                const arr5  = completeData.filter(element => element.age >= 41 && element.age<=50);
                const arr6  = completeData.filter(element => element.age >= 51 && element.age<=60);
                const arr7  = completeData.filter(element => element.age >= 61 && element.age<=70);
                const arr8  = completeData.filter(element => element.age >= 71 && element.age<=80);
                const arr9  = completeData.filter(element => element.age >= 81 && element.age<=90);
                const arr10 = completeData.filter(element => element.age >= 91 && element.age<=100);
                resultData.push({age:"1-10",total:arr1.length});
                resultData.push({age:"11-20",total:arr2.length});
                resultData.push({age:"21-30",total:arr3.length});
                resultData.push({age:"31-40",total:arr4.length});
                resultData.push({age:"41-50",total:arr5.length});
                resultData.push({age:"51-60",total:arr6.length});
                resultData.push({age:"61-70",total:arr7.length});
                resultData.push({age:"71-80",total:arr8.length});
                resultData.push({age:"81-90",total:arr9.length});
                resultData.push({age:"91-100",total:arr10.length});
                //console.log(resultData)
                return (
                    <>
                        <BarChart dataset={resultData} />
                    </>
                )
            }
        }
   }

    return (
        <>  
            <h3>Personas Vacunadas</h3>
            {
                fillBarChart()
            }
        </>
    )
}