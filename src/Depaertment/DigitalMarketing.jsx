import React, { useState } from 'react';
import { Activity, CheckCircle2, Clock, Plus, Search } from 'lucide-react';
import { isDoneStatus, formatCleanTitle } from '../constants/erpData';
import { Card, CardHeader, PageHeader, StatCard, Field } from '../components/UI';
import { TaskTable } from '../components/TaskTable';

export default function DigitalMarketing({
  deptObj, deptTasks, selectedHistoryDate, todayStr, customOptions,
  onInsertTask, onToggleStatus, onDeleteTask, isBoss
}) {
  const [dmForm, setDmForm] = useState({
    taskName: customOptions.dmAreas[0], assignedPerson: '', target: '', deadline: todayStr,
    priority: 'High', progressStatus: 'In Progress', performanceResult: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const deptDoneCount = deptTasks.filter(t => isDoneStatus(t.status)).length;
  const deptPendingCount = deptTasks.length - deptDoneCount;

  const filteredRows = deptTasks.filter(t =>
    (filterStatus === 'ALL' || t.status === filterStatus) &&
    formatCleanTitle(t.title).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader icon={deptObj.icon} title={deptObj.name} subtitle={deptObj.title} />
      <div className="grid-kpi">
        <StatCard tone="blue" icon={Activity} label={selectedHistoryDate ? `${selectedHistoryDate} তারিখের কাজ` : 'মোট নির্ধারিত কাজ'} value={`${deptTasks.length} টি`} />
        <StatCard tone="green" icon={CheckCircle2} label="সম্পন্ন (Done)" value={`${deptDoneCount} টি`} />
        <StatCard tone="amber" icon={Clock} label="বাকি (Pending)" value={`${deptPendingCount} টি`} />
      </div>

      <Card>
        <CardHeader title="📣 Digital Marketing Task & Campaign Entry" subtitle="১৮টি দায়িত্ব থেকে সিলেক্ট করে ক্যাম্পেইন যুক্ত করুন" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const summary = `[${dmForm.priority}] ${dmForm.taskName} | Assigned: ${dmForm.assignedPerson || 'Team'} | Target: ${dmForm.target || '-'} | Deadline: ${dmForm.deadline} | Result: ${dmForm.performanceResult || '-'}`;
            const ok = await onInsertTask('marketing', summary, dmForm.progressStatus);
            if (ok) setDmForm({ ...dmForm, assignedPerson: '', target: '', performanceResult: '' });
          }}
          className="form-grid"
        >
          <Field label="Task Name (18 Responsibilities)">
            <select className="input" value={dmForm.taskName} onChange={e => setDmForm({ ...dmForm, taskName: e.target.value })}>
              {customOptions.dmAreas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
          <Field label="Assigned Person">
            <input type="text" className="input" placeholder="দায়িত্বপ্রাপ্ত ব্যক্তির নাম" value={dmForm.assignedPerson} onChange={e => setDmForm({ ...dmForm, assignedPerson: e.target.value })} />
          </Field>
          <Field label="Target">
            <input type="text" className="input" placeholder="যেমন: ৫০০ লিড / ৫০ সেল" value={dmForm.target} onChange={e => setDmForm({ ...dmForm, target: e.target.value })} />
          </Field>
          <Field label="Deadline">
            <input type="date" className="input" value={dmForm.deadline} onChange={e => setDmForm({ ...dmForm, deadline: e.target.value })} />
          </Field>
          <Field label="Priority">
            <select className="input" value={dmForm.priority} onChange={e => setDmForm({ ...dmForm, priority: e.target.value })}>
              <option value="Normal">Normal</option><option value="High">High</option><option value="Urgent">Urgent</option>
            </select>
          </Field>
          <Field label="Progress Status">
            <select className="input" value={dmForm.progressStatus} onChange={e => setDmForm({ ...dmForm, progressStatus: e.target.value })}>
              {customOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Performance Result">
            <input type="text" className="input" placeholder="ফলাফল লিখুন" value={dmForm.performanceResult} onChange={e => setDmForm({ ...dmForm, performanceResult: e.target.value })} />
          </Field>
          <button type="submit" className="btn btn-primary"><Plus size={15} /> ক্যাম্পেইন যুক্ত করুন</button>
        </form>
      </Card>

      <Card>
        <CardHeader
          title={`${deptObj.name} — কাজের টেবিল (${filteredRows.length}) ${selectedHistoryDate ? `[${selectedHistoryDate}]` : '[সব তারিখ]'}`}
          right={
            <div className="toolbar">
              <div className="search-box">
                <Search size={15} />
                <input type="text" className="input" placeholder="সার্চ করুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <select className="input" style={{ width: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="ALL">সব স্ট্যাটাস</option>
                {customOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          }
        />
        <TaskTable rows={filteredRows} statuses={customOptions.statuses} onStatus={onToggleStatus} onDelete={onDeleteTask} canDelete={isBoss} />
      </Card>
    </div>
  );
}