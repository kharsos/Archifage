import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { useState , useEffect } from 'react';
import axios from 'axios';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CopiesChart = () => {
    const [September,setSeptember]=useState(0)
    const [October,setOctober]=useState(0)
    const [November,setNovember]=useState(0)
    const [December,setDecember]=useState(0)
    const [January,setJanuary]=useState(0)
    const [February,setFebruary]=useState(0)
    const [March,setMarch]=useState(0)
    const [April,setApril]=useState(0)
    const [May,setMay]=useState(0)
    const [June,setJune]=useState(0)
    const [July,setJuly]=useState(0)
    const [August,setAugust]=useState(0)
    const [statistique,setStatitstique]=useState([])
    const [formateur,setFormateur]=useState([])
    const [chosenFormateur,setChosenFormateur]=useState('Youssef')

    useEffect(()=>{
        axios.get('http://localhost:8080/formateur')
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
      axios.get(`http://localhost:8080/notifications/groupe/${chosenFormateur}`)
      .then(res=>setStatitstique(res.data))
      .catch(err=>console.log(err))
      console.log(statistique)
    },[chosenFormateur])

    useEffect(()=>{
        if (statistique.length > 0) {
            statistique.forEach(month => {
        switch (month._id) {
          case 'January':
              setJanuary(month.totalCopies);
              break;
          case 'February':
              setFebruary(month.totalCopies);
              break;
          case 'March':
              setMarch(month.totalCopies);
              break;
          case 'April':
              setApril(month.totalCopies);
              break;
          case 'May':
              setMay(month.totalCopies);
              break;
          case 'June':
              setJune(month.totalCopies);
              break;
          case 'July':
              setJuly(month.totalCopies);
              break;
          case 'August':
              setAugust(month.totalCopies);
              break;
          case 'September':
              setSeptember(month.totalCopies);
              break;
          case 'October':
              setOctober(month.totalCopies);
              break;
          case 'November':
              setNovember(month.totalCopies);
              break;
          case 'December':
              setDecember(month.totalCopies);
              break;
          default:
              break;
      }
      })}
      else{
        setApril(0)
        setMarch(0)
        setAugust(0)
        setSeptember(0)
        setOctober(0)
        setJuly(0)
        setJune(0)
        setMay(0)
        setFebruary(0)
        setJanuary(0)
        setDecember(0)
        setNovember(0)
      }
    },[statistique])

    const data = {
        labels: ['September', 'October', 'November', 'December','January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
        datasets: [
            {
                label: 'Total Copies per Month',
                data: [September, October, November, December,January, February, March, April, May, June, July,August],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Pillar Chart',
          },
      },
      scales: {
          y: {
              beginAtZero: true,
              max: 500,  // Set the maximum value for the y-axis
          },
      },
  };

    return <>
        <select className='form-control' style={{width:"50%" , margin:"0 auto"}} onClick={(e)=>setChosenFormateur(e.target.value)}>
                    <option value={''}>all</option>
                    {formateur.map(f=><option value={f.name}>{f.name}</option>)}
        </select>
        <Bar data={data} options={options} style={{scale:'0.8'}}/>;
    </>
};

export default CopiesChart;
