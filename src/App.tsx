import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import halaman-halaman kamu
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Halaman Admin

// Import Satpam tadi
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            {/* Navbar bisa ditaruh di sini kalau mau muncul di semua halaman */}

            <Routes>
                {/* --- RUTE PUBLIK (Bisa diakses siapa aja) --- */}
                <Route path="/" element={<Home />} />

                {/* Ini jawaban pertanyaanmu: KITA DAFTARKAN RUTE LOGIN DISINI */}
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    {/* Nanti bisa tambah: <Route path="/admin/projects/create" ... /> */}
                </Route>

                {/* --- RUTE 404 (Kalau user ngawur ngetik URL) --- */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
