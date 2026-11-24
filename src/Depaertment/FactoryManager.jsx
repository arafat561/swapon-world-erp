import React, { useState } from 'react';
import { Factory, BarChart3, Package, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { num } from '../constants/erpData';
import { Card, CardHeader, PageHeader, StatCard } from '../components/UI';

export default function FactoryManager({
  deptObj, factoryList, setFactoryList, selectedHistoryDate, todayStr,
  customOptions, onAddCustomOption, notify
}) {
  const [factoryBrand, setFactoryBrand] = useState("Swapon's World");
  const [factoryCat, setFactoryCat] = useState(customOptions.swaponCats[0]);
  const [factoryQty, setFactoryQty] = useState('');
  const [factoryMonth, setFactoryMonth] = useState(todayStr.slice(0, 7));
  const [newOptionText, setNewOptionText] = useState('');

  const matchesSelectedDate = (d) => !selectedHistoryDate || d === selectedHistoryDate;
  const fm = factoryMonth || todayStr.slice(0, 7);
  const filteredFactoryList = factoryList.filter(f => matchesSelectedDate(f.production_date));
  const filteredFactoryPcs = filteredFactoryList.reduce((a, i) => a + num(i.quantity), 0);
  const totalFactoryPcs = factoryList.reduce((a, i) => a + num(i.quantity), 0);
  const swaponPcs = filteredFactoryList.filter(i => i.brand_type === "Swapon's World").reduce((a, i) => a + num(i.quantity), 0);
  const stonePcs = filteredFactoryList.filter(i => i.brand_type === 'Stone Rose').reduce((a, i) => a + num(i.quantity), 0);

  const monthFactoryList = factoryList.filter(f => (f.production_date || '').slice(0, 7) === fm);
  const cleanCat = (c) => c.replace(/^\d+\.\s*/, '');
  const sumCat = (list, brand, cat) =>
    list.filter(i => i.brand_type === brand && i.category_name === cat).reduce((a, i) => a + num(i.quantity), 0);

  const buildBrandRows = (brand, cats) => cats.map(cat => ({
    cat,
    day: sumCat(filteredFactoryList, brand, cat),
    month: sumCat(monthFactoryList, brand, cat),
    all: sumCat(factoryList, brand, cat)
  }));
  const swaponRows = buildBrandRows("Swapon's World", customOptions.swaponCats);
  const stoneRows = buildBrandRows('Stone Rose', customOptions.stoneRoseCats);
  const sumRows = (rows, key) => rows.reduce((a, r) => a + r[key], 0);
  const monthGrandTotal = sumRows(swaponRows, 'month') + sumRows(stoneRows, 'month');

  const [fmYear, fmMonth] = fm.split('-').map(Number);
  const daysInFacMonth = new Date(fmYear, fmMonth, 0).getDate();
  const monthDaily = Array.from({ length: daysInFacMonth }, (_, i) => {
    const ds = `${fm}-${String(i + 1).padStart(2, '0')}`;
    return { ds, day: i + 1, pcs: monthFactoryList.filter(f => f.production_date === ds).reduce((a, x) => a + num(x.quantity), 0) };
  });
  const monthDailyMax = Math.max(1, ...monthDaily.map(d => d.pcs));
  const monthActiveDays = monthDaily.filter(d => d.pcs > 0).length;
  const monthAvgPerDay = monthActiveDays ? Math.round(monthGrandTotal / monthActiveDays) : 0;

  const deleteProduction = async (id) => {
    if (!window.confirm('এই প্রোডাকশন এন্ট্রি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    const { error } = await supabase.from('factory_production').delete().eq('id', id);
    if (!error) setFactoryList(prev => prev.filter(f => f.id !== id));
    else notify('ডিলিট করা যায়নি!');
  };

  const downloadMonthCsv = () => {
    const lines = ['Month,Brand,Category,Pcs'];
    swaponRows.forEach(r => lines.push(`${fm},Swapon's World,${cleanCat(r.cat)},${r.month}`));
    stoneRows.forEach(r => lines.push(`${fm},Stone Rose,${cleanCat(r.cat)},${r.month}`));
    lines.push(`${fm},TOTAL,,${monthGrandTotal}`);
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `production-report-${fm}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const renderCatTiles = (rows) => {
    const maxDay = Math.max(1, ...rows.map(r => r.day));
    const sorted = [...rows].sort((a, b) => b.day - a.day);
    return (
      <div className="cat-grid">
        {sorted.map(r => (
          <div key={r.cat} className={`cat-tile ${r.day ? 'on' : 'off'}`}>
            <div className="nm">{cleanCat(r.cat)}</div>
            <div className="pc">
              {r.day.toLocaleString()}
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginLeft: 4 }}>pcs</span>
            </div>
            <div className="progress" style={{ marginTop: 8, height: 5 }}><div style={{ width: `${(r.day / maxDay) * 100}%` }} /></div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
              মাসে: <b>{r.month.toLocaleString()}</b> • মোট: <b>{r.all.toLocaleString()}</b>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBrandSummary = (brandName, rows, badgeClass) => {
    const maxMonth = Math.max(1, ...rows.map(r => r.month));
    return (
      <div className="table-wrap">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>নং</th><th>ক্যাটাগরি</th>
              <th className="num">নির্বাচিত দিন</th><th className="num">মাসিক ({fm})</th>
              <th style={{ minWidth: 140 }}>মাসিক গ্রাফ</th><th className="num">সর্বমোট</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.cat}>
                <td style={{ color: 'var(--muted)', fontWeight: 700 }}>{i + 1}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{cleanCat(r.cat)}</td>
                <td className="num" style={{ color: r.day ? 'var(--primary)' : 'var(--muted)', fontWeight: r.day ? 800 : 500 }}>{r.day ? `${r.day.toLocaleString()} pcs` : '—'}</td>
                <td className="num" style={{ color: r.month ? 'var(--text-strong)' : 'var(--muted)', fontWeight: r.month ? 800 : 500 }}>{r.month ? `${r.month.toLocaleString()} pcs` : '—'}</td>
                <td><div className="progress"><div style={{ width: `${(r.month / maxMonth) * 100}%` }} /></div></td>
                <td className="num" style={{ color: 'var(--muted)' }}>{r.all ? `${r.all.toLocaleString()} pcs` : '—'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}><span className={`badge ${badgeClass}`}>{brandName}</span> মোট</td>
              <td className="num">{sumRows(rows, 'day').toLocaleString()} pcs</td>
              <td className="num">{sumRows(rows, 'month').toLocaleString()} pcs</td>
              <td />
              <td className="num">{sumRows(rows, 'all').toLocaleString()} pcs</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div>
      <PageHeader icon={deptObj.icon} title={deptObj.name} subtitle={deptObj.title} />

      <div className="grid-kpi">
        <StatCard tone="blue" icon={Factory}
          label={`১. ${selectedHistoryDate ? `${selectedHistoryDate} দিনের` : 'সব তারিখের'} প্রোডাকশন`}
          value={`${filteredFactoryPcs.toLocaleString()} Pcs`}
          sub={`Swapon's World: ${swaponPcs.toLocaleString()} • Stone Rose: ${stonePcs.toLocaleString()}`} />
        <StatCard tone="indigo" icon={BarChart3}
          label={`২. মাসিক প্রোডাকশন (${fm})`}
          value={`${monthGrandTotal.toLocaleString()} Pcs`}
          sub={`গড়: ${monthAvgPerDay.toLocaleString()} pcs/দিন • ${monthActiveDays} দিন প্রোডাকশন`} />
        <StatCard tone="green" icon={Package}
          label="৩. সর্বমোট প্রোডাকশন (All Time)"
          value={`${totalFactoryPcs.toLocaleString()} Pcs`}
          sub={`${factoryList.length} টি এন্ট্রি`} />
      </div>

      <Card>
        <CardHeader title={`📦 ক্যাটাগরি অনুযায়ী প্রোডাকশন — ${selectedHistoryDate || 'সব তারিখ'}`} subtitle="কোন ক্যাটাগরিতে কত pcs হয়েছে" />
        <div className="section-title"><span className="badge blue">Swapon's World</span> {sumRows(swaponRows, 'day').toLocaleString()} pcs</div>
        {renderCatTiles(swaponRows)}
        <div className="section-title" style={{ marginTop: 22 }}><span className="badge amber">Stone Rose</span> {sumRows(stoneRows, 'day').toLocaleString()} pcs</div>
        {renderCatTiles(stoneRows)}
      </Card>

      <Card>
        <CardHeader
          title="🗓️ মাসিক প্রোডাকশন হিসাব"
          subtitle="মাস সিলেক্ট করুন — ক্যাটাগরি অনুযায়ী মোট pcs ও প্রতিদিনের গ্রাফ"
          right={
            <div className="toolbar">
              <input type="month" className="input" style={{ width: 170 }} value={factoryMonth} onChange={(e) => setFactoryMonth(e.target.value)} />
              <button type="button" className="btn btn-dark btn-sm" onClick={downloadMonthCsv}>⬇ মাসিক CSV</button>
            </div>
          }
        />

        <div className="section-title">📊 {fm} — প্রতিদিনের প্রোডাকশন</div>
        <div className="bars" style={{ gap: 4, height: 150 }}>
          {monthDaily.map(d => (
            <div key={d.ds} className="bar-col" title={`${d.ds}: ${d.pcs} pcs`}>
              <div className="bar-track" style={{ maxWidth: 'none' }}>
                <div className="bar-solid" style={{ height: `${(d.pcs / monthDailyMax) * 100}%`, opacity: d.pcs ? 1 : 0.25 }} />
              </div>
              <span className="bar-label" style={{ fontSize: 9.5 }}>{d.day}</span>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 800, margin: '24px 0 10px' }}>Swapon's World — ক্যাটাগরি অনুযায়ী</h4>
        {renderBrandSummary("Swapon's World", swaponRows, 'blue')}

        <h4 style={{ fontSize: 14, fontWeight: 800, margin: '22px 0 10px' }}>Stone Rose — ক্যাটাগরি অনুযায়ী</h4>
        {renderBrandSummary('Stone Rose', stoneRows, 'amber')}
      </Card>

      <Card>
        <CardHeader title="🏭 প্রোডাকশন এন্ট্রি করুন" subtitle="ব্র্যান্ড ও ক্যাটাগরি সিলেক্ট করে পরিমাণ লিখুন" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!factoryQty || Number(factoryQty) <= 0) return;
            const entryDate = selectedHistoryDate || todayStr;
            const { data, error } = await supabase.from('factory_production')
              .insert([{ brand_type: factoryBrand, category_name: factoryCat, quantity: Number(factoryQty), production_date: entryDate }])
              .select();
            if (!error && data) { setFactoryList(prev => [data[0], ...prev]); setFactoryQty(''); notify('প্রোডাকশন সেভ হয়েছে ✓', 'ok'); }
            else notify('প্রোডাকশন সেভ হয়নি!');
          }}
          className="form-row"
        >
          <select className="input" style={{ width: 230, fontWeight: 600 }} value={factoryBrand}
            onChange={(e) => {
              setFactoryBrand(e.target.value);
              setFactoryCat(e.target.value === "Swapon's World" ? customOptions.swaponCats[0] : customOptions.stoneRoseCats[0]);
            }}>
            <option value="Swapon's World">Swapon's World ({customOptions.swaponCats.length} Categories)</option>
            <option value="Stone Rose">Stone Rose ({customOptions.stoneRoseCats.length} Categories)</option>
          </select>
          <select className="input" style={{ minWidth: 220, flex: '1 1 220px' }} value={factoryCat} onChange={(e) => setFactoryCat(e.target.value)}>
            {(factoryBrand === "Swapon's World" ? customOptions.swaponCats : customOptions.stoneRoseCats).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" className="input" style={{ width: 180 }} placeholder="পরিমাণ (Pcs) যেমন: 500" value={factoryQty} onChange={(e) => setFactoryQty(e.target.value)} />
          <button type="submit" className="btn btn-primary"><Plus size={15} /> প্রোডাকশন যোগ করুন</button>
        </form>

        <div className="divider-dash">
          <input type="text" className="input" style={{ width: 280 }} placeholder="নতুন ক্যাটাগরি নাম লিখুন..." value={newOptionText} onChange={(e) => setNewOptionText(e.target.value)} />
          <button type="button" className="btn btn-dark btn-sm"
            onClick={() => {
              if (!newOptionText.trim()) return;
              const k = factoryBrand === "Swapon's World" ? 'swaponCats' : 'stoneRoseCats';
              onAddCustomOption(k, newOptionText.trim());
              setFactoryCat(newOptionText.trim());
              setNewOptionText('');
            }}>
            + ক্যাটাগরি লিস্টে যোগ করুন
          </button>
        </div>
      </Card>

      <Card>
        <CardHeader title={`প্রোডাকশন এন্ট্রির তালিকা (${selectedHistoryDate || 'All Dates'})`} subtitle={`${filteredFactoryList.length} টি এন্ট্রি`} />
        <div className="table-wrap">
          <table className="erp-table">
            <thead>
              <tr><th>তারিখ</th><th>ব্র্যান্ড</th><th>ক্যাটাগরি</th><th className="num">পরিমাণ (Pcs)</th><th className="ta-right">অ্যাকশন</th></tr>
            </thead>
            <tbody>
              {filteredFactoryList.length === 0 ? (
                <tr><td colSpan={5} className="empty">এই তারিখে কোনো প্রোডাকশন এন্ট্রি নেই।</td></tr>
              ) : filteredFactoryList.map(item => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--muted)', fontWeight: 600 }}>{item.production_date}</td>
                  <td><span className={`badge ${item.brand_type === 'Stone Rose' ? 'amber' : 'blue'}`}>{item.brand_type}</span></td>
                  <td style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{item.category_name}</td>
                  <td className="num" style={{ fontWeight: 800, color: 'var(--primary)' }}>{num(item.quantity).toLocaleString()} Pcs</td>
                  <td className="ta-right">
                    <button className="btn-icon-del" title="ডিলিট করুন" onClick={() => deleteProduction(item.id)}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            {filteredFactoryList.length > 0 && (
              <tfoot><tr><td colSpan={3}>মোট</td><td className="num">{filteredFactoryPcs.toLocaleString()} Pcs</td><td /></tr></tfoot>
            )}
          </table>
        </div>
      </Card>
    </div>
  );
}