import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutDashboard, Palette, Megaphone, TrendingUp,
  Headphones, UserCheck, BellRing, Factory,
  Clock, Plus, LogOut, ShieldCheck, Lock, User, Trash2,
  RefreshCw, Search, Eye, EyeOff, AlertCircle,
  Calculator, Layers, Video, PenTool, CheckCircle2, Activity,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, BarChart3,
  ClipboardList, Package, AlertTriangle, Crown, Check, X, Users, Save,
  ShoppingCart, Truck, Camera, ArrowRight, Film, MapPin, FileText,
  ExternalLink, HardDrive, FileCode, Image as ImageIcon, Zap,
  Copy, Pencil, RotateCcw, CheckCheck, Hourglass, FileCheck
} from 'lucide-react';

// =========================================================================
// SUPABASE CLOUD DATABASE CONNECTION (UNCHANGED)
// =========================================================================
const SUPABASE_URL = 'https://ndaxzdzkotubloaehpqe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SyY1YxpTqsdD0-azaXRQiw_yJMnC4bO';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// =========================================================================
// CUSTOM SWAPON'S WORLD LOGO COMPONENT
// =========================================================================
const SwaponLogo = ({ size = 42, showTagline = false, lightText = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
    <div style={{
      width: size, height: size, borderRadius: 11, backgroundColor: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)', padding: 4
    }}>
      <svg viewBox="0 0 120 100" width="100%" height="100%">
        <polygon points="8,24 34,24 44,44 56,44 46,58 26,58" fill="#E11D24" />
        <polygon points="112,24 86,24 76,44 64,44 74,58 94,58" fill="#E11D24" />
        <polygon points="60,6 76,22 66,32 56,22 46,32 76,62 60,94 44,78 54,68 64,78 74,68 44,38" fill="#0F172A" />
      </svg>
    </div>
    <div style={{ textAlign: 'left' }}>
      <div style={{
        fontWeight: 800, fontSize: showTagline ? 19 : 15, lineHeight: 1.15,
        color: lightText ? '#FFFFFF' : '#0F172A', letterSpacing: '0.02em'
      }}>
        SWAPON’S WORLD
      </div>
      <div style={{
        fontSize: showTagline ? 11.5 : 10.5,
        color: lightText ? '#93C5FD' : '#64748B',
        marginTop: 2, fontWeight: 600
      }}>
        {showTagline ? 'Always Be Different • Enterprise ERP' : 'Always Be Different'}
      </div>
    </div>
  </div>
);

// =========================================================================
// DEPARTMENTS & STRICT ACCESS CONTROL
// =========================================================================
const USERS = [
  { id: 'dashboard', username: 'boss', password: 'swapon@000', name: 'Executive Dashboard', title: 'Boss Master Control, Analytics & Attendance Overview', icon: Crown, isBoss: true },
  { id: 'admin', username: 'admin', password: 'swapon@111', name: 'Admin Department', title: 'Daily Attendance Sheet (Head Office, Shift & Factory)', icon: ShieldCheck, isBoss: false },
  { id: 'manager', username: 'gm', password: 'swapon@222', name: 'General Manager', title: '18-Point Daily Operations & Approval', icon: LayoutDashboard, isBoss: false },
  { id: 'head_sales', username: 'sales', password: 'swapon@555', name: 'Head of Operation', title: 'Daily Operations, Team & Fulfillment Strategy', icon: TrendingUp, isBoss: false },
  { id: 'senior_accounts', username: 'accounts', password: 'swapon@1010', name: 'Senior Accounts', title: 'Daily Ledger, Audit & Financial Report', icon: Calculator, isBoss: false },
  { id: 'creative_it', username: 'creative', password: 'swapon@333', name: 'Creative IT', title: 'Video Editor, Graphic Design & Videographer', icon: Palette, isBoss: false },
  { id: 'marketing', username: 'marketing', password: 'swapon@444', name: 'Digital Marketing', title: '18-Point Campaign, Ads & Growth', icon: Megaphone, isBoss: false },
  { id: 'cc_coordinator', username: 'coordinator', password: 'swapon@666', name: 'Call Center Coordinator', title: 'Call Operations & Order Verification', icon: Headphones, isBoss: false },
  { id: 'cc_leader_morning', username: 'leader_morning', password: 'swapon@777', name: 'Call Center Team Leader (Morning)', title: 'Morning Shift (9:00 AM) Agent Supervision & Follow-up', icon: UserCheck, isBoss: false },
  { id: 'cc_leader_evening', username: 'leader_evening', password: 'swapon@778', name: 'Call Center Team Leader (Evening)', title: 'Evening Shift Agent Supervision & Follow-up', icon: UserCheck, isBoss: false },
  { id: 'reception', username: 'reception', password: 'swapon@888', name: 'Reception Desk', title: 'Visitor, Courier & Front Office Log', icon: BellRing, isBoss: false },
  { id: 'orders', username: 'orders', password: 'swapon@1212', name: 'Order Management', title: 'অর্ডার, কুরিয়ার ও ডেলিভারি ট্র্যাকিং', icon: ShoppingCart, isBoss: false },
  { id: 'factory', username: 'factory', password: 'swapon@999', name: 'Factory Manager', title: "Swapon's World & Stone Rose Production", icon: Factory, isBoss: false },
  { id: 'fabric_stock', username: 'fabric', password: 'swapon@1111', name: 'Fabric Stock Entry', title: 'Cloth Inventory, Cost & Shortage Ledger', icon: Layers, isBoss: false },
];

const DEPT_GROUPS = [
  { label: 'Boss Master View', ids: ['dashboard'] },
  { label: 'Administration & Management', ids: ['admin', 'manager'] },
  { label: 'Sales & Marketing', ids: ['head_sales', 'marketing', 'creative_it'] },
  { label: 'Customer Operations', ids: ['cc_coordinator', 'cc_leader_morning', 'cc_leader_evening', 'reception', 'orders'] },
  { label: 'Production & Inventory', ids: ['factory', 'fabric_stock'] },
  { label: 'Finance', ids: ['senior_accounts'] },
];

// =========================================================================
// DEFAULT ATTENDANCE ROSTERS
// =========================================================================
const DEFAULT_HEAD_OFFICE_ROSTER = [
  { sl: 1, dept: 'Head Office', name: 'Rezaur Rahman', shift: '10:00', status: 'Present' },
  { sl: 2, dept: 'Head Office', name: 'Mohammad Fazle Rabbi', shift: '10:00', status: 'Present' },
  { sl: 3, dept: 'Head Office', name: 'Akash', shift: '10:00', status: 'Late' },
  { sl: 4, dept: 'Head Office', name: 'Omar Faruk', shift: '10:00', status: 'Present' },
  { sl: 5, dept: 'Head Office', name: 'Hasibul Hossain', shift: '10:00', status: 'Present' },
  { sl: 6, dept: 'Head Office', name: 'Soad', shift: '10:00', status: 'Present' },
  { sl: 7, dept: 'Head Office', name: 'Mahadi', shift: '10:00', status: 'Present' },
  { sl: 8, dept: 'Head Office', name: 'Rasel', shift: '10:00', status: 'Present' },
  { sl: 9, dept: 'Head Office', name: 'Nodi', shift: '10:00', status: 'Present' },
  { sl: 10, dept: 'Head Office', name: 'Arafat', shift: '10:00', status: 'Present' },
  { sl: 11, dept: 'Call Center Morning Team', name: 'Rakib', shift: '9:00', status: 'Present' },
  { sl: 12, dept: 'Call Center Morning Team', name: 'Raheli Jinnat', shift: '9:00', status: 'Day Off' },
  { sl: 13, dept: 'Call Center Morning Team', name: 'Shirin', shift: '9:00', status: 'Present' },
  { sl: 14, dept: 'Call Center Morning Team', name: 'Faria', shift: '9:00', status: 'Present' },
  { sl: 15, dept: 'Call Center Morning Team', name: 'Arif', shift: '9:00', status: 'Day Off' },
  { sl: 16, dept: 'Call Center Morning Team', name: 'Tania', shift: '9:00', status: 'Present' },
  { sl: 17, dept: 'Call Center Morning Team', name: 'Sanjana', shift: '9:00', status: 'Present' },
  { sl: 18, dept: 'Call Center Morning Team', name: 'Farzana', shift: '9:00', status: 'Present' },
  { sl: 19, dept: 'Call Center Morning Team', name: 'Jakir', shift: '9:00', status: 'Present' },
  { sl: 20, dept: 'Call Center Morning Team', name: 'Shanta Moni', shift: '9:00', status: 'Present' },
  { sl: 21, dept: 'Call Center Morning Team', name: 'Samir', shift: '9:00', status: 'Absent' },
  { sl: 22, dept: 'Call Center Morning Team', name: 'Eram', shift: '9:00', status: 'Present' },
  { sl: 24, dept: 'Call Center Morning Team', name: 'Shuvro', shift: '9:00', status: 'Present' },
  { sl: 25, dept: 'Service Team', name: 'Samir Hossain', shift: '-', status: 'Leave' },
  { sl: 26, dept: 'Whole Sale', name: 'Rakib', shift: '10:00', status: 'Present' },
  { sl: 27, dept: 'WearHouse', name: 'Md. Simul Ahmed', shift: '10:00', status: 'Present' },
  { sl: 28, dept: 'WearHouse', name: 'Fahim Ahmed', shift: '10:00', status: 'Present' },
  { sl: 29, dept: 'WearHouse', name: 'Md Shojon Shikdar', shift: '10:00', status: 'Present' },
  { sl: 30, dept: 'Mirpur Shop', name: 'Imran Khan', shift: '10:00', status: 'Present' },
  { sl: 31, dept: 'Mirpur Shop', name: 'Sifat', shift: '10:00', status: 'Present' },
  { sl: 32, dept: 'Mirpur Shop', name: 'Tazul Islam', shift: '10:00', status: 'Present' },
  { sl: 33, dept: 'Dinajpur Shop', name: 'Md. Faysal Kabir', shift: '10:00', status: 'Present' },
  { sl: 34, dept: 'Dinajpur Shop', name: 'Shoron', shift: '10:00', status: 'Present' },
  { sl: 35, dept: 'Sylhet Shop', name: 'Ahmed Kamran', shift: '10:00', status: 'Late' },
  { sl: 36, dept: 'Sylhet Shop', name: 'Mizan Ahmed', shift: '10:00', status: 'Present' },
  { sl: 37, dept: 'Sylhet Shop', name: 'Akib', shift: '10:00', status: 'Present' },
];

const DEFAULT_AFTERNOON_ROSTER = [
  { sl: 1, dept: 'WearHouse', name: 'Akik Khan', shift: '12:00', status: 'Present' },
  { sl: 2, dept: 'WearHouse', name: 'Sheikh Asifur Rahman', shift: '12:00', status: 'Absent' },
  { sl: 3, dept: 'Service Team', name: 'Sabit Shanto', shift: '12:00', status: 'Present' },
  { sl: 4, dept: 'Service Team', name: 'Tushar', shift: '11:00', status: 'Late' },
];

const DEFAULT_FACTORY_ATTENDANCE = [
  { id: 'f1', dept: 'Sewing', post: 'Floor Incharge', total: 1, present: 1 },
  { id: 'f2', dept: 'Sewing', post: 'Supervisor', total: 0, present: 0 },
  { id: 'f3', dept: 'Sewing', post: 'Operator', total: 23, present: 23 },
  { id: 'f4', dept: 'Sewing', post: 'Helper', total: 13, present: 12 },
  { id: 'f5', dept: 'Sewing', post: 'Iron-Line', total: 2, present: 2 },
  { id: 'f6', dept: 'Sewing', post: 'Inporter', total: 1, present: 0 },
  { id: 'f7', dept: 'Sewing', post: 'Store Keeper', total: 1, present: 1 },
  { id: 'f8', dept: 'Printing', post: 'Supervisor', total: 0, present: 0 },
  { id: 'f9', dept: 'Printing', post: 'Operator', total: 3, present: 3 },
  { id: 'f10', dept: 'Printing', post: 'Bichani', total: 1, present: 1 },
  { id: 'f11', dept: 'Printing', post: 'DryerMan', total: 0, present: 0 },
  { id: 'f12', dept: 'Printing', post: 'Helper', total: 3, present: 2 },
  { id: 'f13', dept: 'Cutting', post: 'Cutting Master', total: 1, present: 1 },
  { id: 'f14', dept: 'Cutting', post: 'Cutting Man', total: 1, present: 1 },
  { id: 'f15', dept: 'Cutting', post: 'Helper', total: 2, present: 1 },
  { id: 'f16', dept: 'Button, QC & Finishing', post: 'Button Man', total: 2, present: 2 },
  { id: 'f17', dept: 'Button, QC & Finishing', post: 'Button Helper', total: 3, present: 1 },
  { id: 'f18', dept: 'Button, QC & Finishing', post: 'QC', total: 2, present: 2 },
  { id: 'f19', dept: 'Button, QC & Finishing', post: 'Finishing Helper', total: 3, present: 3 },
  { id: 'f20', dept: 'Button, QC & Finishing', post: 'Finishing (Suta)', total: 1, present: 1 },
  { id: 'f21', dept: 'Iron & Packaging', post: 'Boilar Man', total: 1, present: 1 },
  { id: 'f22', dept: 'Iron & Packaging', post: 'Folding Man', total: 1, present: 1 },
];

// =========================================================================
// DEFAULT CATEGORIES & RESPONSIBILITIES
// =========================================================================
const INITIAL_GM_AREAS = [
  '1. Daily Business Overview – পুরো কোম্পানির দৈনিক কার্যক্রম পর্যবেক্ষণ',
  '2. Sales Target Monitoring – Daily, Weekly ও Monthly Target বনাম Achievement',
  '3. Department Performance Monitoring – সকল বিভাগের কাজ ও ফলাফল যাচাই',
  '4. Call Center Monitoring – Call, Message, Order Confirmation ও Sales Performance',
  '5. Digital Marketing Monitoring – Content, Design, Video ও Campaign Performance',
  '6. E-Commerce Monitoring – Website Order ও Online Sales পর্যবেক্ষণ',
  '7. Order Management – Pending, Confirmed, Cancelled ও Delivered Order Review',
  '8. Employee Performance Evaluation – কর্মী ও Team Leader-এর KPI মূল্যায়ন',
  '9. Attendance & Leave Management – উপস্থিতি, ছুটি ও Duty Monitoring',
  '10. Inventory & Stock Monitoring – Stock Balance ও Shortage Review',
  '11. Warehouse & Delivery Monitoring – Packing, Dispatch ও Delivery Status',
  '12. Accounts & Financial Review – Income, Expense ও Profit/Loss Monitoring',
  '13. Customer Complaint Management – Customer Issues ও Escalation সমাধান',
  '14. Task Assignment & Follow-up – Department-wise Task Assign ও Deadline Monitoring',
  '15. Approval Management – Leave, Expense ও Operational Approval',
  '16. Operational Problem Solving – প্রতিষ্ঠানের দৈনন্দিন সমস্যা সমাধান',
  '17. Weekly & Monthly Performance Review – Business ও Department Analysis',
  '18. Business Growth Planning – Sales Growth, Cost Control ও Future Business Strategy'
];

const INITIAL_SALES_AREAS = [
  '1. Sales Strategy & Target Planning', '2. Online Sales Management', '3. Showroom Sales Management',
  '4. Sales Team Management', '5. Sales Performance Monitoring', '6. Customer Relationship Management',
  '7. Stock & Product Coordination', '8. Sales Growth & Reporting'
];

