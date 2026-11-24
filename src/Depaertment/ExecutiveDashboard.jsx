import React, { useState } from 'react';
import {
  Users, Factory, ClipboardList, Package, ArrowRight,
  Activity, BarChart3, Plus, Search
} from 'lucide-react';
import {
  USERS, localDateStr, isDoneStatus, formatCleanTitle, num, healthColor
} from '../constants/erpData';
import { Card, CardHeader, StatCard, Ring, RingStat, Field } from '../components/UI';
import { TaskTable } from '../components/TaskTable';

export default function ExecutiveDashboard({
  selectedHistoryDate, todayStr, dateFilteredAllTasks, factoryList,
  headOfficeRoster, afternoonRoster, factoryAttRoster,
  customOptions, onInsertTask, onToggleStatus, onDeleteTask,
  onNavigate, notify
}) {
  const [assignToRole, setAssignToRole] = useState('creative_it');
  const [priority, setPriority] = useState('Normal');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const execDepts = USERS.filter(u => u.id !== 'dashboard' && u.id !== 'orders');
  const execTasks = dateFilteredAllTasks.filter(t => t.role !== 'orders');
  const totalFilteredTasks = execTasks.length;
  const totalFilteredDone = execTasks.filter(t => isDoneStatus(t.status)).length;
  const totalFilteredPending = totalFilteredTasks - totalFilteredDone;
  const completionPct = totalFilteredTasks === 0 ? 0 : Math.round((totalFilteredDone / totalFilteredTasks) * 100);

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

  const workforce = [...headOfficeRoster, ...afternoonRoster].filter(r => r.status !== 'Day Off' && r.status !== 'Leave');
  const workPresent = workforce.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const attRate = workforce.length ? Math.round((workPresent / workforce.length) * 100) : 0;
  const facRate = facTotalSeats ? Math.round((facPresentCount / facTotalSeats) * 100) : 0;

  const matchesSelectedDate = (d) => !selectedHistoryDate || d === selectedHistoryDate;
  const filteredFactoryList = factoryList.filter(f => matchesSelectedDate(f.production_date));
  const filteredFactoryPcs = filteredFactoryList.reduce((a, i) => a + num(i.quantity), 0);
  const totalFactoryPcs = factoryList.reduce((a, i) => a + num(i.quantity), 0);

  const fm = todayStr.slice(0, 7);
  const monthFactoryList = factoryList.filter(f => (f.production_date || '').slice(0, 7) === fm);
  const cleanCat = (c) => c.replace(/^\d+\.\s*/, '');
  const sumCat = (list, brand, cat) =>
    list.filter(i => i.brand_type === brand && i.category_name === cat).reduce((a, i) => a + num(i.quantity), 0);

  const monthGrandTotal = monthFactoryList.reduce((a, i) => a + num(i.quantity), 0);

  const catRowsAll = [
    ...customOptions.swaponCats.map(cat => ({ label: cleanCat(cat), brand: "Swapon's", day: sumCat(filteredFactoryList, "Swapon's World", cat) })),
    ...customOptions.stoneRoseCats.map(cat => ({ label: cleanCat(cat), brand: 'Stone Rose', day: sumCat(filteredFactoryList, 'Stone Rose', cat) }))
  ].filter(r => r.day > 0).sort((a, b) => b.day - a.day);
  const catRowsMax = Math.max(1, ...catRowsAll.map(r => r.day));

  const prodTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = localDateStr(d);
    return {
      ds, label: ds.slice(8) + '/' + ds.slice(5, 7),
      total: factoryList.filter(f => f.production_date === ds).reduce((a, x) => a + num(x.quantity), 0)
    };
  });
  const prodTrendMax = Math.max(1, ...prodTrend.map(d => d.total));

  const hr = new Date().getHours();
  const greet = hr < 5 ? 'শুভ রাত্রি' : hr < 12 ? 'শুভ সকাল' : hr < 16 ? 'শুভ দুপুর' : hr < 19 ? 'শুভ বিকাল' : 'শুভ সন্ধ্যা';
  const prettyDate = new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const masterFiltered = execTasks.filter(t =>
    (filterStatus === 'ALL' || t.status === filterStatus) &&
    (filterDept === 'ALL' || t.role === filterDept) &&
    formatCleanTitle(t.title).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="hero">
        <div>
          <div className="hero-eyebrow">📅 {prettyDate}</div>
          <h2>{greet}, Boss! 👑</h2>
          <p>Swapon's World ও Stone Rose — হাজিরা, প্রোডাকশন ও ডিপার্টমেন্টের কাজের লাইভ সারসংক্ষেপ এক নজরে।</p>
        </div>
        <div className="hero-chips">
          <div className="hero-chip">নির্বাচিত তারিখ<b>{selectedHistoryDate || 'All'}</b></div>
          <div className="hero-chip">ডিপার্টমেন্ট<b>{execDepts.length}</b></div>
          <div className="hero-chip">আজকের প্রোডাকশন<b>{filteredFactoryPcs.toLocaleString()} pcs</b></div>
        </div>
      </div>

      <div className="grid-kpi">
        <RingStat icon={Users} label="স্টাফ হাজিরা" value={`${workPresent} / ${workforce.length}`}
          sub={`Late: ${hoLate + afLate} • Absent: ${hoAbsent + afAbsent} • Off/Leave: ${hoOffLeave}`}
          pct={attRate} color={healthColor(attRate, workforce.length > 0)} />
        <RingStat icon={Factory} label="ফ্যাক্টরি হাজিরা" value={`${facPresentCount} / ${facTotalSeats}`}
          sub={`Absent: ${facAbsentCount} জন`}
          pct={facRate} color={healthColor(facRate, facTotalSeats > 0)} />
        <RingStat icon={ClipboardList} label="কাজের অগ্রগতি" value={`${totalFilteredDone} / ${totalFilteredTasks}`}
          sub={`বাকি: ${totalFilteredPending} টি`}
          pct={completionPct} color={healthColor(completionPct, totalFilteredTasks > 0)} />
        <StatCard tone="amber" icon={Package} label={`প্রোডাকশন (${selectedHistoryDate || 'সব তারিখ'})`}
          value={`${filteredFactoryPcs.toLocaleString()} Pcs`}
          sub={`মাসিক: ${monthGrandTotal.toLocaleString()} • সর্বমোট: ${totalFactoryPcs.toLocaleString()}`} />
      </div>

      <div className="grid-main">
        <Card>
          <CardHeader
            title="🏭 ক্যাটাগরি অনুযায়ী প্রোডাকশন"
            subtitle={`${selectedHistoryDate || 'সব তারিখ'} — কোন ক্যাটাগরিতে কত pcs`}
            right={<button className="btn btn-ghost btn-sm" onClick={() => onNavigate('factory')}>বিস্তারিত <ArrowRight size={13} /></button>}
          />
          {catRowsAll.length === 0 ? (
            <div className="soft-box">নির্বাচিত তারিখে কোনো প্রোডাকশন এন্ট্রি নেই।</div>
          ) : catRowsAll.slice(0, 9).map((r, i) => (
            <div key={r.label + r.brand + i} className="hbar-row">
              <div className="hbar-name" title={`${r.label} (${r.brand})`}>{r.label}</div>
              <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(r.day / catRowsMax) * 100}%` }} /></div>
              <div className="hbar-val">{r.day.toLocaleString()} <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>pcs</span></div>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="৭ দিনের প্রোডাকশন ট্রেন্ড" subtitle="প্রতিদিনের মোট pcs" icon={Activity} />
          <div className="bars">
            {prodTrend.map(d => (
              <div key={d.ds} className="bar-col">
                <span className="bar-val">{d.total}</span>
                <div className="bar-track">
                  <div className="bar-solid" style={{ height: `${(d.total / prodTrendMax) * 100}%` }} />
                </div>
                <span className="bar-label">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="divider-dash" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>এই মাসের মোট ({fm})</span>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-num)' }}>{monthGrandTotal.toLocaleString()} pcs</span>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <CardHeader
            title="📋 Head Office, Shop & Afternoon Attendance"
            subtitle={`${selectedHistoryDate || todayStr} • উপস্থিত: ${hoPresent + hoLate + afPresent + afLate} জন`}
            right={<button className="btn btn-ghost btn-sm" onClick={() => onNavigate('admin')}>বিস্তারিত <ArrowRight size={13} /></button>}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
            <div style={{ background: 'var(--green-soft)', padding: '10px 12px', borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>Present</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-num)' }}>{hoPresent + afPresent}</div>
            </div>
            <div style={{ background: 'var(--amber-soft)', padding: '10px 12px', borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)' }}>Late</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--amber)', fontFamily: 'var(--font-num)' }}>{hoLate + afLate}</div>
            </div>
            <div style={{ background: 'var(--red-soft)', padding: '10px 12px', borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)' }}>Absent</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--red)', fontFamily: 'var(--font-num)' }}>{hoAbsent + afAbsent}</div>
            </div>
            <div style={{ background: '#EEF2F7', padding: '10px 12px', borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>Off / Leave</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-num)' }}>{hoOffLeave}</div>
            </div>
          </div>
          <div className="table-wrap" style={{ maxHeight: 240, overflowY: 'auto' }}>
            <table className="erp-table">
              <thead><tr><th>Department</th><th>Name</th><th>Shift</th><th>Status</th></tr></thead>
              <tbody>
                {[...headOfficeRoster, ...afternoonRoster].filter(r => r.status !== 'Present').map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.dept}</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{r.name}</td>
                    <td style={{ color: 'var(--muted)' }}>{r.shift}</td>
                    <td><span className={`badge ${r.status === 'Absent' ? 'red' : r.status === 'Late' ? 'amber' : 'gray'}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="🏭 Factory Attendance Summary"
            subtitle={`${selectedHistoryDate || todayStr} • Total: ${facTotalSeats} | Present: ${facPresentCount} | Absent: ${facAbsentCount}`}
            right={<button className="btn btn-ghost btn-sm" onClick={() => onNavigate('admin')}>বিস্তারিত <ArrowRight size={13} /></button>}
          />
          <div className="table-wrap" style={{ maxHeight: 330, overflowY: 'auto' }}>
            <table className="erp-table">
              <thead><tr><th>Department</th><th>Post</th><th className="num">Total</th><th className="num">Present</th><th className="num">Absent</th></tr></thead>
              <tbody>
                {['Sewing', 'Printing', 'Cutting', 'Button, QC & Finishing', 'Iron & Packaging'].map(sec => {
                  const items = factoryAttRoster.filter(f => f.dept === sec);
                  const sTot = items.reduce((a, x) => a + num(x.total), 0);
                  const sPres = items.reduce((a, x) => a + num(x.present), 0);
                  const sAbs = Math.max(0, sTot - sPres);
                  return (
                    <tr key={sec}>
                      <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{sec}</td>
                      <td style={{ color: 'var(--muted)', fontSize: 12 }}>{items.length} Posts</td>
                      <td className="num" style={{ fontWeight: 700 }}>{sTot}</td>
                      <td className="num" style={{ color: 'var(--green)', fontWeight: 800 }}>{sPres}</td>
                      <td className="num" style={{ color: sAbs > 0 ? 'var(--red)' : 'var(--muted)', fontWeight: 800 }}>{sAbs}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total Factory</td>
                  <td className="num">{facTotalSeats}</td>
                  <td className="num" style={{ color: 'var(--green)' }}>{facPresentCount}</td>
                  <td className="num" style={{ color: 'var(--red)' }}>{facAbsentCount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Department Overview" subtitle="কার্ডে ক্লিক করলে ডিপার্টমেন্ট পেজ খুলবে" icon={BarChart3} />
        <div className="dept-grid">
          {execDepts.map(dept => {
            const dT = dateFilteredAllTasks.filter(t => t.role === dept.id);
            const dD = dT.filter(t => isDoneStatus(t.status)).length;
            const pct = dT.length === 0 ? 0 : Math.round((dD / dT.length) * 100);
            const col = healthColor(pct, dT.length > 0);
            const DIcon = dept.icon;
            return (
              <button key={dept.id} className="dept-card" onClick={() => onNavigate(dept.id)}>
                <Ring value={pct} size={54} stroke={6} color={col} textSize={12} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="dept-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <DIcon size={13} color="#64748B" style={{ flexShrink: 0 }} /> {dept.name}
                  </div>
                  <div className="dept-meta">{dT.length === 0 ? 'আজ কোনো কাজ নেই' : `${dD} সম্পন্ন • ${dT.length - dD} বাকি`}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div style={{ height: 20 }} />

      <div className="grid-2">
        <Card>
          <CardHeader title="⚡ সাম্প্রতিক কার্যক্রম" subtitle="নির্বাচিত তারিখের সর্বশেষ ৭টি কাজ" icon={Activity} />
          {execTasks.length === 0 ? (
            <div className="soft-box">নির্বাচিত তারিখে কোনো কাজের রেকর্ড নেই।</div>
          ) : execTasks.slice(0, 7).map(t => {
            const dInfo = USERS.find(u => u.id === t.role);
            const done = isDoneStatus(t.status);
            return (
              <div key={t.id} className="feed-item">
                <span className="feed-dot" style={{ background: done ? '#15803D' : '#D97706' }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="feed-title">{formatCleanTitle(t.title)}</div>
                  <div className="feed-meta">{dInfo?.name || t.role} • {t.time}</div>
                </div>
                <span className={`badge ${done ? 'green' : t.status === 'Delayed' ? 'red' : 'amber'}`} style={{ alignSelf: 'flex-start' }}>{t.status}</span>
              </div>
            );
          })}
        </Card>

        <Card>
          <CardHeader title="👑 ডিপার্টমেন্টকে সরাসরি কাজ অ্যাসাইন" subtitle="নির্দেশনা সঙ্গে সঙ্গে ওই ডিপার্টমেন্টের টেবিলে চলে যাবে" />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newTaskTitle.trim()) return;
              const ok = await onInsertTask(assignToRole, `[${priority}] ${newTaskTitle.trim()}`, 'Pending');
              if (ok) { setNewTaskTitle(''); notify('কাজ পাঠানো হয়েছে ✓', 'ok'); }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <Field label="ডিপার্টমেন্ট">
              <select value={assignToRole} onChange={(e) => setAssignToRole(e.target.value)} className="input">
                {execDepts.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </Field>
            <Field label="প্রায়োরিটি">
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input">
                <option value="Normal">🟢 Normal</option>
                <option value="High">🟠 High</option>
                <option value="Urgent">🔴 Urgent</option>
              </select>
            </Field>
            <Field label="কাজের নির্দেশনা">
              <input type="text" className="input" placeholder="কাজের নির্দেশনা লিখুন..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
            </Field>
            <button type="submit" className="btn btn-primary"><Plus size={15} /> কাজ পাঠান</button>
          </form>
        </Card>
      </div>

      <Card>
        <CardHeader
          title={`সকল ডিপার্টমেন্টের কাজের মাস্টার টেবিল (${selectedHistoryDate || 'All Dates'})`}
          subtitle={`মোট ${masterFiltered.length} টি রেকর্ড`}
          right={
            <div className="toolbar">
              <div className="search-box">
                <Search size={15} />
                <input type="text" className="input" placeholder="সার্চ করুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <select className="input" style={{ width: 190 }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                <option value="ALL">সব ডিপার্টমেন্ট</option>
                {execDepts.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
              <select className="input" style={{ width: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="ALL">সব স্ট্যাটাস</option>
                {customOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          }
        />
        <TaskTable rows={masterFiltered} statuses={customOptions.statuses} onStatus={onToggleStatus} onDelete={onDeleteTask} showDept canDelete />
      </Card>
    </div>
  );
}