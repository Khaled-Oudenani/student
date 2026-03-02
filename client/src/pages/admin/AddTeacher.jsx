// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useParams, useNavigate } from "react-router-dom";

// const AddTeacher = () => {
//   const token = localStorage.getItem("adminToken");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     registrationNumber: "",
//     firstName: "",
//     lastName: "",
//     birthDate: null,
//     thesisYear: "",
//     specialty: "",
//     hasLab: false,
//     labName: "",
//     researchTeam: "",
//     journals: [],
//     bookPublications: [],
//     publications: [],
//     publicationCertificate: "",
//     interventions: {
//       nationalConference: [],
//       internationalConference: [],
//       nationalSeminar: [],
//       internationalSeminar: [],
//     },
//     profileImage: "",
//   });

//   const [journalInput, setJournalInput] = useState("");
//   const [bookInput, setBookInput] = useState("");
//   const [pubInput, setPubInput] = useState({
//     title: "",
//     link: "",
//     category: "",
//   });

//   const uploadImage = async (file) => {
//     try {
//       const fd = new FormData();
//       fd.append("image", file);
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/teachers/upload`,
//         fd,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data.imageUrl || res.data.path || res.data.file?.path || "";
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("حدث خطأ أثناء رفع الصورة");
//       return "";
//     }
//   };

//   useEffect(() => {
//     if (!id) return;
//     const fetchTeacher = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/teachers/${id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFormData((p) => ({
//           ...p,
//           registrationNumber: data.registrationNumber || "",
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           birthDate: data.birthDate ? new Date(data.birthDate) : null,
//           thesisYear: data.thesisYear ?? "",
//           specialty: data.specialty || "",
//           hasLab: data.hasLab || false,
//           labName: data.labName || "",
//           researchTeam: data.researchTeam || "",
//           journals: Array.isArray(data.journals) ? data.journals : [],
//           bookPublications: Array.isArray(data.bookPublications)
//             ? data.bookPublications
//             : [],
//           publications: Array.isArray(data.publications)
//             ? data.publications
//             : [],
//           publicationCertificate: data.publicationCertificate || "",
//           interventions: {
//             nationalConference: data.interventions?.nationalConference || [],
//             internationalConference:
//               data.interventions?.internationalConference || [],
//             nationalSeminar: data.interventions?.nationalSeminar || [],
//             internationalSeminar:
//               data.interventions?.internationalSeminar || [],
//           },
//           profileImage: data.profileImage || "",
//         }));
//       } catch (err) {
//         console.error("Fetch teacher error:", err);
//         alert("حدث خطأ أثناء جلب بيانات الأستاذ");
//       }
//     };
//     fetchTeacher();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({
//       ...p,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const addJournal = () => {
//     if (!journalInput.trim()) return;
//     setFormData((p) => ({
//       ...p,
//       journals: [...p.journals, journalInput.trim()],
//     }));
//     setJournalInput("");
//   };
//   const removeJournal = (idx) =>
//     setFormData((p) => ({
//       ...p,
//       journals: p.journals.filter((_, i) => i !== idx),
//     }));

//   const addBook = () => {
//     if (!bookInput.trim()) return;
//     setFormData((p) => ({
//       ...p,
//       bookPublications: [...p.bookPublications, bookInput.trim()],
//     }));
//     setBookInput("");
//   };
//   const removeBook = (idx) =>
//     setFormData((p) => ({
//       ...p,
//       bookPublications: p.bookPublications.filter((_, i) => i !== idx),
//     }));

//   const addPublication = () => {
//     const { title, link, category } = pubInput;
//     if (!title.trim() || !link.trim() || !category.trim())
//       return alert("أملأ جميع حقول المنشور");
//     setFormData((p) => ({
//       ...p,
//       publications: [...p.publications, { title, link, category }],
//     }));
//     setPubInput({ title: "", link: "", category: "" });
//   };
//   const removePublication = (idx) =>
//     setFormData((p) => ({
//       ...p,
//       publications: p.publications.filter((_, i) => i !== idx),
//     }));

//   const handleProfileImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const url = await uploadImage(file);
//     if (url) setFormData((p) => ({ ...p, profileImage: url }));
//   };

//   const handlePublicationCertificate = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const url = await uploadImage(file);
//     if (url) setFormData((p) => ({ ...p, publicationCertificate: url }));
//   };

//   const handleInterventionUpload = async (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const url = await uploadImage(file);
//     if (url) {
//       setFormData((p) => ({
//         ...p,
//         interventions: {
//           ...p.interventions,
//           [field]: [...p.interventions[field], url],
//         },
//       }));
//     }
//   };

//   const removeInterventionImage = (field, idx) => {
//     setFormData((p) => ({
//       ...p,
//       interventions: {
//         ...p.interventions,
//         [field]: p.interventions[field].filter((_, i) => i !== idx),
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return alert("غير مسموح: الرجاء تسجيل الدخول كأدمن");

//     const payload = {
//       ...formData,
//       birthDate: formData.birthDate
//         ? new Date(formData.birthDate).toISOString()
//         : null,
//       thesisYear:
//         formData.thesisYear === "" ? null : Number(formData.thesisYear),
//     };

//     try {
//       if (id) {
//         await axios.put(
//           `${import.meta.env.VITE_API_URL}/api/teachers/${id}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         alert("✅ تم تحديث بيانات الأستاذ بنجاح");
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/teachers`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         alert("✅ تم إضافة الأستاذ بنجاح");
//       }
//       navigate("/admin/manage-teachers");
//     } catch (err) {
//       console.error("Save error:", err.response?.data || err);
//       alert("❌ حدث خطأ أثناء حفظ الأستاذ");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">
//         {id ? "تعديل بيانات الأستاذ" : "إضافة أستاذ جديد"}
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow space-y-4"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <input
//             name="registrationNumber"
//             value={formData.registrationNumber}
//             onChange={handleChange}
//             placeholder="رقم التسجيل"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="الاسم"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             placeholder="اللقب"
//             className="border p-2 rounded"
//             required
//           />
//           <ReactDatePicker
//             selected={formData.birthDate}
//             onChange={(date) => setFormData((p) => ({ ...p, birthDate: date }))}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Birth Date"
//             showMonthDropdown
//             showYearDropdown
//             dropdownMode="select"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             name="thesisYear"
//             type="number"
//             value={formData.thesisYear ?? ""}
//             onChange={handleChange}
//             placeholder="سنة اول تسجيل"
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="specialty"
//             value={formData.specialty}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">اختر التخصص</option>
//             <option>تاريخ الحضارات القديمة</option>
//             <option>تاريخ و حضارة المشرق الاسلامي</option>
//             <option>تاريخ المغرب الحديث و المعاصر</option>
//             <option>سمعي بصري</option>
//             <option>الاتصال الجماهيري و الوسائط الجديدة</option>
//             <option>اتصال و علاقات عامة</option>
//             <option>تاريخ و حضارت المشرق الاسلامي</option>
//             <option>التاريخ الوسيط</option>
//             <option>تاريخ حديث و معاصر</option>
//             <option>الاتصال الجماهيري</option>
//             <option>تاريخ الجزائر المعاصر</option>
//             <option>اعلام جديد و قضايا المجتمع</option>
//           </select>
//         </div>

//         <div>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="hasLab"
//               checked={formData.hasLab}
//               onChange={handleChange}
//             />
//             الانتماء للمخبر؟
//           </label>
//           {formData.hasLab && (
//             <input
//               name="labName"
//               value={formData.labName}
//               onChange={handleChange}
//               placeholder="اسم المخبر"
//               className="border p-2 rounded mt-2 w-full"
//             />
//           )}
//         </div>

//         <div>
//           <input
//             name="researchTeam"
//             value={formData.researchTeam}
//             onChange={handleChange}
//             placeholder="فرقة البحث"
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         {/* journals */}
//         <div className="space-y-2">
//           <label className="font-medium">روابط المجلات (journals)</label>
//           <div className="flex gap-2">
//             <input
//               value={journalInput}
//               onChange={(e) => setJournalInput(e.target.value)}
//               placeholder="رابط مجلة"
//               className="border p-2 rounded flex-1"
//             />
//             <button
//               type="button"
//               onClick={addJournal}
//               className="bg-blue-600 text-white px-3 rounded"
//             >
//               أضف
//             </button>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {formData.journals.map((j, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-100 p-2 rounded flex items-center gap-2"
//               >
//                 <a
//                   href={j}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="underline break-all"
//                 >
//                   {j}
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => removeJournal(i)}
//                   className="text-red-600"
//                 >
//                   إزالة
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* bookPublications */}
//         <div className="space-y-2">
//           <label className="font-medium">إصدارات/كتب (bookPublications)</label>
//           <div className="flex gap-2">
//             <input
//               value={bookInput}
//               onChange={(e) => setBookInput(e.target.value)}
//               placeholder="رابط/اسم الكتاب"
//               className="border p-2 rounded flex-1"
//             />
//             <button
//               type="button"
//               onClick={addBook}
//               className="bg-blue-600 text-white px-3 rounded"
//             >
//               أضف
//             </button>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {formData.bookPublications.map((b, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-100 p-2 rounded flex items-center gap-2"
//               >
//                 <span className="break-all">{b}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeBook(i)}
//                   className="text-red-600"
//                 >
//                   إزالة
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* publications */}
//         <div className="space-y-2">
//           <label className="font-medium">المنشورات (publications)</label>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//             <input
//               value={pubInput.title}
//               onChange={(e) =>
//                 setPubInput((p) => ({ ...p, title: e.target.value }))
//               }
//               placeholder="عنوان المنشور"
//               className="border p-2 rounded"
//             />
//             <input
//               value={pubInput.link}
//               onChange={(e) =>
//                 setPubInput((p) => ({ ...p, link: e.target.value }))
//               }
//               placeholder="رابط المنشور"
//               className="border p-2 rounded"
//             />
//             <input
//               value={pubInput.category}
//               onChange={(e) =>
//                 setPubInput((p) => ({ ...p, category: e.target.value }))
//               }
//               placeholder="الصنف"
//               className="border p-2 rounded"
//             />
//           </div>
//           <div>
//             <button
//               type="button"
//               onClick={addPublication}
//               className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
//             >
//               أضف منشور
//             </button>
//           </div>
//           <div className="space-y-1">
//             {formData.publications.map((p, i) => (
//               <div
//                 key={i}
//                 className="p-2 bg-gray-50 rounded flex justify-between items-center"
//               >
//                 <div>
//                   <div className="font-medium">{p.title}</div>
//                   <div className="text-sm break-all">
//                     {p.link} — {p.category}
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removePublication(i)}
//                   className="text-red-600"
//                 >
//                   إزالة
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* profileImage */}
//         <div>
//           <label className="font-medium">الصورة الشخصية</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleProfileImage}
//             className="block mt-2"
//           />
//           {formData.profileImage && (
//             <div className="mt-2">
//               <img
//                 src={formData.profileImage}
//                 alt="profile"
//                 className="h-24 rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* publicationCertificate */}
//         <div>
//           <label className="font-medium">شهادة النشر (صورة)</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePublicationCertificate}
//             className="block mt-2"
//           />
//           {formData.publicationCertificate && (
//             <div className="mt-2">
//               <img
//                 src={formData.publicationCertificate}
//                 alt="pub-cert"
//                 className="h-24 rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* interventions */}
//         <div className="space-y-2">
//           <label className="font-medium">المداخلات (صور لكل نوع)</label>
//           {[
//             { key: "nationalConference", label: "ملتقيات وطنية" },
//             { key: "internationalConference", label: "ملتقيات دولية" },
//             { key: "nationalSeminar", label: "ندوات وطنية" },
//             { key: "internationalSeminar", label: "ندوات دولية" },
//           ].map((item) => (
//             <div key={item.key} className="border p-2 rounded">
//               <div className="flex items-center justify-between">
//                 <div>{item.label}</div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleInterventionUpload(e, item.key)}
//                 />
//               </div>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {formData.interventions[item.key].map((url, i) => (
//                   <div key={i} className="relative">
//                     <img src={url} alt={item.label} className="h-20 rounded" />
//                     <button
//                       type="button"
//                       onClick={() => removeInterventionImage(item.key, i)}
//                       className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-red-600"
//                     >
//                       x
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-6 py-2 rounded"
//           >
//             {id ? "تحديث الأستاذ" : "حفظ الأستاذ"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTeacher;

// ////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const token = localStorage.getItem("adminToken");
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    thesisYear: "",
    academicRank: "",
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
    researchLabsAndJournals: [],
    scientificActivities: [],
    profileImage: "",
  });

  const [journalInput, setJournalInput] = useState("");
  const [bookInput, setBookInput] = useState("");
  const [pubInput, setPubInput] = useState({ title: "", link: "", category: "" });

  // مدخلات مخابر البحث
  const [labInput, setLabInput] = useState({ name: "", image: "" });
  // مدخلات النشاطات العلمية
  const [activityInput, setActivityInput] = useState({ name: "", image: "" });

  const uploadImage = async (file) => {
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/teachers/upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.imageUrl || res.data.path || res.data.file?.path || "";
    } catch (err) {
      console.error("Upload error:", err);
      alert("حدث خطأ أثناء رفع الصورة");
      return "";
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchTeacher = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/teachers/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormData((p) => ({
          ...p,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
          thesisYear: data.thesisYear ?? "",
          academicRank: data.academicRank || "",
          journals: Array.isArray(data.journals) ? data.journals : [],
          bookPublications: Array.isArray(data.bookPublications) ? data.bookPublications : [],
          publications: Array.isArray(data.publications) ? data.publications : [],
          publicationCertificate: data.publicationCertificate || "",
          interventions: {
            nationalConference: data.interventions?.nationalConference || [],
            internationalConference: data.interventions?.internationalConference || [],
            nationalSeminar: data.interventions?.nationalSeminar || [],
            internationalSeminar: data.interventions?.internationalSeminar || [],
          },
          researchLabsAndJournals: Array.isArray(data.researchLabsAndJournals) ? data.researchLabsAndJournals : [],
          scientificActivities: Array.isArray(data.scientificActivities) ? data.scientificActivities : [],
          profileImage: data.profileImage || "",
        }));
      } catch (err) {
        console.error("Fetch teacher error:", err);
        alert("حدث خطأ أثناء جلب بيانات الأستاذ");
      }
    };
    fetchTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // --- journals ---
  const addJournal = () => {
    if (!journalInput.trim()) return;
    setFormData((p) => ({ ...p, journals: [...p.journals, journalInput.trim()] }));
    setJournalInput("");
  };
  const removeJournal = (idx) =>
    setFormData((p) => ({ ...p, journals: p.journals.filter((_, i) => i !== idx) }));

  // --- bookPublications ---
  const addBook = () => {
    if (!bookInput.trim()) return;
    setFormData((p) => ({ ...p, bookPublications: [...p.bookPublications, bookInput.trim()] }));
    setBookInput("");
  };
  const removeBook = (idx) =>
    setFormData((p) => ({ ...p, bookPublications: p.bookPublications.filter((_, i) => i !== idx) }));

  // --- publications ---
  const addPublication = () => {
    const { title, link, category } = pubInput;
    if (!title.trim() || !link.trim() || !category.trim()) return alert("أملأ جميع حقول المنشور");
    setFormData((p) => ({ ...p, publications: [...p.publications, { title, link, category }] }));
    setPubInput({ title: "", link: "", category: "" });
  };
  const removePublication = (idx) =>
    setFormData((p) => ({ ...p, publications: p.publications.filter((_, i) => i !== idx) }));

  // --- profileImage ---
  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData((p) => ({ ...p, profileImage: url }));
  };

  // --- publicationCertificate ---
  const handlePublicationCertificate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData((p) => ({ ...p, publicationCertificate: url }));
  };

  // --- interventions ---
  const handleInterventionUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setFormData((p) => ({
        ...p,
        interventions: { ...p.interventions, [field]: [...p.interventions[field], url] },
      }));
    }
  };
  const removeInterventionImage = (field, idx) => {
    setFormData((p) => ({
      ...p,
      interventions: { ...p.interventions, [field]: p.interventions[field].filter((_, i) => i !== idx) },
    }));
  };

  // --- researchLabsAndJournals ---
  const handleLabImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setLabInput((p) => ({ ...p, image: url }));
  };
  const addLab = () => {
    if (!labInput.name.trim()) return alert("أدخل اسم المخبر أو المجلة");
    setFormData((p) => ({
      ...p,
      researchLabsAndJournals: [...p.researchLabsAndJournals, { ...labInput }],
    }));
    setLabInput({ name: "", image: "" });
  };
  const removeLab = (idx) =>
    setFormData((p) => ({
      ...p,
      researchLabsAndJournals: p.researchLabsAndJournals.filter((_, i) => i !== idx),
    }));

  // --- scientificActivities ---
  const handleActivityImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setActivityInput((p) => ({ ...p, image: url }));
  };
  const addActivity = () => {
    if (!activityInput.name.trim()) return alert("أدخل اسم النشاط أو التظاهرة");
    setFormData((p) => ({
      ...p,
      scientificActivities: [...p.scientificActivities, { ...activityInput }],
    }));
    setActivityInput({ name: "", image: "" });
  };
  const removeActivity = (idx) =>
    setFormData((p) => ({
      ...p,
      scientificActivities: p.scientificActivities.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("غير مسموح: الرجاء تسجيل الدخول كأدمن");

    const payload = {
      ...formData,
      birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
      thesisYear: formData.thesisYear === "" ? null : Number(formData.thesisYear),
    };

    try {
      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/teachers/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ تم تحديث بيانات الأستاذ بنجاح");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/teachers`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ تم إضافة الأستاذ بنجاح");
      }
      navigate("/admin/manage-teachers");
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      alert("❌ حدث خطأ أثناء حفظ الأستاذ");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "تعديل بيانات الأستاذ" : "إضافة أستاذ جديد"}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">

        {/* المعلومات الأساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <ReactDatePicker
            selected={formData.birthDate}
            onChange={(date) => setFormData((p) => ({ ...p, birthDate: date }))}
            dateFormat="yyyy-MM-dd"
            placeholderText="تاريخ الميلاد"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="thesisYear"
            type="number"
            value={formData.thesisYear ?? ""}
            onChange={handleChange}
            placeholder="سنة مشروع الأطروحة"
            className="border p-2 rounded"
            required
          />
          {/* الرتبة العلمية */}
          <select
            name="academicRank"
            value={formData.academicRank}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">اختر الرتبة العلمية</option>
            <option value="محاضر أ">محاضر أ</option>
            <option value="محاضر ب">محاضر ب</option>
            <option value="أستاذ تعليم عالي">أستاذ تعليم عالي</option>
          </select>
        </div>

        {/* الصورة الشخصية */}
        <div>
          <label className="font-medium block mb-1">الصورة الشخصية</label>
          <input type="file" accept="image/*" onChange={handleProfileImage} className="block" />
          {formData.profileImage && (
            <img src={formData.profileImage} alt="profile" className="h-24 rounded mt-2" />
          )}
        </div>

        {/* روابط المجلات */}
        <div className="space-y-2">
          <label className="font-medium">روابط المجلات</label>
          <div className="flex gap-2">
            <input
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              placeholder="رابط مجلة"
              className="border p-2 rounded flex-1"
            />
            <button type="button" onClick={addJournal} className="bg-blue-600 text-white px-3 rounded">
              أضف
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.journals.map((j, i) => (
              <div key={i} className="bg-gray-100 p-2 rounded flex items-center gap-2">
                <a href={j} target="_blank" rel="noreferrer" className="underline break-all">{j}</a>
                <button type="button" onClick={() => removeJournal(i)} className="text-red-600">إزالة</button>
              </div>
            ))}
          </div>
        </div>

        {/* إصدارات/كتب */}
        <div className="space-y-2">
          <label className="font-medium">إصدارات / كتب</label>
          <div className="flex gap-2">
            <input
              value={bookInput}
              onChange={(e) => setBookInput(e.target.value)}
              placeholder="رابط أو اسم الكتاب"
              className="border p-2 rounded flex-1"
            />
            <button type="button" onClick={addBook} className="bg-blue-600 text-white px-3 rounded">
              أضف
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.bookPublications.map((b, i) => (
              <div key={i} className="bg-gray-100 p-2 rounded flex items-center gap-2">
                <span className="break-all">{b}</span>
                <button type="button" onClick={() => removeBook(i)} className="text-red-600">إزالة</button>
              </div>
            ))}
          </div>
        </div>

        {/* المنشورات */}
        <div className="space-y-2">
          <label className="font-medium">المنشورات</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              value={pubInput.title}
              onChange={(e) => setPubInput((p) => ({ ...p, title: e.target.value }))}
              placeholder="عنوان المنشور"
              className="border p-2 rounded"
            />
            <input
              value={pubInput.link}
              onChange={(e) => setPubInput((p) => ({ ...p, link: e.target.value }))}
              placeholder="رابط المنشور"
              className="border p-2 rounded"
            />
            <input
              value={pubInput.category}
              onChange={(e) => setPubInput((p) => ({ ...p, category: e.target.value }))}
              placeholder="الصنف"
              className="border p-2 rounded"
            />
          </div>
          <button type="button" onClick={addPublication} className="bg-blue-600 text-white px-3 py-1 rounded">
            أضف منشور
          </button>
          <div className="space-y-1">
            {formData.publications.map((p, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm break-all">{p.link} — {p.category}</div>
                </div>
                <button type="button" onClick={() => removePublication(i)} className="text-red-600">إزالة</button>
              </div>
            ))}
          </div>
        </div>

        {/* شهادة النشر */}
        <div>
          <label className="font-medium block mb-1">شهادة النشر (صورة)</label>
          <input type="file" accept="image/*" onChange={handlePublicationCertificate} className="block" />
          {formData.publicationCertificate && (
            <img src={formData.publicationCertificate} alt="pub-cert" className="h-24 rounded mt-2" />
          )}
        </div>

        {/* المداخلات */}
        <div className="space-y-2">
          <label className="font-medium">المداخلات (صور لكل نوع)</label>
          {[
            { key: "nationalConference", label: "ملتقيات وطنية" },
            { key: "internationalConference", label: "ملتقيات دولية" },
            { key: "nationalSeminar", label: "ندوات وطنية" },
            { key: "internationalSeminar", label: "ندوات دولية" },
          ].map((item) => (
            <div key={item.key} className="border p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.label}</span>
                <input type="file" accept="image/*" onChange={(e) => handleInterventionUpload(e, item.key)} />
              </div>
              <div className="flex gap-2 flex-wrap">
                {formData.interventions[item.key].map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt={item.label} className="h-20 rounded" />
                    <button
                      type="button"
                      onClick={() => removeInterventionImage(item.key, i)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-red-600 text-xs border"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* مخابر البحث و المجلات العلمية */}
        <div className="space-y-3">
          <label className="font-medium text-lg">مخابر البحث و المجلات العلمية</label>
          <div className="border p-3 rounded space-y-2">
            <input
              value={labInput.name}
              onChange={(e) => setLabInput((p) => ({ ...p, name: e.target.value }))}
              placeholder="اسم المخبر أو المجلة"
              className="border p-2 rounded w-full"
            />
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleLabImage} className="flex-1" />
              {labInput.image && <img src={labInput.image} alt="lab" className="h-16 rounded" />}
            </div>
            <button type="button" onClick={addLab} className="bg-blue-600 text-white px-4 py-1 rounded">
              أضف
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.researchLabsAndJournals.map((item, i) => (
              <div key={i} className="border rounded p-3 flex items-center gap-3">
                {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />}
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                </div>
                <button type="button" onClick={() => removeLab(i)} className="text-red-600 text-sm">إزالة</button>
              </div>
            ))}
          </div>
        </div>

        {/* النشاطات و التظاهرات العلمية */}
        <div className="space-y-3">
          <label className="font-medium text-lg">النشاطات و التظاهرات العلمية</label>
          <div className="border p-3 rounded space-y-2">
            <input
              value={activityInput.name}
              onChange={(e) => setActivityInput((p) => ({ ...p, name: e.target.value }))}
              placeholder="اسم النشاط أو التظاهرة"
              className="border p-2 rounded w-full"
            />
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleActivityImage} className="flex-1" />
              {activityInput.image && <img src={activityInput.image} alt="activity" className="h-16 rounded" />}
            </div>
            <button type="button" onClick={addActivity} className="bg-blue-600 text-white px-4 py-1 rounded">
              أضف
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.scientificActivities.map((item, i) => (
              <div key={i} className="border rounded p-3 flex items-center gap-3">
                {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />}
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                </div>
                <button type="button" onClick={() => removeActivity(i)} className="text-red-600 text-sm">إزالة</button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
            {id ? "تحديث الأستاذ" : "حفظ الأستاذ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
