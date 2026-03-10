export const getNumberFact = (num: number): string => {
    if (num === 0) return "Nol! Tidak ada apa-apa di sini.";
    if (num === 10) return "Sepuluh! Yeay, satu puluhan penuh! 📦";
    if (num === 50) return "Lima puluh! Setengah perjalanan menuju seratus! 🌟";
    if (num === 100) return "SERATUS! 🎉 Kamu luar biasa! 1 Ratusan penuh!";
    if (num % 10 === 0) return `Hebat! Ada ${num / 10} tumpukan puluhan.`;
    if (num < 10) return "Masih di area Satuan nih, kumpulkan terus biar jadi Puluhan! 🧱";
    if (num === 11) return "Sebelas! Angkanya kembar seperti tiang listrik!";
    if (num === 22 || num === 33 || num === 44 || num === 55 || num === 66 || num === 77 || num === 88 || num === 99) {
        return "Wah, angkanya kembar! Keren sekali! ✨";
    }

    // Randomized fallbacks for other numbers based on some traits
    const unit = num % 10;
    if (unit === 5) return "Lima di akhir! Setengah jalan menuju puluhan berikutnya.";
    if (num > 90) return "Makin dekat ke Seratus! Pasti bisa!";
    if (num % 2 === 0) return "Angka genap! Bisa dibagi dua dengan adil. 🤝";

    return "Angka ganjil yang unik! Terus semangat belajar! 🚀";
};

export const placeValueData = {
    title: "Belajar Puluhan dan Satuan",
    intro: "Setiap angka punya tempat duduknya sendiri: Puluhan duduk di kiri, dan Satuan duduk di kanan.",
    puluhan: {
        title: "Puluhan (Tens)",
        desc: "Puluhan itu seperti kotak besar yang isinya tepat 10 balok kecil. Lebih mudah dihitung kan?"
    },
    satuan: {
        title: "Satuan (Units)",
        desc: "Satuan adalah balok-balok kecil yang berdiri sendiri. Kalau jumlahnya sampai 10, dia berubah wujud jadi 1 Puluhan!"
    }
};

export const bilanganCacahQuiz = [
    {
        q: "Angka berapa yang memiliki 3 Puluhan dan 5 Satuan?",
        opts: ["53", "35", "30", "5"],
        ans: 1,
        emoji: "🤔"
    },
    {
        q: "Berapa banyak Satuan di dalam angka 42?",
        opts: ["4", "2", "42", "0"],
        ans: 1,
        emoji: "🧱"
    },
    {
        q: "Di angka 78, manakah yang merupakan Puluhan?",
        opts: ["7", "8", "78", "0"],
        ans: 0,
        emoji: "📦"
    },
    {
        q: "1 Puluhan itu sama dengan berapa Satuan?",
        opts: ["10 Satuan", "1 Satuan", "100 Satuan", "5 Satuan"],
        ans: 0,
        emoji: "🌟"
    },
    {
        q: "Jika aku punya 9 Satuan, dan aku tambah 1 Satuan lagi, aku jadi apa?",
        opts: ["10 Satuan", "1 Puluhan", "Keduanya benar", "Salah semua"],
        ans: 2,
        emoji: "✨"
    }
];
