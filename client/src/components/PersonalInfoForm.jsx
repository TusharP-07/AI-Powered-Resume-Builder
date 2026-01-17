import { User } from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const imagePreview =
    data?.image &&
    (typeof data.image === "string"
      ? data.image
      : URL.createObjectURL(data.image));

  return (
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

      {/* Right Content */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-600 font-medium">Upload profile image</p>

        {/* Background toggle only if image exists */}
        {data?.image && (
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-600">Remove background</p>

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
    </div>
  );
};

export default PersonalInfoForm;
