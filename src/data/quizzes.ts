export interface QuizQuestion {
    q: string;
    img?: string;
    emoji?: string;
    opts: string[];
    ans: number;
    isShapeSelection?: boolean;
    storyContext?: string; // Optional context text to show persistently
}

export const firefighterQuestions: QuizQuestion[] = [
    // 1-5 Counting
    {
        q: "Hitung ada berapa mobil pemadam kebakaran!",
        img: "/assets/quiz/count_trucks_new_q1_1767599925520.png",
        opts: ["2", "3", "4", "5"],
        ans: 1 // Index of correct answer
    },
    {
        q: "Hitung berapa helm pemadam kebakaran!",
        img: "/assets/quiz/count_helmets_new_q2_1767599943833.png",
        opts: ["3", "4", "5", "6"],
        ans: 1
    },
    {
        q: "Berapa banyak api? Hitung ya!",
        emoji: "🔥🔥🔥🔥🔥🔥🔥",
        opts: ["5", "6", "7", "8"],
        ans: 2
    },
    {
        q: "Hitung berapa pemadam kebakaran!",
        img: "/assets/quiz/count_firefighters_6_1767598583887.png",
        opts: ["4", "5", "6", "7"],
        ans: 2
    },
    {
        q: "Berapa banyak alat pemadam api?",
        img: "/assets/quiz/count_extinguishers_8_1767598600576.png",
        opts: ["6", "7", "8", "9"],
        ans: 2
    },
    // 6-10 More Counting
    {
        q: "Hitung ada berapa selang air!",
        img: "/assets/quiz/count_hoses_5_1767598615569.png",
        opts: ["3", "4", "5", "6"],
        ans: 2
    },
    {
        q: "Berapa banyak sepatu boot?",
        emoji: "👢👢👢👢👢\n👢👢👢👢👢",
        opts: ["8", "9", "10", "11"],
        ans: 2
    },
    {
        q: "Hitung berapa kapak pemadam!",
        img: "/assets/quiz/count_axes_2_1767598652753.png",
        opts: ["1", "2", "3", "4"],
        ans: 1
    },
    {
        q: "Berapa mobil pemadam yang ada?",
        img: "/assets/quiz/count_firetrucks_5_1767599089711.png",
        opts: ["3", "4", "5", "6"],
        ans: 2
    },
    {
        q: "Hitung berapa api yang menyala!",
        img: "/assets/quiz/count_fires_9_1767599104386.png",
        opts: ["7", "8", "9", "10"],
        ans: 2
    },
    // 11-13 Math
    {
        q: "3 pemadam + 2 pemadam = ...",
        emoji: "👨‍🚒👨‍🚒👨‍🚒 + 👨‍🚒👨‍🚒",
        opts: ["4", "5", "6", "7"],
        ans: 1
    },
    {
        q: "4 selang + 3 selang = ...",
        img: "/assets/quiz/addition_visual_4_plus_3_1767598686165.png",
        opts: ["5", "6", "7", "8"],
        ans: 2
    },
    {
        q: "2 mobil + 1 mobil = ...",
        img: "/assets/quiz/addition_visual_2_plus_1_1767598702092.png",
        opts: ["2", "3", "4", "5"],
        ans: 1
    },
    // 14-15 Subtraction
    {
        q: "6 api - 2 padam = ...",
        emoji: "🔥🔥🔥🔥🔥🔥 - 💧💧",
        opts: ["3", "4", "5", "6"],
        ans: 1
    },
    {
        q: "8 helm - 3 dipakai = ...",
        emoji: "⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️ - 👨‍🚒👨‍🚒👨‍🚒",
        opts: ["4", "5", "6", "7"],
        ans: 1
    }
];

export const simpleQuizQuestions: QuizQuestion[] = [
    // Colors
    {
        q: "Warna apa gambar balon ini?",
        emoji: "🎈",
        opts: ["Kuning", "Merah", "Biru", "Hijau"],
        ans: 1
    },
    {
        q: "Apa warna mobil ini?",
        emoji: "🚙",
        opts: ["Biru", "Merah", "Ungu", "Hitam"],
        ans: 0
    },
    {
        q: "Apa warna buah jeruk ini?",
        emoji: "🍊",
        opts: ["Merah", "Oren", "Pink", "Coklat"],
        ans: 1
    },
    {
        q: "Apa warna daun ini?",
        emoji: "🍃",
        opts: ["Kuning", "Hijau", "Biru", "Merah"],
        ans: 1
    },
    {
        q: "Apa warna anggur ini?",
        emoji: "🍇",
        opts: ["Ungu", "Hijau", "Kuning", "Putih"],
        ans: 0
    },

    // Shapes (Using CSS or Emojis representing shapes)
    {
        q: "Bentuk apa gambar ini?",
        emoji: "🟦",
        opts: ["Lingkaran", "Segitiga", "Kotak", "Bintang"],
        ans: 2
    },
    {
        q: "Bentuk apa gambar ini?",
        emoji: "🔴",
        opts: ["Kotak", "Lingkaran", "Persegi Panjang", "Segitiga"],
        ans: 1
    },
    {
        q: "Mana yang bentuknya Segitiga?",
        emoji: "❓",
        isShapeSelection: true,
        opts: ["🟣", "🔺", "⬛", "🔷"], // Emojis as options
        ans: 1
    },

    // Mix
    {
        q: "Warna apa bintang ini?",
        emoji: "⭐",
        opts: ["Kuning", "Hitam", "Biru", "Merah"],
        ans: 0
    },
    {
        q: "Bentuk apa Kue ini?",
        emoji: "🍩",
        opts: ["Kotak", "Segitiga", "Lingkaran", "Bintang"],
        ans: 2
    }
];

