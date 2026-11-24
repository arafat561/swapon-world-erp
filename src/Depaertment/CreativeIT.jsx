import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Check,
  Plus,
  Film,
  MapPin,
  Trash2,
  X,
  FileText,
  ExternalLink,
  Search,
  HardDrive,
  FileCode,
  Image as ImageIcon,
  Zap,
  Copy,
  Pencil,
  RotateCcw,
  CheckCheck,
  Hourglass,
  FileCheck,
} from "lucide-react";

const INITIAL_STUDIO_TASKS = [
  {
    id: "task-vid-1",
    title: "সামার সেলস টিকটক ও ইনস্টাগ্রাম রিলস ভার্টিক্যাল কাট (৯:১৬)",
    assignee: "video_editor",
    assigneeName: "ভিডিও এডিটর",
    department: "video",
    deadlineCategory: "today",
    dueDate: "আজ সন্ধ্যা ৬:০০ (Today)",
    completed: false,
    isUrgent: true,
    referenceVideoUrl: "https://youtube.com/shorts/sample-reels-reference",
    scriptText: `[হুক (০-৩ সেকেন্ড)]:
"আপনি কি জানেন আপনার বিজনেসের সেলস ৩০% কমে যেতে পারে মাত্র একটি ভুলের কারণে?"

[বডি (৩-২০ সেকেন্ড)]:
"স্বপনস ওয়ার্ল্ড এর প্রিমিয়াম ভিডিও প্রোডাকশন দিয়ে আপনার ব্র‍্যান্ডকে নিয়ে যান অনন্য উচ্চতায়। হাই-কোয়ালিটি সিনেমাটিক ফুটেজ ও ট্রেন্ডিং বিটস।"

[কল টু অ্যাকশন (২০-৩০ সেকেন্ড)]:
"দেরি না করে আজই বায়োতে দেওয়া লিংকে ক্লিক করুন অথবা ইনবক্সে মেসেজ পাঠান!"`,
    notes: "প্রথম ৩ সেকেন্ডের হুক, ফাস্ট ট্রানজিশন এবং ট্রেন্ডিং সাউন্ড এফেক্টস সিঙ্ক করবেন। ড্রাইভ থেকে ফুটেজ ফোল্ডার লিঙ্ক করুন।",
  },
  {
    id: "task-vid-2",
    title: "ভয়েসওভার ও সাউন্ড সিঙ্ক মাস্টার (Voiceover & Audio)",
    assignee: "video_editor",
    assigneeName: "ভিডিও এডিটর",
    department: "video",
    deadlineCategory: "today",
    dueDate: "আজ রাত ৮:০০ (Today)",
    completed: false,
    isUrgent: true,
    referenceVideoUrl: "https://drive.google.com/file/d/voiceover-audio-reference/view",
    scriptText: `[ভয়েসওভার মাস্টার স্ক্রিপ্ট — স্বপনস ওয়ার্ল্ড ক্রিয়েটিভ স্টুডিও]:
"সঠিক পরিকল্পনাই একটি সফল ব্র্যান্ডের মূল ভিত্তি। প্রতিটি ভিজ্যুয়াল, প্রতিটি কালার টোন আর প্রতিটি কাট—আমরা সাজিয়ে তুলি আপনার স্বপ্নের মতো করে। কারণ আপনার গল্পটি অসাধারণ হতে বাধ্য।"
(নির্দেশনা: ব্যাকগ্রাউন্ড সাউন্ড -14 LUFS নরম্যালাইজ করুন, নয়েজ ফ্রি অডিও মাস্টার করবেন)`,
    notes: "ভয়েসওভার ক্লিন করা, ব্যাকগ্রাউন্ড নয়েজ রিমুভ ও সাউন্ড লেভেল -14 LUFS নরম্যালাইজেশন।",
  },
  {
    id: "task-vid-3",
    title: "প্রোডাক্ট টিজার ও বি-রোল কাট — রিভিশন পেন্ডিং",
    assignee: "video_editor",
    assigneeName: "ভিডিও এডিটর",
    department: "video",
    deadlineCategory: "tomorrow",
    dueDate: "কালকের ভেতরেই শেষ করতে হবে",
    completed: false,
    statusState: "not_done",
    referenceVideoUrl: "https://youtube.com/shorts/product-teaser-sample",
    scriptText: `[টিজার টেক্সট সুপার ও ভয়েসওভার]:
"আগামীকাল আসছে নতুন চমক। চোখ রাখুন স্বপনস ওয়ার্ল্ড পেইজে!"`,
    notes: "হেডের রিভিউ নোট: মিউজিকের বিটের সাথে কাট ফাস্ট করতে হবে। আগের কাজ এখনও সম্পন্ন হয় নাই।",
  },
  {
    id: "task-vid-4",
    title: "ইউটিউব ফুল ডকুমেন্টারি ভিডিও কাট ও কালার গ্রেডিং (১৬:৯)",
    assignee: "video_editor",
    assigneeName: "ভিডিও এডিটর",
    department: "video",
    deadlineCategory: "7days",
    dueDate: "আগামী ৭ দিনের ভেতর (7 Days)",
    completed: false,
    referenceVideoUrl: "https://youtube.com/watch?v=sample-documentary-grade",
    scriptText: `[ডকুমেন্টারি ভয়েসওভার পর্ব ০১]:
"ঢাকার বুকে ক্রিয়েটিভ ইন্ডাস্ট্রির নতুন বিপ্লব শুরু হয়েছিল এই স্টুডিও থেকেই। যেখানে আইডিয়া রূপ নেয় সেলুলয়েডের পর্দায়..."`,
    notes: "১৬:৯ ইউটিউব মাস্টার কাট, বি-রোল সিঙ্ক, সাউন্ড ডিজাইন ও Rec.709 কালার গ্রেডিং।",
  },
  {
    id: "task-vid-5",
    title: "ইউটিউব ইন্ট্রো ও মোশন গ্রাফিক্স কাট",
    assignee: "video_editor",
    assigneeName: "ভিডিও এডিটর",
    department: "video",
    deadlineCategory: "today",
    dueDate: "আজ দুপুর ২:০০",
    completed: true,
    statusState: "completed",
    referenceVideoUrl: "https://youtube.com/watch?v=intro-motion-ref",
    notes: "ফাইনাল রেন্ডার সম্পন্ন হয়েছে এবং ড্রাইভ স্টুডিও ফোল্ডারে আপলোড করা আছে।",
  },
  {
    id: "task-des-1",
    title: "সামার কালেকশন সোশ্যাল মিডিয়া ব্যানার সেট (১০৮০x১০৮০)",
    assignee: "designer",
    assigneeName: "গ্রাফিক ডিজাইনার",
    department: "design",
    deadlineCategory: "today",
    dueDate: "আজ দুপুর ৩:০০ (Today)",
    completed: false,
    isUrgent: true,
    scriptText: `[ব্যানার টেক্সট ও টাইপোগ্রাফি]:
"SUMMER DROP 2026 • FLAT 40% OFF"
সাব-টেক্সট: "Shop Now at Swapon's World"`,
    notes: "ফেসবুক ও ইনস্টাগ্রাম স্কয়ার পোস্ট এবং স্টোরি সাইজ প্রস্তুত করতে হবে।",
  },
  {
    id: "task-des-2",
    title: "ক্যাটালগ ও ফটো ম্যানিপুলেশন — কারেকশন পেন্ডিং",
    assignee: "designer",
    assigneeName: "গ্রাফিক ডিজাইনার",
    department: "design",
    deadlineCategory: "tomorrow",
    dueDate: "কালকের মধ্যে",
    completed: false,
    statusState: "not_done",
    notes: "স্কিন রিটাচিং এবং প্রোডাক্টের কালার কারেকশন এখনো হয় নাই।",
  },
  {
    id: "task-des-3",
    title: "ব্র্যান্ড লুকবুক ও হাই-এন্ড ফটো রিটাচিং",
    assignee: "designer",
    assigneeName: "গ্রাফিক ডিজাইনার",
    department: "design",
    deadlineCategory: "7days",
    dueDate: "আগামী ৭ দিনের শিডিউল",
    completed: true,
    statusState: "completed",
    notes: "প্রোডাক্ট লুকবুক ও স্কিন রিটাচিং ক্লায়েন্ট ফাইনাল ডেলিভারির জন্য প্রস্তুত ও অ্যাপ্রুভড।",
  },
  {
    id: "task-sht-1",
    title: "নতুন প্রোডাক্ট ক্যাম্পেইন — আউটডোর শুট",
    assignee: "videographer",
    assigneeName: "সিনেমাটোগ্রাফার / শুটার",
    department: "shoot",
    deadlineCategory: "today",
    dueDate: "আজ দুপুর ২:৩০ PM (Today)",
    completed: false,
    isUrgent: true,
    location: "ধানমন্ডি লেক ও আউটডোর স্পট",
    shootTime: "দুপুর ২:৩০ PM – ৫:০০ PM",
    gearInfo: "Sony FX3 • 24-70mm f/2.8 • Ronin RS3 Gimbal • 4K 60fps",
    notes: "ন্যাচারাল গোল্ডেন আওয়ার লাইটিং ও স্লো-মোশন ক্লোজ-আপ শট। ফুটেজ ড্রাইভে ব্যাকআপ করতে হবে।",
  },
  {
    id: "task-sht-2",
    title: "ইনডোর মডেল ও ফ্যাশন শুট (স্বপনস ওয়ার্ল্ড স্টুডিও ২)",
    assignee: "videographer",
    assigneeName: "সিনেমাটোগ্রাফার / শুটার",
    department: "shoot",
    deadlineCategory: "7days",
    dueDate: "আগামী ৭ দিনের ভেতর",
    completed: false,
    location: "স্বপনস ওয়ার্ল্ড মেইন স্টুডিও (ফ্লোর ২)",
    shootTime: "সকাল ১১:০০ AM",
    gearInfo: "Aputure 300d II Softbox • C-Stands • Reflector Panel",
    notes: "ইনডোর থিম্যাটিক ব্যাকড্রপ ও লাইটিং গ্রিড আগে থেকে প্রস্তুত রাখা প্রয়োজন।",
  },
];