const INITIAL_DM_AREAS = [
  '1. Digital Marketing Strategy', '2. Campaign Management', '3. Facebook Page Management',
  '4. Content Planning', '5. Content Performance Analysis', '6. Video Production Management',
  '7. Graphic Design Management', '8. Paid Advertising Management', '9. Advertisement Budget Control',
  '10. Audience Targeting', '11. Lead Generation', '12. Customer Engagement Management',
  '13. Website Traffic Monitoring', '14. Digital Sales Monitoring', '15. Competitor Analysis',
  '16. Brand Awareness Development', '17. Digital Team Management', '18. Marketing Performance Reporting'
];

const INITIAL_CC_COORD_AREAS = [
  '1. Daily Call Center Operations Management', '2. Team Task Distribution & Coordination',
  '3. Daily Sales Target Monitoring', '4. Customer Call & Follow-up Monitoring',
  '5. Order Confirmation & Verification', '6. Agent Performance Monitoring',
  '7. Customer Complaint & Issue Management', '8. Daily Sales & Performance Reporting'
];

const INITIAL_CC_LEADER_AREAS = [
  '1. Agent Daily Supervision', '2. Team Attendance & Shift Check',
  '3. Follow-up Call Monitoring', '4. Agent Target vs Achievement',
  '5. Order Cancel/Return Reason Review', '6. Agent Coaching & Feedback',
  '7. Daily Team Report to Coordinator'
];

const INITIAL_RECEPTION_AREAS = [
  '1. Visitor Management', '2. Guest Reception & Assistance', '3. Visitor Entry & Exit Recording',
  '4. Meeting & Appointment Management', '5. Courier & Parcel Receiving/Dispatch',
  '6. Official Document Receiving & Distribution', '7. Daily Reception Activity Reporting'
];

const INITIAL_ACCOUNTS_AREAS = [
  '1. Vendor Statement', '2. Cash In & Cash Out', '3. Courier Report',
  '4. Salary', '5. Daily Expense', '6. Rent'
];

const INITIAL_SWAPON_FACTORY_CATS = [
  '1. Panjabi Embroidery', '2. Panjabi Screen Print', '3. Sublimation Panjabi',
  '4. Total Panjabi', '5. Kameez Screen Print', '6. Kameez Sublimation',
  '7. Half Shirt', '8. Dhoti', '9. Bomber Jacket', '10. Maggi Jacket',
  '11. Hoodies', '12. Long Sleeve T-Shirt', '13. Winter Jacket',
  '14. Sweat Shirt', '15. Tanktop'
];

const INITIAL_STONE_ROSE_CATS = [
  '1. Jacket Tracksuit', '2. Hoodies Tracksuit', '3. Maggi Tracksuit',
  '4. Summer Tracksuit', '5. Jacket', '6. Hoodies', '7. Polo', '8. Trouser'
];

const INITIAL_STUDIO_TASKS = [
  {
    id: 'task-vid-1',
    title: 'সামার সেলস টিকটক ও ইনস্টাগ্রাম রিলস ভার্টিক্যাল কাট (৯:১৬)',
    assignee: 'video_editor',
    assigneeName: 'ভিডিও এডিটর',
    department: 'video',
    deadlineCategory: 'today',
    dueDate: 'আজ সন্ধ্যা ৬:০০ (Today)',
    completed: false,
    isUrgent: true,
    referenceVideoUrl: 'https://youtube.com/shorts/sample-reels-reference',
    scriptText: `[হুক (০-৩ সেকেন্ড)]:
"আপনি কি জানেন আপনার বিজনেসের সেলস ৩০% কমে যেতে পারে মাত্র একটি ভুলের কারণে?"

[বডি (৩-২০ সেকেন্ড)]:
"স্বপনস ওয়ার্ল্ড এর প্রিমিয়াম ভিডিও প্রোডাকশন দিয়ে আপনার ব্র‍্যান্ডকে নিয়ে যান অনন্য উচ্চতায়। হাই-কোয়ালিটি সিনেমাটিক ফুটেজ ও ট্রেন্ডিং বিটস।"

[কল টু অ্যাকশন (২০-৩০ সেকেন্ড)]:
"দেরি না করে আজই বায়োতে দেওয়া লিংকে ক্লিক করুন অথবা ইনবক্সে মেসেজ পাঠান!"`,
    notes: 'প্রথম ৩ সেকেন্ডের হুক, ফাস্ট ট্রানজিশন এবং ট্রেন্ডিং সাউন্ড এফেক্টস সিঙ্ক করবেন। ড্রাইভ থেকে ফুটেজ ফোল্ডার লিঙ্ক করুন।',
  },
  {
    id: 'task-vid-2',
    title: 'ভয়েসওভার ও সাউন্ড সিঙ্ক মাস্টার (Voiceover & Audio)',
    assignee: 'video_editor',
    assigneeName: 'ভিডিও এডিটর',
    department: 'video',
    deadlineCategory: 'today',
    dueDate: 'আজ রাত ৮:০০ (Today)',
    completed: false,
    isUrgent: true,
    referenceVideoUrl: 'https://drive.google.com/file/d/voiceover-audio-reference/view',
    scriptText: `[ভয়েসওভার মাস্টার স্ক্রিপ্ট — স্বপনস ওয়ার্ল্ড ক্রিয়েটিভ স্টুডিও]:
"সঠিক পরিকল্পনাই একটি সফল ব্র্যান্ডের মূল ভিত্তি। প্রতিটি ভিজ্যুয়াল, প্রতিটি কালার টোন আর প্রতিটি কাট—আমরা সাজিয়ে তুলি আপনার স্বপ্নের মতো করে। কারণ আপনার গল্পটি অসাধারণ হতে বাধ্য।"`,
    notes: 'ভয়েসওভার ক্লিন করা, ব্যাকগ্রাউন্ড নয়েজ রিমুভ ও সাউন্ড লেভেল -14 LUFS নরম্যালাইজেশন।',
  },
  {
    id: 'task-vid-3',
    title: 'প্রোডাক্ট টিজার ও বি-রোল কাট — রিভিশন পেন্ডিং',
    assignee: 'video_editor',
    assigneeName: 'ভিডিও এডিটর',
    department: 'video',
    deadlineCategory: 'tomorrow',
    dueDate: 'কালকের ভেতরেই শেষ করতে হবে',
    completed: false,
    statusState: 'not_done',
    referenceVideoUrl: 'https://youtube.com/shorts/product-teaser-sample',
    scriptText: `[টিজার টেক্সট সুপার ও ভয়েসওভার]:
"আগামীকাল আসছে নতুন চমক। চোখ রাখুন স্বপনস ওয়ার্ল্ড পেইজে!"`,
    notes: 'হেডের রিভিউ নোট: মিউজিকের বিটের সাথে কাট ফাস্ট করতে হবে। আগের কাজ এখনও সম্পন্ন হয় নাই।',
  },
  {
    id: 'task-vid-4',
    title: 'ইউটিউব ফুল ডকুমেন্টারি ভিডিও কাট ও কালার গ্রেডিং (১৬:৯)',
    assignee: 'video_editor',
    assigneeName: 'ভিডিও এডিটর',
    department: 'video',
    deadlineCategory: '7days',
    dueDate: 'আগামী ৭ দিনের ভেতর (7 Days)',
    completed: false,
    referenceVideoUrl: 'https://youtube.com/watch?v=sample-documentary-grade',
    scriptText: `[ডকুমেন্টারি ভয়েসওভার পর্ব ০১]:
"ঢাকার বুকে ক্রিয়েটিভ ইন্ডাস্ট্রির নতুন বিপ্লব শুরু হয়েছিল এই স্টুডিও থেকেই..."`,
    notes: '১৬:৯ ইউটিউব মাস্টার কাট, বি-রোল সিঙ্ক, সাউন্ড ডিজাইন ও Rec.709 কালার গ্রেডিং।',
  },
  {
    id: 'task-vid-5',
    title: 'ইউটিউব ইন্ট্রো ও মোশন গ্রাফিক্স কাট',
    assignee: 'video_editor',
    assigneeName: 'ভিডিও এডিটর',
    department: 'video',
    deadlineCategory: 'today',
    dueDate: 'আজ দুপুর ২:০০',
    completed: true,
    statusState: 'completed',
    referenceVideoUrl: 'https://youtube.com/watch?v=intro-motion-ref',
    notes: 'ফাইনাল রেন্ডার সম্পন্ন হয়েছে এবং ড্রাইভ স্টুডিও ফোল্ডারে আপলোড করা আছে।',
  },
  {
    id: 'task-des-1',
    title: 'সামার কালেকশন সোশ্যাল মিডিয়া ব্যানার সেট (১০৮০x১০৮০)',
    assignee: 'designer',
    assigneeName: 'গ্রাফিক ডিজাইনার',
    department: 'design',
    deadlineCategory: 'today',
    dueDate: 'আজ দুপুর ৩:০০ (Today)',
    completed: false,
    isUrgent: true,
    scriptText: `[ব্যানার টেক্সট ও টাইপোগ্রাফি]:
"SUMMER DROP 2026 • FLAT 40% OFF"`,
    notes: 'ফেসবুক ও ইনস্টাগ্রাম স্কয়ার পোস্ট এবং স্টোরি সাইজ প্রস্তুত করতে হবে।',
  },
  {
    id: 'task-sht-1',
    title: 'নতুন প্রোডাক্ট ক্যাম্পেইন — আউটডোর শুট',
    assignee: 'videographer',
    assigneeName: 'সিনেমাটোগ্রাফার / শুটার',
    department: 'shoot',
    deadlineCategory: 'today',
    dueDate: 'আজ দুপুর ২:৩০ PM (Today)',
    completed: false,
    isUrgent: true,
    location: 'ধানমন্ডি লেক ও আউটডোর স্পট',
    shootTime: 'দুপুর ২:৩০ PM – ৫:০০ PM',
    notes: 'ন্যাচারাল গোল্ডেন আওয়ার লাইটিং ও স্লো-মোশন ক্লোজ-আপ শট। ফুটেজ ড্রাইভে ব্যাকআপ করতে হবে।',
  },
];

const INITIAL_STUDIO_FILES = [
  {
    id: 'file-vid-1',
    title: 'সামার সেলস ৯:১৬ ভার্টিক্যাল রিলস — ড্রাফট রেন্ডার',
    fileName: 'Summer_Reels_Hook_V3_4K.mp4',
    fileType: 'video',
    fileFormat: 'MP4 (4K 60fps)',
    fileSize: '285 MB',
    driveUrl: 'https://drive.google.com/drive/folders/swapons_world_video',
    owner: 'video_editor',
    ownerName: 'ভিডিও এডিটর',
    status: 'ready_for_review',
    uploadedAt: '২১ নভেম্বর, দুপুর ০১:১৫',
    notes: 'কালার গ্রেডিং Rec.709 স্ট্যান্ডার্ড এবং সাউন্ড লেভেল -14 LUFS নরম্যালাইজ করা হয়েছে।',
  },
  {
    id: 'file-vid-3',
    title: 'টিকটক প্রোডাক্ট অ্যাডভার্টাইজমেন্ট প্রজেক্ট ফাইল',
    fileName: 'Tiktok_Product_Ad_Cut_Final.prproj',
    fileType: 'project',
    fileFormat: 'Premiere Pro (.prproj)',
    fileSize: '32 MB',
    driveUrl: 'https://drive.google.com/drive/folders/swapons_world_video',
    owner: 'video_editor',
    ownerName: 'ভিডিও এডিটর',
    status: 'approved',
    uploadedAt: '২০ নভেম্বর, সন্ধ্যা ০৭:০০',
    notes: 'সম্পূর্ণ প্রোজেক্ট ফাইল অ্যাপ্রুভড এবং ড্রাইভে ব্যাকআপ সংরক্ষিত।',
  },
];

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
const COURIERS = ['Pathao', 'RedX', 'SteadFast', 'Paperfly', 'Other'];
const ORDER_TONE = { Pending: 'amber', Confirmed: 'blue', Shipped: 'indigo', Delivered: 'green', Cancelled: 'red', Returned: 'red' };

// =========================================================================
// HELPERS
// =========================================================================
const localDateStr = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const dateOfISO = (iso) => (iso ? localDateStr(new Date(iso)) : localDateStr());
const isDoneStatus = (s) => s === 'Done' || s === 'Completed';
const formatCleanTitle = (rawTitle) => (rawTitle ? rawTitle.replace(/^\[\d{4}-\d{2}-\d{2}\]\s*/, '') : '');
const num = (v) => Number(v || 0);
const money = (v) => `৳${num(v).toLocaleString()}`;
const healthColor = (pct, hasData) => (!hasData ? '#CBD5E1' : pct >= 70 ? '#15803D' : pct >= 40 ? '#D97706' : '#B91C1C');

