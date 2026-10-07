/**
 * tengah.js - Logika Interaktif Fase Tengah MPSI SPBE Kota Yogyakarta
 * Mendukung: Dashboard Analis, Master Portofolio & Redundancy Inspector,
 * Kertas Kerja Analis Form F.A02, dan Metadata SDI & Kebutuhan Form F.A03.
 */

document.addEventListener('DOMContentLoaded', function () {
  initDashboardAnalis();
  initKatalogPortofolio();
  initKertasKerjaFA02();
  initMetadataFA03();
});

/* ==========================================================================
   1. DASHBOARD ANALIS LOGIC
   ========================================================================== */
function initDashboardAnalis() {
  const table = document.getElementById('tableAntrean');
  if (!table) return;

  const filterBtns = document.querySelectorAll('.tab-nav-btn');
  const searchInput = document.getElementById('filterSearch');
  const rows = table.querySelectorAll('tbody tr');

  // Filter Tab Switcher
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      filterQueueRows(filter, searchInput ? searchInput.value.toLowerCase().trim() : '');
    });
  });

  // Search Filter Input
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const activeBtn = document.querySelector('.tab-nav-btn.active');
      const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      filterQueueRows(activeFilter, this.value.toLowerCase().trim());
    });
  }

  function filterQueueRows(statusFilter, query) {
    let visibleCount = 0;
    rows.forEach(row => {
      const rowStatus = row.getAttribute('data-status') || '';
      const textContent = row.textContent.toLowerCase();

      const matchesStatus = (statusFilter === 'all') || (rowStatus === statusFilter);
      const matchesQuery = !query || textContent.includes(query);

      if (matchesStatus && matchesQuery) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
  }
}

/* ==========================================================================
   2. KATALOG PORTOFOLIO & REDUNDANCY INSPECTOR
   ========================================================================== */
function initKatalogPortofolio() {
  const katalogTable = document.getElementById('tableKatalogPemkot');
  const searchInput = document.getElementById('katalogSearchInput');
  const inspectorBtn = document.getElementById('btnRunInspector');
  const inspectorInput = document.getElementById('inspectorInput');
  const inspectorResults = document.getElementById('inspectorResults');

  // Filter Table Katalog
  if (katalogTable && searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      const rows = katalogTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }

  // Redundancy Inspector Simulation
  if (inspectorBtn && inspectorInput && inspectorResults) {
    inspectorBtn.addEventListener('click', function () {
      runRedundancyScan();
    });

    inspectorInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runRedundancyScan();
    });

    function runRedundancyScan() {
      const query = inspectorInput.value.toLowerCase().trim();
      inspectorResults.innerHTML = `
        <div style="padding:1.5rem; text-align:center; color:#64748b; font-size:0.88rem;">
          <span style="display:inline-block; animation:spin 1s linear infinite; font-size:1.5rem; margin-bottom:0.5rem;">⚙️</span>
          <div>Memindai seluruh 18 katalog sistem SPBE Kota Yogyakarta & basis data arsitektur...</div>
        </div>
      `;

      setTimeout(() => {
        if (query.includes('rujuk') || query.includes('sehat') || query.includes('puskesmas') || query.includes('rsud')) {
          inspectorResults.innerHTML = `
            <div class="match-result-card" style="animation: fadeIn 0.3s ease;">
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                  <strong style="font-size:0.95rem; color:#0f172a;">SIMPUS (Sistem Informasi Puskesmas)</strong>
                  <span class="chip chip-blue">Dinas Kesehatan</span>
                </div>
                <p style="font-size:0.83rem; color:#475569; margin-bottom:0.5rem;">
                  Fungsi eksisting: Rekam medis elektronik dan pendaftaran loket lokal faskes primer.
                </p>
                <div style="font-size:0.75rem; color:#059669; font-weight:700;">
                  ✓ Analisis Kertas Kerja: Fitur SIP-RUJUK berfokus pada bridging rujukan antar-faskes dan bed monitoring RSUD. Rekomendasi: Integrasi API, Bukan Duplikasi.
                </div>
              </div>
              <div class="match-score-badge safe" style="text-align:right;">
                <div style="font-size:1.3rem; font-weight:800; color:#059669;">24%</div>
                <div style="font-size:0.7rem; color:#059669;">Kemiripan Rendah (Aman)</div>
              </div>
            </div>

            <div class="match-result-card" style="animation: fadeIn 0.3s ease; margin-top:0.75rem;">
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                  <strong style="font-size:0.95rem; color:#0f172a;">SIMRS RSUD Kota Yogyakarta</strong>
                  <span class="chip chip-blue">RSUD Kota Yogyakarta</span>
                </div>
                <p style="font-size:0.83rem; color:#475569; margin-bottom:0.5rem;">
                  Fungsi eksisting: Billing kasir, rawat inap internal, farmasi rumah sakit.
                </p>
                <div style="font-size:0.75rem; color:#059669; font-weight:700;">
                  ✓ Analisis Kertas Kerja: SIP-RUJUK hanya bertindak sebagai gateway rujukan eksternal. Sediakan REST API endpoint bed availability.
                </div>
              </div>
              <div class="match-score-badge safe" style="text-align:right;">
                <div style="font-size:1.3rem; font-weight:800; color:#059669;">18%</div>
                <div style="font-size:0.7rem; color:#059669;">Kemiripan Rendah (Aman)</div>
              </div>
            </div>
          `;
        } else if (query.includes('pajak') || query.includes('retribusi') || query.includes('bayar')) {
          inspectorResults.innerHTML = `
            <div class="match-result-card" style="animation: fadeIn 0.3s ease; border-left: 4px solid #ef4444;">
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                  <strong style="font-size:0.95rem; color:#991b1b;">SIPKD / e-Pajak Kota Yogyakarta</strong>
                  <span class="chip chip-amber">BPKAD Kota Yogyakarta</span>
                </div>
                <p style="font-size:0.83rem; color:#475569; margin-bottom:0.5rem;">
                  Fungsi eksisting: Penerimaan retribusi daerah, PBB-P2, BPHTB, dan pembayaran QRIS BPD DIY.
                </p>
                <div style="font-size:0.75rem; color:#b91c1c; font-weight:700;">
                  ⚠️ Peringatan Redundansi Tinggi: Dilarang membuat modul pembayaran berdiri sendiri! Wajib menggunakan Gateway Pembayaran JSS / BPKAD.
                </div>
              </div>
              <div class="match-score-badge high-risk" style="text-align:right;">
                <div style="font-size:1.3rem; font-weight:800; color:#ef4444;">88%</div>
                <div style="font-size:0.7rem; color:#ef4444;">Duplikasi Terdeteksi!</div>
              </div>
            </div>
          `;
        } else {
          inspectorResults.innerHTML = `
            <div style="padding:1.5rem; text-align:center; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
              <span style="font-size:1.5rem; display:block; margin-bottom:0.35rem;">🟢</span>
              <strong style="color:#0f172a; font-size:0.92rem;">Tidak Ditemukan Indikasi Duplikasi Signifikan</strong>
              <p style="color:#64748b; font-size:0.8rem; margin-top:0.25rem;">
                Kata kunci <em>"${query}"</em> tidak bertabrakan dengan modul fungsional dalam katalog arsitektur SPBE Pemkot Yogyakarta saat ini.
              </p>
            </div>
          `;
        }
      }, 350);
    }
  }
}

