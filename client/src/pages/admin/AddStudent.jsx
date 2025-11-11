import React, { useState } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddStudent = () => {
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    registrationNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    thesisYear: "",
    specialty: "",
    hasLab: false,
    labName: "",
    researchTeam: "",
    journals: [],
    bookPublications: [],
    publications: [], // [{title, link, category}]
    publicationCertificate: "", // image url
    interventions: {
      nationalConference: [],
      internationalConference: [],
      nationalSeminar: [],
      internationalSeminar: [],
    },
    profileImage: "",
  });

  // مؤقتات لإدخال عناصر القوائم
  const [journalInput, setJournalInput] = useState("");
  const [bookInput, setBookInput] = useState("");
  const [pubInput, setPubInput] = useState({
    title: "",
    link: "",
    category: "",
  });

  // مساعدة لرفع ملف لصنف معين (profileImage أو publicationCertificate أو أي intervention array)
  const uploadImage = async (file) => {
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await axios.post(
        "http://localhost:3000/api/students/upload",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.imageUrl; // حسب backend انت رجعت { imageUrl: req.file.path }
    } catch (err) {
      console.error("Upload error:", err);
      alert("حدث خطأ أثناء رفع الصورة");
      return "";
    }
  };

  // تغييرات الحقول العادية
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // إدارة journals
  const addJournal = () => {
    if (!journalInput.trim()) return;
    setFormData((p) => ({
      ...p,
      journals: [...p.journals, journalInput.trim()],
    }));
    setJournalInput("");
  };
  const removeJournal = (idx) =>
    setFormData((p) => ({
      ...p,
      journals: p.journals.filter((_, i) => i !== idx),
    }));

  // إدارة bookPublications
  const addBook = () => {
    if (!bookInput.trim()) return;
    setFormData((p) => ({
      ...p,
      bookPublications: [...p.bookPublications, bookInput.trim()],
    }));
    setBookInput("");
  };
  const removeBook = (idx) =>
    setFormData((p) => ({
      ...p,
      bookPublications: p.bookPublications.filter((_, i) => i !== idx),
    }));

  // إدارة publications (objects)
  const addPublication = () => {
    const { title, link, category } = pubInput;
    if (!title.trim() || !link.trim() || !category.trim())
      return alert("أملأ جميع حقول المنشور");
    setFormData((p) => ({
      ...p,
      publications: [...p.publications, { title, link, category }],
    }));
    setPubInput({ title: "", link: "", category: "" });
  };
  const removePublication = (idx) =>
    setFormData((p) => ({
      ...p,
      publications: p.publications.filter((_, i) => i !== idx),
    }));

  // رفع صورة شخصية
  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData((p) => ({ ...p, profileImage: url }));
  };

  // رفع شهادة النشر
  const handlePublicationCertificate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData((p) => ({ ...p, publicationCertificate: url }));
  };

  // رفع صورة وإضافتها إلى نوع تدخل معين
  const handleInterventionUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setFormData((p) => ({
        ...p,
        interventions: {
          ...p.interventions,
          [field]: [...p.interventions[field], url],
        },
      }));
    }
  };

  const removeInterventionImage = (field, idx) => {
    setFormData((p) => ({
      ...p,
      interventions: {
        ...p.interventions,
        [field]: p.interventions[field].filter((_, i) => i !== idx),
      },
    }));
  };

  // إرسال الفورم النهائي
  const handleSubmit = async (e) => {
    e.preventDefault();

    // تأكد من وجود التوكن
    if (!token) return alert("غير مسموح: الرجاء تسجيل الدخول كأدمن");

    // تحويل birthDate و thesisYear لأنواع مناسبة
    const payload = {
      ...formData,
      birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
      thesisYear: formData.thesisYear ? Number(formData.thesisYear) : null,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ تم إضافة الطالب بنجاح");
      // إعادة تهيئة النموذج
      setFormData({
        registrationNumber: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        thesisYear: "",
        specialty: "",
        hasLab: false,
        labName: "",
        researchTeam: "",
        journals: [],
        bookPublications: [],
        publications: [],
        publicationCertificate: "",
        interventions: {
          nationalConference: [],
          internationalConference: [],
          nationalSeminar: [],
          internationalSeminar: [],
        },
        profileImage: "",
      });
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      alert("❌ حدث خطأ أثناء حفظ الطالب");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        إضافة طالب جديد (متوافق مع الـ Model)
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="رقم التسجيل"
            className="border p-2 rounded"
            required
          />
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="الاسم"
            className="border p-2 rounded"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="اللقب"
            className="border p-2 rounded"
            required
          />
          {/* <input
            name="birthDate"
            type="date"
            lang="en"
            value={formData.birthDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          /> */}
          <ReactDatePicker
            selected={formData.birthDate}
            onChange={(date) => setFormData((p) => ({ ...p, birthDate: date }))}
            dateFormat="yyyy-MM-dd" // شكل العرض
            placeholderText="Birth Date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="border p-2 rounded"
            required
          />
          <input
            name="thesisYear"
            type="number"
            value={formData.thesisYear}
            onChange={handleChange}
            placeholder="سنة الأطروحة"
            className="border p-2 rounded"
            required
          />
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">اختر التخصص</option>
            <option>تاريخ الحضارات القديمة</option>
            <option>تاريخ و حضارة المشرق الاسلامي</option>
            <option>تاريخ المغرب الحديث و المعاصر</option>
            <option>سمعي بصري</option>
            <option>الاتصال الجماهيري و الوسائط الجديدة</option>
            <option>اتصال و علاقات عامة</option>
            <option>تاريخ و حضارت المشرق الاسلامي</option>
            <option>التاريخ الوسيط</option>
            <option>تاريخ حديث و معاصر</option>
            <option>الاتصال الجماهيري</option>
            <option>تاريخ الجزائر المعاصر</option>
            <option>اعلام جديد و قضايا المجتمع</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasLab"
              checked={formData.hasLab}
              onChange={handleChange}
            />
            الانتماء للمخبر؟
          </label>
          {formData.hasLab && (
            <input
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              placeholder="اسم المخبر"
              className="border p-2 rounded mt-2 w-full"
            />
          )}
        </div>

        <div>
          <input
            name="researchTeam"
            value={formData.researchTeam}
            onChange={handleChange}
            placeholder="فرقة البحث"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* journals */}
        <div className="space-y-2">
          <label className="font-medium">روابط المجلات (journals)</label>
          <div className="flex gap-2">
            <input
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              placeholder="رابط مجلة"
              className="border p-2 rounded flex-1"
            />
            <button
              type="button"
              onClick={addJournal}
              className="bg-blue-600 text-white px-3 rounded"
            >
              أضف
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.journals.map((j, i) => (
              <div
                key={i}
                className="bg-gray-100 p-2 rounded flex items-center gap-2"
              >
                <a
                  href={j}
                  target="_blank"
                  rel="noreferrer"
                  className="underline break-all"
                >
                  {j}
                </a>
                <button
                  type="button"
                  onClick={() => removeJournal(i)}
                  className="text-red-600"
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* bookPublications */}
        <div className="space-y-2">
          <label className="font-medium">إصدارات/كتب (bookPublications)</label>
          <div className="flex gap-2">
            <input
              value={bookInput}
              onChange={(e) => setBookInput(e.target.value)}
              placeholder="رابط/اسم الكتاب"
              className="border p-2 rounded flex-1"
            />
            <button
              type="button"
              onClick={addBook}
              className="bg-blue-600 text-white px-3 rounded"
            >
              أضف
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.bookPublications.map((b, i) => (
              <div
                key={i}
                className="bg-gray-100 p-2 rounded flex items-center gap-2"
              >
                <span className="break-all">{b}</span>
                <button
                  type="button"
                  onClick={() => removeBook(i)}
                  className="text-red-600"
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* publications (objects) */}
        <div className="space-y-2">
          <label className="font-medium">المنشورات (publications)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              value={pubInput.title}
              onChange={(e) =>
                setPubInput((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="عنوان المنشور"
              className="border p-2 rounded"
            />
            <input
              value={pubInput.link}
              onChange={(e) =>
                setPubInput((p) => ({ ...p, link: e.target.value }))
              }
              placeholder="رابط المنشور"
              className="border p-2 rounded"
            />
            <input
              value={pubInput.category}
              onChange={(e) =>
                setPubInput((p) => ({ ...p, category: e.target.value }))
              }
              placeholder="الصنف"
              className="border p-2 rounded"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={addPublication}
              className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
            >
              أضف منشور
            </button>
          </div>
          <div className="space-y-1">
            {formData.publications.map((p, i) => (
              <div
                key={i}
                className="p-2 bg-gray-50 rounded flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm break-all">
                    {p.link} — {p.category}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removePublication(i)}
                  className="text-red-600"
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* profileImage */}
        <div>
          <label className="font-medium">الصورة الشخصية</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
            className="block mt-2"
          />
          {formData.profileImage && (
            <div className="mt-2">
              <img
                src={formData.profileImage}
                alt="profile"
                className="h-24 rounded"
              />
            </div>
          )}
        </div>

        {/* publicationCertificate */}
        <div>
          <label className="font-medium">شهادة النشر (صورة)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePublicationCertificate}
            className="block mt-2"
          />
          {formData.publicationCertificate && (
            <div className="mt-2">
              <img
                src={formData.publicationCertificate}
                alt="pub-cert"
                className="h-24 rounded"
              />
            </div>
          )}
        </div>

        {/* interventions uploads */}
        <div className="space-y-2">
          <label className="font-medium">المداخلات (صور لكل نوع)</label>

          {[
            { key: "nationalConference", label: "ملتقيات وطنية" },
            { key: "internationalConference", label: "ملتقيات دولية" },
            { key: "nationalSeminar", label: "ندوات وطنية" },
            { key: "internationalSeminar", label: "ندوات دولية" },
          ].map((item) => (
            <div key={item.key} className="border p-2 rounded">
              <div className="flex items-center justify-between">
                <div>{item.label}</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInterventionUpload(e, item.key)}
                />
              </div>

              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.interventions[item.key].map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt={item.label} className="h-20 rounded" />
                    <button
                      type="button"
                      onClick={() => removeInterventionImage(item.key, i)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-red-600"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            حفظ الطالب
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