// =========================================================================
// DESIGN SYSTEM + CREATIVE STUDIO STYLES
// =========================================================================
const ENTERPRISE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #F3F5F9;
    --surface: #FFFFFF;
    --surface-2: #F8FAFC;
    --border: #E3E8EF;
    --border-strong: #CBD5E1;
    --text: #1F2937;
    --text-strong: #0F172A;
    --muted: #64748B;
    --navy: #0B1F3A;
    --navy-2: #12294A;
    --navy-line: #1E3A5F;
    --primary: #1D4ED8;
    --primary-hover: #1E40AF;
    --primary-soft: #EAF0FE;
    --green: #15803D;  --green-soft: #E7F6EC;
    --amber: #B45309;  --amber-soft: #FEF3E2;
    --red: #B91C1C;    --red-soft: #FDECEC;
    --purple: #6D28D9; --purple-soft: #F1EBFE;
    --indigo: #4338CA; --indigo-soft: #ECEBFD;
    --radius: 14px;
    --shadow: 0 1px 2px rgba(15,23,42,.04), 0 4px 14px -6px rgba(15,23,42,.08);
    --font-bn: 'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-num: 'Inter', 'Hind Siliguri', sans-serif;
  }

  html, body, #root {
    margin: 0 !important; padding: 0 !important; width: 100% !important;
    min-height: 100vh !important; background: var(--bg) !important; color: var(--text) !important;
    font-family: var(--font-bn) !important;
    line-height: 1.55; overflow-x: hidden; -webkit-font-smoothing: antialiased;
  }
  #root { text-align: left !important; max-width: none !important; display: block !important; }
  *, *::before, *::after { box-sizing: border-box; }
  h1, h2, h3, h4, p { margin: 0; text-align: left; letter-spacing: 0; }
  h1, h2, h3, h4 { font-weight: 800; }
  button, input, select, textarea { font-family: inherit; }
  .login-brand h1, .banner h2, .hero h2 { color: #FFFFFF !important; }
  .page-title, .card-title { color: var(--text-strong) !important; }
  .stat-label, .stat-sub, .stat-value { text-align: left; }
  .stat-value, .erp-table .num, .date-pill, .bar-val { font-family: var(--font-num); font-variant-numeric: tabular-nums; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade { animation: fadeUp .22s ease forwards; }
  .spin { animation: spin 1s linear infinite; }

  .app-shell { display: flex; width: 100%; min-height: 100vh; }
  .sidebar { width: 274px; background: var(--navy); color: #fff; display: flex; flex-direction: column; flex-shrink: 0; position: sticky; top: 0; height: 100vh; }
  .sidebar-brand { padding: 18px 18px; border-bottom: 1px solid var(--navy-line); }
  .sidebar-scroll { flex: 1; overflow-y: auto; padding: 12px 12px; }
  .nav-group-label { font-size: 10.5px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: #7C93B3; padding: 14px 12px 6px; }
  .nav-item { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px 12px; margin-bottom: 2px; border-radius: 10px; border: none; background: transparent; color: #C5D1E3; cursor: pointer; text-align: left; font-size: 13px; font-weight: 500; transition: background .15s, color .15s; }
  .nav-item:hover { background: rgba(255,255,255,.07); color: #fff; }
  .nav-item.active { background: var(--primary); color: #fff; font-weight: 700; }
  .nav-item.locked { color: #5B7092; }
  .sidebar-foot { padding: 16px; border-top: 1px solid var(--navy-line); background: #081729; }

  .main-col { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .topbar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 14px 32px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; position: sticky; top: 0; z-index: 30; }
  .crumbs { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); font-weight: 500; flex-wrap: wrap; }
  .crumbs strong { color: var(--text-strong); font-weight: 700; }
  .content { padding: 26px 32px 48px; width: 100%; max-width: 1560px; margin: 0 auto; }

  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 22px; }
  .card + .card { margin-top: 20px; }
  .card-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .card-title { font-size: 15px; font-weight: 700; color: var(--text-strong); }
  .card-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  .page-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .page-icon { width: 46px; height: 46px; border-radius: 12px; background: var(--primary-soft); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .page-title { font-size: 20px; font-weight: 800; color: var(--text-strong); }
  .page-sub { font-size: 13px; color: var(--muted); margin-top: 2px; }

  .grid-kpi { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 20px; }
  .grid-main { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 20px; margin-bottom: 20px; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px; margin-bottom: 20px; }
  .grid-2 > .card, .grid-main > .card { margin-top: 0 !important; }

  .stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; text-align: left; }
  .stat-label { font-size: 12.5px; font-weight: 600; color: var(--muted); }
  .stat-value { font-size: 26px; font-weight: 800; color: var(--text-strong); margin: 6px 0 4px; line-height: 1.15; }
  .stat-sub { font-size: 12px; color: var(--muted); font-weight: 500; }
  .stat-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tone-blue .stat-icon { background: var(--primary-soft); color: var(--primary); }
  .tone-green .stat-icon { background: var(--green-soft); color: var(--green); }
  .tone-amber .stat-icon { background: var(--amber-soft); color: var(--amber); }
  .tone-indigo .stat-icon { background: var(--indigo-soft); color: var(--indigo); }
  .tone-red .stat-icon { background: var(--red-soft); color: var(--red); }
  .tone-green .stat-sub.hl { color: var(--green); }

  .hero { position: relative; overflow: hidden; background: linear-gradient(120deg, #0B1F3A 0%, #1B3A68 55%, #2563EB 140%); color: #fff; border-radius: 20px; padding: 30px 34px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; gap: 22px; flex-wrap: wrap; box-shadow: 0 22px 44px -24px rgba(11,31,58,.75); }
  .hero-eyebrow { font-size: 12.5px; font-weight: 600; color: #9CC0F5; }
  .hero h2 { font-size: 28px; font-weight: 800; margin-top: 4px; color: #fff !important; }
  .hero p { font-size: 13px; color: #B9C7DC; margin-top: 6px; max-width: 540px; }
  .hero-chips { display: flex; gap: 10px; flex-wrap: wrap; }
  .hero-chip { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); padding: 10px 16px; border-radius: 14px; font-size: 11.5px; font-weight: 600; color: #C9D8F0; min-width: 104px; }
  .hero-chip b { display: block; font-size: 20px; font-weight: 800; color: #fff; font-family: var(--font-num); margin-top: 2px; }

  .kpi-ring { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow); padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .section-title { font-size: 14px; font-weight: 800; color: var(--text-strong); margin: 2px 0 12px; display: flex; align-items: center; gap: 8px; }
  .dept-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
  .dept-card { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); cursor: pointer; text-align: left; width: 100%; }
  .dept-card:hover { border-color: #93B4F8; }
  .dept-name { font-size: 13px; font-weight: 700; color: var(--text-strong); }
  .dept-meta { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

  .feed-item { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border); }
  .feed-item:last-child { border-bottom: none; }
  .feed-dot { width: 9px; height: 9px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .feed-title { font-size: 13px; font-weight: 600; color: var(--text-strong); }
  .feed-meta { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

  .hbar-row { display: grid; grid-template-columns: 160px 1fr 90px; gap: 12px; align-items: center; margin-bottom: 11px; font-size: 13px; }
  .hbar-name { font-weight: 600; color: var(--text-strong); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hbar-track { height: 10px; background: #E8EDF4; border-radius: 10px; overflow: hidden; }
  .hbar-fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, #1D4ED8, #38BDF8); }
  .hbar-val { text-align: right; font-weight: 800; color: var(--text-strong); font-family: var(--font-num); }

  .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
  .cat-tile { border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; background: var(--surface-2); }
  .cat-tile.on { background: #fff; border-color: #C7D7FB; }
  .cat-tile .nm { font-size: 12px; font-weight: 600; color: var(--muted); }
  .cat-tile .pc { font-size: 22px; font-weight: 800; color: var(--text-strong); font-family: var(--font-num); margin-top: 4px; }
  .cat-tile.off .pc { color: #CBD5E1; }

  .sel-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; background: var(--red-soft); border: 1px solid #F5C2C2; border-radius: 10px; padding: 10px 14px; margin-bottom: 12px; font-size: 13px; font-weight: 600; color: var(--red); }
  .chk { width: 17px; height: 17px; accent-color: var(--primary); cursor: pointer; }
  .erp-table tbody tr.rowsel, .erp-table tbody tr.rowsel td { background: #EAF1FF !important; }

  .input { width: 100%; background: var(--surface-2); color: var(--text-strong); border: 1px solid var(--border-strong); border-radius: 10px; padding: 10px 12px; font-size: 13.5px; outline: none; }
  .input:focus { border-color: var(--primary); background: #fff; }
  .field { display: flex; flex-direction: column; gap: 5px; text-align: left; }
  .field > span { font-size: 12px; font-weight: 600; color: var(--muted); }
  .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; align-items: end; }
  .form-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .form-row .grow { flex: 1 1 240px; }
  .divider-dash { margin-top: 16px; padding-top: 16px; border-top: 1px dashed var(--border-strong); display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 18px; border-radius: 10px; border: 1px solid transparent; font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; }
  .btn-primary { background: var(--primary); color: #fff; }
  .btn-primary:hover { background: var(--primary-hover); }
  .btn-dark { background: var(--navy); color: #fff; }
  .btn-ghost { background: var(--surface); color: var(--text-strong); border-color: var(--border-strong); }
  .btn-danger { background: var(--red); color: #fff; }
  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
  .btn-done { background: #fff; color: var(--green); border-color: var(--green); }
  .btn-done.on, .btn-done:hover { background: var(--green); color: #fff; }
  .btn-pending { background: #fff; color: var(--amber); border-color: #D97706; }
  .btn-pending.on, .btn-pending:hover { background: #D97706; color: #fff; }
  .btn-absent { background: #fff; color: var(--red); border-color: var(--red); }
  .btn-absent.on, .btn-absent:hover { background: var(--red); color: #fff; }
  .btn-icon-del { background: var(--red-soft); color: var(--red); padding: 6px 8px; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; }
  .btn-block { width: 100%; }

  .tab-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .tab { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 10px; border: 1px solid var(--border-strong); background: var(--surface); color: var(--text-strong); font-weight: 700; font-size: 13px; cursor: pointer; }
  .tab.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .subtab { padding: 8px 16px; border-radius: 9px; border: none; background: #EEF2F7; color: var(--text-strong); font-weight: 700; font-size: 13px; cursor: pointer; }
  .subtab.active { background: var(--navy); color: #fff; }

  .table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 10px; }
  .erp-table { width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left; }
  .erp-table thead th { position: sticky; top: 0; background: #EEF2F7; color: #475569; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; padding: 11px 14px; border-bottom: 1px solid var(--border-strong); white-space: nowrap; }
  .erp-table tbody td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; color: var(--text); }
  .erp-table tbody tr:nth-child(even) { background: #FAFBFD; }
  .erp-table tbody tr:last-child td { border-bottom: none; }
  .erp-table tfoot td { padding: 12px 14px; background: #EEF2F7; font-weight: 800; color: var(--text-strong); border-top: 1px solid var(--border-strong); }
  .erp-table .num { text-align: right; font-variant-numeric: tabular-nums; }
  .ta-right { text-align: right !important; }
  .row-done td { color: #6B7280; }
  .row-done .task-text { text-decoration: line-through; }
  .task-text { font-weight: 600; color: var(--text-strong); }
  .empty { text-align: center; padding: 36px 16px !important; color: var(--muted); font-size: 13px; }
  .toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .search-box { position: relative; }
  .search-box svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--muted); }
  .search-box .input { padding-left: 33px; width: 200px; }

  .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; }
  .badge.green { background: var(--green-soft); color: var(--green); }
  .badge.amber { background: var(--amber-soft); color: var(--amber); }
  .badge.blue { background: var(--primary-soft); color: var(--primary); }
  .badge.red { background: var(--red-soft); color: var(--red); }
  .badge.purple { background: var(--purple-soft); color: var(--purple); }
  .badge.gray { background: #EEF2F7; color: #475569; }
  .badge.indigo { background: var(--indigo-soft); color: var(--indigo); }

  .progress { width: 100%; height: 8px; background: #E8EDF4; border-radius: 8px; overflow: hidden; }
  .progress > div { height: 100%; background: var(--primary); border-radius: 8px; }

  .list-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; margin-bottom: 8px; background: var(--surface); flex-wrap: wrap; }
  .list-item.done { background: #F2FAF5; }
  .list-title { font-weight: 700; font-size: 14px; color: var(--text-strong); }
  .list-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .soft-box { text-align: center; padding: 26px; color: var(--muted); background: var(--surface-2); border-radius: 10px; font-size: 13px; }

  .bars { display: flex; align-items: flex-end; gap: 10px; height: 150px; padding-top: 8px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 6px; min-width: 0; }
  .bar-track { width: 100%; max-width: 34px; flex: 1; display: flex; align-items: flex-end; }
  .bar-solid { width: 100%; background: linear-gradient(180deg, #38BDF8, #1D4ED8); border-radius: 6px 6px 2px 2px; min-height: 3px; }
  .bar-label { font-size: 10.5px; color: var(--muted); font-weight: 600; }
  .bar-val { font-size: 11px; font-weight: 700; color: var(--text-strong); }

  .cal-bar { position: relative; margin-bottom: 20px; }
  .cal-bar-inner { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .date-pill { background: var(--primary-soft); color: var(--primary); padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 12.5px; border: 1px solid #C7D7FB; }
  .cal-pop { position: absolute; top: 58px; left: 0; z-index: 60; width: 340px; max-width: 92vw; background: var(--navy); color: #fff; border-radius: 14px; padding: 16px; border: 1px solid var(--navy-line); box-shadow: 0 24px 44px -12px rgba(8,23,41,.6); }
  .cal-nav { padding: 5px 8px; border-radius: 8px; border: 1px solid var(--navy-line); background: var(--navy-2); color: #fff; cursor: pointer; display: flex; align-items: center; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal-day { height: 40px; border-radius: 8px; cursor: pointer; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2px; background: transparent; border: 1px solid var(--navy-2); }

  .toast { position: fixed; right: 24px; bottom: 24px; z-index: 200; padding: 12px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #fff; }
  .toast.error { background: var(--red); }
  .toast.ok { background: #15803D; }

  .login-wrap { min-height: 100vh; width: 100%; display: flex; }
  .login-brand { flex: 1.1; background: linear-gradient(145deg, var(--navy) 0%, #1B3A68 100%); color: #fff; padding: 56px 64px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; text-align: left; }
  .login-brand-center { max-width: 480px; text-align: left; }
  .login-brand li { margin-bottom: 14px; font-size: 14.5px; color: #D4DFEF; list-style: none; display: flex; gap: 10px; align-items: center; }
  .login-form-col { flex: 1; display: flex; align-items: center; justify-content: center; padding: 32px; background: var(--bg); }
  .login-card { width: 100%; max-width: 420px; background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 36px 32px; box-shadow: var(--shadow); text-align: left; }
  .input-icon { position: relative; }
  .input-icon > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); }
  .input-icon .input { padding: 12px 42px 12px 42px; }
  .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; display: flex; }
  .alert-err { display: flex; align-items: center; gap: 8px; background: var(--red-soft); border: 1px solid #F5C2C2; color: var(--red); padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-bottom: 16px; }

  /* Creative Studio Styles */
  .studio-stack { display: flex; flex-direction: column; gap: 20px; }
  .studio-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 20px; }
  .studio-progress-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
  .studio-chips-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
  .studio-chip-btn { padding: 10px 12px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text-strong); display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 700; }
  .studio-chip-btn.active { border-color: var(--primary); background: var(--primary-soft); color: var(--primary); }
  .studio-task-card { padding: 14px 16px; border-radius: 12px; border: 1px solid var(--border); border-left: 4px solid var(--amber); background: var(--surface); margin-bottom: 10px; }
  .studio-task-card.done { border-left-color: var(--green); background: #F7FCF9; }
  .studio-task-card.not-done { border-left-color: var(--red); }
  .studio-task-card.week { border-left-color: var(--purple); }
  .studio-script-box { margin-top: 10px; padding: 12px; border-radius: 10px; background: var(--surface-2); border: 1px solid var(--border); }
  .studio-script-pre { margin: 8px 0 0; white-space: pre-wrap; font-family: inherit; font-size: 12.5px; color: var(--text-strong); line-height: 1.6; }
  .studio-files-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
  .studio-file-card { padding: 16px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); display: flex; flex-direction: column; justify-content: space-between; gap: 12px; }
  .studio-modal-backdrop { position: fixed; inset: 0; z-index: 120; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; padding: 16px; overflow-y: auto; }
  .studio-modal { width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25); }
  .preset-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; margin-top: 8px; }
  .preset-btn { padding: 10px; border-radius: 10px; border: 1px solid var(--border-strong); background: var(--surface-2); text-align: left; cursor: pointer; }
  .preset-btn:hover { border-color: var(--primary); background: var(--primary-soft); }

  @media (max-width: 1100px) { .grid-main { grid-template-columns: 1fr; } }
  @media (max-width: 900px) {
    .app-shell { flex-direction: column; }
    .sidebar { width: 100%; height: auto; max-height: 360px; position: relative; }
    .topbar, .content { padding-left: 16px; padding-right: 16px; }
    .login-brand { display: none; }
    .hbar-row { grid-template-columns: 110px 1fr 70px; }
    .hero { padding: 22px; }
  }
`;

// =========================================================================
// REUSABLE UI COMPONENTS
// =========================================================================
const Card = ({ children, style, className = '' }) => (
  <div className={`card ${className}`} style={style}>{children}</div>
);

const CardHeader = ({ title, subtitle, icon: Icon, right }) => (
  <div className="card-head">
    <div>
      <div className="card-title">{title}</div>
      {subtitle && <div className="card-sub">{subtitle}</div>}
    </div>
    {right || (Icon && <Icon size={19} color="#1D4ED8" />)}
  </div>
);

const PageHeader = ({ icon: Icon, title, subtitle, right }) => (
  <div className="page-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div className="page-icon"><Icon size={22} /></div>
      <div>
        <h2 className="page-title">{title}</h2>
        <p className="page-sub">{subtitle}</p>
      </div>
    </div>
    {right}
  </div>
);

const StatCard = ({ label, value, sub, subHighlight, icon: Icon, tone = 'blue' }) => (
  <div className={`stat tone-${tone}`}>
    <div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className={`stat-sub ${subHighlight ? 'hl' : ''}`}>{sub}</div>}
    </div>
    {Icon && <div className="stat-icon"><Icon size={20} /></div>}
  </div>
);

const Ring = ({ value = 0, size = 84, stroke = 9, color = '#1D4ED8', track = '#E8EDF4', text, textSize }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={textSize || size * 0.24}
        fontWeight="800" fill="#0F172A" fontFamily="Inter, sans-serif">
        {text ?? `${Math.round(pct)}%`}
      </text>
    </svg>
  );
};

const RingStat = ({ label, value, sub, pct, color, icon: Icon }) => (
  <div className="kpi-ring">
    <div style={{ minWidth: 0 }}>
      <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Icon && <Icon size={14} />} {label}
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
    <Ring value={pct} color={color} size={78} stroke={9} />
  </div>
);

const Field = ({ label, children }) => (
  <label className="field"><span>{label}</span>{children}</label>
);

const TaskActions = ({ task, onStatus, onDelete, canDelete }) => {
  const done = isDoneStatus(task.status);
  return (
    <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <button className={`btn btn-sm btn-done ${done ? 'on' : ''}`} onClick={() => onStatus(task, 'Done')}>✓ Done</button>
      <button className={`btn btn-sm btn-pending ${task.status === 'Pending' ? 'on' : ''}`} onClick={() => onStatus(task, 'Pending')}>⏳ Pending</button>
      {canDelete && (
        <button className="btn-icon-del" title="ডিলিট করুন" onClick={() => onDelete(task.id)}><Trash2 size={14} /></button>
      )}
    </div>
  );
};

// =========================================================================
// MAIN APP
// =========================================================================
export default function App() {
  const todayStr = localDateStr();
  const todayObj = new Date();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeDeptId, setActiveDeptId] = useState('dashboard');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [tasks, setTasks] = useState([]);
  const [factoryList, setFactoryList] = useState([]);
  const [fabricList, setFabricList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterDept, setFilterDept] = useState('ALL');
  const [notice, setNotice] = useState(null);

  const [selectedHistoryDate, setSelectedHistoryDate] = useState(todayStr);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calViewYear, setCalViewYear] = useState(todayObj.getFullYear());
  const [calViewMonth, setCalViewMonth] = useState(todayObj.getMonth());

  const [attSubTab, setAttSubTab] = useState('head_office');
  const [headOfficeRoster, setHeadOfficeRoster] = useState(DEFAULT_HEAD_OFFICE_ROSTER);
  const [afternoonRoster, setAfternoonRoster] = useState(DEFAULT_AFTERNOON_ROSTER);
  const [factoryAttRoster, setFactoryAttRoster] = useState(DEFAULT_FACTORY_ATTENDANCE);
  const [newEmpDept, setNewEmpDept] = useState('Head Office');
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpShift, setNewEmpShift] = useState('10:00');

  const [customOptions, setCustomOptions] = useState({
    gmAreas: INITIAL_GM_AREAS,
    salesAreas: INITIAL_SALES_AREAS,
    dmAreas: INITIAL_DM_AREAS,
    ccAreas: INITIAL_CC_COORD_AREAS,
    ccLeaderAreas: INITIAL_CC_LEADER_AREAS,
    receptionAreas: INITIAL_RECEPTION_AREAS,
    accountsAreas: INITIAL_ACCOUNTS_AREAS,
    swaponCats: INITIAL_SWAPON_FACTORY_CATS,
    stoneRoseCats: INITIAL_STONE_ROSE_CATS,
    statuses: ['Pending', 'In Progress', 'Completed', 'Done', 'Delayed', 'Need Approval']
  });
  const [newOptionText, setNewOptionText] = useState('');
  const [entryAmount, setEntryAmount] = useState('');

  const [selectedArea, setSelectedArea] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [priority, setPriority] = useState('Normal');
  const [assignToRole, setAssignToRole] = useState('creative_it');

  // Creative IT Studio State
  const [studioRoleFilter, setStudioRoleFilter] = useState('all');
  const [studioTasks, setStudioTasks] = useState(INITIAL_STUDIO_TASKS);
  const [studioFiles, setStudioFiles] = useState(INITIAL_STUDIO_FILES);
  const [taskSectionTab, setTaskSectionTab] = useState('pending');
  const [fileSectionTab, setFileSectionTab] = useState('pending');
  const [statusColorFilter, setStatusColorFilter] = useState('all');
  const [fileSearch, setFileSearch] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [expandedScripts, setExpandedScripts] = useState({});
  const [copiedTaskId, setCopiedTaskId] = useState(null);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newStudioTitle, setNewStudioTitle] = useState('');
  const [newStudioAssignee, setNewStudioAssignee] = useState('video_editor');
  const [newStudioCategory, setNewStudioCategory] = useState('today');
  const [newStudioDepartment, setNewStudioDepartment] = useState('video');
  const [newStudioDueDate, setNewStudioDueDate] = useState('');
  const [newReferenceVideoUrl, setNewReferenceVideoUrl] = useState('');
  const [newScriptText, setNewScriptText] = useState('');
  const [newStudioNotes, setNewStudioNotes] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newIsUrgent, setNewIsUrgent] = useState(false);
  const [editingStudioTask, setEditingStudioTask] = useState(null);

  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [newFileTitle, setNewFileTitle] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('video');
  const [newFileFormat, setNewFileFormat] = useState('MP4 (4K 60fps)');
  const [newFileSize, setNewFileSize] = useState('');
  const [newDriveUrl, setNewDriveUrl] = useState('');
  const [newFileNotes, setNewFileNotes] = useState('');
  const [editingStudioFile, setEditingStudioFile] = useState(null);

  // Digital Marketing
  const [dmForm, setDmForm] = useState({
    taskName: INITIAL_DM_AREAS[0], assignedPerson: '', target: '', deadline: todayStr,
    priority: 'High', progressStatus: 'In Progress', performanceResult: ''
  });

  // Factory Production
  const [factoryBrand, setFactoryBrand] = useState("Swapon's World");
  const [factoryCat, setFactoryCat] = useState(INITIAL_SWAPON_FACTORY_CATS[0]);
  const [factoryQty, setFactoryQty] = useState('');
  const [factoryMonth, setFactoryMonth] = useState(localDateStr().slice(0, 7));

  // Fabric Stock
  const [fabricForm, setFabricForm] = useState({
    product_category: 'Panjabi', fabric_name: '', fabric_color: '', fabric_design: '',
    total_quantity: '', unit_price: '', used_quantity: '', shortage_quantity: '0'
  });
  const [selectedFabricIds, setSelectedFabricIds] = useState([]);

  // Orders
  const [orderForm, setOrderForm] = useState({
    customer_name: '', phone: '', address: '', product: '', qty: '1',
    amount: '', courier: 'Pathao', source: 'Facebook', tracking_id: ''
  });

  const notify = (text, type = 'error') => setNotice({ text, type });

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3200);
    return () => clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    setSelectedArea('');
    setNewTaskTitle('');
    setNewOptionText('');
    setEntryAmount('');
    setSearchQuery('');
    setFilterStatus('ALL');
    setFilterDept('ALL');
    setIsCalendarOpen(false);
    setSelectedFabricIds([]);
  }, [activeDeptId]);

  useEffect(() => { setSelectedFabricIds([]); }, [selectedHistoryDate]);

  useEffect(() => {
    const savedSt = localStorage.getItem('swapons_world_studio_tasks');
    if (savedSt) {
      try { setStudioTasks(JSON.parse(savedSt)); } catch (e) {}
    }
    const savedSf = localStorage.getItem('swapons_world_studio_files');
    if (savedSf) {
      try { setStudioFiles(JSON.parse(savedSf)); } catch (e) {}
    }
  }, []);

  const persistStudioTasks = (next) => {
    setStudioTasks(next);
    localStorage.setItem('swapons_world_studio_tasks', JSON.stringify(next));
  };

  const persistStudioFiles = (next) => {
    setStudioFiles(next);
    localStorage.setItem('swapons_world_studio_files', JSON.stringify(next));
  };

  // =========================================================================
  // FETCH DATA FROM SUPABASE
  // =========================================================================
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: taskData } = await supabase.from('tasks').select('*').order('id', { ascending: false });
      if (taskData) setTasks(taskData);
      const { data: prodData } = await supabase.from('factory_production').select('*').order('created_at', { ascending: false });
      if (prodData) setFactoryList(prodData);
      const { data: fabData } = await supabase.from('fabric_stock').select('*').order('created_at', { ascending: false });
      if (fabData) setFabricList(fabData);
      const { data: ordData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (ordData) setOrdersList(ordData);
    } catch (err) {
      console.error('Fetch error:', err);
      notify('ডেটা লোড করা যায়নি। ইন্টারনেট সংযোগ চেক করুন।');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      fetchAllData();
      setActiveDeptId(currentUser.id);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    const targetDate = selectedHistoryDate || todayStr;
    const savedAtt = tasks.find(
      t => t.role === 'attendance_sheet' && t.title.startsWith(`[${targetDate}] [ATTENDANCE_DATA]`)
    );
    if (savedAtt) {
      try {
        const jsonPart = savedAtt.title.replace(`[${targetDate}] [ATTENDANCE_DATA] `, '');
        const parsed = JSON.parse(jsonPart);
        if (parsed.headOffice) setHeadOfficeRoster(parsed.headOffice);
        if (parsed.afternoon) setAfternoonRoster(parsed.afternoon);
        if (parsed.factory) setFactoryAttRoster(parsed.factory);
      } catch (e) {
        console.error('Attendance parse error:', e);
      }
    } else {
      setHeadOfficeRoster(DEFAULT_HEAD_OFFICE_ROSTER);
      setAfternoonRoster(DEFAULT_AFTERNOON_ROSTER);
      setFactoryAttRoster(DEFAULT_FACTORY_ATTENDANCE);
    }
  }, [selectedHistoryDate, tasks, todayStr]);

  // =========================================================================
  // DATE HELPERS
  // =========================================================================
  const getTaskDate = (task) => {
    const match = task.title?.match(/(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    if (task.created_at) return dateOfISO(task.created_at);
    return todayStr;
  };

  const matchesSelectedDate = (recordDate) => !selectedHistoryDate || recordDate === selectedHistoryDate;

  const regularTasks = tasks.filter(t => t.role !== 'attendance_sheet');

  const getEntryCountForDate = (dateStr) => {
    if (activeDeptId === 'factory') return factoryList.filter(f => f.production_date === dateStr).length;
    if (activeDeptId === 'fabric_stock') return fabricList.filter(f => dateOfISO(f.created_at) === dateStr).length;
    if (activeDeptId === 'orders') return ordersList.filter(o => o.order_date === dateStr).length;
    if (activeDeptId === 'dashboard') {
      return regularTasks.filter(t => getTaskDate(t) === dateStr).length +
        factoryList.filter(f => f.production_date === dateStr).length;
    }
    if (activeDeptId === 'admin') {
      const hasAtt = tasks.some(t => t.role === 'attendance_sheet' && getTaskDate(t) === dateStr) ? 1 : 0;
      return regularTasks.filter(t => t.role === 'admin' && getTaskDate(t) === dateStr).length + hasAtt;
    }
    return regularTasks.filter(t => t.role === activeDeptId && getTaskDate(t) === dateStr).length;
  };

  // =========================================================================
  // SAVE ATTENDANCE REPORT TO SUPABASE
  // =========================================================================
  const handleSaveAttendanceSheet = async () => {
    const targetDate = selectedHistoryDate || todayStr;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payloadJson = JSON.stringify({
      headOffice: headOfficeRoster,
      afternoon: afternoonRoster,
      factory: factoryAttRoster
    });
    const stampedTitle = `[${targetDate}] [ATTENDANCE_DATA] ${payloadJson}`;

    const existing = tasks.find(
      t => t.role === 'attendance_sheet' && t.title.startsWith(`[${targetDate}] [ATTENDANCE_DATA]`)
    );

    if (existing) {
      const { error } = await supabase
        .from('tasks')
        .update({ title: stampedTitle, time: currentTime, status: 'Completed' })
        .eq('id', existing.id);
      if (!error) {
        setTasks(prev => prev.map(t => (t.id === existing.id ? { ...t, title: stampedTitle, time: currentTime } : t)));
        notify(`${targetDate} তারিখের হাজিরা রিপোর্ট আপডেট হয়েছে ✓`, 'ok');
      } else {
        notify('হাজিরা আপডেট হয়নি!');
      }
    } else {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ role: 'attendance_sheet', title: stampedTitle, time: currentTime, status: 'Completed' }])
        .select();
      if (!error && data) {
        setTasks(prev => [data[0], ...prev]);
        notify(`${targetDate} তারিখের হাজিরা রিপোর্ট সেভ হয়েছে ✓`, 'ok');
      } else {
        notify('হাজিরা সেভ হয়নি!');
      }
    }
  };

  // =========================================================================
  // LOGIN & CRUD HANDLERS
  // =========================================================================
  const handleLogin = (e) => {
    e.preventDefault();
    const matchedUser = USERS.find(
      u => u.username.toLowerCase() === usernameInput.trim().toLowerCase() && u.password === passwordInput
    );
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setActiveDeptId(matchedUser.id);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়! আবার চেষ্টা করুন।');
    }
  };

  const handleAddCustomOption = (key) => {
    if (!newOptionText.trim()) return;
    const trimmed = newOptionText.trim();
    setCustomOptions(prev => ({ ...prev, [key]: [...prev[key], trimmed] }));
    if (key !== 'statuses') setSelectedArea(trimmed);
    setNewOptionText('');
  };

  const insertTaskToSupabase = async (roleId, titleString, statusVal = 'Pending', customDate = null) => {
    const targetDate = customDate || selectedHistoryDate || todayStr;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const stampedTitle = `[${targetDate}] ${titleString}`;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ role: roleId, title: stampedTitle, time: currentTime, status: statusVal }])
      .select();
    if (!error && data) {
      setTasks(prev => [data[0], ...prev]);
      return true;
    }
    notify('সেভ হয়নি! আবার চেষ্টা করুন।');
    return false;
  };

  const toggleTaskStatus = async (task, explicitStatus = null) => {
    const newStatus = explicitStatus || (isDoneStatus(task.status) ? 'Pending' : 'Done');
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', task.id);
    if (!error) setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, status: newStatus } : t)));
    else notify('স্ট্যাটাস আপডেট হয়নি!');
  };

  const deleteTask = async (id) => {
    if (!window.confirm('এই কাজটি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) setTasks(prev => prev.filter(t => t.id !== id));
    else notify('ডিলিট করা যায়নি!');
  };

  // Creative IT Studio helpers
  const applyStudioPreset = (presetType) => {
    if (presetType === 'reels') {
      setNewStudioTitle('নতুন ইনস্টাগ্রাম ও টিকটক রিলস এডিটিং (৯:১৬)');
      setNewStudioAssignee('video_editor');
      setNewStudioDepartment('video');
      setNewStudioCategory('today');
      setNewStudioDueDate('আজকের ভেতর (Today)');
      setNewIsUrgent(true);
      setNewReferenceVideoUrl('https://youtube.com/shorts/sample-reels-reference');
      setNewScriptText(`[হুক (০-৩ সেকেন্ড)]:
"আপনি কি জানেন আপনার বিজনেসের সেলস ৩০% কমে যেতে পারে মাত্র একটি ভুলের কারণে?"

[বডি (৩-২০ সেকেন্ড)]:
"স্বপনস ওয়ার্ল্ড এর প্রিমিয়াম ভিডিও প্রোডাকশন দিয়ে আপনার ব্র‍্যান্ডকে নিয়ে যান অনন্য উচ্চতায়।"

[কল টু অ্যাকশন (২০-৩০ সেকেন্ড)]:
"দেরি না করে আজই বায়োতে দেওয়া লিংকে ক্লিক করুন অথবা ইনবক্সে মেসেজ পাঠান!"`);
      setNewStudioNotes('প্রথম ৩ সেকেন্ডের হুক, দ্রুত ট্রানজিশন এবং ট্রেন্ডিং মিউজিক সিঙ্ক।');
    } else if (presetType === 'voiceover') {
      setNewStudioTitle('ভয়েসওভার ও সাউন্ড সিঙ্ক মাস্টার (Audio & Voiceover)');
      setNewStudioAssignee('video_editor');
      setNewStudioDepartment('video');
      setNewStudioCategory('today');
      setNewStudioDueDate('আজ রাত ৮:০০');
      setNewIsUrgent(true);
      setNewReferenceVideoUrl('https://drive.google.com/file/d/voiceover-audio-reference/view');
      setNewScriptText(`[ভয়েসওভার মাস্টার স্ক্রিপ্ট — স্বপনস ওয়ার্ল্ড ক্রিয়েটিভ স্টুডিও]:
"সঠিক পরিকল্পনাই একটি সফল ব্র্যান্ডের মূল ভিত্তি। প্রতিটি ভিজ্যুয়াল, প্রতিটি কালার টোন আর প্রতিটি কাট—আমরা সাজিয়ে তুলি আপনার স্বপ্নের মতো করে।"`);
      setNewStudioNotes('ভয়েসওভারের ব্যাকগ্রাউন্ড নয়েজ রিমুভ ও সাউন্ড লেভেল -14 LUFS নরম্যালাইজেশন।');
    } else if (presetType === 'youtube') {
      setNewStudioTitle('ইউটিউব ফুল ডকুমেন্টারি ভিডিও কাট ও কালার গ্রেড (১৬:৯)');
      setNewStudioAssignee('video_editor');
      setNewStudioDepartment('video');
      setNewStudioCategory('7days');
      setNewStudioDueDate('আগামী ৭ দিনের ভেতর (7 Days)');
      setNewIsUrgent(false);
      setNewReferenceVideoUrl('https://youtube.com/watch?v=sample-documentary-grade');
      setNewScriptText(`[ডকুমেন্টারি ভয়েসওভার পর্ব ০১]:
"ঢাকার বুকে ক্রিয়েটিভ ইন্ডাস্ট্রির নতুন বিপ্লব শুরু হয়েছিল এই স্টুডিও থেকেই..."`);
      setNewStudioNotes('১৬:৯ ফুল এইচডি/৪কে রেন্ডার, বি-রোল ফুটেজ সিঙ্ক এবং Rec.709 কালার গ্রেডিং।');
    } else if (presetType === 'banner') {
      setNewStudioTitle('সোশ্যাল মিডিয়া স্কয়ার পোস্ট ও ব্যানার ডিজাইন সেট');
      setNewStudioAssignee('designer');
      setNewStudioDepartment('design');
      setNewStudioCategory('today');
      setNewStudioDueDate('আজকের ভেতর (Today)');
      setNewIsUrgent(true);
      setNewReferenceVideoUrl('');
      setNewScriptText(`[ব্যানার টাইপোগ্রাফি ও কপি]:
"SUMMER DROP 2026 • FLAT 40% OFF"`);
      setNewStudioNotes('১০৮০x১০৮০ স্কয়ার পোস্ট ও স্টোরি সাইজ প্রস্তুত করুন।');
    } else if (presetType === 'shoot_outdoor') {
      setNewStudioTitle('নতুন প্রোডাক্ট ক্যাম্পেইন — আউটডোর শুট');
      setNewStudioAssignee('videographer');
      setNewStudioDepartment('shoot');
      setNewStudioCategory('today');
      setNewStudioDueDate('আজ দুপুর ২:৩০ PM');
      setNewIsUrgent(true);
      setNewLocation('ধানমন্ডি লেক ও আউটডোর স্পট');
      setNewReferenceVideoUrl('https://youtube.com/shorts/cinematic-outdoor-shoot');
      setNewScriptText(`[শুট শট-লিস্ট]:
১. মডেলের এন্ট্রি স্লো মোশন কাট (120fps)
২. প্রোডাক্টের ম্যাক্রো শট`);
      setNewStudioNotes('ন্যাচারাল গোল্ডেন আওয়ার লাইট ও ফুটেজ ড্রাইভে ব্যাকআপ দিন।');
    }
  };

  const handleCopyScriptText = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedTaskId(id);
    setTimeout(() => setCopiedTaskId(null), 1800);
  };

  const deleteFabricByIds = async (ids) => {
    if (!ids || ids.length === 0) return;
    if (!window.confirm(`${ids.length} টি স্টক এন্ট্রি স্থায়ীভাবে ডিলিট করতে চান?`)) return;
    const { error } = await supabase.from('fabric_stock').delete().in('id', ids);
    if (!error) {
      setFabricList(prev => prev.filter(f => !ids.includes(f.id)));
      setSelectedFabricIds(prev => prev.filter(id => !ids.includes(id)));
      notify('স্টক এন্ট্রি ডিলিট হয়েছে ✓', 'ok');
    } else {
      notify('ডিলিট করা যায়নি! (Supabase delete permission চেক করুন)');
    }
  };

  const toggleFabricSelect = (id) =>
    setSelectedFabricIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const deleteProduction = async (id) => {
    if (!window.confirm('এই প্রোডাকশন এন্ট্রি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    const { error } = await supabase.from('factory_production').delete().eq('id', id);
    if (!error) setFactoryList(prev => prev.filter(f => f.id !== id));
    else notify('ডিলিট করা যায়নি!');
  };

  const addOrder = async (e) => {
    e.preventDefault();
    if (!orderForm.customer_name.trim() || !orderForm.phone.trim()) return;
    const payload = {
      order_date: selectedHistoryDate || todayStr,
      customer_name: orderForm.customer_name.trim(),
      phone: orderForm.phone.trim(),
      address: orderForm.address.trim(),
      product: orderForm.product.trim(),
      qty: num(orderForm.qty) || 1,
      amount: num(orderForm.amount),
      courier: orderForm.courier,
      tracking_id: orderForm.tracking_id.trim(),
      source: orderForm.source,
      status: 'Pending'
    };
    const { data, error } = await supabase.from('orders').insert([payload]).select();
    if (!error && data) {
      setOrdersList(prev => [data[0], ...prev]);
      setOrderForm({ ...orderForm, customer_name: '', phone: '', address: '', product: '', qty: '1', amount: '', tracking_id: '' });
      notify('অর্ডার সেভ হয়েছে ✓', 'ok');
    } else notify('অর্ডার সেভ হয়নি!');
  };

  const updateOrderStatus = async (order, status) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', order.id);
    if (!error) setOrdersList(prev => prev.map(o => (o.id === order.id ? { ...o, status } : o)));
    else notify('স্ট্যাটাস আপডেট হয়নি!');
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('এই অর্ডারটি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (!error) setOrdersList(prev => prev.filter(o => o.id !== id));
    else notify('ডিলিট করা যায়নি!');
  };

  // =========================================================================
  // ATTENDANCE & ANALYTICS CALCULATIONS
  // =========================================================================
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

  const renderCalendar = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(calViewYear, calViewMonth, 1).getDay();

    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(`${calViewYear}-${String(calViewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    }
    const totalMonthEntries = cells.reduce((sum, ds) => (ds ? sum + getEntryCountForDate(ds) : sum), 0);

    return (
      <div className="cal-bar">
        <div className="cal-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-dark" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <CalendarIcon size={15} color="#7DD3FC" />
              {isCalendarOpen ? 'ক্যালেন্ডার বন্ধ করুন ▲' : 'ক্যালেন্ডার ও মাসিক সামারি ▼'}
            </button>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              তারিখ: <span className="date-pill">{selectedHistoryDate || 'সব তারিখ (All History)'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" className={`btn btn-sm ${selectedHistoryDate === todayStr ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => { setSelectedHistoryDate(todayStr); setIsCalendarOpen(false); }}>
              আজকের তারিখ ({todayStr})
            </button>
            <button type="button" className={`btn btn-sm ${selectedHistoryDate === '' ? 'btn-dark' : 'btn-ghost'}`}
              onClick={() => { setSelectedHistoryDate(''); setIsCalendarOpen(false); }}>
              সব তারিখ দেখুন
            </button>
          </div>
        </div>

        {isCalendarOpen && (
          <div className="cal-pop fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--navy-line)' }}>
              <button type="button" className="cal-nav" onClick={() => {
                if (calViewMonth === 0) { setCalViewMonth(11); setCalViewYear(calViewYear - 1); } else setCalViewMonth(calViewMonth - 1);
              }}><ChevronLeft size={15} /></button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{monthNames[calViewMonth]} {calViewYear}</div>
                <div style={{ fontSize: 11, color: '#7DD3FC', fontWeight: 600 }}>মাসিক মোট রেকর্ড: {totalMonthEntries} টি</div>
              </div>
              <button type="button" className="cal-nav" onClick={() => {
                if (calViewMonth === 11) { setCalViewMonth(0); setCalViewYear(calViewYear + 1); } else setCalViewMonth(calViewMonth + 1);
              }}><ChevronRight size={15} /></button>
            </div>

            <div className="cal-grid" style={{ textAlign: 'center', marginBottom: 6 }}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} style={{ fontSize: 11, fontWeight: 700, color: '#8EA3C0' }}>{d}</div>
              ))}
            </div>

            <div className="cal-grid">
              {cells.map((dateStr, idx) => {
                if (!dateStr) return <div key={`e-${idx}`} style={{ height: 40 }} />;
                const dayNum = Number(dateStr.split('-')[2]);
                const count = getEntryCountForDate(dateStr);
                const isSelected = selectedHistoryDate === dateStr;
                const isToday = dateStr === todayStr;
                return (
                  <button key={dateStr} type="button" className="cal-day"
                    onClick={() => { setSelectedHistoryDate(dateStr); setIsCalendarOpen(false); }}
                    style={{
                      border: isSelected ? '1.5px solid #7DD3FC' : (isToday ? '1px solid #3B82F6' : '1px solid var(--navy-2)'),
                      backgroundColor: isSelected ? '#1D4ED8' : (count > 0 ? '#16335A' : 'transparent')
                    }}>
                    <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>{dayNum}</span>
                    {count > 0 && <span style={{ fontSize: 9, fontWeight: 800, color: isSelected ? '#fff' : '#7DD3FC', marginTop: 2, lineHeight: 1 }}>{count}টি</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="login-wrap">
        <style>{ENTERPRISE_CSS}</style>
        <div className="login-brand">
          <SwaponLogo size={48} showTagline lightText />

          <div className="login-brand-center">
            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.22, marginBottom: 14, textAlign: 'left', color: '#FFFFFF' }}>
              Enterprise Resource<br />Planning System
            </h1>
            <p style={{ color: '#C5D3E8', fontSize: 14.5, marginBottom: 28, lineHeight: 1.65, textAlign: 'left' }}>
              সকল ডিপার্টমেন্টের কাজ, প্রোডাকশন, স্টক, হাজিরা ও রিপোর্ট এক জায়গায় — পরিষ্কার, নিরাপদ ও সহজে ব্যবহারযোগ্য।
            </p>
            <ul style={{ padding: 0, margin: 0, textAlign: 'left' }}>
              <li><CheckCircle2 size={18} color="#38BDF8" /> ডিপার্টমেন্ট-ভিত্তিক সুরক্ষিত অ্যাক্সেস</li>
              <li><CheckCircle2 size={18} color="#38BDF8" /> রিয়েল-টাইম ক্লাউড ডেটাবেস</li>
              <li><CheckCircle2 size={18} color="#38BDF8" /> দৈনিক রিপোর্ট, হাজিরা ও ক্যালেন্ডার হিস্ট্রি</li>
            </ul>
          </div>

          <div style={{ fontSize: 12, color: '#7C93B3', textAlign: 'left' }}>© Swapon's World & Stone Rose BD</div>
        </div>

        <div className="login-form-col">
          <div className="login-card fade">
            <div style={{ marginBottom: 24 }}>
              <SwaponLogo size={40} lightText={false} />
              <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-strong)', marginTop: 20 }}>লগইন করুন</h2>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>আপনার ডিপার্টমেন্টের ইউজারনেম ও পাসওয়ার্ড দিন</p>
            </div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <Field label="Username">
                  <div className="input-icon">
                    <User size={17} />
                    <input type="text" required className="input" placeholder="যেমন: boss, admin, gm, creative"
                      value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                  </div>
                </Field>
              </div>
              <div style={{ marginBottom: 22 }}>
                <Field label="Password">
                  <div className="input-icon">
                    <Lock size={17} />
                    <input type={showPassword ? 'text' : 'password'} required className="input" placeholder="••••••••"
                      value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>
              </div>
              {loginError && <div className="alert-err"><AlertCircle size={16} /> {loginError}</div>}
              <button type="submit" className="btn btn-primary btn-block" style={{ padding: 13, fontSize: 14 }}>
                নিরাপদ লগইন করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const activeDeptObj = USERS.find(u => u.id === activeDeptId) || currentUser;
  const hasAccessToActive = currentUser.id === 'dashboard' || currentUser.id === activeDeptId;
  const isBoss = currentUser.id === 'dashboard';

  const dateFilteredAllTasks = regularTasks.filter(t => matchesSelectedDate(getTaskDate(t)));
  const deptTasks = dateFilteredAllTasks.filter(t => t.role === activeDeptId);
  const deptDoneCount = deptTasks.filter(t => isDoneStatus(t.status)).length;
  const deptPendingCount = deptTasks.length - deptDoneCount;

  // Creative IT Studio Derived Data
  const dbCreativeTasks = regularTasks
    .filter(t => t.role === 'creative_it')
    .map(t => {
      const clean = formatCleanTitle(t.title);
      const isDesign = clean.startsWith('[DESIGN]');
      const isShoot = clean.startsWith('[VIDEOGRAPHER]');
      const done = isDoneStatus(t.status);
      return {
        id: `db-${t.id}`,
        dbId: t.id,
        rawDbTask: t,
        isFromDb: true,
        title: clean.replace(/^\[(VIDEOGRAPHER|VIDEO|DESIGN)\]\s*/, ''),
        assignee: isDesign ? 'designer' : isShoot ? 'videographer' : 'video_editor',
        assigneeName: isDesign ? 'গ্রাফিক ডিজাইনার' : isShoot ? 'সিনেমাটোগ্রাফার / শুটার' : 'ভিডিও এডিটর',
        department: isDesign ? 'design' : isShoot ? 'shoot' : 'video',
        deadlineCategory: 'today',
        dueDate: getTaskDate(t),
        completed: done,
        statusState: done ? 'completed' : undefined,
        notes: `ERP সময়: ${t.time || ''}`
      };
    });

  const mergedStudioTasks = [
    ...dbCreativeTasks,
    ...studioTasks.filter(st => !dbCreativeTasks.some(dt => dt.title === st.title))
  ];

  const filteredStudioRoleTasks = mergedStudioTasks.filter(t =>
    studioRoleFilter === 'all' ? true : t.assignee === studioRoleFilter
  );

  const getStudioMeta = (task) => {
    if (task.completed) return { label: 'সম্পন্ন', badge: 'green', cls: 'done', cat: 'completed' };
    if (task.statusState === 'not_done') return { label: 'কাজ হয় নাই', badge: 'red', cls: 'not-done', cat: 'not_done' };
    if (task.isUrgent || task.deadlineCategory === 'today') return { label: 'আজকের জরুরি', badge: 'amber', cls: '', cat: 'today' };
    return { label: '৭ দিনের ভেতর', badge: 'purple', cls: 'week', cat: 'week' };
  };

  const studioPendingTasks = filteredStudioRoleTasks.filter(t => !t.completed);
  const studioApprovedTasks = filteredStudioRoleTasks.filter(t => t.completed);
  const studioVisibleTasks = taskSectionTab === 'approved'
    ? studioApprovedTasks
    : studioPendingTasks.filter(t => statusColorFilter === 'all' || getStudioMeta(t).cat === statusColorFilter);

  const studioTotalCount = filteredStudioRoleTasks.length;
  const studioDoneCount = studioApprovedTasks.length;
  const studioTodayCount = filteredStudioRoleTasks.filter(t => !t.completed && (t.deadlineCategory === 'today' || t.isUrgent)).length;
  const studioNotDoneCount = filteredStudioRoleTasks.filter(t => !t.completed && t.statusState === 'not_done').length;
  const studioWeekCount = filteredStudioRoleTasks.filter(t => !t.completed && (t.deadlineCategory === '7days' || t.deadlineCategory === '3days')).length;
  const studioPct = studioTotalCount ? Math.round((studioDoneCount / studioTotalCount) * 100) : 0;

  const filteredStudioFiles = studioFiles.filter(f => {
    const roleMatch = studioRoleFilter === 'all' || f.owner === studioRoleFilter;
    const typeMatch = fileTypeFilter === 'all' || f.fileType === fileTypeFilter;
    const qMatch = f.title.toLowerCase().includes(fileSearch.toLowerCase()) ||
      f.fileName.toLowerCase().includes(fileSearch.toLowerCase()) ||
      (f.notes && f.notes.toLowerCase().includes(fileSearch.toLowerCase()));
    return roleMatch && typeMatch && qMatch;
  });
  const pendingStudioFiles = filteredStudioFiles.filter(f => f.status !== 'approved');
  const approvedStudioFiles = filteredStudioFiles.filter(f => f.status === 'approved');

  // Factory
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

  const prodTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = localDateStr(d);
    return {
      ds, label: ds.slice(8) + '/' + ds.slice(5, 7),
      total: factoryList.filter(f => f.production_date === ds).reduce((a, x) => a + num(x.quantity), 0)
    };
  });
  const prodTrendMax = Math.max(1, ...prodTrend.map(d => d.total));

  const catRowsAll = [
    ...swaponRows.map(r => ({ label: cleanCat(r.cat), brand: "Swapon's", day: r.day })),
    ...stoneRows.map(r => ({ label: cleanCat(r.cat), brand: 'Stone Rose', day: r.day }))
  ].filter(r => r.day > 0).sort((a, b) => b.day - a.day);
  const catRowsMax = Math.max(1, ...catRowsAll.map(r => r.day));

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

  const filteredFabricList = fabricList.filter(f => matchesSelectedDate(dateOfISO(f.created_at)));
  const fabricTotalValue = filteredFabricList.reduce((a, f) => a + num(f.total_price ?? num(f.total_quantity) * num(f.unit_price)), 0);
  const fabricTotalQty = filteredFabricList.reduce((a, f) => a + num(f.total_quantity), 0);
  const fabricTotalUsed = filteredFabricList.reduce((a, f) => a + num(f.used_quantity), 0);
  const fabricTotalShort = filteredFabricList.reduce((a, f) => a + num(f.shortage_quantity), 0);
  const selectedInView = filteredFabricList.filter(f => selectedFabricIds.includes(f.id)).map(f => f.id);
  const allFabricSelected = filteredFabricList.length > 0 && selectedInView.length === filteredFabricList.length;

  const filteredOrders = ordersList.filter(o => matchesSelectedDate(o.order_date));
  const ordBy = (s) => filteredOrders.filter(o => o.status === s).length;
  const ordRevenue = filteredOrders.filter(o => o.status !== 'Cancelled' && o.status !== 'Returned').reduce((a, o) => a + num(o.amount), 0);
  const ordSuccessPct = filteredOrders.length === 0 ? 0 : Math.round((ordBy('Delivered') / filteredOrders.length) * 100);
  const riskyPhones = ordersList.reduce((acc, o) => {
    if (['Cancelled', 'Returned'].includes(o.status) && o.phone) acc[o.phone] = (acc[o.phone] || 0) + 1;
    return acc;
  }, {});

  const execDepts = USERS.filter(u => u.id !== 'dashboard' && u.id !== 'orders');
  const execTasks = dateFilteredAllTasks.filter(t => t.role !== 'orders');
  const totalFilteredTasks = execTasks.length;
  const totalFilteredDone = execTasks.filter(t => isDoneStatus(t.status)).length;
  const totalFilteredPending = totalFilteredTasks - totalFilteredDone;
  const completionPct = totalFilteredTasks === 0 ? 0 : Math.round((totalFilteredDone / totalFilteredTasks) * 100);

  const workforce = [...headOfficeRoster, ...afternoonRoster].filter(r => r.status !== 'Day Off' && r.status !== 'Leave');
  const workPresent = workforce.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const attRate = workforce.length ? Math.round((workPresent / workforce.length) * 100) : 0;
  const facRate = facTotalSeats ? Math.round((facPresentCount / facTotalSeats) * 100) : 0;

  const hr = new Date().getHours();
  const greet = hr < 5 ? 'শুভ রাত্রি' : hr < 12 ? 'শুভ সকাল' : hr < 16 ? 'শুভ দুপুর' : hr < 19 ? 'শুভ বিকাল' : 'শুভ সন্ধ্যা';
  const prettyDate = new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const renderTaskTable = (rows, { showDept = false, canDelete = false } = {}) => (
    <div className="table-wrap">
      <table className="erp-table">
        <thead>
          <tr>
            <th style={{ width: 56 }}>নং</th>
            {showDept && <th>ডিপার্টমেন্ট</th>}
            <th>কাজের বিবরণ</th>
            <th>তারিখ</th>
            <th>সময়</th>
            <th>স্ট্যাটাস</th>
            <th className="ta-right">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={showDept ? 7 : 6} className="empty">
              এই তারিখে কোনো কাজের রেকর্ড নেই। ওপরের ক্যালেন্ডার থেকে অন্য তারিখ সিলেক্ট করুন।
            </td></tr>
          ) : rows.map((task, idx) => {
            const dInfo = USERS.find(u => u.id === task.role);
            return (
              <tr key={task.id} className={isDoneStatus(task.status) ? 'row-done' : ''}>
                <td style={{ fontWeight: 700, color: 'var(--muted)' }}>{idx + 1}</td>
                {showDept && <td><span className="badge blue">{dInfo?.name || task.role}</span></td>}
                <td><span className="task-text">{formatCleanTitle(task.title)}</span></td>
                <td style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 12.5 }}>{getTaskDate(task)}</td>
                <td style={{ color: 'var(--muted)', fontSize: 12.5 }}>{task.time}</td>
                <td>
                  <select className="input" style={{ padding: '6px 10px', fontSize: 12.5, fontWeight: 600, width: 140 }}
                    value={task.status} onChange={(e) => toggleTaskStatus(task, e.target.value)}>
                    {[...new Set([...customOptions.statuses, task.status])].map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </td>
                <td className="ta-right">
                  <TaskActions task={task} onStatus={toggleTaskStatus} onDelete={deleteTask} canDelete={canDelete} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const applyFilters = (list, withDept = false) =>
    list.filter(t =>
      (filterStatus === 'ALL' || t.status === filterStatus) &&
      (!withDept || filterDept === 'ALL' || t.role === filterDept) &&
      formatCleanTitle(t.title).toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderToolbar = (withDept = false) => (
    <div className="toolbar">
      <div className="search-box">
        <Search size={15} />
        <input type="text" className="input" placeholder="সার্চ করুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>
      {withDept && (
        <select className="input" style={{ width: 190 }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
          <option value="ALL">সব ডিপার্টমেন্ট</option>
          {execDepts.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      )}
      <select className="input" style={{ width: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
        <option value="ALL">সব স্ট্যাটাস</option>
        {customOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );

  return (
    <div className="app-shell">
      <style>{ENTERPRISE_CSS}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <SwaponLogo size={38} lightText />
        </div>

        <div className="sidebar-scroll">
          {DEPT_GROUPS.map(group => (
            <div key={group.label}>
              <div className="nav-group-label">{group.label}</div>
              {group.ids.map(id => {
                const dept = USERS.find(u => u.id === id);
                if (!dept) return null;
                const Icon = dept.icon;
                const canOpen = currentUser.id === 'dashboard' || currentUser.id === dept.id;
                return (
                  <button key={dept.id} onClick={() => setActiveDeptId(dept.id)}
                    className={`nav-item ${activeDeptId === dept.id ? 'active' : ''} ${!canOpen ? 'locked' : ''}`}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <Icon size={16} style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dept.name}</span>
                    </span>
                    {!canOpen && <Lock size={12} style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-foot">
          <div style={{ fontSize: 12, color: '#8EA3C0', marginBottom: 10 }}>
            লগইন: <strong style={{ color: '#fff' }}>{currentUser.name}</strong>
          </div>
          <button className="btn btn-danger btn-block" onClick={() => setCurrentUser(null)}>
            <LogOut size={15} /> লগআউট
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-col">
        <header className="topbar">
          <div className="crumbs">
            <span>Swapon's World ERP</span><span>/</span><strong>{activeDeptObj.name}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {currentUser.id === 'dashboard' && <span className="badge blue" style={{ padding: '6px 14px' }}>👑 Boss Access — সব প্যানেল আনলকড</span>}
            <button className="btn btn-ghost" onClick={fetchAllData}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> রিফ্রেশ
            </button>
          </div>
        </header>

        <main key={activeDeptId} className="content fade">
          {!hasAccessToActive ? (
            <Card style={{ padding: '56px 32px', textAlign: 'center', maxWidth: 540, margin: '40px auto' }}>
              <div style={{ width: 62, height: 62, borderRadius: 16, background: 'var(--red-soft)', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Lock size={30} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>Access Restricted (অনুমতি নেই)</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 22, textAlign: 'center' }}>
                আপনি বর্তমানে <strong>{currentUser.name}</strong> প্যানেলে লগইন আছেন। শুধুমাত্র <strong>Boss (Executive Dashboard)</strong> সব প্যানেলে প্রবেশ ও এডিট করতে পারবেন।
              </p>
              <button className="btn btn-primary" onClick={() => setActiveDeptId(currentUser.id)}>আপনার ডিপার্টমেন্টে ফিরে যান</button>
            </Card>
          ) : (
            <>
              {renderCalendar()}

              {/* 1. BOSS EXECUTIVE DASHBOARD */}
              {activeDeptId === 'dashboard' && (
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
                        right={<button className="btn btn-ghost btn-sm" onClick={() => setActiveDeptId('factory')}>বিস্তারিত <ArrowRight size={13} /></button>}
                      />
                      {catRowsAll.length === 0 ? (
                        <div className="soft-box">নির্বাচিত তারিখে কোনো প্রোডাকশন এন্ট্রি নেই।</div>
                      ) : catRowsAll.slice(0, 9).map((r, i) => (
                        <div key={r.label + r.brand + i} className="hbar-row">
                          <div className="hbar-name">{r.label}</div>
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
                        right={<button className="btn btn-ghost btn-sm" onClick={() => setActiveDeptId('admin')}>বিস্তারিত <ArrowRight size={13} /></button>}
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
                        right={<button className="btn btn-ghost btn-sm" onClick={() => setActiveDeptId('admin')}>বিস্তারিত <ArrowRight size={13} /></button>}
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
                          <button key={dept.id} className="dept-card" onClick={() => setActiveDeptId(dept.id)}>
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
                            <span className={`badge ${done ? 'green' : t.status === 'Delayed' ? 'red' : 'amber'}`}>{t.status}</span>
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
                          const ok = await insertTaskToSupabase(assignToRole, `[${priority}] ${newTaskTitle.trim()}`, 'Pending');
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
                      subtitle={`মোট ${applyFilters(execTasks, true).length} টি রেকর্ড`}
                      right={renderToolbar(true)}
                    />
                    {renderTaskTable(applyFilters(execTasks, true), { showDept: true, canDelete: true })}
                  </Card>
                </div>
              )}

              {/* 2. ADMIN DEPARTMENT */}
              {activeDeptId === 'admin' && (
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
                        <button type="button" className="btn btn-primary" onClick={handleSaveAttendanceSheet}>
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
                        const ok = await insertTaskToSupabase('admin', newTaskTitle.trim(), 'Pending');
                        if (ok) setNewTaskTitle('');
                      }}
                      className="form-row" style={{ marginBottom: 16 }}
                    >
                      <input type="text" className="input grow" placeholder="অ্যাডমিন ডিপার্টমেন্টের কোনো নোট বা কাজ লিখুন..." value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
                      <button type="submit" className="btn btn-primary"><Plus size={15} /> যুক্ত করুন</button>
                    </form>
                    {renderTaskTable(applyFilters(deptTasks), { canDelete: true })}
                  </Card>
                </div>
              )}

              {/* 3. CREATIVE IT — STUDIO WORKSPACE */}
              {activeDeptId === 'creative_it' && (
                <div className="studio-stack">
                  <PageHeader
                    icon={activeDeptObj.icon}
                    title="Creative IT Studio — প্রোডাকশন ও ডেলিভারেবল হাব"
                    subtitle="ভিডিও এডিটর, গ্রাফিক ডিজাইনার ও সিনেমাটোগ্রাফার — স্ক্রিপ্ট, রেফারেন্স ও ফাইল ম্যানেজমেন্ট"
                    right={
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowAddFileModal(true)}>
                          <Plus size={14} /> + ফাইল জমা দিন
                        </button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowAddTaskModal(true)}>
                          <Zap size={14} /> + নতুন অ্যাসাইনমেন্ট (অটোমেশন)
                        </button>
                      </div>
                    }
                  />

                  <div className="tab-row">
                    {[
                      { id: 'all', label: 'সবার কাজ (All)' },
                      { id: 'video_editor', label: '🎬 ভিডিও এডিটর টিম' },
                      { id: 'designer', label: '🎨 গ্রাফিক ডিজাইনার' },
                      { id: 'videographer', label: '📹 সিনেমাটোগ্রাফার / শুট' },
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        className={`tab ${studioRoleFilter === r.id ? 'active' : ''}`}
                        onClick={() => setStudioRoleFilter(r.id)}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  <div className="studio-panel">
                    <div className="studio-progress-top">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-strong)' }}>
                          প্রোডাকশন অগ্রগতি: {studioDoneCount} / {studioTotalCount} ({studioPct}% সম্পন্ন)
                        </div>
                        <div className="progress" style={{ width: 240, marginTop: 8 }}>
                          <div style={{ width: `${studioPct}%` }} />
                        </div>
                      </div>

                      <div className="studio-chips-4" style={{ flex: '1 1 420px', maxWidth: 680 }}>
                        <button
                          type="button"
                          className={`studio-chip-btn ${taskSectionTab === 'pending' && statusColorFilter === 'today' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('pending'); setStatusColorFilter(statusColorFilter === 'today' ? 'all' : 'today'); }}
                        >
                          <span>🟡 আজকের কাজ</span>
                          <b>{studioTodayCount}</b>
                        </button>
                        <button
                          type="button"
                          className={`studio-chip-btn ${taskSectionTab === 'pending' && statusColorFilter === 'not_done' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('pending'); setStatusColorFilter(statusColorFilter === 'not_done' ? 'all' : 'not_done'); }}
                        >
                          <span>🔴 কাজ হয় নাই</span>
                          <b>{studioNotDoneCount}</b>
                        </button>
                        <button
                          type="button"
                          className={`studio-chip-btn ${taskSectionTab === 'pending' && statusColorFilter === 'week' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('pending'); setStatusColorFilter(statusColorFilter === 'week' ? 'all' : 'week'); }}
                        >
                          <span>🟣 ৭ দিন</span>
                          <b>{studioWeekCount}</b>
                        </button>
                        <button
                          type="button"
                          className={`studio-chip-btn ${taskSectionTab === 'approved' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('approved'); setStatusColorFilter('all'); }}
                        >
                          <span>🟢 সম্পন্ন</span>
                          <b>{studioDoneCount}</b>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="studio-panel">
                    <div className="card-head">
                      <div>
                        <div className="card-title">স্টুডিও কাজের হাব ({filteredStudioRoleTasks.length} টি অ্যাসাইনমেন্ট)</div>
                        <div className="card-sub">স্ক্রিপ্ট কপি, রেফারেন্স ভিডিও লিংক এবং স্ট্যাটাস ম্যানেজমেন্ট</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          className={`subtab ${taskSectionTab === 'pending' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('pending'); setStatusColorFilter('all'); }}
                        >
                          <Hourglass size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          চলমান ও পেন্ডিং ({studioPendingTasks.length})
                        </button>
                        <button
                          type="button"
                          className={`subtab ${taskSectionTab === 'approved' ? 'active' : ''}`}
                          onClick={() => { setTaskSectionTab('approved'); setStatusColorFilter('all'); }}
                        >
                          <FileCheck size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          অ্যাপ্রুভড ও সম্পন্ন ({studioApprovedTasks.length})
                        </button>
                      </div>
                    </div>

                    {studioVisibleTasks.length === 0 ? (
                      <div className="soft-box">এই ফিল্টারে কোনো স্টুডিও কাজ পাওয়া যায়নি।</div>
                    ) : (
                      studioVisibleTasks.map(task => {
                        const meta = getStudioMeta(task);
                        const isOpen = !!expandedScripts[task.id];
                        return (
                          <div key={task.id} className={`studio-task-card ${meta.cls}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                              <div style={{ flex: 1, minWidth: 240 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                  <input
                                    type="checkbox"
                                    className="chk"
                                    checked={task.completed}
                                    onChange={async () => {
                                      if (task.isFromDb) await toggleTaskStatus(task.rawDbTask, !task.completed ? 'Done' : 'Pending');
                                      else persistStudioTasks(studioTasks.map(st => st.id === task.id ? { ...st, completed: !st.completed, statusState: !st.completed ? 'completed' : undefined } : st));
                                    }}
                                  />
                                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.title}
                                  </span>
                                  <span className={`badge ${meta.badge}`}>{meta.label}</span>
                                  <span className="badge gray">{task.assigneeName}</span>

                                  {task.referenceVideoUrl && (
                                    <a href={task.referenceVideoUrl} target="_blank" rel="noreferrer" className="badge blue">
                                      <Film size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} /> রেফারেন্স ↗
                                    </a>
                                  )}

                                  {task.scriptText && (
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-sm"
                                      onClick={() => setExpandedScripts(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                                    >
                                      <FileText size={12} /> {isOpen ? 'স্ক্রিপ্ট লুকান ▲' : 'স্ক্রিপ্ট পড়ুন ও কপি করুন ▼'}
                                    </button>
                                  )}
                                </div>

                                {task.notes && (
                                  <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>
                                    <strong>নির্দেশনা:</strong> {task.notes}
                                  </p>
                                )}

                                {task.location && (
                                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                                    <MapPin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                    {task.location} {task.shootTime ? `• ${task.shootTime}` : ''}
                                  </div>
                                )}

                                {task.scriptText && isOpen && (
                                  <div className="studio-script-box">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <strong style={{ fontSize: 12 }}>সম্পূর্ণ স্ক্রিপ্ট / ভয়েসওভার:</strong>
                                      <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleCopyScriptText(task.id, task.scriptText)}
                                      >
                                        {copiedTaskId === task.id ? <><CheckCheck size={12} color="#15803D" /> কপি হয়েছে!</> : <><Copy size={12} /> কপি করুন</>}
                                      </button>
                                    </div>
                                    <pre className="studio-script-pre">{task.scriptText}</pre>
                                  </div>
                                )}
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 11.5, color: 'var(--muted)', marginRight: 4 }}>{task.dueDate}</span>
                                {task.completed ? (
                                  <button
                                    type="button"
                                    className="btn btn-pending btn-sm"
                                    onClick={async () => {
                                      if (task.isFromDb) await toggleTaskStatus(task.rawDbTask, 'Pending');
                                      else persistStudioTasks(studioTasks.map(st => st.id === task.id ? { ...st, completed: false, statusState: 'not_done' } : st));
                                    }}
                                  >
                                    <RotateCcw size={12} /> রিভার্ট
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => {
                                      if (task.isFromDb) toggleTaskStatus(task.rawDbTask, 'Done');
                                      else persistStudioTasks(studioTasks.map(st => st.id === task.id ? { ...st, completed: true, statusState: 'completed' } : st));
                                    }}
                                  >
                                    ✓ সম্পন্ন
                                  </button>
                                )}

                                {!task.isFromDb && (
                                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingStudioTask(task)}>
                                    <Pencil size={12} /> এডিট
                                  </button>
                                )}

                                {isBoss && (
                                  <button
                                    type="button"
                                    className="btn-icon-del"
                                    onClick={async () => {
                                      if (task.isFromDb) await deleteTask(task.dbId);
                                      else persistStudioTasks(studioTasks.filter(st => st.id !== task.id));
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="studio-panel">
                    <div className="card-head">
                      <div>
                        <div className="card-title">প্রোডাকশন ফাইলস ও ডেলিভারেবলস ({filteredStudioFiles.length} টি ফাইল)</div>
                        <div className="card-sub">গুগল ড্রাইভ লিংক ও ফাইল রিভিউ স্ট্যাটাস</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="input"
                          style={{ width: 170, padding: '7px 10px', fontSize: 12 }}
                          placeholder="ফাইল খুঁজুন..."
                          value={fileSearch}
                          onChange={e => setFileSearch(e.target.value)}
                        />
                        <select
                          className="input"
                          style={{ width: 140, padding: '7px 10px', fontSize: 12 }}
                          value={fileTypeFilter}
                          onChange={e => setFileTypeFilter(e.target.value)}
                        >
                          <option value="all">সব টাইপ</option>
                          <option value="video">ভিডিও (.mp4)</option>
                          <option value="project">প্রজেক্ট (.prproj)</option>
                          <option value="image">ইমেজ (.psd)</option>
                          <option value="folder">ফোল্ডার</option>
                        </select>
                        <button
                          type="button"
                          className={`subtab ${fileSectionTab === 'pending' ? 'active' : ''}`}
                          onClick={() => setFileSectionTab('pending')}
                        >
                          পেন্ডিং ({pendingStudioFiles.length})
                        </button>
                        <button
                          type="button"
                          className={`subtab ${fileSectionTab === 'approved' ? 'active' : ''}`}
                          onClick={() => setFileSectionTab('approved')}
                        >
                          অ্যাপ্রুভড ({approvedStudioFiles.length})
                        </button>
                      </div>
                    </div>

                    <div className="studio-files-grid">
                      {(fileSectionTab === 'pending' ? pendingStudioFiles : approvedStudioFiles).map(file => (
                        <div key={file.id} className="studio-file-card">
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontWeight: 700, fontSize: 12.5, color: 'var(--text-strong)' }}>{file.fileName}</span>
                              <span className={`badge ${file.status === 'approved' ? 'green' : 'amber'}`}>
                                {file.status === 'approved' ? 'অ্যাপ্রুভড' : 'রিভিউ'}
                              </span>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>{file.title}</div>
                            {file.notes && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{file.notes}</p>}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{file.ownerName} • {file.uploadedAt}</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {isBoss && file.status !== 'approved' && (
                                <button
                                  type="button"
                                  className="btn btn-done btn-sm"
                                  onClick={() => persistStudioFiles(studioFiles.map(sf => sf.id === file.id ? { ...sf, status: 'approved' } : sf))}
                                >
                                  <Check size={12} /> অ্যাপ্রুভ
                                </button>
                              )}
                              {isBoss && file.status === 'approved' && (
                                <button
                                  type="button"
                                  className="btn btn-pending btn-sm"
                                  onClick={() => persistStudioFiles(studioFiles.map(sf => sf.id === file.id ? { ...sf, status: 'ready_for_review' } : sf))}
                                >
                                  <RotateCcw size={12} /> রিভার্ট
                                </button>
                              )}
                              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingStudioFile(file)}>
                                <Pencil size={12} /> এডিট
                              </button>
                              <a href={file.driveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                                <ExternalLink size={12} /> ড্রাইভ
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. FACTORY */}
              {activeDeptId === 'factory' && (
                <div>
                  <PageHeader icon={activeDeptObj.icon} title={activeDeptObj.name} subtitle={activeDeptObj.title} />

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
                        onClick={() => handleAddCustomOption(factoryBrand === "Swapon's World" ? 'swaponCats' : 'stoneRoseCats')}>
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
              )}

              {/* 5. FABRIC STOCK */}
              {activeDeptId === 'fabric_stock' && (
                <div>
                  <PageHeader icon={activeDeptObj.icon} title={activeDeptObj.name} subtitle={activeDeptObj.title} />

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
              )}

              {/* ORDER MANAGEMENT */}
              {activeDeptId === 'orders' && (
                <div>
                  <PageHeader icon={activeDeptObj.icon} title={activeDeptObj.name} subtitle={activeDeptObj.title} />

                  <div className="grid-kpi">
                    <StatCard tone="blue" icon={ShoppingCart} label={`মোট অর্ডার (${selectedHistoryDate || 'All'})`} value={`${filteredOrders.length} টি`} sub={`Pending: ${ordBy('Pending')} • Confirmed: ${ordBy('Confirmed')}`} />
                    <StatCard tone="indigo" icon={Truck} label="Shipped" value={`${ordBy('Shipped')} টি`} sub={`Delivered: ${ordBy('Delivered')} (${ordSuccessPct}%)`} subHighlight />
                    <StatCard tone="green" icon={Calculator} label="রেভিনিউ (Cancel/Return বাদে)" value={money(ordRevenue)} />
                    <StatCard tone="red" icon={AlertTriangle} label="Cancelled / Returned" value={`${ordBy('Cancelled') + ordBy('Returned')} টি`} />
                  </div>

                  <Card>
                    <CardHeader title="🛒 নতুন অর্ডার এন্ট্রি" subtitle="* চিহ্নিত ঘর আবশ্যক" />
                    <form onSubmit={addOrder} className="form-grid">
                      <Field label="কাস্টমারের নাম *">
                        <input type="text" required className="input" value={orderForm.customer_name} onChange={e => setOrderForm({ ...orderForm, customer_name: e.target.value })} />
                      </Field>
                      <Field label="ফোন নম্বর *">
                        <input type="tel" required className="input" placeholder="01XXXXXXXXX" value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} />
                      </Field>
                      <Field label="ঠিকানা">
                        <input type="text" className="input" value={orderForm.address} onChange={e => setOrderForm({ ...orderForm, address: e.target.value })} />
                      </Field>
                      <Field label="প্রোডাক্ট">
                        <input type="text" className="input" placeholder="যেমন: Panjabi Embroidery - L" value={orderForm.product} onChange={e => setOrderForm({ ...orderForm, product: e.target.value })} />
                      </Field>
                      <Field label="পরিমাণ">
                        <input type="number" min="1" className="input" value={orderForm.qty} onChange={e => setOrderForm({ ...orderForm, qty: e.target.value })} />
                      </Field>
                      <Field label="মোট টাকা (৳)">
                        <input type="number" className="input" value={orderForm.amount} onChange={e => setOrderForm({ ...orderForm, amount: e.target.value })} />
                      </Field>
                      <Field label="কুরিয়ার">
                        <select className="input" value={orderForm.courier} onChange={e => setOrderForm({ ...orderForm, courier: e.target.value })}>
                          {COURIERS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="সোর্স">
                        <select className="input" value={orderForm.source} onChange={e => setOrderForm({ ...orderForm, source: e.target.value })}>
                          {['Facebook', 'Website', 'Call Center', 'Showroom', 'Wholesale'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="ট্র্যাকিং আইডি">
                        <input type="text" className="input" value={orderForm.tracking_id} onChange={e => setOrderForm({ ...orderForm, tracking_id: e.target.value })} />
                      </Field>
                      <button type="submit" className="btn btn-primary"><Plus size={15} /> অর্ডার যুক্ত করুন</button>
                    </form>
                  </Card>

                  <Card>
                    <CardHeader title={`অর্ডার তালিকা (${selectedHistoryDate || 'All Dates'})`} subtitle={`${filteredOrders.length} টি অর্ডার`} />
                    <div className="table-wrap">
                      <table className="erp-table">
                        <thead>
                          <tr>
                            <th>তারিখ</th><th>কাস্টমার</th><th>ফোন</th><th>প্রোডাক্ট</th>
                            <th className="num">Qty</th><th className="num">টাকা</th>
                            <th>কুরিয়ার</th><th>স্ট্যাটাস</th><th className="ta-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.length === 0 ? (
                            <tr><td colSpan={9} className="empty">এই তারিখে কোনো অর্ডার নেই।</td></tr>
                          ) : filteredOrders.map(o => (
                            <tr key={o.id}>
                              <td style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 12.5 }}>{o.order_date}</td>
                              <td>
                                <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{o.customer_name}</div>
                                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{o.source}</div>
                              </td>
                              <td>
                                {o.phone}
                                {riskyPhones[o.phone] >= 2 && (
                                  <div><span className="badge red">⚠ ঝুঁকি ({riskyPhones[o.phone]})</span></div>
                                )}
                              </td>
                              <td>{o.product}</td>
                              <td className="num">{o.qty}</td>
                              <td className="num" style={{ fontWeight: 700 }}>{money(o.amount)}</td>
                              <td>
                                {o.courier}
                                {o.tracking_id && <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{o.tracking_id}</div>}
                              </td>
                              <td>
                                <select className="input" style={{ padding: '6px 10px', fontSize: 12.5, fontWeight: 600, width: 130 }}
                                  value={o.status} onChange={e => updateOrderStatus(o, e.target.value)}>
                                  {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <div style={{ marginTop: 4 }}><span className={`badge ${ORDER_TONE[o.status] || 'gray'}`}>{o.status}</span></div>
                              </td>
                              <td className="ta-right">
                                {isBoss && (
                                  <button className="btn-icon-del" onClick={() => deleteOrder(o.id)}><Trash2 size={14} /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {filteredOrders.length > 0 && (
                          <tfoot>
                            <tr>
                              <td colSpan={5}>মোট</td>
                              <td className="num">{money(filteredOrders.reduce((a, o) => a + num(o.amount), 0))}</td>
                              <td colSpan={3} />
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* 6. DIGITAL MARKETING */}
              {activeDeptId === 'marketing' && (
                <div>
                  <PageHeader icon={activeDeptObj.icon} title={activeDeptObj.name} subtitle={activeDeptObj.title} />
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
                        const ok = await insertTaskToSupabase('marketing', summary, dmForm.progressStatus);
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
                </div>
              )}

              {/* 7. GM, OPERATION, ACCOUNTS, CALL CENTER, RECEPTION */}
              {['manager', 'head_sales', 'senior_accounts', 'cc_coordinator', 'cc_leader_morning', 'cc_leader_evening', 'reception'].includes(activeDeptId) && (() => {
                const areaMap = {
                  manager: { list: customOptions.gmAreas, key: 'gmAreas' },
                  head_sales: { list: customOptions.salesAreas, key: 'salesAreas' },
                  senior_accounts: { list: customOptions.accountsAreas, key: 'accountsAreas' },
                  cc_coordinator: { list: customOptions.ccAreas, key: 'ccAreas' },
                  cc_leader_morning: { list: customOptions.ccLeaderAreas, key: 'ccLeaderAreas' },
                  cc_leader_evening: { list: customOptions.ccLeaderAreas, key: 'ccLeaderAreas' },
                  reception: { list: customOptions.receptionAreas, key: 'receptionAreas' }
                }[activeDeptId];
                const isAccounts = activeDeptId === 'senior_accounts';

                return (
                  <div>
                    <PageHeader icon={activeDeptObj.icon} title={activeDeptObj.name} subtitle={activeDeptObj.title} />
                    <div className="grid-kpi">
                      <StatCard tone="blue" icon={Activity} label={selectedHistoryDate ? `${selectedHistoryDate} তারিখের কাজ` : 'মোট নির্ধারিত কাজ'} value={`${deptTasks.length} টি`} />
                      <StatCard tone="green" icon={CheckCircle2} label="সম্পন্ন হয়েছে (Done)" value={`${deptDoneCount} টি`} />
                      <StatCard tone="amber" icon={Clock} label="বাকি আছে (Pending)" value={`${deptPendingCount} টি`} />
                    </div>

                    <Card>
                      <CardHeader title={`${activeDeptObj.name} — কার্যক্রম ও টাস্ক এন্ট্রি`} subtitle="দায়িত্ব সিলেক্ট করুন, প্রয়োজনে নোট লিখুন" />
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const chosenArea = selectedArea || areaMap.list[0];
                          const amountPart = isAccounts && entryAmount ? ` — ৳${Number(entryAmount).toLocaleString()}` : '';
                          const notePart = newTaskTitle.trim() ? ` — ${newTaskTitle.trim()}` : '';
                          const ok = await insertTaskToSupabase(activeDeptId, `${chosenArea}${amountPart}${notePart}`, taskStatus);
                          if (ok) { setNewTaskTitle(''); setEntryAmount(''); }
                        }}
                        className="form-row"
                      >
                        <select className="input" style={{ flex: '2 1 320px', fontWeight: 600 }} value={selectedArea || areaMap.list[0]} onChange={(e) => setSelectedArea(e.target.value)}>
                          {areaMap.list.map(item => <option key={item} value={item}>{item}</option>)}
                        </select>

                        {isAccounts && (
                          <input type="number" className="input" style={{ flex: '0 1 160px' }} placeholder="টাকা (৳) ঐচ্ছিক"
                            value={entryAmount} onChange={(e) => setEntryAmount(e.target.value)} />
                        )}

                        <input type="text" className="input" style={{ flex: '2 1 240px' }} placeholder="কাজের বিস্তারিত নোট (ঐচ্ছিক)..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                        <select className="input" style={{ flex: '0 1 160px', fontWeight: 600 }} value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                          {customOptions.statuses.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                        <button type="submit" className="btn btn-primary"><Plus size={16} /> যুক্ত করুন</button>
                      </form>

                      <div className="divider-dash">
                        <input type="text" className="input" style={{ flex: '1 1 260px', maxWidth: 340 }} placeholder="নতুন কাজের ক্যাটাগরি বা স্ট্যাটাস লিখুন..." value={newOptionText} onChange={(e) => setNewOptionText(e.target.value)} />
                        <button type="button" className="btn btn-dark btn-sm" onClick={() => handleAddCustomOption(areaMap.key)}>+ নতুন কাজের ক্যাটাগরি</button>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleAddCustomOption('statuses')}>+ নতুন Status</button>
                      </div>
                    </Card>
                  </div>
                );
              })()}

              {/* TASK TABLE FOR STANDARD DEPTS */}
              {!['dashboard', 'admin', 'creative_it', 'factory', 'fabric_stock', 'orders'].includes(activeDeptId) && (
                <Card>
                  <CardHeader
                    title={`${activeDeptObj.name} — কাজের টেবিল (${applyFilters(deptTasks).length}) ${selectedHistoryDate ? `[${selectedHistoryDate}]` : '[সব তারিখ]'}`}
                    right={renderToolbar(false)}
                  />
                  {renderTaskTable(applyFilters(deptTasks), { canDelete: currentUser.id === 'dashboard' })}
                </Card>
              )}
            </>
          )}
        </main>
      </div>

      {/* CREATIVE STUDIO MODAL: ADD TASK */}
      {showAddTaskModal && (
        <div className="studio-modal-backdrop">
          <div className="studio-modal">
            <div className="card-head">
              <div>
                <div className="card-title">স্মার্ট অটোমেশন — নতুন কাজ বুঝিয়ে দিন</div>
                <div className="card-sub">প্রিসেটে ক্লিক করলে রেফারেন্স লিংক, স্ক্রিপ্ট ও সময় অটোমেটিক পূরণ হবে</div>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowAddTaskModal(false)}><X size={14} /></button>
            </div>

            <div className="preset-grid">
              <button type="button" className="preset-btn" onClick={() => applyStudioPreset('reels')}>
                <div style={{ fontWeight: 700, fontSize: 12.5 }}>📱 রিলস ও শর্টস (৯:১৬)</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>ভিডিও + স্ক্রিপ্ট অটো</div>
              </button>
              <button type="button" className="preset-btn" onClick={() => applyStudioPreset('voiceover')}>
                <div style={{ fontWeight: 700, fontSize: 12.5 }}>🎙️ ভয়েসওভার ও সাউন্ড</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>পূর্ণ স্ক্রিপ্ট সহ</div>
              </button>
              <button type="button" className="preset-btn" onClick={() => applyStudioPreset('youtube')}>
                <div style={{ fontWeight: 700, fontSize: 12.5 }}>📺 ইউটিউব ফুল ভিডিও</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>আগামী ৭ দিনের ভেতর</div>
              </button>
              <button type="button" className="preset-btn" onClick={() => applyStudioPreset('banner')}>
                <div style={{ fontWeight: 700, fontSize: 12.5 }}>🎨 সোশ্যাল ব্যানার সেট</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>আজকের কাজ</div>
              </button>
              <button type="button" className="preset-btn" onClick={() => applyStudioPreset('shoot_outdoor')}>
                <div style={{ fontWeight: 700, fontSize: 12.5 }}>📹 আউটডোর শুট</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>আজ দুপুর ২:৩০ PM</div>
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newStudioTitle.trim()) return;
                const names = {
                  video_editor: 'ভিডিও এডিটর',
                  designer: 'গ্রাফিক ডিজাইনার',
                  videographer: 'সিনেমাটোগ্রাফার / শুটার'
                };
                const prefix = newStudioAssignee === 'designer' ? '[DESIGN]' : newStudioAssignee === 'videographer' ? '[VIDEOGRAPHER]' : '[VIDEO]';
                await insertTaskToSupabase('creative_it', `${prefix} ${newStudioTitle.trim()}`, 'Pending');
                const item = {
                  id: `st-${Date.now()}`,
                  title: newStudioTitle.trim(),
                  assignee: newStudioAssignee,
                  assigneeName: names[newStudioAssignee] || 'ভিডিও এডিটর',
                  department: newStudioDepartment,
                  deadlineCategory: newStudioCategory,
                  dueDate: newStudioDueDate || 'আজকের ভেতর (Today)',
                  completed: false,
                  referenceVideoUrl: newReferenceVideoUrl.trim() || undefined,
                  scriptText: newScriptText.trim() || undefined,
                  notes: newStudioNotes.trim() || undefined,
                  location: newLocation.trim() || undefined,
                  isUrgent: newIsUrgent
                };
                persistStudioTasks([item, ...studioTasks]);
                setNewStudioTitle('');
                setNewReferenceVideoUrl('');
                setNewScriptText('');
                setNewStudioNotes('');
                setNewLocation('');
                setShowAddTaskModal(false);
                notify('স্টুডিও কাজ যুক্ত হয়েছে ✓', 'ok');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}
            >
              <Field label="কাজের শিরোনাম *">
                <input type="text" required className="input" value={newStudioTitle} onChange={e => setNewStudioTitle(e.target.value)} placeholder="কাজের নাম লিখুন..." />
              </Field>
              <div className="form-grid">
                <Field label="কাকে দায়িত্ব দিচ্ছেন">
                  <select className="input" value={newStudioAssignee} onChange={e => {
                    const v = e.target.value;
                    setNewStudioAssignee(v);
                    setNewStudioDepartment(v === 'designer' ? 'design' : v === 'videographer' ? 'shoot' : 'video');
                  }}>
                    <option value="video_editor">🎬 ভিডিও এডিটর</option>
                    <option value="designer">🎨 গ্রাফিক ডিজাইনার</option>
                    <option value="videographer">📹 সিনেমাটোগ্রাফার / শুটার</option>
                  </select>
                </Field>
                <Field label="সময়সীমা">
                  <input type="text" className="input" value={newStudioDueDate} onChange={e => setNewStudioDueDate(e.target.value)} placeholder="আজকের ভেতর" />
                </Field>
              </div>
              <Field label="রেফারেন্স ভিডিও লিংক">
                <input type="url" className="input" value={newReferenceVideoUrl} onChange={e => setNewReferenceVideoUrl(e.target.value)} placeholder="https://..." />
              </Field>
              <Field label="স্ক্রিপ্ট বা ভয়েসওভার টেক্সট">
                <textarea rows={4} className="input" value={newScriptText} onChange={e => setNewScriptText(e.target.value)} placeholder="সম্পূর্ণ স্ক্রিপ্ট লিখুন..." />
              </Field>
              <Field label="নির্দেশনা / নোটস">
                <textarea rows={2} className="input" value={newStudioNotes} onChange={e => setNewStudioNotes(e.target.value)} />
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                <input type="checkbox" checked={newIsUrgent} onChange={e => setNewIsUrgent(e.target.checked)} />
                <span>জরুরি কাজ (Urgent Priority)</span>
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddTaskModal(false)}>বাতিল</button>
                <button type="submit" className="btn btn-primary">কাজ অ্যাসাইন করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATIVE STUDIO MODAL: EDIT TASK */}
      {editingStudioTask && (
        <div className="studio-modal-backdrop">
          <div className="studio-modal">
            <div className="card-head">
              <div className="card-title">কাজের বিবরণ বা স্ট্যাটাস এডিট করুন</div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingStudioTask(null)}><X size={14} /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                persistStudioTasks(studioTasks.map(st => st.id === editingStudioTask.id ? editingStudioTask : st));
                setEditingStudioTask(null);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <Field label="কাজের শিরোনাম">
                <input type="text" required className="input" value={editingStudioTask.title} onChange={e => setEditingStudioTask({ ...editingStudioTask, title: e.target.value })} />
              </Field>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-absent btn-sm" onClick={() => setEditingStudioTask({ ...editingStudioTask, completed: false, statusState: 'not_done' })}>🔴 কাজ হয় নাই</button>
                <button type="button" className="btn btn-pending btn-sm" onClick={() => setEditingStudioTask({ ...editingStudioTask, completed: false, statusState: undefined, isUrgent: true })}>🟡 আজকের কাজ</button>
                <button type="button" className="btn btn-done btn-sm" onClick={() => setEditingStudioTask({ ...editingStudioTask, completed: true, statusState: 'completed' })}>🟢 সম্পন্ন</button>
              </div>
              <Field label="স্ক্রিপ্ট">
                <textarea rows={4} className="input" value={editingStudioTask.scriptText || ''} onChange={e => setEditingStudioTask({ ...editingStudioTask, scriptText: e.target.value })} />
              </Field>
              <Field label="নোটস">
                <textarea rows={2} className="input" value={editingStudioTask.notes || ''} onChange={e => setEditingStudioTask({ ...editingStudioTask, notes: e.target.value })} />
              </Field>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditingStudioTask(null)}>বাতিল</button>
                <button type="submit" className="btn btn-primary">পরিবর্তন সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATIVE STUDIO MODAL: ADD FILE */}
      {showAddFileModal && (
        <div className="studio-modal-backdrop">
          <div className="studio-modal">
            <div className="card-head">
              <div className="card-title">নতুন ডেলিভারেবল বা ড্রাইভ লিংক জমা দিন</div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowAddFileModal(false)}><X size={14} /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newFileTitle.trim() || !newFileName.trim()) return;
                const ownerKey = studioRoleFilter === 'all' ? 'video_editor' : studioRoleFilter;
                const ownerMap = { video_editor: 'ভিডিও এডিটর', designer: 'গ্রাফিক ডিজাইনার', videographer: 'সিনেমাটোগ্রাফার / শুটার' };
                const fItem = {
                  id: `sf-${Date.now()}`,
                  title: newFileTitle.trim(),
                  fileName: newFileName.trim(),
                  fileType: newFileType,
                  fileFormat: newFileFormat,
                  fileSize: newFileSize || 'Cloud Link',
                  driveUrl: newDriveUrl || '#',
                  owner: ownerKey,
                  ownerName: ownerMap[ownerKey] || 'ভিডিও এডিটর',
                  status: 'ready_for_review',
                  uploadedAt: 'এখনই আপলোডকৃত',
                  notes: newFileNotes.trim() || undefined
                };
                persistStudioFiles([fItem, ...studioFiles]);
                setNewFileTitle(''); setNewFileName(''); setNewDriveUrl(''); setNewFileNotes('');
                setShowAddFileModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <Field label="কাজের শিরোনাম *">
                <input type="text" required className="input" value={newFileTitle} onChange={e => setNewFileTitle(e.target.value)} />
              </Field>
              <Field label="ফাইলের নাম *">
                <input type="text" required className="input" value={newFileName} onChange={e => setNewFileName(e.target.value)} />
              </Field>
              <Field label="গুগল ড্রাইভ লিংক *">
                <input type="url" required className="input" value={newDriveUrl} onChange={e => setNewDriveUrl(e.target.value)} />
              </Field>
              <Field label="নোটস">
                <textarea rows={2} className="input" value={newFileNotes} onChange={e => setNewFileNotes(e.target.value)} />
              </Field>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddFileModal(false)}>বাতিল</button>
                <button type="submit" className="btn btn-primary">ফাইল জমা দিন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATIVE STUDIO MODAL: EDIT FILE */}
      {editingStudioFile && (
        <div className="studio-modal-backdrop">
          <div className="studio-modal">
            <div className="card-head">
              <div className="card-title">ফাইল এডিট ও স্ট্যাটাস পরিবর্তন</div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingStudioFile(null)}><X size={14} /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                persistStudioFiles(studioFiles.map(sf => sf.id === editingStudioFile.id ? editingStudioFile : sf));
                setEditingStudioFile(null);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <Field label="ফাইলের শিরোনাম">
                <input type="text" required className="input" value={editingStudioFile.title} onChange={e => setEditingStudioFile({ ...editingStudioFile, title: e.target.value })} />
              </Field>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-pending btn-sm" onClick={() => setEditingStudioFile({ ...editingStudioFile, status: 'ready_for_review' })}>⏳ রিভিউ</button>
                <button type="button" className="btn btn-done btn-sm" onClick={() => setEditingStudioFile({ ...editingStudioFile, status: 'approved' })}>🏆 অ্যাপ্রুভড</button>
              </div>
              <Field label="ড্রাইভ লিংক">
                <input type="url" required className="input" value={editingStudioFile.driveUrl} onChange={e => setEditingStudioFile({ ...editingStudioFile, driveUrl: e.target.value })} />
              </Field>
              <Field label="নোটস">
                <textarea rows={2} className="input" value={editingStudioFile.notes || ''} onChange={e => setEditingStudioFile({ ...editingStudioFile, notes: e.target.value })} />
              </Field>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditingStudioFile(null)}>বাতিল</button>
                <button type="submit" className="btn btn-primary">পরিবর্তন সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notice && <div className={`toast ${notice.type}`}>{notice.text}</div>}
    </div>
  );
}