/* ==========================================================================
   3. KERTAS KERJA FORM F.A02 LOGIC
   ========================================================================== */
window.switchWbTab = function (paneId) {
  const tabs = document.querySelectorAll('.wb-tab-btn');
  const panes = document.querySelectorAll('.wb-pane');

  tabs.forEach(tab => {
    if (tab.getAttribute('data-target') === paneId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  panes.forEach(pane => {
    if (pane.id === paneId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  window.scrollTo({ top: 180, behavior: 'smooth' });
};

window.recalculateScore = function () {
  // Ambil nilai radio dari 3 Pilar Gatekeeper Asesmen F.A02
  // Pilar 1: Urgensi & Probis (Bobot 35%)
  const p1_1 = getRadioVal('param1_1', 100); // Urgensi Riil (15%)
  const p1_2 = getRadioVal('param1_2', 90);  // SOP Manual Ortala (10%)
  const p1_3 = getRadioVal('param1_3', 90);  // Logika Simplifikasi Alur (10%)

  // Pilar 2: Redundansi Dini (Bobot 30%)
  const p2_1 = getRadioVal('param2_1', 85);  // Cek Aplikasi Serupa Eksisting (15%)
  const p2_2 = getRadioVal('param2_2', 80);  // Justifikasi Bikin Baru vs Integrasi (15%)

  // Pilar 3: Kelayakan Teknis Konseptual (Bobot 35%)
  const p3_1 = getRadioVal('param3_1', 85);  // Bentuk Usulan Kustom vs Replikasi (10%)
  const p3_2 = getRadioVal('param3_2', 85);  // Integrasi Data Besar & SPLP/SDI (15%)
  const p3_3 = getRadioVal('param3_3', 90);  // Penanggung Jawab Teknis Internal OPD (10%)

  // Hitung Skor Tertimbang Kumulatif (Total 100%)
  const total = (p1_1 * 0.15) + (p1_2 * 0.10) + (p1_3 * 0.10) +
                (p2_1 * 0.15) + (p2_2 * 0.15) +
                (p3_1 * 0.10) + (p3_2 * 0.15) + (p3_3 * 0.10);
  const rounded = Math.round(total * 10) / 10;

  // Update Tampilan Skor
  const scoreNumEl = document.getElementById('displayTotalScore');
  const scoreBarFill = document.getElementById('scoreBarFill');
  const statusEl = document.getElementById('displayFeasibilityStatus');

  if (scoreNumEl) {
    scoreNumEl.innerHTML = `${rounded} <span style="font-size:1.1rem; font-weight:600;">/ 100</span>`;
  }
  if (scoreBarFill) {
    scoreBarFill.style.width = `${Math.min(100, rounded)}%`;
  }

  if (statusEl) {
    if (rounded >= 80) {
      statusEl.className = 'chip chip-green';
      statusEl.innerText = 'Sangat Layak (Rekomtek)';
    } else if (rounded >= 60) {
      statusEl.className = 'chip chip-amber';
      statusEl.innerText = 'Layak Bersyarat';
    } else {
      statusEl.className = 'chip chip-red';
      statusEl.innerText = 'Tidak Layak (Dialihkan Replikasi)';
    }
  }

  const pdfDisplayScore = document.getElementById('pdfDisplayScore');
  if (pdfDisplayScore) {
    pdfDisplayScore.innerText = `${rounded} / 100`;
  }
  const summaryScoreDisplay = document.getElementById('summaryScoreDisplay');
  if (summaryScoreDisplay) {
    summaryScoreDisplay.innerText = `${rounded} / 100`;
  }

  // Update Highlight pada Radio Options
  document.querySelectorAll('.rubrik-item').forEach(item => {
    const labels = item.querySelectorAll('.level-option');
    labels.forEach(lbl => {
      const input = lbl.querySelector('input[type="radio"]');
      if (input && input.checked) {
        lbl.classList.add('selected');
      } else {
        lbl.classList.remove('selected');
      }
    });
  });
};

function getRadioVal(name, defaultVal) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? parseFloat(checked.value) : defaultVal;
}

function initKertasKerjaFA02() {
  const tabs = document.querySelectorAll('.wb-tab-btn');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        if (targetId) switchWbTab(targetId);
      });
    });
  }

  // Smooth scroll and active highlight for linear flow steps
  const flowSteps = document.querySelectorAll('.wb-flow-step');
  if (flowSteps.length) {
    flowSteps.forEach(step => {
      step.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        const targetSection = document.querySelector(targetSelector);
        if (targetSection) {
          flowSteps.forEach(s => s.classList.remove('active'));
          this.classList.add('active');
          const topOffset = targetSection.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      });
    });
  }

  // Modal Preview F.A02
  const modalFA02 = document.getElementById('modalFA02');
  const btnPreviewFA02 = document.getElementById('btnPreviewFA02');
  const btnCloseModalFA02 = document.getElementById('btnCloseModalFA02');
  const btnModalCloseFA02 = document.getElementById('btnModalCloseFA02');
  const btnApproveKabid = document.getElementById('btnApproveKabid');

  if (btnPreviewFA02 && modalFA02) {
    btnPreviewFA02.addEventListener('click', function () {
      modalFA02.classList.add('active');
    });
  }

  const closeFn = () => { if (modalFA02) modalFA02.classList.remove('active'); };
  if (btnCloseModalFA02) btnCloseModalFA02.addEventListener('click', closeFn);
  if (btnModalCloseFA02) btnModalCloseFA02.addEventListener('click', closeFn);

  // Simpan Hasil Telaah Kertas Kerja & Compute Kuadran -> Redirect ke Dashboard 4 Kuadran
  const btnSaveToKuadran = document.getElementById('btnSaveToKuadran');
  if (btnSaveToKuadran) {
    btnSaveToKuadran.addEventListener('click', function () {
      const scoreEl = document.getElementById('displayTotalScore');
      const scoreVal = scoreEl ? parseFloat(scoreEl.innerText) : 86.5;

      let kuadranResult = "STRATEGIC (Strategis)";
      if (scoreVal >= 80) {
        kuadranResult = "STRATEGIC (Strategis)";
      } else if (scoreVal >= 65) {
        kuadranResult = "HIGH POTENTIAL (Potensial Tinggi)";
      } else if (scoreVal >= 50) {
        kuadranResult = "KEY OPERATIONAL (Kunci Operasional)";
      } else {
        kuadranResult = "SUPPORT (Pendukung / Replikasi)";
      }

      const confirmed = confirm(
        `💾 PROSES SIMPAN & KALKULASI PORTOFOLIO:\n\n` +
        `Sistem akan menyimpan seluruh lembar telaah F.A02 dan memproses perhitungan matriks McFarlan-Peppard:\n\n` +
        `• Skor Kelayakan 3 Pilar: ${scoreVal} / 100\n` +
        `• Hasil Kalkulasi Kuadran: ${kuadranResult}\n` +
        `• Jalur Pengadaan: JALUR A (In-House Programmer Kominfo)\n\n` +
        `Simpan hasil telaah dan tampilkan posisi usulan ini di Dashboard 4 Kuadran?`
      );

      if (confirmed) {
        btnSaveToKuadran.disabled = true;
        btnSaveToKuadran.innerHTML = `⏳ Memproses Kalkulasi Kuadran...`;
        
        setTimeout(() => {
          let targetUrl = `dashboard-kuadran-portofolio.html?saved=REG-20261006-0042&score=${scoreVal}&kuadran=${encodeURIComponent(kuadranResult)}`;
          window.location.href = targetUrl;
        }, 500);
      }
    });
  }

  // Approve Kabid & Redirect ke F.A03 (Fallback jika tombol lama dipanggil)
  if (btnApproveKabid) {
    btnApproveKabid.addEventListener('click', function () {
      const confirmed = confirm('Pengesahan Kertas Kerja F.A02:\n\nApakah Anda yakin ingin mengesahkan Rekomendasi Kelayakan Teknis (Form F.A02) untuk usulan SIP-RUJUK?\n\nUsulan akan diteruskan ke tahap penyusunan Metadata SDI & Spesifikasi Kebutuhan F.A03.');
      if (confirmed) {
        alert('✓ Berita Acara F.A02 Berhasil Disahkan secara Elektronik (TTE BSrE)!\n\nMembuka halaman Metadata SDI & Kebutuhan Form F.A03...');
        let targetUrl = 'metadata-kebutuhan-fa03.html';
        if (window.location.pathname.includes('1-kertas-kerja-asesmen-analis')) {
          targetUrl = '../2-standardisasi-metadata-kebutuhan/index.html';
        }
        window.location.href = targetUrl;
      }
    });
  }

  // Initial calculation
  recalculateScore();
}

