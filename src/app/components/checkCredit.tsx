"use client";
import { useState } from "react";

const FraudForm = () => {
  const [form, setForm] = useState({
    CODE_GENDER: "",
    FLAG_OWN_CAR: "",
    CNT_CHILDREN: 0,
    AMT_INCOME_TOTAL: 0,
    NAME_INCOME_TYPE: "",
    NAME_EDUCATION_TYPE: "",
    NAME_FAMILY_STATUS: "",
    NAME_HOUSING_TYPE: "",
    OCCUPATION_TYPE: "",
    CNT_FAM_MEMBERS: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(`✅ ผลการอนุมัติ: ${data.result ? "ผ่าน" : "ไม่ผ่าน"}`);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📋 แบบฟอร์มอนุมัติสินเชื่อ</h2>

      <div className="form-control mb-2">
        <label className="label">เพศ</label>
        <select
          name="CODE_GENDER"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="M">ชาย</option>
          <option value="F">หญิง</option>
        </select>
      </div>

      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Page details</legend>

          <label className="label">จำนวนลูก</label>
          <input type="text" className="input" placeholder="My awesome page" />

          <label className="label">รายได้ต่อปี</label>
          <input type="text" className="input" placeholder="my-awesome-page" />

          <label className="label">อาชีพ</label>
          <input type="text" className="input" placeholder="Name" />

          <label className="label">จำนวนสมาชิกในครอบครัว</label>
          <input type="text" className="input" placeholder="Name" />
        </fieldset>
      </div>

      <div className="form-control mb-2">
        <label className="label">มีรถหรือไม่</label>
        <select
          name="FLAG_OWN_CAR"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="Y">มี</option>
          <option value="N">ไม่มี</option>
        </select>
      </div>

      <div className="form-control mb-2">
        <label className="label">จำนวนลูก</label>
        <input
          name="CNT_CHILDREN"
          type="number"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>

      <div className="form-control mb-2">
        <label className="label">รายได้ต่อปี</label>
        <input
          name="AMT_INCOME_TOTAL"
          type="number"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>

      <div className="form-control mb-2">
        <label className="label">ประเภทงาน</label>
        <select
          name="NAME_INCOME_TYPE"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="Working">พนักงาน</option>
          <option value="Commercial associate">พนักงานธุรกิจ</option>
          <option value="Pensioner">เกษียณ</option>
          <option value="State servant">ข้าราชการ</option>
          <option value="Student">นักเรียน</option>
        </select>
      </div>

      <div className="form-control mb-2">
        <label className="label">ระดับการศึกษา</label>
        <select
          name="NAME_EDUCATION_TYPE"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="Higher education">ป.ตรีขึ้นไป</option>
          <option value="Secondary / secondary special">มัธยม</option>
          <option value="Incomplete higher">ไม่จบป.ตรี</option>
          <option value="Lower secondary">ประถม</option>
        </select>
      </div>

      <div className="form-control mb-2">
        <label className="label">สถานะครอบครัว</label>
        <select
          name="NAME_FAMILY_STATUS"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="Married">แต่งงาน</option>
          <option value="Single / not married">โสด</option>
          <option value="Civil marriage">สมรสไม่จดทะเบียน</option>
        </select>
      </div>

      <div className="form-control mb-2">
        <label className="label">ประเภทที่อยู่อาศัย</label>
        <select
          name="NAME_HOUSING_TYPE"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          <option value="House / apartment">บ้าน/อพาร์ตเมนต์</option>
          <option value="Rented apartment">เช่า</option>
          <option value="With parents">อยู่กับพ่อแม่</option>
        </select>
      </div>

      <div className="form-control mb-2">
        <label className="label">อาชีพ</label>
        <input
          name="OCCUPATION_TYPE"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">จำนวนสมาชิกในครอบครัว</label>
        <input
          name="CNT_FAM_MEMBERS"
          type="number"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        🔍 ตรวจสอบการอนุมัติ
      </button>
    </div>
  );
};

export default FraudForm;