export const literacyQuizQuestions: QuizQuestion[] = [
    // --- MATEMATIKA (Image 1) ---
    {
        q: "Rahma membeli jeruk 5 buah\nLalu ia memakan 2 jeruk\nBerapa sisa jeruk Rahma sekarang?",
        opts: ["2", "3", "4", "5"],
        ans: 1,
        emoji: "🍊"
    },
    {
        q: "Di kolam ada 6 ikan mas\nAndi mengambil 4 ikan dari kolam\nBerapa sisa ikan yang ada di kolam?",
        opts: ["1", "2", "3", "4"],
        ans: 1,
        emoji: "🐟"
    },
    {
        q: "Riko mempunyai 8 permen\nRiko memakan 2 permennya\nBerapa jumlah permen Riko sekarang?",
        opts: ["4", "5", "6", "8"],
        ans: 2,
        emoji: "🍭" // Changed to lollipop to represent permen visually appealingly
    },
    {
        q: "Yuna membeli 9 kue\nSebanyak 4 kue telah ia makan\nBerapa sisa kue milik Yuna sekarang?",
        opts: ["3", "4", "5", "6"],
        ans: 2,
        emoji: "🧁"
    },
    {
        q: "Septika memiliki 10 pensil warna\nLalu ada 2 pensil yang diberikan kepada Ani\nBerapa sisa pensil warna Septika sekarang?",
        opts: ["6", "7", "8", "9"],
        ans: 2,
        emoji: "🖍️"
    },

    // --- BAHASA INDONESIA: LOMPAT TALI (Image 2) ---
    {
        storyContext: "Main Lompat Tali\n\nDarsih, Lukman, dan Nana main.\nMereka main lompat tali.\nMereka main di halaman rumah.\nDarsih dan Lukman memegang tali.\nNana melompati tali.\nMain lompat tali amat seru.\nMereka senang sekali.",
        q: "Siapa yang bermain lompat tali?",
        opts: ["Hanya Nana", "Darsih, Lukman, dan Nana", "Darsih dan Lukman", "Tidak ada"],
        ans: 1,
        emoji: "🧒🧒👦"
    },
    {
        storyContext: "Main Lompat Tali\n\nDarsih, Lukman, dan Nana main.\nMereka main lompat tali.\nMereka main di halaman rumah.\nDarsih dan Lukman memegang tali.\nNana melompati tali.\nMain lompat tali amat seru.\nMereka senang sekali.",
        q: "Di mana mereka bermain?",
        opts: ["Di dalam rumah", "Di lapangan", "Di halaman rumah", "Di sekolah"],
        ans: 2,
        emoji: "🏡"
    },
    {
        storyContext: "Main Lompat Tali\n\nDarsih, Lukman, dan Nana main.\nMereka main lompat tali.\nMereka main di halaman rumah.\nDarsih dan Lukman memegang tali.\nNana melompati tali.\nMain lompat tali amat seru.\nMereka senang sekali.",
        q: "Siapa yang memegang tali?",
        opts: ["Darsih dan Nana", "Lukman dan Nana", "Darsih dan Lukman", "Semua ikut memegang"],
        ans: 2,
        emoji: "🪢"
    },
    {
        storyContext: "Main Lompat Tali\n\nDarsih, Lukman, dan Nana main.\nMereka main lompat tali.\nMereka main di halaman rumah.\nDarsih dan Lukman memegang tali.\nNana melompati tali.\nMain lompat tali amat seru.\nMereka senang sekali.",
        q: "Siapa yang melompati tali?",
        opts: ["Nana", "Lukman", "Darsih", "Mereka Semua"],
        ans: 0,
        emoji: "🏃‍♀️"
    },
    {
        storyContext: "Main Lompat Tali\n\nDarsih, Lukman, dan Nana main.\nMereka main lompat tali.\nMereka main di halaman rumah.\nDarsih dan Lukman memegang tali.\nNana melompati tali.\nMain lompat tali amat seru.\nMereka senang sekali.",
        q: "Mengapa mereka senang?",
        opts: ["Karena mendapat hadiah", "Karena main lompat tali amat seru", "Karena mereka makan kue", "Karena libur sekolah"],
        ans: 1,
        emoji: "😁"
    },

    // --- BAHASA INDONESIA: CERITA 2 ---
    {
        storyContext: "Pernahkah kamu main lompat tali?\nDengan siapa saja waktu itu kamu bermain?\nDi mana kamu bermain?",
        q: "Pertanyaan: Pernahkah kamu main lompat tali?",
        opts: ["Pernah", "Tidak pernah", "Mungkin", "Tidak tahu"],
        ans: 0, // Assuming "Pernah" as a positive valid answer for kids
        emoji: "🤔"
    },
    {
        storyContext: "Pernahkah kamu main lompat tali?\nDengan siapa saja waktu itu kamu bermain?\nDi mana kamu bermain?",
        q: "Dengan siapa saja waktu itu kamu bermain?",
        opts: ["Sendiri", "Teman-teman", "Tidak main", "Tidur"],
        ans: 1,
        emoji: "👥"
    },
    {
        storyContext: "Pernahkah kamu main lompat tali?\nDengan siapa saja waktu itu kamu bermain?\nDi mana kamu bermain?",
        q: "Di mana kamu bermain?",
        opts: ["Di kamar", "Di sekolah/halaman", "Di atas atap", "Di pasar"],
        ans: 1,
        emoji: "🏫"
    },

    // --- IPA/DIRIKU: TUBUHKU (Image 3) ---
    {
        q: "Anggota tubuh kita yang jumlahnya satu adalah ....",
        opts: ["Mata", "Telinga", "Hidung", "Tangan"],
        ans: 2,
        emoji: "👃"
    },
    {
        q: "Agar tubuh selalu sehat, makanan yang seharusnya kita makan adalah ....",
        opts: ["Makanan cepat saji", "Makanan sehat", "Makanan ringan", "Permen"],
        ans: 1,
        emoji: "🥗"
    },
    {
        q: "Beni dapat berlari dengan cepat. Beni berlari menggunakan ...",
        opts: ["Tangan", "Kaki", "Telinga", "Mata"],
        ans: 1,
        emoji: "🏃‍♂️" // Added runner emoji
    },
    {
        q: "Kegiatan di bawah ini yang menggunakan kaki, KECUALI ....",
        opts: ["Membaca", "Berlari", "Melompat", "Menendang"],
        ans: 0,
        emoji: "📖" // Added reading emoji
    },
    {
        q: "Fungsi tangan kita adalah untuk ....",
        opts: ["Melihat benda", "Mencium benda", "Memegang benda", "Mendengar suara"],
        ans: 2,
        emoji: "🖐️"
    },
    {
        q: "Bagian tubuh kita yang jumlahnya paling banyak adalah ....",
        opts: ["Gigi", "Kuku", "Rambut", "Mata"],
        ans: 2,
        emoji: "💇‍♂️" // Added hair emoji
    },
    {
        q: "Makanan sehat adalah makanan yang ....",
        opts: ["Rasanya enak", "Harganya mahal", "Mengandung gizi", "Banyak warnanya"],
        ans: 2, // 2 is "Mengandung gizi", making it option C based on standard mapping, assuming 0=A, 1=B, 2=C, 3=D. Let's adjust to 3 options if needed. Wait, opts is 4 items. The image had 3 options (A,B,C) but we can formulate 4. (a. rasanya enak b. mengandung gizi c. harganya mahal). Let's use 4 text options for consistency with our UI.
        emoji: "🍎"
    },
    {
        q: "Kita dapat berbicara karena memiliki ....",
        opts: ["Mulut", "Tangan", "Mata", "Hidung"], // (a. mulut b. tangan c. mata) -> added D
        ans: 0,
        emoji: "👄"
    },
    {
        q: "Anggota tubuh seperti gambar disamping [Telinga], gunanya untuk ....",
        opts: ["Melihat", "Makan", "Mendengar", "Berjalan"], // a. melihat b. makan c. mendengar -> added D
        ans: 2,
        emoji: "👂"
    },
    {
        q: "Kita dapat mengetahui permukaan benda yang kita sentuh kasar atau halus, karena kita memiliki ....",
        opts: ["Indera keenam", "Kulit", "Rambut", "Kuku"], // a. indera ke enam b. kulit c. rambut -> added D
        ans: 1,
        emoji: "🤚"
    },

    // Making it exactly 25 by adding 2 filler fun questions about "Tubuhku" to complete the set nicely
    {
        q: "Bagian tubuh yang kita gunakan untuk melihat warna pelangi adalah...",
        opts: ["Hidung", "Telinga", "Mata", "Lidah"],
        ans: 2,
        emoji: "👀"
    },
    {
        q: "Kita mencicipi rasa manis gula menggunakan...",
        opts: ["Tangan", "Mata", "Gigi", "Lidah"],
        ans: 3,
        emoji: "👅"
    }
];