/* ==========================================================================
   4. METADATA SATU DATA INDONESIA & FORM F.A03 LOGIC
   ========================================================================== */
function initMetadataFA03() {
  const pillBtns = document.querySelectorAll('.fa03-nav-pill, .sdi-nav-pill');
  const panes = document.querySelectorAll('.fa03-step-pane, .sdi-pane');
  if (!pillBtns.length) return;

  // Step Switcher
  pillBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      pillBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const targetPaneId = this.getAttribute('data-pane');
      panes.forEach(p => {
        if (p.id === targetPaneId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // Tambah Variabel Metadata SDI Baru
  const btnAddMetaElem = document.getElementById('btnAddMetaElem');
  const sdiTableBody = document.getElementById('sdiTableBody');
  if (btnAddMetaElem && sdiTableBody) {
    btnAddMetaElem.addEventListener('click', function () {
      const varName = prompt('Masukkan nama variabel elemen data baru (contoh: status_ambulans):', 'status_ambulans');
      if (!varName) return;

      const newRow = document.createElement('tr');
      newRow.style.animation = 'fadeIn 0.3s ease';
      newRow.innerHTML = `
        <td>
          <strong>${varName}</strong>
          <div class="text-xs text-muted">Variabel Baru Dinkes</div>
        </td>
        <td><span class="mono-text">VARCHAR(20)</span></td>
        <td>Definisi operasional ketersediaan armada evakuasi rujukan darurat PSC 119</td>
        <td><span class="pdp-tag umum">Data Operasional</span></td>
        <td>Master Sarpras Dinkes</td>
        <td style="text-align:center;"><span class="badge badge-emerald">Valid</span></td>
      `;
      sdiTableBody.appendChild(newRow);
      alert(`Variabel "${varName}" berhasil ditambahkan ke Kamus Data SDI.`);
    });
  }

  // Tambah Kebutuhan Fungsional Baru
  const btnAddReqBtn = document.getElementById('btnAddReqBtn');
  if (btnAddReqBtn) {
    btnAddReqBtn.addEventListener('click', function () {
      const title = prompt('Masukkan Judul Kebutuhan Fungsional Baru:', 'Integrasi Notifikasi WhatsApp Pasien');
      if (!title) return;

      const parent = document.getElementById('pane-fungsional').querySelector('.panel-body');
      if (parent) {
        const card = document.createElement('div');
        card.className = 'req-card';
        card.style.animation = 'fadeIn 0.3s ease';
        card.innerHTML = `
          <div class="req-card-header">
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span class="req-id-badge">REQ-F-05</span>
              <strong>${title}</strong>
            </div>
            <span class="badge badge-indigo">Role: Pasien & Petugas Faskes</span>
          </div>
          <p class="text-sm" style="color:var(--text-secondary); margin-bottom:0.75rem;">
            Sistem mengirimkan pesan notifikasi WhatsApp otomatis saat surat rujukan terbit dan saat jadwal poli dokter RSUD telah terkonfirmasi.
          </p>
          <div style="display:flex; gap:1.5rem; font-size:0.8rem; color:var(--text-muted); background:#f8fafc; padding:0.6rem 0.85rem; border-radius:var(--radius-xs);">
            <span><strong>Prioritas:</strong> <span style="color:#d97706; font-weight:700;">Sedang (Should Have)</span></span>
            <span><strong>Kriteria Keberhasilan:</strong> Delivery rate WA &ge; 98%, integrasi Gateway WA Diskominfo.</span>
            <span><strong>Modul:</strong> Modul Pengingat Otomatis</span>
          </div>
        `;
        parent.appendChild(card);
        alert('Kebutuhan fungsional REQ-F-05 berhasil ditambahkan ke matriks.');
      }
    });
  }

  // Modal Preview F.A03
  const modalFA03Preview = document.getElementById('modalFA03Preview');
  const btnPreviewFA03 = document.getElementById('btnPreviewFA03');
  const btnCloseFA03Modal = document.getElementById('btnCloseFA03Modal');
  const btnConfirmFromModal = document.getElementById('btnConfirmFromModal');
  const btnSahkanFA03 = document.getElementById('btnSahkanFA03');
  const btnFinalSubmitFaseHilir = document.getElementById('btnFinalSubmitFaseHilir');

  if (btnPreviewFA03 && modalFA03Preview) {
    btnPreviewFA03.addEventListener('click', function () {
      modalFA03Preview.classList.add('active');
    });
  }

  if (btnCloseFA03Modal && modalFA03Preview) {
    btnCloseFA03Modal.addEventListener('click', function () {
      modalFA03Preview.classList.remove('active');
    });
  }

  function handleFinalHandover() {
    const ok = confirm('Pengesahan Rekomendasi Metadata SDI & Sign-Off Walidata:\n\nApakah Anda menyetujui pengesahan Berita Acara Rekomendasi Metadata Satu Data Indonesia (SDI) dan menyerahkan usulan ini ke Seksi Pengembangan Perangkat Lunak?\n\nDokumen akan disahkan secara elektronik (TTE BSrE) dan status usulan berpindah menjadi: READY FOR DEVELOPMENT.');
    if (!ok) return;

    if (modalFA03Preview) modalFA03Preview.classList.remove('active');

    alert('🎉 PENGESAHAN WALIDATA SATU DATA BERHASIL!\n\nDokumen Berita Acara Rekomendasi Metadata SDI telah ditandatangani secara elektronik (TTE BSrE BSSN).\nUsulan resmi dialirkan ke Seksi Pengembangan Perangkat Lunak Diskominfo Kota Yogyakarta.\n\nStatus Usulan: READY FOR DEVELOPMENT.');

    let targetUrl = 'dashboard-analis.html';
    if (window.location.pathname.includes('2-standardisasi-metadata-kebutuhan')) {
      targetUrl = '../1-kertas-kerja-asesmen-analis/index.html';
    }
    window.location.href = targetUrl;
  }

  if (btnSahkanFA03) btnSahkanFA03.addEventListener('click', handleFinalHandover);
  if (btnConfirmFromModal) btnConfirmFromModal.addEventListener('click', handleFinalHandover);
  if (btnFinalSubmitFaseHilir) btnFinalSubmitFaseHilir.addEventListener('click', handleFinalHandover);
}
