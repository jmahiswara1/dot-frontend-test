# DOT Quiz App

Aplikasi quiz game trivia interaktif berbasis React, dibangun sebagai bagian dari DOT Indonesia internship application. Pengguna dapat menguji pengetahuan mereka dengan pertanyaan dari berbagai kategori, tingkat kesulitan, dan durasi waktu yang dapat dikonfigurasi.

## Overview

DOT Quiz App mengambil pertanyaan trivia dari [OpenTDB API](https://opentdb.com/) dan menyajikannya dalam antarmuka yang responsif dengan dukungan dua bahasa (Bahasa Indonesia dan English). Aplikasi ini mendukung penyimpanan sesi secara lokal sehingga pengguna dapat melanjutkan quiz yang sedang berlangsung setelah menutup browser.

## Features

- **Quiz trivia interaktif** -- Pertanyaan dari OpenTDB API dengan 11 kategori dan 3 tingkat kesulitan
- **Timer countdown** -- Timer visual dengan perubahan warna (hijau, kuning, merah) dan animasi pulse saat waktu hampir habis
- **Bilingual support** -- Dukungan Bahasa Indonesia dan English, dapat dialihkan secara real-time tanpa reload
- **Auto-translate pertanyaan** -- Pertanyaan dalam Bahasa Inggris diterjemahkan ke Bahasa Indonesia menggunakan MyMemory Translation API
- **Resume quiz** -- Sesi quiz tersimpan di localStorage, pengguna dapat melanjutkan setelah menutup atau me-refresh browser
- **Confetti animation** -- Animasi celebrasi saat skor mencapai 70% atau lebih
- **Route protection** -- Halaman setup, quiz, dan result dilindungi dari akses tanpa login
- **Responsive design** -- Tampilan optimal di perangkat mobile maupun desktop
- **Custom UI components** -- Komponen reusable seperti CircularProgress, TimerBar, CustomDropdown, dan lainnya
- **Session persistence** -- Data autentikasi dan progres quiz disimpan di localStorage

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI library |
| Vite | 8.x | Build tool dan dev server |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Zustand | 5.x | State management |
| React Router DOM | 7.x | Client-side routing |
| Framer Motion | 12.x | Animasi dan transisi |
| i18next + react-i18next | 26.x / 17.x | Internationalization |
| Axios | 1.x | HTTP client |
| Lucide React | 1.x | Icon library |
| he | 1.x | HTML entity decoder |

## Project Structure

```
dot-quiz/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── KanopiBrazil-Regular.otf    # Font display (heading)
│   │   │   ├── BlueHighwayRg.otf            # Font body (teks)
│   │   │   └── fonts.css                    # Font face declarations
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx                   # Komponen button dengan variant & size
│   │   │   ├── Card.jsx                     # Container card dengan border & shadow
│   │   │   ├── CircularProgress.jsx          # Skor circular animated (SVG)
│   │   │   ├── CustomDropdown.jsx            # Dropdown select custom
│   │   │   ├── LanguageSwitcher.jsx          # Toggle bahasa ID/EN
│   │   │   ├── ProgressBar.jsx              # Progress bar pertanyaan
│   │   │   └── TimerBar.jsx                 # Timer countdown visual
│   │   └── quiz/
│   │       └── AnswerOption.jsx             # Opsi jawaban dengan feedback visual
│   ├── hooks/
│   │   └── useTimer.js                      # Custom hook untuk timer interval
│   ├── i18n/
│   │   ├── index.js                         # i18next initialization
│   │   ├── id.json                          # Terjemahan Bahasa Indonesia
│   │   └── en.json                          # Terjemahan English
│   ├── pages/
│   │   ├── LoginPage.jsx                    # Halaman login (input nama)
│   │   ├── SetupPage.jsx                    # Halaman konfigurasi quiz
│   │   ├── QuizPage.jsx                     # Halaman quiz utama
│   │   └── ResultPage.jsx                   # Halaman hasil dan review jawaban
│   ├── services/
│   │   ├── api.js                           # Fetch pertanyaan dari OpenTDB API
│   │   └── translate.js                     # Translate via MyMemory API
│   ├── store/
│   │   ├── authStore.js                     # Zustand store: autentikasi
│   │   └── quizStore.js                     # Zustand store: state quiz
│   ├── utils/
│   │   ├── decoder.js                       # Decode HTML entities & shuffle array
│   │   └── storage.js                       # localStorage abstraction layer
│   ├── App.jsx                              # Root component & routing
│   ├── App.css
│   ├── main.jsx                             # Entry point
│   └── index.css                            # Global styles & Tailwind directives
├── index.html                               # HTML template
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind theme & configuration
├── postcss.config.js                        # PostCSS plugins (Tailwind + Autoprefixer)
├── eslint.config.js                         # ESLint flat config
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

1. Clone repository dan masuk ke direktori project:

```bash
git clone <repository-url>
cd dot-quiz
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka browser di `http://localhost:5173`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Menjalankan development server dengan HMR |
| `npm run build` | Membuat production build ke folder `dist/` |
| `npm run preview` | Preview production build secara lokal |
| `npm run lint` | Menjalankan ESLint untuk memeriksa kode |

## How to Use

### 1. Login

Buka aplikasi, masukkan nama pengguna pada halaman login. Nama akan disimpan di localStorage.

### 2. Setup Quiz

Konfigurasikan quiz sesuai preferensi:

- **Jumlah Soal** -- Pilih antara 5, 10, 15, atau 20 pertanyaan
- **Kategori** -- Pilih dari 11 kategori atau tampilkan semua kategori:
  - Pengetahuan Umum
  - Hiburan: Buku, Film, Musik
  - Sains dan Alam
  - Sains: Komputer
  - Olahraga
  - Geografi
  - Sejarah
  - Politik
  - Hewan
- **Tingkat Kesulitan** -- Easy, Medium, Hard, atau Mixed (campuran)
- **Waktu** -- Timer 3, 5, atau 10 menit

Jika ada sesi quiz yang belum selesai, tombol "Lanjutkan Kuis" akan muncul.

### 3. Quiz

Jawab pertanyaan satu per satu. Setelah memilih jawaban, feedback visual akan ditampilkan (hijau untuk benar, merah untuk salah), kemudian otomatis pindah ke pertanyaan berikutnya setelah 1 detik. Timer berjalan di pojok kiri atas.

### 4. Hasil

Lihat skor dalam bentuk circular progress, statistik benar/salah/tidak dijawab, dan review seluruh pertanyaan beserta jawaban yang benar. Pilih "Main Lagi" untuk quiz baru atau "Ganti Pemain" untuk login dengan nama lain.

## Architecture

### Routing

Aplikasi menggunakan React Router DOM dengan 4 route:

| Route | Page | Protected |
|---|---|---|
| `/` | LoginPage | Tidak |
| `/setup` | SetupPage | Ya |
| `/quiz` | QuizPage | Ya |
| `/result` | ResultPage | Ya |

Route yang dilindungi akan melakukan redirect ke `/` jika pengguna belum login (dicek melalui `authStore.isLoggedIn`).

### State Management

State dikelola menggunakan dua Zustand store:

**authStore** (`src/store/authStore.js`)
- Menyimpan data autentikasi: `username`, `language`, `isLoggedIn`
- Method: `login()`, `logout()`, `setLanguage()`, `loadFromStorage()`
- Persistensi ke localStorage dengan key `dot-quiz-auth`

**quizStore** (`src/store/quizStore.js`)
- Menyimpan seluruh state quiz: `config`, `questions`, `currentIndex`, `answers`, `correctAnswers`, `wrongAnswers`, `skippedAnswers`, `status`, `timeRemaining`
- Method: `setConfig()`, `startQuiz()`, `selectAnswer()`, `nextQuestion()`, `tickTimer()`, `finishQuiz()`, `saveToStorage()`, `resumeFromStorage()`, `clearStorage()`
- Persistensi sesi quiz ke localStorage dengan key `dot-quiz-session`

### Data Flow

```
LoginPage
  | login(username) -> authStore
  v
SetupPage
  | setConfig(options) -> quizStore
  | fetchQuestions(params) -> api.js -> OpenTDB API
  | startQuiz(questions) -> quizStore + localStorage
  v
QuizPage
  | consume quizStore (questions, currentIndex, answers)
  | useTimer() -> tickTimer() setiap 1 detik
  | selectAnswer() + nextQuestion() -> quizStore
  v
ResultPage
  | consume quizStore (correctAnswers, wrongAnswers, skippedAnswers)
  | clearStorage() -> hapus sesi dari localStorage
```

### Session Persistence

Aplikasi menyimpan data ke localStorage melalui utility `src/utils/storage.js` dengan dua key:

- `dot-quiz-auth` -- Menyimpan username dan preferensi bahasa. Dibaca saat aplikasi pertama kali load untuk auto-login.
- `dot-quiz-session` -- Menyimpan seluruh progres quiz (pertanyaan, jawaban saat ini, sisa waktu). Dibaca di SetupPage untuk menawarkan opsi resume.

Setiap kali pengguna menjawab pertanyaan atau timer berdetak, sesi diperbarui di localStorage. Saat quiz selesai (semua pertanyaan terjawab atau waktu habis), sesi dihapus.

## Components

### Pages

| Component | File | Description |
|---|---|---|
| `LoginPage` | `src/pages/LoginPage.jsx` | Form input nama dengan validasi, animasi masuk |
| `SetupPage` | `src/pages/SetupPage.jsx` | Konfigurasi quiz, deteksi sesi tersimpan, fetch pertanyaan |
| `QuizPage` | `src/pages/QuizPage.jsx` | Tampilan pertanyaan + opsi jawaban, timer, progress bar, auto-advance |
| `ResultPage` | `src/pages/ResultPage.jsx` | Skor circular, statistik, review jawaban, confetti animation |

### UI Components

| Component | File | Description |
|---|---|---|
| `Button` | `src/components/ui/Button.jsx` | Button dengan 5 variant (primary, secondary, success, error, outline) dan 3 size (sm, md, lg) |
| `Card` | `src/components/ui/Card.jsx` | Container card dengan rounded corners, shadow, dan border |
| `CircularProgress` | `src/components/ui/CircularProgress.jsx` | Skor persentase dalam bentuk circular SVG dengan animasi dan warna dinamis |
| `CustomDropdown` | `src/components/ui/CustomDropdown.jsx` | Dropdown select dengan click-outside-to-close |
| `LanguageSwitcher` | `src/components/ui/LanguageSwitcher.jsx` | Toggle bahasa ID/EN dengan flag indicator |
| `ProgressBar` | `src/components/ui/ProgressBar.jsx` | Bar progress pertanyaan saat ini dari total |
| `TimerBar` | `src/components/ui/TimerBar.jsx` | Timer countdown dengan bar, format MM:SS, warna adaptif, dan pulse animation |

### Quiz Components

| Component | File | Description |
|---|---|---|
| `AnswerOption` | `src/components/quiz/AnswerOption.jsx` | Opsi jawaban dengan state visual: default, hover, correct (hijau), wrong (merah), dimmed |

### Custom Hooks

| Hook | File | Description |
|---|---|---|
| `useTimer` | `src/hooks/useTimer.js` | Menjalankan interval 1 detik yang memanggil `tickTimer()` dari quizStore, otomatis berhenti saat status bukan `playing` |

## Internationalization (i18n)

Aplikasi mendukung dua bahasa menggunakan i18next:

- **Bahasa Indonesia** (`src/i18n/id.json`) -- Default language
- **English** (`src/i18n/en.json`)

### Cara Kerja

- i18next diinisialisasi di `src/i18n/index.js`
- Bahasa awal dibaca dari localStorage (`dot-quiz-auth`), fallback ke `id`
- `LanguageSwitcher` component memanggil `i18n.changeLanguage()` dan menyimpan preferensi ke authStore
- Teks di komponen diakses melalui hook `useTranslation()` dan fungsi `t('key.nested')`
- Interpolasi didukung, contoh: `t('setup.welcome', { name: username })`

### Menambah Bahasa Baru

1. Buat file terjemahan baru, misal `src/i18n/ja.json`
2. Impor dan daftarkan di `src/i18n/index.js` pada object `resources`
3. Update `LanguageSwitcher` untuk mendukung bahasa tambahan

## Design System

### Colors (Tailwind Custom)

Didefinisikan di `tailwind.config.js`:

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#108542` | Warna utama (hijau DOT), button, active states |
| `secondary` | `#108542` | Warna sekunder (sama dengan primary) |
| `success` | `#10B981` | Jawaban benar, timer aman |
| `error` | `#EF4444` | Jawaban salah, timer kritis |
| `warning` | `#F59E0B` | Timer peringatan (< 30 detik) |

### Typography

| Token | Font Family | Usage |
|---|---|---|
| `font-display` | KanopiBrazil | Heading dan angka skor |
| `font-body` | BlueHighway | Teks body, label, deskripsi |

Font dimuat dari file lokal di `src/assets/fonts/` melalui `fonts.css`.

### Box Shadows

| Token | Value | Usage |
|---|---|---|
| `soft` | `0 2px 4px rgba(0,0,0,0.05)` | Shadow halus untuk elemen kecil |
| `card` | `0 4px 8px rgba(0,0,0,0.08)` | Shadow default untuk card |
| `elevated` | `0 8px 16px rgba(0,0,0,0.1)` | Shadow untuk elemen yang elevated |

## External APIs

### OpenTDB API

- **Endpoint:** `https://opentdb.com/api.php`
- **Fungsi:** Menyediakan pertanyaan trivia dalam berbagai kategori dan tingkat kesulitan
- **File:** `src/services/api.js`
- **Error handling:**
  - Response code 1 (no results) -- Retry dengan difficulty `mixed`
  - Response code 2 (invalid category) -- Retry dengan category 9 (General Knowledge)

### MyMemory Translation API

- **Endpoint:** `https://api.mymemory.translated.net/get`
- **Fungsi:** Menerjemahkan pertanyaan dan jawaban dari Bahasa Inggris ke Bahasa Indonesia
- **File:** `src/services/translate.js`
- **Fallback:** Jika terjemahan gagal, teks asli dalam Bahasa Inggris tetap ditampilkan

## Configuration Files

| File | Description |
|---|---|
| `vite.config.js` | Vite build config, menggunakan plugin React |
| `tailwind.config.js` | Tailwind CSS theme, custom colors, fonts, dan shadows |
| `postcss.config.js` | PostCSS pipeline: Tailwind + Autoprefixer |
| `eslint.config.js` | ESLint flat config dengan react-hooks dan react-refresh plugins |
| `.gitignore` | Mengabaikan `node_modules/`, `dist/`, `.env`, `.DS_Store` |
