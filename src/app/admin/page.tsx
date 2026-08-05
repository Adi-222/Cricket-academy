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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-medium text-zinc-400">Total Students</h3>
            <p className="text-3xl font-bold text-white mt-2">{studentCount || 0}</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-medium text-zinc-400">Active Batches</h3>
            <p className="text-3xl font-bold text-white mt-2">{batchCount || 0}</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-medium text-zinc-400">Pending Fees</h3>
            <p className="text-3xl font-bold text-red-400 mt-2">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
