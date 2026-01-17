import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import PersonalInfoForm from "../components/PersonalInfoForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", title: "Personal Info", icon: User },
    { id: "summary", title: "Summary", icon: FileText },
    { id: "experience", title: "Experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "projects", title: "Projects", icon: FolderIcon },
    { id: "skills", title: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back To Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Resume Editor */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
              {/* Progress bar background */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />

              {/* Progress bar fill ✅ FIXED */}
              <div
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-700"
                style={{
                  width: `${
                    (activeSectionIndex / (sections.length - 1)) * 100
                  }%`,
                }}
              />

              {/* ✅ Header row */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
                {/* ✅ Left title + subtitle */}
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {activeSection.title === "Personal Info"
                      ? "Personal Information"
                      : activeSection.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Get started by filling in your{" "}
                    {activeSection.title.toLowerCase()} details.
                  </p>
                </div>

                {/* ✅ Right buttons */}
                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* ✅ Form Content OUTSIDE flex row */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:col-span-7 rounded-lg border border-gray-200 bg-white shadow-sm p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
