import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FeeBadge } from '@/components/ui/fee-badge'
import { EmptyState } from '@/components/ui/empty-state'
import { User, CreditCard } from 'lucide-react'

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
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-heading text-slate uppercase mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-sans">Manage your athletes and track fee payments.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate/10 pb-4">
            <div className="w-1.5 h-6 bg-crimson"></div>
            <h2 className="text-2xl font-heading text-slate uppercase">Athlete Profiles</h2>
          </div>
          
          {students && students.length > 0 ? (
            <div className="space-y-6">
              {students.map(student => (
                <div key={student.id} className="card-dossier overflow-hidden flex flex-col sm:flex-row">
                  <div className="bg-pitch p-6 sm:w-1/3 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate/10">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-slate">
                      <User className="w-8 h-8 opacity-50" />
                    </div>
                    <span className="text-xs font-mono text-slate/50 uppercase tracking-widest text-center">Athlete ID: {student.id.split('-')[0]}</span>
                  </div>
                  <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-2xl text-slate uppercase mb-1">{student.full_name}</h3>
                      <p className="text-sm font-sans text-muted-foreground mb-4">DOB: {new Date(student.date_of_birth).toLocaleDateString()}</p>
                      
                      <div className="space-y-2 bg-chalk p-4 rounded-sm border border-slate/10">
                        <div className="flex justify-between items-center border-b border-slate/10 pb-2 mb-2">
                          <span className="text-xs font-heading uppercase text-slate/60">Current Batch</span>
                          <span className="text-sm font-bold text-slate font-sans">{(student.batches as any)?.name || 'Unassigned'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate/10 pb-2 mb-2">
                          <span className="text-xs font-heading uppercase text-slate/60">Schedule</span>
                          <span className="text-sm font-sans text-slate">{(student.batches as any)?.schedule || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-heading uppercase text-slate/60">Lead Coach</span>
                          <span className="text-sm font-sans text-slate">{((student.batches as any)?.coaches as any)?.name || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No Athletes Enrolled" 
              description="Your account is active, but you don't have any athletes assigned to you yet. Please contact the admissions office if you have already registered."
              icon={<User className="w-8 h-8 opacity-50 text-slate" />}
            />
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate/10 pb-4">
            <div className="w-1.5 h-6 bg-eden"></div>
            <h2 className="text-2xl font-heading text-slate uppercase">Fee Ledger</h2>
          </div>
          
          {fees && fees.length > 0 ? (
            <div className="space-y-4">
               {fees.map(fee => (
                  <div key={fee.id} className="card-dossier p-6 border-l-4 border-l-slate">
                    <div className="flex justify-between items-start mb-4 border-b border-slate/10 pb-3">
                        <div>
                          <span className="text-xs font-heading uppercase text-slate/60 block mb-1">Athlete</span>
                          <span className="font-bold font-sans text-slate">{(fee.students as any)?.full_name}</span>
                        </div>
                        <FeeBadge status={fee.status} />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs font-heading uppercase text-slate/60 block mb-1">Amount Due</span>
                        <p className="text-3xl font-mono text-slate">₹{fee.amount}</p>
                      </div>
                      <p className="text-xs font-sans text-slate/60 bg-pitch px-2 py-1 rounded-sm">Due: {new Date(fee.due_date).toLocaleDateString()}</p>
                    </div>
                  </div>
               ))}
            </div>
          ) : (
            <EmptyState 
              title="Ledger Clear" 
              description="There are no pending or upcoming fees for your enrolled athletes at this time."
              icon={<CreditCard className="w-8 h-8 opacity-50 text-slate" />}
            />
          )}
        </div>
      </div>
    </div>
  )
}
