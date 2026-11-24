import React, { useState } from 'react';
import { Layers, Calculator, Package, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { dateOfISO, num, money } from '../constants/erpData';
import { Card, CardHeader, PageHeader, StatCard, Field } from '../components/UI';

export default function FabricStock({
  deptObj, fabricList, setFabricList, selectedHistoryDate, notify
}) {
  const [fabricForm, setFabricForm] = useState({
    product_category: 'Panjabi', fabric_name: '', fabric_color: '', fabric_design: '',
    total_quantity: '', unit_price: '', used_quantity: '', shortage_quantity: '0'
  });
  const [selectedFabricIds, setSelectedFabricIds] = useState([]);

  const matchesSelectedDate = (d) => !selectedHistoryDate || d === selectedHistoryDate;
  const filteredFabricList = fabricList.filter(f => matchesSelectedDate(dateOfISO(f.created_at)));
  const fabricTotalValue = filteredFabricList.reduce((a, f) => a + num(f.total_price ?? num(f.total_quantity) * num(f.unit_price)), 0);
  const fabricTotalQty = filteredFabricList.reduce((a, f) => a + num(f.total_quantity), 0);
  const fabricTotalUsed = filteredFabricList.reduce((a, f) => a + num(f.used_quantity), 0);
  const fabricTotalShort = filteredFabricList.reduce((a, f) => a + num(f.shortage_quantity), 0);

  const selectedInView = filteredFabricList.filter(f => selectedFabricIds.includes(f.id)).map(f => f.id);
  const allFabricSelected = filteredFabricList.length > 0 && selectedInView.length === filteredFabricList.length;

  const deleteFabricByIds = async (ids) => {
    if (!ids || ids.length === 0) return;
    if (!window.confirm(`${ids.length} টি স্টক এন্ট্রি স্থায়ীভাবে ডিলিট করতে চান?`)) return;
    const { error } = await supabase.from('fabric_stock').delete().in('id', ids);
    if (!error) {
      setFabricList(prev => prev.filter(f => !ids.includes(f.id)));
      setSelectedFabricIds(prev => prev.filter(id => !ids.includes(id)));
      notify('স্টক এন্ট্রি ডিলিট হয়েছে ✓', 'ok');
    } else notify('ডিলিট করা যায়নি!');
  };

  const toggleFabricSelect = (id) =>
    setSelectedFabricIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <div>
      <PageHeader icon={deptObj.icon} title={deptObj.name} subtitle={deptObj.title} />

      <div className="grid-kpi">
        <StatCard tone="blue" icon={Layers} label="নির্বাচিত তারিখের লট" value={`${filteredFabricList.length} টি`} sub={`মোট পরিমাণ: ${fabricTotalQty.toLocaleString()}`} />
        <StatCard tone="green" icon={Calculator} label="মোট ক্রয়মূল্য" value={money(fabricTotalValue)} />
        <StatCard tone="indigo" icon={Package} label="ব্যবহৃত কাপড়" value={fabricTotalUsed.toLocaleString()} sub={`অবশিষ্ট: ${(fabricTotalQty - fabricTotalUsed).toLocaleString()}`} />
        <StatCard tone="red" icon={AlertTriangle} label="মোট ঘাটতি" value={fabricTotalShort.toLocaleString()} />
      </div>

      <Card>
        <CardHeader title="🧵 নতুন কাপড়ের স্টক এন্ট্রি ফর্ম" subtitle="* চিহ্নিত ঘরগুলো আবশ্যক" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!fabricForm.fabric_name) return;
            const payload = {
              product_category: fabricForm.product_category,
              fabric_name: fabricForm.fabric_name,
              fabric_color: fabricForm.fabric_color,
              fabric_design: fabricForm.fabric_design,
              total_quantity: num(fabricForm.total_quantity),
              unit_price: num(fabricForm.unit_price),
              used_quantity: num(fabricForm.used_quantity),
              shortage_quantity: num(fabricForm.shortage_quantity)
            };
            const { data, error } = await supabase.from('fabric_stock').insert([payload]).select();
            if (!error && data) {
              setFabricList(prev => [data[0], ...prev]);
              setFabricForm({ ...fabricForm, fabric_name: '', fabric_color: '', fabric_design: '', total_quantity: '', unit_price: '', used_quantity: '', shortage_quantity: '0' });
              notify('স্টক সেভ হয়েছে ✓', 'ok');
            } else notify('স্টক সেভ হয়নি!');
          }}
          className="form-grid"
        >
          <Field label="১. পণ্যের ক্যাটাগরি"><input type="text" className="input" value={fabricForm.product_category} onChange={e => setFabricForm({ ...fabricForm, product_category: e.target.value })} /></Field>
          <Field label="২. কাপড়ের নাম *"><input type="text" required className="input" placeholder="যেমন: কটন / সিল্ক" value={fabricForm.fabric_name} onChange={e => setFabricForm({ ...fabricForm, fabric_name: e.target.value })} /></Field>
          <Field label="৩. কাপড়ের কালার"><input type="text" className="input" placeholder="যেমন: মেরুন / নেভি ব্লু" value={fabricForm.fabric_color} onChange={e => setFabricForm({ ...fabricForm, fabric_color: e.target.value })} /></Field>
          <Field label="৪. কাপড়ের ডিজাইন"><input type="text" className="input" placeholder="যেমন: প্রিন্ট / সলিড" value={fabricForm.fabric_design} onChange={e => setFabricForm({ ...fabricForm, fabric_design: e.target.value })} /></Field>
          <Field label="৫. কাপড়ের পরিমাণ (মিটার/গজ) *"><input type="number" required className="input" value={fabricForm.total_quantity} onChange={e => setFabricForm({ ...fabricForm, total_quantity: e.target.value })} /></Field>
          <Field label="৬. প্রতি মিটারের ক্রয়মূল্য (৳) *"><input type="number" required className="input" value={fabricForm.unit_price} onChange={e => setFabricForm({ ...fabricForm, unit_price: e.target.value })} /></Field>
          <Field label="৮. ব্যবহৃত কাপড়ের পরিমাণ"><input type="number" className="input" value={fabricForm.used_quantity} onChange={e => setFabricForm({ ...fabricForm, used_quantity: e.target.value })} /></Field>
          <Field label="১০. কাপড়ের ঘাটতি"><input type="number" className="input" value={fabricForm.shortage_quantity} onChange={e => setFabricForm({ ...fabricForm, shortage_quantity: e.target.value })} /></Field>
          <button type="submit" className="btn btn-primary"><Plus size={15} /> স্টক সেভ করুন</button>
        </form>
      </Card>

      <Card>
        <CardHeader title={`কাপড়ের স্টক ও হিসাব তালিকা (${selectedHistoryDate || 'All Dates'})`} subtitle={`${filteredFabricList.length} টি লট`} />

        {selectedInView.length > 0 && (
          <div className="sel-bar">
            <span>✓ {selectedInView.length} টি এন্ট্রি নির্বাচিত</span>
            <span style={{ display: 'inline-flex', gap: 8 }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSelectedFabricIds([])}>সিলেকশন বাতিল</button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteFabricByIds(selectedInView)}>
                <Trash2 size={13} /> নির্বাচিত ডিলিট করুন
              </button>
            </span>
          </div>
        )}

        <div className="table-wrap">
          <table className="erp-table">
            <thead>
              <tr>
                <th style={{ width: 44 }}>
                  <input type="checkbox" className="chk" checked={allFabricSelected}
                    onChange={() => setSelectedFabricIds(allFabricSelected ? [] : filteredFabricList.map(f => f.id))} />
                </th>
                <th>তারিখ</th><th>ক্যাটাগরি</th><th>কাপড়ের নাম</th><th>কালার / ডিজাইন</th>
                <th className="num">মোট পরিমাণ</th><th className="num">দর (৳)</th><th className="num">৭. মোট মূল্য</th>
                <th className="num">ব্যবহৃত</th><th className="num">৯. অবশিষ্ট</th><th className="num">ঘাটতি</th>
                <th className="ta-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredFabricList.length === 0 ? (
                <tr><td colSpan={12} className="empty">এই তারিখে কোনো কাপড়ের স্টক এন্ট্রি নেই।</td></tr>
              ) : filteredFabricList.map(f => (
                <tr key={f.id} className={selectedFabricIds.includes(f.id) ? 'rowsel' : ''}>
                  <td><input type="checkbox" className="chk" checked={selectedFabricIds.includes(f.id)} onChange={() => toggleFabricSelect(f.id)} /></td>
                  <td style={{ color: 'var(--muted)', fontSize: 12.5, fontWeight: 600 }}>{dateOfISO(f.created_at)}</td>
                  <td>{f.product_category}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{f.fabric_name}</td>
                  <td>{f.fabric_color} {f.fabric_design ? `(${f.fabric_design})` : ''}</td>
                  <td className="num">{f.total_quantity}</td>
                  <td className="num">{money(f.unit_price)}</td>
                  <td className="num" style={{ fontWeight: 700, color: 'var(--green)' }}>{money(f.total_price ?? num(f.total_quantity) * num(f.unit_price))}</td>
                  <td className="num">{f.used_quantity}</td>
                  <td className="num" style={{ fontWeight: 700, color: 'var(--primary)' }}>{f.remaining_quantity ?? (num(f.total_quantity) - num(f.used_quantity))}</td>
                  <td className="num" style={{ color: num(f.shortage_quantity) > 0 ? 'var(--red)' : 'var(--muted)', fontWeight: 600 }}>{f.shortage_quantity}</td>
                  <td className="ta-right">
                    <button className="btn-icon-del" onClick={() => deleteFabricByIds([f.id])}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            {filteredFabricList.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={5}>মোট</td>
                  <td className="num">{fabricTotalQty.toLocaleString()}</td>
                  <td />
                  <td className="num">{money(fabricTotalValue)}</td>
                  <td className="num">{fabricTotalUsed.toLocaleString()}</td>
                  <td className="num">{(fabricTotalQty - fabricTotalUsed).toLocaleString()}</td>
                  <td className="num">{fabricTotalShort.toLocaleString()}</td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>
    </div>
  );
}