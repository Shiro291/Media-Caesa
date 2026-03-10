export const getNumberFact = (num: number): string => {
    if (num === 0) return "Nol! Tidak ada apa-apa di sini.";
    if (num === 10) return "Sepuluh! Yeay, satu puluhan penuh! 📦";
    if (num === 50) return "Lima puluh! Setengah perjalanan menuju seratus! 🌟";
    if (num === 100) return "SERATUS! 🎉 Selamat datang di dunia Ratusan!";
    if (num === 999) return "Wuih! Angka terbesar sebelum pindah ke Ribuan! 🚀";
    if (num > 100 && num % 100 === 0) return `${num / 100} Ratusan! Besar sekali!! 🏛️`;
    if (num < 10) return "Masih di area Satuan nih, kumpulkan terus biar jadi Puluhan! 🧱";
    if (num < 100 && num % 10 === 0) return `Hebat! Ada ${num / 10} tumpukan puluhan.`;

    const str = num.toString();
    if (str.length > 1 && str.split('').every(char => char === str[0])) {
        return "Wah, angkanya kembar semua! Keren sekali! ✨";
    }

    // Randomized fallbacks for other numbers based on some traits
    const unit = num % 10;
    if (unit === 5) return "Lima di akhir! Angka yang rapi.";
    if (num > 900) return "Wow! Kamu sudah sangat jauh, sebentar lagi 1000! 🌠";
    if (num % 2 === 0) return "Angka genap! Bisa dibagi dua dengan adil. 🤝";

    return "Angka ganjil yang unik! Terus semangat belajar! 🚀";
};

export const placeValueData = {
    title: "Belajar Nilai Tempat",
    intro: "Setiap angka punya tempat duduknya masing-masing: Ratusan duduk di depan, Puluhan di tengah, dan Satuan di paling belakang.",
    ratusan: {
        title: "Ratusan (Hundreds)",
        desc: "Ratusan adalah balok yang sangat besar! Isinya 100 balok kecil."
    },
    puluhan: {
        title: "Puluhan (Tens)",
        desc: "Puluhan itu seperti kotak sedang yang isinya tepat 10 balok kecil. Lebih mudah dihitung kan?"
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
        q: "Perhatikan pernyataan berikut:\n1. Menjadi 10 Satuan\n2. Menjadi 1 Puluhan\n3. Menjadi 100\n4. Menjadi 0\n\nJika aku punya 9 Satuan, dan ditambah 1 Satuan lagi, manakah pernyataan yang paling tepat?",
        opts: ["Hanya 1", "Hanya 2", "1 dan 2 benar", "3 dan 4 benar"],
        ans: 2,
        emoji: "✨",
        isShapeSelection: false
    }
];
