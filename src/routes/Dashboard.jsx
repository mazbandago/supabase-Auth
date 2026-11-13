import React, { useEffect, useMemo, useState } from 'react'
import supabase from '../supabase-client'
import { Chart } from 'react-charts'
import Form from '../components/Form'


function Dashboard() {
  const [metrics, setMetrics] = useState([])
  const [fetchError, setFetchError] = useState(null)

  useEffect(()=>{
    fetcMetrics()
    const channel = supabase
      .channel('changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sales_deals' },
        (payload) => {
          fetcMetrics()
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  },[])

async function fetcMetrics(){
  try {
    const{data, error} = await supabase
    .from('sales_deals')
    .select(
      `
      name,
      value.sum()
      `,
    )
    if(error){
      throw error
    }
    setMetrics(data)
    
  } catch (error) {
    setFetchError(error)
  }
}

  // 1. Format state into the structure TanStack expects: An array containing a series object
  const chartData = useMemo(() => [
    {
      label: 'Deals Sum',
      data: metrics, // Drops your Supabase array straight in here
    }
  ], [metrics]); // Recalculates only when metrics state updates

  // 2. Define the X-Axis (Primary) to use the 'name' field
  const primaryAxis = useMemo(() => ({
    getValue: (datum) => datum.name,
  }), []);

  // 3. Define the Y-Axis (Secondary) and set the element type to 'bar'
  const secondaryAxes = useMemo(() => [
    {
      getValue: (datum) => datum.sum,
      elementType: 'bar', // 👈 This turns it into a Bar Chart
    }
  ], []);


  return (
     <div className="bg-gray-200 h-screen">
        <h2 className='p-4 font-bold text-3xl sm:text-4xl text-center'>Total Sales This Quarter ($)</h2>
        {/* Ensure the parent container has explicit dimensions */}
      <div style={{ width: '500px', height: '300px', padding: '20px' }}>
        {/* 3. Handle different UI states */}
        {fetchError ? (
          <p className="text-red-600 font-semibold">Failed to load chart: {fetchError}</p>
        ) : metrics.length > 0 ? (
          <Chart options={{ data: chartData, primaryAxis, secondaryAxes }} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
        <Form metrics={metrics}/>
    </div>
    
  )
}

export default Dashboard