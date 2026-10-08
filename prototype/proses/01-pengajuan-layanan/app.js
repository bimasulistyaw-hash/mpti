/**
 * LOGIKA INTERAKTIF FASE 1: FORMULIR PENGAJUAN (F.A01)
 * MPSI SPBE Kota Yogyakarta - Apple HIG Standard
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const totalSteps = 5;
  const currentRegNumber = window.MockDB ? MockDB.generateRegNumber() : "REG-20261008-0042";

  // Elements
  const displayRegNumber = document.getElementById("displayRegNumber");
  const previewSheetReg = document.getElementById("previewSheetReg");
  const modalRegNum = document.getElementById("modalRegNum");

  if (displayRegNumber) displayRegNumber.textContent = currentRegNumber;
  if (previewSheetReg) previewSheetReg.textContent = currentRegNumber;
  if (modalRegNum) modalRegNum.textContent = currentRegNumber;

  // Step Elements
  const stepNodes = document.querySelectorAll(".step-node");
  const stepSections = document.querySelectorAll(".form-step-section");
  const btnPrev = document.getElementById("btnPrevStep");
  const btnNext = document.getElementById("btnNextStep");
  const btnFinalSubmit = document.getElementById("btnFinalSubmit");
  const successModal = document.getElementById("successModal");
  const btnResetData = document.getElementById("btnResetData");

  // Step 4 eOffice Elements
  const btnCheckEOffice = document.getElementById("btnCheckEOffice");
  const eOfficeResultBox = document.getElementById("eOfficeResultBox");

  // Format today date for preview
  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  const pvTodayDate = document.getElementById("pvTodayDate");
  if (pvTodayDate) pvTodayDate.textContent = dateStr;

  // Reset Demo Event
  if (btnResetData) {
    btnResetData.addEventListener("click", () => {
      if (confirm("Reset seluruh data simulasi ke data awal Pemkot Yogyakarta?")) {
        MockDB.reset();
      }
    });
  }

  // Stepper Node Click
  stepNodes.forEach(node => {
    node.addEventListener("click", () => {
      const targetStep = parseInt(node.getAttribute("data-step"));
      if (targetStep < currentStep || validateStep(currentStep)) {
        goToStep(targetStep);
      }
    });
  });

  // Next / Prev Button Handlers
  btnNext.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      goToStep(currentStep + 1);
    }
  });

  btnPrev.addEventListener("click", () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    currentStep = step;

    // Update Stepper Nodes
    stepNodes.forEach(node => {
      const s = parseInt(node.getAttribute("data-step"));
      node.classList.remove("active", "completed");
      if (s === currentStep) {
        node.classList.add("active");
      } else if (s < currentStep) {
        node.classList.add("completed");
      }
    });

    // Update Sections
    stepSections.forEach((sec, idx) => {
      if (idx + 1 === currentStep) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    // Button states
    btnPrev.style.visibility = currentStep === 1 ? "hidden" : "visible";

    if (currentStep === totalSteps) {
      btnNext.style.display = "none";
      btnFinalSubmit.style.display = "inline-flex";
      syncPreviewSheet();
    } else {
      btnNext.style.display = "inline-flex";
      btnFinalSubmit.style.display = "none";
      btnNext.innerHTML = `Lanjut ke Langkah ${currentStep + 1} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }

    // Smooth scroll to top of form
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  function validateStep(step) {
    if (step === 1) {
      const picName = document.getElementById("picName").value.trim();
      const picNip = document.getElementById("picNip").value.trim();
      const picPhone = document.getElementById("picPhone").value.trim();
      if (!picName || !picNip || !picPhone) {
        alert("Mohon lengkapi seluruh field identitas PIC pemohon.");
        return false;
      }
    } else if (step === 2) {
      const appName = document.getElementById("appName").value.trim();
      const appShortName = document.getElementById("appShortName").value.trim();
      const targetUsers = document.getElementById("targetUsers").value.trim();
      if (!appName || !appShortName || !targetUsers) {
        alert("Mohon lengkapi nama aplikasi, nama singkat, dan sasaran pengguna.");
        return false;
      }
    } else if (step === 4) {
      const eOfficeNumber = document.getElementById("eOfficeNumber").value.trim();
      if (!eOfficeNumber) {
        alert("Mohon masukkan Nomor Surat Dinas resmi eOffice.");
        return false;
      }
    }
    return true;
  }

  // Live Sync Preview Sheet
  function syncPreviewSheet() {
    // PIC
    const picName = document.getElementById("picName").value || "-";
    const picNip = document.getElementById("picNip").value || "-";
    const picOpd = document.getElementById("picOpd").value || "-";
    const picPhone = document.getElementById("picPhone").value || "-";
    const picEmail = document.getElementById("picEmail").value || "-";

    document.getElementById("pvPicName").textContent = picName;
    document.getElementById("pvPicNip").textContent = picNip;
    document.getElementById("pvPicOpd").textContent = picOpd + " Kota Yogyakarta";
    document.getElementById("pvPicContact").textContent = `${picPhone} / ${picEmail}`;
    document.getElementById("pvSignPic").textContent = picName;
    document.getElementById("pvSignNip").textContent = picNip;

    // App Info
    const appName = document.getElementById("appName").value || "-";
    const appShort = document.getElementById("appShortName").value || "-";
    const appCat = document.getElementById("appCategory").value || "-";
    const appUrg = document.getElementById("urgencyLevel").value || "-";
    const targetUsers = document.getElementById("targetUsers").value || "-";
    const appDesc = document.getElementById("appDescription").value || "-";
    const appImpact = document.getElementById("impactIfRejected").value || "-";

    document.getElementById("pvAppName").textContent = appName;
    document.getElementById("pvAppShort").textContent = appShort;
    document.getElementById("pvCategory").textContent = appCat;
    document.getElementById("pvUrgency").textContent = appUrg;
    document.getElementById("pvTargetUsers").textContent = targetUsers;
    document.getElementById("pvDescription").textContent = appDesc;
    document.getElementById("pvImpact").textContent = appImpact;

    // eOffice
    const eOfficeNum = document.getElementById("eOfficeNumber").value || "-";
    const eOfficeDate = document.getElementById("eOfficeDate").value || "-";
    document.getElementById("pvEOffice").textContent = `${eOfficeNum} • Tgl: ${eOfficeDate} (Terverifikasi Sah)`;
  }

  // Upload Dropzones Handler
  [1, 2, 3, 4].forEach(i => {
    const dropzone = document.getElementById(`dropzone${i}`);
    const fileInput = document.getElementById(`fileInput${i}`);
    const chip = document.getElementById(`chipFile${i}`);

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const sizeKb = Math.round(file.size / 1024);
          const sizeStr = sizeKb > 1024 ? `${(sizeKb/1024).toFixed(1)} MB` : `${sizeKb} KB`;
          chip.textContent = `✓ ${file.name} (${sizeStr})`;
          dropzone.classList.add("has-file");
        }
      });

      // Drag and drop events
      ["dragenter", "dragover"].forEach(evtName => {
        dropzone.addEventListener(evtName, (e) => {
          e.preventDefault();
          dropzone.classList.add("dragover");
        });
      });

      ["dragleave", "drop"].forEach(evtName => {
        dropzone.addEventListener(evtName, (e) => {
          e.preventDefault();
          dropzone.classList.remove("dragover");
        });
      });

      dropzone.addEventListener("drop", (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          const sizeKb = Math.round(file.size / 1024);
          const sizeStr = sizeKb > 1024 ? `${(sizeKb/1024).toFixed(1)} MB` : `${sizeKb} KB`;
          chip.textContent = `✓ ${file.name} (${sizeStr})`;
          dropzone.classList.add("has-file");
        }
      });
    }
  });

  // eOffice Verification Simulation
  if (btnCheckEOffice) {
    btnCheckEOffice.addEventListener("click", () => {
      const num = document.getElementById("eOfficeNumber").value.trim();
      if (!num) {
        alert("Ketikkan nomor surat dinas eOffice terlebih dahulu.");
        return;
      }
      btnCheckEOffice.textContent = "Memverifikasi...";
      btnCheckEOffice.disabled = true;

      setTimeout(() => {
        btnCheckEOffice.textContent = "Terverifikasi ✓";
        btnCheckEOffice.classList.remove("btn-apple-secondary");
        btnCheckEOffice.classList.add("btn-apple-success");
        eOfficeResultBox.style.display = "flex";
      }, 600);
    });
  }

  // Save Draft
  const btnSaveDraft = document.getElementById("btnSaveDraft");
  if (btnSaveDraft) {
    btnSaveDraft.addEventListener("click", () => {
      alert("Draf formulir F.A01 berhasil disimpan secara lokal pada browser!");
    });
  }

  // Form Submit Handler
  const form = document.getElementById("formFA01");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const applicationData = {
      regNumber: currentRegNumber,
      name: document.getElementById("appName").value.trim(),
      shortName: document.getElementById("appShortName").value.trim(),
      opd: document.getElementById("picOpd").value,
      picName: document.getElementById("picName").value.trim(),
      picNip: document.getElementById("picNip").value.trim(),
      picPhone: document.getElementById("picPhone").value.trim(),
      eOfficeNumber: document.getElementById("eOfficeNumber").value.trim(),
      eOfficeDate: document.getElementById("eOfficeDate").value,
      urgency: document.getElementById("urgencyLevel").value,
      targetUsers: document.getElementById("targetUsers").value.trim(),
      description: document.getElementById("appDescription").value.trim(),
      legalBasis: "Peraturan Walikota SOTK & Dokumen Lampiran",
      currentPhase: 2,
      phaseName: "Fase 2: Asesmen Kelayakan & Klarifikasi Teknis",
      status: "MENUNGGU_JOINT_CLEARANCE",
      statusLabel: "Menunggu Joint Clearance 3 Pilar (F.A02)",
      statusBadge: "amber",
      pilarReviews: {
        organisasi: { status: "PENDING", notes: "Menunggu telaah Tupoksi dan SOP Layanan" },
        bappeda: { status: "PENDING", notes: "Menunggu verifikasi keselarasan RPJMD dan SIPD" },
        diskominfo: { status: "PENDING", score: 0, notes: "Menunggu pemindaian redundansi katalog" }
      },
      attachments: [
        { name: "Dokumen_Dasar_Hukum.pdf", size: "2.4 MB", type: "Dasar Hukum", uploadedAt: new Date().toISOString().split("T")[0] },
        { name: "SOP_Pelayanan_Layanan.pdf", size: "1.1 MB", type: "SOP Layanan", uploadedAt: new Date().toISOString().split("T")[0] },
        { name: "Format_Laporan_Manual.pdf", size: "850 KB", type: "Contoh Laporan", uploadedAt: new Date().toISOString().split("T")[0] }
      ]
    };

    if (window.MockDB) {
      MockDB.saveApplication(applicationData);
    }

    // Open Success Modal
    successModal.classList.add("open");
  });
});
