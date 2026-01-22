import React from "react";
import ModernTemplate from "../assets/templates/ModernTemplate";
import ClassicTemplate from "../assets/templates/ClassicTemplate";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";

const ResumePreview = ({ data, template, accentColor , classes = "" }) => {
  
  const renderTemplate = () => {
    // Logic to render different templates based on the 'template' prop
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
        break;
      case "minimal_image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
        break;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
        break;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
        break;
    }
  }
  
  return (
    <div className="w-full bg-gray-100">
      <div id="resume-preview" className={"border border-gray-300 print:shadow-none print:border-none " + classes}>
        {renderTemplate()}
      </div>

      <style>
        {`
        @page {
         size: letter;
         margin: 0;
        }

        @media print {
          html,body{
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          body * {
          visibility: hidden;
        }

        #resume-preview, #resume-preview * {
          visibility: visible;
        }

        #resume-preview {
         position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          box-shadow: none !important;
          border : none !important;
        }
      }
      `}
      </style>
    </div>
  );
}

export default ResumePreview;