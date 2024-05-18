import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useState , useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const ArchivageChart = (props) => {
  // Sample data for teachers and their completion percentages
  const teacherExams= props.data
  const [totalCompleted,setTotalCompleted]=useState(0)
  const [total,setTotal]=useState(0)

  // Calculate the combined percentage
  useEffect(()=>{
      let completedCount = 0
      let totalCount = 0
      teacherExams.map(module=>{
      module.Modules.controles.map(cntrl=>{
        if(cntrl.status){
          completedCount+=1
        }
        totalCount+=1
      })
    })
    if(totalCount==0){
      totalCount=1
    }
    setTotal(totalCount)
    setTotalCompleted(completedCount)
    
  },[teacherExams])

  const data = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [(totalCompleted/total)*100, 100 - (totalCompleted/total)*100],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 255, 255, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          }
        }
      }
    }
  };

  return (
            <Doughnut data={data} options={options} />
  );
};

export default ArchivageChart;
