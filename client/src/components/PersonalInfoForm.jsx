import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import dummyImage from "../assets/dummy_profile.png";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  const imagePreview =
    data?.image &&
    (typeof data.image === "string" ? data.image : URL.createObjectURL(data.image));

  return (
    <div className="space-y-6">
      {/* ✅ Top Row (Avatar + Toggle) */}
      <div className="flex items-center gap-6">
        {/* Avatar Upload */}
        <label className="cursor-pointer">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="User"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-300 hover:opacity-80 transition"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-slate-300">
              <User className="size-7 text-slate-500" />
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleChange("image", e.target.files[0]);
              }
            }}
          />
        </label>

        {/* Remove Background Toggle */}
        {data?.image && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-700">Remove Background</p>

            <button
              type="button"
              onClick={() => setRemoveBackground((prev) => !prev)}
              className={`relative w-10 h-6 rounded-full transition ${
                removeBackground ? "bg-green-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  removeBackground ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* ✅ Input Fields (Vertical Stack) */}
      <div className="space-y-5">
        {fields.map((f) => {
          const Icon = f.icon;

          return (
            <div key={f.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="size-4 text-gray-500" />
                {f.label}
                {f.required && <span className="text-red-500">*</span>}
              </label>

              <input
                type={f.type}
                value={data?.[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={`Enter your ${f.label.toLowerCase()}`}
                required={f.required}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none transition
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
