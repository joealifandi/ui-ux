import { AlertTriangle, CheckCircle2, Clock, DoorOpen, Home, Wallet } from 'lucide-react';
import { cabangKos, kamarKos, pengajuanSewa, tagihan } from '@/lib/data';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

const statusColor = {
  tersedia: 'bg-emerald-500/20 text-emerald-300',
  penuh: 'bg-blue-500/20 text-blue-300',
  menunggu_konfirmasi: 'bg-yellow-500/20 text-yellow-300',
  maintenance: 'bg-slate-500/20 text-slate-300',
};

export default function OwnerDashboardPage() {
  const income = tagihan.filter((t) => t.status === 'lunas').reduce((sum, t) => sum + t.jumlah, 0);
  const tersedia = kamarKos.filter((k) => k.status === 'tersedia').length;
  const penuh = kamarKos.filter((k) => k.status === 'penuh').length;

  return (
    <main className="min-h-screen bg-[#04150d] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-emerald-500 uppercase tracking-[0.3em] text-xs mb-2">Owner Dashboard</p>
            <h1 className="text-4xl md:text-5xl font-extrabold">Manajemen Kos</h1>
          </div>
          <a href="/" className="border border-white/10 px-5 py-3 text-sm uppercase tracking-widest hover:border-emerald-500">Kembali Home</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#082016] border border-white/10 p-6"><Home className="text-emerald-500 mb-4" /><p className="text-3xl font-bold">2</p><p className="text-white/50 text-sm">Cabang Kos</p></div>
          <div className="bg-[#082016] border border-white/10 p-6"><DoorOpen className="text-emerald-400 mb-4" /><p className="text-3xl font-bold">{tersedia}</p><p className="text-white/50 text-sm">Kamar Tersedia</p></div>
          <div className="bg-[#082016] border border-white/10 p-6"><CheckCircle2 className="text-blue-400 mb-4" /><p className="text-3xl font-bold">{penuh}</p><p className="text-white/50 text-sm">Kamar Terisi</p></div>
          <div className="bg-[#082016] border border-white/10 p-6"><Wallet className="text-yellow-400 mb-4" /><p className="text-2xl font-bold">{formatRupiah(income)}</p><p className="text-white/50 text-sm">Pemasukan Lunas</p></div>
        </div>

        <section className="bg-[#082016] border border-yellow-500/20 p-6 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-yellow-400" />
            <h2 className="text-2xl font-bold">Pengajuan Sewa Menunggu Konfirmasi</h2>
          </div>
          <div className="grid gap-4">
            {pengajuanSewa.map((p) => {
              const room = kamarKos.find((k) => k.id === p.kamarId);
              const kos = cabangKos.find((c) => c.id === p.cabangId);
              return (
                <div key={p.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-black/25 p-5 border border-white/5">
                  <div><p className="font-bold">{p.nama}</p><p className="text-white/45 text-sm">{p.email}</p></div>
                  <div><p className="text-white/60 text-sm">{kos?.name}</p><p className="font-bold">Kamar {room?.nomor}</p></div>
                  <div><p className="text-white/45 text-sm">Tanggal</p><p>{p.tanggalPengajuan}</p></div>
                  <div><p className="text-white/45 text-sm">Status</p><p className="text-yellow-300 uppercase text-xs tracking-widest">{p.status}</p></div>
                  <div className="flex gap-2"><button className="flex-1 bg-emerald-600 py-3 text-xs font-bold uppercase">Setujui</button><button className="flex-1 bg-emerald-600 py-3 text-xs font-bold uppercase">Tolak</button></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {cabangKos.map((kos) => (
            <div key={kos.id} className="bg-[#082016] border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-2">{kos.name}</h2>
              <p className="text-white/45 text-sm mb-6">{kos.address}</p>
              <div className="grid grid-cols-5 gap-3">
                {kamarKos.filter((k) => k.cabangId === kos.id).map((room) => (
                  <div key={room.id} className={`aspect-square flex flex-col items-center justify-center text-xs font-bold ${statusColor[room.status]}`}>
                    <span>{room.nomor}</span>
                    <span className="font-normal text-[10px] mt-1">{room.status.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-[#082016] border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6"><Clock className="text-emerald-400" /><h2 className="text-2xl font-bold">Pembukuan & Tagihan</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/40 uppercase tracking-widest text-xs"><tr><th className="text-left py-3">Bulan</th><th className="text-left">Kamar</th><th className="text-left">Jumlah</th><th className="text-left">Jatuh Tempo</th><th className="text-left">Status</th></tr></thead>
              <tbody>
                {tagihan.map((t) => {
                  const room = kamarKos.find((k) => k.id === t.kamarId);
                  return <tr key={t.id} className="border-t border-white/5"><td className="py-4">{t.bulan}</td><td>Kamar {room?.nomor}</td><td>{formatRupiah(t.jumlah)}</td><td>{t.jatuhTempo}</td><td className={t.status === 'lunas' ? 'text-emerald-300' : 'text-yellow-300'}>{t.status}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
