

export default async function Dashboard({ params }: { params: { dashboardId: string } }) {
  
  return (
    <>
     <h2>Current dashboard {params.dashboardId}</h2>
    </>
  )
}