const INITIAL_STUDIO_FILES = [
  {
    id: "file-vid-1",
    title: "সামার সেলস ৯:১৬ ভার্টিক্যাল রিলস — ড্রাফট রেন্ডার",
    fileName: "Summer_Reels_Hook_V3_4K.mp4",
    fileType: "video",
    fileFormat: "MP4 (4K 60fps)",
    fileSize: "285 MB",
    driveUrl: "https://drive.google.com/drive/folders/swapons_world_video",
    owner: "video_editor",
    ownerName: "ভিডিও এডিটর",
    status: "ready_for_review",
    uploadedAt: "২১ নভেম্বর, দুপুর ০১:১৫",
    notes: "কালার গ্রেডিং Rec.709 স্ট্যান্ডার্ড এবং সাউন্ড লেভেল -14 LUFS নরম্যালাইজ করা হয়েছে। হেডের রিভিউর জন্য প্রস্তুত।",
  },
  {
    id: "file-vid-2",
    title: "ইউটিউব মাস্টার ডকুমেন্টারি কাট ও কালার গ্রেড (১৬:৯)",
    fileName: "Youtube_Documentary_16x9_Master.mp4",
    fileType: "video",
    fileFormat: "MP4 (4K UHD)",
    fileSize: "3.4 GB",
    driveUrl: "https://drive.google.com/drive/folders/swapons_world_video",
    owner: "video_editor",
    ownerName: "ভিডিও এডিটর",
    status: "needs_revision",
    uploadedAt: "২১ নভেম্বর, সকাল ১১:৪৫",
    notes: "হেডের কমেন্ট: বি-রোল কাটে আরো ২টা স্লো-মোশন শট যোগ করতে হবে। সাউন্ডের বিজিএম ভলিউম একটু কমাতে হবে।",
  },
  {
    id: "file-vid-3",
    title: "টিকটক প্রোডাক্ট অ্যাডভার্টাইজমেন্ট প্রজেক্ট ফাইল",
    fileName: "Tiktok_Product_Ad_Cut_Final.prproj",
    fileType: "project",
    fileFormat: "Premiere Pro (.prproj)",
    fileSize: "32 MB",
    driveUrl: "https://drive.google.com/drive/folders/swapons_world_video",
    owner: "video_editor",
    ownerName: "ভিডিও এডিটর",
    status: "approved",
    uploadedAt: "২০ নভেম্বর, সন্ধ্যা ০৭:০০",
    notes: "সম্পূর্ণ প্রোজেক্ট ফাইল ও ট্রাঞ্জিশন প্রিসেট ক্লায়েন্ট দ্বারা অ্যাপ্রুভড এবং ড্রাইভে ব্যাকআপ সংরক্ষিত।",
  },
  {
    id: "file-des-1",
    title: "সামার কালেকশন স্কয়ার পোস্ট ব্যানার (১০৮০x১০৮০)",
    fileName: "Summer_Collection_Banner_1080x1080.psd",
    fileType: "image",
    fileFormat: "Photoshop (.psd)",
    fileSize: "420 MB",
    driveUrl: "https://drive.google.com/drive/folders/swapons_world_design",
    owner: "designer",
    ownerName: "গ্রাফিক ডিজাইনার",
    status: "approved",
    uploadedAt: "২১ নভেম্বর, দুপুর ১২:০০",
    notes: "সবগুলো লেয়ার আনগ্রুপড ও ফন্ট আউটলাইন করা অবস্থায় আপলোড করা। হেড অ্যাপ্রুভড।",
  },
  {
    id: "file-sht-1",
    title: "ধানমন্ডি লেক আউটডোর শুট র ফুটেজ ফোল্ডার",
    fileName: "Dhanmondi_Lake_Shoot_Raw_Clips_Folder.drive",
    fileType: "folder",
    fileFormat: "Sony XAVC S (4K 60fps)",
    fileSize: "48 GB",
    driveUrl: "https://drive.google.com/drive/folders/swapons_world_footage",
    owner: "videographer",
    ownerName: "সিনেমাটোগ্রাফার / শুটার",
    status: "approved",
    uploadedAt: "২১ নভেম্বর, দুপুর ০১:০০",
    notes: "সনি এফএক্সথ্রি দিয়ে শুট করা ৬০টি ক্লিপ গুগল ড্রাইভ স্টুডিওতে ব্যাকআপ সম্পন্ন ও অ্যাপ্রুভড।",
  },
];

