/**
 * MPSI SPBE Kota Yogyakarta - Prototype Fase Hulu (Form F.A01)
 * Logic & Interactivity Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Management
  const state = {
    currentStep: 1,
    maxStep: 5,
    regNumber: 'REG-20261006-' + String(Math.floor(1000 + Math.random() * 9000)),
    formData: {
      picName: 'Budi Santoso, S.Kom',
      picNip: '19870512 201101 1 003',
      picJabatan: 'Pranata Komputer Ahli Muda',
      picOpd: 'Dinas Kesehatan Kota Yogyakarta',
      picPhone: '081227182930',
      picEmail: 'budi.santoso@jogjakota.go.id',
      appName: 'Sistem Informasi Pelayanan Rujukan Kesehatan Terpadu',
      appAcronym: 'SIP-RUJUK',
      appScope: 'BARU',
      appDomain: 'LAYANAN_PUBLIK',
      appBackground: 'Koordinasi rujukan faskes Puskesmas & RSUD masih manual.',
      appObjective: 'Mempercepat konfirmasi rujukan faskes menjadi ≤ 10 menit.',
      targetAudience: 'Campuran ASN Nakes & Warga JSS',
      userEstimate: 'Sedang (1.000 - 10.000 transaksi/bln)',
      platformType: 'Web & JSS Mobile Integration',
      eofficeLetterNumber: '000.8.3/1420/DINKES/2026',
      eofficeLetterDate: '2026-10-06',
      isEOfficeValidated: true,
      files: {
        fileSop: { name: 'SOP_Layanan_Rujukan_2026.pdf', size: '1.4 MB' },
        fileLegal: { name: 'Perwal_SOTK_Dinkes_Pasal14.pdf', size: '890 KB' },
        fileFlowchart: { name: 'Peta_Probis_Alur_Rujukan_Faskes.pdf', size: '2.1 MB' },
        fileData: { name: 'Draf_Variabel_Data_Rujukan.pdf', size: '650 KB' }
      }
    }
  };

  // DOM Elements
  const previewRegNumber = document.getElementById('previewRegNumber');
  const sumRegId = document.getElementById('sumRegId');
  const finalRegNumber = document.getElementById('finalRegNumber');
  const docRegNum = document.getElementById('docRegNum');
  
  if (previewRegNumber) previewRegNumber.textContent = state.regNumber;
  if (sumRegId) sumRegId.textContent = state.regNumber;
  if (finalRegNumber) finalRegNumber.textContent = state.regNumber;
  if (docRegNum) docRegNum.textContent = state.regNumber;

  // Stepper Elements
  const stepItems = document.querySelectorAll('.step-item');
  const stepPanels = document.querySelectorAll('.step-content');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const form = document.getElementById('formFA01');

  // Navigation Logic
  function goToStep(step) {
    if (step < 1 || step > state.maxStep) return;

    state.currentStep = step;

    // Update Stepper Headers
    stepItems.forEach(item => {
      const itemStep = parseInt(item.getAttribute('data-step'), 10);
      item.classList.remove('active', 'completed');
      if (itemStep === step) {
        item.classList.add('active');
      } else if (itemStep < step) {
        item.classList.add('completed');
      }
    });

    // Update Panels
    stepPanels.forEach((panel, idx) => {
      if (idx + 1 === step) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Sync Form Summaries
    syncFormData();

    // Scroll smoothly to top of card
    const container = document.getElementById('mainContainer');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Next & Prev Click Handlers
  nextButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nextStep = parseInt(btn.getAttribute('data-next'), 10);
      goToStep(nextStep);
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prevStep = parseInt(btn.getAttribute('data-prev'), 10);
      goToStep(prevStep);
    });
  });

  stepItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetStep = parseInt(item.getAttribute('data-step'), 10);
      // Allow jumping backward or up to current step
      if (targetStep <= state.currentStep || state.currentStep === 5) {
        goToStep(targetStep);
      }
    });
  });

  // Sync Form Data to Document Preview & Summary Cards
  function syncFormData() {
    const appNameInput = document.getElementById('appName');
    const appAcronymInput = document.getElementById('appAcronym');
    const picOpdSelect = document.getElementById('picOpd');
    const eofficeNumInput = document.getElementById('eofficeLetterNumber');
    const eofficeDateInput = document.getElementById('eofficeLetterDate');

    if (appNameInput) state.formData.appName = appNameInput.value;
    if (appAcronymInput) state.formData.appAcronym = appAcronymInput.value;
    if (picOpdSelect) state.formData.picOpd = picOpdSelect.value;
    if (eofficeNumInput) state.formData.eofficeLetterNumber = eofficeNumInput.value;
    if (eofficeDateInput) state.formData.eofficeLetterDate = eofficeDateInput.value;

    // Summary Box
    const sumAppName = document.getElementById('sumAppName');
    const sumOpd = document.getElementById('sumOpd');
    if (sumAppName) sumAppName.textContent = `${state.formData.appAcronym} • ${state.formData.appName}`;
    if (sumOpd) sumOpd.textContent = state.formData.picOpd;

    // Official Document Preview Modal
    const docLetterNum = document.getElementById('docLetterNum');
    const docLetterDate = document.getElementById('docLetterDate');
    const docOpd = document.getElementById('docOpd');
    const docAppName = document.getElementById('docAppName');
    const docAppBg = document.getElementById('docAppBg');
    const docAppObj = document.getElementById('docAppObj');

    if (docLetterNum) docLetterNum.textContent = state.formData.eofficeLetterNumber;
    if (docLetterDate) docLetterDate.textContent = formatDateID(state.formData.eofficeLetterDate);
    if (docOpd) docOpd.textContent = state.formData.picOpd;
    if (docAppName) docAppName.textContent = `${state.formData.appName} (${state.formData.appAcronym})`;

    const appBgInput = document.getElementById('appBackground');
    const appObjInput = document.getElementById('appObjective');
    if (docAppBg && appBgInput) docAppBg.textContent = appBgInput.value;
    if (docAppObj && appObjInput) docAppObj.textContent = appObjInput.value;

    // Success Screen
    const finalAppName = document.getElementById('finalAppName');
    if (finalAppName) finalAppName.textContent = `${state.formData.appName} (${state.formData.appAcronym})`;
  }

  function formatDateID(dateStr) {
    if (!dateStr) return '06 Oktober 2026';
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const month = months[parseInt(parts[1], 10) - 1];
      const year = parts[0];
      return `${day} ${month} ${year}`;
    }
    return dateStr;
  }

  // File Upload Handlers (Simulation)
  const dropzones = document.querySelectorAll('.upload-dropzone');
  dropzones.forEach(zone => {
    const targetId = zone.getAttribute('data-target');
    const fileInput = document.getElementById(targetId);

    zone.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.style.borderColor = '#3b82f6';
      zone.style.background = 'rgba(37, 99, 235, 0.1)';
    });

    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = '';
      zone.style.background = '';
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.borderColor = '';
      zone.style.background = '';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(targetId, e.dataTransfer.files[0]);
      }
    });

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleFileSelect(targetId, e.target.files[0]);
        }
      });
    }
  });

  function handleFileSelect(inputId, file) {
    const pill = document.querySelector(`.doc-card:has(#${inputId}) .file-preview-pill`) ||
                 document.getElementById(inputId.replace('file', 'pill'));
    if (pill) {
      pill.classList.add('active');
      const nameEl = pill.querySelector('.file-pill-name');
      const sizeEl = pill.querySelector('.file-pill-size');
      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }

  // eOffice Verification Button
  const btnValidateEOffice = document.getElementById('btnValidateEOffice');
  const eofficeBox = document.getElementById('eofficeValidationBox');
  if (btnValidateEOffice && eofficeBox) {
    btnValidateEOffice.addEventListener('click', () => {
      btnValidateEOffice.innerHTML = '<span class="spinner"></span> Memverifikasi...';
      btnValidateEOffice.disabled = true;

      setTimeout(() => {
        btnValidateEOffice.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Terverifikasi';
        btnValidateEOffice.disabled = false;
        eofficeBox.style.display = 'flex';
        eofficeBox.style.animation = 'fadeIn 0.3s ease';
      }, 600);
    });
  }

  // Modal Official Form F.A01 Preview
  const btnPreviewFA01 = document.getElementById('btnPreviewFA01');
  const modalPreview = document.getElementById('modalPreviewFA01');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnModalClose = document.getElementById('btnModalClose');
  const btnModalPrintDoc = document.getElementById('btnModalPrintDoc');

  function openModal() {
    syncFormData();
    if (modalPreview) modalPreview.classList.add('show');
  }

  function closeModal() {
    if (modalPreview) modalPreview.classList.remove('show');
  }

  if (btnPreviewFA01) btnPreviewFA01.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnModalClose) btnModalClose.addEventListener('click', closeModal);

  if (modalPreview) {
    modalPreview.addEventListener('click', (e) => {
      if (e.target === modalPreview) closeModal();
    });
  }

  if (btnModalPrintDoc) {
    btnModalPrintDoc.addEventListener('click', () => {
      window.print();
    });
  }

  // Form Submit Action
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      syncFormData();

      const btnSubmit = document.getElementById('btnSubmitApplication');
      if (btnSubmit) {
        btnSubmit.innerHTML = 'Mengirim Permohonan...';
        btnSubmit.disabled = true;
      }

      setTimeout(() => {
        goToStep(5);
        if (btnSubmit) {
          btnSubmit.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Kirim Permohonan ke Kominfo';
          btnSubmit.disabled = false;
        }
      }, 800);
    });
  }

  // Print Receipt Button on Step 5
  const btnPrintReceipt = document.getElementById('btnPrintReceipt');
  if (btnPrintReceipt) {
    btnPrintReceipt.addEventListener('click', openModal);
  }

  // Reset Demo Button
  const btnResetForm = document.getElementById('btnResetForm');
  if (btnResetForm) {
    btnResetForm.addEventListener('click', () => {
      if (confirm('Reset form ke kondisi awal permohonan baru?')) {
        state.regNumber = 'REG-20261006-' + String(Math.floor(1000 + Math.random() * 9000));
        if (previewRegNumber) previewRegNumber.textContent = state.regNumber;
        if (sumRegId) sumRegId.textContent = state.regNumber;
        if (finalRegNumber) finalRegNumber.textContent = state.regNumber;
        if (docRegNum) docRegNum.textContent = state.regNumber;
        goToStep(1);
      }
    });
  }

  // Simulation Next: To Fase Tengah
  const btnGoToAnalystSimulation = document.getElementById('btnGoToAnalystSimulation');
  if (btnGoToAnalystSimulation) {
    btnGoToAnalystSimulation.addEventListener('click', () => {
      alert(`Permohonan ${state.regNumber} siap dialirkan ke MOD-04: Modul Telaah Kelayakan & Kertas Kerja Analis (Form F.A02) pada Fase Tengah!`);
    });
  }
});
