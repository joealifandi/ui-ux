export type CabangKos = {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  description: string;
  image: string;
  totalRooms: number;
  availableRooms: number;
  facilities: string[];
};

export type StatusKamar = 'tersedia' | 'penuh' | 'menunggu_konfirmasi' | 'maintenance';

export type Kamar = {
  id: number;
  cabangId: number;
  nomor: string;
  tipe: 'Standard' | 'Deluxe' | 'Premium';
  harga: number;
  status: StatusKamar;
  fasilitas: string[];
  ukuran: string;
  lantai: number;
  image: string;
  description: string;
};

export type Penghuni = {
  id: number;
  nama: string;
  email: string;
  phone: string;
  ktpNumber: string;
  kamarId: number;
  cabangId: number;
  tanggalMasuk: string;
  statusKontrak: 'aktif' | 'pending' | 'selesai';
  avatar: string;
};

export type Tagihan = {
  id: number;
  penghuniId: number;
  kamarId: number;
  bulan: string;
  jumlah: number;
  jatuhTempo: string;
  status: 'lunas' | 'belum_bayar' | 'terlambat';
  tanggalBayar?: string;
  metodeBayar?: 'qris' | 'transfer' | 'cash';
};

export type PengajuanSewa = {
  id: number;
  nama: string;
  email: string;
  phone: string;
  ktpNumber: string;
  kamarId: number;
  cabangId: number;
  tanggalPengajuan: string;
  status: 'menunggu' | 'disetujui' | 'ditolak';
  pesan?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  kamar: string;
  cabang: string;
  review: string;
  avatar: string;
  rating: number;
};

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  span?: 'tall' | 'wide' | 'normal';
};

export type Stat = {
  id: number;
  value: number;
  suffix: string;
  label: string;
};

export type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HeroSlide = {
  id: number;
  city: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};
