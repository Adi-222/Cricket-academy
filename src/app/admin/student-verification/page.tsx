import { createClient } from '@/lib/supabase/server'
import { EmptyState } from '@/components/ui/EmptyState'

export default async function StudentVerificationPage() {
  const supabase = await createClient()

  // Fetch all pending students
  const { data: pendingStudents, error } = await supabase
    .from('students')
    .select('id, first_name, last_name, dob, emergency_contact_name, emergency_contact_phone, status, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate/10 pb-4">
        <div>
          <h1 className="text-3xl font-heading text-slate uppercase tracking-widest">Student Verification</h1>
          <p className="text-sm font-sans text-slate/70 mt-1">Review and approve new academy registrations.</p>
        </div>
      </div>

      {!pendingStudents || pendingStudents.length === 0 ? (
        <EmptyState 
          title="No Pending Verifications" 
          description="All student registrations have been processed." 
        />
      ) : (
        <div className="card-dossier overflow-hidden">
          <table className="scorecard-table w-full">
            <thead className="bg-slate text-white text-xs font-heading uppercase tracking-widest text-left">
              <tr>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">DOB</th>
                <th className="px-6 py-4 font-medium">Emergency Contact</th>
                <th className="px-6 py-4 font-medium">Applied On</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pitch">
              {pendingStudents.map((student) => (
                <tr key={student.id} className="hover:bg-chalk/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate/70">
                    {new Date(student.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate/70">
                    {student.emergency_contact_name} <br/>
                    <span className="text-xs text-slate/50">{student.emergency_contact_phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate/70 tabular-nums">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-eden hover:text-eden/80 font-heading tracking-widest uppercase text-xs mr-4">Approve</button>
                    <button className="text-crimson hover:text-crimson/80 font-heading tracking-widest uppercase text-xs">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
