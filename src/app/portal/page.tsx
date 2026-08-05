import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PortalDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch student info
  const { data: students } = await supabase
    .from('students')
    .select('*, batches(name, schedule, coaches(name))')
    .eq('profile_id', user.id)

  const { data: fees } = await supabase
    .from('fees')
    .select('*, students(full_name)')
    .in('student_id', students?.map(s => s.id) || [])
    
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark p-6 rounded-2xl border border-white/5 md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Enrolled Students</h2>
          {students && students.length > 0 ? (
            <div className="space-y-4">
              {students.map(student => (
                <div key={student.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-lg text-white">{student.full_name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Batch: <span className="text-primary">{(student.batches as any)?.name || 'Unassigned'}</span>
                  </p>
                  {(student.batches as any) && (
                    <p className="text-sm text-zinc-400">
                      Schedule: {(student.batches as any).schedule} | Coach: {((student.batches as any).coaches as any)?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 p-8 rounded-xl text-center border border-white/5">
              <p className="text-zinc-400 mb-4">No students enrolled yet.</p>
              <p className="text-sm text-zinc-500">Your registration is pending review by the academy administration.</p>
            </div>
          )}
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-semibold text-white mb-4">Fee Status</h2>
          {fees && fees.length > 0 ? (
            <div className="space-y-4">
               {fees.map(fee => (
                  <div key={fee.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{(fee.students as any)?.full_name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${fee.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                            {fee.status.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">₹{fee.amount}</p>
                    <p className="text-xs text-zinc-500">Due: {new Date(fee.due_date).toLocaleDateString()}</p>
                  </div>
               ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">No pending fees.</p>
          )}
        </div>
      </div>
    </div>
  )
}