export default function CreativeIT({
  deptObj,
  allTasks = [],
  selectedHistoryDate,
  todayStr,
  onInsertTask,
  onToggleStatus,
  onDeleteTask,
  isBoss = false,
}) {
  const [studioRole, setStudioRole] = useState(isBoss ? "all" : "video_editor");
  const [studioTasks, setStudioTasks] = useState(INITIAL_STUDIO_TASKS);
  const [studioFiles, setStudioFiles] = useState(INITIAL_STUDIO_FILES);

  const [taskSectionTab, setTaskSectionTab] = useState("pending");
  const [fileSectionTab, setFileSectionTab] = useState("pending");
  const [statusColorFilter, setStatusColorFilter] = useState("all");
  const [fileSearch, setFileSearch] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");

  const [expandedScripts, setExpandedScripts] = useState({});
  const [copiedTaskId, setCopiedTaskId] = useState(null);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAssignee, setNewAssignee] = useState("video_editor");
  const [newCategory, setNewCategory] = useState("today");
  const [newDepartment, setNewDepartment] = useState("video");
  const [newDueDate, setNewDueDate] = useState("");
  const [newReferenceVideoUrl, setNewReferenceVideoUrl] = useState("");
  const [newScriptText, setNewScriptText] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newGearInfo, setNewGearInfo] = useState("");
  const [newIsUrgent, setNewIsUrgent] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [newFileTitle, setNewFileTitle] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileType, setNewFileType] = useState("video");
  const [newFileFormat, setNewFileFormat] = useState("MP4 (4K 60fps)");
  const [newFileSize, setNewFileSize] = useState("");
  const [newDriveUrl, setNewDriveUrl] = useState("");
  const [newFileNotes, setNewFileNotes] = useState("");

  const [editingFile, setEditingFile] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("swapons_world_studio_tasks");
    if (savedTasks) {
      try {
        setStudioTasks(JSON.parse(savedTasks));
      } catch (e) {}
    }
    const savedFiles = localStorage.getItem("swapons_world_studio_files");
    if (savedFiles) {
      try {
        setStudioFiles(JSON.parse(savedFiles));
      } catch (e) {}
    }
  }, []);

  // Merge external Supabase creative_it tasks into studioTasks without changing DB schema
  const externalCreativeTasks = allTasks
    .filter((t) => t.role === "creative_it" && !t.title.includes("[PLAN:"))
    .map((t) => {
      const cleanTitle = (t.title || "").replace(/^\[\d{4}-\d{2}-\d{2}\]\s*/, "");
      const isDesign = cleanTitle.startsWith("[DESIGN]");
      const isShoot = cleanTitle.startsWith("[VIDEOGRAPHER]");
      const isDone = t.status === "Done" || t.status === "Completed";
      return {
        id: `db-task-${t.id}`,
        dbId: t.id,
        title: cleanTitle.replace(/^\[(VIDEOGRAPHER|VIDEO|DESIGN)\]\s*/, ""),
        assignee: isDesign ? "designer" : isShoot ? "videographer" : "video_editor",
        assigneeName: isDesign ? "গ্রাফিক ডিজাইনার" : isShoot ? "সিনেমাটোগ্রাফার / শুটার" : "ভিডিও এডিটর",
        department: isDesign ? "design" : isShoot ? "shoot" : "video",
        deadlineCategory: "today",
        dueDate: selectedHistoryDate || todayStr || "আজকের ভেতর",
        completed: isDone,
        statusState: isDone ? "completed" : undefined,
        notes: `ERP সময়: ${t.time || ""}`,
        isFromDb: true,
        rawDbTask: t,
      };
    });

  const combinedTasks = [
    ...externalCreativeTasks,
    ...studioTasks.filter((st) => !externalCreativeTasks.some((et) => et.title === st.title)),
  ];

  const persistTasks = (nextList) => {
    setStudioTasks(nextList);
    localStorage.setItem("swapons_world_studio_tasks", JSON.stringify(nextList));
  };

  const persistFiles = (nextList) => {
    setStudioFiles(nextList);
    localStorage.setItem("swapons_world_studio_files", JSON.stringify(nextList));
  };

  const toggleScriptExpand = (taskId) => {
    setExpandedScripts((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const fallbackCopyText = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    } catch (e) {}
  };

  const handleCopyScript = (taskId, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedTaskId(taskId);
          setTimeout(() => setCopiedTaskId(null), 2000);
        })
        .catch(() => {
          fallbackCopyText(text);
          setCopiedTaskId(taskId);
          setTimeout(() => setCopiedTaskId(null), 2000);
        });
    } else {
      fallbackCopyText(text);
      setCopiedTaskId(taskId);
      setTimeout(() => setCopiedTaskId(null), 2000);
    }
  };

  const toggleTask = async (task) => {
    const nextCompleted = !task.completed;
    if (task.isFromDb && task.rawDbTask && onToggleStatus) {
      await onToggleStatus(task.rawDbTask, nextCompleted ? "Done" : "Pending");
      return;
    }
    const updated = studioTasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            completed: nextCompleted,
            statusState: nextCompleted ? "completed" : undefined,
          }
        : t
    );
    persistTasks(updated);
  };

  const revertTaskToPending = async (task) => {
    if (task.isFromDb && task.rawDbTask && onToggleStatus) {
      await onToggleStatus(task.rawDbTask, "Pending");
      return;
    }
    const updated = studioTasks.map((t) =>
      t.id === task.id ? { ...t, completed: false, statusState: "not_done" } : t
    );
    persistTasks(updated);
  };

  const cycleTaskStatus = async (task) => {
    if (task.isFromDb && task.rawDbTask && onToggleStatus) {
      await onToggleStatus(task.rawDbTask, "Done");
      return;
    }
    const updated = studioTasks.map((t) => {
      if (t.id !== task.id) return t;
      if (t.completed) {
        return { ...t, completed: false, statusState: "not_done" };
      } else if (t.statusState === "not_done") {
        return {
          ...t,
          completed: false,
          statusState: undefined,
          isUrgent: true,
          deadlineCategory: "today",
          dueDate: "আজকের ভেতর (Today)",
        };
      } else {
        return { ...t, completed: true, statusState: "completed" };
      }
    });
    persistTasks(updated);
  };

  const handleDeleteTask = async (task) => {
    if (task.isFromDb && task.dbId && onDeleteTask) {
      await onDeleteTask(task.dbId);
      return;
    }
    persistTasks(studioTasks.filter((t) => t.id !== task.id));
  };

  const applyAutomationPreset = (presetType) => {
    switch (presetType) {
      case "reels":
        setNewTitle("নতুন ইনস্টাগ্রাম ও টিকটক রিলস এডিটিং (৯:১৬)");
        setNewAssignee("video_editor");
        setNewDepartment("video");
        setNewCategory("today");
        setNewDueDate("আজকের ভেতর (Today)");
        setNewIsUrgent(true);
        setNewReferenceVideoUrl("https://youtube.com/shorts/sample-reels-reference");
        setNewScriptText(`[হুক (০-৩ সেকেন্ড)]:
"আপনি কি জানেন আপনার বিজনেসের সেলস ৩০% কমে যেতে পারে মাত্র একটি ভুলের কারণে?"

[বডি (৩-২০ সেকেন্ড)]:
"স্বপনস ওয়ার্ল্ড এর প্রিমিয়াম ভিডিও প্রোডাকশন দিয়ে আপনার ব্র‍্যান্ডকে নিয়ে যান অনন্য উচ্চতায়। হাই-কোয়ালিটি সিনেমাটিক ফুটেজ ও ট্রেন্ডিং বিটস।"

[কল টু অ্যাকশন (২০-৩০ সেকেন্ড)]:
"দেরি না করে আজই বায়োতে দেওয়া লিংকে ক্লিক করুন অথবা ইনবক্সে মেসেজ পাঠান!"`);
        setNewNotes("প্রথম ৩ সেকেন্ডের হুক, দ্রুত ট্রানজিশন, কাইনেটিক সাবটাইটেল এবং ট্রেন্ডিং মিউজিক সিঙ্ক।");
        break;
      case "voiceover":
        setNewTitle("ভয়েসওভার ও সাউন্ড সিঙ্ক মাস্টার (Audio & Voiceover)");
        setNewAssignee("video_editor");
        setNewDepartment("video");
        setNewCategory("today");
        setNewDueDate("আজ রাত ৮:০০");
        setNewIsUrgent(true);
        setNewReferenceVideoUrl("https://drive.google.com/file/d/voiceover-audio-reference/view");
        setNewScriptText(`[ভয়েসওভার মাস্টার স্ক্রিপ্ট — স্বপনস ওয়ার্ল্ড ক্রিয়েটিভ স্টুডিও]:
"সঠিক পরিকল্পনাই একটি সফল ব্র্যান্ডের মূল ভিত্তি। প্রতিটি ভিজ্যুয়াল, প্রতিটি কালার টোন আর প্রতিটি কাট—আমরা সাজিয়ে তুলি আপনার স্বপ্নের মতো করে। কারণ আপনার গল্পটি অসাধারণ হতে বাধ্য।"`);
        setNewNotes("ভয়েসওভারের ব্যাকগ্রাউন্ড নয়েজ রিমুভ, অ্যাম্বিয়েন্স লেভেল -14 LUFS নরম্যালাইজ এবং ডায়ালগ সিঙ্ক।");
        break;
      case "youtube":
        setNewTitle("ইউটিউব ফুল ডকুমেন্টারি ভিডিও কাট ও কালার গ্রেড (১৬:৯)");
        setNewAssignee("video_editor");
        setNewDepartment("video");
        setNewCategory("7days");
        setNewDueDate("আগামী ৭ দিনের ভেতর (7 Days)");
        setNewIsUrgent(false);
        setNewReferenceVideoUrl("https://youtube.com/watch?v=sample-documentary-grade");
        setNewScriptText(`[ডকুমেন্টারি ভয়েসওভার পর্ব ০১]:
"ঢাকার বুকে ক্রিয়েটিভ ইন্ডাস্ট্রির নতুন বিপ্লব শুরু হয়েছিল এই স্টুডিও থেকেই। যেখানে আইডিয়া রূপ নেয় সেলুলয়েডের পর্দায়..."`);
        setNewNotes("১৬:৯ ফুল এইচডি/৪কে রেন্ডার, বি-রোল ফুটেজ সিঙ্ক, সাউন্ড ইফেক্টস এবং Rec.709 কালার গ্রেডিং।");
        break;
      case "banner":
        setNewTitle("সোশ্যাল মিডিয়া স্কয়ার পোস্ট ও ব্যানার ডিজাইন সেট");
        setNewAssignee("designer");
        setNewDepartment("design");
        setNewCategory("today");
        setNewDueDate("আজকের ভেতর (Today)");
        setNewIsUrgent(true);
        setNewReferenceVideoUrl("");
        setNewScriptText(`[ব্যানার টাইপোগ্রাফি ও কপি]:
"SUMMER DROP 2026 • FLAT 40% OFF"
সাব-টেক্সট: "Shop Now at Swapon's World"`);
        setNewNotes("১০৮০x১০৮০ স্কয়ার পোস্ট এবং ১০৮০x১৯২০ ইনস্টাগ্রাম স্টোরি সাইজ। লেয়ারসহ পিএসডি ফাইল রেডি করুন।");
        break;
      case "catalog":
        setNewTitle("প্রোডাক্ট লুকবুক ও হাই-এন্ড ফটো রিটাচিং");
        setNewAssignee("designer");
        setNewDepartment("design");
        setNewCategory("7days");
        setNewDueDate("আগামী ৭ দিনের শিডিউল");
        setNewIsUrgent(false);
        setNewReferenceVideoUrl("");
        setNewScriptText(`[লুকবুক কালার থিম]:
"অটাম ওয়ার্ম টোনস, রিচ শ্যাডো, হাইপার-শার্প ফ্যাব্রিক ডিটেইলস।"`);
        setNewNotes("হাই-এন্ড স্কিন রিটাচিং, ব্যাকগ্রাউন্ড ক্লিনআপ এবং কালার ব্যালান্স ক্লায়েন্ট অ্যাপ্রুভালের জন্য।");
        break;
      case "shoot_outdoor":
        setNewTitle("নতুন প্রোডাক্ট ক্যাম্পেইন — আউটডোর শুট");
        setNewAssignee("videographer");
        setNewDepartment("shoot");
        setNewCategory("today");
        setNewDueDate("আজ দুপুর ২:৩০ PM");
        setNewIsUrgent(true);
        setNewLocation("ধানমন্ডি লেক ও আউটডোর স্পট");
        setNewGearInfo("Sony FX3 • 24-70mm • Ronin RS3 Gimbal • 4K 60fps");
        setNewReferenceVideoUrl("https://youtube.com/shorts/cinematic-outdoor-shoot");
        setNewScriptText(`[শুট শট-লিস্ট]:
১. মডেলের এন্ট্রি স্লো মোশন কাট (120fps)
২. প্রোডাক্টের ম্যাক্রো ও টেক্সচার শট (24-70mm f/2.8)
৩. সানসেট সিলুয়েট গোল্ডেন আওয়ার ট্রানজিশন`);
        setNewNotes("ন্যাচারাল গোল্ডেন আওয়ার লাইট, স্লো-মোশন ক্লোজ-আপ শট। ফুটেজ দ্রুত গুগল ড্রাইভ স্টুডিওতে ব্যাকআপ দিন।");
        break;
      default:
        break;
    }
  };

  const applyTimelinePreset = (timeframe) => {
    setNewCategory(timeframe);
    if (timeframe === "today") {
      setNewDueDate("আজকের ভেতর (Today)");
      setNewIsUrgent(true);
    } else if (timeframe === "tomorrow") {
      setNewDueDate("আগামীকাল (Tomorrow)");
      setNewIsUrgent(false);
    } else if (timeframe === "7days") {
      setNewDueDate("আগামী ৭ দিনের ভেতর (7 Days)");
      setNewIsUrgent(false);
    } else {
      setNewDueDate("১৫ দিনের প্রজেক্ট মাইলস্টোন");
      setNewIsUrgent(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assigneeNames = {
      all: "সবাই",
      head: "ক্রিয়েটিভ ডিরেক্টর",
      video_editor: "ভিডিও এডিটর",
      designer: "গ্রাফিক ডিজাইনার",
      videographer: "সিনেমাটোগ্রাফার / শুটার",
    };

    const prefix =
      newAssignee === "designer" ? "[DESIGN]" : newAssignee === "videographer" ? "[VIDEOGRAPHER]" : "[VIDEO]";

    if (onInsertTask) {
      await onInsertTask("creative_it", `${prefix} ${newTitle.trim()}`, "Pending");
    }

    const newTask = {
      id: `studio-task-${Date.now()}`,
      title: newTitle.trim(),
      assignee: newAssignee,
      assigneeName: assigneeNames[newAssignee],
      department: newDepartment,
      deadlineCategory: newCategory,
      dueDate:
        newDueDate ||
        (newCategory === "today"
          ? "আজকের ভেতর (Today)"
          : newCategory === "tomorrow"
          ? "আগামীকাল"
          : newCategory === "7days"
          ? "আগামী ৭ দিনের ভেতর"
          : "১৫ দিনের প্রজেক্ট"),
      completed: false,
      referenceVideoUrl: newReferenceVideoUrl.trim() || undefined,
      scriptText: newScriptText.trim() || undefined,
      notes: newNotes.trim() || undefined,
      location: newLocation.trim() || undefined,
      gearInfo: newGearInfo.trim() || undefined,
      isUrgent: newIsUrgent,
    };

    persistTasks([newTask, ...studioTasks]);

    try {
      await supabase.from("tasks").insert([
        {
          title: `[${selectedHistoryDate || todayStr || "2026-11-24"}] ${prefix} ${newTitle.trim()}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "Pending",
          role: "creative_it",
        },
      ]);
    } catch (err) {}

    setNewTitle("");
    setNewReferenceVideoUrl("");
    setNewScriptText("");
    setNewNotes("");
    setNewLocation("");
    setNewGearInfo("");
    setNewDueDate("");
    setNewIsUrgent(false);
    setShowAddTaskModal(false);
  };

  const handleSaveEditTask = (e) => {
    e.preventDefault();
    if (!editingTask) return;
    persistTasks(studioTasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
  };

  const handleAddFile = (e) => {
    e.preventDefault();
    if (!newFileTitle.trim() || !newFileName.trim()) return;

    const assigneeNames = {
      all: "সবাই",
      head: "ক্রিয়েটিভ ডিরেক্টর",
      video_editor: "ভিডিও এডিটর",
      designer: "গ্রাফিক ডিজাইনার",
      videographer: "সিনেমাটোগ্রাফার / শুটার",
    };

    const targetOwner = studioRole === "all" ? "video_editor" : studioRole;
    const newFileItem = {
      id: `studio-file-${Date.now()}`,
      title: newFileTitle.trim(),
      fileName: newFileName.trim(),
      fileType: newFileType,
      fileFormat: newFileFormat.trim() || "Drive File",
      fileSize: newFileSize.trim() || "Cloud Link",
      driveUrl: newDriveUrl.trim() || "#",
      owner: targetOwner,
      ownerName: assigneeNames[targetOwner] || "ভিডিও এডিটর",
      status: "ready_for_review",
      uploadedAt: "এখনই আপলোডকৃত",
      notes: newFileNotes.trim() || undefined,
    };

    persistFiles([newFileItem, ...studioFiles]);
    setNewFileTitle("");
    setNewFileName("");
    setNewFileSize("");
    setNewDriveUrl("");
    setNewFileNotes("");
    setShowAddFileModal(false);
  };

  const toggleFileStatus = (fileId, targetStatus) => {
    const updated = studioFiles.map((f) => {
      if (f.id !== fileId) return f;
      const nextStatus =
        targetStatus !== undefined
          ? targetStatus
          : f.status === "ready_for_review"
          ? "approved"
          : f.status === "approved"
          ? "needs_revision"
          : "ready_for_review";
      return { ...f, status: nextStatus };
    });
    persistFiles(updated);
  };

  const handleSaveEditFile = (e) => {
    e.preventDefault();
    if (!editingFile) return;
    persistFiles(studioFiles.map((f) => (f.id === editingFile.id ? editingFile : f)));
    setEditingFile(null);
  };

  const deleteFile = (fileId) => {
    persistFiles(studioFiles.filter((f) => f.id !== fileId));
  };

  const roleTasks = combinedTasks.filter((t) => {
    if (studioRole === "all") return true;
    return t.assignee === studioRole;
  });

  const getTaskColorMeta = (task) => {
    if (task.completed) {
      return {
        badgeText: "সম্পন্ন",
        badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        borderAccent: "border-l-[3px] border-l-emerald-500",
        categoryType: "completed",
      };
    }
    if (task.statusState === "not_done") {
      return {
        badgeText: "পেন্ডিং / বাকি",
        badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
        borderAccent: "border-l-[3px] border-l-rose-500",
        categoryType: "not_done",
      };
    }
    if (task.isUrgent || task.deadlineCategory === "today") {
      return {
        badgeText: "আজকের জরুরি",
        badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        borderAccent: "border-l-[3px] border-l-amber-500",
        categoryType: "today",
      };
    }
    return {
      badgeText: "৭ দিনের ভেতর",
      badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      borderAccent: "border-l-[3px] border-l-purple-500",
      categoryType: "week",
    };
  };

  const pendingTasks = roleTasks.filter((t) => !t.completed);
  const approvedTasks = roleTasks.filter((t) => t.completed);

  const filteredTasks =
    taskSectionTab === "approved"
      ? approvedTasks
      : pendingTasks.filter((t) => {
          if (statusColorFilter === "all") return true;
          return getTaskColorMeta(t).categoryType === statusColorFilter;
        });

  const roleFiles = studioFiles.filter((f) => {
    if (studioRole === "all") return true;
    return f.owner === studioRole;
  });

  const displayFiles = roleFiles.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(fileSearch.toLowerCase()) ||
      f.fileName.toLowerCase().includes(fileSearch.toLowerCase()) ||
      (f.notes && f.notes.toLowerCase().includes(fileSearch.toLowerCase()));
    const matchesType = fileTypeFilter === "all" || f.fileType === fileTypeFilter;
    return matchesSearch && matchesType;
  });

  const pendingFiles = displayFiles.filter((f) => f.status !== "approved");
  const approvedFiles = displayFiles.filter((f) => f.status === "approved");

  const totalTasks = roleTasks.length;
  const completedTasks = approvedTasks.length;
  const notDoneTasks = roleTasks.filter((t) => !t.completed && t.statusState === "not_done").length;
  const todayActionTasks = roleTasks.filter((t) => !t.completed && (t.deadlineCategory === "today" || t.isUrgent)).length;
  const weekTasks = roleTasks.filter((t) => !t.completed && (t.deadlineCategory === "7days" || t.deadlineCategory === "3days")).length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="page-header" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="page-icon">{deptObj?.icon && <deptObj.icon size={22} />}</div>
          <div>
            <h2 className="page-title">{deptObj?.name || "Creative IT"}</h2>
            <p className="page-sub">{deptObj?.title || "Video Editor, Graphic Design & Videographer Studio"}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddFileModal(true)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ ফাইল জমা দিন</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddTaskModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>+ নতুন অ্যাসাইনমেন্ট (অটোমেশন)</span>
          </button>
        </div>
      </div>

      {/* Role Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-studio-mono uppercase text-stone-400 mr-1 shrink-0 font-medium">
          স্টুডিও রোল:
        </span>
        {[
          { id: "all", label: "সবার কাজ (All)" },
          { id: "video_editor", label: "🎬 ভিডিও এডিটর টিম" },
          { id: "designer", label: "🎨 গ্রাফিক ডিজাইনার" },
          { id: "videographer", label: "📹 সিনেমাটোগ্রাফার / শুট" },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setStudioRole(m.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              studioRole === m.id
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                : "bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 border border-stone-200/70 dark:border-zinc-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Dashboard Summary & Quick Status Chips */}
      <section className="space-y-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141416] border border-stone-200/70 dark:border-zinc-800/80 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold font-studio-mono text-zinc-950 dark:text-white">
                  {completedTasks < 10 ? "০" + completedTasks : completedTasks}
                </span>
                <span className="text-lg text-stone-400 dark:text-zinc-500 font-light font-studio-mono">
                  /{totalTasks < 10 ? "০" + totalTasks : totalTasks}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white">প্রোডাকশন অগ্রগতি</span>
                  <span className="text-[10px] font-studio-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {taskProgress}% সম্পন্ন
                  </span>
                </div>
                <div className="h-1.5 w-36 sm:w-48 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${taskProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("pending");
                  setStatusColorFilter(statusColorFilter === "today" ? "all" : "today");
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  statusColorFilter === "today" && taskSectionTab === "pending"
                    ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/40"
                    : "border-stone-200/70 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 text-stone-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="font-medium text-[11px]">আজকের কাজ</span>
                </div>
                <span className="font-bold font-studio-mono text-amber-600 dark:text-amber-400">{todayActionTasks}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("pending");
                  setStatusColorFilter(statusColorFilter === "not_done" ? "all" : "not_done");
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  statusColorFilter === "not_done" && taskSectionTab === "pending"
                    ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/40"
                    : "border-stone-200/70 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 text-stone-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="font-medium text-[11px]">কাজ হয় নাই</span>
                </div>
                <span className="font-bold font-studio-mono text-rose-600 dark:text-rose-400">{notDoneTasks}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("pending");
                  setStatusColorFilter(statusColorFilter === "week" ? "all" : "week");
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  statusColorFilter === "week" && taskSectionTab === "pending"
                    ? "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/40"
                    : "border-stone-200/70 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 text-stone-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="font-medium text-[11px]">৭ দিন</span>
                </div>
                <span className="font-bold font-studio-mono text-purple-600 dark:text-purple-400">{weekTasks}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("approved");
                  setStatusColorFilter("all");
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  taskSectionTab === "approved"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/40"
                    : "border-stone-200/70 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 text-stone-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-[11px]">সম্পন্ন</span>
                </div>
                <span className="font-bold font-studio-mono text-emerald-600 dark:text-emerald-400">{completedTasks}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="rounded-2xl bg-white dark:bg-[#141416] border border-stone-200/70 dark:border-zinc-800/80 p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-zinc-800/80">
            <div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <span>{studioRole === "video_editor" ? "ভিডিও এডিটিং কাজের হাব" : "স্টুডিও কাজের হাব"}</span>
                <span className="text-xs font-normal text-stone-400">({roleTasks.length} টি অ্যাসাইনমেন্ট)</span>
              </h3>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-zinc-900 text-xs font-semibold shrink-0">
              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("pending");
                  setStatusColorFilter("all");
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  taskSectionTab === "pending"
                    ? "bg-white dark:bg-[#18181b] text-zinc-950 dark:text-white shadow-2xs"
                    : "text-stone-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Hourglass className="h-3.5 w-3.5 text-amber-500" />
                <span>চলমান ও পেন্ডিং ({pendingTasks.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTaskSectionTab("approved");
                  setStatusColorFilter("all");
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  taskSectionTab === "approved"
                    ? "bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 shadow-2xs"
                    : "text-stone-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <FileCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>অ্যাপ্রুভড ও সম্পন্ন ({approvedTasks.length})</span>
              </button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-stone-50/50 dark:bg-zinc-900/40 border border-stone-200/40 dark:border-zinc-800/60">
              <p className="text-xs text-stone-400 font-medium">
                {taskSectionTab === "approved"
                  ? "কোনো কাজ এখনো অ্যাপ্রুভড আর্কাইভে জমা হয়নি।"
                  : "এই ফিল্টারে কোনো পেন্ডিং কাজ পাওয়া যায়নি।"}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredTasks.map((task) => {
                const meta = getTaskColorMeta(task);
                const isScriptOpen = !!expandedScripts[task.id];

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${meta.borderAccent} bg-white dark:bg-[#18181b]/80 border-stone-200/60 dark:border-zinc-800/80 flex flex-col justify-between gap-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => toggleTask(task)}
                          className={`mt-0.5 h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            task.completed
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-stone-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
                          }`}
                        >
                          {task.completed && <Check className="h-3 w-3 stroke-[3]" />}
                        </button>

                        <div className="min-w-0 space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              onClick={() => toggleTask(task)}
                              className={`text-sm font-semibold cursor-pointer ${
                                task.completed ? "line-through text-stone-400 font-normal" : "text-zinc-950 dark:text-white"
                              }`}
                            >
                              {task.title}
                            </span>

                            <span className={`text-[10px] font-studio-mono px-2 py-0.5 rounded-full border font-semibold ${meta.badgeClass}`}>
                              {meta.badgeText}
                            </span>

                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 font-medium">
                              {task.assigneeName}
                            </span>

                            {task.referenceVideoUrl && (
                              <a
                                href={task.referenceVideoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-medium"
                              >
                                <Film className="h-2.5 w-2.5" />
                                <span>রেফারেন্স ↗</span>
                              </a>
                            )}

                            {task.scriptText && (
                              <button
                                type="button"
                                onClick={() => toggleScriptExpand(task.id)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-medium cursor-pointer"
                              >
                                <FileText className="h-2.5 w-2.5 text-amber-500" />
                                <span>{isScriptOpen ? "স্ক্রিপ্ট লুকান ▲" : "স্ক্রিপ্ট পড়ুন ও কপি করুন ▼"}</span>
                              </button>
                            )}
                          </div>

                          {task.notes && (
                            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
                              <strong className="text-zinc-800 dark:text-zinc-300 font-medium">নির্দেশনা:</strong> {task.notes}
                            </p>
                          )}

                          {task.location && (
                            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                              <span className="flex items-center gap-1 text-stone-600 dark:text-zinc-300 font-medium">
                                <MapPin className="h-3 w-3 text-stone-400" />
                                {task.location}
                              </span>
                              {task.shootTime && <span>• {task.shootTime}</span>}
                            </div>
                          )}

                          {task.scriptText && isScriptOpen && (
                            <div className="mt-2 p-3 rounded-xl bg-stone-50/80 dark:bg-zinc-900/80 border border-stone-200/80 dark:border-zinc-800 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700 dark:text-zinc-300 pb-1.5 border-b border-stone-200/60 dark:border-zinc-800">
                                <span>সম্পূর্ণ স্ক্রিপ্ট / ভয়েসওভার:</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyScript(task.id, task.scriptText || "")}
                                  className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedTaskId === task.id ? (
                                    <>
                                      <CheckCheck className="h-3 w-3 text-emerald-600" />
                                      <span className="text-emerald-600 font-semibold">কপি হয়েছে!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" />
                                      <span>কপি করুন</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="text-xs font-sans text-stone-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                {task.scriptText}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <span className="font-studio-mono text-[11px] text-stone-400 font-medium">{task.dueDate}</span>
                        <div className="flex items-center gap-1">
                          {task.completed ? (
                            <button
                              type="button"
                              onClick={() => revertTaskToPending(task)}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 cursor-pointer flex items-center gap-1"
                            >
                              <RotateCcw className="h-2.5 w-2.5" />
                              <span>রিভার্ট</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => cycleTaskStatus(task)}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                            >
                              স্ট্যাটাস ↺
                            </button>
                          )}

                          {!task.isFromDb && (
                            <button
                              type="button"
                              onClick={() => setEditingTask(task)}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-stone-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer flex items-center gap-1"
                            >
                              <Pencil className="h-2.5 w-2.5" />
                              <span>এডিট</span>
                            </button>
                          )}

                          {isBoss && (
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task)}
                              className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                              title="কাজ ডিলিট করুন"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Deliverables & Files Section */}
      <section className="space-y-4">
        <div className="rounded-2xl bg-white dark:bg-[#141416] border border-stone-200/70 dark:border-zinc-800/80 p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-zinc-800/80">
            <div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <span>প্রোডাকশন ফাইলস ও ডেলিভারেবলস</span>
                <span className="text-xs font-normal text-stone-400">({displayFiles.length} টি ফাইল)</span>
              </h3>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-zinc-900 text-xs font-semibold shrink-0">
              <button
                type="button"
                onClick={() => setFileSectionTab("pending")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  fileSectionTab === "pending"
                    ? "bg-white dark:bg-[#18181b] text-zinc-950 dark:text-white shadow-2xs"
                    : "text-stone-500"
                }`}
              >
                <Hourglass className="h-3.5 w-3.5 text-amber-500" />
                <span>পেন্ডিং ও চলমান ফাইল ({pendingFiles.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFileSectionTab("approved")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  fileSectionTab === "approved"
                    ? "bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 shadow-2xs"
                    : "text-stone-500"
                }`}
              >
                <FileCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>অ্যাপ্রুভড ও কমপ্লিট ফাইলস ({approvedFiles.length})</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-400 text-[11px]">
              {fileSectionTab === "pending"
                ? "⏳ এই সেকশনের ফাইলগুলো রিভিউ বা সংশোধনে আছে।"
                : "🏆 এই সেকশনের ফাইলগুলো হেড দ্বারা অ্যাপ্রুভড ও ফাইনাল।"}
            </span>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                  placeholder="ফাইল খুঁজুন..."
                  className="pl-8 pr-3 py-1 rounded-lg border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white w-36 sm:w-44"
                />
              </div>

              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white"
              >
                <option value="all">সব টাইপ</option>
                <option value="video">ভিডিও (.mp4)</option>
                <option value="project">প্রজেক্ট (.prproj/.ai)</option>
                <option value="image">ইমেজ (.psd)</option>
                <option value="folder">ড্রাইভ ফোল্ডার</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(fileSectionTab === "pending" ? pendingFiles : approvedFiles).map((file) => {
              const isVideo = file.fileType === "video";
              const isProject = file.fileType === "project";
              const isFolder = file.fileType === "folder";

              return (
                <div
                  key={file.id}
                  className="p-4 rounded-xl bg-stone-50/50 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/80 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-stone-200/60 dark:border-zinc-700/60">
                          {isVideo ? (
                            <Film className="h-3.5 w-3.5 text-blue-500" />
                          ) : isProject ? (
                            <FileCode className="h-3.5 w-3.5 text-purple-500" />
                          ) : isFolder ? (
                            <HardDrive className="h-3.5 w-3.5 text-amber-500" />
                          ) : (
                            <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
                          )}
                        </div>
                        <div>
                          <span className="font-studio-mono text-[10px] uppercase text-stone-400 block leading-tight">
                            {file.fileFormat} • {file.fileSize}
                          </span>
                          <span className="font-studio-mono text-[11px] font-semibold text-zinc-900 dark:text-white">
                            {file.fileName}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-studio-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
                          file.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : file.status === "needs_revision"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {file.status === "approved"
                          ? "অ্যাপ্রুভড"
                          : file.status === "needs_revision"
                          ? "সংশোধন"
                          : "রিভিউ"}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-zinc-950 dark:text-white mt-2">{file.title}</h4>
                    {file.notes && (
                      <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 leading-relaxed">{file.notes}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-200/50 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                      <span>{file.ownerName}</span>
                      <span>•</span>
                      <span>{file.uploadedAt}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isBoss && file.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => toggleFileStatus(file.id, "approved")}
                          className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                          <span>অ্যাপ্রুভ</span>
                        </button>
                      )}

                      {isBoss && file.status === "approved" && (
                        <button
                          type="button"
                          onClick={() => toggleFileStatus(file.id, "ready_for_review")}
                          className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="h-2.5 w-2.5" />
                          <span>রিভার্ট</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setEditingFile(file)}
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Pencil className="h-2.5 w-2.5" />
                        <span>এডিট</span>
                      </button>

                      <a
                        href={file.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-[10px] font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="h-2.5 w-2.5" />
                        <span>ড্রাইভ</span>
                      </a>

                      {isBoss && (
                        <button
                          type="button"
                          onClick={() => deleteFile(file.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-[#141416] rounded-2xl shadow-xl border border-stone-200/80 dark:border-zinc-800/80 p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>স্মার্ট অটোমেশন — নতুন কাজ বুঝিয়ে দিন</span>
                </h3>
                <p className="text-xs text-stone-400">
                  অটোমেশন প্রিসেটে ক্লিক করলে রেফারেন্স ভিডিও, স্ক্রিপ্ট ও সময় অটোমেটিক পূরণ হয়ে যাবে।
                </p>
              </div>
              <button type="button" onClick={() => setShowAddTaskModal(false)} className="text-stone-400 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 space-y-4 flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button type="button" onClick={() => applyAutomationPreset("reels")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 text-left cursor-pointer">
                  <span className="text-xs font-bold block">📱 রিলস ও শর্টস (৯:১৬)</span>
                  <span className="text-[10px] text-stone-400 block">ভিডিও + স্ক্রিপ্ট অটো</span>
                </button>
                <button type="button" onClick={() => applyAutomationPreset("voiceover")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/40 text-left cursor-pointer">
                  <span className="text-xs font-bold block">🎙️ ভয়েসওভার ও সাউন্ড</span>
                  <span className="text-[10px] text-stone-400 block">পূর্ণ স্ক্রিপ্ট সহ</span>
                </button>
                <button type="button" onClick={() => applyAutomationPreset("youtube")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-purple-200 dark:border-purple-900/40 text-left cursor-pointer">
                  <span className="text-xs font-bold block">📺 ইউটিউব ফুল ভিডিও</span>
                  <span className="text-[10px] text-stone-400 block">আগামী ৭ দিনের ভেতর</span>
                </button>
                <button type="button" onClick={() => applyAutomationPreset("banner")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/40 text-left cursor-pointer">
                  <span className="text-xs font-bold block">🎨 সোশ্যাল ব্যানার সেট</span>
                  <span className="text-[10px] text-stone-400 block">আজকের কাজ</span>
                </button>
                <button type="button" onClick={() => applyAutomationPreset("catalog")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-left cursor-pointer">
                  <span className="text-xs font-bold block">📖 ক্যাটালগ ও ফটো</span>
                  <span className="text-[10px] text-stone-400 block">৭ দিনের শিডিউল</span>
                </button>
                <button type="button" onClick={() => applyAutomationPreset("shoot_outdoor")} className="p-2 rounded-lg bg-stone-50 dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 text-left cursor-pointer">
                  <span className="text-xs font-bold block">📹 আউটডোর শুট</span>
                  <span className="text-[10px] text-stone-400 block">আজ দুপুর ২:৩০ PM</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: "today", label: "⚡ আজকের কাজ" },
                  { id: "tomorrow", label: "📅 কালকের কাজ" },
                  { id: "7days", label: "🟣 আগামী ৭ দিন" },
                  { id: "15days", label: "🏆 ১৫ দিনের প্রজেক্ট" },
                ].map((tf) => (
                  <button
                    key={tf.id}
                    type="button"
                    onClick={() => applyTimelinePreset(tf.id)}
                    className={`py-2 px-2 rounded-xl border font-semibold cursor-pointer ${
                      newCategory === tf.id
                        ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        : "border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 text-stone-700 dark:text-zinc-300"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              <form id="studio-add-task-form" onSubmit={handleAddTask} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium mb-1">কাজের শিরোনাম / নাম *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="যেমন: নতুন ঈদ ক্যাম্পেইনের রিলস এডিটিং"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">কাকে দায়িত্ব দিচ্ছেন *</label>
                    <select
                      value={newAssignee}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewAssignee(val);
                        setNewDepartment(val === "designer" ? "design" : val === "videographer" ? "shoot" : "video");
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                    >
                      <option value="video_editor">🎬 ভিডিও এডিটর</option>
                      <option value="designer">🎨 গ্রাফিক ডিজাইনার</option>
                      <option value="videographer">📹 সিনেমাটোগ্রাফার / শুটার</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">সময়সীমা টেক্সট</label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="যেমন: আজকের ভেতর (Today)"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">🎥 রেফারেন্স ভিডিও লিংক</label>
                  <input
                    type="url"
                    value={newReferenceVideoUrl}
                    onChange={(e) => setNewReferenceVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/shorts/..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">📝 স্ক্রিপ্ট বা ভয়েসওভার টেক্সট</label>
                  <textarea
                    rows={4}
                    value={newScriptText}
                    onChange={(e) => setNewScriptText(e.target.value)}
                    placeholder="ভয়েসওভারের পুরো ডায়ালগ বা স্ক্রিপ্ট লিখুন..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                  />
                </div>

                {newDepartment === "shoot" && (
                  <div>
                    <label className="block font-medium mb-1">শুটিং লোকেশন ও কল টাইম</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="যেমন: ধানমন্ডি লেক, দুপুর ২:৩০ PM"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-medium mb-1">কাজের ব্রিফ ও নোটস</label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={newIsUrgent} onChange={(e) => setNewIsUrgent(e.target.checked)} />
                  <span>জরুরি কাজ (Urgent Priority)</span>
                </label>
              </form>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setShowAddTaskModal(false)} className="px-3.5 py-1.5 rounded-lg text-stone-600 cursor-pointer">
                বাতিল
              </button>
              <button type="submit" form="studio-add-task-form" className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold cursor-pointer">
                কাজ অ্যাসাইন করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-[#141416] rounded-2xl shadow-xl border border-stone-200/80 dark:border-zinc-800/80 p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">কাজের বিবরণ বা স্ট্যাটাস এডিট করুন</h3>
              <button type="button" onClick={() => setEditingTask(null)} className="text-stone-400 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditTask} className="space-y-3 text-xs overflow-y-auto pr-1">
              <div>
                <label className="block font-medium mb-1">কাজের শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTask({ ...editingTask, completed: false, statusState: "not_done" })}
                  className="p-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold cursor-pointer"
                >
                  🔴 কাজ হয় নাই
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTask({ ...editingTask, completed: false, statusState: undefined, isUrgent: true })}
                  className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold cursor-pointer"
                >
                  🟡 আজকের কাজ
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTask({ ...editingTask, completed: true, statusState: "completed" })}
                  className="p-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold cursor-pointer"
                >
                  🟢 সম্পন্ন
                </button>
              </div>

              <div>
                <label className="block font-medium mb-1">🎥 রেফারেন্স ভিডিও লিংক</label>
                <input
                  type="url"
                  value={editingTask.referenceVideoUrl || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, referenceVideoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">📝 স্ক্রিপ্ট বা ভয়েসওভার টেক্সট</label>
                <textarea
                  rows={4}
                  value={editingTask.scriptText || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, scriptText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">সাধারণ নোটস</label>
                <textarea
                  rows={2}
                  value={editingTask.notes || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setEditingTask(null)} className="px-3.5 py-1.5 rounded-lg text-stone-600 cursor-pointer">
                  বাতিল
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold cursor-pointer">
                  পরিবর্তন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add File Modal */}
      {showAddFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#141416] rounded-2xl shadow-xl border border-stone-200/80 dark:border-zinc-800/80 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">নতুন ডেলিভারেবল বা ড্রাইভ লিংক জমা দিন</h3>
              <button type="button" onClick={() => setShowAddFileModal(false)} className="text-stone-400 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddFile} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">কাজের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newFileTitle}
                  onChange={(e) => setNewFileTitle(e.target.value)}
                  placeholder="যেমন: সামার রিলস ফাইনাল রেন্ডার ড্রাফট ৩"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">ফাইলের নাম *</label>
                  <input
                    type="text"
                    required
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="যেমন: Summer_Reels_V3_4K.mp4"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">ফাইলের ধরন</label>
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                  >
                    <option value="video">ভিডিও (.mp4)</option>
                    <option value="project">প্রজেক্ট (.prproj / .aep)</option>
                    <option value="image">ইমেজ (.psd / .jpg)</option>
                    <option value="folder">ড্রাইভ ফোল্ডার</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">গুগল ড্রাইভ লিংক *</label>
                <input
                  type="url"
                  required
                  value={newDriveUrl}
                  onChange={(e) => setNewDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">নোট বা কমেন্ট</label>
                <textarea
                  rows={2}
                  value={newFileNotes}
                  onChange={(e) => setNewFileNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddFileModal(false)} className="px-3.5 py-1.5 rounded-lg text-stone-600 cursor-pointer">
                  বাতিল
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold cursor-pointer">
                  ফাইল জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit File Modal */}
      {editingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#141416] rounded-2xl shadow-xl border border-stone-200/80 dark:border-zinc-800/80 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">ফাইল এডিট ও স্ট্যাটাস পরিবর্তন</h3>
              <button type="button" onClick={() => setEditingFile(null)} className="text-stone-400 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditFile} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">ফাইলের শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={editingFile.title}
                  onChange={(e) => setEditingFile({ ...editingFile, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFile({ ...editingFile, status: "ready_for_review" })}
                  className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold cursor-pointer"
                >
                  ⏳ রিভিউ পেন্ডিং
                </button>
                <button
                  type="button"
                  onClick={() => setEditingFile({ ...editingFile, status: "needs_revision" })}
                  className="p-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold cursor-pointer"
                >
                  ⚠️ সংশোধন
                </button>
                <button
                  type="button"
                  onClick={() => setEditingFile({ ...editingFile, status: "approved" })}
                  className="p-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold cursor-pointer"
                >
                  🏆 অ্যাপ্রুভড
                </button>
              </div>

              <div>
                <label className="block font-medium mb-1">ড্রাইভ লিংক</label>
                <input
                  type="url"
                  required
                  value={editingFile.driveUrl}
                  onChange={(e) => setEditingFile({ ...editingFile, driveUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">রিভিউ নোটস</label>
                <textarea
                  rows={2}
                  value={editingFile.notes || ""}
                  onChange={(e) => setEditingFile({ ...editingFile, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setEditingFile(null)} className="px-3.5 py-1.5 rounded-lg text-stone-600 cursor-pointer">
                  বাতিল
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold cursor-pointer">
                  পরিবর্তন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}