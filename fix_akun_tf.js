const fs = require("fs");
let code = fs.readFileSync("frontend/src/app/akun/page.tsx", "utf8");

const alertHTML = `
                {/* Manual Transfer Notice */}
                <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-sky-600 text-3xl">account_balance</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Pembayaran Transfer Bank (Manual)</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Sistem pembayaran otomatis (Duitku) kami sedang dalam proses aktivasi. Untuk sementara, kamu bisa melakukan 
                        pembelian Paket atau Kredit dengan transfer manual ke rekening berikut:
                      </p>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Bank Jago</p>
                          <p className="text-xl font-mono font-bold text-slate-800">102071668801</p>
                          <p className="text-sm text-slate-600 font-medium">a.n. Johan Martino Anggo</p>
                        </div>
                        <a href="https://wa.me/6281234567890?text=Halo%20Admin%20TugasMu,%20saya%20sudah%20transfer%20untuk%20pembelian%20kredit/paket." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors text-sm">
                          <span className="material-symbols-outlined text-sm">chat</span>
                          Konfirmasi via WA
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
`;

code = code.replace("{/* Referral */}", alertHTML + "\n\n                {/* Referral */}");
fs.writeFileSync("frontend/src/app/akun/page.tsx", code);

