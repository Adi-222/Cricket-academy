import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  
  // Dashboard stats
  const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true })
  const { count: batchCount } = await supabase.from('batches').select('*', { count: 'exact', head: true })
  const { data: pendingFees } = await supabase.from('fees').select('amount').eq('status', 'pending')
  
  const totalPending = pendingFees?.reduce((sum, fee) => sum + Number(fee.amount), 0) || 0

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading text-slate uppercase mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground font-sans text-sm">System overview and critical metrics.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border-l-4 border-slate shadow-sm">
            <h3 className="text-xs font-heading tracking-widest text-slate/50 uppercase">Total Students</h3>
            <p className="text-4xl font-mono text-slate mt-3">{studentCount || 0}</p>
        </div>
        <div className="bg-white p-6 border-l-4 border-slate shadow-sm">
            <h3 className="text-xs font-heading tracking-widest text-slate/50 uppercase">Active Batches</h3>
            <p className="text-4xl font-mono text-slate mt-3">{batchCount || 0}</p>
        </div>
        <div className="bg-white p-6 border-l-4 border-crimson shadow-sm">
            <h3 className="text-xs font-heading tracking-widest text-slate/50 uppercase">Pending Fees (INR)</h3>
            <p className="text-4xl font-mono text-crimson mt-3">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Mock Scorecard Table for visual demonstration */}
      <div className="bg-white border border-slate/10 shadow-sm mt-8">
        <div className="p-6 border-b border-slate/10">
          <h2 className="text-xl font-heading text-slate uppercase">Recent Registrations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="scorecard-table">
            <thead>
              <tr>
                <th className="scorecard-th">Athlete Name</th>
                <th className="scorecard-th">Reg. Date</th>
                <th className="scorecard-th">Assigned Batch</th>
                <th className="scorecard-th text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground font-sans text-sm">
                  Connect Supabase database to populate this ledger.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
