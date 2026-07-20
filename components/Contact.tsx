'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10),
});

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error('Form belum lengkap / tidak valid');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Pengajuan sewa terkirim');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-28 bg-[#04150d]">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-emerald-500 uppercase tracking-wider text-xs mb-2">Pengajuan Sewa / Kontak</p>
          <h2 className="text-4xl md:text-5xl font-extrabold">HUBUNGI KAMI</h2>
        </motion.div>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input name="name" placeholder="Nama" value={form.name} onChange={handleChange} className="bg-[#082016] p-4 rounded text-white placeholder-white/40 focus:outline-none" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="bg-[#082016] p-4 rounded text-white placeholder-white/40 focus:outline-none" required />
          <input name="phone" placeholder="No. HP" value={form.phone} onChange={handleChange} className="bg-[#082016] p-4 rounded text-white placeholder-white/40 focus:outline-none" required />
          <textarea name="message" placeholder="Pesan / Kamar yang diminati" rows={4} value={form.message} onChange={handleChange} className="bg-[#082016] p-4 rounded text-white placeholder-white/40 focus:outline-none" required />
          <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded transition-colors flex items-center justify-center">
            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </form>
      </div>
    </section>
  );
}
