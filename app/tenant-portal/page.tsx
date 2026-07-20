import { AlertTriangle, ArrowLeft, CheckCircle2, CreditCard, FileText, Home, QrCode } from 'lucide-react';
import { cabangKos, kamarKos, penghuni, tagihan } from '@/lib/data';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export default function TenantPortalPage() {
  const tenant = penghuni[0];
  const room = kamarKos.find((k) => k.id === tenant.kamarId)!;
  const kos = cabangKos.find((c) => c.id === tenant.cabangId)!;
  const bills = tagihan.filter((t) => t.penghuniId === tenant.id);
  const activeBill = bills.find((t) => t.status !== 'lunas');

  return (
    <main className="min-h-screen bg-[#04150d] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-10"><ArrowLeft className="w-4 h-4" /> Kembali Home</a>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-emerald-500 uppercase tracking-[0.3em] text-xs mb-2">Tenant Portal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold">Halo, {tenant.nama}</h1>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-5 py-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" /> Tenggat Pembayaran: 15 Agustus 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#082016] border border-white/10 p-6"><Home className="text-emerald-500 mb-4" /><p className="text-white/45 text-sm">Cabang</p><h2 className="text-2xl font-bold">{kos.name}</h2><p className="text-white/45 text-sm mt-2">{kos.address}</p></div>
          <div className="bg-[#082016] border border-white/10 p-6"><FileText className="text-blue-400 mb-4" /><p className="text-white/45 text-sm">Kamar Aktif</p><h2 className="text-2xl font-bold">Kamar {room.nomor}</h2><p className="text-white/45 text-sm mt-2">{room.tipe} · {room.ukuran}</p></div>
          <div className="bg-[#082016] border border-white/10 p-6"><CheckCircle2 className="text-emerald-400 mb-4" /><p className="text-white/45 text-sm">Status Kontrak</p><h2 className="text-2xl font-bold capitalize">{tenant.statusKontrak}</h2><p className="text-white/45 text-sm mt-2">Mulai {tenant.tanggalMasuk}</p></div>
        </div>

        {activeBill && (
          <section className="bg-[#082016] border border-emerald-500/20 p-8 mb-10">
            <div className="flex items-center gap-3 mb-6"><CreditCard className="text-emerald-500" /><h2 className="text-2xl font-bold">Tagihan Aktif</h2></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-white/45 text-sm mb-2">Periode</p>
                <h3 className="text-3xl font-bold mb-4">{activeBill.bulan}</h3>
                <p className="text-white/45 text-sm mb-2">Total Bayar</p>
                <p className="text-4xl font-extrabold text-emerald-400 mb-6">{formatRupiah(activeBill.jumlah)}</p>
                <p className="text-yellow-300">Jatuh tempo: {activeBill.jatuhTempo}</p>
              </div>
              <div className="bg-white p-8 text-black flex flex-col items-center justify-center">
                <QrCode className="w-32 h-32 mb-4" />
                <p className="font-bold">QRIS / Transfer</p>
                <p className="text-sm text-black/60 text-center mt-2">Scan untuk simulasi pembayaran. Setelah bayar, status otomatis menjadi Lunas.</p>
              </div>
            </div>
            <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 px-8 py-4 font-bold uppercase tracking-widest">Saya Sudah Bayar</button>
          </section>
        )}

        <section className="bg-[#082016] border border-white/10 p-6">
          <h2 className="text-2xl font-bold mb-6">Riwayat Tagihan</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/40 uppercase tracking-widest text-xs"><tr><th className="text-left py-3">Bulan</th><th className="text-left">Jumlah</th><th className="text-left">Jatuh Tempo</th><th className="text-left">Status</th><th className="text-left">Metode</th></tr></thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-t border-white/5"><td className="py-4">{bill.bulan}</td><td>{formatRupiah(bill.jumlah)}</td><td>{bill.jatuhTempo}</td><td className={bill.status === 'lunas' ? 'text-emerald-300' : 'text-yellow-300'}>{bill.status}</td><td>{bill.metodeBayar ?? '-'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
