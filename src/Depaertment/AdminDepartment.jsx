import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, Factory, Save, Plus } from 'lucide-react';
import { num } from '../constants/erpData';
import { Card, CardHeader, PageHeader, StatCard } from '../components/UI';
import { TaskTable } from '../components/TaskTable';

export default function AdminDepartment({
  selectedHistoryDate, todayStr,
  headOfficeRoster, setHeadOfficeRoster,
  afternoonRoster, setAfternoonRoster,
  factoryAttRoster, setFactoryAttRoster,
  onSaveAttendanceSheet, deptTasks, customOptions,
  onInsertTask, onToggleStatus, onDeleteTask
}) {
  const [attSubTab, setAttSubTab] = useState('head_office');
  const [newEmpDept, setNewEmpDept] = useState('Head Office');
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpShift, setNewEmpShift] = useState('10:00');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const hoPresent = headOfficeRoster.filter(r => r.status === 'Present').length;
  const hoLate = headOfficeRoster.filter(r => r.status === 'Late').length;
  const hoAbsent = headOfficeRoster.filter(r => r.status === 'Absent').length;
  const hoOffLeave = headOfficeRoster.filter(r => r.status === 'Day Off' || r.status === 'Leave').length;

  const afPresent = afternoonRoster.filter(r => r.status === 'Present').length;
  const afLate = afternoonRoster.filter(r => r.status === 'Late').length;
  const afAbsent = afternoonRoster.filter(r => r.status === 'Absent').length;

  const facTotalSeats = factoryAttRoster.reduce((a, r) => a + num(r.total), 0);
  const facPresentCount = factoryAttRoster.reduce((a, r) => a + num(r.present), 0);
  const facAbsentCount = Math.max(0, facTotalSeats - facPresentCount);

  return (
    <div>
      <PageHeader icon={ShieldCheck} title="Admin Department — Daily Attendance & Operations" subtitle="Head Office, Warehouse, Shop, Afternoon Shift ও Factory Attendance রিপোর্ট" />

      <div className="grid-kpi">
        <StatCard tone="green" icon={CheckCircle2} label="Head Office & Shop Present" value={`${hoPresent} জন`} sub={`Late: ${hoLate} • Absent: ${hoAbsent} • Off/Leave: ${hoOffLeave}`} subHighlight />
        <StatCard tone="blue" icon={Clock} label="Afternoon Shift Present" value={`${afPresent} / ${afternoonRoster.length}`} sub={`Late: ${afLate} • Absent: ${afAbsent}`} />
        <StatCard tone="indigo" icon={Factory} label={`Factory Present (Total ${facTotalSeats})`} value={`${facPresentCount} জন`} sub={`Absent: ${facAbsentCount} জন`} />
      </div>

      <Card>
        <CardHeader
          title={`📋 দৈনিক হাজিরা রিপোর্ট (${selectedHistoryDate || todayStr})`}
          subtitle="নামের পাশে ✓ (Present), ✗ (Absent) অথবা Late বাটনে ক্লিক করে সেভ করুন"
          right={
            <button type="button" className="btn btn-primary" onClick={onSaveAttendanceSheet}>
              <Save size={16} /> হাজিরা রিপোর্ট সেভ করুন
            </button>
          }
        />

        <div className="tab-row">
          <button className={`tab ${attSubTab === 'head_office' ? 'active' : ''}`} onClick={() => setAttSubTab('head_office')}>
            🏢 Head Office, Warehouse & Shop ({headOfficeRoster.length})
          </button>
          <button className={`tab ${attSubTab === 'afternoon' ? 'active' : ''}`} onClick={() => setAttSubTab('afternoon')}>
            🌤️ Afternoon Shift ({afternoonRoster.length})
          </button>
          <button className={`tab ${attSubTab === 'factory' ? 'active' : ''}`} onClick={() => setAttSubTab('factory')}>
            🏭 Factory Attendance Summary ({facTotalSeats})
          </button>
        </div>

        {attSubTab === 'head_office' && (
          <div>
            <div className="table-wrap">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th style={{ width: 55 }}>SL</th><th>Department</th><th>Employee Name</th><th>Shift Time</th><th>Status</th>
                    <th className="ta-right">হাজিরা মার্ক করুন (✓ / ✗)</th>
                  </tr>
                </thead>
                <tbody>
                  {headOfficeRoster.map((emp, idx) => (
                    <tr key={`${emp.name}-${idx}`}>
                      <td style={{ fontWeight: 700, color: 'var(--muted)' }}>{emp.sl}</td>
                      <td><span className="badge blue">{emp.dept}</span></td>
                      <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{emp.name}</td>
                      <td style={{ color: 'var(--muted)', fontWeight: 600 }}>{emp.shift}</td>
                      <td>
                        <span className={`badge ${emp.status === 'Present' ? 'green' : emp.status === 'Absent' ? 'red' : emp.status === 'Late' ? 'amber' : 'gray'}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="ta-right">
                        <div style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          <button type="button" className={`btn btn-sm btn-done ${emp.status === 'Present' ? 'on' : ''}`}
                            onClick={() => setHeadOfficeRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Present' } : r))}>✓ Present</button>
                          <button type="button" className={`btn btn-sm btn-absent ${emp.status === 'Absent' ? 'on' : ''}`}
                            onClick={() => setHeadOfficeRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Absent' } : r))}>✗ Absent</button>
                          <button type="button" className={`btn btn-sm btn-pending ${emp.status === 'Late' ? 'on' : ''}`}
                            onClick={() => setHeadOfficeRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Late' } : r))}>Late</button>
                          <select className="input" style={{ width: 105, padding: '5px 8px', fontSize: 12, fontWeight: 600 }}
                            value={emp.status} onChange={(e) => setHeadOfficeRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: e.target.value } : r))}>
                            <option value="Present">Present</option><option value="Absent">Absent</option>
                            <option value="Late">Late</option><option value="Day Off">Day Off</option><option value="Leave">Leave</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divider-dash">
              <select className="input" style={{ width: 210 }} value={newEmpDept} onChange={e => setNewEmpDept(e.target.value)}>
                <option value="Head Office">Head Office</option>
                <option value="Call Center Morning Team">Call Center Morning Team</option>
                <option value="Service Team">Service Team</option>
                <option value="Whole Sale">Whole Sale</option>
                <option value="WearHouse">WearHouse</option>
                <option value="Mirpur Shop">Mirpur Shop</option>
                <option value="Dinajpur Shop">Dinajpur Shop</option>
                <option value="Sylhet Shop">Sylhet Shop</option>
              </select>
              <input type="text" className="input" style={{ width: 220 }} placeholder="নতুন স্টাফের নাম..." value={newEmpName} onChange={e => setNewEmpName(e.target.value)} />
              <input type="text" className="input" style={{ width: 110 }} placeholder="Shift (10:00)" value={newEmpShift} onChange={e => setNewEmpShift(e.target.value)} />
              <button type="button" className="btn btn-dark btn-sm" onClick={() => {
                if (!newEmpName.trim()) return;
                setHeadOfficeRoster(prev => [...prev, { sl: prev.length + 1, dept: newEmpDept, name: newEmpName.trim(), shift: newEmpShift, status: 'Present' }]);
                setNewEmpName('');
              }}>+ স্টাফ যোগ করুন</button>
            </div>
          </div>
        )}

        {attSubTab === 'afternoon' && (
          <div className="table-wrap">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>SL No</th><th>Department</th><th>Name</th><th>Shift Time</th><th>Status</th>
                  <th className="ta-right">হাজিরা মার্ক করুন (✓ / ✗)</th>
                </tr>
              </thead>
              <tbody>
                {afternoonRoster.map((emp, idx) => (
                  <tr key={emp.name}>
                    <td style={{ fontWeight: 700, color: 'var(--muted)' }}>{emp.sl}</td>
                    <td><span className="badge indigo">{emp.dept}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{emp.name}</td>
                    <td style={{ color: 'var(--muted)', fontWeight: 600 }}>{emp.shift}</td>
                    <td><span className={`badge ${emp.status === 'Present' ? 'green' : emp.status === 'Absent' ? 'red' : 'amber'}`}>{emp.status}</span></td>
                    <td className="ta-right">
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button type="button" className={`btn btn-sm btn-done ${emp.status === 'Present' ? 'on' : ''}`}
                          onClick={() => setAfternoonRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Present' } : r))}>✓ Present</button>
                        <button type="button" className={`btn btn-sm btn-absent ${emp.status === 'Absent' ? 'on' : ''}`}
                          onClick={() => setAfternoonRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Absent' } : r))}>✗ Absent</button>
                        <button type="button" className={`btn btn-sm btn-pending ${emp.status === 'Late' ? 'on' : ''}`}
                          onClick={() => setAfternoonRoster(prev => prev.map((r, i) => i === idx ? { ...r, status: 'Late' } : r))}>Late</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {attSubTab === 'factory' && (
          <div className="table-wrap">
            <table className="erp-table">
              <thead>
                <tr><th>Department</th><th>Post</th><th className="num">Total</th><th className="num" style={{ width: 140 }}>Present (লিখুন)</th><th className="num">Absent</th></tr>
              </thead>
              <tbody>
                {factoryAttRoster.map((row, idx) => {
                  const abs = Math.max(0, num(row.total) - num(row.present));
                  return (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{row.dept}</td>
                      <td style={{ fontWeight: 600 }}>{row.post}</td>
                      <td className="num" style={{ fontWeight: 700 }}>{row.total || '-'}</td>
                      <td className="num">
                        <input type="number" min="0" max={row.total} className="input"
                          style={{ width: 90, textAlign: 'right', padding: '6px 10px', fontWeight: 700 }}
                          value={row.present}
                          onChange={(e) => {
                            const val = Math.min(num(row.total), Math.max(0, num(e.target.value)));
                            setFactoryAttRoster(prev => prev.map((r, i) => i === idx ? { ...r, present: val } : r));
                          }} />
                      </td>
                      <td className="num" style={{ color: abs > 0 ? 'var(--red)' : 'var(--muted)', fontWeight: 800 }}>{abs > 0 ? abs : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total</td>
                  <td className="num">{facTotalSeats}</td>
                  <td className="num" style={{ color: 'var(--green)' }}>{facPresentCount}</td>
                  <td className="num" style={{ color: 'var(--red)' }}>{facAbsentCount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader title="Admin Department — দৈনিক নোট ও কার্যক্রম" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newTaskTitle.trim()) return;
            const ok = await onInsertTask('admin', newTaskTitle.trim(), 'Pending');
            if (ok) setNewTaskTitle('');
          }}
          className="form-row" style={{ marginBottom: 16 }}
        >
          <input type="text" className="input grow" placeholder="অ্যাডমিন ডিপার্টমেন্টের কোনো নোট বা কাজ লিখুন..." value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
          <button type="submit" className="btn btn-primary"><Plus size={15} /> যুক্ত করুন</button>
        </form>
        <TaskTable rows={deptTasks} statuses={customOptions.statuses} onStatus={onToggleStatus} onDelete={onDeleteTask} canDelete />
      </Card>
    </div>
  );
}