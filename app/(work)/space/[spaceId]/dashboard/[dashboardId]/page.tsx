import Dashboard from "@/components/dashboard";


export default function DashboardPage({ params }: { params: { dashboardId: string } }) {
  
  return (
    <Dashboard dashboardId={params.dashboardId}/>
  )
}
