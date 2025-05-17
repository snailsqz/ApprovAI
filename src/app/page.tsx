import FraudForm from "./components/checkCredit";
export default function Home() {
  return (
    <div data-theme="light" className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">ยินดีต้อนรับสู่ MyApp</h1>
            <p className="py-6">
              แอปของคุณสำหรับการจัดการทุกสิ่งง่ายๆ ในมือคุณ
            </p>
            <button className="btn btn-primary">เริ่มใช้งาน</button>
          </div>
        </div>
      </div>
      <FraudForm />
    </div>
  );
}
